export type SeriesColor =
  | 'red'
  | 'blue'
  | 'amber'
  | 'purple'
  | 'orange'
  | 'emerald'
  | 'fuchsia'
  | 'yellow'
  | 'cyan'
  | 'stone'
  | 'rose'
  | 'indigo'
  | 'slate';

// Global series definition in scope of the library
export interface Series {
  id: string;                      // Canonical Series ID with launch year (e.g. "x-factor-2024", "x-men-2024")
  title: string;                   // Full display title (e.g. "X-Factor (Vol. 5, 2024)")
  shortTitle?: string;             // Short title for chips/badges (e.g. "X-Factor")
  launchYear: number;              // e.g. 2024
  color: SeriesColor | string;     // Base color name (e.g. "red", "blue", "orange")
}

// Minimal issue representation in data files.
// Array position within phase strictly defines the reading order sequence.
export interface Issue {
  seriesId: string;                // References Series.id in the library series registry
  issueNumber: string | number;    // e.g. 3, "3", "annual-1"
  title?: string;                  // e.g. "Havok and Company"
  releaseDate: string;             // e.g. "2024-10-23"
  coverUrl: string;                // Cover image URL or placeholder
  onlineLibraryUrl: string;        // Direct link to digital library (e.g. Marvel Unlimited)
  summary?: string;                // Context note or synopsis
  writers?: string[];
  artists?: string[];
  isEssential?: boolean;           // Core narrative vs. satellite
}

// A group is a run of issues read together, displayed as one collapsible card.
// - Series group: consecutive issues of a single series (e.g. X-Men #1-7).
// - Crossover group: issues from several series forming one story (e.g. Raid on Graymalkin).
// The kind is derived: a group whose issues span more than one series is a crossover.
export interface IssueGroup {
  id?: string;                     // Optional stable ID; defaults to `${phaseId}-group-${n}`
  title?: string;                  // Give crossovers a title (e.g. "Raid on Graymalkin"); series groups default to "X-Men #1–7"
  description?: string;            // Optional story-arc note shown when the group is expanded
  // NOTE: The order of issues in this array defines the reading order inside the group.
  issues: Issue[];
}

export type GroupKind = 'series' | 'crossover';

// Enriched issue with dynamically computed reading order positions and joined series info
export interface EnrichedIssue extends Issue {
  id: string;                      // Composed identifier: `${seriesId}#${issueNumber}`
  readingOrderNumber: number;      // Sequence in the master reading order across the era (1, 2, 3...)
  phaseReadingOrderNumber: number; // Sequence index within its parent phase (1, 2, 3...)
  phaseId: string;                 // Parent phase ID
  groupId: string;                 // Parent group ID
  groupPosition: number;           // Position inside the parent group (1, 2, 3...)
  series: Series;                  // Joined Series definition
}

// Enriched group with resolved ID, title, kind and enriched issues
export interface EnrichedGroup {
  id: string;
  title: string;
  kind: GroupKind;
  description?: string;
  phaseId: string;
  series: Series[];                // Distinct series in the group, in reading order
  issues: EnrichedIssue[];
  readingOrderStart: number;       // Reading order number of the first issue
  readingOrderEnd: number;         // Reading order number of the last issue
}

export const composeIssueId = (seriesId: string, issueNumber: string | number): string =>
  `${seriesId}#${issueNumber}`;

export interface Phase {
  id: string;                      // "phase-1"
  number: number;                  // 1
  name: string;                    // "Phase 1: Regrouping / The First Wave"
  tagline?: string;
  description: string;
  // NOTE: Group order, then issue order inside each group, strictly defines the reading order within the phase.
  groups: IssueGroup[];
}

export interface Era {
  id: string;                      // "from-the-ashes"
  title: string;                   // "X-Men: From the Ashes"
  franchise: string;               // "X-Men"
  startYear: number;               // 2024
  bannerImage?: string;
  description: string;
  phases: Phase[];
}

export interface ProgressionStats {
  selectedIssue: EnrichedIssue | null;
  phaseProgressPercent: number;    // e.g. 50%
  phaseCurrentIndex: number;       // e.g. 18
  phaseTotalCount: number;         // e.g. 36
  eraProgressPercent: number;      // e.g. 24%
  eraCurrentIndex: number;         // e.g. 18
  eraTotalCount: number;           // e.g. 75
  selectedGroup: EnrichedGroup | null;
  groupProgressPercent: number;    // e.g. 43%
  groupCurrentIndex: number;       // e.g. 3 (Issue 3 of 7 in X-Men #1–7)
  groupTotalCount: number;         // e.g. 7
  previousIssue: EnrichedIssue | null;
  nextIssue: EnrichedIssue | null;
}
