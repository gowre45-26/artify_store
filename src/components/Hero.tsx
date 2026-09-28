import React from 'react';
import { Eye, ArrowDown, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import heroImg from '../assets/images/hero_exhibition_monolith_1790586581662.jpg';

interface HeroProps {
  onExploreClick: () => void;
  onOpenVirtualWall: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onOpenVirtualWall }) => {
  return (
    <section className="relative border-b border-stone-200 bg-[#faf8f5]">
      {/* Visual Anchor: Editorial Curated Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 sm:pt-12 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Curatorial Header & Prose */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-stone-500">
              <span>Exhibition No. 48</span>
              <span aria-hidden="true">·</span>
              <span>Spring & Autumn Salon 2026</span>
            </div>

            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-serif font-normal tracking-tight text-stone-900 leading-[1.1] text-balance">
              Original Fine Art, Master Canvases & Atelier Archives
            </h1>

            <p className="text-stone-600 text-base sm:text-lg leading-relaxed max-w-xl font-normal">
              A curated commercial gallery and art store connecting discerning collectors with original oil paintings, museum-grade stone lithographs, bronze sculptures, and heritage mineral pigments.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreClick}
                className="px-6 py-3.5 bg-stone-900 hover:bg-stone-800 text-white text-sm font-medium tracking-wide rounded-sm transition-all shadow-sm flex items-center gap-2"
              >
                <span>Acquire Artworks</span>
                <ArrowDown className="w-4 h-4 text-stone-300" />
              </button>

              <button
                onClick={onOpenVirtualWall}
                className="px-6 py-3.5 bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-900 text-sm font-medium tracking-wide rounded-sm transition-all flex items-center gap-2"
              >
                <Eye className="w-4 h-4 text-stone-700" />
                <span>Exhibition Wall Simulator</span>
              </button>
            </div>

            {/* Curatorial Guarantee Markers */}
            <div className="pt-4 border-t border-stone-200 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-stone-600">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-stone-700 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-stone-900">Signed Provenance</div>
                  <div className="text-stone-500">Hahnemühle Seal</div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Truck className="w-4 h-4 text-stone-700 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-stone-900">Museum Crating</div>
                  <div className="text-stone-500">Climate-Controlled</div>
                </div>
              </div>

              <div className="flex items-start gap-2 col-span-2 sm:col-span-1">
                <Sparkles className="w-4 h-4 text-stone-700 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-stone-900">Curator Vetted</div>
                  <div className="text-stone-500">Physical Atelier Inspect</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Artwork Showcase Frame */}
          <div className="lg:col-span-6">
            <div className="relative group">
              <div className="relative overflow-hidden rounded-xs bg-stone-200 border border-stone-300 shadow-xl transition-all duration-300">
                <img
                  src={heroImg}
                  alt="Vernissage Art Gallery Exhibition Salon with illuminated abstract masterwork"
                  className="w-full h-[380px] sm:h-[460px] object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                
                {/* Subtle scrim & accession plate */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-950/90 via-stone-950/50 to-transparent p-5 sm:p-6 text-white">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <div className="text-[11px] uppercase tracking-widest text-stone-300 font-mono mb-1">
                        Featured Centerpiece · Gallery Hall
                      </div>
                      <div className="font-serif text-xl sm:text-2xl font-normal">
                        Vernissage Grand Hall Monolith
                      </div>
                      <div className="text-xs text-stone-300 mt-0.5">
                        Soren Lindqvist · Pulverized marble & pigment on flax · 2026
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-mono text-lg font-semibold tabular-nums">$5,200</div>
                      <div className="text-[10px] text-stone-300 uppercase tracking-wider">Original Unique</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Museum Card Plaque beneath */}
              <div className="mt-3 flex items-center justify-between text-xs text-stone-500 font-mono px-1">
                <span>CATALOGUE REF #DK-2026-081</span>
                <span>VIEWABLE IN VIRTUAL GALLERY WALL</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Operational Utility Ribbon */}
      <div className="border-t border-stone-200 bg-stone-100/70 py-3 px-4 sm:px-6 text-xs text-stone-600">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-2 gap-x-6">
          <div className="flex items-center gap-4">
            <span className="font-medium text-stone-900">Salons & Viewing:</span>
            <span>Vienna · Paris · London · New York Private Client Desks</span>
          </div>
          <div className="flex items-center gap-6">
            <span>Direct Artist Consignments</span>
            <span className="hidden sm:inline" aria-hidden="true">·</span>
            <span className="hidden sm:inline">Custom Hand-Gilded Framing Available</span>
            <span aria-hidden="true">·</span>
            <span className="font-medium text-stone-900">Inquiries: salon@vernissage-store.art</span>
          </div>
        </div>
      </div>
    </section>
  );
};
