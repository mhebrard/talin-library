import type { FC } from 'react';
import { Tag } from 'lucide-react';

export interface SeriesOption {
  id: string;
  label: string;
  count: number;
}

interface SeriesFilterProps {
  availableSeries: SeriesOption[];
  selectedSeriesId: string | 'all';
  onSelectSeries: (seriesId: string | 'all') => void;
}

export const SeriesFilter: FC<SeriesFilterProps> = ({
  availableSeries,
  selectedSeriesId,
  onSelectSeries,
}) => {
  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      <span className="text-xs text-slate-400 font-medium flex items-center gap-1 mr-1">
        <Tag className="w-3.5 h-3.5" />
        Filter:
      </span>

      <button
        onClick={() => onSelectSeries('all')}
        className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-all ${
          selectedSeriesId === 'all'
            ? 'bg-slate-200 text-slate-900 border-white font-bold'
            : 'bg-slate-900/90 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
        }`}
      >
        All Series
      </button>

      {availableSeries.map((series) => {
        const isSelected = selectedSeriesId === series.id;

        return (
          <button
            key={series.id}
            onClick={() => onSelectSeries(isSelected ? 'all' : series.id)}
            className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-all ${
              isSelected
                ? 'bg-yellow-500 text-black border-yellow-400 font-bold shadow-sm'
                : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:text-white hover:border-slate-700'
            }`}
          >
            <span>{series.label}</span>
            <span className="text-[10px] opacity-70 ml-1">({series.count})</span>
          </button>
        );
      })}
    </div>
  );
};
