import React, { useState, useMemo } from 'react';
import { LayoutGrid, List, ChevronDown, Star, Heart, ShoppingCart, Eye, Trash2, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ProductDetails from './ProductDetails';
import { useGlobalLoading } from '../../components/LoadingContext';

const MOCK_PRODUCTS = [
  { id: 1, name: 'QuietComfort 45 Wireless Headphone', category: 'Audio', price: 329.99, rating: 4.8, reviews: 120, image: '🎧', discount: 0 },
  { id: 2, name: 'Orange Watch 12 High Quality Health Sensor', category: 'Phone', price: 959.99, oldPrice: 1919.99, rating: 4.5, reviews: 120, image: '⌚', discount: 50 },
  { id: 3, name: 'Ultra Tablet Qwerty HD 10765 Series Low Pri...', category: 'Tablet', price: 799.00, rating: 4.9, reviews: 100, image: '📱', discount: 0 },
  { id: 4, name: 'CamPro HERO10 Black Sleek Design 2023 4K', category: 'Camera', price: 1499.99, rating: 4.2, reviews: 20, image: '📷', discount: 0 },
  { id: 5, name: '2019 Smart Laptop 256 GB 13 Inch Pro Chip', category: 'Laptop', price: 2099.99, rating: 4.7, reviews: 20, image: '💻', discount: 0 },
  { id: 6, name: 'Surface Laptop 4 XPS 13 Plus 64GB i7 Touch', category: 'Laptop', price: 2399.99, oldPrice: 2879.00, rating: 4.6, reviews: 120, image: '💻', discount: 20 },
  { id: 7, name: 'WH-1000XM4 Wireless Headphones High Qu...', category: 'Audio', price: 59.00, rating: 4.4, reviews: 120, image: '🎧', discount: 0 },
  { id: 8, name: 'LT Phone RAM 16/256 GB Rose Gold Guaran...', category: 'Phone', price: 999.00, rating: 4.3, reviews: 50, image: '📱', discount: 0 },
  { id: 9, name: 'Wash Machine 11 KG Front Loading Steam', category: 'Home', price: 5699.00, oldPrice: 6258.00, rating: 4.5, reviews: 120, image: '🧺', discount: 10 },
  { id: 10, name: 'Hero Watch SU Series 8 Lilac Rubber Band 40', category: 'Watch', price: 899.00, rating: 4.1, reviews: 20, image: '⌚', discount: 0 },
];

export default function ProductsPage({ cart = [], onAddToCart, onRemoveFromCart }) {
  const { startLoading, stopLoading } = useGlobalLoading();

  useEffect(() => {
    async function loadProducts() {
      startLoading(); // Starts full screen loader overlay
      try {
        // Fetch your product data here
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulating API
      } finally {
        stopLoading(); // Closes full screen loader overlay
      }
    }
    loadProducts();
  }, []);
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All Prices');
  const [selectedRating, setSelectedRating] = useState('All Ratings');
  const [activeQuickView, setActiveQuickView] = useState(null);

  const categories = ['All Categories', 'Audio', 'Phone', 'Tablet', 'Camera', 'Laptop', 'Home', 'Watch'];
  const priceRanges = ['All Prices', '$0 - $500', '$500 - $1,000', '$1,000+'];
  const ratingOptions = ['All Ratings', '4.5 Stars & Up', '4.0 Stars & Up'];

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(product => {
      const matchCategory = selectedCategory === 'All Categories' || product.category === selectedCategory;
      
      let matchPrice = true;
      if (selectedPriceRange === '$0 - $500') matchPrice = product.price <= 500;
      else if (selectedPriceRange === '$500 - $1,000') matchPrice = product.price > 500 && product.price <= 1000;
      else if (selectedPriceRange === '$1,000+') matchPrice = product.price > 1000;

      let matchRating = true;
      if (selectedRating === '4.5 Stars & Up') matchRating = product.rating >= 4.5;
      else if (selectedRating === '4.0 Stars & Up') matchRating = product.rating >= 4.0;

      return matchCategory && matchPrice && matchRating;
    });
  }, [selectedCategory, selectedPriceRange, selectedRating]);

  const handleAddToWishlist = (productName) => toast.info(`Saved "${productName}" to wishlist.`);
  
  const handleNavigateToProduct = (product) => {
    setActiveQuickView(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="bg-gray-50 dark:bg-slate-950 min-h-screen py-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex justify-between items-center mb-6 border-b dark:border-slate-900 pb-4">
          <div className="flex items-center gap-4">
            <h1 
              onClick={() => setActiveQuickView(null)}
              className="text-start text-2xl md:text-3xl font-black bg-gradient-to-r from-[#9B77E7] to-[#1600A0] dark:from-[#b496f0] dark:to-[#6366F1] cursor-pointer select-none"
              style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
            >
              Products
            </h1>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!activeQuickView ? (
            /* --- SHOP PRODUCTS VIEW --- */
            <motion.div key="shop-grid" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm mb-8 transition-colors duration-300">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative min-w-[145px]">
                    <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full appearance-none bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg pl-3 pr-10 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#9B77E7]">
                      {categories.map(cat => <option key={cat} value={cat} className="dark:bg-slate-900">{cat}</option>)}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-3 text-gray-400" />
                  </div>
                  
                  <div className="relative min-w-[145px]">
                    <select value={selectedPriceRange} onChange={(e) => setSelectedPriceRange(e.target.value)} className="w-full appearance-none bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg pl-3 pr-10 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#9B77E7]">
                      {priceRanges.map(range => <option key={range} value={range} className="dark:bg-slate-900">{range}</option>)}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-3 text-gray-400" />
                  </div>

                  <div className="relative min-w-[145px]">
                    <select value={selectedRating} onChange={(e) => setSelectedRating(e.target.value)} className="w-full appearance-none bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg pl-3 pr-10 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#9B77E7]">
                      {ratingOptions.map(rate => <option key={rate} value={rate} className="dark:bg-slate-900">{rate}</option>)}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-3 text-gray-400" />
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6 text-xs text-gray-500 font-medium">
                  <span>Showing {filteredProducts.length} results.</span>
                  <div className="flex items-center bg-gray-50 dark:bg-slate-800 p-1 rounded-lg border border-gray-100 dark:border-slate-700">
                    <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-[#9B77E7] text-white' : 'text-gray-400 hover:text-slate-600 dark:hover:text-slate-200'}`}><LayoutGrid size={16} /></button>
                    <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-[#9B77E7] text-white' : 'text-gray-400 hover:text-slate-600 dark:hover:text-slate-200'}`}><List size={16} /></button>
                  </div>
                </div>
              </div>

              <div className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5" : "flex flex-col gap-4"}>
                {filteredProducts.map((product) => (
                  <motion.div 
                    key={product.id} 
                    layout 
                    className={`group relative bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 flex overflow-hidden cursor-pointer ${
                      viewMode === 'grid' ? 'flex-col justify-between' : 'flex-row items-center gap-6'
                    }`}
                    onClick={() => handleNavigateToProduct(product)}
                  >
                    {product.discount > 0 && (
                      <span className="absolute top-3 right-3 z-10 bg-[#9B77E7] text-white font-extrabold text-[10px] px-2 py-0.5 rounded shadow-sm">
                        {product.discount}%
                      </span>
                    )}

                    <div className={`relative bg-gray-50 dark:bg-slate-800/50 rounded-xl flex items-center justify-center text-5xl select-none overflow-hidden shrink-0 ${
                      viewMode === 'grid' ? 'h-44 w-full mb-4' : 'h-28 w-28'
                    }`}>
                      {product.image}
                      <div className="absolute inset-0 bg-white/50 dark:bg-slate-950/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2.5 transition-opacity duration-200">
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleNavigateToProduct(product); }} 
                          className="p-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-full shadow hover:scale-110 border dark:border-slate-700"
                        >
                          <Eye size={14} />
                        </button>
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col justify-between w-full">
                      <div>
                        <span className="text-[10px] uppercase font-black text-gray-400 tracking-wider">{product.category}</span>
                        <h3 className={`font-bold text-slate-700 dark:text-slate-200 mt-1 group-hover:text-[#9B77E7] transition-colors ${
                          viewMode === 'grid' ? 'text-xs line-clamp-2 min-h-[2rem]' : 'text-sm md:text-base line-clamp-1'
                        }`}>
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-1 mt-2 mb-3 text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={11} className={i < Math.floor(product.rating) ? "fill-current" : "text-gray-300 dark:text-slate-700"} />
                          ))}
                          <span className="text-[10px] text-gray-400 font-bold ml-1">({product.reviews} reviews) • {product.rating}★</span>
                        </div>
                      </div>

                      <div className={`flex items-center justify-between pt-2 border-t dark:border-slate-800/60 ${viewMode === 'grid' ? 'w-full' : 'mt-2'}`} onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-baseline gap-2">
                          <span className="text-sm font-black dark:text-slate-100">${product.price}</span>
                          {product.oldPrice && <span className="text-xs text-gray-400 line-through">${product.oldPrice}</span>}
                        </div>
                        <div className="flex gap-1.5">
                          <button onClick={() => handleAddToWishlist(product.name)} className="p-1.5 border dark:border-slate-700 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"><Heart size={12} className="fill-current" /></button>
                          <button onClick={() => onAddToCart(product, 1)} className="p-1.5 bg-gray-100 dark:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-[#9B77E7] hover:text-white transition-colors"><ShoppingCart size={13} /></button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <ProductDetails 
              key="details"
              product={activeQuickView}
              cart={cart}
              onClose={() => setActiveQuickView(null)}
              onAddToCart={onAddToCart}
              onRemoveFromCart={onRemoveFromCart}
              onAddToWishlist={handleAddToWishlist}
              relatedProducts={MOCK_PRODUCTS}
              onSelectProduct={handleNavigateToProduct}
            />
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}