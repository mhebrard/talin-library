import { Series, SeriesColor } from './types';

// Predefined badge variants for colors to ensure Tailwind includes them in the static CSS build
export const SERIES_COLOR_VARIANTS: Record<
  SeriesColor,
  { bg: string; text: string; border: string; badge: string }
> = {
  red: {
    bg: 'bg-red-950',
    text: 'text-red-300',
    border: 'border-red-700/50',
    badge: 'bg-red-950 text-red-300 border-red-700/50',
  },
  blue: {
    bg: 'bg-blue-950',
    text: 'text-blue-300',
    border: 'border-blue-700/50',
    badge: 'bg-blue-950 text-blue-300 border-blue-700/50',
  },
  amber: {
    bg: 'bg-amber-950',
    text: 'text-amber-300',
    border: 'border-amber-700/50',
    badge: 'bg-amber-950 text-amber-300 border-amber-700/50',
  },
  purple: {
    bg: 'bg-purple-950',
    text: 'text-purple-300',
    border: 'border-purple-700/50',
    badge: 'bg-purple-950 text-purple-300 border-purple-700/50',
  },
  orange: {
    bg: 'bg-orange-950',
    text: 'text-orange-300',
    border: 'border-orange-700/50',
    badge: 'bg-orange-950 text-orange-300 border-orange-700/50',
  },
  emerald: {
    bg: 'bg-emerald-950',
    text: 'text-emerald-300',
    border: 'border-emerald-700/50',
    badge: 'bg-emerald-950 text-emerald-300 border-emerald-700/50',
  },
  fuchsia: {
    bg: 'bg-fuchsia-950',
    text: 'text-fuchsia-300',
    border: 'border-fuchsia-700/50',
    badge: 'bg-fuchsia-950 text-fuchsia-300 border-fuchsia-700/50',
  },
  yellow: {
    bg: 'bg-yellow-950',
    text: 'text-yellow-300',
    border: 'border-yellow-700/50',
    badge: 'bg-yellow-950 text-yellow-300 border-yellow-700/50',
  },
  cyan: {
    bg: 'bg-cyan-950',
    text: 'text-cyan-300',
    border: 'border-cyan-700/50',
    badge: 'bg-cyan-950 text-cyan-300 border-cyan-700/50',
  },
  stone: {
    bg: 'bg-stone-900',
    text: 'text-stone-300',
    border: 'border-stone-700/50',
    badge: 'bg-stone-900 text-stone-300 border-stone-700/50',
  },
  rose: {
    bg: 'bg-rose-950',
    text: 'text-rose-300',
    border: 'border-rose-700/50',
    badge: 'bg-rose-950 text-rose-300 border-rose-700/50',
  },
  indigo: {
    bg: 'bg-indigo-950',
    text: 'text-indigo-300',
    border: 'border-indigo-700/50',
    badge: 'bg-indigo-950 text-indigo-300 border-indigo-700/50',
  },
  slate: {
    bg: 'bg-slate-900',
    text: 'text-slate-300',
    border: 'border-slate-700/50',
    badge: 'bg-slate-900 text-slate-300 border-slate-700/50',
  },
  lime: {
    bg: 'bg-lime-950',
    text: 'text-lime-300',
    border: 'border-lime-700/50',
    badge: 'bg-lime-950 text-lime-300 border-lime-700/50',
  },
  pink: {
    bg: 'bg-pink-950',
    text: 'text-pink-300',
    border: 'border-pink-700/50',
    badge: 'bg-pink-950 text-pink-300 border-pink-700/50',
  },
  teal: {
    bg: 'bg-teal-950',
    text: 'text-teal-300',
    border: 'border-teal-700/50',
    badge: 'bg-teal-950 text-teal-300 border-teal-700/50',
  },
  sky: {
    bg: 'bg-sky-950',
    text: 'text-sky-300',
    border: 'border-sky-700/50',
    badge: 'bg-sky-950 text-sky-300 border-sky-700/50',
  },
  violet: {
    bg: 'bg-violet-950',
    text: 'text-violet-300',
    border: 'border-violet-700/50',
    badge: 'bg-violet-950 text-violet-300 border-violet-700/50',
  },
};

/**
 * Builds the badge variant styling classes from a simple color name (e.g. "red" -> "bg-red-950 text-red-300 border-red-700/50")
 */
