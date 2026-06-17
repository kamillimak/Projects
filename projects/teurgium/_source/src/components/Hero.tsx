/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, Sparkles, Compass, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  setTab: (tab: string) => void;
  scrollToSection?: (id: string) => void;
}

export default function Hero({ setTab, scrollToSection }: HeroProps) {
  const USPList = [
    { text: 'Płyty tarasowe 2 cm' },
    { text: 'Systemy wsporników' },
    { text: 'Kostka brukowa premium' },
    { text: 'Kruszywa dekoracyjne' }
  ];

  return (
    <div className="relative bg-[#FDFDFB] text-[#1A1A1A] overflow-hidden py-16 sm:py-24 border-b border-stone-200">
      {/* Decorative large serif highlight word in background */}
      <div className="absolute top-10 left-10 text-[120px] font-serif font-black text-stone-200/10 pointer-events-none select-none tracking-tighter">
        PREMIUM
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Copy and Branding */}
        <div className="lg:col-span-7 space-y-8 text-left z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-stone-100 border border-stone-200 text-[#2D3E33] text-[10px] font-bold uppercase tracking-widest font-mono">
            <Sparkles className="h-3 w-3" />
            <span>Kunszt • Estetyka • Trwałość</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium text-stone-900 leading-[1.1] tracking-tight">
            Tworzymy stylowe <br />
            <span className="italic text-[#2D3E33]">
              tarasy i podjazdy
            </span> <br />
            oraz ogrody premium.
          </h1>

          <p className="text-base sm:text-lg text-stone-600 max-w-xl font-light leading-relaxed">
            Przestań kropić klej i naprawiać spękane posadzki tarasowe. Dostarczamy bezkompromisowe systemy wentylowane, włoską ceramikę Marazzi i betonowe systemy Bruk-Bet, zabezpieczone na dekady.
          </p>

          {/* Core Categories list with bullets */}
          <div className="pt-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-3">W asortymencie premium:</p>
            <div className="grid grid-cols-2 gap-3 max-w-md">
              {USPList.map((usp, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-stone-700 hover:text-[#2D3E33] transition-colors duration-200">
                  <CheckCircle2 className="h-4 w-4 text-[#2D3E33] shrink-0" />
                  <span className="text-xs font-semibold uppercase tracking-wider font-mono">{usp.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Call-to-actions */}
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
            <button
              onClick={() => setTab('offer')}
              className="flex items-center justify-center space-x-2 px-8 py-4 bg-[#2D3E33] hover:bg-[#1f2b23] text-white text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-sm"
            >
              <span>Zobacz Ekskluzywną Ofertę</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => setTab('inquiry')}
              className="flex items-center justify-center px-8 py-4 bg-white text-stone-800 border border-stone-300 hover:bg-stone-50 text-xs font-bold uppercase tracking-widest transition-all duration-300"
            >
              Uruchom Zapytanie RFQ
            </button>
          </div>
        </div>

        {/* Right Side: Visual floating card with interactive lead magnet */}
        <div className="lg:col-span-5 relative mt-8 lg:mt-0 z-10">
          <div className="relative mx-auto max-w-md bg-white border border-stone-200 p-6 sm:p-8 shadow-xl">
            <div className="absolute -top-4 -right-4 h-12 w-12 rounded-none bg-[#2D3E33]/15 border border-[#2D3E33]/20 flex items-center justify-center text-[#2D3E33]">
              <Compass className="h-5 w-5" />
            </div>

            <span className="text-[#2D3E33] text-[10px] font-bold font-mono tracking-widest uppercase block mb-1">Darmowe Kosztorysowanie</span>
            <h3 className="text-xl font-serif text-stone-900 leading-tight">Zapotrzebowanie i Fundament</h3>
            <p className="text-xs text-stone-500 mt-1.5 mb-6 leading-relaxed">Wpisz szacowane wymiary tarasu i dobierz optymalny fundament płyt wentylowanych.</p>

            <div className="space-y-4">
              <button
                onClick={() => setTab('calculator')}
                className="w-full py-4 bg-[#2D3E33] hover:bg-[#1f2b23] text-white font-bold text-xs uppercase tracking-widest transition-all duration-350 shadow-sm block text-center"
              >
                Uruchom Kalkulator Tarasu
              </button>

              <div className="border-t border-stone-100 pt-5 flex items-center justify-between text-xs text-stone-500">
                <div className="text-center w-1/3 border-r border-stone-200">
                  <span className="block font-serif font-bold text-lg text-[#2D3E33]">R11</span>
                  <span className="block text-[8px] uppercase tracking-wider text-stone-400 font-bold">Zalecany poślizg</span>
                </div>
                <div className="text-center w-1/3 border-r border-stone-200">
                  <span className="block font-serif font-bold text-lg text-[#2D3E33]">100%</span>
                  <span className="block text-[8px] uppercase tracking-wider text-stone-400 font-bold">Mrozoodporność</span>
                </div>
                <div className="text-center w-1/3 text-stone-500">
                  <span className="block font-serif font-bold text-lg text-[#2D3E33]">A+</span>
                  <span className="block text-[8px] uppercase tracking-wider text-stone-400 font-bold">Klasa Trwałości</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
