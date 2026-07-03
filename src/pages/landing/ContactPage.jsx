import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Plus, Minus } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: 'Amelia Robert Watson', phone: '+123 456 7890', email: 'amelia.watson@eshop.com', message: '' });
  const [zoom, setZoom] = useState(13);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you ${formData.name}, your message has been sent successfully!`);
  };

  return (
    <div className="bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 min-h-screen py-4 md:py-8 font-sans antialiased selection:bg-[#9B77E7]/20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* --- MAIN PAGE HEADING WITH GRADIENT --- */}
        <div>
       <h1 className="text-start text-3xl md:text-4xl font-black tracking-tight bg-gradient-to-r from-[#9B77E7] via-[#6366F1] to-[#1600A0] bg-clip-text text-transparent">
  Contact Us
</h1>
        </div>

        {/* --- MAP CANVAS LAYER --- */}
        <div className="w-full h-[320px] md:h-[420px] rounded-2xl overflow-hidden relative border border-gray-100 dark:border-slate-800 shadow-sm group">
          <iframe
            title="E-Shop Headquarters Location Map"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=-74.0150%2C40.7050%2C-73.9750%2C40.7350&layer=mapnik&marker=40.7128%2C-73.9950`}
            className="w-full h-full border-none grayscale-[15%] dark:grayscale-[40%] contrast-[105%] dark:invert-[90%] dark:hue-rotate-180 pointer-events-auto"
            allowFullScreen
            loading="lazy"
          ></iframe>

          {/* Floating Address Overlay Card */}
          <div className="absolute top-4 left-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm p-4 rounded-xl shadow-xl w-64 border border-gray-100 dark:border-slate-800 transition-transform duration-200 hover:scale-[1.01]">
            <div className="flex gap-3">
              <div className="flex-1">
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white tracking-tight">E-Shop Headquarter</h3>
                <p className="text-xs text-gray-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                  123 Main Street, Anytown<br />New York, USA
                </p>
                <a 
                  href="https://www.openstreetmap.org/?mlat=40.7128&mlon=-73.9950#map=15/40.7128/-73.9950" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-[11px] text-[#9B77E7] dark:text-[#b496f0] font-bold mt-3 inline-block hover:underline"
                >
                  View on Google Maps
                </a>
              </div>
              
              <div className="w-16 h-16 rounded-lg bg-sky-100 dark:bg-slate-800 bg-gradient-to-tr from-sky-400 to-blue-300 dark:from-indigo-900 dark:to-slate-800 shadow-inner shrink-0 relative overflow-hidden hidden sm:block">
                <div className="absolute bottom-1 right-1 bg-white/80 dark:bg-slate-950/80 text-[8px] font-black px-1 rounded scale-75 dark:text-slate-300">HQ</div>
              </div>
            </div>
          </div>

          {/* Map Controls */}
          <div className="absolute bottom-6 right-4 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-gray-100 dark:border-slate-800 flex flex-col overflow-hidden">
            <button onClick={() => setZoom(z => Math.min(18, z + 1))} className="p-2.5 hover:bg-gray-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 border-b border-gray-100 dark:border-slate-800 transition-colors">
              <Plus size={16} strokeWidth={2.5} />
            </button>
            <button onClick={() => setZoom(z => Math.max(10, z - 1))} className="p-2.5 hover:bg-gray-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors">
              <Minus size={16} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* --- COLUMN CONTENT SPLIT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-4">
          
          {/* Interactive Form Panel */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-1">Send us a Message</h2>
              <p className="text-gray-500 dark:text-slate-400 text-sm">Have any questions for us? Don't hesitate to contact us.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Name <span className="text-red-500 font-black">*</span>
                </label>
                <input 
                  type="text"
                  required 
                  value={formData.name}
                  className="w-full p-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg text-sm text-slate-800 dark:text-slate-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9B77E7]/20 focus:border-[#9B77E7] transition-all" 
                  placeholder="Amelia Robert Watson" 
                  onChange={(e) => setFormData({...formData, name: e.target.value})} 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Phone Number</label>
                  <input 
                    type="tel"
                    value={formData.phone}
                    className="w-full p-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg text-sm text-slate-800 dark:text-slate-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9B77E7]/20 focus:border-[#9B77E7] transition-all" 
                    placeholder="+123 456 7890" 
                    onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    Email Address <span className="text-red-500 font-black">*</span>
                  </label>
                  <input 
                    type="email"
                    required 
                    value={formData.email}
                    className="w-full p-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg text-sm text-slate-800 dark:text-slate-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9B77E7]/20 focus:border-[#9B77E7] transition-all" 
                    placeholder="amelia.watson@eshop.com" 
                    onChange={(e) => setFormData({...formData, email: e.target.value})} 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Message <span className="text-red-500 font-black">*</span>
                </label>
                <textarea 
                  required 
                  value={formData.message}
                  className="w-full p-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg text-sm text-slate-800 dark:text-slate-100 placeholder-gray-400 h-36 resize-none focus:outline-none focus:ring-2 focus:ring-[#9B77E7]/20 focus:border-[#9B77E7] transition-all" 
                  placeholder="Enter your message ..." 
                  onChange={(e) => setFormData({...formData, message: e.target.value})} 
                />
              </div>

              <button 
                type="submit" 
                className="bg-gradient-to-r from-[#9B77E7] to-[#1600A0] text-white py-3 px-10 rounded-lg font-black text-sm shadow-md shadow-[#9B77E7]/20 hover:opacity-90 active:scale-[0.99] transition-all duration-150"
              >
                Submit
              </button>
            </form>
          </div>

          {/* Sidebar Parameter Sidebar Info */}
          <div className="bg-gray-50/70 dark:bg-slate-900/40 border border-gray-100/80 dark:border-slate-800/80 p-6 md:p-8 rounded-2xl h-fit space-y-6">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight mb-2">Let's Keep in Touch!</h3>
              <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
                We would love to hear from you. Contact us for any inquiries you might have for us.
              </p>
            </div>
            
            <div className="space-y-4 text-xs text-slate-700 dark:text-slate-300 font-medium">
              <div className="flex items-center gap-3.5">
                <div className="p-2 bg-white dark:bg-slate-800 rounded-lg border border-gray-100 dark:border-slate-700 text-[#9B77E7] shadow-sm"><Phone size={14} /></div>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3.5">
                <div className="p-2 bg-white dark:bg-slate-800 rounded-lg border border-gray-100 dark:border-slate-700 text-[#9B77E7] shadow-sm"><Mail size={14} /></div>
                <span className="underline cursor-pointer hover:text-[#9B77E7] transition-colors">information@eshop.com</span>
              </div>
              <div className="flex items-start gap-3.5">
                <div className="p-2 bg-white dark:bg-slate-800 rounded-lg border border-gray-100 dark:border-slate-700 text-[#9B77E7] shadow-sm shrink-0"><MapPin size={14} /></div>
                <span className="leading-relaxed mt-0.5">123 Main Street, Suite 105, Anytown USA</span>
              </div>
            </div>

            {/* Business hours listing panel */}
            <div className="mt-8 border-t border-gray-200/60 dark:border-slate-800 pt-6">
              <h4 className="text-xs font-black uppercase text-slate-900 dark:text-white tracking-widest mb-4 flex items-center gap-2">
                <Clock size={14} className="text-[#9B77E7]" /> Opening Hours
              </h4>
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between border-b border-dashed border-gray-200 dark:border-slate-800 pb-1.5">
                  <span className="text-gray-500 dark:text-slate-400 font-bold">MON to FRI:</span> 
                  <span className="font-extrabold text-slate-800 dark:text-slate-200">08:00 AM - 04:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-slate-400 font-bold">SAT to SUN:</span> 
                  <span className="font-extrabold text-slate-800 dark:text-slate-200">09:00 AM - 03:00 PM</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}