export function getSeriesBadgeClasses(color: SeriesColor | string): string {
  const normalized = color.toLowerCase() as SeriesColor;
  return SERIES_COLOR_VARIANTS[normalized]?.badge || SERIES_COLOR_VARIANTS.slate.badge;
}

// Global list of series in scope of the library
export const LIBRARY_SERIES: Record<string, Series> = {
  'x-men-2024': {
    id: 'x-men-2024',
    title: 'X-Men (Vol. 7, 2024)',
    shortTitle: 'X-Men',
    launchYear: 2024,
    color: 'red',
  },
  'uncanny-x-men-2024': {
    id: 'uncanny-x-men-2024',
    title: 'Uncanny X-Men (Vol. 6, 2024)',
    shortTitle: 'Uncanny X-Men',
    launchYear: 2024,
    color: 'blue',
  },
  'exceptional-x-men-2024': {
    id: 'exceptional-x-men-2024',
    title: 'Exceptional X-Men (Vol. 1, 2024)',
    shortTitle: 'Exceptional X-Men',
    launchYear: 2024,
    color: 'amber',
  },
  'x-force-2024': {
    id: 'x-force-2024',
    title: 'X-Force (Vol. 7, 2024)',
    shortTitle: 'X-Force',
    launchYear: 2024,
    color: 'purple',
  },
  'x-factor-2024': {
    id: 'x-factor-2024',
    title: 'X-Factor (Vol. 5, 2024)',
    shortTitle: 'X-Factor',
    launchYear: 2024,
    color: 'orange',
  },
  'phoenix-2024': {
    id: 'phoenix-2024',
    title: 'Phoenix (Vol. 5, 2024)',
    shortTitle: 'Phoenix',
    launchYear: 2024,
    color: 'emerald',
  },
  'nyx-2024': {
    id: 'nyx-2024',
    title: 'NYX (Vol. 2, 2024)',
    shortTitle: 'NYX',
    launchYear: 2024,
    color: 'fuchsia',
  },
  'wolverine-2024': {
    id: 'wolverine-2024',
    title: 'Wolverine (Vol. 8, 2024)',
    shortTitle: 'Wolverine',
    launchYear: 2024,
    color: 'yellow',
  },
  'storm-2024': {
    id: 'storm-2024',
    title: 'Storm (Vol. 4, 2024)',
    shortTitle: 'Storm',
    launchYear: 2024,
    color: 'cyan',
  },
  'heir-of-apocalypse-2024': {
    id: 'heir-of-apocalypse-2024',
    title: 'X-Men: Heir of Apocalypse (2024)',
    shortTitle: 'Heir of Apocalypse',
    launchYear: 2024,
    color: 'stone',
  },
  'sentinels-2024': {
    id: 'sentinels-2024',
    title: 'Sentinels (Vol. 1, 2024)',
    shortTitle: 'Sentinels',
    launchYear: 2024,
    color: 'rose',
  },
  'psylocke-2024': {
    id: 'psylocke-2024',
    title: 'Psylocke (Vol. 1, 2024)',
    shortTitle: 'Psylocke',
    launchYear: 2024,
    color: 'indigo',
  },
  'hellverine-2024': {
    id: 'hellverine-2024',
    title: 'Hellverine (2024)',
    shortTitle: 'Hellverine',
    launchYear: 2024,
    color: 'lime',
  },
  'laura-kinney-wolverine-2024': {
    id: 'laura-kinney-wolverine-2024',
    title: 'Laura Kinney: Wolverine (2024)',
    shortTitle: 'Laura Kinney',
    launchYear: 2024,
    color: 'slate',
  },
  'dazzler-2024': {
    id: 'dazzler-2024',
    title: 'Dazzler (2024)',
    shortTitle: 'Dazzler',
    launchYear: 2024,
    color: 'pink',
  },
  'cable-love-and-chrome-2025': {
    id: 'cable-love-and-chrome-2025',
    title: 'Cable: Love and Chrome (2025)',
    shortTitle: 'Cable',
    launchYear: 2025,
    color: 'teal',
  },
  'magik-2025': {
    id: 'magik-2025',
    title: 'Magik (2025)',
    shortTitle: 'Magik',
    launchYear: 2025,
    color: 'violet',
  },
  'mystique-2024': {
    id: 'mystique-2024',
    title: 'Mystique (2024)',
    shortTitle: 'Mystique',
    launchYear: 2024,
    color: 'sky',
  },
};
