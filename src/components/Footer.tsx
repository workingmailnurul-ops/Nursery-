import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sprout,
  Heart,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  HelpCircle,
  PackageCheck,
  RotateCcw,
  Send,
  CheckCircle2,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  ShieldCheck,
  CreditCard,
  Banknote,
  Truck,
  BookOpen,
  FileText,
  Building2,
} from 'lucide-react';
import { Button } from './Button';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setTimeout(() => {
        setNewsletterSubscribed(false);
        setNewsletterEmail('');
      }, 3000);
    }
  };

  return (
    <footer className="bg-[#1C3320] text-stone-200 border-t-4 border-[#E8862E] pt-12 pb-24 md:pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* NEWSLETTER SIGNUP BANNER */}
        <div className="bg-[#2F5233] rounded-3xl p-6 sm:p-8 border border-[#3A633E] shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-[#E8862E] font-extrabold text-xs uppercase tracking-wider flex items-center justify-center md:justify-start gap-1.5">
              <Sprout size={16} /> Stay Updated With Nurserylive
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-black text-white">
              Subscribe for Seasonal Plant Discounts & Planting Care Guides
            </h3>
            <p className="text-stone-300 text-xs max-w-xl">
              Get first access to rare plant arrivals, seasonal plant care guides, and exclusive discounts.
            </p>
          </div>

          <form onSubmit={handleNewsletterSubmit} className="w-full md:w-auto flex flex-col sm:flex-row gap-2.5 shrink-0">
            {newsletterSubscribed ? (
              <div className="bg-emerald-800 text-emerald-100 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400" />
                <span>Thank you! You are subscribed to plant updates.</span>
              </div>
            ) : (
              <>
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="bg-[#1C3320] border border-stone-600 rounded-xl px-4 py-2.5 text-xs text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#E8862E] w-full sm:w-72"
                />
                <Button variant="accent" size="md" type="submit" rightIcon={<Send size={15} />}>
                  Subscribe
                </Button>
              </>
            )}
          </form>
        </div>

        {/* 4 COLUMNS FOOTER CONTENT */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pt-4 border-t border-stone-700/60">
          {/* COLUMN 1: ABOUT */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-1.5 group inline-flex shrink-0">
              <div className="w-8 h-8 rounded-lg bg-[#2A8A3C] text-white flex items-center justify-center shadow-sm shrink-0">
                <Sprout size={20} />
              </div>
              <span className="text-xl font-black text-white tracking-tight whitespace-nowrap">
                Talukdar <span className="text-[#2A8A3C]">Nursery</span>
              </span>
            </Link>

            <p className="text-xs text-stone-300 leading-relaxed">
              Nurserylive is your premier online plant nursery offering over 6,000+ healthy plants, pots, seeds, and organic gardening accessories with nationwide delivery.
            </p>

            {/* Social Icons */}
            <div className="pt-2">
              <span className="text-[10px] font-bold uppercase text-stone-400 block mb-2 tracking-wider">
                Connect With Our Garden Community
              </span>
              <div className="flex items-center gap-2">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-[#2F5233] hover:bg-[#E8862E] text-white flex items-center justify-center transition"
                  aria-label="Facebook"
                >
                  <Facebook size={16} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-[#2F5233] hover:bg-[#E8862E] text-white flex items-center justify-center transition"
                  aria-label="Instagram"
                >
                  <Instagram size={16} />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-[#2F5233] hover:bg-[#E8862E] text-white flex items-center justify-center transition"
                  aria-label="YouTube"
                >
                  <Youtube size={16} />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-[#2F5233] hover:bg-[#E8862E] text-white flex items-center justify-center transition"
                  aria-label="Twitter"
                >
                  <Twitter size={16} />
                </a>
                <a
                  href="https://wa.me/918721909049"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white flex items-center justify-center transition"
                  aria-label="WhatsApp Support"
                >
                  <MessageCircle size={16} />
                </a>
              </div>
            </div>
          </div>

          {/* COLUMN 2: QUICK LINKS */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-base text-white border-b border-stone-700/80 pb-2">
              Company & Policies
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>
                <Link to="/wishlist" className="hover:text-[#E8862E] transition flex items-center gap-1.5 font-bold text-white">
                  <Heart size={14} className="text-[#FF5252] fill-[#FF5252]" />
                  <span>My Saved Wishlist</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#E8862E] transition flex items-center gap-1.5">
                  <Sprout size={14} className="text-[#E8862E]" />
                  <span>About Nurserylive</span>
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-[#E8862E] transition flex items-center gap-1.5">
                  <BookOpen size={14} className="text-[#E8862E]" />
                  <span>Gardening Blog & Articles</span>
                </Link>
              </li>
              <li>
                <Link to="/shipping-policy" className="hover:text-[#E8862E] transition flex items-center gap-1.5">
                  <Truck size={14} className="text-[#E8862E]" />
                  <span>Shipping & Delivery Policy</span>
                </Link>
              </li>
              <li>
                <Link to="/return-policy" className="hover:text-[#E8862E] transition flex items-center gap-1.5">
                  <RotateCcw size={14} className="text-[#E8862E]" />
                  <span>Return & 48-Hour Replacement</span>
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-[#E8862E] transition flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-[#E8862E]" />
                  <span>Privacy Policy & Security</span>
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-[#E8862E] transition flex items-center gap-1.5">
                  <FileText size={14} className="text-[#E8862E]" />
                  <span>Terms & Conditions</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#E8862E] transition flex items-center gap-1.5">
                  <Phone size={14} className="text-[#E8862E]" />
                  <span>Contact Us & Yard Location</span>
                </Link>
              </li>
              <li>
                <Link to="/bulk-orders" className="hover:text-[#E8862E] transition flex items-center gap-1.5">
                  <Building2 size={14} className="text-[#E8862E]" />
                  <span>Bulk & Wholesale Orders</span>
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-[#E8862E] transition flex items-center gap-1.5 text-stone-300 font-bold">
                  <ShieldCheck size={14} className="text-emerald-400" />
                  <span>Nursery Admin Dashboard</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: CATEGORIES */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-base text-white border-b border-stone-700/80 pb-2">
              Fruit Categories
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>
                <Link to="/category/mango" className="hover:text-[#E8862E] transition">
                  Grafted Mango Trees (Haribhanga, Katimon, Miyazaki)
                </Link>
              </li>
              <li>
                <Link to="/category/guava" className="hover:text-[#E8862E] transition">
                  Thai & Seedless Guava (Thai 7, Red Diamond)
                </Link>
              </li>
              <li>
                <Link to="/category/citrus" className="hover:text-[#E8862E] transition">
                  Lemon & Citrus (BARI Malta-1, Elachi Lemon)
                </Link>
              </li>
              <li>
                <Link to="/category/pomegranate" className="hover:text-[#E8862E] transition">
                  Hybrid Pomegranate & Anaar
                </Link>
              </li>
              <li>
                <Link to="/category/sapodilla" className="hover:text-[#E8862E] transition">
                  Grafted Chikoo / Sapodilla (Kalipatti)
                </Link>
              </li>
              <li>
                <Link to="/category/exotic" className="hover:text-[#E8862E] transition">
                  Exotic Dwarf Fruit Varieties
                </Link>
              </li>
              <li>
                <Link to="/shop?cat=combo" className="hover:text-[#E8862E] transition font-bold text-amber-300">
                  Value Saver Combo Packs
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: CONTACT INFO */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-base text-white border-b border-stone-700/80 pb-2">
              Nursery Contact Info
            </h4>
            <div className="space-y-2.5 text-xs text-stone-300">
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-[#E8862E] shrink-0 mt-0.5" />
                <span>
                  Hockey Stadium Rd, Nalapara, Sarusajai, Guwahati, Assam 781040
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone size={16} className="text-[#E8862E] shrink-0" />
                <a href="tel:+917002765701" className="hover:text-[#E8862E] font-semibold transition">
                  +91 70027 65701
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail size={16} className="text-[#E8862E] shrink-0" />
                <a href="mailto:support@talukdarnursery.com" className="hover:text-[#E8862E] transition">
                  support@talukdarnursery.com
                </a>
              </div>

              <div className="pt-2">
                <a
                  href="https://wa.me/918721909049"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2 px-3 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition shadow-sm"
                >
                  <MessageCircle size={15} />
                  <span>WhatsApp: +91 87219 09049</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR: COPYRIGHT + PAYMENT TRUST BADGES */}
        <div className="pt-8 border-t border-stone-700/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div className="text-center md:text-left space-y-1">
            <p>© {new Date().getFullYear()} Nurserylive. All rights reserved.</p>
            <p className="text-[11px] text-stone-400">
              Specialized in certified mother-plant scions, live plant courier shipping, and rooftop gardening setup.
            </p>
          </div>

          {/* Payment Trust Row */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-2 bg-[#2F5233]/40 p-2.5 rounded-2xl border border-stone-700/60 text-[11px]">
            <span className="font-bold text-stone-300 mr-1 flex items-center gap-1">
              <ShieldCheck size={14} className="text-emerald-400" /> We Accept:
            </span>
            <span className="bg-stone-800 text-stone-200 px-2 py-0.5 rounded font-medium border border-stone-700 flex items-center gap-1">
              <Banknote size={12} className="text-emerald-400" /> Cash on Delivery
            </span>
            <span className="bg-stone-800 text-stone-200 px-2 py-0.5 rounded font-medium border border-stone-700">
              UPI (GPay / PhonePe / Paytm)
            </span>
            <span className="bg-stone-800 text-stone-200 px-2 py-0.5 rounded font-medium border border-stone-700 flex items-center gap-1">
              <CreditCard size={12} className="text-amber-400" /> Bank Transfer / UPI
            </span>
            <span className="text-[10px] text-emerald-300 font-bold px-1">
              (Pay After Delivery)
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
