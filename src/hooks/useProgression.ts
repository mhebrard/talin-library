import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Era,
  Series,
  EnrichedIssue,
  EnrichedGroup,
  ProgressionStats,
  composeIssueId,
} from '../data/types';
import { LIBRARY_SERIES } from '../data/seriesData';

export function useProgression(
  era: Era,
  seriesMap: Record<string, Series> = LIBRARY_SERIES
) {
  // Read initial params from window.location.search
  const getParams = () => {
    const params = new URLSearchParams(window.location.search);
    return {
      seriesId: params.get('series') || '',
      issueNumber: params.get('issue') || '',
    };
  };

  const [activeParams, setActiveParams] = useState(getParams);

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setActiveParams(getParams());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Dynamically enrich all groups and issues with reading sequence order, phase/group info, and series mapping
  const { allEnrichedGroups, allEnrichedIssues } = useMemo(() => {
    const groups: EnrichedGroup[] = [];
    const issues: EnrichedIssue[] = [];
    let masterReadingOrder = 1;

    const resolveSeries = (seriesId: string): Series =>
      seriesMap[seriesId] || {
        id: seriesId,
        title: seriesId,
        shortTitle: seriesId,
        launchYear: era.startYear,
        color: 'slate',
      };

    era.phases.forEach((phase) => {
      let phaseReadingOrder = 1;

      phase.groups.forEach((rawGroup, groupIdx) => {
        const groupId = rawGroup.id || `${phase.id}-group-${groupIdx + 1}`;

        const groupIssues: EnrichedIssue[] = rawGroup.issues.map((rawIssue, issueIdx) => ({
          ...rawIssue,
          id: composeIssueId(rawIssue.seriesId, rawIssue.issueNumber),
          readingOrderNumber: masterReadingOrder++,
          phaseReadingOrderNumber: phaseReadingOrder++,
          phaseId: phase.id,
          groupId,
          groupPosition: issueIdx + 1,
          series: resolveSeries(rawIssue.seriesId),
        }));

        if (groupIssues.length === 0) return;

        const distinctSeries: Series[] = [];
        groupIssues.forEach((issue) => {
          if (!distinctSeries.some((s) => s.id === issue.seriesId)) distinctSeries.push(issue.series);
        });

        const kind = distinctSeries.length > 1 ? 'crossover' : 'series';
        const first = groupIssues[0];
        const last = groupIssues[groupIssues.length - 1];
        const seriesLabel = first.series.shortTitle || first.series.title;
        const defaultTitle =
          kind === 'crossover'
            ? 'Crossover'
            : groupIssues.length === 1
            ? `${seriesLabel} #${first.issueNumber}`
            : `${seriesLabel} #${first.issueNumber}–${last.issueNumber}`;

        groups.push({
          id: groupId,
          title: rawGroup.title || defaultTitle,
          kind,
          description: rawGroup.description,
          phaseId: phase.id,
          series: distinctSeries,
          issues: groupIssues,
          readingOrderStart: first.readingOrderNumber,
          readingOrderEnd: last.readingOrderNumber,
        });
        issues.push(...groupIssues);
      });
    });

    return { allEnrichedGroups: groups, allEnrichedIssues: issues };
  }, [era, seriesMap]);

  // Find currently selected issue
  const selectedIssue = useMemo(() => {
    if (!activeParams.seriesId || !activeParams.issueNumber) return null;
    return (
      allEnrichedIssues.find(
        (i) =>
          i.seriesId === activeParams.seriesId &&
          String(i.issueNumber).toLowerCase() === activeParams.issueNumber.toLowerCase()
      ) || null
    );
  }, [allEnrichedIssues, activeParams]);

  // Progression calculation
  const stats: ProgressionStats = useMemo(() => {
    const eraTotalCount = allEnrichedIssues.length;

    if (!selectedIssue) {
      return {
        selectedIssue: null,
        phaseProgressPercent: 0,
        phaseCurrentIndex: 0,
        phaseTotalCount: 0,
        eraProgressPercent: 0,
        eraCurrentIndex: 0,
        eraTotalCount,
        selectedGroup: null,
        groupProgressPercent: 0,
        groupCurrentIndex: 0,
        groupTotalCount: 0,
        previousIssue: null,
        nextIssue: null,
      };
    }

    const phaseTotalCount = allEnrichedIssues.filter((i) => i.phaseId === selectedIssue.phaseId).length;
    const phaseCurrentIndex = selectedIssue.phaseReadingOrderNumber;
    const phaseProgressPercent = Math.round((phaseCurrentIndex / phaseTotalCount) * 100);

    const eraCurrentIndex = selectedIssue.readingOrderNumber;
    const eraProgressPercent = Math.round((eraCurrentIndex / eraTotalCount) * 100);

    // Group progression
    const selectedGroup = allEnrichedGroups.find((g) => g.id === selectedIssue.groupId) || null;
    const groupTotalCount = selectedGroup ? selectedGroup.issues.length : 1;
    const groupCurrentIndex = selectedIssue.groupPosition;
    const groupProgressPercent = Math.round((groupCurrentIndex / groupTotalCount) * 100);

    // Adjacent issues in reading order
    const currentIndexInAll = allEnrichedIssues.findIndex((i) => i.id === selectedIssue.id);
    const previousIssue = currentIndexInAll > 0 ? allEnrichedIssues[currentIndexInAll - 1] : null;
    const nextIssue =
      currentIndexInAll < allEnrichedIssues.length - 1 ? allEnrichedIssues[currentIndexInAll + 1] : null;

    return {
      selectedIssue,
      phaseProgressPercent,
      phaseCurrentIndex,
      phaseTotalCount,
      eraProgressPercent,
      eraCurrentIndex,
      eraTotalCount,
      selectedGroup,
      groupProgressPercent,
      groupCurrentIndex,
      groupTotalCount,
      previousIssue,
      nextIssue,
    };
  }, [selectedIssue, allEnrichedIssues, allEnrichedGroups]);

  // Update URL and state
  const selectIssue = useCallback((seriesId: string, issueNumber: string | number) => {
    const url = new URL(window.location.href);
    url.searchParams.set('series', seriesId);
    url.searchParams.set('issue', String(issueNumber));
    window.history.pushState({}, '', url.toString());
    setActiveParams({
      seriesId,
      issueNumber: String(issueNumber),
    });
  }, []);

  const clearSelection = useCallback(() => {
    const url = new URL(window.location.href);
    url.searchParams.delete('series');
    url.searchParams.delete('issue');
    window.history.pushState({}, '', url.toString());
    setActiveParams({ seriesId: '', issueNumber: '' });
  }, []);

  const goToPrevious = useCallback(() => {
    if (stats.previousIssue) {
      selectIssue(stats.previousIssue.seriesId, stats.previousIssue.issueNumber);
    }
  }, [stats.previousIssue, selectIssue]);

  const goToNext = useCallback(() => {
    if (stats.nextIssue) {
      selectIssue(stats.nextIssue.seriesId, stats.nextIssue.issueNumber);
    }
  }, [stats.nextIssue, selectIssue]);

  return {
    allEnrichedGroups,
    allEnrichedIssues,
    selectedIssue,
    stats,
    selectIssue,
    clearSelection,
    goToPrevious,
    goToNext,
  };
}
