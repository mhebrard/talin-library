import type { FC } from 'react';
import { Layers } from 'lucide-react';
import { Phase } from '../data/types';

interface PhaseNavProps {
  phases: Phase[];
  activePhaseId: string | 'all';
  onSelectPhase: (phaseId: string | 'all') => void;
  totalIssuesCount: number;
}

export const PhaseNav: FC<PhaseNavProps> = ({
  phases,
  activePhaseId,
  onSelectPhase,
  totalIssuesCount,
}) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
      <button
        onClick={() => onSelectPhase('all')}
        className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
          activePhaseId === 'all'
            ? 'bg-yellow-500 text-black border-yellow-400 font-bold shadow-sm shadow-yellow-500/20'
            : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800 hover:border-slate-700'
        }`}
      >
        <span className="flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5" />
          All Phases ({totalIssuesCount})
        </span>
      </button>

      {phases.map((phase) => (
        <button
          key={phase.id}
          onClick={() => onSelectPhase(phase.id)}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
            activePhaseId === phase.id
              ? 'bg-yellow-500 text-black border-yellow-400 font-bold shadow-sm shadow-yellow-500/20'
              : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800 hover:border-slate-700'
          }`}
        >
          Phase {phase.number} ({phase.groups.reduce((n, g) => n + g.issues.length, 0)})
        </button>
      ))}
    </div>
  );
};
