import type { FC } from 'react';
import { ChevronLeft, ChevronRight, X, Compass, CheckCircle2 } from 'lucide-react';
import { ProgressionStats } from '../data/types';

interface ProgressionHUDProps {
  stats: ProgressionStats;
  eraTitle: string;
  phaseLabel: string;               // e.g. "Phase 1"

  onClear: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

interface ProgressBarProps {
  label: string;
  percent: number;
  current: number;
  total: number;
  caption: string;
  barClass: string;
  textClass: string;
}

const ProgressBar: FC<ProgressBarProps> = ({ label, percent, current, total, caption, barClass, textClass }) => (
  <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800/80">
    <div className="flex justify-between items-center text-xs mb-1.5">
      <span className="font-semibold text-slate-300 truncate pr-2">{label}</span>
      <span className={`font-extrabold ${textClass}`}>{percent}%</span>
    </div>
    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
      <div
        className={`${barClass} h-2 rounded-full transition-all duration-300 ease-out`}
        style={{ width: `${percent}%` }}
      />
    </div>
    <div className="flex justify-between items-center text-[11px] text-slate-400 mt-1">
      <span>
        Issue {current} of {total}
      </span>
      <span className="truncate pl-2">{caption}</span>
    </div>
  </div>
);

export const ProgressionHUD: FC<ProgressionHUDProps> = ({
  stats,
  eraTitle,
  phaseLabel,
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
                {selectedIssue.series.title} #{selectedIssue.issueNumber}
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
                  ? `Previous: ${stats.previousIssue.series.title} #${stats.previousIssue.issueNumber}`
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
                  ? `Next: ${stats.nextIssue.series.title} #${stats.nextIssue.issueNumber}`
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

        {/* Progress Bars Grid: 1. Era / 2. Phase / 3. Group */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          <ProgressBar
            label="Era Progress"
            percent={stats.eraProgressPercent}
            current={stats.eraCurrentIndex}
            total={stats.eraTotalCount}
            caption={eraTitle}
            barClass="bg-amber-500"
            textClass="text-amber-400"
          />
          <ProgressBar
            label="Phase Progress"
            percent={stats.phaseProgressPercent}
            current={stats.phaseCurrentIndex}
            total={stats.phaseTotalCount}
            caption={phaseLabel}
            barClass="bg-yellow-500"
            textClass="text-yellow-400"
          />
          <ProgressBar
            label={stats.selectedGroup?.title ?? 'Group'}
            percent={stats.groupProgressPercent}
            current={stats.groupCurrentIndex}
            total={stats.groupTotalCount}
            caption={stats.selectedGroup?.kind === 'crossover' ? 'This Crossover' : 'This Group'}
            barClass="bg-blue-500"
            textClass="text-blue-400"
          />
        </div>
      </div>
    </aside>
  );
};
