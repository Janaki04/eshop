import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import RecommendedProducts from './RecommendedProducts';
import PromoGrid from './PromoGrid';
import TechTalk from './TechTalk';
import Faq from './Faq';

// Mock slides dataset matching the vibe of Screenshot 2026-07-02 at 11.01.43 AM.jpg
const SLIDES = [
  {
    id: 1,
    title: "Elevate Your Tech Gadget Game",
    description: "Shop the latest technology available here in e-shop. Sale & discount offers everyday.",
    buttonText: "Shop Now",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80", // Premium Phone Array
  },
  {
    id: 2,
    title: "Next-Gen Wireless Audio Experience",
    description: "Immerse yourself in pure acoustics. Active noise cancellation with up to 40 hours of playback.",
    buttonText: "Shop Now",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80", // Premium Headphones
  },
  {
    id: 3,
    title: "Redefine Your Daily Workflow",
    description: "Ultra-slim design meets raw processing performance. Empower your creativity anywhere.",
    buttonText: "Shop Now",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80", // Premium Laptop
  }
];

const AUTO_PLAY_SECONDS = 3;

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  // Handle automatic cycling based on user preference seconds configuration
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, AUTO_PLAY_SECONDS * 1000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? SLIDES.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex === SLIDES.length - 1 ? 0 : prevIndex + 1));
  };

  // Animation variants for fluid slide transitions
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeInOut" }
    },
    exit: (dir) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
      transition: { duration: 0.4, ease: "easeInOut" }
    })
  };

  return (
    <>
      {/* 1. Added dark:bg-slate-950 to flip background dynamically */}
      <div className="relative w-full bg-[#F8F9FA] dark:bg-slate-950 overflow-hidden min-h-[500px] md:h-[600px] flex items-center transition-colors duration-300">
        
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 w-full py-16 md:py-0 relative">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:gap-6"
            >
              
              {/* LEFT COLUMN: TEXT CONTENT & GRADIENT BUTTON */}
              <div className="space-y-6 max-w-xl text-center md:text-left z-10 order-2 md:order-1">
                {/* 2. Added dark:text-slate-100 to text heading */}
                <h1 className="text-4xl sm:text-5xl font-black text-slate-800 dark:text-slate-100 tracking-tight leading-tight">
                  {SLIDES[currentIndex].title}
                </h1>
                {/* 3. Added dark:text-slate-400 to subtitle body text */}
                <p className="text-gray-500 dark:text-slate-400 text-base sm:text-lg leading-relaxed font-medium">
                  {SLIDES[currentIndex].description}
                </p>
                <div className="pt-2">
                  <motion.button
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-3.5 text-sm font-extrabold text-white bg-gradient-to-r from-[#9B77E7] to-[#1600A0] rounded-xl shadow-lg hover:shadow-purple-200 dark:hover:shadow-none transition-all duration-200"
                  >
                    {SLIDES[currentIndex].buttonText}
                  </motion.button>
                </div>
              </div>

              {/* RIGHT COLUMN: PRODUCT SHOWCASE IMAGERY */}
              <div className="flex justify-center items-center order-1 md:order-2">
                <div className="relative w-full max-w-[320px] sm:max-w-[400px] md:max-w-full aspect-[4/3] flex justify-center items-center">
                  {/* 4. Added mix-blend-multiply & dark:mix-blend-normal to support bright transparent product backgrounds */}
                  <motion.img
                    initial={{ scale: 0.92, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.35 }}
                    src={SLIDES[currentIndex].image}
                    alt={SLIDES[currentIndex].title}
                    className="w-full h-full object-contain drop-shadow-2xl select-none pointer-events-none mix-blend-multiply dark:mix-blend-normal"
                  />
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

        {/* BOTTOM DOT INDICATORS WITH TICKING TIMER VISUAL */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-3 z-30">
          {SLIDES.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className="group relative focus:outline-none"
              aria-label={`Go to slide ${index + 1}`}
            >
              {/* 5. Added dark:bg-slate-700 and dark:hover:bg-slate-600 to unselected dot indicators */}
              <div className={`h-2.5 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'w-8 bg-[#9B77E7]' : 'w-2.5 bg-gray-300 dark:bg-slate-700 hover:bg-gray-400 dark:hover:bg-slate-600'
              }`} />
            </button>
          ))}
        </div>

      </div>
      <RecommendedProducts/>
      <TechTalk/>
      <Faq/>
      <PromoGrid/>
    </>
  );
}