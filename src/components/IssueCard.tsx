import { useState, type FC } from 'react';
import { ExternalLink, Calendar, BookOpen, Sparkles, Info } from 'lucide-react';
import { EnrichedIssue } from '../data/types';
import { getSeriesBadgeClasses } from '../data/seriesData';
import { IssueInfoModal } from './IssueInfoModal';

interface IssueCardProps {
  issue: EnrichedIssue;
  isSelected: boolean;
  isPrior: boolean;
  onSelect: () => void;
}

export const IssueCard: FC<IssueCardProps> = ({
  issue,
  isSelected,
  isPrior,
  onSelect,
}) => {
  const [imgError, setImgError] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  return (
    <>
    <div
      onClick={onSelect}
      className={`group relative flex flex-col rounded-xl border bg-slate-900/90 overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/60 ${
        isSelected
          ? 'border-yellow-400 ring-2 ring-yellow-400/50 shadow-lg shadow-yellow-500/20 bg-slate-900'
          : isPrior
          ? 'border-slate-800/80 opacity-75 hover:opacity-100 hover:border-slate-700'
          : 'border-slate-800/80 hover:border-slate-700'
      }`}
    >
      {/* Cover Image Container */}
      <div className="relative aspect-[2/3] w-full bg-slate-950 overflow-hidden border-b border-slate-800/80">
        {!imgError && issue.coverUrl ? (
          <img
            src={issue.coverUrl}
            alt={`${issue.series.title} #${issue.issueNumber} cover`}
            loading="lazy"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          /* High-quality styled comic cover placeholder */
          <div className="w-full h-full flex flex-col justify-between p-4 bg-gradient-to-b from-slate-900 via-slate-950 to-black text-center select-none">
            <div className="text-[10px] tracking-widest font-black uppercase text-yellow-500/80 border-b border-slate-800 pb-2">
              Marvel Comics
            </div>
            <div className="space-y-1 my-auto">
              <div className="text-sm font-extrabold text-slate-100 leading-tight">
                {issue.series.title}
              </div>
              <div className="text-2xl font-black text-yellow-400">
                #{issue.issueNumber}
              </div>
              {issue.title && (
                <div className="text-[11px] text-slate-400 italic line-clamp-2">
                  &ldquo;{issue.title}&rdquo;
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Card Details */}
      <div className="p-3.5 flex flex-col flex-grow justify-between gap-3">
        <div>
          {/* Info Button, Series Badge & Core Tag */}
          <div className="flex items-center gap-1.5 flex-wrap mb-1.5">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowInfo(true);
              }}
              aria-label={`Show summary and credits for ${issue.series.title} #${issue.issueNumber}`}
              title="Summary & credits"
              className="p-0.5 -ml-0.5 rounded-full text-slate-400 hover:text-yellow-400 hover:bg-slate-800 transition-colors"
            >
              <Info className="w-4 h-4" />
            </button>
            <span
              className={`px-2 py-0.5 rounded font-semibold text-[11px] border whitespace-nowrap ${getSeriesBadgeClasses(
                issue.series.color
              )}`}
            >
              {issue.series.shortTitle || issue.series.title}
            </span>

            {issue.isEssential && (
              <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-red-950/90 border border-red-700/60 text-red-300 text-[10px] font-bold">
                <Sparkles className="w-3 h-3" />
                CORE
              </span>
            )}
          </div>

          {/* Issue Number / Title & Release Date */}
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="min-w-0 truncate font-bold text-white text-sm group-hover:text-yellow-400 transition-colors">
              Issue #{issue.issueNumber}
              {issue.title ? ` • ${issue.title}` : ''}
            </h3>
            <span className="flex items-center gap-1 text-[11px] text-slate-400 shrink-0">
              <Calendar className="w-3 h-3" />
              {issue.releaseDate}
            </span>
          </div>
        </div>

        {/* Footer Actions: Select Button & Online Library Link */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            className={`text-xs px-2.5 py-1 rounded font-semibold whitespace-nowrap transition-all ${
              isSelected
                ? 'bg-yellow-500 text-black shadow-sm'
                : 'text-slate-300 hover:text-yellow-400 hover:bg-slate-800'
            }`}
          >
            {isSelected ? '✓ Selected' : 'Set as Current'}
          </button>

          <a
            href={issue.onlineLibraryUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700/60 hover:border-slate-600 transition-all active:scale-95"
            title="Read on Marvel Unlimited / Digital Library"
          >
            <BookOpen className="w-3.5 h-3.5 text-yellow-400" />
            <span>Library</span>
            <ExternalLink className="w-3 h-3 opacity-70" />
          </a>
        </div>
      </div>
    </div>

    {/* Rendered outside the card so clicks inside the modal don't select the issue
        (React bubbles portal events through the component tree). */}
    {showInfo && <IssueInfoModal issue={issue} onClose={() => setShowInfo(false)} />}
    </>
  );
};
