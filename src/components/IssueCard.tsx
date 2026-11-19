import { useState, type FC } from 'react';
import { ExternalLink, Check, Calendar, BookOpen, Sparkles } from 'lucide-react';
import { Issue } from '../data/types';

interface IssueCardProps {
  issue: Issue;
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

  return (
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
            alt={`${issue.seriesTitle} #${issue.issueNumber} cover`}
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
                {issue.seriesTitle}
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
            <div className="text-[10px] font-semibold text-slate-500 border-t border-slate-800 pt-2">
              Order #{issue.readingOrderNumber}
            </div>
          </div>
        )}

        {/* Master Reading Order Badge */}
        <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-slate-700/60 text-slate-200 text-xs font-bold shadow-md">
          <span>#{issue.readingOrderNumber}</span>
          <span className="text-[10px] text-slate-400 font-normal">in order</span>
        </div>

        {/* Selected / Prior Status Badge */}
        {isSelected && (
          <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1 px-2 py-0.5 rounded-md bg-yellow-500 text-black text-xs font-black shadow-lg">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
            <span>CURRENT</span>
          </div>
        )}

        {isPrior && !isSelected && (
          <div className="absolute top-2.5 right-2.5 z-10 px-1.5 py-0.5 rounded bg-slate-900/80 backdrop-blur-md border border-slate-700 text-slate-400 text-[10px] font-semibold">
            Preceding
          </div>
        )}

        {/* Essential Tag */}
        {issue.isEssential && !isSelected && !isPrior && (
          <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1 px-1.5 py-0.5 rounded bg-red-950/90 border border-red-700/60 text-red-300 text-[10px] font-bold">
            <Sparkles className="w-3 h-3" />
            CORE
          </div>
        )}
      </div>

      {/* Card Details */}
      <div className="p-3.5 flex flex-col flex-grow justify-between gap-3">
        <div>
          {/* Series Badge & Release Date */}
          <div className="flex items-center justify-between gap-2 text-xs mb-1.5">
            <span
              className={`px-2 py-0.5 rounded font-semibold text-[11px] border ${issue.seriesColor}`}
            >
              {issue.seriesTitle}
            </span>

            <span className="flex items-center gap-1 text-[11px] text-slate-400 shrink-0">
              <Calendar className="w-3 h-3" />
              {issue.releaseDate}
            </span>
          </div>

          {/* Issue Title & Number */}
          <h3 className="font-bold text-white text-sm group-hover:text-yellow-400 transition-colors line-clamp-1">
            Issue #{issue.issueNumber}
            {issue.title ? ` • ${issue.title}` : ''}
          </h3>

          {/* Synopsis */}
          {issue.summary && (
            <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
              {issue.summary}
            </p>
          )}
        </div>

        {/* Footer Actions: Select Button & Online Library Link */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            className={`text-xs px-2.5 py-1 rounded font-semibold transition-all ${
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
  );
};
