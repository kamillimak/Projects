/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Home, ShoppingBag, LayoutGrid, Image, Calculator, FileText, ClipboardList } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setTab: (tab: string) => void;
  inquiryCount: number;
  version?: 'v1' | 'v2';
}

export default function Navbar({ currentTab, setTab, inquiryCount, version = 'v2' }: NavbarProps) {
  const menuItems = [
    { id: 'home', label: 'Strona Główna', icon: Home },
    { id: 'offer', label: 'Ekskluzywna Oferta', icon: LayoutGrid },
    { id: 'gallery', label: 'Nasze Realizacje', icon: Image },
    { id: 'blog', label: 'Inspiracje & Wiedza', icon: FileText },
    { id: 'calculator', label: 'Kalkulator Tarasu', icon: Calculator },
  ];

  const isV2 = version === 'v2';

  return (
    <header className={`sticky top-0 z-40 bg-[#FDFDFB]/95 border-b border-stone-200 backdrop-blur-md text-[#1A1A1A] transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setTab('home')}>
            <div className={`h-10 w-10 flex items-center justify-center text-white font-serif text-xl font-bold transition-colors ${
              isV2 ? 'bg-orange-600' : 'bg-[#2D3E33]'
            }`}>
              <span>T</span>
            </div>
            <div>
              <span className="text-xl font-bold tracking-tighter text-[#1A1A1A] font-sans block uppercase">TEURGIUM</span>
              <span className={`text-[9px] uppercase tracking-widest font-mono block -mt-1 leading-none font-semibold ${
                isV2 ? 'text-orange-600' : 'text-[#2D3E33]'
              }`}>patios & gardens premium</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1 lg:space-x-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              
              let buttonStyle = `flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold tracking-wide transition-all duration-350 border `;
              
              if (isV2) {
                buttonStyle += isActive
                  ? 'bg-orange-50 text-orange-600 border-orange-500 shadow-sm font-bold scale-[1.02]'
                  : 'text-stone-600 hover:text-orange-600 hover:bg-orange-50 hover:border-orange-200 border-transparent';
              } else {
                buttonStyle += isActive
                  ? 'bg-[#2D3E33]/10 text-[#2D3E33] border-[#2D3E33]/20'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100 border-transparent2';
              }

              return (
                <button
                  key={item.id}
                  onClick={() => setTab(item.id)}
                  className={buttonStyle}
                >
                  <Icon className={`h-4 w-4 transition-colors ${
                    isActive ? (isV2 ? 'text-orange-600' : 'text-[#2D3E33]') : 'text-stone-400 group-hover:text-stone-600'
                  }`} />
                  <span>{item.label}</span>
                  {isActive && isV2 && (
                    <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse ml-1" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Inquiry (Basket / Matrix) trigger */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setTab('inquiry')}
              className={`relative flex items-center space-x-2 px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all duration-350 shadow-sm border ${
                currentTab === 'inquiry'
                  ? (isV2 
                      ? 'bg-orange-600 border-orange-500 text-white hover:bg-orange-700' 
                      : 'bg-[#2D3E33] border-[#2D3E33] text-white hover:bg-[#1f2b23]')
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border-stone-200'
              }`}
            >
              <ClipboardList className="h-4 w-4" />
              <span>Koszyk Zapytania</span>
              {inquiryCount > 0 && (
                <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white border transition-colors ${
                  isV2 ? 'bg-orange-500 border-orange-400' : 'bg-[#1A1A1A] border-stone-700'
                }`}>
                  {inquiryCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile navigation row (scrollable wrapper) */}
      <div className="md:hidden bg-stone-100 overflow-x-auto border-t border-stone-200 scrollbar-none flex space-x-1 p-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          
          let mobileStyle = `flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all duration-200 border `;
          
          if (isV2) {
            mobileStyle += isActive
              ? 'bg-orange-50 text-orange-600 border-orange-400 font-bold'
              : 'text-stone-600 hover:text-orange-500 hover:bg-orange-50/50 border-transparent';
          } else {
            mobileStyle += isActive
              ? 'bg-[#2D3E33]/15 text-[#2D3E33] border-[#2D3E33]/20'
              : 'text-stone-600 hover:text-stone-800 hover:bg-stone-200 border-transparent';
          }

          return (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={mobileStyle}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
