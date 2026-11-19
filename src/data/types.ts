export interface Issue {
  id: string;                      // Unique ID: `${seriesId}#${issueNumber}` (e.g. "x-factor-2024#3")
  readingOrderNumber: number;      // Sequence in the master reading order (1, 2, 3...)
  phaseReadingOrderNumber: number; // Sequence index within its phase (e.g. 18 of 36)
  phaseId: string;                 // e.g. "phase-1"
  seriesId: string;                // Canonical Series ID with launch year (e.g. "x-factor-2024", "x-men-2024")
  seriesTitle: string;             // Display title (e.g. "X-Factor (Vol. 5)")
  seriesLaunchYear: number;        // e.g. 2024
  seriesColor: string;             // Tailwind color classes or hex code
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

export interface SeriesMeta {
  id: string;                      // e.g. "x-men-2024"
  title: string;                   // e.g. "X-Men (2024)"
  shortTitle: string;              // e.g. "X-Men"
  launchYear: number;              // 2024
  color: string;                   // Accent badge color
  totalIssuesInEra: number;
}

export interface Phase {
  id: string;                      // "phase-1"
  number: number;                  // 1
  name: string;                    // "Phase 1: Regrouping / The First Wave"
  tagline?: string;
  description: string;
  totalIssues: number;
  series: string[];                // Series IDs included
  issues: Issue[];                 // Chronological sequence
}

export interface Era {
  id: string;                      // "from-the-ashes"
  title: string;                   // "X-Men: From the Ashes"
  franchise: string;               // "X-Men"
  startYear: number;               // 2024
  bannerImage?: string;
  description: string;
  totalIssues: number;
  phases: Phase[];
}

export interface ProgressionStats {
  selectedIssue: Issue | null;
  phaseProgressPercent: number;    // e.g. 50%
  phaseCurrentIndex: number;       // e.g. 18
  phaseTotalCount: number;         // e.g. 36
  eraProgressPercent: number;      // e.g. 24%
  eraCurrentIndex: number;         // e.g. 18
  eraTotalCount: number;           // e.g. 75
  seriesCurrentIndex: number;      // e.g. 3
  seriesTotalCount: number;        // e.g. 6
  previousIssue: Issue | null;
  nextIssue: Issue | null;
}
