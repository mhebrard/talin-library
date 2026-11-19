import { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { ProgressionHUD } from './components/ProgressionHUD';
import { PhaseNav } from './components/PhaseNav';
import { SeriesFilter, SeriesOption } from './components/SeriesFilter';
import { IssueCard } from './components/IssueCard';
import { FROM_THE_ASHES_ERA } from './data/fromTheAshesData';
import { useProgression } from './hooks/useProgression';
import { FilterX } from 'lucide-react';

export function App() {
  const era = FROM_THE_ASHES_ERA;
  const {
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

  const activeSelected = stats.selectedIssue;

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
        onClear={clearSelection}
        onPrevious={goToPrevious}
        onNext={goToNext}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-6 w-full flex-grow space-y-6">
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
              {totalEraIssues} issues
            </div>
          </div>

          <SeriesFilter
            availableSeries={availableSeries}
            selectedSeriesId={selectedSeriesId}
            onSelectSeries={setSelectedSeriesId}
          />
        </section>

        {/* Comic Reading Order Grid */}
        <section>
          {filteredIssues.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredIssues.map((issue) => {
                const isSelected = activeSelected?.id === issue.id;
                const isPrior =
                  activeSelected !== null &&
                  issue.readingOrderNumber < activeSelected.readingOrderNumber;

                return (
                  <IssueCard
                    key={issue.id}
                    issue={issue}
                    isSelected={isSelected}
                    isPrior={isPrior}
                    onSelect={() =>
                      selectIssue(issue.seriesId, issue.issueNumber)
                    }
                  />
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 px-4 rounded-2xl bg-slate-900/30 border border-slate-800/60 space-y-3">
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
