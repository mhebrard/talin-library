import { useState, useEffect, useMemo, useCallback } from 'react';
import { Era, Series, EnrichedIssue, ProgressionStats, composeIssueId } from '../data/types';
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

  // Dynamically enrich all issues with reading sequence order, phase info, and series mapping
  const allEnrichedIssues = useMemo(() => {
    const list: EnrichedIssue[] = [];
    let masterReadingOrder = 1;

    era.phases.forEach((phase) => {
      phase.issues.forEach((rawIssue, phaseIdx) => {
        const seriesDef = seriesMap[rawIssue.seriesId] || {
          id: rawIssue.seriesId,
          title: rawIssue.seriesId,
          shortTitle: rawIssue.seriesId,
          launchYear: era.startYear,
          color: 'slate',
        };

        list.push({
          ...rawIssue,
          id: composeIssueId(rawIssue.seriesId, rawIssue.issueNumber),
          readingOrderNumber: masterReadingOrder++,
          phaseReadingOrderNumber: phaseIdx + 1,
          phaseId: phase.id,
          series: seriesDef,
        });
      });
    });

    return list;
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
        seriesCurrentIndex: 0,
        seriesTotalCount: 0,
        previousIssue: null,
        nextIssue: null,
      };
    }

    const currentPhase =
      era.phases.find((p) => p.id === selectedIssue.phaseId) || era.phases[0];
    const phaseTotalCount = currentPhase.issues.length;
    const phaseCurrentIndex = selectedIssue.phaseReadingOrderNumber;
    const phaseProgressPercent = Math.round((phaseCurrentIndex / phaseTotalCount) * 100);

    const eraCurrentIndex = selectedIssue.readingOrderNumber;
    const eraProgressPercent = Math.round((eraCurrentIndex / eraTotalCount) * 100);

    // Series progression
    const seriesIssues = allEnrichedIssues.filter((i) => i.seriesId === selectedIssue.seriesId);
    const seriesCurrentIndex =
      seriesIssues.findIndex((i) => i.id === selectedIssue.id) + 1;
    const seriesTotalCount = seriesIssues.length;

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
      seriesCurrentIndex: Math.max(1, seriesCurrentIndex),
      seriesTotalCount,
      previousIssue,
      nextIssue,
    };
  }, [selectedIssue, era, allEnrichedIssues]);

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
    allEnrichedIssues,
    selectedIssue,
    stats,
    selectIssue,
    clearSelection,
    goToPrevious,
    goToNext,
  };
}
