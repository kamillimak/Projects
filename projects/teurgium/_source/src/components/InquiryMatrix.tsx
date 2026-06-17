/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { InquiryItem, RFQSubmission } from '../types';
import { Trash2, Send, CheckCircle, ClipboardList, ShoppingBag, MapPin, Phone, User, Mail, HelpCircle } from 'lucide-react';

interface InquiryMatrixProps {
  inquiryItems: InquiryItem[];
  onRemoveItem: (index: number) => void;
  onUpdateItem: (index: number, updatedItem: InquiryItem) => void;
  onClearInquiry: () => void;
  setTab: (tab: string) => void;
}

export default function InquiryMatrix({
  inquiryItems,
  onRemoveItem,
  onUpdateItem,
  onClearInquiry,
  setTab,
}: InquiryMatrixProps) {
  
  // Client details form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    description: '',
    topic: 'Wycena kompleksowa tarasu',
  });

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const topics = [
    'Wycena kompleksowa tarasu',
    'Wycena podjazdu / nawierzchni kostki',
    'Dobór wsporników tarasowych',
    'Zamówienie kruszyw i dekoracji',
    'Doradztwo techniczne i pomiary',
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Imię i nazwisko są wymagane.';
    if (!formData.phone.trim()) newErrors.phone = 'Numer telefonu jest wymagany.';
    if (!formData.email.trim()) {
      newErrors.email = 'Adres e-mail jest wymagany.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Nieprawidłowy adres e-mail.';
    }
    if (!formData.location.trim()) newErrors.location = 'Miejscowość inwestycji jest wymagana.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Simulate submission delivery
    console.log('Sending RFQ submission payload: %o', { ...formData, items: inquiryItems });
    setIsSubmitted(true);
  };

  const handleReset = () => {
    onClearInquiry();
    setFormData({
      name: '',
      phone: '',
      email: '',
      location: '',
      description: '',
      topic: 'Wycena kompleksowa tarasu',
    });
    setIsSubmitted(false);
    setTab('home');
  };

  if (isSubmitted) {
    return (
      <div className="bg-[#FDFDFB] min-h-[80vh] flex items-center justify-center py-16 px-4">
        <div className="max-w-xl w-full bg-white p-8 sm:p-12 text-center border border-stone-200 shadow-xl space-y-6">
          <div className="mx-auto h-20 w-20 bg-[#2D3E33]/15 flex items-center justify-center text-[#2D3E33] border border-[#2D3E33]/20 shadow-sm animate-bounce">
            <CheckCircle className="h-10 w-10 stroke-[1.5px]" />
          </div>
          
          <span className="text-stone-400 text-xs font-bold font-mono uppercase tracking-widest block">DZIĘKUJEMY • ZGŁOSZENIE WYSŁANE</span>
          <h2 className="text-3xl font-serif font-semibold text-stone-900 leading-tight">
            Zapytanie Ofertowe Złożone Pomyślnie
          </h2>
          <p className="text-sm text-stone-600 font-light leading-relaxed max-w-md mx-auto">
            Stworzyliśmy kompletną matrycę parametrów Twojego zapytania. Jeden z naszych głównych technologów ds. tarasów premium skontaktuje się z Tobą telefonicznie w ciągu najbliższych 2 godzin w celu potwierdzenia specyfikacji logistycznej i dostawy próbek.
          </p>

          <div className="bg-stone-50 p-4 border border-stone-100 text-left space-y-2.5 max-w-md mx-auto">
            <div className="text-xs text-stone-500"><span className="font-bold text-stone-700 font-mono">Temat:</span> {formData.topic}</div>
            <div className="text-xs text-stone-500"><span className="font-bold text-stone-700 font-mono">Klient:</span> {formData.name}</div>
            <div className="text-xs text-stone-500"><span className="font-bold text-stone-700 font-mono">Telefon:</span> {formData.phone}</div>
            <div className="text-xs text-stone-500"><span className="font-bold text-stone-700 font-mono">Lokalizacja:</span> {formData.location}</div>
            <div className="text-xs text-stone-500"><span className="font-bold text-stone-700 font-mono">Liczba produktów:</span> {inquiryItems.length} szt.</div>
          </div>

          <button
            onClick={handleReset}
            className="px-8 py-3.5 bg-[#2D3E33] hover:bg-[#1E2922] text-white text-xs font-serif font-bold uppercase tracking-wider transition-all duration-300"
          >
            Powrót Do Oferty Głównej
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FDFDFB] min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Title Section */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[#2D3E33] text-xs font-bold font-mono uppercase tracking-widest block mb-2">PROCES WYCENY TARASU</span>
          <h1 className="text-3xl sm:text-4xl font-serif font-medium tracking-tight text-stone-900">
            System Zapytań Ofertowych RFQ
          </h1>
          <p className="mt-2 text-sm text-stone-600 font-light leading-relaxed">
            Poniższa interaktywna macierz zestawia wybrane materiały i umożliwia ich bezpośrednią modyfikację w jednej tabeli. Uzupełnij dane kontaktowe na dole, aby wydać kosztorys.
          </p>
        </div>

        {inquiryItems.length === 0 ? (
          /* Empty State */
          <div className="max-w-2xl mx-auto bg-white p-8 sm:p-12 text-center border border-stone-200 space-y-6">
            <div className="mx-auto h-16 w-16 bg-[#2D3E33]/10 flex items-center justify-center text-[#2D3E33] border border-[#2D3E33]/20">
              <ClipboardList className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-serif font-medium text-stone-900">Brak produktów na liście zapytania</h3>
              <p className="text-stone-600 text-sm font-light leading-relaxed">
                Przejdź do naszego spersonalizowanego katalogu produktów premium, dobierz gresy, wsporniki lub kostki i dodaj je celem łatwego sformułowania zapytania technicznego.
              </p>
            </div>
            <button
              onClick={() => setTab('offer')}
              className="px-6 py-3 bg-[#2D3E33] hover:bg-[#1E2922] text-white text-xs font-serif font-bold uppercase tracking-wider transition-all duration-350"
            >
              Przeglądaj Ekskluzywną Ofertę
            </button>
          </div>
        ) : (
          /* Rich Matrix Frame + Form */
          <div className="space-y-12">
            
            {/* MATRIX COMPARISON GRID */}
            <div className="bg-white border border-stone-200 shadow-md overflow-hidden">
              <div className="p-6 border-b border-stone-100 bg-stone-50 flex items-center justify-between">
                <div>
                  <h3 className="font-serif font-medium text-stone-900 flex items-center sm:text-lg">
                    <ClipboardList className="h-5 w-5 text-[#2D3E33] mr-2" />
                    <span>Zestawienie Produktów w Zapytaniu (Macierz)</span>
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5 font-sans">Ustaw kolory, uszlachetnienia, formaty oraz m² bezpośrednio w kolumnach.</p>
                </div>
                <button
                  onClick={onClearInquiry}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold uppercase tracking-wider"
                >
                  Wyczyść listę
                </button>
              </div>

              {/* MATRIX TABLE LAYOUT */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="bg-stone-100 border-b border-stone-200 text-xs font-mono font-bold uppercase text-stone-600">
                      <th className="py-4 px-6 w-1/4">Parametr / Cecha</th>
                      {inquiryItems.map((item, idx) => (
                        <th key={idx} className="py-4 px-6 w-1/4 border-l border-stone-200 relative bg-stone-50/50">
                          <div className="flex items-center justify-between">
                            <span className="font-serif font-semibold text-stone-800 line-clamp-1">{item.product.name}</span>
                            <button
                              onClick={() => onRemoveItem(idx)}
                              aria-label="Remove item"
                              className="text-red-500 hover:text-red-700 p-1 hover:bg-stone-50 rounded"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <span className="text-[10px] font-normal text-stone-500 block font-sans lowercase mt-0.5">{item.product.brand}</span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  
                  <tbody className="divide-y divide-stone-200 text-sm">
                    {/* Brand Row */}
                    <tr>
                      <td className="py-4 px-6 font-semibold text-stone-550 font-mono text-xs uppercase bg-stone-50/30">Producent / Marka</td>
                      {inquiryItems.map((item, idx) => (
                        <td key={idx} className="py-4 px-6 border-l border-stone-200 font-mono text-xs font-bold text-stone-700">
                          {item.product.brand}
                        </td>
                      ))}
                    </tr>

                    {/* Color Matrix Cell Selector */}
                    <tr>
                      <td className="py-4 px-6 font-semibold text-stone-550 font-mono text-xs uppercase bg-stone-50/30">Wybrany Kolor</td>
                      {inquiryItems.map((item, idx) => (
                        <td key={idx} className="py-4 px-6 border-l border-stone-200 bg-[#2D3E33]/5">
                          <select
                            value={item.color}
                            onChange={(e) => onUpdateItem(idx, { ...item, color: e.target.value })}
                            className="bg-stone-50 border border-stone-300 rounded px-2 py-1 text-xs font-bold text-stone-800 focus:outline-none focus:border-[#2D3E33]"
                          >
                            {item.product.colors.map((c) => (
                              <option key={c} value={c}>{c}</option>
                            ))}
                          </select>
                        </td>
                      ))}
                    </tr>

                    {/* Texture Matrix Cell Selector */}
                    <tr>
                      <td className="py-4 px-6 font-semibold text-stone-550 font-mono text-xs uppercase bg-stone-50/30">Struktura wykończenia</td>
                      {inquiryItems.map((item, idx) => (
                        <td key={idx} className="py-4 px-6 border-l border-stone-200">
                          <select
                            value={item.texture}
                            onChange={(e) => onUpdateItem(idx, { ...item, texture: e.target.value })}
                            className="bg-stone-50 border border-stone-300 rounded px-2 py-1 text-xs text-stone-700 focus:outline-none focus:border-[#2D3E33]"
                          >
                            {item.product.textures.map((t) => (
                              <option key={t} value={t}>{t}</option>
                            ))}
                          </select>
                        </td>
                      ))}
                    </tr>

                    {/* Quantity Selector */}
                    <tr>
                      <td className="py-4 px-6 font-semibold text-stone-550 font-mono text-xs uppercase bg-stone-50/30">
                        Ilość (m² lub szt.)
                      </td>
                      {inquiryItems.map((item, idx) => (
                        <td key={idx} className="py-4 px-6 border-l border-stone-200">
                          <div className="flex items-center space-x-1">
                            <input
                              type="text"
                              value={item.quantity}
                              onChange={(e) => onUpdateItem(idx, { ...item, quantity: e.target.value })}
                              className="w-16 bg-stone-50 border border-stone-300 px-2 py-1 text-xs text-center font-bold text-stone-800 focus:outline-none focus:border-[#2D3E33]"
                            />
                            <span className="text-xs font-semibold text-stone-400 font-mono uppercase">
                              {item.product.category === 'wsporniki' ? 'szt.' : 'm²'}
                            </span>
                          </div>
                        </td>
                      ))}
                    </tr>

                    {/* Delivery Timeline matrix */}
                    <tr>
                      <td className="py-4 px-6 font-semibold text-stone-550 font-mono text-xs uppercase bg-stone-50/30">Termin na budowę</td>
                      {inquiryItems.map((item, idx) => (
                        <td key={idx} className="py-4 px-6 border-l border-stone-200">
                          <select
                            value={item.deliveryTime}
                            onChange={(e) => onUpdateItem(idx, { ...item, deliveryTime: e.target.value })}
                            className="bg-stone-50 border border-stone-300 px-2 py-1 text-xs text-stone-750 focus:outline-none focus:border-[#2D3E33]"
                          >
                            <option value="Pilne (do 7 dni)">Pilne (do 7 dni)</option>
                            <option value="Do 2 tygodni">Do 2 tygodni</option>
                            <option value="Do miesiąca">Do miesiąca</option>
                            <option value="Planowane na później">Później (2-3 mies.)</option>
                          </select>
                        </td>
                      ))}
                    </tr>

                    {/* Price guideline row */}
                    <tr>
                      <td className="py-4 px-6 font-semibold text-stone-550 font-mono text-xs uppercase bg-stone-50/30">Komp. sugerowany format</td>
                      {inquiryItems.map((item, idx) => (
                        <td key={idx} className="py-4 px-6 border-l border-stone-200 text-xs font-medium text-stone-600">
                          {item.product.dimensions[0]}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* TWO-COLUMN CONTACT DETAILS & LEAD FORM SHIELD */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Form info guidance */}
              <div className="lg:col-span-4 bg-[#1C2720] text-white p-6 sm:p-8 space-y-6 border border-[#2e3f34]">
                <span className="text-[#8da094] text-xs font-bold font-mono uppercase tracking-widest block">KOMPLETNOŚĆ DANYCH</span>
                <h3 className="text-xl font-bold font-serif leading-tight">Proces wyceny inwestycji w Teurgium</h3>
                <p className="text-xs text-stone-300 font-light leading-relaxed font-sans">
                  Do wyceny tarasów lub podjazdów dołączamy asystę architekta, który zweryfikuje, czy wybrane gresy i wsporniki pasują pod planowany spadek posadzki.
                </p>

                <div className="space-y-4 pt-4 border-t border-[#2e3f34]">
                  <div className="flex items-center space-x-3 text-xs">
                    <div className="h-8 w-8 bg-white/10 flex items-center justify-center text-[#8da094] shrink-0 border border-white/10">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                    <span className="font-sans">100% Darmowy kosztorys w 2 godziny</span>
                  </div>
                  <div className="flex items-center space-x-3 text-xs">
                    <div className="h-8 w-8 bg-white/10 flex items-center justify-center text-[#8da094] shrink-0 border border-white/10">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                    <span className="font-sans">Dostawa próbek materiałów kurierem DPD</span>
                  </div>
                  <div className="flex items-center space-x-3 text-xs">
                    <div className="h-8 w-8 bg-white/10 flex items-center justify-center text-[#8da094] shrink-0 border border-white/10">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                    <span className="font-sans">Gwarancja stałości ceny na 3 miesiące</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Lead Form */}
              <form onSubmit={handleFormSubmit} className="lg:col-span-8 bg-white border border-stone-200 p-6 sm:p-8 space-y-6">
                <h3 className="text-xl font-serif font-medium text-stone-900 border-b border-stone-100 pb-3">
                  Wypełnij Formularz Kontaktowy
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Client Name */}
                  <div className="text-left">
                    <label className="block text-xs font-bold font-mono uppercase text-[#2D3E33] mb-1.5">Imię i Nazwisko:</label>
                    <div className="relative">
                      <span className="absolute left-3 top-3.5 text-stone-400"><User className="h-4 w-4" /></span>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`bg-stone-50 border ${errors.name ? 'border-red-500' : 'border-stone-200'} text-[#1A1A1A] pl-10 pr-4 py-3 text-sm font-semibold w-full focus:outline-none focus:border-[#2D3E33]`}
                        placeholder="np. Kowalski Jan"
                      />
                    </div>
                    {errors.name && <span className="text-[10px] text-red-500 font-medium tracking-tight mt-1 block">{errors.name}</span>}
                  </div>

                  {/* Client Phone */}
                  <div className="text-left">
                    <label className="block text-xs font-bold font-mono uppercase text-[#2D3E33] mb-1.5">Telefon kontaktowy:</label>
                    <div className="relative">
                      <span className="absolute left-3 top-3.5 text-stone-400"><Phone className="h-4 w-4" /></span>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`bg-stone-50 border ${errors.phone ? 'border-red-500' : 'border-stone-200'} text-[#1A1A1A] pl-10 pr-4 py-3 text-sm font-semibold w-full focus:outline-none focus:border-[#2D3E33]`}
                        placeholder="np. +48 501 020 304"
                      />
                    </div>
                    {errors.phone && <span className="text-[10px] text-red-500 font-medium tracking-tight mt-1 block">{errors.phone}</span>}
                  </div>

                  {/* Client Email */}
                  <div className="text-left">
                    <label className="block text-xs font-bold font-mono uppercase text-[#2D3E33] mb-1.5">Adres E-mail:</label>
                    <div className="relative">
                      <span className="absolute left-3 top-3.5 text-stone-400"><Mail className="h-4 w-4" /></span>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`bg-stone-50 border ${errors.email ? 'border-red-500' : 'border-stone-200'} text-[#1A1A1A] pl-10 pr-4 py-3 text-sm font-semibold w-full focus:outline-none focus:border-[#2D3E33]`}
                        placeholder="np. jan@gmail.com"
                      />
                    </div>
                    {errors.email && <span className="text-[10px] text-red-500 font-medium tracking-tight mt-1 block">{errors.email}</span>}
                  </div>

                  {/* Client Location */}
                  <div className="text-left">
                    <label className="block text-xs font-bold font-mono uppercase text-[#2D3E33] mb-1.5">Lokalizacja inwestycji (miejscowość):</label>
                    <div className="relative">
                      <span className="absolute left-3 top-3.5 text-stone-400"><MapPin className="h-4 w-4" /></span>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className={`bg-stone-50 border ${errors.location ? 'border-red-500' : 'border-stone-200'} text-[#1A1A1A] pl-10 pr-4 py-3 text-sm font-semibold w-full focus:outline-none focus:border-[#2D3E33]`}
                        placeholder="np. Konstancin-Jeziorna"
                      />
                    </div>
                    {errors.location && <span className="text-[10px] text-red-500 font-medium tracking-tight mt-1 block">{errors.location}</span>}
                  </div>
                </div>

                {/* Topic selection */}
                <div className="text-left">
                  <label className="block text-xs font-bold font-mono uppercase text-[#2D3E33] mb-1.5">Główny temat zapytania:</label>
                  <select
                    name="topic"
                    value={formData.topic}
                    onChange={handleInputChange}
                    className="bg-stone-50 border border-stone-200 text-[#1A1A1A] px-4 py-3 text-sm font-semibold w-full focus:outline-none focus:border-[#2D3E33]"
                  >
                    {topics.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                {/* Investment Description */}
                <div className="text-left">
                  <label className="block text-xs font-semibold text-stone-500 font-mono mb-1.5 uppercase">Opis inwestycji / dodatkowe wymagania:</label>
                  <textarea
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    className="bg-stone-50 border border-stone-200 text-[#1A1A1A] text-sm font-medium p-4 w-full focus:outline-none focus:border-[#2D3E33]"
                    placeholder="Opisz np. grubość wylewki, spadek, czy w grę wchodzą nierówności gruntu..."
                  />
                </div>

                {/* Submit button */}
                <div className="pt-4 border-t border-stone-100 flex justify-end">
                  <button
                    type="submit"
                    className="flex items-center space-x-2 px-8 py-4 bg-[#2D3E33] hover:bg-[#1E2922] text-white text-xs font-serif font-bold uppercase tracking-wider transition-all duration-300 shadow-sm"
                  >
                    <span>Wyślij zapytanie techniczne</span>
                    <Send className="h-4 w-4" />
                  </button>
                </div>

              </form>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
