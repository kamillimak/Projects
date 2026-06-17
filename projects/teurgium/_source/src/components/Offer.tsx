/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PRODUCTS } from '../data';
import { Product, InquiryItem } from '../types';
import { Layers, HelpCircle, Check, Plus, ShoppingBag, Eye, X, ClipboardList, Info } from 'lucide-react';

interface OfferProps {
  categoryFilter: string;
  setCategoryFilter: (filter: string) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  onAddToInquiry: (item: InquiryItem) => void;
  inquiryItems: InquiryItem[];
  version?: 'v1' | 'v2';
}

export default function Offer({
  categoryFilter,
  setCategoryFilter,
  selectedProductId,
  setSelectedProductId,
  onAddToInquiry,
  inquiryItems,
  version = 'v2',
}: OfferProps) {
  
  // Local state for product detail modal
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  
  // Local state for the configuration form
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedTexture, setSelectedTexture] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('50');
  const [deliveryTime, setDeliveryTime] = useState<string>('Do 2 tygodni');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const isV2 = version === 'v2';

  const getProductColorImage = (prod: Product, color: string) => {
    const col = color.toLowerCase();
    
    if (prod.id === 'marazzi-mystone-ceppo') {
      if (col.includes('antracite')) return 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=800';
      if (col.includes('grey')) return 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800';
      if (col.includes('greige')) return 'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&q=80&w=800';
      if (col.includes('beige')) return 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800';
    }
    if (prod.id === 'opoczno-grand-wood') {
      if (col.includes('natural')) return 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&q=80&w=800';
      if (col.includes('gold')) return 'https://images.unsplash.com/photo-1541123437800-1bb7d80732df?auto=format&fit=crop&q=80&w=800';
      if (col.includes('dark')) return 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=800';
      if (col.includes('grey')) return 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800';
    }
    if (prod.id === 'zoya-concrete-grey') {
      if (col.includes('cement') || col.includes('grey')) return 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800';
      if (col.includes('light') || col.includes('ash')) return 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800';
      if (col.includes('antracite')) return 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&q=80&w=800';
      if (col.includes('beige') || col.includes('soft')) return 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800';
    }
    if (prod.id === 'sintesi-nordic-stone') {
      if (col.includes('anthracite')) return 'https://images.unsplash.com/photo-1504198266287-1659872e6590?auto=format&fit=crop&q=80&w=800';
      if (col.includes('silver')) return 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800';
      if (col.includes('black')) return 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=800';
    }
    if (prod.id === 'bruk-bet-novator') {
      if (col.includes('carbon')) return 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&q=80&w=800';
      if (col.includes('granit')) return 'https://images.unsplash.com/photo-1510251173747-593d03a228c0?auto=format&fit=crop&q=80&w=800';
      if (col.includes('gothic')) return 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800';
      if (col.includes('silvia')) return 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800';
    }
    if (prod.id === 'bruk-bet-mega-4cm') {
      if (col.includes('marmur') || col.includes('carrara')) return 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800';
      if (col.includes('granit')) return 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&q=80&w=800';
      if (col.includes('bazalt')) return 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&q=80&w=800';
    }

    const hash = color.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const fallbackImages = [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=805',
      'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&q=80&w=800'
    ];
    return fallbackImages[hash % fallbackImages.length];
  };

  // Synchronise state with parent props for deep linking promos
  useEffect(() => {
    if (selectedProductId) {
      const prod = PRODUCTS.find((p) => p.id === selectedProductId);
      if (prod) {
        handleOpenDetails(prod);
      }
    }
  }, [selectedProductId]);

  const categories = [
    { id: 'all', label: 'Wszystkie produkty' },
    { id: 'sly-2cm', label: 'Płyty tarasowe 2cm' },
    { id: 'sly-4cm', label: 'Płyty ceramiczno-betonowe 4cm' },
    { id: 'wsporniki', label: 'Wsporniki tarasowe' },
    { id: 'kostka', label: 'Kostka i płyty betonowe' },
    { id: 'kruszywa', label: 'Kruszywa dekoracyjne' },
  ];

  const getCategoryCount = (id: string) => {
    if (id === 'all') return PRODUCTS.length;
    return PRODUCTS.filter((p) => p.category === id).length;
  };

  const filteredProducts = categoryFilter === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === categoryFilter);

  const handleOpenDetails = (prod: Product) => {
    setActiveProduct(prod);
    setSelectedColor(prod.colors[0] || '');
    setSelectedTexture(prod.textures[0] || '');
    setSuccessMessage('');
  };

  const handleCloseDetails = () => {
    setActiveProduct(null);
    setSelectedProductId(null);
  };

  const submitToInquiry = () => {
    if (!activeProduct) return;

    const newItem: InquiryItem = {
      product: activeProduct,
      color: selectedColor,
      texture: selectedTexture,
      quantity: quantity,
      deliveryTime: deliveryTime,
    };

    onAddToInquiry(newItem);
    setSuccessMessage(`Dodano pomyślnie ${activeProduct.name} do zapytania!`);
    
    // Hide notification shortly after
    setTimeout(() => {
      setSuccessMessage('');
      handleCloseDetails();
    }, 2000);
  };

  return (
    <div className="bg-[#FDFDFB] min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Page title header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className={`text-xs font-bold font-mono uppercase tracking-widest block mb-2 ${isV2 ? 'text-orange-500' : 'text-[#2D3E33]'}`}>KATALOG MATERIAŁÓW</span>
          <h1 className="text-3xl sm:text-4xl font-serif font-medium tracking-tight text-stone-900">
            Ekskluzywne Portfolio Produktów
          </h1>
          <p className="mt-2 text-sm text-stone-600 font-light leading-relaxed">
            Dodaj interesujące Cię produkty do listy zapytania. W kolejnym kroku wypełnisz parametry m² w matrycy i wyślesz je do bezpośredniej wyceny.
          </p>
        </div>

        {/* Filter Bar with Horizontal Scrolling on Small Displays */}
        <div className="flex overflow-x-auto gap-2 pb-4 mb-8 border-b border-stone-200 justify-start scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setCategoryFilter(cat.id);
                setSelectedProductId(null);
              }}
              className={`px-4 py-2.5 text-xs font-serif font-semibold uppercase tracking-wider transition-all duration-300 border flex items-center ${
                categoryFilter === cat.id
                  ? (isV2 ? 'bg-orange-600 text-white border-orange-600' : 'bg-[#2D3E33] text-white border-[#2D3E33]')
                  : 'bg-white text-stone-600 border-stone-250 hover:text-stone-900 hover:border-stone-400'
              } whitespace-nowrap`}
            >
              <span>{cat.label}</span>
              {/* Product counter helper (Requirement 6) */}
              <span className={`ml-2 px-1.5 py-0.5 text-[9px] font-mono leading-none rounded-full ${
                categoryFilter === cat.id
                  ? 'bg-white text-stone-900 font-bold'
                  : 'bg-stone-100 text-stone-500'
              }`}>
                {getCategoryCount(cat.id)}
              </span>
            </button>
          ))}
        </div>

        {/* Dynamic Products Grid with adjustable columns for larger images (Requirement 2) */}
        <div className={`grid gap-8 ${
          isV2
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2 max-w-5xl mx-auto'
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
        }`}>
          {filteredProducts.map((prod) => {
            const isAlreadyInInquiry = inquiryItems.some((item) => item.product.id === prod.id);
            return (
              <div
                key={prod.id}
                className={`group bg-white border flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 p-5 ${
                  isV2 ? 'border-stone-200 hover:border-orange-500' : 'border-stone-200'
                }`}
              >
                {/* Product Thumbnail */}
                <div className={`relative w-full bg-stone-50 overflow-hidden mb-4 ${
                  isV2 ? 'h-64' : 'h-48'
                }`}>
                  <img
                    src={prod.imageUrl}
                    alt={prod.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className={`absolute top-2 left-2 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono text-white font-bold tracking-wider ${
                    isV2 ? 'bg-orange-600/95' : 'bg-[#2D3E33]/90'
                  }`}>
                    {prod.brand}
                  </div>
                  {isAlreadyInInquiry && (
                    <div className="absolute top-2 right-2 bg-green-700 text-white p-1 rounded-full border border-white">
                      <Check className="h-3 w-3" />
                    </div>
                  )}
                </div>

                {/* Info block */}
                <div className="flex-grow space-y-2 mb-4 text-left">
                  <span className={`text-[10px] uppercase tracking-widest font-mono font-bold ${
                    isV2 ? 'text-orange-600' : 'text-[#8da094]'
                  }`}>
                    {prod.categoryName}
                  </span>
                  <h3 className={`text-lg font-serif font-medium text-stone-900 leading-tight transition-colors duration-150 ${
                    isV2 ? 'group-hover:text-orange-600' : 'group-hover:text-[#2D3E33]'
                  }`}>
                    {prod.name}
                  </h3>
                  <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                    {prod.description}
                  </p>
                  <p className={`text-xs font-mono font-bold px-2 py-1 rounded inline-block ${
                    isV2 ? 'text-orange-600 bg-orange-50' : 'text-[#2D3E33] bg-[#2D3E33]/5'
                  }`}>
                    Sugerowane: {prod.priceRange}
                  </p>
                </div>

                {/* Action panel */}
                <div className="grid grid-cols-5 gap-2 pt-3 border-t border-stone-100">
                  <button
                    onClick={() => handleOpenDetails(prod)}
                    className="col-span-2 flex items-center justify-center space-x-1.5 py-2 px-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition-all duration-200 cursor-pointer"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    <span>Szczegóły</span>
                  </button>
                  <button
                    onClick={() => handleOpenDetails(prod)} // Opens configurator block directly in details modal
                    className={`col-span-3 flex items-center justify-center space-x-1.5 py-2 px-3 text-xs font-bold transition-all duration-200 shadow-sm cursor-pointer ${
                      isAlreadyInInquiry
                        ? 'bg-stone-900 text-white hover:bg-black'
                        : (isV2 
                            ? 'bg-orange-600 text-white hover:bg-orange-700' 
                            : 'bg-[#2D3E33] text-white hover:bg-[#1E2922]')
                    }`}
                  >
                    <Plus className="h-3.5 w-3.5 stroke-[3px]" />
                    <span>Zapytaj</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Elegant Modal: Product Details + Configurator Form parameter overlay */}
        {activeProduct && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
            <div className="relative w-full max-w-4xl bg-[#FDFDFB] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh] border border-stone-200">
              
              {/* Close Button */}
              <button
                onClick={handleCloseDetails}
                className="absolute top-4 right-4 z-25 h-10 w-10 bg-stone-900 text-white hover:bg-orange-600 flex items-center justify-center transition-colors duration-200 shadow-md cursor-pointer animate-pulse"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Left Column: Product Info & Images */}
              <div className="w-full md:w-1/2 p-6 sm:p-8 overflow-y-auto border-r border-stone-200">
                <span className={`text-xs font-bold font-mono uppercase tracking-widest block mb-1 ${isV2 ? 'text-orange-600' : 'text-[#2D3E33]'}`}>
                  {activeProduct.categoryName} • {activeProduct.brand}
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-medium text-stone-900 tracking-tight leading-tight mb-4">
                  {activeProduct.name}
                </h2>
                
                <div className="relative h-64 w-full overflow-hidden mb-6 bg-stone-50 border border-stone-200 rounded-sm">
                  <img
                    src={isV2 ? getProductColorImage(activeProduct, selectedColor) : activeProduct.imageUrl}
                    alt={activeProduct.name}
                    className="w-full h-full object-cover transition-all duration-300"
                    referrerPolicy="no-referrer"
                  />
                  {isV2 && selectedColor && (
                    <div className="absolute bottom-2 left-2 bg-stone-900/90 backdrop-blur-sm border border-stone-700 text-stone-200 px-3 py-1 text-[10px] font-mono tracking-wider">
                      Wybrana opcja: <span className="text-orange-500 font-bold uppercase">{selectedColor}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-stone-400 font-bold font-mono">Opis produktu:</h4>
                    <p className="text-sm text-stone-600 font-light mt-1.5 leading-relaxed font-sans">{activeProduct.description}</p>
                  </div>

                  {/* Features Bullet details */}
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-stone-400 font-bold font-mono mb-2">Unikalne zalety:</h4>
                    <ul className="grid grid-cols-1 gap-2">
                      {activeProduct.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start text-xs text-stone-700">
                          <Check className="h-4 w-4 text-[#2D3E33] shrink-0 mr-2 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Spec table */}
                  <div className="pt-4 border-t border-stone-100 grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-stone-400 block font-bold font-mono uppercase">Dostępne formaty:</span>
                      <span className="text-stone-800 font-semibold block mt-1">{activeProduct.dimensions.join(' • ')}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block font-bold font-mono uppercase">Cena orientacyjna:</span>
                      <span className="text-stone-800 font-semibold block mt-1">{activeProduct.priceRange}</span>
                    </div>
                  </div>

                  {/* FAQ block */}
                  {activeProduct.faq && activeProduct.faq.length > 0 && (
                    <div className="pt-4 border-t border-stone-100">
                      <h4 className="text-xs uppercase tracking-wider text-stone-400 font-bold font-mono flex items-center mb-2">
                        <HelpCircle className="h-3.5 w-3.5 text-stone-400 mr-1.5" />
                        <span>Najczęstsze pytania techniczne:</span>
                      </h4>
                      <div className="space-y-3">
                        {activeProduct.faq.map((item, fIdx) => (
                          <div key={fIdx} className="bg-stone-50 p-3 border border-stone-100">
                            <span className="text-xs font-serif font-semibold text-stone-800 block">Q: {item.question}</span>
                            <span className="text-xs text-stone-600 font-light block mt-1 leading-normal font-sans">A: {item.answer}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Interactive configurator parameters questionnaire */}
              <div className="w-full md:w-1/2 p-6 sm:p-8 bg-[#1C2720] text-white overflow-y-auto flex flex-col justify-between">
                
                {/* Configurator title */}
                <div className="space-y-6">
                  <div>
                    <span className="text-[#8da094] text-xs font-serif italic block">Konfigurator zapytania</span>
                    <h3 className="text-xl font-serif font-medium text-[#FDFDFB]">Dostosuj Parametry Oferty</h3>
                    <p className="text-xs text-stone-300 mt-1">Uzupełnij parametry pod swój projekt budowlany, abyśmy przygotowali precyzyjną wycenę.</p>
                  </div>

                  {/* Configuration Input Fields */}
                  <div className="space-y-5">
                    
                    {/* Color selector */}
                    <div>
                      <label className="block text-xs font-bold font-mono uppercase text-[#8da094] mb-2">Wybierz odcień/kolor:</label>
                      <div className="flex flex-wrap gap-2">
                        {activeProduct.colors.map((c) => (
                          <button
                            key={c}
                            onClick={() => setSelectedColor(c)}
                            className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-200 border ${
                              selectedColor === c
                                ? 'bg-white text-stone-900 border-white'
                                : 'bg-[#253229] text-stone-300 border-[#2e3f34] hover:bg-[#2d3a31]'
                            }`}
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Texture/Surface selector */}
                    <div>
                      <label className="block text-xs font-bold font-mono uppercase text-[#8da094] mb-2">Struktura wykończenia:</label>
                      <div className="flex flex-wrap gap-2">
                        {activeProduct.textures.map((t) => (
                          <button
                            key={t}
                            onClick={() => setSelectedTexture(t)}
                            className={`px-3 py-1.5 text-xs font-semibold transition-all duration-200 border ${
                              selectedTexture === t
                                ? 'text-white border-white bg-white/10 font-bold'
                                : 'bg-[#253229] text-stone-300 border-[#2e3f34] hover:bg-[#2d3a31]'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Quantity field */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold font-mono uppercase text-[#8da094] mb-2">Szacowana Ilość:</label>
                        <div className="relative">
                          <input
                            type="text"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className="bg-[#253229] border border-[#2e3f34] text-white px-4 py-2.5 text-sm font-semibold w-full focus:outline-none focus:border-[#8da094]"
                            placeholder="np. 45"
                          />
                          <span className="absolute right-3 top-3 text-xs font-bold text-stone-400 uppercase">
                            {activeProduct.category === 'wsporniki' ? 'szt.' : 'm²'}
                          </span>
                        </div>
                      </div>

                      {/* Delivery timeline dropdown */}
                      <div>
                        <label className="block text-xs font-bold font-mono uppercase text-[#8da094] mb-2">Termin Inwestycji:</label>
                        <select
                          value={deliveryTime}
                          onChange={(e) => setDeliveryTime(e.target.value)}
                          className="bg-[#253229] border border-[#2e3f34] text-white px-3 py-2.5 text-sm font-semibold w-full focus:outline-none focus:border-[#8da094]"
                        >
                          <option value="Pilne (do 7 dni)">Pilne (do 7 dni)</option>
                          <option value="Do 2 tygodni">Do 2 tygodni</option>
                          <option value="Do miesiąca">Do miesiąca</option>
                          <option value="Planowane na później">Później (2-3 mies.)</option>
                        </select>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Confirm additions Panel */}
                <div className="mt-8 pt-6 border-t border-[#2e3f34] space-y-4">
                  {successMessage ? (
                    <div className="bg-green-600/20 border border-green-500/30 text-green-400 py-3 px-4 text-xs font-semibold text-center flex items-center justify-center space-x-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>{successMessage}</span>
                    </div>
                  ) : (
                    <button
                      onClick={submitToInquiry}
                      className="w-full flex items-center justify-center space-x-2 py-4 bg-white text-stone-900 font-serif font-bold text-base hover:bg-[#FDFDFB] transition-all duration-300 shadow-md"
                    >
                      <ClipboardList className="h-5 w-5" />
                      <span>Dodaj do Zapytania Ofertowego</span>
                    </button>
                  )}
                  
                  <div className="flex items-center space-x-2 text-[11px] text-[#8da094] leading-normal font-sans">
                    <Info className="h-3.5 w-3.5 text-[#8da094] shrink-0" />
                    <span>Produkt zostanie dodany do Twojego zestawienia RFQ. Możesz dodać kolejny, a my stworzymy porównawczą tabelę macierzową na końcu.</span>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
