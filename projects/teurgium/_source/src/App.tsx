/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryGrid from './components/CategoryGrid';
import PromoSlider from './components/PromoSlider';
import Realisations from './components/Realisations';
import Offer from './components/Offer';
import InquiryMatrix from './components/InquiryMatrix';
import Calculator from './components/Calculator';
import Blog from './components/Blog';
import Chatbot from './components/Chatbot';
import RealisationSlider from './components/RealisationSlider';
import { InquiryItem } from './types';
import { REVIEWS } from './data';
import { Phone, Mail, MapPin, Star, Clock, Check, HelpCircle, ArrowRight } from 'lucide-react';

export default function App() {
  // Navigation active state
  const [currentTab, setTab] = useState<string>('home');

  // Custom design toggle (v1 classic / v2 orange accent premium slider)
  const [version, setVersion] = useState<'v1' | 'v2'>('v2');


  
  // Active catalog category filter
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  
  // Selected product from promo links to open directly in the catalog details mode
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  // Inquiry (matrix) persistence
  const [inquiryItems, setInquiryItems] = useState<InquiryItem[]>(() => {
    try {
      const saved = localStorage.getItem('teurgium_inquiries_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('teurgium_inquiries_v1', JSON.stringify(inquiryItems));
  }, [inquiryItems]);

  // Operations to manage RFQ state
  const handleAddToInquiry = (newItem: InquiryItem) => {
    setInquiryItems((prev) => {
      const existsIdx = prev.findIndex((item) => item.product.id === newItem.product.id);
      if (existsIdx > -1) {
        const copy = [...prev];
        copy[existsIdx] = newItem; // Overwrite with new configurations
        return copy;
      }
      return [...prev, newItem];
    });
  };

  const handleRemoveInquiryItem = (idxToDelete: number) => {
    setInquiryItems((prev) => prev.filter((_, i) => i !== idxToDelete));
  };

  const handleUpdateInquiryItem = (idxToUpdate: number, updatedItem: InquiryItem) => {
    setInquiryItems((prev) => prev.map((item, i) => (i === idxToUpdate ? updatedItem : item)));
  };

  const handleClearInquiry = () => {
    setInquiryItems([]);
  };

  // Custom visual smooth scroll navigation helper (since we are using tab triggers)
  const handleNavigationAndScroll = (tabId: string) => {
    setTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-zinc-50 min-h-screen flex flex-col font-sans antialiased text-zinc-900 scroll-smooth">
      
      {/* Dynamic Header */}
      <Navbar
        currentTab={currentTab}
        setTab={handleNavigationAndScroll}
        inquiryCount={inquiryItems.length}
        version={version}
      />

      {/* Main Tab Panels content routing switch */}
      <main className="flex-grow">
        
        {currentTab === 'home' && (
          <div className="space-y-0">
            {/* 1. Hero Block */}
            <Hero setTab={handleNavigationAndScroll} />

            {/* Premium Realisation Slider (Requirement 3) */}
            {version === 'v2' && <RealisationSlider />}

            {/* 2. Categorised Slabs Grid */}
            <CategoryGrid
              setTab={handleNavigationAndScroll}
              setCategoryFilter={(filter) => {
                setCategoryFilter(filter);
                setSelectedProductId(null);
              }}
            />

            {/* 3. Season Collections Slider */}
            <PromoSlider
              setTab={handleNavigationAndScroll}
              setSelectedProductId={setSelectedProductId}
            />

            {/* 4. Why Us ("Dlaczego Teurgium") */}
            <section className="bg-[#1C2720] py-20 px-4 sm:px-6 lg:px-8 text-white relative">
              <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-16">
                  <span className="text-stone-300 text-xs font-bold font-mono uppercase tracking-widest block mb-2">DLACZEGO NASZA FIRMA</span>
                  <h2 className="text-3xl sm:text-4xl font-serif font-medium tracking-tight text-white leading-tight">
                    Inżynieria Tarasów to Teurgium
                  </h2>
                  <p className="mt-4 text-stone-300 font-light text-sm sm:text-base leading-relaxed">
                    Nigdy nie byliśmy standardowym marketem budowlanym. Naszym celem jest zabezpieczenie estetyczne i budowlane Twoich podjazdów i ogrodów.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {/* Card 1 */}
                  <div className="p-6 bg-[#253229] border border-[#2e3f34] text-left space-y-4">
                    <div className="h-10 w-10 bg-white/10 border border-white/20 flex items-center justify-center text-[#8da094]">
                      <Star className="h-5 w-5" />
                    </div>
                    <h3 className="font-serif font-medium text-lg text-stone-100">Doradztwo Techniczne</h3>
                    <p className="text-xs text-stone-300 font-light leading-relaxed">
                      Każdy projekt analizujemy pod kątem gruntu i optymalnych rozstawów wsporników. Nasi inżynierowie bezpłatnie zweryfikują parametry Twojego szkicu.
                    </p>
                  </div>
                  {/* Card 2 */}
                  <div className="p-6 bg-[#253229] border border-[#2e3f34] text-left space-y-4">
                    <div className="h-10 w-10 bg-white/10 border border-white/20 flex items-center justify-center text-[#8da094]">
                      <Check className="h-5 w-5" />
                    </div>
                    <h3 className="font-serif font-medium text-lg text-stone-100">Materiały Premium</h3>
                    <p className="text-xs text-stone-300 font-light leading-relaxed">
                      Wybieramy wyłącznie certyfikowane gresy 2cm z wiodących fabryk w Polsce i we Włoszech, o zerowej nasiąkliwości i klasie antypoślizgu R11.
                    </p>
                  </div>
                  {/* Card 3 */}
                  <div className="p-6 bg-[#253229] border border-[#2e3f34] text-left space-y-4">
                    <div className="h-10 w-10 bg-white/10 border border-white/20 flex items-center justify-center text-[#8da094]">
                      <Clock className="h-5 w-5" />
                    </div>
                    <h3 className="font-serif font-medium text-lg text-stone-100">Pomoc w Technologii</h3>
                    <p className="text-xs text-stone-300 font-light leading-relaxed">
                      Zamiast przestarzałego klejenia płytek, oferujemy elastyczny system wentylowany na sucho. Zapomnij o odspajających i pękających spoinach zimą.
                    </p>
                  </div>
                  {/* Card 4 */}
                  <div className="p-6 bg-[#253229] border border-[#2e3f34] text-left space-y-4">
                    <div className="h-10 w-10 bg-white/10 border border-white/20 flex items-center justify-center text-[#8da094]">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <h3 className="font-serif font-medium text-lg text-stone-100">Dostawa w Całym Krajwu</h3>
                    <p className="text-xs text-stone-300 font-light leading-relaxed">
                      Posiadamy własną spedycję i magazyny centralne. Transportujemy gresy i kruszywa dekoracyjne bezpiecznie na paletach windą samowyładowczą.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 5. Realisations Preview */}
            <Realisations previewMode={true} setTab={handleNavigationAndScroll} />

            {/* 6. How To Order Guide SECTION */}
            <section className="bg-white py-20 px-4 sm:px-6 lg:px-8 border-y border-stone-200">
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16">
                  <span className="text-[#2D3E33] text-xs font-bold font-mono uppercase tracking-widest block">LOGISTYKA ZAMÓWEŃ</span>
                  <h2 className="text-3xl font-serif font-medium mt-2 text-stone-900">Jak Wygląda Proces Zamawiania?</h2>
                  <p className="text-sm text-stone-500 mt-1 font-light leading-relaxed">Ułatwiamy proces od pomiaru szerokości po odbiór dostawy na placu budowy.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                  {/* Step 1 */}
                  <div className="text-left space-y-3 relative">
                    <span className="text-5xl font-black font-sans text-stone-200/50 block">01</span>
                    <h4 className="font-serif font-semibold text-base text-[#1A1A1A]">Wybierz Produkty</h4>
                    <p className="text-xs text-stone-500 font-light leading-relaxed">Przeglądaj naszą wyselekcjonowaną ofertę gresów 2cm, wsporników i szlachetnych opasek.</p>
                  </div>
                  {/* Step 2 */}
                  <div className="text-left space-y-3 relative">
                    <span className="text-5xl font-black font-sans text-stone-200/50 block">02</span>
                    <h4 className="font-serif font-semibold text-base text-[#1A1A1A]">Dodaj do Zapytania</h4>
                    <p className="text-xs text-stone-500 font-light leading-relaxed">System zapyta Cię o takie parametry jak wybrany odcień, m² oraz oczekiwany czas.</p>
                  </div>
                  {/* Step 3 */}
                  <div className="text-left space-y-3 relative">
                    <span className="text-5xl font-black font-sans text-stone-200/50 block">03</span>
                    <h4 className="font-serif font-semibold text-base text-[#1A1A1A]">Uzupełnij Dane</h4>
                    <p className="text-xs text-stone-500 font-light leading-relaxed">Popraw dane kontaktowe, sprawdź tabele macierzową i kliknij wyślij zapytanie.</p>
                  </div>
                  {/* Step 4 */}
                  <div className="text-left space-y-3 relative">
                    <span className="text-5xl font-black font-sans text-stone-200/50 block">04</span>
                    <h4 className="font-serif font-semibold text-base text-[#1A1A1A]">Odbierz Kosztorys</h4>
                    <p className="text-xs text-stone-500 font-light leading-relaxed">Nasz doradca skontaktuje się, dopasuje warunki spedycji i przekaże gotową wycenę.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 7. Google Reviews (Embed layout styling) */}
            <section className="bg-[#F9F9F6] py-20 px-4 sm:px-6 lg:px-8 border-b border-stone-200">
              <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-16">
                  <span className="text-[#2D3E33] text-xs font-bold font-mono uppercase tracking-widest block mb-2">WIARYGODNOŚĆ</span>
                  <h2 className="text-3xl font-serif font-medium tracking-tight text-stone-900">Opinie Z Google</h2>
                  <p className="mt-1 text-sm text-stone-500 font-light">
                    Klienci premium budują u nas prestiżowe rezydencje. Przeczytaj bezpośrednie wypowiedzi inwestorów oraz architektów krajobrazu.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {REVIEWS.map((rev, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-6 border border-stone-200 text-left flex flex-col justify-between shadow-sm relative hover:shadow-md transition-shadow"
                    >
                      <div className="space-y-4">
                        {/* Rating stars */}
                        <div className="flex space-x-1">
                          {Array.from({ length: rev.stars }).map((_, sIdx) => (
                            <Star key={sIdx} className="h-4 w-4 fill-[#2D3E33] text-[#2D3E33] shrink-0" />
                          ))}
                        </div>
                        <p className="text-xs text-stone-600 leading-relaxed font-light italic text-stone-600">
                          "{rev.text}"
                        </p>
                      </div>

                      <div className="pt-6 border-t border-stone-100 mt-6">
                        <span className="block text-sm font-serif font-medium text-stone-900">{rev.name}</span>
                        <span className="block text-[10px] text-stone-400 font-mono mt-0.5">{rev.role}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {currentTab === 'offer' && (
          <Offer
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            selectedProductId={selectedProductId}
            setSelectedProductId={setSelectedProductId}
            onAddToInquiry={handleAddToInquiry}
            inquiryItems={inquiryItems}
            version={version}
          />
        )}

        {currentTab === 'gallery' && (
          <Realisations previewMode={false} version={version} />
        )}

        {currentTab === 'blog' && (
          <Blog />
        )}

        {currentTab === 'calculator' && (
          <Calculator onAddToInquiry={handleAddToInquiry} setTab={handleNavigationAndScroll} />
        )}

        {currentTab === 'inquiry' && (
          <InquiryMatrix
            inquiryItems={inquiryItems}
            onRemoveItem={handleRemoveInquiryItem}
            onUpdateItem={handleUpdateInquiryItem}
            onClearInquiry={handleClearInquiry}
            setTab={handleNavigationAndScroll}
          />
        )}

      </main>

      {/* Floating Chatbot Widget */}
      <Chatbot setTab={handleNavigationAndScroll} />

      {/* 8. Pristine Premium FOOTER with visual contact layout & maps */}
      <footer className={`transition-colors duration-300 ${
        version === 'v2' 
          ? 'bg-stone-950 text-white border-t border-stone-800' 
          : 'bg-[#1C2720] text-white border-t border-[#26352b]'
      } pt-16 pb-8 px-4 sm:px-6 lg:px-8`}>
        <div className={`max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 border-b ${
          version === 'v2' ? 'border-stone-800' : 'border-[#26352b]'
        } pb-12 text-left`}>
          
          {/* Column 1: Info and logo */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-2">
              <div className={`h-8 w-8 text-[#1C2720] flex items-center justify-center font-serif font-bold text-base ${version === 'v2' ? 'bg-orange-500 text-white' : 'bg-white'}`}>
                T
              </div>
              <span className="text-lg font-bold tracking-tighter text-white font-sans uppercase">TEURGIUM</span>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed max-w-sm font-light">
              Niezależny dystrybutor marek Marazzi, Opoczno, Zoya, Sintesi, Settline oraz Bruk-Bet. Oferujemy specjalistyczne doradztwo materiałowe i transport bezpośrednio pod próg budowy klienta na terenie całej Polski.
            </p>
            <div className={`text-xs font-mono pt-2 ${version === 'v2' ? 'text-orange-400' : 'text-[#8da094]'}`}>
              {version === 'v2' ? 'Teurgium Sp. z o.o.' : 'Teurgium sp. z o.o.'} • NIP: {version === 'v2' ? '8961633512' : '1234567890'}
            </div>
          </div>

          {/* Column 2: Direct links */}
          <div className="lg:col-span-3 space-y-4 text-left">
            <h4 className="text-xs font-bold font-mono uppercase tracking-widest text-stone-300">Szybkie Odnośniki</h4>
            <div className="grid grid-cols-1 gap-2.5 text-xs text-stone-300">
              <button onClick={() => handleNavigationAndScroll('offer')} className={`text-left transition-colors cursor-pointer ${version === 'v2' ? 'hover:text-orange-400' : 'hover:text-[#8da094]'}`}>Nasza Oferta</button>
              <button onClick={() => handleNavigationAndScroll('gallery')} className={`text-left transition-colors cursor-pointer ${version === 'v2' ? 'hover:text-orange-400' : 'hover:text-[#8da094]'}`}>Galeria Realizacji</button>
              <button onClick={() => handleNavigationAndScroll('blog')} className={`text-left transition-colors font-sans cursor-pointer ${version === 'v2' ? 'hover:text-orange-400' : 'hover:text-[#8da094]'}`}>Baza Wiedzy / Blog</button>
              <button onClick={() => handleNavigationAndScroll('calculator')} className={`text-left transition-colors font-sans cursor-pointer ${version === 'v2' ? 'hover:text-orange-400' : 'hover:text-[#8da094]'}`}>Kalkulator Tarasu</button>
              <button onClick={() => handleNavigationAndScroll('inquiry')} className={`text-left transition-colors font-sans cursor-pointer ${version === 'v2' ? 'hover:text-orange-400' : 'hover:text-[#8da094]'}`}>Złóż Zapytanie RFQ</button>
            </div>
          </div>

          {/* Column 3: Contact cards & Maps visual embed */}
          <div className="lg:col-span-5 space-y-5">
            <h4 className="text-xs font-bold font-mono uppercase tracking-widest text-stone-300">Centrum Kontaktu i Biuro handlowe</h4>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Box 1: Phone */}
                <div className={`p-4 transition-all duration-300 flex flex-col justify-between ${
                  version === 'v2'
                    ? 'bg-stone-900/40 border border-stone-800 hover:border-orange-500/50 hover:bg-stone-900/60 group rounded-sm shadow-sm'
                    : 'bg-[#253229] border border-[#2e3f34] space-y-1'
                }`}>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <span className={`block text-[9px] uppercase font-mono font-bold tracking-wider ${version === 'v2' ? 'text-orange-400' : 'text-stone-400'}`}>
                        Biuro Obsługi Klienta
                      </span>
                      <a 
                        href={version === 'v2' ? 'tel:+48530995500' : 'tel:+48500200300'} 
                        className={`block text-xs font-bold font-sans transition-colors ${version === 'v2' ? 'text-stone-100 hover:text-orange-400' : 'text-stone-100 hover:text-[#8da094]'}`}
                      >
                        {version === 'v2' ? '+48 530 995 500' : '+48 500 200 300'}
                      </a>
                    </div>
                    <div className={`p-1.5 rounded bg-transparent ${version === 'v2' ? 'text-orange-400 group-hover:scale-110 transition-transform' : 'text-[#8da094]'}`}>
                      <Phone className="h-4 w-4" />
                    </div>
                  </div>
                  <span className={`text-[10px] block font-light mt-2 ${version === 'v2' ? 'text-stone-450' : 'text-stone-400'}`}>
                    {version === 'v2' ? 'Pn - Pt: 8:00 - 17:00, Sob: 9:00 - 13:00' : 'Pn - Pt: 8:00 - 17:00'}
                  </span>
                </div>

                {/* Box 2: Mail */}
                <div className={`p-4 transition-all duration-300 flex flex-col justify-between ${
                  version === 'v2'
                    ? 'bg-stone-900/40 border border-stone-800 hover:border-orange-500/50 hover:bg-stone-900/60 group rounded-sm shadow-sm'
                    : 'bg-[#253229] border border-[#2e3f34] space-y-1'
                }`}>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <span className={`block text-[9px] uppercase font-mono font-bold tracking-wider ${version === 'v2' ? 'text-orange-400' : 'text-stone-400'}`}>
                        Wyceń projekt
                      </span>
                      <a 
                        href={version === 'v2' ? 'mailto:bok@teurgium.com' : 'mailto:wyceny@teurgium.com'} 
                        className={`block text-xs font-bold font-sans transition-colors ${version === 'v2' ? 'text-stone-100 hover:text-orange-400' : 'text-stone-100 hover:text-[#8da094]'}`}
                      >
                        {version === 'v2' ? 'bok@teurgium.com' : 'wyceny@teurgium.com'}
                      </a>
                    </div>
                    <div className={`p-1.5 rounded bg-transparent ${version === 'v2' ? 'text-orange-400 group-hover:scale-110 transition-transform' : 'text-[#8da094]'}`}>
                      <Mail className="h-4 w-4" />
                    </div>
                  </div>
                  <span className={`text-[10px] block font-light mt-2 ${version === 'v2' ? 'text-stone-450' : 'text-stone-400'}`}>
                    Odpowiedź do 2 godzin
                  </span>
                </div>
              </div>

              {/* Map/Location Section */}
              <div className={`p-4 transition-all duration-350 text-left space-y-3 ${
                version === 'v2'
                  ? 'bg-stone-900/40 border border-stone-800 hover:border-orange-500/30 rounded-sm shadow-sm'
                  : 'p-4 bg-[#253229] border border-[#2e3f34] space-y-2'
              }`}>
                <div className="flex items-center space-x-2 text-xs">
                  <MapPin className={`h-4 w-4 shrink-0 ${version === 'v2' ? 'text-orange-500' : 'text-[#8da094]'}`} />
                  <span className="font-semibold text-stone-200">
                    {version === 'v2' 
                      ? 'Wojkowice, ul. Wrocławska 12 (k. Wrocław - Bielany)' 
                      : 'Warszawa, ul. Krajobrazowa 45'}
                  </span>
                </div>
                
                {/* Stylized custom map graphic with navigation button */}
                <a 
                  href={version === 'v2' ? 'https://maps.google.com/?q=Wrocławska+12,+55-020+Wojkowice' : 'https://maps.google.com/?q=Krajobrazowa+45,+Warszawa'}
                  target="_blank" 
                  rel="noreferrer"
                  className={`h-24 w-full relative border overflow-hidden flex items-center justify-center p-2 group cursor-pointer block hover:border-orange-500 transition-all duration-300 rounded-sm ${
                    version === 'v2' ? 'bg-stone-950 border-stone-800' : 'bg-[#1C2720] border-[#2d3a31]'
                  }`}
                  id="footer-maps-integration"
                >
                  <div className={`absolute inset-0 opacity-10 pointer-events-none font-mono text-[9px] tracking-wider ${version === 'v2' ? 'text-orange-500' : 'text-[#8da094]'}`}>
                    {/* Grid overlay */}
                    + -- -- + -- -- + -- -- + <br />
                    | &nbsp; &nbsp; &nbsp; | &nbsp; &nbsp; &nbsp; | &nbsp; &nbsp; &nbsp; | <br />
                    | &nbsp; &nbsp; &nbsp; o &nbsp; &nbsp; &nbsp; | &nbsp; &nbsp; &nbsp; | <br />
                    + -- -- + -- -- + -- -- +
                  </div>
                  {/* Road/River graphics */}
                  <div className={`absolute left-0 right-0 h-[1.5px] top-1/2 transform -translate-y-1/2 ${version === 'v2' ? 'bg-stone-800' : 'bg-[#26352b]'}`} />
                  <div className={`absolute top-0 bottom-0 w-[1.5px] left-1/3 ${version === 'v2' ? 'bg-stone-800' : 'bg-[#26352b]'}`} />
                  <div className={`absolute top-0 bottom-0 w-[1.5px] left-2/3 ${version === 'v2' ? 'bg-stone-800' : 'bg-[#26352b]'}`} />
                  
                  {/* Pin marker style */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className={`h-6 w-6 flex items-center justify-center text-white border-2 border-white font-black text-[9px] shadow-sm transition-transform duration-300 group-hover:scale-115 group-hover:rotate-6 ${version === 'v2' ? 'bg-orange-600' : 'bg-[#2D3E33]'}`}>
                      T
                    </div>
                    <span className="text-[9px] text-[#8da094] font-mono mt-1 uppercase font-bold tracking-wider group-hover:text-stone-250 transition-colors">
                      {version === 'v2' ? 'Nawiguj do Wojkowic (k. Wrocław)' : 'TEURGIUM HQ (Warszawa)'}
                    </span>
                  </div>
                </a>
              </div>

            </div>
          </div>

        </div>

        {/* Dynamic Version Toggle Bar (Requirement 9) */}
        <div className={`mt-8 pt-6 pb-6 border-b ${version === 'v2' ? 'border-stone-800' : 'border-[#26352b]'} flex flex-col sm:flex-row justify-between items-center max-w-7xl mx-auto gap-4`}>
          <div className="text-stone-300 text-xs font-serif font-medium flex items-center space-x-2">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-orange-500 animate-pulse"></span>
            <span>Przełącznik wizualny demonstracyjny:</span>
          </div>
          <div className={`flex p-1 border transition-all duration-300 ${
            version === 'v2' ? 'bg-stone-900 border-stone-800' : 'bg-[#121c15] border-[#2d3a31]'
          }`}>
            <button
              onClick={() => {
                setVersion('v1');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-4 py-2 text-xs font-mono tracking-widest font-bold uppercase transition-all duration-300 cursor-pointer ${
                version === 'v1'
                  ? 'bg-stone-850 text-white border border-stone-700/80'
                  : 'text-stone-500 hover:text-stone-300'
              }`}
            >
              WERSJA 1
            </button>
            <button
              onClick={() => {
                setVersion('v2');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-4 py-2 text-xs font-mono tracking-widest font-bold uppercase transition-all duration-300 cursor-pointer relative ${
                version === 'v2'
                  ? 'bg-orange-600 text-white'
                  : 'text-stone-500 hover:text-stone-300'
              }`}
            >
              WERSJA 2
              {version === 'v2' && (
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Bottom Credits block */}
        <div className="pt-8 text-center text-[10px] text-stone-400 flex flex-col sm:flex-row justify-between items-center max-w-7xl mx-auto gap-4 leading-normal font-light">
          <div>
            © 2026 {version === 'v2' ? 'Teurgium Sp. z o.o.' : 'TEURGIUM'}. Wszelkie prawa zastrzeżone. Projekt autorskiej witryny ofertowo-technicznej i rzemiosła krajobrazu.
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-stone-300 transition-colors">Polityka Prywatności</a>
            <span>•</span>
            <a href="#" className="hover:text-stone-300 transition-colors">Regulamin wycen</a>
            <span>•</span>
            <a href="#" className="hover:text-stone-300 transition-colors">Jak zamawiać próbki</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
