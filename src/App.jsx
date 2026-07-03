import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Header from './components/Header'
import './App.css'
import HeroCarousel from './pages/landing/Hero'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ProductsPage from "./pages/landing/ProductsPage"
import ContactPage from "./pages/landing/ContactPage"
import AboutPage from "./pages/landing/AboutPage"
// import CartPage from "./pages/landing/Cart"

// Placeholder components for your routes—replace these with your actual page components!
const CartPage = () => <div className="p-10 text-center dark:text-white">Cart screen is in progress</div>;

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      {/* Header stays persistent across all route views */}
      <Header />

      {/* Dynamic Route Switching Viewport Area */}
      <main className="min-h-[calc(100vh-160px)]">
        <Routes>
          {/* Main Landing / Home Route displaying your Hero block */}
          <Route path="/" element={<HeroCarousel />} />
          
          {/* Inner Pages Routing Targets */}
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/blog" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cart" element={<CartPage />} />
          
          {/* Fallback 404 Route handling unknown path types */}
          <Route path="*" element={<div className="p-20 text-center dark:text-white font-bold">404 - Page Not Found</div>} />
        </Routes>
      </main>

      {/* Footer stays persistent at the bottom */}
      <Footer />

      {/* Global Toast Notification Container Layer */}
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
  )
}

export default App