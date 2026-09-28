import React, { useState, useMemo } from 'react';
import { Artwork, ArtCategory, ArtStyle, FrameOption } from '../types/art';
import { FRAME_OPTIONS } from '../data/artworks';
import { Eye, Heart, ShoppingBag, ArrowUpDown, Filter, Sparkles, Check } from 'lucide-react';

interface ProductGridProps {
  artworks: Artwork[];
  activeCategory: ArtCategory;
  onSelectCategory: (cat: ArtCategory) => void;
  searchQuery: string;
  onClearSearch: () => void;
  onOpenQuickView: (artwork: Artwork) => void;
  onOpenVirtualWallWithArt: (artworkId: string) => void;
  onAddToCart: (artwork: Artwork, frame: FrameOption) => void;
  wishlistIds: Set<string>;
  onToggleWishlist: (artworkId: string) => void;
}

const STYLES: { label: string; value: ArtStyle | 'all' }[] = [
  { label: 'All Movements & Styles', value: 'all' },
  { label: 'Abstract Expressionism', value: 'Abstract Expressionism' },
  { label: 'Neo-Impressionism', value: 'Neo-Impressionism' },
  { label: 'Minimalist', value: 'Minimalist' },
  { label: 'Figurative & Classical', value: 'Classical Realism' },
  { label: 'Botanical & Organic', value: 'Botanical & Organic' },
  { label: 'Contemporary', value: 'Contemporary' },
];

