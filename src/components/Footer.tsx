import React from 'react';
import { ArtCategory } from '../types/art';

interface FooterProps {
  onSelectCategory: (cat: ArtCategory) => void;
  onOpenVirtualWall: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onOpenVirtualWall }) => {
  return (
    <footer className="bg-[#18181b] text-[#e4e4e7] pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          {/* Brand & Mission (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <span className="font-serif text-3xl font-medium tracking-tight text-white block">
              Vernissage
            </span>
            <div className="text-xs uppercase tracking-widest text-stone-400 font-mono">
              Fine Art Store & Curatorial Salon
            </div>
            <p className="text-stone-400 text-xs leading-relaxed max-w-sm">
              Dedicated to the preservation and direct acquisition of museum-grade physical art: original oils on linen, hand-pulled stone lithographs, bronze foundry castings, and rare mineral pigments.
            </p>
            <div className="pt-2 text-xs text-stone-400 font-mono">
              Vienna · Paris · London · New York
            </div>
          </div>

          {/* Quick Categories (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-white">
              Catalogue Departments
            </div>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('painting');
                    window.scrollTo({ top: 600, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Original Oil & Wax Paintings
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('print');
                    window.scrollTo({ top: 600, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Limited Edition Stone Lithographs
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('sculpture');
                    window.scrollTo({ top: 600, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Cast Bronze & Alabaster Sculptures
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('atelier');
                    window.scrollTo({ top: 600, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Atelier Mineral Pigments & Linens
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenVirtualWall}
                  className="hover:text-white transition-colors"
                >
                  Virtual Exhibition Wall Simulator
                </button>
              </li>
            </ul>
          </div>

          {/* Salon Hours & Private Viewing (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-white">
              Salons & Private Inquiries
            </div>
            <div className="text-xs text-stone-400 space-y-1 leading-relaxed">
              <div><strong>Salon Public Hours:</strong> Tuesday – Sunday, 10:00 – 19:00 CET</div>
              <div><strong>Private Client Salon:</strong> By private appointment</div>
              <div className="pt-2"><strong>Curatorial Desk:</strong> salon@vernissage-store.art</div>
              <div><strong>Consignments:</strong> curatorial@vernissage-store.art</div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 font-mono">
          <div>
            © {new Date().getFullYear()} Vernissage Fine Art Store & Salon. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-stone-300 cursor-pointer">Archival Provenance Standards</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-stone-300 cursor-pointer">White-Glove Transit Terms</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-stone-300 cursor-pointer">Privacy & Consignment</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
