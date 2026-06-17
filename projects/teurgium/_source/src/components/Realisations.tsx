/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { REALISATIONS } from '../data';
import { MapPin, Hammer, ArrowRight } from 'lucide-react';

interface RealisationsProps {
  previewMode?: boolean;
  setTab?: (tab: string) => void;
  version?: 'v1' | 'v2';
}

export default function Realisations({ previewMode = false, setTab, version = 'v2' }: RealisationsProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const isV2 = version === 'v2';

  const categories = [
    { id: 'all', label: 'Wszystkie realizacje' },
    { id: 'tarasy', label: 'Tarasy' },
    { id: 'podjazdy', label: 'Podjazdy' },
    { id: 'schody', label: 'Schody i Wejścia' },
    { id: 'ogrod', label: 'Aranżacje Ogrodowe' }
  ];

  // If previewMode, we just slice the first 3 items. Otherwise, we filter by category
  const filteredRealisations = previewMode
    ? REALISATIONS.slice(0, 3)
    : activeCategory === 'all'
    ? REALISATIONS
    : REALISATIONS.filter((r) => r.category === activeCategory);

  return (
    <section className={`py-16 px-4 sm:px-6 lg:px-8 ${previewMode ? 'bg-[#1C2720] border-t border-[#26352b]' : 'bg-[#FDFDFB] text-stone-900 min-h-screen'}`}>
      <div className="max-w-7xl mx-auto">
        
        {/* Header content */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div className="max-w-xl text-left">
            <span className={`${previewMode ? 'text-[#8da094]' : 'text-[#2D3E33]'} text-xs font-bold font-mono uppercase tracking-widest block mb-2`}>NASZ KUNSZT W PRAKTYCE</span>
            <h2 className={`text-3xl sm:text-4xl font-serif font-medium tracking-tight ${previewMode ? 'text-white' : 'text-stone-900'}`}>
              Szlachetne Realizacje
            </h2>
            <p className={`mt-4 font-light text-sm sm:text-base leading-relaxed ${previewMode ? 'text-stone-300' : 'text-stone-600'}`}>
              Nie sprzedajemy teorii – zobacz prawdziwe, trwałe efekty inżynieryjne w rezydencjach i ogrodach naszych klientów. Każde zlecenie traktujemy jak unikalne rzemiosło.
            </p>
          </div>
          
          {previewMode && setTab && (
            <button
              onClick={() => setTab('gallery')}
              className="mt-6 md:mt-0 inline-flex items-center space-x-2 text-[#8da094] font-serif font-semibold hover:text-white transition-colors duration-200 group text-sm"
            >
              <span>Zobacz całą galerię</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          )}
        </div>

        {/* Filter Tabs (only in full mode) */}
        {!previewMode && (
          <div className="flex flex-wrap gap-2 mb-10 border-b border-stone-200 pb-6">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs font-serif font-semibold uppercase tracking-wider transition-all duration-300 border ${
                  activeCategory === cat.id
                    ? (isV2 ? 'bg-orange-600 text-white border-orange-600' : 'bg-[#2D3E33] text-white border-[#2D3E33]')
                    : 'bg-white text-stone-600 border-stone-200 hover:text-stone-900 hover:bg-stone-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}

        {/* Realisation Grid cards: wider columns in v2 for larger images (Requirement 2) */}
        <div className={`grid gap-8 ${
          isV2 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2 max-w-5xl mx-auto' 
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        }`}>
          {filteredRealisations.map((project) => (
            <div
              key={project.id}
              className={`group border overflow-hidden shadow-sm transition-all duration-300 transform hover:-translate-y-1 ${
                previewMode
                  ? 'bg-[#253229] border-[#2e3f34] hover:border-[#8da094]'
                  : 'bg-white border-stone-200 hover:border-[#2D3E33]'
              }`}
            >
              {/* Photo */}
              <div className="relative h-64 w-full bg-stone-100 overflow-hidden">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
                
                {/* Location Badge */}
                <div className="absolute bottom-4 left-4 flex items-center space-x-1 bg-black/60 backdrop-blur-md px-3 py-1 text-[11px] font-mono text-stone-200 font-semibold border border-white/10">
                  <MapPin className="h-3 w-3 text-[#8da094] shrink-0" />
                  <span>{project.location}</span>
                </div>
              </div>

              {/* Text Meta Content */}
              <div className="p-6 space-y-4">
                <h3 className={`text-xl font-serif font-medium leading-snug transition-colors duration-200 ${
                  previewMode ? 'text-white group-hover:text-[#8da094]' : 'text-stone-900 group-hover:text-[#2D3E33]'
                }`}>
                  {project.title}
                </h3>
                <p className={`text-xs font-light leading-relaxed ${previewMode ? 'text-stone-300' : 'text-stone-600'}`}>
                  {project.description}
                </p>

                {/* Used Materials list */}
                <div className={`pt-3 border-t ${previewMode ? 'border-[#2e3f34]' : 'border-stone-100'}`}>
                  <div className="flex items-start space-x-2 text-xs font-mono">
                    <Hammer className={`h-3.5 w-3.5 shrink-0 mt-0.5 ${previewMode ? 'text-[#8da094]' : 'text-[#2D3E33]'}`} />
                    <div>
                      <span className={`uppercase tracking-widest block text-[9px] mb-1 font-bold ${previewMode ? 'text-stone-400' : 'text-stone-500'}`}>Zastosowane materiały:</span>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {project.materialsUsed.map((mat, mIdx) => (
                          <span
                            key={mIdx}
                            className={`px-2 py-0.5 border text-[10px] ${
                              previewMode
                                ? 'bg-[#1C2720] border-[#2e3f34] text-[#8da094]'
                                : 'bg-stone-50 border-stone-200 text-[#2D3E33]'
                            }`}
                          >
                            {mat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
