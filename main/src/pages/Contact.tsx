import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, MapPin, Mail, MessageCircle, Instagram, Facebook, Clock, Send, ShieldCheck } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    sareeInterest: 'General Consultation',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      return;
    }
    // Simulation
    setFormSubmitted(true);
  };

  const handleResetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      sareeInterest: 'General Consultation',
      message: ''
    });
    setFormSubmitted(false);
  };

  const handleWhatsAppChat = () => {
    const basePhone = '919876543210';
    const text = encodeURIComponent("Hello! I am browsing your Saree demo-web and would like to coordinate a video preview appointment.");
    window.open(`https://wa.me/${basePhone}?text=${text}`, '_blank');
  };

  return (
    <div className="bg-stone-50 min-h-screen py-16 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Title Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-burgundy-700 text-xs font-bold uppercase tracking-widest font-sans">
            Connect With Stylists
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif text-stone-900 mt-2 font-medium">
            Contact Zari demo-web
          </h1>
          <div className="w-12 h-0.5 bg-gold-400 mx-auto mt-4" />
          <p className="text-sm text-stone-500 font-sans mt-4 leading-relaxed">
            Have questions about silk weights, pure gold threads, customized blouse stitching, or international insured shipping coordinates? Set up real-time help here.
          </p>
        </div>

        {/* 2-Column Contact Info vs Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-stretch">

          {/* Left Column: Coordinates */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 bg-stone-900 text-stone-300 p-8 sm:p-10 rounded-3xl shadow-xl relative overflow-hidden border-t-4 border-gold-500">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(185,129,55,0.1),transparent)] pointer-events-none" />

            <div className="relative z-10 space-y-8">
              <h2 className="font-serif text-2xl text-white font-medium">The Experience Store</h2>

              <ul className="space-y-6 text-xs sm:text-sm font-sans text-stone-400">
                <li className="flex items-start gap-4">
                  <div className="p-2.5 bg-stone-800 text-gold-400 rounded-lg">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <strong className="block text-white mb-1 uppercase text-xs tracking-wider">Our Address</strong>
                    <span className="leading-relaxed">
                      102 Silk Weaver Highway, demo-web Square,<br />
                      Gandhinagar, Gujarat, India - 382010
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="p-2.5 bg-stone-800 text-gold-400 rounded-lg">
                    <Phone size={18} />
                  </div>
                  <div>
                    <strong className="block text-white mb-1 uppercase text-xs tracking-wider">Mobile & Phone</strong>
                    <span className="block text-stone-300 hover:text-white transition-colors">+91 98765 43210</span>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="p-2.5 bg-stone-800 text-gold-400 rounded-lg">
                    <Mail size={18} />
                  </div>
                  <div>
                    <strong className="block text-white mb-1 uppercase text-xs tracking-wider">Email Correspondence</strong>
                    <span className="block text-stone-300 hover:text-white transition-colors">orders@zaridemo-web.com</span>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="p-2.5 bg-stone-800 text-gold-400 rounded-lg">
                    <Clock size={18} />
                  </div>
                  <div>
                    <strong className="block text-white mb-1 uppercase text-xs tracking-wider">Showroom Hours</strong>
                    <span>Monday — Saturday: 10:00 AM — 08:30 PM (IST)</span>
                    <span className="block text-[11px] text-stone-500 mt-1">Sundays are reserved for family wedding parties styling appointments only.</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="relative z-10 pt-6 border-t border-stone-800 space-y-4">
              <span className="text-[11px] text-stone-500 uppercase tracking-widest block font-sans">Social lookbooks:</span>
              <div className="flex gap-4">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-gold-400 transition-colors">
                  <Instagram size={14} /> Instagram
                </a>
                <span className="text-stone-700">|</span>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-gold-400 transition-colors">
                  <Facebook size={14} /> Facebook
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-stone-100 shadow-xs flex flex-col justify-center">

            <AnimatePresence mode="wait">
              {!formSubmitted ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <h2 className="font-serif text-xl sm:text-2xl font-semibold text-stone-800 mb-6">Stylist Enquiry Request</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-xs uppercase tracking-wider font-semibold text-stone-450 font-sans pl-1">Your Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Sonal Sharma"
                        className="p-3.5 text-sm bg-stone-50 rounded-xl focus:bg-white border border-stone-200 focus:border-gold-500 focus:outline-none transition-all placeholder-stone-400 text-stone-800"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-xs uppercase tracking-wider font-semibold text-stone-450 font-sans pl-1">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. sonal@gmail.com"
                        className="p-3.5 text-sm bg-stone-50 rounded-xl focus:bg-white border border-stone-200 focus:border-gold-500 focus:outline-none transition-all placeholder-stone-400 text-stone-800"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-xs uppercase tracking-wider font-semibold text-stone-450 font-sans pl-1">Phone / WhatsApp</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="e.g. +91 98765 43210"
                        className="p-3.5 text-sm bg-stone-50 rounded-xl focus:bg-white border border-stone-200 focus:border-gold-500 focus:outline-none transition-all placeholder-stone-400 text-stone-800"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-xs uppercase tracking-wider font-semibold text-stone-450 font-sans pl-1">Drape Interest</label>
                      <select
                        name="sareeInterest"
                        value={formData.sareeInterest}
                        onChange={handleInputChange}
                        className="p-3.5 text-sm bg-stone-50 rounded-xl focus:bg-white border border-stone-200 focus:border-gold-500 focus:outline-none transition-all text-stone-700"
                      >
                        <option value="General Consultation">General Saree Consultation</option>
                        <option value="Bridal Wedding Trousseau">Bridal Wedding Trousseau</option>
                        <option value="Custom Blouse Stitching Help">Bespoke Blouse Tailoring</option>
                        <option value="Video Call Live Viewing">Request Video Call Viewing</option>
                        <option value="Exchanges & Sizing help">Exchanges & Shipping Details</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-xs uppercase tracking-wider font-semibold text-stone-450 font-sans pl-1">Your Message *</label>
                    <textarea
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="Share your color preferences, occasion details, fabrics you prefer..."
                      className="p-4 text-sm bg-stone-50 rounded-xl focus:bg-white border border-stone-200 focus:border-gold-500 focus:outline-none transition-all placeholder-stone-400 text-stone-800"
                    />
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row gap-4">
                    <button
                      type="submit"
                      className="flex-1 bg-burgundy-700 hover:bg-stone-900 text-white font-sans font-bold uppercase tracking-wider text-xs py-4 px-6 rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                    >
                      <Send size={13} />
                      Send Enquire Form
                    </button>

                    <button
                      type="button"
                      onClick={handleWhatsAppChat}
                      className="bg-emerald-50 text-emerald-800 border border-emerald-200/50 hover:bg-emerald-100 font-sans font-bold uppercase tracking-wider text-xs py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <MessageCircle size={15} className="fill-emerald-800 stroke-none" />
                      Live Chat Styling
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="form-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-10"
                >
                  <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
                    ✓
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-stone-850 mb-2">
                    Enquiry Submitted Successfully!
                  </h3>
                  <p className="text-sm text-stone-500 font-sans leading-relaxed max-w-md mx-auto mb-8">
                    Thank you, <strong>{formData.name}</strong>. Your choice details have been forwarded directly to our styling coordinator at Gandhinagar. We are checking availability and will get in touch with you via email / WhatsApp within <strong>4 hours</strong>!
                  </p>

                  <div className="inline-flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleResetForm}
                      className="px-5 py-3 border border-stone-200 text-stone-600 font-sans uppercase font-bold text-xs rounded-xl hover:bg-stone-50 transition-colors cursor-pointer"
                    >
                      Send Another Request
                    </button>

                    <button
                      onClick={() => handleWhatsAppChat()}
                      className="px-5 py-3 bg-emerald-500 text-white font-sans uppercase font-bold text-xs rounded-xl hover:bg-emerald-600 shadow-md transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <MessageCircle size={14} className="fill-white stroke-none" />
                      Go to WhatsApp Chat
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

        {/* Google Maps embed section */}
        <section className="bg-white border border-stone-100 rounded-3xl p-6 sm:p-8 overflow-hidden shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-stone-100 pb-5 mb-6 gap-4">
            <span className="flex items-center gap-2 font-serif text-lg font-bold text-stone-850">
              🗺 Visit our Gandhinagar Showroom
            </span>
            <span className="flex items-center gap-1.5 text-xs text-stone-500 font-sans">
              <ShieldCheck size={14} className="text-gold-500" /> Free customer secure parking available.
            </span>
          </div>

          {/* Styled Google Maps iframe embed */}
          <div className="w-full h-[400px] rounded-2xl overflow-hidden border border-stone-100 bg-stone-100 relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117364.55167664632!2d72.56942004245645!3d23.183204992497678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395c2bf949988775%3A0x600100fe184af08a!2sGandhinagar%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1703000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Zari Saree demo-web Map Location"
              className="grayscale-[10%] opacity-90 contrast-[95%]"
            />
          </div>
        </section>

      </div>
    </div>
  );
};
export default Contact;
