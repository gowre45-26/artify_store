import React, { useState } from 'react';
import { Artwork, FrameOption } from '../types/art';
import { FRAME_OPTIONS } from '../data/artworks';
import { X, Check, Eye, Heart, ShoppingBag, ShieldCheck, Award, Info, Sparkles } from 'lucide-react';

interface ArtworkModalProps {
  artwork: Artwork | null;
  onClose: () => void;
  onAddToCart: (artwork: Artwork, frame: FrameOption) => void;
  onOpenVirtualWallWithArt: (artworkId: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (artworkId: string) => void;
}

export const ArtworkModal: React.FC<ArtworkModalProps> = ({
  artwork,
  onClose,
  onAddToCart,
  onOpenVirtualWallWithArt,
  isWishlisted,
  onToggleWishlist
}) => {
  if (!artwork) return null;

  const [selectedFrame, setSelectedFrame] = useState<FrameOption>(FRAME_OPTIONS[0]);
  const [addedToast, setAddedToast] = useState(false);
  const [activeTab, setActiveTab] = useState<'provenance' | 'details' | 'artist'>('details');

  const finalPrice = artwork.price + (artwork.framingCompatible ? selectedFrame.price : 0);

  const handleAdd = () => {
    onAddToCart(artwork, artwork.framingCompatible ? selectedFrame : FRAME_OPTIONS[0]);
    setAddedToast(true);
    setTimeout(() => {
      setAddedToast(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-stone-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-[#faf8f5] border border-stone-300 rounded-xs shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-white">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-stone-500">
            <span>Catalogue Accession</span>
            <span aria-hidden="true">·</span>
            <span>{artwork.edition}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleWishlist(artwork.id)}
              className={`p-2 rounded-xs transition-colors ${
                isWishlisted
                  ? 'text-red-600 bg-red-50'
                  : 'text-stone-500 hover:text-red-600 hover:bg-stone-100'
              }`}
              title="Save to Wishlist"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-xs transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[80vh] overflow-y-auto">
          {/* Left Column: Artwork Presentation (6 cols) */}
          <div className="md:col-span-6 bg-stone-100 p-6 sm:p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-stone-200">
            <div className="relative max-w-full">
              <div
                className={`relative transition-all duration-300 bg-white p-2 ${
                  artwork.framingCompatible ? selectedFrame.cssBorder : 'border border-stone-300 shadow-lg'
                }`}
              >
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="max-h-[340px] sm:max-h-[420px] w-auto object-contain mx-auto select-none"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* View in Room Wall Button */}
              {artwork.framingCompatible && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenVirtualWallWithArt(artwork.id);
                  }}
                  className="mt-4 w-full py-2.5 px-4 bg-white/95 hover:bg-white border border-stone-300 text-stone-800 text-xs font-medium rounded-xs shadow-xs flex items-center justify-center gap-2 transition-all"
                >
                  <Eye className="w-3.5 h-3.5 text-stone-600" />
                  <span>Mount & Preview in Virtual Gallery Wall</span>
                </button>
              )}
            </div>

            {/* Curatorial Room Advice */}
            {artwork.exhibitionRoomNote && (
              <div className="mt-4 text-center max-w-sm">
                <p className="text-[11px] text-stone-500 italic">
                  &ldquo;{artwork.exhibitionRoomNote}&rdquo;
                </p>
              </div>
            )}
          </div>

          {/* Right Column: Curatorial Dossier & Purchase (6 cols) */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between bg-white space-y-6">
            <div>
              {/* Unboxed Metadata */}
              <div className="text-xs text-stone-500 flex items-center gap-2 font-mono">
                <span>{artwork.artist}</span>
                <span aria-hidden="true">·</span>
                <span>{artwork.artistNationality}</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 mt-1">
                {artwork.title}
              </h2>

              <p className="text-stone-600 text-xs mt-2 leading-relaxed">
                {artwork.description}
              </p>

              {/* Tab Navigation for Detailed Dossier */}
              <div className="flex items-center gap-4 border-b border-stone-200 mt-6 pt-2">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`text-xs pb-2 font-medium tracking-wide transition-colors ${
                    activeTab === 'details'
                      ? 'border-b-2 border-stone-900 text-stone-950 font-semibold'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  Specifications
                </button>
                <button
                  onClick={() => setActiveTab('provenance')}
                  className={`text-xs pb-2 font-medium tracking-wide transition-colors ${
                    activeTab === 'provenance'
                      ? 'border-b-2 border-stone-900 text-stone-950 font-semibold'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  Provenance History
                </button>
                <button
                  onClick={() => setActiveTab('artist')}
                  className={`text-xs pb-2 font-medium tracking-wide transition-colors ${
                    activeTab === 'artist'
                      ? 'border-b-2 border-stone-900 text-stone-950 font-semibold'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  Artist Bio
                </button>
              </div>

              {/* Tab Contents */}
              <div className="py-4 text-xs">
                {activeTab === 'details' && (
                  <div className="space-y-2.5 text-stone-600">
                    <div className="grid grid-cols-3 py-1 border-b border-stone-100">
                      <span className="text-stone-400 font-mono">Medium</span>
                      <span className="col-span-2 text-stone-900 font-medium">{artwork.medium}</span>
                    </div>
                    <div className="grid grid-cols-3 py-1 border-b border-stone-100">
                      <span className="text-stone-400 font-mono">Dimensions</span>
                      <span className="col-span-2 text-stone-900 font-medium">
                        {artwork.dimensions.widthCm} × {artwork.dimensions.heightCm} cm ({artwork.dimensions.imperial})
                      </span>
                    </div>
                    <div className="grid grid-cols-3 py-1 border-b border-stone-100">
                      <span className="text-stone-400 font-mono">Movement</span>
                      <span className="col-span-2 text-stone-900 font-medium">{artwork.style}</span>
                    </div>
                    <div className="grid grid-cols-3 py-1">
                      <span className="text-stone-400 font-mono">Certificate</span>
                      <span className="col-span-2 text-stone-700">{artwork.certificateDetails}</span>
                    </div>
                  </div>
                )}

                {activeTab === 'provenance' && (
                  <ul className="space-y-2 text-stone-600">
                    {artwork.provenance.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="font-mono text-stone-400">0{index + 1}.</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {activeTab === 'artist' && (
                  <div className="space-y-2 text-stone-700 leading-relaxed">
                    <p>{artwork.artistBio}</p>
                    <div className="pt-2 text-[11px] text-stone-500 font-mono">
                      Works by {artwork.artist} are held in institutional collections throughout Europe and North America.
                    </div>
                  </div>
                )}
              </div>

              {/* Framing Selection if compatible */}
              {artwork.framingCompatible && (
                <div className="mt-2 pt-4 border-t border-stone-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-stone-800">
                      Curated Framing Moulding
                    </span>
                    <span className="text-xs font-mono text-stone-500">
                      {selectedFrame.price === 0 ? 'Included' : `+$${selectedFrame.price}`}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {FRAME_OPTIONS.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setSelectedFrame(f)}
                        className={`p-2 rounded-xs border text-left text-xs transition-all ${
                          selectedFrame.id === f.id
                            ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900 font-medium text-stone-950'
                            : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300'
                        }`}
                      >
                        <div className="truncate">{f.name}</div>
                        <div className="text-[10px] font-mono text-stone-400">
                          {f.price === 0 ? 'Gallery Wrap' : `+$${f.price}`}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-stone-200 space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-stone-400">
                    Acquisition Total
                  </span>
                  <div className="text-2xl font-serif font-semibold text-stone-900 font-mono tabular-nums">
                    ${finalPrice.toLocaleString()}
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-flex items-center gap-1 text-[11px] text-emerald-800 font-mono font-medium">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>In Atelier Stock</span>
                  </span>
                  <div className="text-[10px] text-stone-400">Crated in 24–48 hours</div>
                </div>
              </div>

              <button
                onClick={handleAdd}
                className="w-full py-3.5 bg-stone-900 hover:bg-stone-800 text-white text-sm font-medium rounded-xs transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{addedToast ? 'Added to Acquisition Bag!' : 'Acquire for Collection'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