export const ProductGrid: React.FC<ProductGridProps> = ({
  artworks,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onClearSearch,
  onOpenQuickView,
  onOpenVirtualWallWithArt,
  onAddToCart,
  wishlistIds,
  onToggleWishlist
}) => {
  const [selectedStyle, setSelectedStyle] = useState<ArtStyle | 'all'>('all');
  const [sortBy, setSortBy] = useState<'curated' | 'price-asc' | 'price-desc'>('curated');
  const [addedId, setAddedId] = useState<string | null>(null);

  // Filtered & Sorted artworks
  const filteredArtworks = useMemo(() => {
    let result = artworks.filter((item) => {
      // Category filter
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      // Style filter
      if (selectedStyle !== 'all' && item.style !== selectedStyle) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesArtist = item.artist.toLowerCase().includes(q);
        const matchesMedium = item.medium.toLowerCase().includes(q);
        const matchesStyle = item.style.toLowerCase().includes(q);
        const matchesCategory = item.category.toLowerCase().includes(q);
        if (!matchesTitle && !matchesArtist && !matchesMedium && !matchesStyle && !matchesCategory) {
          return false;
        }
      }
      return true;
    });

    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else {
      // Curated: featured first
      result.sort((a, b) => (b.isFeaturedExhibition ? 1 : 0) - (a.isFeaturedExhibition ? 1 : 0));
    }

    return result;
  }, [artworks, activeCategory, selectedStyle, searchQuery, sortBy]);

  const handleQuickAdd = (artwork: Artwork) => {
    onAddToCart(artwork, FRAME_OPTIONS[0]); // default unframed
    setAddedId(artwork.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  return (
    <section id="collection-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Editorial Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-stone-500 mb-1">
            Catalogue Raisonné & Store
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-normal">
            Curated Fine Art Acquisitions
          </h2>
          <p className="text-stone-600 text-sm mt-1">
            Displaying {filteredArtworks.length} {filteredArtworks.length === 1 ? 'masterwork' : 'masterworks'} ready for worldwide climate-controlled acquisition.
          </p>
        </div>

        {/* Sorting & Style Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Style Filter */}
          <div className="relative">
            <select
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value as ArtStyle | 'all')}
              className="text-xs bg-white border border-stone-300 rounded-sm py-2 px-3 text-stone-700 hover:border-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-900 cursor-pointer"
            >
              {STYLES.map((st) => (
                <option key={st.value} value={st.value}>
                  {st.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Dropdown */}
          <div className="relative flex items-center">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs bg-white border border-stone-300 rounded-sm py-2 px-3 text-stone-700 hover:border-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-900 cursor-pointer"
            >
              <option value="curated">Sort: Curated Salience</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Segmented Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-4 border-b border-stone-200/80 mb-8 scrollbar-none">
        {(['all', 'painting', 'print', 'sculpture', 'atelier'] as ArtCategory[]).map((cat) => (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`px-4 py-2 text-xs font-medium rounded-xs transition-colors whitespace-nowrap ${
              activeCategory === cat
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-stone-100/80 text-stone-600 hover:bg-stone-200 hover:text-stone-900'
            }`}
          >
            {cat === 'all' && 'All Artworks & Supplies'}
            {cat === 'painting' && 'Original Paintings'}
            {cat === 'print' && 'Fine Art Prints'}
            {cat === 'sculpture' && 'Sculptures'}
            {cat === 'atelier' && 'Atelier Pigments & Tools'}
          </button>
        ))}

        {(selectedStyle !== 'all' || activeCategory !== 'all' || searchQuery) && (
          <button
            onClick={() => {
              onSelectCategory('all');
              setSelectedStyle('all');
              onClearSearch();
            }}
            className="ml-auto text-xs text-stone-500 hover:text-stone-900 underline font-mono shrink-0 pl-3"
          >
            Reset All Filters
          </button>
        )}
      </div>

      {/* Search active notice */}
      {searchQuery && (
        <div className="mb-6 p-3 bg-stone-100 border border-stone-200 rounded-xs flex items-center justify-between text-xs text-stone-700">
          <span>Filtering by search query: &quot;<strong>{searchQuery}</strong>&quot; ({filteredArtworks.length} results)</span>
          <button onClick={onClearSearch} className="font-mono text-stone-900 underline hover:text-stone-600">
            Clear
          </button>
        </div>
      )}

      {/* Zero Results State */}
      {filteredArtworks.length === 0 && (
        <div className="py-20 text-center border border-dashed border-stone-300 rounded-xs bg-white p-8">
          <div className="font-serif text-2xl text-stone-800">No matching artworks found</div>
          <p className="text-stone-500 text-sm mt-2 max-w-md mx-auto">
            Try adjusting your medium, art movement filter, or search keyword to discover other pieces in the exhibition catalog.
          </p>
          <button
            onClick={() => {
              onSelectCategory('all');
              setSelectedStyle('all');
              onClearSearch();
            }}
            className="mt-5 px-5 py-2.5 bg-stone-900 text-white text-xs font-medium rounded-xs hover:bg-stone-800"
          >
            View Complete Exhibition Archive
          </button>
        </div>
      )}

      {/* Art Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
        {filteredArtworks.map((artwork) => {
          const isWishlisted = wishlistIds.has(artwork.id);
          const isAdded = addedId === artwork.id;

          return (
            <div
              key={artwork.id}
              className="group bg-white border border-stone-200 hover:border-stone-400 rounded-xs transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md"
            >
              {/* Image Frame Container */}
              <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden flex items-center justify-center p-4">
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-full h-full object-contain group-hover:scale-[1.03] transition-transform duration-500 ease-out select-none"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />

                {/* Floating Quick Actions */}
                <div className="absolute top-3 right-3 flex flex-col gap-1.5 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    onClick={() => onToggleWishlist(artwork.id)}
                    className={`p-2 rounded-xs shadow-md transition-colors ${
                      isWishlisted
                        ? 'bg-red-50 text-red-600 border border-red-200'
                        : 'bg-white/90 backdrop-blur-xs text-stone-700 hover:text-red-600 hover:bg-white border border-stone-200'
                    }`}
                    title={isWishlisted ? 'Remove from Wishlist' : 'Save to Collector Wishlist'}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>

                  {artwork.framingCompatible && (
                    <button
                      onClick={() => onOpenVirtualWallWithArt(artwork.id)}
                      className="p-2 bg-white/90 backdrop-blur-xs text-stone-700 hover:text-stone-950 hover:bg-white rounded-xs border border-stone-200 shadow-md transition-colors"
                      title="View on Virtual Exhibition Wall"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Edition or Unique badge */}
                <div className="absolute bottom-3 left-3 bg-stone-900/85 backdrop-blur-xs text-stone-200 text-[10px] font-mono px-2 py-0.5 rounded-xs">
                  {artwork.edition}
                </div>
              </div>

              {/* Artwork Metadata & Typography */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  {/* Clean unboxed metadata with bullet separators */}
                  <div className="text-xs text-stone-500 font-sans flex items-center gap-1.5 flex-wrap">
                    <span className="font-medium text-stone-700">{artwork.artist}</span>
                    <span aria-hidden="true">·</span>
                    <span>{artwork.year}</span>
                    <span aria-hidden="true">·</span>
                    <span>{artwork.style}</span>
                  </div>

                  <h3
                    onClick={() => onOpenQuickView(artwork)}
                    className="font-serif text-xl font-medium text-stone-900 hover:text-stone-600 transition-colors cursor-pointer leading-snug"
                  >
                    {artwork.title}
                  </h3>

                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {artwork.medium}
                  </p>

                  <div className="text-[11px] text-stone-400 font-mono">
                    {artwork.dimensions.imperial} ({artwork.dimensions.widthCm} × {artwork.dimensions.heightCm} cm)
                  </div>
                </div>

                {/* Bottom Row: Price & Actions */}
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[10px] uppercase font-mono tracking-widest text-stone-400">
                      Acquisition Price
                    </div>
                    <div className="text-lg font-serif font-semibold text-stone-900 font-mono tabular-nums">
                      ${artwork.price.toLocaleString()}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onOpenQuickView(artwork)}
                      className="px-3 py-2 text-xs font-medium text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-xs transition-colors"
                    >
                      Catalogue Details
                    </button>

                    <button
                      onClick={() => handleQuickAdd(artwork)}
                      disabled={!artwork.inStock}
                      className={`px-3 py-2 text-xs font-medium rounded-xs transition-all flex items-center gap-1.5 shadow-xs ${
                        isAdded
                          ? 'bg-emerald-800 text-white'
                          : 'bg-stone-900 hover:bg-stone-800 text-white'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Acquire</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
