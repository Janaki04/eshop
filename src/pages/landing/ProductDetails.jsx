import React, { useState, useMemo } from 'react';
import { X, Maximize2, Star, Truck, ShieldCheck, RefreshCw, Minus, Plus, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProductDetails({ product, onClose, onAddToCart, onAddToWishlist, relatedProducts, onSelectProduct }) {
  const [selectedVariant, setSelectedVariant] = useState('Space Gray');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('Specification');

  const dynamicSpecs = useMemo(() => {
    if (!product) return { left: [], right: [] };
    return {
      left: [
        { label: 'Brand', value: `${product.category} Premium Tech` },
        { label: 'Display / Profile', value: `High grade custom engineered framework optimizing premium ${product.name}.` },
        { label: 'Performance Tier', value: 'High performance structural materials ensuring optimal efficiency metrics.' },
        { label: 'Operational Metrics', value: 'Optimized internal cooling arrays with balanced dynamic latency values.' }
      ],
      right: [
        { label: 'Audio / Output', value: 'Stereo output channels supporting crystal clear premium resolution acoustics.' },
        { label: 'Connectivity', value: 'Next-gen seamless synchronization algorithms with high speed data pipeline arrays.' },
        { label: 'Form Factor', value: 'Ergonomic layout configuration built with structural materials built to last.' },
        { label: 'Dimensions', value: 'Compact modern hardware outline structure custom built for flexible desktop profiles.' }
      ]
    };
  }, [product]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0 }} 
      className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 p-6 shadow-xl transition-colors duration-300"
    >
      <div className="flex justify-between items-center border-b border-gray-100 dark:border-slate-800 pb-4 mb-6">
        <div className="text-xs text-gray-400 dark:text-slate-500 space-x-1">
          <span>Home</span><span>/</span><span>Category Listing</span><span>/</span><span>{product.category}</span><span>/</span>
          <span className="text-slate-700 dark:text-slate-300 font-medium truncate max-w-[200px] inline-block align-bottom">
            {product.name}
          </span>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500 dark:text-slate-400 rounded-full transition-colors">
          <X size={18} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <div className="relative border border-gray-100 dark:border-slate-800 bg-gray-50 dark:bg-slate-800/30 rounded-xl p-8 flex items-center justify-center h-80 text-9xl select-none">
            {product.image}
            <button className="absolute top-4 right-4 p-2 bg-white dark:bg-slate-800 rounded-full shadow text-gray-400 hover:text-slate-700 dark:hover:text-white transition-colors">
              <Maximize2 size={16} />
            </button>
          </div>
          
          <div className="flex gap-3 mt-4">
            {[1, 2, 3].map((thumb) => (
              <div key={thumb} className={`w-16 h-16 border rounded-lg flex items-center justify-center bg-gray-50 dark:bg-slate-800/40 text-2xl cursor-pointer transition-all ${thumb === 1 ? 'border-[#9B77E7] ring-1 ring-[#9B77E7]' : 'border-gray-100 dark:border-slate-800'}`}>
                {product.image}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-2 mt-8 border-t border-gray-100 dark:border-slate-800 pt-6 text-center text-[11px] text-gray-500 dark:text-slate-400">
            <div className="flex flex-col items-center"><Truck size={18} className="text-[#9B77E7] mb-1" /><span className="font-bold dark:text-slate-300">Free Shipping</span><span>Worldwide available</span></div>
            <div className="flex flex-col items-center"><ShieldCheck size={18} className="text-[#9B77E7] mb-1" /><span className="font-bold dark:text-slate-300">100% Guaranteed</span><span>Receive product first</span></div>
            <div className="flex flex-col items-center"><RefreshCw size={18} className="text-[#9B77E7] mb-1" /><span className="font-bold dark:text-slate-300">Return Available</span><span>See return policy</span></div>
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1 text-amber-400 text-xs mb-2">
              {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-current" />)}
              <span className="text-gray-400 dark:text-slate-500 font-bold ml-1">({product.reviews} customer ratings)</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-slate-800 dark:text-white leading-tight mb-4">{product.name}</h2>
            
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-black text-[#9B77E7] dark:text-red-400">${product.price.toLocaleString()}</span>
              <span className="text-sm font-semibold text-gray-400 line-through">
                ${product.oldPrice ? product.oldPrice.toLocaleString() : (product.price * 1.5).toFixed(2)}
              </span>
            </div>

            <div className="space-y-2.5 border-t border-gray-100 dark:border-slate-800/80 pt-4 text-xs mb-6">
              <div className="grid grid-cols-3"><span className="text-gray-400 font-bold">Category Tier</span><span className="col-span-2 text-slate-700 dark:text-slate-300">{product.category} Division</span></div>
              <div className="grid grid-cols-3"><span className="text-gray-400 font-bold">Availability Status</span><span className="col-span-2 text-green-500 font-bold">In Stock & Ready</span></div>
              <div className="grid grid-cols-3"><span className="text-gray-400 font-bold">Global Delivery</span><span className="col-span-2 text-slate-700 dark:text-slate-300">Worldwide Shipping Protocol</span></div>
            </div>

            <div className="mb-6">
              <span className="text-xs font-bold text-gray-400 block mb-2">Available Variants</span>
              <div className="flex flex-wrap gap-2">
                {['Standard Release', 'Elite Gray Edition', 'Jet Black Pro', 'Cinnamon Custom'].map((v) => (
                  <button key={v} onClick={() => setSelectedVariant(v)} className={`px-4 py-1.5 rounded-lg border text-xs font-bold transition-all ${selectedVariant === v ? 'border-[#9B77E7] bg-[#9B77E7]/5 text-[#9B77E7] dark:text-red-400 dark:border-red-400' : 'border-gray-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800'}`}>
                    {v}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 border-t border-gray-100 dark:border-slate-800 pt-6">
            <div className="flex items-center border border-gray-200 dark:border-slate-700 rounded-lg bg-gray-50 dark:bg-slate-800/60 p-1">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-1.5 hover:bg-gray-200 dark:hover:bg-slate-700 rounded text-gray-500"><Minus size={14} /></button>
              <span className="px-4 text-sm font-black text-slate-800 dark:text-white">{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)} className="p-1.5 hover:bg-gray-200 dark:hover:bg-slate-700 rounded text-gray-500"><Plus size={14} /></button>
            </div>

            <button onClick={() => onAddToCart(product.name)} className="flex-1 bg-gradient-to-r from-[#9B77E7] to-[#1600A0] dark:bg-red-500 text-white font-bold py-2.5 px-6 rounded-lg shadow-md hover:opacity-95 transition-opacity text-sm">
              Buy Now
            </button>
            
            <button onClick={() => onAddToWishlist(product.name)} className="p-2.5 border border-gray-200 dark:border-slate-700 rounded-lg text-gray-400 hover:text-red-500 transition-colors">
              <Heart size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12 border-b border-gray-100 dark:border-slate-800 flex gap-6 text-sm font-bold text-gray-400">
        {['Description', 'Specification', 'Return', 'Reviews'].map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`pb-3 relative transition-colors ${activeTab === tab ? 'text-slate-800 dark:text-white border-b-2 border-[#9B77E7]' : 'hover:text-slate-600'}`}>
            {tab}
          </button>
        ))}
      </div>

      <div className="py-6 text-xs text-slate-600 dark:text-slate-300 leading-relaxed grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
        {activeTab === 'Specification' && (
          <>
            <div className="space-y-4">
              {dynamicSpecs.left.map((s, idx) => (
                <div key={idx} className="grid grid-cols-3 border-b border-gray-50 dark:border-slate-800/40 pb-2"><span className="font-bold text-slate-400">{s.label}</span><span className="col-span-2">{s.value}</span></div>
              ))}
            </div>
            <div className="space-y-4">
              {dynamicSpecs.right.map((s, idx) => (
                <div key={idx} className="grid grid-cols-3 border-b border-gray-50 dark:border-slate-800/40 pb-2"><span className="font-bold text-slate-400">{s.label}</span><span className="col-span-2">{s.value}</span></div>
              ))}
            </div>
          </>
        )}
        {activeTab !== 'Specification' && <div className="col-span-2 py-6 text-center text-gray-400 italic">Extended specifications log sheets are under asset compilation.</div>}
      </div>

      <div className="mt-12 pt-8 border-t border-gray-100 dark:border-slate-800">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-md font-black text-slate-800 dark:text-white">Related Products Strip</h3>
          <button onClick={onClose} className="text-xs font-bold text-[#9B77E7] hover:underline">View All →</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
          {relatedProducts.slice(0, 5).map((p) => (
            <div 
              key={p.id} 
              onClick={() => onSelectProduct(p)} 
              className="bg-gray-50 dark:bg-slate-800/30 border border-gray-100 dark:border-slate-800 rounded-xl p-3 text-center cursor-pointer hover:border-slate-400 dark:hover:border-slate-600 transition-all"
            >
              <div className="text-3xl mb-2">{p.image}</div>
              <h4 className="text-[11px] font-bold text-slate-700 dark:text-slate-300 truncate">{p.name}</h4>
              <p className="text-xs font-black text-[#9B77E7] mt-1">${p.price}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}