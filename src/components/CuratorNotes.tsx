import React from 'react';
import { CURATOR_STATEMENT } from '../data/artworks';
import { Shield, Sparkles, Compass, Box, Truck } from 'lucide-react';

export const CuratorNotes: React.FC = () => {
  return (
    <section className="bg-[#f5f2eb] border-y border-stone-300/80 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Curatorial Header */}
        <div className="text-center space-y-2 mb-10">
          <div className="text-xs uppercase font-mono tracking-widest text-stone-500">
            Curatorial Discourse & Exhibition Catalogue
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-normal">
            {CURATOR_STATEMENT.title}
          </h2>
          <div className="text-xs text-stone-600 font-mono">
            {CURATOR_STATEMENT.curator} · {CURATOR_STATEMENT.role}
          </div>
        </div>

        {/* Long-form editorial text with drop cap */}
        <div className="max-w-2xl mx-auto space-y-6 text-stone-800 leading-relaxed text-base font-normal">
          <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-normal first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-stone-900">
            {CURATOR_STATEMENT.essay}
          </p>

          {/* Pull Quote */}
          <blockquote className="my-8 py-4 px-6 border-l-2 border-stone-800 bg-[#ede8df] italic font-serif text-xl sm:text-2xl text-stone-900 leading-snug">
            &ldquo;A true artwork does not merely adorn an interior; it alters the acoustic and contemplative atmosphere of the room.&rdquo;
          </blockquote>

          <p className="text-stone-700 text-sm leading-relaxed">
            Our atelier works directly with master framers in Florence and Berlin to ensure every moulding is historically faithful to the painting&apos;s era, utilizing acid-free rag mounting and museum-grade UV conservation glass that protects pigment vibrancy across generations.
          </p>
        </div>

        {/* 3 Pillars of the Vernissage Art Store */}
        <div className="mt-14 pt-10 border-t border-stone-300 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-stone-900 font-medium">
              <Shield className="w-5 h-5 text-stone-700" />
              <h4 className="font-serif text-lg">Indelible Provenance</h4>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Every canvas and sculpture is catalogued with an archival Hahnemühle holographic certificate, recording foundry marks, exhibition history, and artist signatures.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-stone-900 font-medium">
              <Box className="w-5 h-5 text-stone-700" />
              <h4 className="font-serif text-lg">Custom Master Framing</h4>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Choose between gallery wrap, solid black German oak, 22-karat Florentine gilt wood, or natural American walnut shadowboxes milled to archival standards.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-stone-900 font-medium">
              <Truck className="w-5 h-5 text-stone-700" />
              <h4 className="font-serif text-lg">White-Glove Delivery</h4>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              All acquisitions over $1,000 receive custom wooden timber crating, climate-controlled transport, and door-to-door insurance coverage worldwide.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
