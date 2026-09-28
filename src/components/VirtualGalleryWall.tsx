import React, { useState } from 'react';
import { Artwork, FrameOption } from '../types/art';
import { FRAME_OPTIONS } from '../data/artworks';
import { Eye, Sun, Lamp, Moon, Maximize2, ShoppingBag, X, Check } from 'lucide-react';

interface VirtualGalleryWallProps {
  artworks: Artwork[];
  selectedArtworkId?: string;
  onClose?: () => void;
  onAddToCart: (artwork: Artwork, frame: FrameOption) => void;
}

const WALL_COLORS = [
  { id: 'bone', name: 'Alabaster Stone', bg: '#f4f1ea', textColor: 'text-stone-800', isDark: false },
  { id: 'obsidian', name: 'Curator Obsidian', bg: '#18181b', textColor: 'text-stone-100', isDark: true },
  { id: 'prussian', name: 'Prussian Lapis', bg: '#1e293b', textColor: 'text-stone-100', isDark: true },
  { id: 'terracotta', name: 'Atelier Terracotta', bg: '#70392c', textColor: 'text-stone-100', isDark: true },
  { id: 'sage', name: 'Museum Sage', bg: '#334037', textColor: 'text-stone-100', isDark: true },
];

export const VirtualGalleryWall: React.FC<VirtualGalleryWallProps> = ({
  artworks,
  selectedArtworkId,
  onClose,
  onAddToCart,
}) => {
  // Filter only artworks suitable for wall hanging (paintings and prints)
  const wallArtworks = artworks.filter(a => a.framingCompatible || a.category === 'painting' || a.category === 'print');
  
  const [activeArtworkId, setActiveArtworkId] = useState<string>(
    selectedArtworkId || wallArtworks[0]?.id || artworks[0]?.id
  );
  const [activeWallColor, setActiveWallColor] = useState(WALL_COLORS[0]);
  const [activeFrame, setActiveFrame] = useState<FrameOption>(FRAME_OPTIONS[1]); // Black oak default
  const [lighting, setLighting] = useState<'spotlight' | 'daylight' | 'ambient'>('spotlight');
  const [showBench, setShowBench] = useState(true);
  const [addedToast, setAddedToast] = useState(false);

  const currentArtwork = wallArtworks.find(a => a.id === activeArtworkId) || wallArtworks[0];

  const handleAddToCart = () => {
    if (!currentArtwork) return;
    onAddToCart(currentArtwork, activeFrame);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  const totalPrice = (currentArtwork?.price || 0) + activeFrame.price;

  return (
    <div className="bg-[#faf8f5] border-y border-stone-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Curatorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-stone-500 mb-1">
              Interactive Curatorial Preview
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-normal">
              Virtual Exhibition Wall
            </h2>
            <p className="text-sm text-stone-600 mt-1 max-w-xl">
              Preview any painting or print mounted inside a museum salon. Test custom hand-crafted mouldings, wall pigment tones, and gallery illumination.
            </p>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="self-start md:self-auto p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-200 rounded-sm transition-colors"
              title="Close Exhibition Wall"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Studio Wall Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Visual Wall Canvas (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div
              className="relative w-full h-[460px] sm:h-[540px] rounded-xs border border-stone-300 shadow-2xl flex flex-col items-center justify-center p-6 sm:p-10 transition-colors duration-500 overflow-hidden"
              style={{ backgroundColor: activeWallColor.bg }}
            >
              {/* Lighting overlay effects */}
              {lighting === 'spotlight' && (
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-700"
                  style={{
                    background: 'radial-gradient(circle at 50% 45%, rgba(255, 252, 235, 0.4) 0%, rgba(0, 0, 0, 0.55) 75%)'
                  }}
                />
              )}
              {lighting === 'daylight' && (
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-700"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(0, 0, 0, 0.15) 100%)'
                  }}
                />
              )}
              {lighting === 'ambient' && (
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-700"
                  style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(255, 240, 210, 0.15) 0%, rgba(0, 0, 0, 0.3) 100%)'
                  }}
                />
              )}

              {/* Museum Spotlight Lamp Fixture (aesthetic indicator at top) */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-70">
                <div className="w-8 h-2 bg-stone-700 rounded-t-sm" />
                <div className="w-12 h-3 bg-stone-800 rounded-b-md shadow-md" />
                <div className="w-0.5 h-1 bg-amber-300 shadow-[0_0_12px_#fde047]" />
              </div>

              {/* The Framed Artwork Display */}
              <div className="relative z-10 flex flex-col items-center max-w-[85%] max-h-[75%] transition-all duration-300">
                <div
                  className={`relative transition-all duration-300 ${activeFrame.cssBorder} bg-black`}
                  style={{
                    boxShadow: activeWallColor.isDark
                      ? '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 15px rgba(255, 255, 255, 0.05)'
                      : '0 25px 50px -12px rgba(0, 0, 0, 0.45)'
                  }}
                >
                  <img
                    src={currentArtwork.image}
                    alt={currentArtwork.title}
                    className="max-h-[300px] sm:max-h-[360px] w-auto object-contain block select-none"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Museum Accession Card under the painting */}
                <div
                  className={`mt-4 px-3 py-1.5 rounded-xs text-center max-w-sm backdrop-blur-xs transition-colors ${
                    activeWallColor.isDark ? 'bg-black/40 text-stone-200' : 'bg-white/70 text-stone-800'
                  } border ${activeWallColor.isDark ? 'border-white/10' : 'border-stone-300/60'}`}
                >
                  <div className="font-serif text-sm font-medium leading-tight">
                    {currentArtwork.title}
                  </div>
                  <div className="text-[11px] opacity-80 mt-0.5">
                    {currentArtwork.artist} ({currentArtwork.year}) · {currentArtwork.dimensions.imperial}
                  </div>
                </div>
              </div>

              {/* Realistic Museum Bench Benchmark */}
              {showBench && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-48 sm:w-64 flex flex-col items-center pointer-events-none opacity-85">
                  <div className="w-full h-3.5 bg-stone-900 rounded-xs shadow-lg border-t border-stone-700" />
                  <div className="w-full flex justify-between px-4">
                    <div className="w-2.5 h-7 bg-stone-800 border-r border-stone-700" />
                    <div className="w-2.5 h-7 bg-stone-800 border-l border-stone-700" />
                  </div>
                  <div className="text-[9px] uppercase tracking-wider text-stone-400 font-mono -mt-1">
                    Museum Scale Reference
                  </div>
                </div>
              )}
            </div>

            {/* Quick Artwork Carousel Picker */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1">
              <span className="text-xs font-mono text-stone-500 uppercase tracking-wider shrink-0">
                Switch Artwork:
              </span>
              {wallArtworks.map((art) => (
                <button
                  key={art.id}
                  onClick={() => setActiveArtworkId(art.id)}
                  className={`flex items-center gap-2 p-1.5 rounded-sm border shrink-0 text-left transition-all ${
                    art.id === activeArtworkId
                      ? 'border-stone-900 bg-stone-900 text-white shadow-sm'
                      : 'border-stone-200 bg-white text-stone-700 hover:border-stone-400'
                  }`}
                >
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-8 h-8 object-cover rounded-xs"
                    referrerPolicy="no-referrer"
                  />
                  <div className="pr-2">
                    <div className="text-xs font-medium truncate max-w-[120px]">{art.title}</div>
                    <div className={`text-[10px] font-mono ${art.id === activeArtworkId ? 'text-stone-300' : 'text-stone-400'}`}>
                      ${art.price.toLocaleString()}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Control Console (4 cols) */}
          <div className="lg:col-span-4 bg-white border border-stone-200 rounded-xs p-5 sm:p-6 space-y-6 shadow-sm">
            {/* Current Artwork Overview */}
            <div className="border-b border-stone-200 pb-4">
              <span className="text-[10px] uppercase font-mono tracking-widest text-stone-400">
                Selected Acquisition
              </span>
              <h3 className="font-serif text-2xl text-stone-900 font-medium leading-snug">
                {currentArtwork.title}
              </h3>
              <div className="text-xs text-stone-600 mt-1">
                {currentArtwork.artist} · {currentArtwork.medium}
              </div>
              <div className="text-xs text-stone-500 mt-0.5">
                Dimensions: {currentArtwork.dimensions.widthCm} × {currentArtwork.dimensions.heightCm} cm ({currentArtwork.dimensions.imperial})
              </div>
            </div>

            {/* 1. Framing Customizer */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-800">
                  Custom Framing
                </span>
                <span className="text-xs text-stone-500 font-mono">
                  {activeFrame.price === 0 ? 'Included' : `+$${activeFrame.price}`}
                </span>
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                {FRAME_OPTIONS.map((frame) => (
                  <button
                    key={frame.id}
                    onClick={() => setActiveFrame(frame)}
                    className={`p-3 rounded-xs border text-left text-xs transition-all flex items-start justify-between gap-2 ${
                      activeFrame.id === frame.id
                        ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <div>
                      <div className="font-medium text-stone-900 flex items-center gap-1.5">
                        {activeFrame.id === frame.id && <Check className="w-3.5 h-3.5 text-stone-900" />}
                        {frame.name}
                      </div>
                      <div className="text-stone-500 text-[11px] mt-0.5 leading-snug">
                        {frame.description}
                      </div>
                    </div>
                    <span className="font-mono text-stone-700 shrink-0 font-medium">
                      {frame.price === 0 ? '$0' : `+$${frame.price}`}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Wall Paint Swatches */}
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-800 block">
                Gallery Wall Palette
              </span>
              <div className="flex items-center gap-2">
                {WALL_COLORS.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setActiveWallColor(color)}
                    title={color.name}
                    className={`w-9 h-9 rounded-full border-2 transition-transform ${
                      activeWallColor.id === color.id
                        ? 'scale-110 border-stone-900 shadow-md ring-2 ring-stone-400'
                        : 'border-stone-300 hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.bg }}
                  />
                ))}
              </div>
              <div className="text-[11px] text-stone-500 font-mono">
                Current: {activeWallColor.name}
              </div>
            </div>

            {/* 3. Lighting Mode & Bench */}
            <div className="space-y-2 pt-2 border-t border-stone-200">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-800 block">
                Salon Lighting
              </span>
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-stone-100 rounded-sm">
                <button
                  onClick={() => setLighting('spotlight')}
                  className={`py-1.5 text-xs font-medium rounded-xs flex items-center justify-center gap-1 transition-colors ${
                    lighting === 'spotlight' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Lamp className="w-3 h-3" />
                  <span>Spotlight</span>
                </button>
                <button
                  onClick={() => setLighting('daylight')}
                  className={`py-1.5 text-xs font-medium rounded-xs flex items-center justify-center gap-1 transition-colors ${
                    lighting === 'daylight' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Sun className="w-3 h-3" />
                  <span>Daylight</span>
                </button>
                <button
                  onClick={() => setLighting('ambient')}
                  className={`py-1.5 text-xs font-medium rounded-xs flex items-center justify-center gap-1 transition-colors ${
                    lighting === 'ambient' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Moon className="w-3 h-3" />
                  <span>Ambient</span>
                </button>
              </div>

              {/* Bench toggle */}
              <label className="flex items-center gap-2 pt-1 text-xs text-stone-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={showBench}
                  onChange={(e) => setShowBench(e.target.checked)}
                  className="rounded text-stone-900 focus:ring-stone-900"
                />
                <span>Display scale benchmark (gallery bench)</span>
              </label>
            </div>

            {/* Price & Action */}
            <div className="pt-4 border-t border-stone-200 space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-stone-500 font-mono block">
                    Total Investment
                  </span>
                  <span className="text-xs text-stone-400">
                    Artwork (${currentArtwork.price.toLocaleString()}) + Frame (${activeFrame.price})
                  </span>
                </div>
                <div className="text-2xl font-serif font-semibold text-stone-900 font-mono tabular-nums">
                  ${totalPrice.toLocaleString()}
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full py-3.5 bg-stone-900 hover:bg-stone-800 text-white text-sm font-medium rounded-xs transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{addedToast ? 'Added to Acquisition Cart!' : 'Acquire with This Custom Frame'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
