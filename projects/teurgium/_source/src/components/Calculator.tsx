/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Product, InquiryItem } from '../types';
import { PRODUCTS } from '../data';
import { Calculator as CalcIcon, CheckCircle, ArrowRight, TableProperties, Info, HelpCircle } from 'lucide-react';

interface CalculatorProps {
  onAddToInquiry: (item: InquiryItem) => void;
  setTab: (tab: string) => void;
}

export default function Calculator({ onAddToInquiry, setTab }: CalculatorProps) {
  // Input dimensions
  const [width, setWidth] = useState<number>(5.5);
  const [length, setLength] = useState<number>(4.0);
  const [selectedFormat, setSelectedFormat] = useState<string>('60x60 cm');
  const [isCalculated, setIsCalculated] = useState<boolean>(true);
  const [savedToInquiry, setSavedToInquiry] = useState<boolean>(false);

  // Available tile dimensions
  const formatMeta = [
    { label: 'Kwadratowy Klasyczny (60x60 cm)', value: '60x60 cm', area: 0.36 },
    { label: 'Wielkoformatowy (80x80 cm)', value: '80x80 cm', area: 0.64 },
    { label: 'Belka Drewnopodobna (30x120 cm)', value: '29.5x119.5 cm', area: 0.35 },
  ];

  const currentFormat = formatMeta.find((f) => f.value === selectedFormat) || formatMeta[0];

  // MATH CALCULATIONS
  const rawArea = width * length;
  const area = Math.round(rawArea * 100) / 100;
  
  // Waste factor: 10% for cuts and borders
  const wasteMultiplier = 1.1;
  const slabArea = currentFormat.area;
  const rawSlabs = Math.ceil(rawArea / slabArea);
  const slabsSuggested = Math.ceil(rawSlabs * wasteMultiplier);

  // For a basic rectangular grid, support count is roughly 3.6-4.0 per m2
  const rawSupports = Math.ceil(rawArea * 3.6);
  const supportsSuggested = Math.ceil(rawSupports);

  const handleImportToInquiry = () => {
    // We import two recommended products: Marazzi Mystone (as 2cm slab) and Teurgium System Adjustable Support (as supports category) with these exact dimensions!
    const defaultSlab = PRODUCTS.find((p) => p.id === 'marazzi-mystone-ceppo') || PRODUCTS[0];
    const defaultSupport = PRODUCTS.find((p) => p.id === 'wspornik-regulowany') || PRODUCTS[5];

    // Create item for Slabs
    const slabInquiry: InquiryItem = {
      product: defaultSlab,
      color: defaultSlab.colors[0],
      texture: defaultSlab.textures[0],
      quantity: `${slabsSuggested}`,
      deliveryTime: 'Do 2 tygodni'
    };

    // Create item for Supports
    const supportInquiry: InquiryItem = {
      product: defaultSupport,
      color: defaultSupport.colors[0],
      texture: defaultSupport.textures[0],
      quantity: `${supportsSuggested}`,
      deliveryTime: 'Do 2 tygodni'
    };

    onAddToInquiry(slabInquiry);
    onAddToInquiry(supportInquiry);

    setSavedToInquiry(true);
    setTimeout(() => {
      setSavedToInquiry(false);
      setTab('inquiry'); // Jump immediately to matrix view!
    }, 1500);
  };

  return (
    <div className="bg-zinc-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Title Block */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-amber-600 text-xs font-bold font-mono uppercase tracking-widest block mb-2">DARMOWE ELEKTRONICZNE KOSZTORYSOWANIE</span>
          <h1 className="text-3xl sm:text-4xl font-serif font-medium tracking-tight text-zinc-900">
            Kalkulator Materiałów Tarasowych
          </h1>
          <p className="mt-2 text-sm text-zinc-650 font-light leading-relaxed">
            Należysz do grona osób planujących taras wentylowany? Podaj orientacyjną długość i szerokość podłoża, dobierz wymiar płyt, a nasz technologiczny system oszacuje ilości elementów.
          </p>
        </div>

        {/* Dynamic Calculator Box Wrapper */}
        <div className="bg-white rounded-3xl border border-zinc-200 shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-0">
          
          {/* Left Panel: Inputs */}
          <div className="p-6 sm:p-8 md:col-span-6 space-y-6 border-b md:border-b-0 md:border-r border-zinc-200 text-left">
            <h3 className="text-lg font-bold text-zinc-900 border-b border-zinc-100 pb-3 flex items-center">
              <TableProperties className="h-5 w-5 text-amber-500 mr-2" />
              <span>Parametry Tarasu</span>
            </h3>

            {/* Inputs sliders or inputs */}
            <div className="space-y-4">
              
              {/* Width */}
              <div>
                <div className="flex justify-between text-xs font-bold font-mono text-zinc-500 mb-1.5 uppercase">
                  <span>Szerokość tarasu:</span>
                  <span className="text-amber-600 text-sm font-sans">{width} metrów</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="0.1"
                  value={width}
                  onChange={(e) => setWidth(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              {/* Length */}
              <div>
                <div className="flex justify-between text-xs font-bold font-mono text-zinc-500 mb-1.5 uppercase">
                  <span>Długość tarasu:</span>
                  <span className="text-amber-600 text-sm font-sans">{length} metrów</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="0.1"
                  value={length}
                  onChange={(e) => setLength(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              {/* Format selection */}
              <div>
                <label className="block text-xs font-bold font-mono text-zinc-500 mb-1.5 uppercase">Wymiar planowanej płyty:</label>
                <div className="space-y-2">
                  {formatMeta.map((meta) => (
                    <button
                      key={meta.value}
                      type="button"
                      onClick={() => setSelectedFormat(meta.value)}
                      className={`w-full text-left p-3 rounded-xl border text-xs font-medium transition-all duration-200 flex justify-between items-center ${
                        selectedFormat === meta.value
                          ? 'border-amber-500 bg-amber-500/5 text-zinc-900 font-bold'
                          : 'border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-zinc-300'
                      }`}
                    >
                      <span>{meta.label}</span>
                      <span className="font-mono text-[10px] text-zinc-500">pow: {meta.area} m²</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Note text info */}
            <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-150 flex items-start space-x-2 text-[11px] text-zinc-450 leading-normal">
              <Info className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
              <span>Oszacowanie uwzględnia 10% zapasu (waste overhead) na ścinki kątowe oraz dylatacje cokołowe. Rzeczywiste zapotrzebowanie może się różnić w zależności od przesunięcia dylatacji.</span>
            </div>
          </div>

          {/* Right Panel: Calculated feedback parameters */}
          <div className="p-6 sm:p-8 md:col-span-6 bg-zinc-900 text-white flex flex-col justify-between text-left">
            <div className="space-y-6">
              <div>
                <span className="text-amber-400 text-xs font-mono uppercase tracking-widest block font-semibold">WYLICZONE KOSZTORYSOWANIE</span>
                <h3 className="text-lg font-bold text-zinc-50 mt-1">Zapotrzebowanie na Materiały</h3>
              </div>

              {/* Outputs display parameters */}
              <div className="space-y-5">
                
                {/* Surface area */}
                <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-805">
                  <span className="text-[10px] uppercase tracking-wider text-zinc-500 block font-mono font-bold">Łączna Powierzchnia Tarasu</span>
                  <span className="text-3xl font-black text-amber-400 font-sans tracking-tight block mt-1">
                    {area} m²
                  </span>
                </div>

                {/* Slabs count */}
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <div>
                    <span className="text-zinc-400 text-xs block font-bold font-mono uppercase">Zalecana liczba płyt {selectedFormat}:</span>
                    <span className="text-[10px] text-zinc-500 block text-zinc-400 mt-0.5">({rawSlabs} szt. netto + 10% zapasu na cięcia)</span>
                  </div>
                  <span className="text-xl font-bold text-zinc-50 font-sans tracking-tight shrink-0">
                    {slabsSuggested} <span className="text-xs font-mono text-zinc-500">szt.</span>
                  </span>
                </div>

                {/* Pedestals count */}
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <div>
                    <span className="text-zinc-400 text-xs block font-bold font-mono uppercase">Liczba wsporników regulowanych:</span>
                    <span className="text-[10px] text-zinc-500 block text-zinc-400 mt-0.5">(Szacowane zużycie ok. 3.6 szt/m²)</span>
                  </div>
                  <span className="text-xl font-bold text-zinc-50 font-sans tracking-tight shrink-0">
                    {supportsSuggested} <span className="text-xs font-mono text-zinc-500">szt.</span>
                  </span>
                </div>

              </div>
            </div>

            {/* Actions panel */}
            <div className="space-y-3 mt-8">
              {savedToInquiry ? (
                <div className="bg-green-600/30 border border-green-500/50 text-green-400 rounded-xl py-3 px-4 text-xs font-semibold text-center flex items-center justify-center space-x-2 animate-pulse">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>Dodano pomyślnie! Przenoszenie do Matrycy...</span>
                </div>
              ) : (
                <button
                  onClick={handleImportToInquiry}
                  className="w-full flex items-center justify-center space-x-2 py-4 rounded-xl bg-amber-500 text-zinc-950 font-extrabold text-sm hover:bg-amber-400 transition-all duration-300 shadow-lg"
                >
                  <CalcIcon className="h-4.5 w-4.5 stroke-[2.5px]" />
                  <span>Zaimportuj zalecane ilości do Wyceny</span>
                </button>
              )}

              <p className="text-[10px] text-zinc-500 text-center leading-normal">
                Import zaleci pozycje: <strong>Płyty Marazzi Mystone</strong> i <strong>Wsporniki Professional</strong> z powyższym tonażem do Twojego arkusza parametrów.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
