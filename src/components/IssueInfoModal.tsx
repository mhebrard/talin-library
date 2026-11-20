import { useEffect, useRef, type FC } from 'react';
import { createPortal } from 'react-dom';
import { X, Calendar, Sparkles, PenLine, Brush, BookOpen, ExternalLink } from 'lucide-react';
import { EnrichedIssue } from '../data/types';
import { getSeriesBadgeClasses } from '../data/seriesData';

interface IssueInfoModalProps {
  issue: EnrichedIssue;
  onClose: () => void;
}

// Issue details (summary, writers, artists) shown on demand from the (i) button of an issue card.
// Rendered in a portal on <body>: the carousel clips overflow and cards use transforms on hover,
// both of which would break a fixed overlay rendered inside the card.
export const IssueInfoModal: FC<IssueInfoModalProps> = ({ issue, onClose }) => {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }
      // Keep ← / → reading navigation from firing while the modal is open
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') e.stopPropagation();
    };
    window.addEventListener('keydown', onKeyDown, true);
    return () => window.removeEventListener('keydown', onKeyDown, true);
  }, [onClose]);

  const heading = `${issue.series.title} #${issue.issueNumber}`;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${heading} details`}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-slate-700 bg-[#10131e] shadow-2xl shadow-black/70"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close details"
          className="absolute top-3 right-3 p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col sm:flex-row gap-5 p-5">
          {issue.coverUrl && (
            <img
              src={issue.coverUrl}
              alt={`${heading} cover`}
              className="w-40 sm:w-44 aspect-[2/3] object-cover rounded-lg border border-slate-800 self-center sm:self-start shrink-0"
            />
          )}

          <div className="min-w-0 space-y-3 pr-6">
            <div className="flex items-center gap-1.5 flex-wrap">
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

            <div>
              <h2 className="text-lg font-extrabold text-white leading-tight">{heading}</h2>
              {issue.title && <p className="text-sm text-slate-300 italic">&ldquo;{issue.title}&rdquo;</p>}
              <p className="flex items-center gap-1 text-xs text-slate-400 mt-1">
                <Calendar className="w-3.5 h-3.5" />
                {issue.releaseDate} &bull; #{issue.readingOrderNumber} in reading order
              </p>
            </div>

            {issue.summary && <p className="text-sm text-slate-200 leading-relaxed">{issue.summary}</p>}

            {Boolean(issue.writers?.length || issue.artists?.length) && (
              <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-xs">
                {issue.writers?.length ? (
                  <>
                    <dt className="flex items-center gap-1 text-slate-400">
                      <PenLine className="w-3.5 h-3.5" />
                      Writer{issue.writers.length > 1 ? 's' : ''}
                    </dt>
                    <dd className="text-slate-100 font-medium">{issue.writers.join(', ')}</dd>
                  </>
                ) : null}
                {issue.artists?.length ? (
                  <>
                    <dt className="flex items-center gap-1 text-slate-400">
                      <Brush className="w-3.5 h-3.5" />
                      Artist{issue.artists.length > 1 ? 's' : ''}
                    </dt>
                    <dd className="text-slate-100 font-medium">{issue.artists.join(', ')}</dd>
                  </>
                ) : null}
              </dl>
            )}

            <a
              href={issue.onlineLibraryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700/60 transition-all"
            >
              <BookOpen className="w-3.5 h-3.5 text-yellow-400" />
              Read in Library
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
