import type { FC } from 'react';
import { ChevronLeft, ChevronRight, X, Compass, CheckCircle2 } from 'lucide-react';
import { ProgressionStats } from '../data/types';

interface ProgressionHUDProps {
  stats: ProgressionStats;
  onClear: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export const ProgressionHUD: FC<ProgressionHUDProps> = ({
  stats,
  onClear,
  onPrevious,
  onNext,
}) => {
  const { selectedIssue } = stats;

  if (!selectedIssue) {
    return (
      <div className="bg-slate-900/80 border-b border-slate-800/80 px-4 lg:px-8 py-3 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-yellow-400 shrink-0" />
            <span>
              <strong className="text-white font-semibold">Reading Order Companion:</strong> Click any comic issue card below to pin your current reading position and view live progression metrics.
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-400 font-medium">
            <span>Total Era Issues: <strong className="text-slate-200">{stats.eraTotalCount}</strong></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <aside aria-label="Reading Progression" className="sticky top-[57px] z-30 bg-[#10131e]/95 border-b border-yellow-500/30 px-4 lg:px-8 py-3.5 backdrop-blur-md shadow-2xl shadow-black/60 transition-all">
      <div className="max-w-7xl mx-auto space-y-3">
        {/* Top line: Active Issue Indicator & Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-yellow-500 text-black font-extrabold text-xs uppercase tracking-wider shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5" />
              You Are Here
            </div>

            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-base">
                {selectedIssue.seriesTitle} #{selectedIssue.issueNumber}
              </span>
              {selectedIssue.title && (
                <span className="text-slate-400 text-sm hidden sm:inline">
                  &bull; &ldquo;{selectedIssue.title}&rdquo;
                </span>
              )}
            </div>

            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">
              Reading Order #{selectedIssue.readingOrderNumber} of {stats.eraTotalCount}
            </span>
          </div>

          {/* Stepper Buttons & Clear */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            <button
              onClick={onPrevious}
              disabled={!stats.previousIssue}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-semibold border transition-all ${
                stats.previousIssue
                  ? 'bg-slate-800 hover:bg-slate-700 text-white border-slate-600 hover:border-slate-500 active:scale-95'
                  : 'bg-slate-900/50 text-slate-600 border-slate-800/60 cursor-not-allowed'
              }`}
              title={
                stats.previousIssue
                  ? `Previous: ${stats.previousIssue.seriesTitle} #${stats.previousIssue.issueNumber}`
                  : 'At first issue'
              }
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={onNext}
              disabled={!stats.nextIssue}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-semibold border transition-all ${
                stats.nextIssue
                  ? 'bg-yellow-500 hover:bg-yellow-400 text-black border-yellow-400 active:scale-95 shadow-md shadow-yellow-500/20'
                  : 'bg-slate-900/50 text-slate-600 border-slate-800/60 cursor-not-allowed'
              }`}
              title={
                stats.nextIssue
                  ? `Next: ${stats.nextIssue.seriesTitle} #${stats.nextIssue.issueNumber}`
                  : 'At last issue'
              }
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={onClear}
              className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-1"
              title="Clear active selection"
              aria-label="Clear active selection"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress Bars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          {/* Phase Progress */}
          <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800/80">
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="font-semibold text-slate-300">Phase Progress</span>
              <span className="font-extrabold text-yellow-400">
                {stats.phaseProgressPercent}%
              </span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-yellow-500 h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${stats.phaseProgressPercent}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-[11px] text-slate-400 mt-1">
              <span>Issue {stats.phaseCurrentIndex} of {stats.phaseTotalCount}</span>
              <span>Phase {selectedIssue.phaseId === 'phase-1' ? '1' : '2'}</span>
            </div>
          </div>

          {/* Era Progress */}
          <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800/80">
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="font-semibold text-slate-300">Overall Era Progress</span>
              <span className="font-extrabold text-amber-400">
                {stats.eraProgressPercent}%
              </span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-amber-500 h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${stats.eraProgressPercent}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-[11px] text-slate-400 mt-1">
              <span>Issue {stats.eraCurrentIndex} of {stats.eraTotalCount}</span>
              <span>From the Ashes</span>
            </div>
          </div>

          {/* Series Progress */}
          <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800/80">
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="font-semibold text-slate-300 truncate pr-2">
                {selectedIssue.seriesTitle}
              </span>
              <span className="font-extrabold text-blue-400">
                {Math.round((stats.seriesCurrentIndex / stats.seriesTotalCount) * 100)}%
              </span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300 ease-out"
                style={{
                  width: `${Math.round((stats.seriesCurrentIndex / stats.seriesTotalCount) * 100)}%`,
                }}
              />
            </div>
            <div className="flex justify-between items-center text-[11px] text-slate-400 mt-1">
              <span>Issue {stats.seriesCurrentIndex} of {stats.seriesTotalCount}</span>
              <span>This Series</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
