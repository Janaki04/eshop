import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import RecommendedProducts from './pages/landing/RecommendedProducts'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'

// Global Loading Infrastructure Imports
import { LoadingProvider, useGlobalLoading } from './components/LoadingContext'
import GlobalLoader from './components/GlobalLoader'

import HeroCarousel from './pages/landing/Hero'
import ProductsPage from "./pages/landing/ProductsPage"
import ContactPage from "./pages/landing/ContactPage"
import AboutPage from "./pages/landing/AboutPage"
import CartPage from "./pages/landing/Cart"

// Inner App component to safely consume the Loading Context hooks
function AppContent() {
  const [cart, setCart] = useState([]);
  const { startLoading, stopLoading } = useGlobalLoading();

  // Simulate an initial app-wide data load on entry
  useEffect(() => {
    const bootstrapApplication = async () => {
      startLoading();
      try {
        // Simulating authentic API fetch lag for product inventory/user sessions
        await new Promise((resolve) => setTimeout(resolve, 1200));
      } catch (error) {
        console.error("Initialization failed", error);
      } finally {
        stopLoading();
      }
    };
    
    bootstrapApplication();
  }, []);

  const handleAddToCart = (product, quantityToAdd = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantityToAdd } : item
        );
      }
      return [...prevCart, { ...product, quantity: quantityToAdd }];
    });
    toast.success(`Added ${quantityToAdd}x "${product.name}" to cart!`);
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      handleClearItem(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productId);
      if (!existingItem) return prevCart;
      if (existingItem.quantity <= 1) {
        return prevCart.filter((item) => item.id !== productId);
      }
      return prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };

  const handleClearItem = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    toast.info("Item removed from cart.");
  };

  const handleClearEntireCart = () => {
    setCart([]);
    toast.info("Cart cleared successfully.");
  };

  const handleAddToWishlist = (product) => {
    toast.success(`Added "${product.name}" to your wishlist!`);
  };

  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <BrowserRouter>
      {/* Central Screen Interceptor element */}
      <GlobalLoader />

      <Header totalCartItems={totalCartItems} cartTotal={cartTotal} />
      
      <main className="min-h-[calc(100vh-160px)]">
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <HeroCarousel />
                <RecommendedProducts 
                  cart={cart}
                  onAddToCart={handleAddToCart}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemoveFromCart={handleRemoveFromCart}
                  onAddToWishlist={handleAddToWishlist}
                />
              </>
            } 
          />
          
          <Route 
            path="/products" 
            element={
              <ProductsPage 
                cart={cart} 
                onAddToCart={handleAddToCart} 
                onRemoveFromCart={handleRemoveFromCart} 
              />
            } 
          />
          
          <Route path="/blog" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          
          <Route 
            path="/cart" 
            element={
              <CartPage 
                cart={cart} 
                totalCartItems={totalCartItems}
                cartTotal={cartTotal}
                onAddToCart={handleAddToCart} 
                onRemoveFromCart={handleRemoveFromCart} 
                onClearItem={handleClearItem} 
                onClearCart={handleClearEntireCart}
              />
            } 
          />
          
          <Route path="*" element={<div className="p-20 text-center dark:text-white font-bold">404 - Page Not Found</div>} />
        </Routes>
      </main>
      
      <Footer />
      
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </BrowserRouter>
  );
}

// Shell wrapper ensures Context lifecycle methods remain active inside core runtime trees
export default function App() {
  return (
    <LoadingProvider>
      <AppContent />
    </LoadingProvider>
  );
}