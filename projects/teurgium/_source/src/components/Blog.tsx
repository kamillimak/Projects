/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BLOG_ARTICLES } from '../data';
import { BlogArticle } from '../types';
import { Calendar, Clock, ChevronLeft, ArrowRight, FileText, BadgeHelp } from 'lucide-react';

export default function Blog() {
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);

  return (
    <div className="bg-zinc-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {selectedArticle ? (
          /* SINGLE DETAILED ARTICLE VIEW WITH TYPOGRAPHY */
          <div className="space-y-8 text-left bg-white rounded-3xl border border-zinc-200 p-6 sm:p-10 shadow-sm">
            
            {/* Back Button */}
            <button
              onClick={() => setSelectedArticle(null)}
              className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 hover:text-amber-500 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Powrót do bazy wiedzy</span>
            </button>

            {/* Metas */}
            <div className="space-y-3">
              <span className="inline-block bg-amber-500/10 text-amber-600 text-xs font-bold font-mono uppercase tracking-wider px-2.5 py-1 rounded-md">
                {selectedArticle.category}
              </span>
              <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-zinc-900 leading-tight">
                {selectedArticle.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 pt-2 pb-4 border-b border-zinc-150">
                <span className="flex items-center">
                  <Calendar className="h-3.5 w-3.5 text-zinc-400 mr-1 shrink-0" />
                  {selectedArticle.publishDate}
                </span>
                <span className="flex items-center">
                  <Clock className="h-3.5 w-3.5 text-zinc-400 mr-1 shrink-0" />
                  {selectedArticle.readTime}
                </span>
                <span className="text-zinc-300">•</span>
                <span className="text-zinc-550 font-bold">Opublikowane przez: Ekspert Teurgium</span>
              </div>
            </div>

            {/* Main Article Cover */}
            <div className="h-64 sm:h-96 w-full rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200">
              <img
                src={selectedArticle.imageUrl}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Typographic article body */}
            <div className="whitespace-pre-line text-sm sm:text-base text-zinc-700 leading-relaxed font-light space-y-4 max-w-3xl">
              {/* Replace markdown markdown titles dynamically or render them as beautiful styled sections */}
              {selectedArticle.content.split('\n\n').map((paragraph, pIdx) => {
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={pIdx} className="text-lg sm:text-xl font-bold font-sans text-zinc-900 pt-6 pb-2">
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                }
                if (paragraph.startsWith('- ')) {
                  return (
                    <ul key={pIdx} className="list-disc pl-5 space-y-1 my-2">
                      {paragraph.split('\n').map((li, lIdx) => (
                        <li key={lIdx} className="text-zinc-650 text-sm">
                          {li.replace('- ', '')}
                        </li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={pIdx} className="text-zinc-650 text-justify">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-850 mt-12 flex flex-col sm:flex-row justify-between items-center text-white text-left gap-4">
              <div>
                <h4 className="font-bold text-lg text-amber-400">Potrzebujesz pomocy technicznej?</h4>
                <p className="text-xs text-zinc-300 mt-1 font-light max-w-lg">Nasi rzemieślnicy pomogą dobrać szczeliny dylatacyjne i doradzą w kwestii doboru płyt wentylowanych.</p>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-6 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs shrink-0 transition-colors"
              >
                Skonsultuj Projekt
              </button>
            </div>

          </div>
        ) : (
          /* BLOG DIRECTORY LISTING */
          <div className="space-y-12 text-left">
            
            {/* Header */}
            <div>
              <span className="text-amber-600 text-xs font-bold font-mono uppercase tracking-widest block mb-2">SEO BAZA WIEDZY • INSIPIRACJE</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-medium tracking-tight text-zinc-900">
                Wiedza, która zabezpiecza Twój taras
              </h2>
              <p className="text-sm text-zinc-650 mt-1 shadow-sm font-light">
                Porady, analizy i instrukcje inżynieryjne przygotowywane we współpracy z producentami gresów, wsporników i systemów ogrodowych.
              </p>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {BLOG_ARTICLES.map((art) => (
                <div
                  key={art.id}
                  onClick={() => setSelectedArticle(art)}
                  className="group bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    {/* Thumbnail */}
                    <div className="h-48 w-full bg-zinc-100 overflow-hidden relative">
                      <img
                        src={art.imageUrl}
                        alt={art.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 left-3 bg-zinc-950/80 backdrop-blur-md px-2.5 py-0.5 rounded text-[10px] font-mono text-amber-400 font-bold">
                        {art.category}
                      </div>
                    </div>

                    {/* Meta info info */}
                    <div className="p-6 space-y-3">
                      <div className="flex items-center space-x-3 text-[10px] text-zinc-400 font-mono font-medium">
                        <span className="flex items-center"><Calendar className="h-3 w-3 mr-1" />{art.publishDate}</span>
                        <span className="flex items-center"><Clock className="h-3 w-3 mr-1" />{art.readTime}</span>
                      </div>
                      
                      <h3 className="text-lg font-bold text-zinc-900 leading-snug group-hover:text-amber-600 transition-colors duration-200">
                        {art.title}
                      </h3>
                      
                      <p className="text-xs text-zinc-500 font-light leading-relaxed line-clamp-3">
                        {art.summary}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="px-6 pb-6 pt-2 border-t border-zinc-50 flex items-center justify-between text-xs font-bold text-amber-600 group-hover:text-amber-500">
                    <span>Czytaj cały artykuł</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>

                </div>
              ))}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
