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
    <footer className="bg-[#1A1A1A] text-[#A3A3A3] font-sans pt-16 pb-6 px-4 md:px-8 lg:px-16 w-full">
      {/* Top Section: Newsletter Subscription */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        {/* Heading featuring your custom gradient background clipped to text */}
        <h2 className="text-2xl md:text-3xl font-extrabold mb-6 bg-gradient-to-r from-[#9B77E7] to-[#1600A0] bg-clip-text text-transparent inline-block">
          Subscribe to get our updates
        </h2>
        
        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address ..."
            required
            className="w-full sm:flex-1 px-5 py-3.5 bg-[#2B2B2B] text-white rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#9B77E7] placeholder-gray-500 text-sm transition-all"
          />
          {/* Action button utilizing your gradient styling */}
          <button
            type="submit"
            className="w-full sm:w-auto bg-gradient-to-r from-[#9B77E7] to-[#1600A0] hover:opacity-90 active:scale-95 text-white font-semibold px-8 py-3.5 rounded-md transition-all text-sm whitespace-nowrap shadow-lg shadow-[#1600A0]/20"
          >
            Subscribe
          </button>
        </form>
        
        {subscribed && (
          <p className="text-purple-400 text-sm mt-3 animate-fade-in">
            Thank you for subscribing! Stay tuned for updates.
          </p>
        )}
      </div>

      {/* Middle Section: Links Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 xl:gap-12 pb-12 border-b border-gray-800">
        
        {/* Column 1: Contact Us & Brand */}
        <div className="space-y-6">
          <h3 className="text-white font-bold text-base">Contact Us</h3>
          <ul className="space-y-3.5 text-xs md:text-sm">
            <li className="flex items-center gap-2.5">
              <Phone size={14} className="text-[#A3A3A3] shrink-0" />
              <a href="tel:+15551234567" className="hover:text-white transition-colors">+1 (555) 123-4567</a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={14} className="text-[#A3A3A3] shrink-0" />
              <a href="mailto:information@eshop.com" className="hover:text-white transition-colors">information@eshop.com</a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin size={14} className="text-[#A3A3A3] shrink-0 mt-0.5" />
              <span>123 Main Street, Suite 105, Anytown USA</span>
            </li>
          </ul>
          <div className="pt-4">
            <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-[#9B77E7] to-[#1600A0] bg-clip-text text-transparent">
              e-shop.
            </span>
          </div>
        </div>

        {/* Column 2: Categories */}
        <div className="space-y-4">
          <h3 className="text-white font-bold text-base">Categories</h3>
          <ul className="space-y-2.5 text-xs md:text-sm">
            {['Computers & Tablets', 'Mobile Phones & Accessories', 'TV & Home Theater', 'Audio & Headphones', 'Cameras & Camcorders', 'Gaming Equipment', 'Home Appliances'].map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase().replace(/[^a-z0-9]/g, '-')}`} className="hover:text-white transition-colors">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Supports */}
        <div className="space-y-4">
          <h3 className="text-white font-bold text-base">Supports</h3>
          <ul className="space-y-2.5 text-xs md:text-sm">
            {['About Us', 'Privacy Policy', 'Return Policy', 'Help Centre', 'Store Locations', 'Careers'].map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase().replace(/[^a-z0-9]/g, '-')}`} className="hover:text-white transition-colors">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Links */}
        <div className="space-y-4">
          <h3 className="text-white font-bold text-base">Links</h3>
          <ul className="space-y-2.5 text-xs md:text-sm">
            {['Products List', 'Order Tracking', 'Products Guide', 'Shopping Cart', 'Tech Blog'].map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase().replace(/[^a-z0-9]/g, '-')}`} className="hover:text-white transition-colors">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 5: Payments & Socials */}
        <div className="space-y-6">
          <div className="space-y-3">
            <h3 className="text-white font-bold text-base">Payments</h3>
            <div className="flex flex-wrap gap-2">
              <span className="bg-[#2B2B2B] text-white border border-gray-700 font-bold text-[10px] px-2.5 py-1 rounded italic tracking-wider">VISA</span>
              <span className="bg-[#2B2B2B] border border-gray-700 font-bold text-[10px] px-2.5 py-1 rounded flex items-center gap-0.5">
                <span className="inline-block w-2 h-2 rounded-full bg-red-500"></span>
                <span className="inline-block w-2 h-2 rounded-full bg-amber-400 -ml-1.5 opacity-80"></span>
              </span>
              <span className="bg-[#2B2B2B] text-white border border-gray-700 font-semibold text-[10px] px-2.5 py-1 rounded flex items-center gap-0.5"> Pay</span>
              <span className="bg-[#2B2B2B] text-blue-400 border border-gray-700 font-bold text-[10px] px-2.5 py-1 rounded italic">PayPal</span>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-white font-bold text-base">Follow Us</h3>
            <ul className="space-y-2.5 text-xs md:text-sm">
              {['Twitter', 'Instagram', 'Facebook'].map((platform) => (
                <li key={platform}>
                  <a href={`#${platform.toLowerCase()}`} className="hover:text-white transition-colors">{platform}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>

      {/* Bottom Section: Copyright & Legal */}
      <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <p>© Copyright 2026 E-Shop. All Rights Reserved.</p>
        <div className="flex items-center gap-4">
          <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
          <span className="text-gray-700">|</span>
          <a href="#terms" className="hover:text-white transition-colors">Terms & Condition</a>
          <span className="text-gray-700">|</span>
          <a href="#sitemap" className="hover:text-white transition-colors">Sitemap</a>
        </div>
      </div>
    </footer>
  );
}