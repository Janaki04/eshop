import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const POSTS = [
  {
    id: 1,
    title: "Our Choices for Top 10 Tech Gadgets in 2026",
    description: "Discover the most innovative and cutting-edge tech gadgets that will dominate the market in 2026. Specially curated by our tech gadget experts in e-shop.",
    tag: "Gadgets",
    author: "Damian Growth",
    date: "10 April 2026",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 2,
    title: "High Quality vs Price: Why You Should Upgrade to A Smart TV?",
    description: "Are you still on the fence about ultra-thin display tech? Our deep-dive review breaks down refresh rates, panel dynamic arrays, and whether upgrading makes smart economic sense.",
    tag: "Review",
    author: "Elena Stone",
    date: "16 April 2026",
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 3,
    title: "How to Choose the Right Laptop for Your Needs: Our Expert Says",
    description: "A comprehensive analysis comparing modern mobile silicon processing cores, optimal unified memory thresholds, and high-efficiency screens tailored perfectly to custom design tracks.",
    tag: "Tips",
    author: "Marcus Vance",
    date: "12 April 2026",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 4,
    title: "The Future of Smart Home Technology: A Look Into Our Future",
    description: "Automated standard routines, central neural ecosystem adjustments, and low-latency interconnected appliances that fundamentally elevate intuitive home workflows.",
    tag: "Trends",
    author: "Sarah Jenks",
    date: "2 April 2026",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1000&q=80",
  }
];

export default function TechTalk() {
  const [activeId, setActiveId] = useState(1);
  const featuredPost = POSTS.find(post => post.id === activeId) || POSTS[0];

  return (
    <section className="w-full bg-white dark:bg-slate-950 py-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- HEADER TITLE BAR --- */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="space-y-2">
            <h2 className="text-start text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
              About us
            </h2>
            <p className="text-gray-400 dark:text-slate-400 text-sm font-medium">
              Stay up to date with the latest trends, reviews, and insights from our experts.
            </p>
          </div>
          <a 
            href="#view-all-blogs" 
            className="text-sm font-bold bg-gradient-to-r from-[#9B77E7] to-[#1600A0] bg-clip-text text-transparent hover:opacity-80 transition-opacity whitespace-nowrap self-start sm:self-auto"
          >
            View All <span className="text-xs">→</span>
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="w-full aspect-[16/9] rounded-3xl overflow-hidden bg-gray-100 dark:bg-slate-900 relative shadow-sm group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={featuredPost.id}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                />
              </AnimatePresence>
            </div>

            <div className="space-y-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={featuredPost.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-3"
                >
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight leading-tight">
                    {featuredPost.title}
                  </h3>
                  <p className="text-gray-400 dark:text-slate-400 text-sm sm:text-base font-medium leading-relaxed">
                    {featuredPost.description}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center space-x-3 pt-2 text-xs font-bold text-gray-400 dark:text-slate-500">
                <span className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#9B77E7] to-[#1600A0] text-white tracking-wide uppercase text-[10px]">
                  {featuredPost.tag}
                </span>
                <span>{featuredPost.author}</span>
                <span>|</span>
                <span>{featuredPost.date}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 divide-y divide-gray-100 dark:divide-slate-800/80">
            {POSTS.map((post) => {
              const isActive = post.id === activeId;
              
              return (
                <div
                  key={post.id}
                  onClick={() => setActiveId(post.id)}
                  className={`group py-5 first:pt-0 last:pb-0 flex flex-col space-y-2 cursor-pointer transition-all ${
                    isActive ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <div>
                    <span className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider ${
                      isActive 
                        ? 'bg-gradient-to-r from-[#9B77E7] to-[#1600A0] text-white shadow-sm'
                        : 'bg-gray-100 dark:bg-slate-900 text-gray-500 dark:text-slate-400 group-hover:bg-purple-50 dark:group-hover:bg-purple-950/20 group-hover:text-[#9B77E7]'
                    } transition-colors`}>
                      {post.tag}
                    </span>
                  </div>

                  <h4 className={`text-base font-extrabold tracking-tight leading-snug transition-colors duration-200 ${
                    isActive 
                      ? 'text-[#1600A0] dark:text-purple-400 font-black' 
                      : 'text-slate-800 dark:text-slate-200 group-hover:text-[#1600A0] dark:group-hover:text-purple-400'
                  }`}>
                    {post.title}
                  </h4>

                  <span className="text-[11px] text-gray-400 dark:text-slate-500 font-semibold tracking-wide">
                    {post.date}
                  </span>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}