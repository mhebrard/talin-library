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

// Enriched issue with dynamically computed reading order positions and joined series info
export interface EnrichedIssue extends Issue {
  id: string;                      // Composed identifier: `${seriesId}#${issueNumber}`
  readingOrderNumber: number;      // Sequence in the master reading order across the era (1, 2, 3...)
  phaseReadingOrderNumber: number; // Sequence index within its parent phase (1, 2, 3...)
  phaseId: string;                 // Parent phase ID
  series: Series;                  // Joined Series definition
}

export const composeIssueId = (seriesId: string, issueNumber: string | number): string =>
  `${seriesId}#${issueNumber}`;

export interface Phase {
  id: string;                      // "phase-1"
  number: number;                  // 1
  name: string;                    // "Phase 1: Regrouping / The First Wave"
  tagline?: string;
  description: string;
  // NOTE: The order of issues in this array strictly defines the reading order within the phase.
  issues: Issue[];
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
  seriesCurrentIndex: number;      // e.g. 3
  seriesTotalCount: number;        // e.g. 6
  previousIssue: EnrichedIssue | null;
  nextIssue: EnrichedIssue | null;
}
