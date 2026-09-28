import React from 'react';
import { ShoppingBag, Heart, Search, Eye, Sparkles } from 'lucide-react';
import { ArtCategory } from '../types/art';

interface NavbarProps {
  activeCategory: ArtCategory;
  onSelectCategory: (cat: ArtCategory) => void;
  cartCount: number;
  cartTotal: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenVirtualWall: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  showSearch: boolean;
  onToggleSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeCategory,
  onSelectCategory,
  cartCount,
  cartTotal,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenVirtualWall,
  searchQuery,
  onSearchChange,
  showSearch,
  onToggleSearch
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#faf8f5]/95 backdrop-blur-md border-b border-stone-200 transition-all">
      {/* Institutional Top Ribbon */}
      <div className="bg-[#1c1917] text-[#e7e5e4] px-4 py-1.5 text-xs text-center font-serif tracking-widest uppercase flex items-center justify-center gap-3">
        <span>Spring Salon 2026 Collection</span>
        <span aria-hidden="true" className="text-stone-500">·</span>
        <span className="hidden sm:inline">Certified Provenance on All Acquisitions</span>
        <span aria-hidden="true" className="text-stone-500 hidden sm:inline">·</span>
        <span>Complimentary Museum Crating Over $1,000</span>
      </div>

      {/* Main 3-Zone Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Zone 1: Wordmark */}
        <div className="flex items-center gap-4">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onSelectCategory('all');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex flex-col"
          >
            <span className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-stone-900 group-hover:text-stone-700 transition-colors">
              Vernissage
            </span>
            <span className="text-[10px] tracking-[0.25em] uppercase text-stone-500 font-sans -mt-1">
              Fine Art Store & Salon
            </span>
          </a>
        </div>

        {/* Zone 2: Navigation Links (Domain category filters) */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-600">
          <button
            onClick={() => onSelectCategory('all')}
            className={`transition-colors pb-0.5 border-b-2 whitespace-nowrap ${
              activeCategory === 'all'
                ? 'border-stone-900 text-stone-950 font-semibold'
                : 'border-transparent hover:text-stone-900'
            }`}
          >
            All Works
          </button>
          <button
            onClick={() => onSelectCategory('painting')}
            className={`transition-colors pb-0.5 border-b-2 whitespace-nowrap ${
              activeCategory === 'painting'
                ? 'border-stone-900 text-stone-950 font-semibold'
                : 'border-transparent hover:text-stone-900'
            }`}
          >
            Original Paintings
          </button>
          <button
            onClick={() => onSelectCategory('print')}
            className={`transition-colors pb-0.5 border-b-2 whitespace-nowrap ${
              activeCategory === 'print'
                ? 'border-stone-900 text-stone-950 font-semibold'
                : 'border-transparent hover:text-stone-900'
            }`}
          >
            Fine Art Prints
          </button>
          <button
            onClick={() => onSelectCategory('sculpture')}
            className={`transition-colors pb-0.5 border-b-2 whitespace-nowrap ${
              activeCategory === 'sculpture'
                ? 'border-stone-900 text-stone-950 font-semibold'
                : 'border-transparent hover:text-stone-900'
            }`}
          >
            Sculptures
          </button>
          <button
            onClick={() => onSelectCategory('atelier')}
            className={`transition-colors pb-0.5 border-b-2 whitespace-nowrap ${
              activeCategory === 'atelier'
                ? 'border-stone-900 text-stone-950 font-semibold'
                : 'border-transparent hover:text-stone-900'
            }`}
          >
            Atelier Supplies
          </button>
        </nav>

        {/* Zone 3: Interactive Affordances */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Virtual Wall Simulator CTA */}
          <button
            onClick={onOpenVirtualWall}
            title="Interactive Room Wall Simulator"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-800 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-sm transition-colors whitespace-nowrap"
          >
            <Eye className="w-3.5 h-3.5 text-stone-600" />
            <span className="hidden sm:inline">Exhibition Wall</span>
          </button>

          {/* Search Trigger */}
          <button
            onClick={onToggleSearch}
            className={`p-2.5 rounded-sm transition-colors ${
              showSearch ? 'bg-stone-200 text-stone-900' : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
            aria-label="Search collection"
            title="Search Art Store"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-sm transition-colors"
            aria-label="View Saved Works"
            title="Collector Wishlist"
          >
            <Heart className="w-4 h-4" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-stone-900 text-white text-[10px] font-mono flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-sm transition-all shadow-sm"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="font-mono tabular-nums">
              {cartCount > 0 ? (
                <>
                  <span className="font-semibold">{cartCount}</span>
                  <span className="hidden sm:inline text-stone-300 ml-1.5 border-l border-stone-700 pl-1.5">
                    ${cartTotal.toLocaleString()}
                  </span>
                </>
              ) : (
                'Cart'
              )}
            </span>
          </button>
        </div>
      </div>

      {/* Expandable Search Bar */}
      {showSearch && (
        <div className="border-t border-stone-200 bg-white py-3 px-4 sm:px-6 shadow-inner animate-in slide-in-from-top duration-150">
          <div className="max-w-3xl mx-auto flex items-center gap-3">
            <Search className="w-4 h-4 text-stone-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by artist, artwork title, medium (e.g. oil, bronze, lapis), or movement..."
              className="w-full text-sm bg-transparent border-0 focus:ring-0 focus:outline-none placeholder-stone-400 text-stone-900"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="text-xs text-stone-400 hover:text-stone-700 font-mono underline"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
