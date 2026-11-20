# Implementation Plan: Comic Reading Order Website (GitHub Pages)

## Original User Request & Follow-up Clarifications

### Original Prompt

> "Create a website that will be hosted on github pages. the website will display comics I am currently reading. it will be used to track the reading order. the first content will be around X-men From the Ashes Ara. Xmen has multiple series and the reading order might be quite complicated. The site will dsplay a first section on From the Ashes Era, an era is divided in phases, for each phase it will be a list of series and specific issue to be read in order. it should display the cover of each issue and a link to a onlice library.  
>
> Create an implementation plan as a md file in the repo that state the prompt above for reference."

### Follow-up Refinements & User Clarifications

> - **No Local Progress Tracking / Checkboxes:** On issue cards, no need for reading status toggles (`Unread` / `Reading` / `Read`).
> - **No Search/Filter by Read Status:** Focus filtering purely on Series, Phase, and text search.
> - **Dynamic Progression Metrics Based on Selected Issue:** Instead of manual checkboxes, progression metrics calculate dynamically based on the currently selected issue (e.g. *Selecting X-Men #3 displays: "You are at X% of the Era, Y% of Phase 1, Issue 3 of 7 in X-Men #1–7"*).
> - **Distinct URL Parameters with Series Launch Year:** Instead of a single dash-separated slug, separate the parameters distinctly: `?series=[series-id]&issue=[issue-number]` (e.g. `?series=x-men-2024&issue=1`, `?series=x-factor-2024&issue=3`). The series handle includes the launch year to clearly distinguish *X-Men 2024* from *X-Men 2013* without string-splitting or hyphen-parsing ambiguities.
> - **Issue Groups (Series Runs & Crossovers):** Issues are organized into groups. Consecutive issues of the same series form one group (e.g. *X-Men #1–7*). A crossover is also one group, containing issues from several series (e.g. *Raid on Graymalkin*). On the front page, groups are collapsed and show the cover of their first issue; selecting a group expands it to show all of its issues.
> - **Decoupled Content & Placeholders:** The technical plan and codebase are decoupled from specific comic issue lists. The implementation will use placeholder issues and covers within the *From the Ashes* era structure, allowing content to be populated and updated via data files independently.

---

## 1. Project Overview & Updated Objectives

The goal is to build a sleek, comic-book-inspired static web application hosted on **GitHub Pages** (repository: `talin-library`) that maps out complex multi-series reading orders and shows immediate progression metrics based on the issue the reader is currently on.

### Key Objectives

1. **Hierarchical Comic Catalog:**
   - **Era Level:** Master narrative era (starting with *X-Men: From the Ashes*).
   - **Phase Level:** Story phases within the era (e.g., *Phase 1: Regrouping / Wave 1*, *Phase 2: Expansion & Crossovers*).
   - **Group Level:** Within a phase, issues are bundled into reading groups:
     - **Series group:** a run of consecutive issues from one series (e.g. *X-Men #1–7*, *Uncanny X-Men #1–6*).
     - **Crossover group:** one story told across several series (e.g. *Raid on Graymalkin*), kept together as a single unit in the reading order.
   - **Chronological Reading Order:** Step-by-step master sequence interleaving *X-Men*, *Uncanny X-Men*, *Exceptional X-Men*, *X-Force*, *Phoenix*, *NYX*, *X-Factor*, *Wolverine*, *Storm*, and miniseries.
2. **Current Issue Selection & Progression Metrics (The "You Are Here" Marker):**
   - Click to select any issue as your current reading position.
   - **Real-time dynamic progression metrics** (displayed in this order):
     1. **Era Progress:** e.g., Issue #18 of 75 in Era → 24% of Era completed.
     2. **Phase Progress:** e.g., Issue #18 of 36 in Phase 1 → 50% of Phase 1 completed.
     3. **Group Progress:** e.g., Issue 3 of 7 in *X-Men #1–7* → 43% of the group. For a crossover, this is the position in the crossover story (e.g. Issue 3 of 5 in *Raid on Graymalkin*).
   - Visual timeline sequence:
     - Clear highlighted "Current Reading Position" marker.
     - Issues prior in the sequence are visually marked as *Preceding / Read up to this point*.
     - Quick "Previous Issue" / "Next Issue" in reading order navigation controls (also keyboard `←` / `→`).
3. **Issue Presentation & Library Integration:**
   - **Clean**, high-resolution comic cover art display.
   - **Direct clickable links** to digital libraries (Marvel Unlimited, digital portals).
   - **Metadata badges:** Series, Issue #, Reading Order #, Release Date, Story Arc / Notes.
   - **Reading order carousel:** the front page shows groups in a single horizontal row. A collapsed group shows its first issue's cover; selecting it expands the group and selects its first issue. Only the current issue's group is open, and the current issue is kept centered on screen.
4. **Fast, Lightweight Static Deployment:**
   - 100% static site hosted on GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`).

---

## 2. Technology Stack & Architecture

- **Framework:** **React + TypeScript + Vite**
  - Ultra-fast static build, component-based architecture for reactive selection state, and easy deployment to GitHub Pages.
- **Styling:** **Tailwind CSS**
  - Modern dark comic-reader aesthetic (slate/zinc dark backgrounds, vibrant mutant/X-Men series accent colors).
- **Icons:** `lucide-react` (book, compass, external link, check, navigation arrows).
- **State Handling:**
  - Active selected issue tracked via distinct URL query parameters: `?series=[series-id]&issue=[issue-number]` (e.g. `?series=x-factor-2024&issue=3` or `?series=uncanny-x-men-2024&issue=2`).
  - Supports dual behavior: `?series=x-men-2024` filters the view to that series; adding `&issue=1` highlights the reading position and progression metrics. Synced to browser history for bookmarking and link sharing.
- **Hosting:** **GitHub Pages** (auto-deployed on push to `main`).

### Repository Structure

```text
talin-library/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions deploy to GitHub Pages
├── public/
│   ├── covers/                     # Local cover art assets (with remote fallbacks)
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.tsx              # Brand, Era selector, quick navigation
│   │   ├── ProgressionHUD.tsx      # Sticky / prominent progress metrics based on selected issue
│   │   ├── EraHeader.tsx           # Era introduction, series overview
│   │   ├── PhaseSection.tsx        # Phase accordion / section
│   │   ├── ReadingOrderList.tsx    # Chronological master reading order list / grid
│   │   ├── SeriesFilter.tsx        # Filter chips by series (X-Men, Uncanny, etc.)
│   │   ├── GroupCard.tsx           # Carousel group: stacked first-issue cover (collapsed) / issues inline (expanded)
│   │   ├── IssueCard.tsx           # Cover art, series badge, library link, select button
│   │   └── IssueDetailModal.tsx    # Modal with issue synopsis, creative team & adjacent issues
│   ├── data/
│   │   ├── types.ts                # TypeScript interfaces (Era, Phase, Series, Issue)
│   │   ├── seriesData.ts           # Library-wide series registry & badge colors
│   │   └── fromTheAshesData.ts     # Curated reading order for From the Ashes (phases → groups → issues)
│   ├── hooks/
│   │   └── useProgression.ts       # Enriches groups/issues; calculates % of Era, % of Phase and % of Group
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

---

## 3. Data Schema & Architecture

The data structure maintains the hierarchy **Era → Phase → Group → Issue**, with each issue referencing a **Series** from the library-wide registry:

- A **group** is the unit displayed on the front page. Its kind is derived from its content: a group whose issues all belong to one series is a **series group**; a group spanning several series is a **crossover group**.
- Group IDs and titles are optional in data files. Defaults: ID `${phaseId}-group-${n}`, title `"X-Men #1–7"` for a series group. Crossover groups should set an explicit `title` (e.g. `"Raid on Graymalkin"`).
- Reading order = phase order → group order → issue order inside the group.

```typescript
export interface Series {
  id: string;                      // Canonical Series ID with launch year (e.g. "x-factor-2024", "x-men-2024")
  title: string;                   // Full display title (e.g. "X-Factor (Vol. 5, 2024)")
  shortTitle?: string;             // Short title for chips/badges (e.g. "X-Factor")
  launchYear: number;              // e.g. 2024
  color: string;                   // Tailwind color classes or hex code for badges
}

// Minimal issue representation in data files.
// Array position within phase strictly defines the reading order sequence.
export interface Issue {
  seriesId: string;                // References Series.id
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

// A run of issues read together, displayed as one collapsible card.
// Series group: consecutive issues of one series. Crossover group: issues from several series.
export interface IssueGroup {
  id?: string;                     // Optional stable ID; defaults to `${phaseId}-group-${n}`
  title?: string;                  // Set for crossovers (e.g. "Raid on Graymalkin"); series groups default to "X-Men #1–7"
  description?: string;            // Optional story-arc note shown when expanded
  issues: Issue[];                 // Order defines the reading order inside the group
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

// Enriched group with resolved ID, title, derived kind and enriched issues
export interface EnrichedGroup {
  id: string;
  title: string;
  kind: GroupKind;                 // 'crossover' when issues span more than one series
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
```

Example data entry:

```typescript
groups: [
  { issues: [ /* X-Men #1 … #7 */ ] },                       // series group → "X-Men #1–7"
  { title: 'Raid on Graymalkin', issues: [ /* issues from several series */ ] },  // crossover group
]
```

> The series registry lives in `src/data/seriesData.ts` (library-wide), not inside each era.

---

## 4. UI Design & User Experience

### 1. Progression HUD (Sticky / Top Banner)

When an issue is selected (e.g. clicking on a series issue):

- **Current Location Banner:**
  - Displays selected issue details and position in sequence: `"📍 Currently At: [Series Title] #[Issue] (Reading Order #[N])"`
- **Visual Progress Bars** (in this order):
  1. **Era Progress:** `[█████░░░░░░░░░░░░░░░] X% (Issue N of Total in Era)`
  2. **Phase Progress:** `[██████████░░░░░░░░░░] Y% (Issue N of Total in Phase)`
  3. **Group Progress:** `[████████░░░░░░░░░░░░] Z% (Issue N of Total in [Group Title])`
- **Quick Controls:**
  - `◀ Previous Issue` button (steps selection to preceding issue in reading order)
  - `Next Issue ▶` button (steps selection to next issue in reading order)
  - `Deselect / Clear` button

### 2. Reading Order Carousel & Group Cards (Front Page)

The front page shows the reading order as a **single-row horizontal carousel** spanning the full screen width. Items are groups, in reading order, and the row flows off-screen (native horizontal scroll, plus left/right scroll buttons and edge fades).

- **Collapsed group (default):**
  - Stacked-comics look showing the **cover of the group's first issue**.
  - Reading order range badge (e.g. `#1–7 in order`) and issue count (e.g. `7 issues`).
  - Series pill(s); crossover groups also get a `CROSSOVER` badge and list every series involved.
  - Title (e.g. *X-Men #1–7* or *Raid on Graymalkin*) and release date range. Groups fully before the current issue are dimmed.
- **Selecting a group** expands it **and selects its first issue**. The expanded group shows all of its issues inline in the same row, under a header with the title, series pills and optional description.
- **One open group at a time:** the expanded group is always the one containing the current issue. Selecting another group collapses the previous one.
- **Previous / Next** (HUD buttons or keyboard `←` / `→`) step through issues; groups expand and collapse automatically as the current issue moves in and out of them.
- **Centered selection:** the carousel scrolls so the current issue sits at the horizontal center of the screen (side padding of half the screen lets the first and last issues reach the center). With nothing selected, the row starts at the page gutter.
- **Single-issue groups** are shown directly as an issue card, with no expand step.
- **Filters inside groups:** a group stays visible if any of its issues match the active filters, and an expanded group lists only the matching issues (the count shows e.g. `2 of 7 issues`). Selecting a group picks its first matching issue.

### 3. Issue Card Display

- **Issue Cover:** Comic thumbnail with placeholder support during development and zoom/preview on click.
- **Reading Order Badge:** `#[N] in Reading Order` badge.
- **Series Pill:** Color-coded series badge.
- **Issue Number & Date:** e.g., `#[num] • [Date]`.
- **Selection State:**
  - **Active Selected Card:** Highlighted with bright glowing border, "You Are Here" tag, and pulse indicator.
  - **Prior Issues:** Subtle "Prior in sequence" styling.
  - **Upcoming Issues:** Clean default card styling.
- **Online Library Link:**
  - Direct button: `Read Online ↗` (opens the digital provider in a new tab).

### 4. Filter Toolbar

- **Series Filter:** Quick chips to isolate specific series while retaining their reading order numbers. In a crossover group, only the matching series' issues are shown.
- **Phase Filter:** Switch between Phase 1, Phase 2, or All Phases.
- **Search:** Search by title, character, or issue number.

---

## 5. Implementation Milestones

| Milestone | Scope & Deliverables |
| :--- | :--- |
| **Milestone 1: Project Setup** | • Initialize Vite + React + TypeScript + Tailwind CSS<br>• Setup GitHub Pages configuration (`vite.config.ts`)<br>• Setup GitHub Actions deployment workflow |
| **Milestone 2: Placeholder Data Structure** | • Create `src/data/fromTheAshesData.ts` with placeholder series and issues structured across phases and groups (series runs & crossovers)<br>• Setup placeholder covers, issue numbers, and library URLs |
| **Milestone 3: Dynamic Progression Logic** | • Implement `useProgression` hook calculating Era %, Phase %, Group % based on selected issue<br>• Build sticky `ProgressionHUD` with progress bars and Prev/Next controls |
| **Milestone 4: Issue Cards & Reading Order UI** | • Build the single-row reading order carousel, centered on the current issue<br>• Build collapsible group cards (first-issue cover when collapsed, issues inline when expanded; only the current issue's group is open)<br>• Build responsive issue cards with cover thumbnails, series badges, and library links<br>• Visual cues for "Active Issue", "Preceding Issues", and "Upcoming Issues" |
| **Milestone 5: Series & Phase Filtering** | • Implement Series filter chips and Phase navigation tabs<br>• URL query param sync (`?series=...&issue=...`) for bookmarking and sharing |
| **Milestone 6: Build & GitHub Pages Deployment** | • Run `npm run build` verification<br>• Push to GitHub repository and verify live GitHub Pages site |

---

## 6. Online Library Integration

Each comic entry includes an `onlineLibraryUrl`:

- **Default links:** Direct digital library or catalog link (e.g. Marvel Unlimited or digital reader).
- **Custom Library Setting (Optional):** A quick preference toggle in the header allowing the user to route links to their preferred digital provider or search portal.

---

## 7. Content Updates

### Request

> "Edit From the Ashes era phase 1 issues: it starts with X-Men 2024 #1-#7. Get the cover image and info from [https://www.marvel.com/comics]. Use batcave.biz as online library."
>
> After X-Men 1-7, continue with Uncanny X-Men 1-6, then Exceptional X-Men 1-5".
