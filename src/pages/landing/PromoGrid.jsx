import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PROMO_SLIDES = [
  {
    id: 1,
    title: "Smart Foldable Pocket Drones",
    description: "Ultra-portable formats designed for instant flight deployment and smart tracking features.",
    buttonText: "Shop Now",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1000&q=80", // Forest campfire/nature lifestyle landscape
    bgColor: "bg-[#F5F6F9] dark:bg-slate-900"
  },
  {
    id: 2,
    title: "Unleash Cinematic Perspectives",
    description: "Explore pro-grade aerial photography gear with stable 4K recording mechanics.",
    buttonText: "Explore Collection",
    image: "https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?auto=format&fit=crop&w=1000&q=80",
    bgColor: "bg-[#F5F6F9] dark:bg-slate-900"
  },
  {
    id: 3,
    title: "Save Big on Selected Items",
    description: "Get more discount as you browse through our new collections.",
    buttonText: "View Offers",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1000&q=80",
    bgColor: "bg-[#F5F6F9] dark:bg-slate-900"
  }
];

const CAROUSEL_INTERVAL_SECONDS = 5;

export default function PromoGrid() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const autoPlayTimer = setInterval(() => {
      handleNext();
    }, CAROUSEL_INTERVAL_SECONDS * 1000);

    return () => clearInterval(autoPlayTimer);
  }, [currentIndex]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? PROMO_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === PROMO_SLIDES.length - 1 ? 0 : prev + 1));
  };

  const variants = {
    enter: (dir) => ({
      opacity: 0,
      x: dir > 0 ? 100 : -100
    }),
    center: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: "easeInOut" }
    },
    exit: (dir) => ({
      opacity: 0,
      x: dir < 0 ? 100 : -100,
      transition: { duration: 0.4, ease: "easeInOut" }
    })
  };

  return (
    <section className="w-full bg-white dark:bg-slate-950 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative flex items-center">
        
        {/* LEFT FLOATING NAV ARROW */}
        <button 
          onClick={handlePrev}
          className="absolute -left-2 lg:left-2 p-2.5 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-lg border border-gray-100 dark:border-slate-700 hover:scale-105 transition-all z-30"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* MAIN CAROUSEL FRAME CONTAINER */}
        <div className={`w-full min-h-[380px] md:h-[420px] rounded-[32px] overflow-hidden relative ${PROMO_SLIDES[currentIndex].bgColor} transition-colors duration-500`} >
          
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid grid-cols-1 md:grid-cols-12 h-full w-full"
            >
              
              {/* LEFT COLUMN PANEL: TEXT DATA & CALL TO ACTION */}
              <div className="col-span-1 md:col-span-5 p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-6 z-10 order-2 md:order-1">
                <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#1E293B] dark:text-slate-100 tracking-tight leading-[1.15]">
                  {PROMO_SLIDES[currentIndex].title}
                </h2>
                <p className="text-gray-400 dark:text-slate-400 text-sm sm:text-base font-medium leading-relaxed max-w-sm">
                  {PROMO_SLIDES[currentIndex].description}
                </p>
                <div className="pt-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-3.5 text-xs font-black text-white bg-gradient-to-r from-[#9B77E7] to-[#1600A0] rounded-xl shadow-md uppercase tracking-wider transition-all"
                  >
                    {PROMO_SLIDES[currentIndex].buttonText}
                  </motion.button>
                </div>
              </div>

              {/* RIGHT COLUMN PANEL: FULL FLUID IMAGE CANVAS */}
              <div className="col-span-1 md:col-span-7 h-64 md:h-full relative order-1 md:order-2 overflow-hidden">
                <img
                  src={PROMO_SLIDES[currentIndex].image}
                  alt="Campaign scene context presentation"
                  className="w-full h-full object-cover select-none pointer-events-none"
                />

                {/* PROGRESS TINY INDICATORS BAR (Layered over lower left corner of the image context) */}
                <div className="absolute bottom-6 left-8 flex items-center space-x-2 z-20 bg-black/10 backdrop-blur-sm px-3 py-2 rounded-full">
                  {PROMO_SLIDES.map((slide, index) => (
                    <button
                      key={slide.id}
                      onClick={() => {
                        setDirection(index > currentIndex ? 1 : -1);
                        setCurrentIndex(index);
                      }}
                      className="relative h-1.5 rounded-full bg-white/40 overflow-hidden transition-all"
                      style={{ width: index === currentIndex ? '32px' : '6px' }}
                      aria-label={`Jump directly to index ${index + 1}`}
                    >
                      {index === currentIndex && (
                        <motion.div 
                          className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-[#9B77E7] to-white"
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: CAROUSEL_INTERVAL_SECONDS, ease: "linear" }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

        </div>

        {/* RIGHT FLOATING NAV ARROW */}
        <button 
          onClick={handleNext}
          className="absolute -right-2 lg:right-2 p-2.5 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-lg border border-gray-100 dark:border-slate-700 hover:scale-105 transition-all z-30"
          aria-label="Next slide"
        >
          <ChevronRight className="h-4 w-4" />
        </button>

      </div>
    </section>
  );
}