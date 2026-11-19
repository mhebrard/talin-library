import type { FC } from 'react';
import { Sparkles, Search, X } from 'lucide-react';

interface NavbarProps {
  eraTitle: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Navbar: FC<NavbarProps> = ({
  eraTitle,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0c0e17]/90 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3.5 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand & Era Pill */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center text-black shadow-lg shadow-yellow-500/20 font-black text-lg">
              X
            </div>
            <div>
              <span className="font-extrabold tracking-tight text-white text-lg block leading-none">
                Talin Library
              </span>
              <span className="text-[11px] font-medium tracking-wide text-slate-400 uppercase">
                Comic Reading Order
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-700/60 text-xs font-semibold text-yellow-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{eraTitle}</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="w-full md:w-80 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search series, issue #, writer..."
            className="w-full pl-9 pr-8 py-1.5 text-sm rounded-lg bg-slate-900/90 border border-slate-700/80 text-slate-100 placeholder-slate-400 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
