import React from 'react';
import { Artwork, FrameOption } from '../types/art';
import { FRAME_OPTIONS } from '../data/artworks';
import { X, Heart, ShoppingBag, Eye, Trash2 } from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistArtworks: Artwork[];
  onRemoveFromWishlist: (artworkId: string) => void;
  onAddToCart: (artwork: Artwork, frame: FrameOption) => void;
  onOpenQuickView: (artwork: Artwork) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistArtworks,
  onRemoveFromWishlist,
  onAddToCart,
  onOpenQuickView,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/60 backdrop-blur-xs transition-opacity duration-300">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#faf8f5] border-l border-stone-300 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="px-6 py-5 bg-white border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-600 fill-current" />
              <h2 className="font-serif text-xl font-medium text-stone-900">
                Collector Wishlist
              </h2>
              <span className="text-xs font-mono text-stone-400">
                ({wishlistArtworks.length} {wishlistArtworks.length === 1 ? 'work' : 'works'})
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-900 hover:bg-stone-100 rounded-xs transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlistArtworks.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <Heart className="w-10 h-10 mx-auto text-stone-300" />
                <div className="font-serif text-lg text-stone-800">Your wishlist is empty</div>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Click the heart icon on any masterwork, sculpture, or atelier supply to save it for your private collection review.
                </p>
              </div>
            ) : (
              wishlistArtworks.map((art) => (
                <div
                  key={art.id}
                  className="p-4 bg-white border border-stone-200 rounded-xs shadow-xs flex gap-3 items-center justify-between"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={art.image}
                      alt={art.title}
                      className="w-16 h-16 object-contain bg-stone-50 border border-stone-200 rounded-xs p-1"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0">
                      <div className="text-[10px] font-mono text-stone-400 uppercase truncate">
                        {art.artist}
                      </div>
                      <h4
                        onClick={() => {
                          onClose();
                          onOpenQuickView(art);
                        }}
                        className="font-serif text-sm font-medium text-stone-900 hover:text-stone-600 cursor-pointer truncate"
                      >
                        {art.title}
                      </h4>
                      <div className="font-mono text-xs font-semibold text-stone-800 tabular-nums mt-0.5">
                        ${art.price.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => {
                        onAddToCart(art, FRAME_OPTIONS[0]);
                        onRemoveFromWishlist(art.id);
                      }}
                      className="p-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xs transition-colors"
                      title="Move to Acquisition Bag"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onRemoveFromWishlist(art.id)}
                      className="p-2 text-stone-400 hover:text-red-600 rounded-xs transition-colors"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {wishlistArtworks.length > 0 && (
            <div className="p-4 bg-white border-t border-stone-200">
              <button
                onClick={() => {
                  wishlistArtworks.forEach((art) => onAddToCart(art, FRAME_OPTIONS[0]));
                  onClose();
                }}
                className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium rounded-xs transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Move All to Acquisition Bag</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
