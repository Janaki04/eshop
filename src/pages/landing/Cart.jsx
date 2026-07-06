import React, { useState, useMemo } from 'react';
import { Trash2, Share2, Plus, Minus, Headphones, ShieldCheck, Truck, RotateCcw, ShoppingBag } from 'lucide-react';
import { toast } from 'react-toastify';

export default function Cart({ 
  cart = [], 
  onAddToCart, 
  onRemoveFromCart, 
  onClearItem 
}) {
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState('');

  const subtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cart]);

  const finalTotal = useMemo(() => {
    return Math.max(0, subtotal - discount);
  }, [subtotal, discount]);

  const totalCartUnits = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'FIRSTPAY') {
      setDiscount(100.00);
      setAppliedCoupon('FIRSTPAY');
    } else {
      toast.error('Invalid coupon code. Try "FIRSTPAY"');
    }
  };

  return (
    <div className="bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 min-h-screen py-8 font-sans antialiased transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Your Cart
            </h1>
            <p className="text-start text-xs text-gray-400 mt-1">
              Managing {totalCartUnits} total units.
            </p>
          </div>

          <button
            onClick={() => onAddToCart({
              id: Date.now(),
              name: `New Premium Gadget Prototype Alpha-${Math.floor(Math.random() * 100)}`,
              category: 'ELECTRONICS',
              variant: 'Default Edition',
              price: 149.99,
              image: '🚀'
            })}
            className="text-xs font-bold bg-slate-100 dark:bg-slate-900 border dark:border-slate-800 px-3 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-[#9B77E7] hover:text-white dark:hover:bg-[#9B77E7] transition-all flex items-center gap-1.5"
          >
            <Plus size={14} /> Simulate incoming Add-To-Cart
          </button>
        </div>

        {cart.length > 0 && (
          <div className="hidden md:grid grid-cols-12 bg-gray-50 dark:bg-slate-900/60 p-4 rounded-lg font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 border border-gray-100 dark:border-slate-800 mb-6">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Qty</div>
            <div className="col-span-2 text-right">Total</div>
          </div>
        )}

        <div className="space-y-4">
          {cart.map((item) => (
            <div 
              key={item.id}
              className={`group relative grid grid-cols-1 md:grid-cols-12 items-center gap-4 md:gap-0 p-4 rounded-xl border transition-all duration-200 bg-white dark:bg-slate-900/20 ${
                item.highlighted 
                  ? 'border-gray-200 dark:border-slate-700 shadow-sm md:p-6' 
                  : 'border-transparent dark:border-transparent hover:bg-gray-50/50 dark:hover:bg-slate-900/40'
              }`}
            >
              <div className="col-span-1 md:col-span-6 flex gap-4 items-start pr-12 md:pr-0">
                <div className="w-24 h-24 bg-gray-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-4xl shrink-0 border border-gray-100 dark:border-slate-700 select-none">
                  {item.image || '📦'}
                </div>
                <div className="space-y-1 max-w-md">
                  <span className="text-[10px] uppercase font-black text-gray-400 tracking-widest">{item.category || 'STORE ITEM'}</span>
                  <h3 className="text-xs md:text-sm font-bold text-slate-800 dark:text-slate-200 leading-snug hover:text-[#9B77E7] dark:hover:text-[#9B77E7] transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-400 font-medium pt-1">
                    <span className="font-bold text-gray-500 dark:text-slate-400">Variant:</span> {item.variant || 'Standard'}
                  </p>
                </div>
              </div>

              <div className="col-span-1 md:col-span-2 text-left md:text-center">
                <span className="md:hidden text-xs font-bold text-gray-400 mr-2">Price:</span>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">${item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>

              <div className="col-span-1 md:col-span-2 flex justify-start md:justify-center">
                <div className="flex items-center bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-1">
                  <button 
                    onClick={() => onRemoveFromCart(item.id)}
                    className="p-1 text-gray-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                  >
                    <Minus size={12} strokeWidth={2.5} />
                  </button>
                  <span className="px-3 text-xs font-black w-8 text-center text-slate-800 dark:text-slate-200">
                    {item.quantity}
                  </span>
                  <button 
                    onClick={() => onAddToCart(item, 1)}
                    className="p-1 text-gray-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                  >
                    <Plus size={12} strokeWidth={2.5} />
                  </button>
                </div>
              </div>

              <div className="col-span-1 md:col-span-2 text-left md:text-right font-black text-slate-900 dark:text-white text-sm md:pr-4">
                <span className="md:hidden text-xs font-bold text-gray-400 mr-2">Total:</span>
                ${(item.price * item.quantity).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>

              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-row md:flex-col gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-200">
                <button 
                  onClick={() => onClearItem(item.id)}
                  className="p-2 bg-[#9B77E7] hover:bg-red-600 text-white rounded-full shadow transition-all duration-150 hover:scale-105"
                  title="Remove Item"
                >
                  <Trash2 size={14} />
                </button>
                <button 
                  className="p-2 bg-white dark:bg-slate-800 text-slate-400 dark:text-slate-300 border border-gray-200 dark:border-slate-700 hover:border-gray-300 rounded-full shadow transition-all duration-150 hover:scale-105"
                  title="Share Item"
                >
                  <Share2 size={14} />
                </button>
              </div>
            </div>
          ))}

          {cart.length === 0 && (
            <div className="text-center py-20 border border-dashed border-gray-200 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center space-y-3 bg-gray-50/30 dark:bg-slate-900/10">
              <ShoppingBag size={40} className="text-gray-300 dark:text-slate-700" />
              <div>
                <p className="text-base font-bold text-slate-700 dark:text-slate-300">Your shopping cart is empty</p>
                <p className="text-xs text-gray-400 mt-0.5">Explore the shop and add items to your basket!</p>
              </div>
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-12 items-start">
            <form onSubmit={handleApplyCoupon} className="lg:col-span-5 flex flex-col gap-2">
              <div className="flex gap-2 border border-gray-200 dark:border-slate-800 rounded-xl p-2 bg-white dark:bg-slate-900 w-full">
                <input 
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code (ex: FIRSTPAY)" 
                  className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 text-xs px-3 text-slate-800 dark:text-slate-100 placeholder-gray-400"
                />
                <button 
                  type="submit" 
                  className="bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold px-4 py-2 rounded-lg transition-colors border border-gray-200 dark:border-slate-700"
                >
                  Apply Code
                </button>
              </div>
              {appliedCoupon && (
                <span className="text-[11px] text-green-500 font-bold ml-2">✓ Coupon Code "{appliedCoupon}" Active (-$100.00 flat)</span>
              )}
            </form>

            <div className="lg:col-span-7 flex flex-col items-end space-y-4">
              <div className="w-full md:w-[420px] bg-gray-50 dark:bg-slate-900 rounded-xl p-4 border border-gray-100 dark:border-slate-800 flex flex-col gap-2 text-xs">
                <div className="flex justify-between items-center text-gray-400 font-medium">
                  <span>Subtotal</span>
                  <span>${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between items-center text-green-500 font-medium">
                    <span>Discount</span>
                    <span>-${discount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </div>
                )}
                <hr className="border-gray-200 dark:border-slate-800 my-1" />
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Due</span>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-black text-[#9B77E7]">
                      ${finalTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium italic">(excl. shipping)</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button className="text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors underline decoration-2 underline-offset-4">
                  Continue Shopping
                </button>
                <button 
                  onClick={() => toast.info(`Proceeding to checkout with raw balance of $${finalTotal.toFixed(2)}`)}
                  className="bg-gradient-to-r from-[#9B77E7] to-[#1600A0] text-white text-xs font-black tracking-wider uppercase px-8 py-3 rounded-lg shadow-md shadow-[#9B77E7]/10 transition-all duration-150 active:scale-[0.99]"
                >
                  Checkout Now
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-16 pt-8 border-t border-gray-100 dark:border-slate-900 grid grid-cols-2 md:grid-cols-4 gap-6 text-[11px] text-slate-500 dark:text-slate-400">
          <div className="flex items-start gap-2.5">
            <Headphones size={16} className="text-slate-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-800 dark:text-slate-200">Responsive</h4>
              <p className="text-gray-400">Customer service available 24/7</p>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <ShieldCheck size={16} className="text-slate-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-800 dark:text-slate-200">Secure</h4>
              <p className="text-gray-400">Certified marketplace since 2017</p>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <Truck size={16} className="text-slate-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-800 dark:text-slate-200">Shipping</h4>
              <p className="text-gray-400">Free, fast, and reliable worldwide</p>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <RotateCcw size={16} className="text-slate-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-800 dark:text-slate-200">Transparent</h4>
              <p className="text-gray-400">Hassle-free return policy</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}