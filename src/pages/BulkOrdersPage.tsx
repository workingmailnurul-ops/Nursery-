import React, { useState } from 'react';
import {
  Building2,
  Truck,
  ShieldCheck,
  FileText,
  CheckCircle2,
  ChevronDown,
  HelpCircle,
  Package,
  Calendar,
  Phone,
  Mail,
  User,
  MapPin,
  Trees,
  Award,
  Send,
  Sparkles,
} from 'lucide-react';

interface BulkEnquiry {
  id: string;
  name: string;
  businessName?: string;
  phone: string;
  email: string;
  city: string;
  plantDetails: string;
  preferredDeliveryDate: string;
  submittedAt: string;
}

export const BulkOrdersPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    phone: '',
    email: '',
    city: '',
    plantDetails: '',
    preferredDeliveryDate: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [lastSubmittedId, setLastSubmittedId] = useState<string | null>(null);

  // FAQ accordion open states
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newEnquiry: BulkEnquiry = {
      id: 'BLK-' + Date.now().toString().slice(-6),
      name: formData.name.trim(),
      businessName: formData.businessName.trim() || undefined,
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      city: formData.city.trim(),
      plantDetails: formData.plantDetails.trim(),
      preferredDeliveryDate: formData.preferredDeliveryDate,
      submittedAt: new Date().toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
    };

    // Save to localStorage
    try {
      const existing = localStorage.getItem('bulkEnquiries');
      const enquiries: BulkEnquiry[] = existing ? JSON.parse(existing) : [];
      enquiries.unshift(newEnquiry);
      localStorage.setItem('bulkEnquiries', JSON.stringify(enquiries));
    } catch (err) {
      console.error('Failed to save bulk enquiry to localStorage:', err);
    }

    setLastSubmittedId(newEnquiry.id);
    setSubmitted(true);
  };

  const handleResetForm = () => {
    setFormData({
      name: '',
      businessName: '',
      phone: '',
      email: '',
      city: '',
      plantDetails: '',
      preferredDeliveryDate: '',
    });
    setSubmitted(false);
    setLastSubmittedId(null);
  };

  const benefits = [
    {
      icon: <Award className="w-6 h-6 text-[#2A8A3C]" />,
      title: 'Tiered Bulk Pricing',
      description:
        'Save up to 35% on volume orders. Transparent wholesale slabs for 25+, 50+, 100+, and commercial orchard quantities.',
    },
    {
      icon: <Building2 className="w-6 h-6 text-[#2A8A3C]" />,
      title: 'Dedicated Account Manager',
      description:
        'Direct access to an experienced agronomist for variety selection, soil compatibility advice, and dispatch coordination.',
    },
    {
      icon: <Truck className="w-6 h-6 text-[#2A8A3C]" />,
      title: 'Custom Transport Packaging',
      description:
        'Reinforced wooden crates, moisture-sealed root balls, and ventilated frame boxing engineered for 0% damage transit.',
    },
    {
      icon: <FileText className="w-6 h-6 text-[#2A8A3C]" />,
      title: 'GST Invoice On Request',
      description:
        'Official tax invoices provided with full GST input credit compliance for farms, hotels, corporate, and government contracts.',
    },
  ];

  const faqs = [
    {
      question: 'What is the minimum order quantity for bulk pricing?',
      answer:
        'Bulk tiered rates start from as low as 25 saplings or items of the same or mixed varieties. For commercial orchard orders exceeding 100+ saplings, special custom quotes and scheduled grafting reservations are available.',
    },
    {
      question: 'How long does dispatch and delivery take for bulk plant orders?',
      answer:
        'Standard bulk orders are processed and packed in 2-3 business days. Specialized freight transit across India typically takes 3-6 business days depending on destination pincode and volume.',
    },
    {
      question: 'How are large quantities of live plants safely packaged for transport?',
      answer:
        'Plants are secured in custom ventilated wooden crates or high-density reinforced corrugated cartons. Roots are encased in nutrient coco-peat and hydrogel moisture retention wrap to ensure fresh survival up to 10 days in transit.',
    },
    {
      question: 'What are the payment terms and invoice options for bulk buyers?',
      answer:
        'We accept UPI, NEFT/RTGS bank transfers, and corporate cards. We issue formal Proforma Invoices prior to dispatch and deliver GST Tax Invoices upon dispatch for business expense and tax credit purposes.',
    },
  ];

  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-16">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-b from-[#1C3320] to-[#2A5232] text-white py-12 sm:py-16 px-4">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#FF5252] text-white text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
            <Sparkles size={14} />
            <span>Wholesale & Commercial Nursery</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-amber-50 max-w-3xl mx-auto leading-tight">
            Bulk & Wholesale Orders for Farms, Sellers & Projects
          </h1>

          <p className="text-stone-200 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Partner with Talukdar Nursery for high-yield grafted fruit trees, ornamental plants, ceramic planters, and garden supplies at factory-direct wholesale rates with nationwide freight handling.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-6 text-xs text-emerald-200 font-semibold">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-[#FF5252]" /> Guaranteed Graft Authenticity
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-[#FF5252]" /> Crate Freight Logistics
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-[#FF5252]" /> GST Input Tax Credit
            </span>
          </div>
        </div>
      </section>

      {/* BENEFITS GRID */}
      <section className="max-w-7xl mx-auto px-4 -mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {benefits.map((b, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-5 border border-stone-200 shadow-sm space-y-2 hover:border-[#2A8A3C] transition"
            >
              <div className="w-10 h-10 rounded-lg bg-[#2A8A3C]/10 flex items-center justify-center">
                {b.icon}
              </div>
              <h3 className="font-bold text-stone-900 text-sm">{b.title}</h3>
              <p className="text-stone-500 text-xs leading-relaxed">{b.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FORM & INFO SECTION */}
      <section className="max-w-7xl mx-auto px-4 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ENQUIRY FORM */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 flex items-center gap-2">
                <Trees className="text-[#2A8A3C]" size={24} />
                <span>Submit Bulk Order Enquiry</span>
              </h2>
              <p className="text-stone-500 text-xs sm:text-sm mt-1">
                Fill out the details below and our commercial sales desk will get back to you with custom slab pricing within 24 hours.
              </p>
            </div>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center space-y-4">
                <div className="w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 size={32} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-emerald-900">
                    Enquiry Submitted Successfully!
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-800 font-medium mt-1">
                    Our bulk sales team will contact you within 24 hours.
                  </p>
                  {lastSubmittedId && (
                    <span className="inline-block bg-emerald-100 text-emerald-900 text-xs font-mono font-bold px-3 py-1 rounded-md mt-2">
                      Reference ID: {lastSubmittedId}
                    </span>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleResetForm}
                    className="bg-[#2A8A3C] hover:bg-[#226e30] text-white text-xs font-bold px-5 py-2.5 rounded-lg transition shadow-xs cursor-pointer"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="block font-bold text-stone-700">
                      Full Name <span className="text-[#FF5252]">*</span>
                    </label>
                    <div className="relative">
                      <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ramesh Kumar"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-800 focus:outline-none focus:border-[#2A8A3C] focus:bg-white"
                      />
                    </div>
                  </div>

                  {/* Business / Farm Name */}
                  <div className="space-y-1">
                    <label className="block font-bold text-stone-700">
                      Business / Farm Name <span className="text-stone-400 font-normal">(Optional)</span>
                    </label>
                    <div className="relative">
                      <Building2 size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                      <input
                        type="text"
                        placeholder="e.g. Green Acres Farm / Sunrise Resorts"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-800 focus:outline-none focus:border-[#2A8A3C] focus:bg-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="block font-bold text-stone-700">
                      Phone / WhatsApp Number <span className="text-[#FF5252]">*</span>
                    </label>
                    <div className="relative">
                      <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 9876543210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-800 focus:outline-none focus:border-[#2A8A3C] focus:bg-white"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="block font-bold text-stone-700">
                      Email Address <span className="text-[#FF5252]">*</span>
                    </label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                      <input
                        type="email"
                        required
                        placeholder="e.g. contact@greenacres.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-800 focus:outline-none focus:border-[#2A8A3C] focus:bg-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* City */}
                  <div className="space-y-1">
                    <label className="block font-bold text-stone-700">
                      City / Location <span className="text-[#FF5252]">*</span>
                    </label>
                    <div className="relative">
                      <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Pune, Maharashtra"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-800 focus:outline-none focus:border-[#2A8A3C] focus:bg-white"
                      />
                    </div>
                  </div>

                  {/* Preferred Delivery Date */}
                  <div className="space-y-1">
                    <label className="block font-bold text-stone-700">
                      Preferred Delivery Date <span className="text-[#FF5252]">*</span>
                    </label>
                    <div className="relative">
                      <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                      <input
                        type="date"
                        required
                        value={formData.preferredDeliveryDate}
                        onChange={(e) =>
                          setFormData({ ...formData, preferredDeliveryDate: e.target.value })
                        }
                        className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-800 focus:outline-none focus:border-[#2A8A3C] focus:bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Plant Types & Quantities Needed */}
                <div className="space-y-1">
                  <label className="block font-bold text-stone-700">
                    Plant Types & Approximate Quantities Needed <span className="text-[#FF5252]">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="List the plant varieties, pots, or gardening items and required quantities (e.g., 50x Grafted Alphonso Mango, 100x Ceramic Planters 8-inch, 20x Areca Palm)..."
                    value={formData.plantDetails}
                    onChange={(e) => setFormData({ ...formData, plantDetails: e.target.value })}
                    className="w-full p-3 bg-stone-50 border border-stone-300 rounded-lg text-stone-800 focus:outline-none focus:border-[#2A8A3C] focus:bg-white"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#2A8A3C] hover:bg-[#226e30] text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition shadow-md cursor-pointer text-sm"
                  >
                    <Send size={18} />
                    <span>Submit Bulk Order Enquiry</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* RIGHT SIDE: DIRECT CONTACT & WHOLESALE HIGHLIGHTS */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#1C3320] text-white rounded-2xl p-6 space-y-4 shadow-md">
              <h3 className="font-serif font-bold text-lg text-amber-50">
                Direct Bulk Sales Desk
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                Need urgent quotations or custom contractual farming agreements? Speak directly with our commercial desk manager.
              </p>

              <div className="space-y-3 pt-2 text-xs font-medium">
                <a
                  href="tel:+918000123456"
                  className="flex items-center gap-3 bg-white/10 hover:bg-white/20 p-3 rounded-xl transition text-emerald-300"
                >
                  <Phone size={18} className="text-[#FF5252]" />
                  <div>
                    <span className="block text-stone-400 text-[10px]">Commercial Phone</span>
                    <span className="font-bold text-white text-sm">+91 8000 123 456</span>
                  </div>
                </a>

                <a
                  href="mailto:wholesale@talukdarnursery.com"
                  className="flex items-center gap-3 bg-white/10 hover:bg-white/20 p-3 rounded-xl transition text-emerald-300"
                >
                  <Mail size={18} className="text-[#FF5252]" />
                  <div>
                    <span className="block text-stone-400 text-[10px]">Wholesale Email</span>
                    <span className="font-bold text-white text-sm">wholesale@talukdarnursery.com</span>
                  </div>
                </a>
              </div>
            </div>

            {/* WHOLESALE CATEGORIES CARD */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-3">
              <h4 className="font-bold text-stone-900 text-sm">Target Buyers & Use Cases</h4>
              <ul className="space-y-2 text-xs text-stone-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-[#2A8A3C] shrink-0 mt-0.5" />
                  <span><strong>Commercial Fruit Orchards:</strong> High-yield grafted mango, guava, and citrus trees.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-[#2A8A3C] shrink-0 mt-0.5" />
                  <span><strong>Hotels & Resorts:</strong> Landscape greenery, indoor Palms, and decorative ceramic planters.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-[#2A8A3C] shrink-0 mt-0.5" />
                  <span><strong>Event Planners:</strong> Eco-friendly return gifts, kokedamas, and succulents.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-[#2A8A3C] shrink-0 mt-0.5" />
                  <span><strong>Plant Resellers & Retail Nurseries:</strong> Wholesale stock supply with profit margins.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ ACCORDION SECTION */}
      <section className="max-w-4xl mx-auto px-4 pt-16">
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2A8A3C] uppercase tracking-wider">
            <HelpCircle size={16} /> Bulk Purchasing FAQ
          </div>
          <h2 className="text-2xl font-serif font-bold text-stone-900">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-stone-200 overflow-hidden transition"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-stone-50 transition cursor-pointer"
              >
                <span className="font-bold text-stone-800 text-sm sm:text-base">
                  {faq.question}
                </span>
                <ChevronDown
                  size={18}
                  className={`text-stone-400 shrink-0 transition-transform duration-200 ${
                    openFaq === idx ? 'rotate-180 text-[#2A8A3C]' : ''
                  }`}
                />
              </button>

              {openFaq === idx && (
                <div className="px-4 pb-5 pt-0 sm:px-5 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
