import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Clock, Mail, MapPin, Instagram, Facebook, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-900 text-stone-300 font-sans mt-auto border-t-4 border-gold-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-left">

          {/* Column 1: Brand & Bio */}
          <div>
            <Link to="/" className="flex flex-col text-left mb-5">
              <span className="font-serif text-3xl font-extrabold tracking-[0.08em] text-white uppercase leading-none">
                Zari
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-gold-400 mt-2">
                Silk demo-web
              </span>
            </Link>

            <p className="text-stone-400 text-xs leading-relaxed mb-6">
              Preserving legacy handlooms since decades. Curating double-warp Kanjeevarams, hand-painted organzas, and authentic gold Banarasi silks directly from master weavers.
            </p>

            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="text-stone-400 hover:text-gold-400 p-2 rounded-full hover:bg-stone-800 transition-colors"
                aria-label="Instagram page link"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="text-stone-400 hover:text-gold-400 p-2 rounded-full hover:bg-stone-800 transition-colors"
                aria-label="Facebook page link"
              >
                <Facebook size={16} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-serif font-bold text-sm tracking-wider text-white uppercase mb-5">
              Our Collections
            </h3>
            <ul className="space-y-3.5 text-xs text-stone-400">
              <li>
                <Link to="/collections" className="hover:text-gold-300 transition-colors">Banarasi Katan Silk</Link>
              </li>
              <li>
                <Link to="/collections" className="hover:text-gold-300 transition-colors">Wedding Kanjeevarams</Link>
              </li>
              <li>
                <Link to="/collections" className="hover:text-gold-300 transition-colors">Lightweight Organza</Link>
              </li>
              <li>
                <Link to="/collections" className="hover:text-gold-300 transition-colors">Designer Georgettes</Link>
              </li>
              <li>
                <Link to="/collections" className="hover:text-gold-300 transition-colors">Organic Handloom Linen</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Store Info */}
          <div>
            <h3 className="font-serif font-bold text-sm tracking-wider text-white uppercase mb-5">
              Store Details
            </h3>

            <ul className="space-y-4 text-xs text-stone-400">
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="text-gold-400 shrink-0 mt-0.5" />
                <span>
                  102 Silk Weaver Highway,<br />
                  demo-web Square, Gandhinagar,<br />
                  Gujarat, India - 382010
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={14} className="text-gold-400" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={14} className="text-gold-400" />
                <span>orders@zaridemo-web.com</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Experience Store Hours */}
          <div>
            <h3 className="font-serif font-bold text-sm tracking-wider text-white uppercase mb-5">
              Experience Store
            </h3>

            <ul className="space-y-3.5 text-xs text-stone-400">
              <li className="flex items-start gap-2.5">
                <Clock size={14} className="text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-white font-semibold">Monday — Saturday</span>
                  <span className="text-[11px] text-stone-400 font-medium">10:00 AM — 08:30 PM (IST)</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock size={14} className="text-stone-600 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-stone-500 font-semibold">Sunday</span>
                  <span className="text-[11px] text-stone-500">By Appointment only</span>
                </div>
              </li>
            </ul>

            {/* Verification secure banner */}
            <div className="mt-6 p-3 rounded-lg bg-stone-800/40 border border-stone-800 flex items-center gap-2">
              <ShieldCheck size={16} className="text-gold-500" />
              <span className="text-[10px] text-stone-400 tracking-wide font-sans">
                Authentic silk hallmark certified.
              </span>
            </div>
          </div>

        </div>

        {/* Section bottom banner */}
        <div className="mt-16 pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-stone-500 text-xs gap-4 select-none">
          <p>© {currentYear} Zari Silk demo-web. Created for local weavers support.</p>
          <div className="flex space-x-6 text-[11px]">
            <span className="hover:text-stone-400 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-stone-400 transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-stone-400 transition-colors cursor-pointer">COD & Returns</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
export default Footer;
