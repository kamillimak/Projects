/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Tag, ArrowRight } from 'lucide-react';
import { PROMOTIONS } from '../data';

interface PromoSliderProps {
  setTab: (tab: string) => void;
  setSelectedProductId: (id: string | null) => void;
}

export default function PromoSlider({ setTab, setSelectedProductId }: PromoSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? PROMOTIONS.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === PROMOTIONS.length - 1 ? 0 : prev + 1));
  };

  const handlePromoClick = (prodId: string) => {
    setSelectedProductId(prodId);
    setTab('offer');
  };

  const currentPromo = PROMOTIONS[currentIndex];

  return (
    <section className="bg-[#1C2720] py-16 px-4 sm:px-6 lg:px-8 border-y border-[#26352b] text-white overflow-hidden">
      <div className="max-w-5xl mx-auto relative">
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-white/10 border border-white/20 text-[#8da094] text-xs font-bold uppercase tracking-widest font-mono">
            <Tag className="h-3 w-3" />
            <span>Kolekcje Sezonowe</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-medium tracking-tight mt-2 text-white">
            Wyselekcjonowane Okazje Teurgium
          </h2>
          <p className="text-sm text-stone-300 mt-1">Końcówki partii, zestawy pakietowe oraz promocje producentów dostępne od ręki.</p>
        </div>

        {/* Slide Frame */}
        <div className="relative mt-8 bg-[#131d16] border border-[#2d3a31] overflow-hidden shadow-2xl">
          <div className={`p-8 sm:p-12 bg-gradient-to-br ${currentPromo.bgGradient} flex flex-col md:flex-row justify-between items-center gap-8`}>
            
            <div className="flex-1 space-y-4 text-left">
              <span className="inline-block px-3 py-1 bg-[#2D3E33] text-white text-xs font-mono font-bold uppercase tracking-wider">
                {currentPromo.tag}
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-medium tracking-tight text-white leading-tight">
                {currentPromo.title}
              </h3>
              <p className="text-sm sm:text-base text-stone-200 font-light leading-relaxed">
                {currentPromo.description}
              </p>
              
              <button
                onClick={() => handlePromoClick(currentPromo.productId)}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-white text-stone-900 font-serif font-semibold text-sm hover:bg-[#FDFDFB] transition-colors duration-300 shadow-sm"
              >
                <span>{currentPromo.btnText}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {/* Visual Deco Indicator */}
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="h-40 w-40 border border-[#2e3b31] flex flex-col items-center justify-center p-4 bg-[#1C2720]/80">
                <span className="text-xs uppercase tracking-widest text-[#8da094] font-mono font-bold">Zweryfikowana</span>
                <span className="text-2xl font-serif font-black text-white text-center tracking-tight">PREMIUM</span>
                <span className="text-[10px] text-stone-400 font-mono text-center">oferta limitowana seryjnie</span>
              </div>
            </div>

          </div>

          {/* Navigation Arrows */}
          <div className="absolute inset-y-0 left-2 flex items-center z-20">
            <button
              onClick={prevSlide}
              aria-label="Previous Slide"
              className="h-10 w-10 bg-[#1C2720]/80 border border-[#2e3b31] flex items-center justify-center text-stone-300 hover:text-white hover:bg-[#2D3E33] transition-all duration-200"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          </div>
          <div className="absolute inset-y-0 right-2 flex items-center z-20">
            <button
              onClick={nextSlide}
              aria-label="Next Slide"
              className="h-10 w-10 bg-[#1C2720]/80 border border-[#2e3b31] flex items-center justify-center text-stone-300 hover:text-white hover:bg-[#2D3E33] transition-all duration-200"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center space-x-2 mt-4">
          {PROMOTIONS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-6 bg-[#2D3E33]' : 'w-2 bg-[#2d3a31]'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
