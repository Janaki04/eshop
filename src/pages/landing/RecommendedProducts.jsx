import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Heart, Share2, Star, Minus, Plus, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PRODUCTS = [
  {
    id: 1,
    category: "AUDIO",
    brand: "Noise",
    name: "Noise Two Wireless Bluetooth Headphones Over-Ear",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    reviews: 150,
    price: 1199.00,
    originalPrice: null,
    discount: null,
  },
  {
    id: 2,
    category: "AUDIO",
    brand: "boAt",
    name: "boAt Stone 350 Portable Wireless Speaker with Punchy Bass",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=400&q=80",
    rating: 4.5,
    reviews: 100,
    price: 59.00,
    originalPrice: 118.00,
    discount: "50%",
  },
  {
    id: 3,
    category: "AUDIO",
    brand: "Boult",
    name: "Boult Audio Drift Smartwatch & Fitness Tracker",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80",
    rating: 4.2,
    reviews: 70,
    price: 79.00,
    originalPrice: null,
    discount: null,
  },
  {
    id: 4,
    category: "AUDIO",
    brand: "Fire-Boltt",
    name: "Fire-Boltt Gladiator Luxury Bluetooth Calling Watch",
    image: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=400&q=80",
    rating: 4.7,
    reviews: 88,
    price: 999.00,
    originalPrice: null,
    discount: null,
  },
  {
    id: 5,
    category: "AUDIO",
    brand: "Mivi",
    name: "Mivi Roam 2 Wireless Ultra-Portable Bluetooth Speaker",
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=400&q=80",
    rating: 4.4,
    reviews: 120,
    price: 2799.00,
    originalPrice: null,
    discount: null,
  }
];

export default function RecommendedProducts({ 
  cart = [], 
  onAddToCart, 
  onUpdateQuantity, 
  onRemoveFromCart, 
  onAddToWishlist 
}) {
  const [hoveredCardId, setHoveredCardId] = useState(null);

  return (
    <section className="w-full bg-[#FAFAFA] dark:bg-slate-950 py-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
            Recommended Products
          </h2>
          <a 
            href="products" 
            className="text-sm font-bold bg-gradient-to-r from-[#9B77E7] to-[#1600A0] bg-clip-text text-transparent hover:opacity-80 transition-opacity flex items-center gap-1"
          >
            View All <span className="text-xs">→</span>
          </a>
        </div>

        <div className="relative">
          
          <button className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-white dark:bg-slate-800 shadow-md border border-gray-100 dark:border-slate-700 text-gray-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors hidden xl:flex">
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {PRODUCTS.map((product) => {
              const isHovered = hoveredCardId === product.id;
              
              // Find item within our global cart instance
              const cartItem = cart.find(item => item.id === product.id);
              const isInCart = !!cartItem;

              return (
                <div
                  key={product.id}
                  className="relative bg-white dark:bg-slate-900 rounded-2xl p-4 transition-all duration-300 flex flex-col justify-between border border-transparent hover:border-gray-100 dark:hover:border-slate-800 hover:shadow-xl dark:hover:shadow-black/40 group"
                  onMouseEnter={() => setHoveredCardId(product.id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                >
                  <div className="flex justify-between items-start h-6 z-10 w-full mb-2">
                    {product.discount ? (
                      <span className="bg-red-50 text-red-500 dark:bg-red-950/40 dark:text-red-400 text-[10px] font-bold px-2 py-0.5 rounded-md">
                        {product.discount} OFF
                      </span>
                    ) : <span />}

                    <div className={`flex flex-col space-y-1.5 transition-opacity duration-200 ${isHovered || isInCart ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                      <button 
                        onClick={() => onAddToWishlist && onAddToWishlist(product)}
                        className="p-1.5 rounded-full bg-white dark:bg-slate-800 shadow-md text-gray-400 hover:text-red-500 transition-colors border border-gray-50 dark:border-slate-700"
                      >
                        <Heart className="h-3.5 w-3.5" />
                      </button>
                      <button className="p-1.5 rounded-full bg-white dark:bg-slate-800 shadow-md text-gray-400 hover:text-[#9B77E7] transition-colors border border-gray-50 dark:border-slate-700">
                        <Share2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="w-full aspect-square flex items-center justify-center mb-4 relative p-2">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain mix-blend-multiply dark:mix-blend-normal transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="relative overflow-hidden h-10 w-full mb-4 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      {isInCart ? (
                        <motion.div
                          key="quantity-control"
                          initial={{ scale: 0.92, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.92, opacity: 0 }}
                          className="w-full h-full flex items-center justify-between rounded-xl border border-purple-200 dark:border-purple-900/50 bg-purple-50/60 dark:bg-purple-950/20 px-2"
                        >
                          <button
                            onClick={() => {
                              if (cartItem.quantity > 1) {
                                onUpdateQuantity?.(product.id, cartItem.quantity - 1);
                              } else {
                                onRemoveFromCart?.(product.id);
                              }
                            }}
                            className="p-1.5 rounded-lg text-[#1600A0] dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors"
                          >
                            <Minus className="h-3.5 w-3.5 stroke-[2.5]" />
                          </button>
                          
                          <span className="text-xs font-black text-slate-800 dark:text-slate-200 tracking-wide">
                            {cartItem.quantity} in Cart
                          </span>

                          <button
                            onClick={() => onUpdateQuantity?.(product.id, cartItem.quantity + 1)}
                            className="p-1.5 rounded-lg text-[#1600A0] dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors"
                          >
                            <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
                          </button>
                        </motion.div>
                      ) : isHovered ? (
                        <motion.button
                          key="add-to-cart-btn"
                          initial={{ y: 15, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -15, opacity: 0 }}
                          onClick={() => onAddToCart?.(product, 1)}
                          className="w-full h-full text-white font-extrabold text-xs tracking-wider uppercase rounded-xl bg-gradient-to-r from-[#9B77E7] to-[#1600A0] shadow-md hover:opacity-95 flex items-center justify-center gap-1.5"
                        >
                          <ShoppingBag className="h-3.5 w-3.5" />
                          Add To Cart
                        </motion.button>
                      ) : (
                        <motion.div 
                          key="product-meta"
                          className="h-full w-full flex flex-col justify-center"
                        >
                          <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">
                            {product.category} • <span className="text-[#9B77E7] dark:text-purple-400">{product.brand}</span>
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="space-y-2">
                    <h3 className={`text-sm font-semibold text-slate-700 dark:text-slate-200 line-clamp-2 min-h-[40px] leading-snug transition-colors ${isHovered ? 'text-[#1600A0] dark:text-purple-400' : ''}`}>
                      {product.name}
                    </h3>

                    <div className="flex items-center space-x-1">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-current" />
                        ))}
                      </div>
                      <span className="text-[11px] text-gray-400 font-medium">
                        ({product.reviews})
                      </span>
                    </div>

                    <div className="flex items-baseline space-x-2 pt-1">
                      <span className="text-base font-black text-slate-800 dark:text-slate-100">
                        ${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-gray-400 line-through font-medium">
                          ${product.originalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </span>
                      )}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          <button className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-[#1600A0] shadow-md text-white hover:opacity-90 transition-opacity hidden xl:flex">
            <ChevronRight className="h-4 w-4" />
          </button>

        </div>
      </div>
    </section>
  );
}