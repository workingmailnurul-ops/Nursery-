import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const phone = '918011253258';
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
    'Hello Amargaon Nursery, I would like to inquire about your plants and gardening supplies.'
  )}`;

  return (
    <div className="fixed bottom-5 left-5 z-50 flex items-center gap-3">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with Amargaon Nursery"
        className="group relative flex items-center justify-center w-13 h-13 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-300"
      >
        <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-30 pointer-events-none" />
        <MessageCircle size={28} className="relative z-10 fill-white/10" />

        {/* Hover Label */}
        <span className="absolute left-full ml-3 px-3 py-1.5 bg-stone-900 text-white text-xs font-bold rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          Chat on WhatsApp (+91 8011253258)
        </span>
      </a>

      {/* Floating Tooltip Box */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-white border border-emerald-200 text-stone-800 text-xs px-3.5 py-2 rounded-2xl shadow-lg border-l-4 border-l-emerald-600 animate-in fade-in slide-in-from-left duration-300">
          <div>
            <span className="font-extrabold text-emerald-800 block">Amargaon Nursery Support</span>
            <span className="text-[11px] text-stone-500">Need help choosing plants? Chat on WhatsApp!</span>
          </div>
          <button
            onClick={() => setShowTooltip(false)}
            className="p-1 text-stone-400 hover:text-stone-600 rounded-md transition"
            aria-label="Close message"
          >
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
};
