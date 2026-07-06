import React, { useState } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() !== '') {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-[#F8F9FA] dark:bg-slate-950 text-[#737373] dark:text-[#A3A3A3] font-sans pt-16 pb-6 px-4 md:px-8 lg:px-16 w-full transition-colors duration-300">
      
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 
          className="inline-block text-center text-2xl md:text-3xl font-extrabold mb-6 bg-gradient-to-r from-[#9B77E7] to-[#1600A0] dark:from-[#b496f0] dark:to-[#6366F1]"
          style={{ 
            WebkitBackgroundClip: 'text', 
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text' 
          }}
        >
          Subscribe to get our updates
        </h2>
        
        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address ..."
            required
            className="w-full sm:flex-1 px-5 py-3.5 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-md border border-gray-300 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#9B77E7] placeholder-gray-400 dark:placeholder-gray-500 text-sm transition-all"
          />
          <button
            type="submit"
            className="w-full sm:w-auto bg-gradient-to-r from-[#9B77E7] to-[#1600A0] hover:opacity-90 active:scale-95 text-white font-semibold px-8 py-3.5 rounded-md transition-all text-sm whitespace-nowrap shadow-lg shadow-[#1600A0]/20 dark:shadow-indigo-500/10"
          >
            Subscribe
          </button>
        </form>
        
        {subscribed && (
          <p className="text-emerald-600 dark:text-purple-400 text-sm mt-3 animate-pulse">
            Thank you for subscribing! Stay tuned for updates.
          </p>
        )}
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 xl:gap-12 pb-12 border-b border-gray-200 dark:border-slate-800">
        
        <div className="space-y-6">
          <h3 className="text-slate-900 dark:text-white font-bold text-base">Contact Us</h3>
          <ul className="space-y-3.5 text-xs md:text-sm">
            <li className="flex items-center gap-2.5">
              <Phone size={14} className="text-[#737373] dark:text-[#A3A3A3] shrink-0" />
              <a href="tel:+15551234567" className="hover:text-slate-900 dark:hover:text-white transition-colors">+1 (555) 123-4567</a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={14} className="text-[#737373] dark:text-[#A3A3A3] shrink-0" />
              <a href="mailto:information@eshop.com" className="hover:text-slate-900 dark:hover:text-white transition-colors">information@eshop.com</a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin size={14} className="text-[#737373] dark:text-[#A3A3A3] shrink-0 mt-0.5" />
              <span>123 Main Street, Suite 105, Anytown USA</span>
            </li>
          </ul>
          <div className="pt-4">
            <span 
              className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-[#9B77E7] to-[#1600A0] dark:from-[#b496f0] dark:to-[#6366F1]"
              style={{ 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text' 
              }}
            >
              e-shop.
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-slate-900 dark:text-white font-bold text-base">Categories</h3>
          <ul className="space-y-2.5 text-xs md:text-sm">
            {['Computers & Tablets', 'Mobile Phones & Accessories', 'TV & Home Theater', 'Audio & Headphones', 'Cameras & Camcorders', 'Gaming Equipment', 'Home Appliances'].map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase().replace(/[^a-z0-9]/g, '-')}`} className="hover:text-slate-900 dark:hover:text-white transition-colors">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-slate-900 dark:text-white font-bold text-base">Supports</h3>
          <ul className="space-y-2.5 text-xs md:text-sm">
            {['About Us', 'Privacy Policy', 'Return Policy', 'Help Centre', 'Store Locations', 'Careers'].map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase().replace(/[^a-z0-9]/g, '-')}`} className="hover:text-slate-900 dark:hover:text-white transition-colors">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-slate-900 dark:text-white font-bold text-base">Links</h3>
          <ul className="space-y-2.5 text-xs md:text-sm">
            {['Products List', 'Order Tracking', 'Products Guide', 'Shopping Cart', 'Tech Blog'].map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase().replace(/[^a-z0-9]/g, '-')}`} className="hover:text-slate-900 dark:hover:text-white transition-colors">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <h3 className="text-slate-900 dark:text-white font-bold text-base">Payments</h3>
            <div className="flex flex-wrap gap-2">
              <span className="bg-white dark:bg-[#2B2B2B] text-slate-800 dark:text-white border border-gray-200 dark:border-gray-700 font-bold text-[10px] px-2.5 py-1 rounded italic tracking-wider shadow-sm">VISA</span>
              <span className="bg-white dark:bg-[#2B2B2B] border border-gray-200 dark:border-gray-700 font-bold text-[10px] px-2.5 py-1 rounded flex items-center gap-0.5 shadow-sm">
                <span className="inline-block w-2 h-2 rounded-full bg-red-500"></span>
                <span className="inline-block w-2 h-2 rounded-full bg-amber-400 -ml-1.5 opacity-80"></span>
              </span>
              <span className="bg-white dark:bg-[#2B2B2B] text-slate-900 dark:text-white border border-gray-200 dark:border-gray-700 font-semibold text-[10px] px-2.5 py-1 rounded flex items-center gap-0.5 shadow-sm"> Pay</span>
              <span className="bg-white dark:bg-[#2B2B2B] text-blue-600 dark:text-blue-400 border border-gray-200 dark:border-gray-700 font-bold text-[10px] px-2.5 py-1 rounded italic shadow-sm">PayPal</span>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-slate-900 dark:text-white font-bold text-base">Follow Us</h3>
            <ul className="space-y-2.5 text-xs md:text-sm">
              {['Twitter', 'Instagram', 'Facebook'].map((platform) => (
                <li key={platform}>
                  <a href={`#${platform.toLowerCase()}`} className="hover:text-slate-900 dark:hover:text-white transition-colors">{platform}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <p>© Copyright 2026 E-Shop. All Rights Reserved.</p>
        <div className="flex items-center gap-4">
          <a href="#privacy" className="hover:text-slate-900 dark:hover:text-white transition-colors">Privacy Policy</a>
          <span className="text-gray-300 dark:text-slate-800">|</span>
          <a href="#terms" className="hover:text-slate-900 dark:hover:text-white transition-colors">Terms & Condition</a>
          <span className="text-gray-300 dark:text-slate-800">|</span>
          <a href="#sitemap" className="hover:text-slate-900 dark:hover:text-white transition-colors">Sitemap</a>
        </div>
      </div>
    </footer>
  );
}