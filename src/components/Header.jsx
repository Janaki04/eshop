import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Sun, Moon, LogIn, User, LogOut, Mail, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';

export default function Header({ totalCartItems = 0, cartTotal = 0 }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState('login'); // 'login' | 'signup'
  const [currentUser, setCurrentUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About Us', path: '/blog' },
    { name: 'Contact Us', path: '/contact' }
  ];

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const session = localStorage.getItem('e_shop_session');
    if (session) {
      setCurrentUser(JSON.parse(session));
    }

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || (authTab === 'signup' && !name)) {
      toast.error('Please fill in all fields correctly.');
      return;
    }

    if (authTab === 'signup') {
      const userData = { name, email, password };
      localStorage.setItem(`user_${email}`, JSON.stringify(userData));
      localStorage.setItem('e_shop_session', JSON.stringify({ name, email }));
      setCurrentUser({ name, email });
      toast.success(`Welcome to e-shop, ${name}!`);
    } else {
      const storedUser = localStorage.getItem(`user_${email}`);
      if (!storedUser) {
        toast.error('No account associated with this email address.');
        return;
      }
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.password !== password) {
        toast.error('Incorrect password configuration.');
        return;
      }
      localStorage.setItem('e_shop_session', JSON.stringify({ name: parsedUser.name, email }));
      setCurrentUser({ name: parsedUser.name, email });
      toast.success(`Welcome back, ${parsedUser.name}!`);
    }

    setIsAuthModalOpen(false);
    setName('');
    setEmail('');
    setPassword('');
    
    navigate('/');
  };

  const handleLogout = () => {
    localStorage.removeItem('e_shop_session');
    setCurrentUser(null);
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    toast.info('Logged out securely.');
    navigate('/');
  };

  const getInitials = (userName) => {
    if (!userName) return 'U';
    return userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <nav className="w-full bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 shadow-sm transition-colors duration-300 font-sans top-0 sticky z-50">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          <motion.div 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="flex-shrink-0 flex items-center cursor-pointer"
          >
            <Link to="/" className="text-2xl font-black bg-gradient-to-r from-[#9B77E7] to-[#1600A0] bg-clip-text text-transparent tracking-tight">
              e-shop.
            </Link>
          </motion.div>

          <div className="hidden md:flex items-center space-x-5">
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-xl bg-gray-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-200"
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5 text-slate-500" />}
            </motion.button>

            <div className="h-8 w-px bg-gray-200 dark:bg-slate-700" />

            {currentUser ? (
              <div className="relative" ref={dropdownRef}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-3 focus:outline-none p-1 pr-3 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#9B77E7] to-[#1600A0] flex items-center justify-center text-white font-bold text-sm shadow-sm">
                    {getInitials(currentUser.name)}
                  </div>
                  <div className="text-left text-sm max-w-[120px]">
                    <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">Account</p>
                    <p className="font-bold text-slate-700 dark:text-slate-200 truncate">{currentUser.name}</p>
                  </div>
                </motion.button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl shadow-xl z-50 overflow-hidden"
                    >
                      <div className="p-3 border-b border-gray-100 dark:border-slate-700 text-xs text-gray-400 truncate">
                        {currentUser.email}
                      </div>
                      <button 
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 flex items-center gap-2 transition-colors font-semibold"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.button 
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => { setAuthTab('login'); setIsAuthModalOpen(true); }}
                className="px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-[#9B77E7] to-[#1600A0] rounded-xl shadow-md hover:shadow-lg hover:opacity-95 transition-all duration-200"
              >
                Login / Signup
              </motion.button>
            )}
          </div>

          <div className="flex items-center space-x-3 md:hidden">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 text-slate-700 dark:text-slate-300 hover:text-[#9B77E7] transition-colors"
            >
              {darkMode ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5" />}
            </button>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-700 dark:text-slate-300 p-2 focus:outline-none hover:text-[#9B77E7] transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <div className="hidden md:block bg-gradient-to-r from-[#9B77E7] to-[#1600A0] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-13 text-sm font-semibold">
            <div className="flex items-center space-x-1">
              {navLinks.map((link) => (
                <NavLink 
                  key={link.name} 
                  to={link.path} 
                  className={({ isActive }) => 
                    `px-3 py-2 rounded-lg transition-all duration-200 ${
                      isActive ? 'bg-white/20 shadow-inner text-[#1600A0]' : 'hover:bg-white/10'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            <div className="flex my-2 items-center">
              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/cart')}
                className="flex items-center text-left bg-white/10 hover:bg-white/15 px-4 py-1.5 rounded-xl border border-white/10 backdrop-blur-sm transition-all duration-200"
              >
                <div className="relative p-1">
                  <ShoppingCart className="h-5 w-5 text-white" />
                  {totalCartItems > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-amber-400 flex items-center justify-center text-[10px] font-black text-slate-900 border border-purple-900">
                      {totalCartItems}
                    </span>
                  )}
                </div>
                <div className="ml-3 text-xs tracking-wide">
                  <p className="text-purple-200 text-[10px] uppercase font-bold tracking-wider">Cart</p>
                  <p className="text-white font-extrabold text-sm">${cartTotal.toFixed(2)}</p>
                </div>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-2 pb-6 space-y-4 shadow-inner overflow-hidden"
          >
            <div 
              onClick={() => { setIsMobileMenuOpen(false); navigate('/cart'); }}
              className="bg-gray-50 dark:bg-slate-800/60 p-3 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <ShoppingCart className="h-5 w-5 text-[#9B77E7]" />
              <span>Cart ({totalCartItems}): <b className="text-[#1600A0] dark:text-purple-400">${cartTotal.toFixed(2)}</b></span>
            </div>

            {currentUser && (
              <div className="flex items-center space-x-3 p-3 bg-purple-50/50 dark:bg-slate-800/50 rounded-xl">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#9B77E7] to-[#1600A0] flex items-center justify-center text-white font-bold shrink-0">{getInitials(currentUser.name)}</div>
                <div className="flex-1 text-sm min-w-0">
                  <p className="font-bold text-slate-800 dark:text-slate-100 truncate">{currentUser.name}</p>
                  <p className="text-xs text-gray-500 truncate">{currentUser.email}</p>
                </div>
              </div>
            )}

            <div className="flex flex-col space-y-1 font-semibold text-slate-700 dark:text-slate-300">
              {navLinks.map((link) => (
                <NavLink 
                  key={link.name} 
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) => 
                    `px-3 py-2.5 rounded-xl transition-colors ${
                      isActive ? 'bg-purple-50 dark:bg-slate-800 text-[#9B77E7] font-bold' : 'hover:bg-gray-50 dark:hover:bg-slate-800/80'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            <div className="pt-2">
              {currentUser ? (
                <button onClick={handleLogout} className="w-full py-3 text-center text-sm font-bold text-white bg-red-500 hover:bg-red-600 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors">
                  <LogOut size={16} /> Logout Account
                </button>
              ) : (
                <button onClick={() => { setIsMobileMenuOpen(false); setAuthTab('login'); setIsAuthModalOpen(true); }} className="w-full py-3 text-center text-sm font-bold text-white bg-gradient-to-r from-[#9B77E7] to-[#1600A0] rounded-xl shadow-md">
                  Login / Signup
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isAuthModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAuthModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />

            <motion.div 
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl border border-gray-100 dark:border-slate-800 shadow-2xl overflow-hidden relative z-10"
            >
              <div className="flex border-b border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/40">
                <button 
                  type="button"
                  onClick={() => setAuthTab('login')}
                  className={`flex-1 py-4 text-sm font-bold transition-colors ${authTab === 'login' ? 'text-[#1600A0] dark:text-purple-400 border-b-2 border-[#9B77E7] bg-white dark:bg-slate-900' : 'text-gray-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
                >
                  Log In
                </button>
                <button 
                  type="button"
                  onClick={() => setAuthTab('signup')}
                  className={`flex-1 py-4 text-sm font-bold transition-colors ${authTab === 'signup' ? 'text-[#1600A0] dark:text-purple-400 border-b-2 border-[#9B77E7] bg-white dark:bg-slate-900' : 'text-gray-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
                >
                  Create Account
                </button>
                <button type="button" onClick={() => setIsAuthModalOpen(false)} className="px-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleAuthSubmit} className="p-6 space-y-4">
                {authTab === 'signup' && (
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Full Name</label>
                    <div className="relative">
                      <User size={16} className="absolute left-3 top-3.5 text-gray-400" />
                      <input 
                        type="text" required placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-transparent text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#9B77E7]"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Email Address</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-3.5 text-gray-400" />
                    <input 
                      type="email" required placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-transparent text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#9B77E7]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Password</label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3 top-3.5 text-gray-400" />
                    <input 
                      type="password" required placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-transparent text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#9B77E7]"
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="w-full py-3 mt-4 text-sm font-bold text-white bg-gradient-to-r from-[#9B77E7] to-[#1600A0] rounded-xl shadow-lg hover:opacity-95 flex items-center justify-center gap-2 transition-opacity"
                >
                  <LogIn size={16} /> {authTab === 'login' ? 'Sign In to Account' : 'Register Account'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </nav>
  );
}