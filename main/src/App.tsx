import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';

// Pages
import { Home } from './pages/Home';
import { Collections } from './pages/Collections';
import { ProductDetails } from './pages/ProductDetails';
import { About } from './pages/About';
import { Contact } from './pages/Contact';

// Scroll to top helper on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default function App() {
  return (
    <ShopProvider>
      <HashRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col justify-between font-sans antialiased overflow-x-hidden selection:bg-burgundy-200 selection:text-burgundy-900">
          
          {/* Header area */}
          <Navbar />

          {/* Main content viewport */}
          <div className="flex-1 w-full flex flex-col">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/collections" element={<Collections />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              {/* Fallback routing */}
              <Route path="*" element={<Home />} />
            </Routes>
          </div>

          {/* Footer view */}
          <Footer />

          {/* Interactive contact widgets */}
          <WhatsAppFloatingButton />

        </div>
      </HashRouter>
    </ShopProvider>
  );
}
