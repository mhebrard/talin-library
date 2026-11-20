import { useState, type FC } from 'react';
import { Layers, GitMerge, ChevronRight, Calendar } from 'lucide-react';
import { EnrichedGroup, EnrichedIssue } from '../data/types';
import { getSeriesBadgeClasses } from '../data/seriesData';
import { IssueCard } from './IssueCard';

// Fixed card width used by every carousel item (collapsed group, issue card)
export const CAROUSEL_CARD_WIDTH = 'w-60';

interface GroupCardProps {
  group: EnrichedGroup;
  visibleIssues: EnrichedIssue[];   // Issues of the group that pass the active filters
  isExpanded: boolean;              // True when the group contains the selected issue
  selectedIssue: EnrichedIssue | null;
  onSelectGroup: () => void;        // Collapsed card clicked → select the group's first issue
  onSelectIssue: (issue: EnrichedIssue) => void;
}

const SeriesPills: FC<{ group: EnrichedGroup }> = ({ group }) => (
  <div className="flex flex-wrap gap-1">
    {group.series.map((s) => (
      <span
        key={s.id}
        className={`px-2 py-0.5 rounded font-semibold text-[11px] border whitespace-nowrap ${getSeriesBadgeClasses(s.color)}`}
      >
        {s.shortTitle || s.title}
      </span>
    ))}
  </div>
);

const KindBadge: FC<{ group: EnrichedGroup }> = ({ group }) =>
  group.kind === 'crossover' ? (
    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-fuchsia-950/90 border border-fuchsia-700/60 text-fuchsia-300 text-[10px] font-bold uppercase tracking-wide">
      <GitMerge className="w-3 h-3" />
      Crossover
    </span>
  ) : null;

const orderRange = (group: EnrichedGroup) =>
  group.readingOrderStart === group.readingOrderEnd
    ? `#${group.readingOrderStart}`
    : `#${group.readingOrderStart}–${group.readingOrderEnd}`;

const dateRange = (issues: EnrichedIssue[]) => {
  const first = issues[0]?.releaseDate;
  const last = issues[issues.length - 1]?.releaseDate;
  return first === last ? first : `${first} → ${last}`;
};

export const GroupCard: FC<GroupCardProps> = ({
  group,
  visibleIssues,
  isExpanded,
  selectedIssue,
  onSelectGroup,
  onSelectIssue,
}) => {
  const [imgError, setImgError] = useState(false);

  const isPrior =
    selectedIssue !== null && group.readingOrderEnd < selectedIssue.readingOrderNumber;
  const coverIssue = visibleIssues[0];
  const countLabel =
    visibleIssues.length === group.issues.length
      ? `${group.issues.length} issues`
      : `${visibleIssues.length} of ${group.issues.length} issues`;

  // Expanded: the group's issues laid out inline in the carousel row, group label below the covers.
  // Top offset (1px border + 7px padding) matches the collapsed card's 8px stack offset, so covers
  // stay aligned across collapsed groups, expanded groups and single-issue cards.
  // `w-min` keeps the panel as wide as its issue row, so the label wraps instead of stretching it.
  if (isExpanded) {
    return (
      <div
        data-group-id={group.id}
        className="shrink-0 w-min rounded-2xl border border-yellow-400/60 bg-slate-900/50 px-3 pb-3 pt-[7px] space-y-3"
      >
        <div className="flex items-start gap-4">
          {visibleIssues.map((issue) => (
            <div key={issue.id} data-issue-id={issue.id} className={`${CAROUSEL_CARD_WIDTH} shrink-0`}>
              <IssueCard
                issue={issue}
                isSelected={selectedIssue?.id === issue.id}
                isPrior={
                  selectedIssue !== null && issue.readingOrderNumber < selectedIssue.readingOrderNumber
                }
                onSelect={() => onSelectIssue(issue)}
              />
            </div>
          ))}
        </div>

        <div className="space-y-1.5 px-1">
          <div className="flex items-center gap-2 flex-wrap">
            <Layers className="w-4 h-4 text-yellow-400 shrink-0" />
            <h3 className="font-extrabold text-white text-base whitespace-nowrap">{group.title}</h3>
            <KindBadge group={group} />
            <span className="text-xs text-slate-400 whitespace-nowrap">
              {orderRange(group)} in order &bull; {countLabel}
            </span>
          </div>
          <SeriesPills group={group} />
          {group.description && (
            <p className="text-xs text-slate-300 leading-relaxed">{group.description}</p>
          )}
        </div>
      </div>
    );
  }

  // Collapsed: stacked card showing the first issue cover
  return (
    <div
      data-group-id={group.id}
      role="button"
      tabIndex={0}
      onClick={onSelectGroup}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelectGroup();
        }
      }}
      aria-label={`Open ${group.title} (${countLabel}) at its first issue`}
      className={`${CAROUSEL_CARD_WIDTH} shrink-0 group relative flex flex-col text-left pt-2 pr-2 cursor-pointer transition-all duration-200 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 rounded-xl`}
    >
      {/* Stack layers behind the cover */}
      <div className="absolute inset-0 left-2 top-0 rounded-xl border border-slate-800 bg-slate-900/60" />
      <div className="absolute inset-0 left-1 top-1 right-1 rounded-xl border border-slate-800 bg-slate-900/80" />

      <div
        className={`relative flex flex-col flex-grow w-full rounded-xl border bg-slate-900 overflow-hidden ${
          isPrior
            ? 'border-slate-800/80 opacity-75 group-hover:opacity-100'
            : 'border-slate-800/80 group-hover:border-slate-700 group-hover:shadow-xl group-hover:shadow-black/60'
        }`}
      >
        <div className="relative aspect-[2/3] w-full bg-slate-950 overflow-hidden border-b border-slate-800/80">
          {!imgError && coverIssue?.coverUrl ? (
            <img
              src={coverIssue.coverUrl}
              alt={`${group.title} cover`}
              loading="lazy"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-b from-slate-900 via-slate-950 to-black text-center">
              <div className="text-sm font-extrabold text-slate-100 leading-tight">{group.title}</div>
            </div>
          )}

          <div className="absolute bottom-2.5 right-2.5 z-10 flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-slate-700/60 text-slate-100 text-xs font-bold">
            <Layers className="w-3.5 h-3.5 text-yellow-400" />
            {countLabel}
          </div>
        </div>

        <div className="p-3.5 flex flex-col flex-grow gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <KindBadge group={group} />
            <SeriesPills group={group} />
          </div>
          <h3 className="font-bold text-white text-sm group-hover:text-yellow-400 transition-colors line-clamp-2">
            {group.title}
          </h3>
          <div className="mt-auto pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2 text-[11px] text-slate-400">
            <span className="flex items-center gap-1 min-w-0">
              <Calendar className="w-3 h-3 shrink-0" />
              <span className="truncate">{dateRange(visibleIssues)}</span>
            </span>
            <span className="flex items-center font-semibold text-slate-300 group-hover:text-yellow-400 shrink-0">
              Open
              <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
