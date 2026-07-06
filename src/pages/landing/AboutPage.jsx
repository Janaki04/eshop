import React from 'react';
import { Target, Users, Award, ShieldCheck, Heart, ArrowRight } from 'lucide-react';

export default function AboutPage() {

  const coreValues = [
    {
      icon: <Target className="text-[#9B77E7]" size={20} />,
      title: "Our Mission",
      desc: "To empower global consumers by providing a seamless, reliable, and premium e-commerce ecosystem that prioritizes accessibility and customer satisfaction above all else."
    },
    {
      icon: <Users className="text-[#9B77E7]" size={20} />,
      title: "The Community First",
      desc: "We build more than just platforms; we support global delivery pipelines and networks that keep small businesses and conscious consumers dynamically synchronized."
    },
    {
      icon: <Award className="text-[#9B77E7]" size={20} />,
      title: "Guaranteed Excellence",
      desc: "From architectural engineering framework design to day-to-day warehouse logistics, our commitment to 100% quality metrics remains absolutely non-negotiable."
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 min-h-screen py-4 md:py-8 font-sans antialiased selection:bg-[#9B77E7]/20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <h1 
          className="text-start text-2xl md:text-3xl font-black mb-2 bg-gradient-to-r from-[#9B77E7] to-[#1600A0] dark:from-[#b496f0] dark:to-[#6366F1]" 
          style={{ 
            WebkitBackgroundClip: 'text', 
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text' 
          }}
        >
          About Us
        </h1>

        <div className="w-full h-[280px] md:h-[380px] rounded-2xl overflow-hidden relative border border-gray-100 dark:border-slate-800 shadow-sm bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center p-6 md:p-12">
          
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          
          <div className="max-w-2xl relative z-10 space-y-4">
            <span className="text-start flex w-fit text-xs font-black uppercase text-[#9B77E7] dark:text-[#b496f0] tracking-widest bg-[#9B77E7]/10 px-3 py-1 rounded-md">
              Who We Are
            </span>
            <h1 className="text-start text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
              We're Redefining the Future of Global E-Commerce.
            </h1>
            <p className="text-start text-sm text-slate-300 leading-relaxed max-w-lg">
              E-Shop Headquarter manages a highly modern, high-speed retail network delivering top-tier tech lifestyle accessories directly to your desktop.
            </p>
          </div>

          <div className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 text-white hidden sm:block w-56">
            <h3 className="font-bold text-xs">Established 2023</h3>
            <p className="text-[11px] text-slate-300 mt-1">Operating out of Anytown, New York USA with next-generation distribution channels.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-4">
          
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-start text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2">Our Story</h2>
              <p className="text-start text-gray-500 dark:text-slate-400 text-sm">Driven by passion, engineered for functional reliability.</p>
            </div>
            
            <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              <p className='text-start'>
                What started as a localized tech distribution framework in New York has quickly expanded into a worldwide operations cluster. We recognized early on that tech consumers don't just require items; they require dynamic data accuracy, authentic product validations, and responsive guarantees.
              </p>
              <p className='text-start'>
                Whether you are accessing our catalog pipeline via grid layouts, inspecting premium acoustic equipment parameters, or interacting with our local branch units, we apply strict performance verification rules to optimize your user experience metrics.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
              {coreValues.map((val, idx) => (
                <div key={idx} className="border border-gray-100 dark:border-slate-800 p-5 rounded-xl shadow-inner space-y-3 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
                  <div className="p-2 bg-gray-50 dark:bg-slate-800 rounded-lg w-fit border border-gray-100 dark:border-slate-700">
                    {val.icon}
                  </div>
                  <h4 className="text-start font-extrabold text-slate-900 dark:text-white text-sm tracking-tight">{val.title}</h4>
                  <p className="text-start text-xs text-gray-500 dark:text-slate-400 leading-relaxed">{val.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50/70 dark:bg-slate-900/40 border border-gray-100/80 dark:border-slate-800/80 p-6 md:p-8 rounded-2xl h-fit space-y-6">
            <div>
              <h3 className="text-start text-lg font-black text-slate-900 dark:text-white tracking-tight mb-2">Corporate Footprint</h3>
              <p className="text-start text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
                Our central operational node handles fulfillment validation sequences globally.
              </p>
            </div>
            
            <div className="space-y-4 text-xs text-slate-700 dark:text-slate-300 font-medium">
              <div className="flex items-center gap-3.5">
                <div className="p-2 bg-white dark:bg-slate-800 rounded-lg border border-gray-100 dark:border-slate-700 text-[#9B77E7] shadow-sm"><ShieldCheck size={14} /></div>
                <span>100% Secure Transaction Vaults</span>
              </div>
              <div className="flex items-center gap-3.5">
                <div className="p-2 bg-white dark:bg-slate-800 rounded-lg border border-gray-100 dark:border-slate-700 text-[#9B77E7] shadow-sm"><Heart size={14} /></div>
                <span>5-Star Rated Customer Support Desk</span>
              </div>
            </div>

            <div className="mt-8 border-t border-gray-200/60 dark:border-slate-800 pt-6">
              <h4 className="text-xs font-black uppercase text-slate-900 dark:text-white tracking-widest mb-4 flex items-center gap-2">
                Operational Scaling
              </h4>
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between border-b border-dashed border-gray-200 dark:border-slate-800 pb-1.5">
                  <span className="text-gray-500 dark:text-slate-400 font-bold">Active Users:</span> 
                  <span className="font-extrabold text-slate-800 dark:text-slate-200">2.4M Globally</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-slate-400 font-bold">Fulfillment Index:</span> 
                  <span className="font-extrabold text-slate-800 dark:text-slate-200">99.87% On-Time</span>
                </div>
              </div>
            </div>

            <button className="w-full mt-2 bg-gradient-to-r from-[#9B77E7] to-[#1600A0] text-white py-2.5 px-4 rounded-lg font-black text-xs tracking-wider uppercase shadow-md shadow-[#9B77E7]/10 hover:opacity-90 transition-all flex items-center justify-center gap-2">
              Contact Headquarters <ArrowRight size={12} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}