import { useState, useMemo, useEffect, useLayoutEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { ProgressionHUD } from './components/ProgressionHUD';
import { PhaseNav } from './components/PhaseNav';
import { SeriesFilter, SeriesOption } from './components/SeriesFilter';
import { IssueCard } from './components/IssueCard';
import { GroupCard, CAROUSEL_CARD_WIDTH } from './components/GroupCard';
import { FROM_THE_ASHES_ERA } from './data/fromTheAshesData';
import { useProgression } from './hooks/useProgression';
import { FilterX, ChevronLeft, ChevronRight } from 'lucide-react';

export function App() {
  const era = FROM_THE_ASHES_ERA;
  const {
    allEnrichedGroups,
    allEnrichedIssues,
    stats,
    selectIssue,
    clearSelection,
    goToPrevious,
    goToNext,
  } = useProgression(era);

  const [activePhaseId, setActivePhaseId] = useState<string | 'all'>('all');
  const [selectedSeriesId, setSelectedSeriesId] = useState<string | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const totalEraIssues = allEnrichedIssues.length;

  // Extract all unique series with their title and count directly from the issues in scope
  const availableSeries: SeriesOption[] = useMemo(() => {
    const targetIssues =
      activePhaseId === 'all'
        ? allEnrichedIssues
        : allEnrichedIssues.filter((i) => i.phaseId === activePhaseId);

    const map = new Map<string, { label: string; count: number }>();

    targetIssues.forEach((issue) => {
      const existing = map.get(issue.seriesId);
      if (existing) {
        existing.count += 1;
      } else {
        const cleanLabel = issue.series.shortTitle || issue.series.title;
        map.set(issue.seriesId, { label: cleanLabel, count: 1 });
      }
    });

    return Array.from(map.entries()).map(([id, data]) => ({
      id,
      label: data.label,
      count: data.count,
    }));
  }, [allEnrichedIssues, activePhaseId]);

  // Filter issues according to Phase, Series, and Search
  const filteredIssues = useMemo(() => {
    let issues =
      activePhaseId === 'all'
        ? allEnrichedIssues
        : allEnrichedIssues.filter((i) => i.phaseId === activePhaseId);

    // 2. Series filtering
    if (selectedSeriesId !== 'all') {
      issues = issues.filter((i) => i.seriesId === selectedSeriesId);
    }

    // 3. Search query filtering
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      issues = issues.filter(
        (i) =>
          i.series.title.toLowerCase().includes(q) ||
          (i.series.shortTitle && i.series.shortTitle.toLowerCase().includes(q)) ||
          (i.title && i.title.toLowerCase().includes(q)) ||
          String(i.issueNumber).includes(q) ||
          i.writers?.some((w) => w.toLowerCase().includes(q)) ||
          i.artists?.some((a) => a.toLowerCase().includes(q)) ||
          i.summary?.toLowerCase().includes(q)
      );
    }

    return issues;
  }, [allEnrichedIssues, activePhaseId, selectedSeriesId, searchQuery]);

  // Groups that still contain at least one issue after filtering, with their visible issues
  const filteredGroups = useMemo(() => {
    const visibleIds = new Set(filteredIssues.map((i) => i.id));
    return allEnrichedGroups
      .map((group) => ({
        group,
        visibleIssues: group.issues.filter((i) => visibleIds.has(i.id)),
      }))
      .filter((g) => g.visibleIssues.length > 0);
  }, [allEnrichedGroups, filteredIssues]);

  const activeSelected = stats.selectedIssue;

  // Carousel: only the group containing the selected issue is expanded,
  // and the selected issue is scrolled to the horizontal center of the screen.
  const carouselRef = useRef<HTMLDivElement>(null);
  const hasCenteredOnce = useRef(false);

  // When the selection moves to another group, the previous group collapses and the new one expands,
  // which shifts everything in the row before the smooth scroll starts (the cover would jump, then glide back).
  // To avoid that, snapshot the target group's screen position from the DOM *before* React commits the
  // new layout (i.e. during render, while the DOM still shows the old layout), then restore it in a layout effect.
  const anchorRef = useRef<{ selectedId: string | null; groupId: string | null; left: number | null }>({
    selectedId: null,
    groupId: null,
    left: null,
  });
  const currentSelectedId = activeSelected?.id ?? null;
  if (anchorRef.current.selectedId !== currentSelectedId) {
    const groupId = activeSelected?.groupId ?? null;
    const groupChanged = groupId !== anchorRef.current.groupId; // within a group the layout doesn't shift
    const anchorEl =
      groupId && groupChanged && carouselRef.current
        ? carouselRef.current.querySelector<HTMLElement>(`[data-group-id="${CSS.escape(groupId)}"]`)
        : null;
    anchorRef.current = {
      selectedId: currentSelectedId,
      groupId,
      left: anchorEl ? anchorEl.getBoundingClientRect().left : null,
    };
  }

  useLayoutEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    if (!activeSelected) {
      container.scrollTo({ left: 0, behavior: 'smooth' });
      return;
    }

    const el = container.querySelector<HTMLElement>(`[data-issue-id="${CSS.escape(activeSelected.id)}"]`);

    // 1. Instantly cancel the layout shift (before paint): the selected issue starts where its group's
    //    card was on screen (first or last issue alike), so the smooth scroll moves in one direction only.
    const anchor = anchorRef.current;
    if (anchor.left !== null && anchor.groupId) {
      const startEl =
        el ?? container.querySelector<HTMLElement>(`[data-group-id="${CSS.escape(anchor.groupId)}"]`);
      if (startEl) {
        container.scrollLeft += startEl.getBoundingClientRect().left - anchor.left;
      }
      anchor.left = null; // consume the snapshot
    }

    // 2. Smoothly bring the selected issue to the horizontal center.
    if (!el) return; // Selected issue hidden by the current filters

    const elRect = el.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const delta = elRect.left + elRect.width / 2 - (containerRect.left + containerRect.width / 2);
    container.scrollBy({ left: delta, behavior: hasCenteredOnce.current ? 'smooth' : 'auto' });
    hasCenteredOnce.current = true;
  }, [activeSelected, filteredGroups]);

  // Keyboard ← / → steps through issues (ignored while typing in an input)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('input, textarea, select, [contenteditable="true"]')) return;
      if (!activeSelected) return;
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrevious();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeSelected, goToNext, goToPrevious]);

  const scrollCarousel = (direction: 1 | -1) => {
    const container = carouselRef.current;
    if (container) container.scrollBy({ left: direction * container.clientWidth * 0.7, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090a0f] text-slate-100">
      {/* Navigation */}
      <Navbar
        eraTitle={era.title}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Sticky Progression HUD based on currently selected issue */}
      <ProgressionHUD
        stats={stats}
        eraTitle={era.title}
        phaseLabel={
          stats.selectedIssue
            ? `Phase ${era.phases.find((p) => p.id === stats.selectedIssue?.phaseId)?.number ?? ''}`
            : ''
        }
        onClear={clearSelection}
        onPrevious={goToPrevious}
        onNext={goToNext}
      />

      {/* Main Content Area */}
      <main className="py-6 w-full flex-grow space-y-6">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-6">
        {/* Era Header / Overview */}
        <section className="bg-gradient-to-r from-slate-900/90 via-slate-900/50 to-slate-950 p-5 rounded-2xl border border-slate-800/80 shadow-lg relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-full bg-gradient-to-l from-yellow-500/5 to-transparent pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold tracking-wider uppercase text-yellow-400">
                  Current Era ({era.startYear}–Present)
                </span>
                <span className="text-slate-600">&bull;</span>
                <span className="text-xs text-slate-400">{totalEraIssues} Issues in Reading Order</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {era.title}
              </h1>
              <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
                {era.description}
              </p>
            </div>
          </div>
        </section>

        {/* Filters & Phase Selector */}
        <section className="space-y-3.5 bg-slate-900/40 p-4 rounded-xl border border-slate-800/60">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <PhaseNav
              phases={era.phases}
              activePhaseId={activePhaseId}
              onSelectPhase={(phase) => {
                setActivePhaseId(phase);
                setSelectedSeriesId('all');
              }}
              totalIssuesCount={totalEraIssues}
            />

            <div className="text-xs font-semibold text-slate-400 whitespace-nowrap self-end sm:self-auto">
              Showing <span className="text-yellow-400">{filteredIssues.length}</span> of{' '}
              {totalEraIssues} issues in{' '}
              <span className="text-yellow-400">{filteredGroups.length}</span> groups
            </div>
          </div>

          <SeriesFilter
            availableSeries={availableSeries}
            selectedSeriesId={selectedSeriesId}
            onSelectSeries={setSelectedSeriesId}
          />
        </section>
        </div>

        {/* Comic Reading Order Carousel (single row, full screen width) */}
        <section aria-label="Reading order" className="relative">
          {filteredGroups.length > 0 ? (
            <>
              <div
                ref={carouselRef}
                // Side padding of half the screen minus half a card lets the first/last issue reach the center.
                // With nothing selected, the row starts at the normal page gutter instead.
                className={`flex items-start gap-4 overflow-x-auto pt-2 pb-5 ${
                  activeSelected ? 'px-[calc(50%-7.5rem)]' : 'px-4 lg:px-8'
                }`}
              >
                {filteredGroups.map(({ group, visibleIssues }) => {
                  // A single-issue group is shown as a plain issue card
                  if (group.issues.length === 1) {
                    const issue = group.issues[0];
                    return (
                      <div
                        key={group.id}
                        data-group-id={group.id}
                        data-issue-id={issue.id}
                        className={`${CAROUSEL_CARD_WIDTH} shrink-0 pt-2`}
                      >
                        <IssueCard
                          issue={issue}
                          isSelected={activeSelected?.id === issue.id}
                          isPrior={
                            activeSelected !== null &&
                            issue.readingOrderNumber < activeSelected.readingOrderNumber
                          }
                          onSelect={() => selectIssue(issue.seriesId, issue.issueNumber)}
                        />
                      </div>
                    );
                  }

                  const first = visibleIssues[0];
                  return (
                    <GroupCard
                      key={group.id}
                      group={group}
                      visibleIssues={visibleIssues}
                      isExpanded={activeSelected?.groupId === group.id}
                      selectedIssue={activeSelected}
                      onSelectGroup={() => selectIssue(first.seriesId, first.issueNumber)}
                      onSelectIssue={(issue) => selectIssue(issue.seriesId, issue.issueNumber)}
                    />
                  );
                })}
              </div>

              {/* Edge fades */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#090a0f] to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#090a0f] to-transparent" />

              {/* Scroll buttons */}
              <button
                type="button"
                onClick={() => scrollCarousel(-1)}
                aria-label="Scroll reading order left"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-slate-900/90 border border-slate-700 text-slate-200 hover:text-yellow-400 hover:border-yellow-500/60 shadow-lg"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollCarousel(1)}
                aria-label="Scroll reading order right"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-slate-900/90 border border-slate-700 text-slate-200 hover:text-yellow-400 hover:border-yellow-500/60 shadow-lg"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          ) : (
            <div className="px-4 lg:px-8">
            <div className="max-w-7xl mx-auto text-center py-16 px-4 rounded-2xl bg-slate-900/30 border border-slate-800/60 space-y-3">
              <FilterX className="w-10 h-10 text-slate-500 mx-auto" />
              <h3 className="text-lg font-bold text-white">No comics match your filter</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                No issues match your current phase, series, or search query. Try clearing the search or choosing another series.
              </p>
              <button
                onClick={() => {
                  setActivePhaseId('all');
                  setSelectedSeriesId('all');
                  setSearchQuery('');
                }}
                className="mt-2 px-4 py-1.5 text-xs font-bold rounded-lg bg-yellow-500 text-black hover:bg-yellow-400 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#07080c] py-6 px-4 lg:px-8 text-center text-xs text-slate-500 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <span className="font-semibold text-slate-400">Talin Library</span> — Comic Reading Order Tracker
          </div>
          <div>
            Hosted on GitHub Pages &bull; Marvel Comics &amp; characters are &copy; Marvel Entertainment
          </div>
        </div>
      </footer>
    </div>
  );
}
