/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, Box, Compass, Layers, Milestone, Sliders } from 'lucide-react';

interface CategoryGridProps {
  setTab: (tab: string) => void;
  setCategoryFilter: (filter: string) => void;
}

export default function CategoryGrid({ setTab, setCategoryFilter }: CategoryGridProps) {
  const categories = [
    {
      id: 'sly-2cm',
      title: 'Płyty tarasowe 2cm',
      description: 'Luksusowe gresy gęsto spiekane: Marazzi, Opoczno, Zoya, Sintesi. Idealny materiał na bezklejowe tarasy wentylowane.',
      benefits: ['Wysoka antypoślizgowość R11', 'Mrozoodporność i brak plam', 'Szybki montaż na wspornikach'],
      imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800',
      icon: Layers,
    },
    {
      id: 'sly-4cm',
      title: 'Płyty ceramiczno-betonowe 4cm',
      description: 'Innowacyjne płyty hybrydowe z rdzeniem betonowym i ceramicznym czołem. Przeznaczone do układania bezpośrednio na podsypce.',
      benefits: ['Ogromna odporność mechaniczna', 'Uproszczony montaż gruntowy', 'Wybitne walory estetyczne'],
      imageUrl: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&q=80&w=800',
      icon: Box,
    },
    {
      id: 'wsporniki',
      title: 'Wsporniki tarasowe',
      description: 'Profesjonalne systemy poziomujące (regulowane Professional oraz stałe gumowe). Trwały fundament suchego tarasu.',
      benefits: ['Korekcja nachylenia terenu do 5%', 'Wyciszenie hałasu (guma SBR)', 'Dowolna wysokość (17-350 mm)'],
      imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800',
      icon: Sliders,
    },
    {
      id: 'kostka',
      title: 'Kostka i płyty betonowe',
      description: 'Szlachetne kostki płukane Settline oraz płyty wielkoformatowe Bruk-Bet Novator na podjazdy chronione barierą Lamino.',
      benefits: ['Nośność dla ciężkich pojazdów', 'Ochrona przed plamami oleju', 'Mikrofaza i równe szczeliny'],
      imageUrl: 'https://images.unsplash.com/photo-1510251173747-593d03a228c0?auto=format&fit=crop&q=80&w=800',
      icon: Milestone,
    },
    {
      id: 'kruszywa',
      title: 'Kruszywa dekoracyjne',
      description: 'Śnieżnobiały krystaliczny otoczak grecki Thassos, grys granitowy szaro-rudy o właściwościach klinujących i kora kamienna.',
      benefits: ['Importowany oryginalny marmur', 'Stabilne kruszywo klinujące', 'Piękne naturalne rabaty'],
      imageUrl: 'https://images.unsplash.com/photo-1533460004989-cef01064af7e?auto=format&fit=crop&q=80&w=800',
      icon: Compass,
    }
  ];

  const handleCategoryClick = (catId: string) => {
    setCategoryFilter(catId);
    setTab('offer');
  };

  return (
    <section className="bg-[#FDFDFB] py-20 px-4 sm:px-6 lg:px-8 border-b border-stone-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#2D3E33] text-xs font-bold font-mono uppercase tracking-widest block mb-2">DOSTĘPNY ASORTYMENT</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-medium tracking-tight text-stone-900">
            Nasze Kategorie Premium
          </h2>
          <p className="mt-4 text-stone-600 font-light">
            Zrezygnowaliśmy z tradycyjnych, mętnych struktur hurtowych. Prezentujemy wyselekcjonowane, precyzyjnie posegmentowane linie produktów, które odpowiadają najwyższym wymaganiom estetycznym i inżynieryjnym.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className="group relative bg-white border border-stone-200 p-6 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {/* Visual Image Header */}
                <div className="relative h-48 w-full overflow-hidden mb-6 bg-stone-100">
                  <img
                    src={cat.imageUrl}
                    alt={cat.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/20 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 bg-[#2D3E33] text-white p-2">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>

                <div className="flex-grow space-y-4">
                  <h3 className="text-lg font-serif font-medium text-stone-900 group-hover:text-[#2D3E33] transition-colors duration-200">
                    {cat.title}
                  </h3>
                  <p className="text-sm text-stone-500 font-light leading-relaxed">
                    {cat.description}
                  </p>

                  <ul className="space-y-1.5 pt-4 border-t border-stone-100">
                    {cat.benefits.map((benefit, bIdx) => (
                      <li key={bIdx} className="flex items-center text-[10px] text-stone-600 font-bold uppercase tracking-wider font-mono">
                        <span className="h-1.5 w-1.5 bg-[#2D3E33] mr-2 shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-[#2D3E33] border-t border-stone-100">
                  <span>Przejdź do oferty</span>
                  <div className="h-7 w-7 bg-[#2D3E33]/15 text-[#2D3E33] flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
