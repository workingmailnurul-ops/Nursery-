import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  CheckCircle2,
  Sparkles,
  Building2,
  Headphones,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newInquiry = {
      id: 'INQ-' + Date.now().toString().slice(-6),
      ...formData,
      submittedAt: new Date().toLocaleString(),
    };

    try {
      const existing = localStorage.getItem('contactInquiries');
      const list = existing ? JSON.parse(existing) : [];
      list.unshift(newInquiry);
      localStorage.setItem('contactInquiries', JSON.stringify(list));
    } catch (err) {
      console.error('Failed to save inquiry:', err);
    }

    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: 'General Inquiry',
      message: '',
    });
    setSubmitted(false);
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-16">
      {/* HERO HEADER */}
      <section className="bg-gradient-to-b from-[#1C3320] to-[#2A5232] text-white py-12 sm:py-16 px-4">
        <div className="max-w-5xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#FF5252] text-white text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
            <Headphones size={14} />
            <span>We Are Here To Help</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-amber-50">
            Get In Touch With Amargaon Nursery
          </h1>

          <p className="text-stone-200 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Have questions about plant care, order tracking, grafted varieties, seeds, pots, or wholesale orders? Our customer care and agronomist team is ready to assist you.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT GRID */}
      <section className="max-w-7xl mx-auto px-4 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: DIRECT CONTACT CARDS & MAP */}
          <div className="lg:col-span-5 space-y-6">
            {/* DIRECT CONTACT LINKS */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
              <h2 className="text-lg font-serif font-bold text-stone-900 border-b border-stone-100 pb-3">
                Customer Support Channels
              </h2>

              <div className="space-y-3 text-xs sm:text-sm">
                {/* Phone Call */}
                <a
                  href="tel:+918011253258"
                  className="flex items-center gap-3.5 p-3 rounded-xl bg-stone-50 hover:bg-stone-100 transition border border-stone-200 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#2A8A3C]/10 text-[#2A8A3C] flex items-center justify-center shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <span className="text-stone-500 text-[10px] uppercase font-bold block">Phone Call Hotline</span>
                    <span className="font-bold text-stone-900 group-hover:text-[#2A8A3C]">+91 8011253258</span>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/918011253258"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3.5 p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 transition border border-emerald-200 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <span className="text-emerald-700 text-[10px] uppercase font-bold block">WhatsApp Fast Chat</span>
                    <span className="font-bold text-emerald-900 group-hover:underline">+91 8011253258</span>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:support@amargaonnursery.com"
                  className="flex items-center gap-3.5 p-3 rounded-xl bg-stone-50 hover:bg-stone-100 transition border border-stone-200 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#FF5252]/10 text-[#FF5252] flex items-center justify-center shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <span className="text-stone-500 text-[10px] uppercase font-bold block">Email Support Desk</span>
                    <span className="font-bold text-stone-900 group-hover:text-[#FF5252]">support@amargaonnursery.com</span>
                  </div>
                </a>

                {/* Operating Hours */}
                <div className="flex items-center gap-3.5 p-3 rounded-xl bg-amber-50/60 border border-amber-200/60">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-700 flex items-center justify-center shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <span className="text-amber-800 text-[10px] uppercase font-bold block">Support Hours</span>
                    <span className="font-bold text-stone-900">Mon - Sat: 9:00 AM - 7:00 PM IST</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ADDRESS & GOOGLE MAPS SECTION */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="text-[#2A8A3C]" size={20} />
                  <h3 className="font-serif font-bold text-stone-900 text-sm">
                    Amargaon Nursery Location
                  </h3>
                </div>
                <a
                  href="https://maps.google.com/?q=Rani+Gate,+Azara,+Guwahati,+Assam+781017"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-bold text-[#2A8A3C] hover:underline"
                >
                  Open in Maps ↗
                </a>
              </div>

              <p className="text-stone-700 text-xs font-semibold leading-relaxed">
                Rani Gate, Azara, Guwahati, Assam – 781017
              </p>

              {/* Embedded Google Maps */}
              <div className="relative rounded-xl overflow-hidden border border-stone-200 h-64 shadow-inner">
                <iframe
                  title="Amargaon Nursery Location Map"
                  src="https://maps.google.com/maps?q=Rani+Gate,+Azara,+Guwahati,+Assam+781017&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* RIGHT: CONTACT FORM */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                Send Us A Message
              </h2>
              <p className="text-stone-500 text-xs sm:text-sm mt-1">
                Fill out the form below and our plant care executive will reply to your message within 2-4 business hours.
              </p>
            </div>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center space-y-4">
                <div className="w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 size={32} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-emerald-900">
                    Message Received!
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-800 font-medium mt-1">
                    Thank you for contacting Amargaon Nursery. Our plant care desk will respond to <strong>{formData.email}</strong> shortly.
                  </p>
                </div>

                <button
                  onClick={handleReset}
                  className="bg-[#2A8A3C] hover:bg-[#226e30] text-white text-xs font-bold px-5 py-2.5 rounded-lg transition shadow-xs cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block font-bold text-stone-700">
                      Your Full Name <span className="text-[#FF5252]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-800 focus:outline-none focus:border-[#2A8A3C] focus:bg-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block font-bold text-stone-700">
                      Email Address <span className="text-[#FF5252]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. priya@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-800 focus:outline-none focus:border-[#2A8A3C] focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block font-bold text-stone-700">
                      Phone Number <span className="text-[#FF5252]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-800 focus:outline-none focus:border-[#2A8A3C] focus:bg-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block font-bold text-stone-700">
                      Subject / Department
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-800 focus:outline-none focus:border-[#2A8A3C] focus:bg-white"
                    >
                      <option>General Inquiry</option>
                      <option>Order Tracking & Delivery</option>
                      <option>Plant Care & Agronomy Advice</option>
                      <option>Transit Damage / Replacement Request</option>
                      <option>Wholesale & Corporate Order</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-stone-700">
                    Message <span className="text-[#FF5252]">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Describe how we can assist you with your plant selection or order..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-800 focus:outline-none focus:border-[#2A8A3C] focus:bg-white"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#2A8A3C] hover:bg-[#226e30] text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition shadow-md cursor-pointer text-sm"
                  >
                    <Send size={18} />
                    <span>Send Message</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
