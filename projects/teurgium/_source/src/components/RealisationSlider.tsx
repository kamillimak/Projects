import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, MapPin, Layers, Sparkles } from 'lucide-react';
import { REALISATIONS } from '../data';

export default function RealisationSlider() {
  const sliderItems = REALISATIONS.slice(0, 3); // Take the top three premium projects matching user visuals
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === sliderItems.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? sliderItems.length - 1 : prev - 1));
  };

  const currentProject = sliderItems[currentIndex];

  // Slide variants for smooth animation
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <section className="bg-stone-900 text-white py-16 px-4 sm:px-6 lg:px-8 border-y border-stone-800 relative overflow-hidden">
      {/* Absolute Decorative Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#EA580C_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-bold uppercase tracking-widest font-mono rounded-full mb-3">
            <Sparkles className="h-3.5 w-3.5 text-orange-500" />
            <span>Kunszt Rzemiosła Premium</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium tracking-tight text-white leading-tight">
            Tworzymy stylowe <span className="text-orange-500 italic font-normal">tarasy i podjazdy</span> oraz ogrody premium
          </h2>
          <p className="text-sm text-stone-400 mt-3 font-light max-w-2xl mx-auto leading-relaxed">
            Zainspiruj się naszymi najpiękniejszymi, zrealizowanymi projektami i zobacz, jak doskonałość technologii łączy się z najwyższym prestiżem wizualnym.
          </p>
        </div>

        {/* Interactive Slider Frame */}
        <div className="relative min-h-[500px] md:min-h-[420px] bg-stone-950 border border-stone-800 overflow-hidden shadow-2xl rounded-none flex flex-col md:flex-row items-stretch">
          
          {/* Slide Content wrapper */}
          <div className="flex-1 flex flex-col md:flex-row items-stretch relative min-h-[450px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="absolute inset-0 flex flex-col md:flex-row items-stretch w-full h-full"
              >
                {/* Left Side: Massive, beautiful image */}
                <div className="w-full md:w-3/5 relative min-h-[250px] md:min-h-full">
                  <img
                    src={currentProject.imageUrl}
                    alt={currentProject.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-stone-950 via-stone-950/20 to-transparent" />
                  
                  {/* Location Badge */}
                  <div className="absolute bottom-4 left-4 bg-orange-600/90 text-white px-3.5 py-1.5 text-xs font-mono font-bold uppercase tracking-wider flex items-center space-x-1.5 shadow-lg border border-orange-500/30">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>Lokalizacja: {currentProject.location}</span>
                  </div>
                </div>

                {/* Right Side: Information Panel with deep orange/slate detailing */}
                <div className="w-full md:w-2/5 p-6 sm:p-10 flex flex-col justify-between text-left space-y-6 bg-stone-950">
                  <div className="space-y-4">
                    <span className="text-orange-500 text-[10px] uppercase font-bold tracking-widest font-mono block">
                      Wizualizacja Kunsztu • Realizacja {currentIndex + 1} z {sliderItems.length}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif font-medium text-stone-100 tracking-tight leading-tight">
                      {currentProject.title}
                    </h3>
                    <p className="text-sm text-stone-300 font-light leading-relaxed">
                      {currentProject.description}
                    </p>
                  </div>

                  {/* Materials Block */}
                  <div className="pt-6 border-t border-stone-800 space-y-3">
                    <div className="flex items-center space-x-2 text-xs font-mono font-bold text-orange-400">
                      <Layers className="h-4 w-4 shrink-0" />
                      <span className="uppercase tracking-widest text-[9px]">SPECYFIKACJA MATERIAŁOWA</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {currentProject.materialsUsed.map((mat, mIdx) => (
                        <span
                          key={mIdx}
                          className="px-2.5 py-1 bg-stone-900 border border-stone-800 text-xs text-stone-300 font-mono"
                        >
                          {mat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          {/* Left Arrow */}
          <div className="absolute inset-y-0 left-2 flex items-center z-30">
            <button
              onClick={prevSlide}
              className="h-12 w-12 bg-stone-900/90 border border-stone-800 text-stone-300 hover:text-white hover:bg-orange-600 hover:border-orange-500 transition-all duration-350 flex items-center justify-center shadow-lg cursor-pointer"
              aria-label="Poprzedni projekt"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          </div>

          {/* Right Arrow */}
          <div className="absolute inset-y-0 right-2 flex items-center z-30">
            <button
              onClick={nextSlide}
              className="h-12 w-12 bg-stone-900/90 border border-stone-800 text-stone-300 hover:text-white hover:bg-orange-600 hover:border-orange-500 transition-all duration-350 flex items-center justify-center shadow-lg cursor-pointer"
              aria-label="Następny projekt"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Slide Indicators / Dots */}
        <div className="flex justify-center space-x-3 mt-6">
          {sliderItems.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`h-2 transition-all duration-350 rounded-full cursor-pointer ${
                idx === currentIndex ? 'w-10 bg-orange-600' : 'w-2 bg-stone-700 hover:bg-stone-500'
              }`}
              aria-label={`Przejdź do slajdu ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
