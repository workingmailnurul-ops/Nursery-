import React from 'react';
import { PolicyLayout } from '../components/PolicyLayout';
import {
  Truck,
  RotateCcw,
  ShieldCheck,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
} from 'lucide-react';
import { Link } from 'react-router-dom';

/* 1. SHIPPING POLICY PAGE */
export const ShippingPolicyPage: React.FC = () => {
  return (
    <PolicyLayout activePolicy="shipping">
      <div className="space-y-6">
        <div className="border-b border-stone-200 pb-4">
          <span className="text-xs font-bold text-[#2A8A3C] uppercase tracking-wider">
            Talukdar Nursery Logistics
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-stone-900 mt-1">
            Shipping & Delivery Policy
          </h1>
          <p className="text-stone-500 text-xs mt-1">
            Last updated: July 2026 • Live plant courier shipping guidelines across India
          </p>
        </div>

        {/* HIGHLIGHT BOX */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3 text-emerald-900">
          <Truck size={20} className="text-[#2A8A3C] shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs">
            <span className="font-bold block">100% Transit Safe Eco-Packaging</span>
            <p>
              Every live plant order is packed with hydrogel moisture gel around roots, coco-peat insulation, and protective corrugated frames designed to survive up to 10 days in courier transport.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-serif font-bold text-stone-900">
            1. Dispatch Timelines
          </h3>
          <p>
            Standard plant orders are processed, watered, and dispatched within <strong>24 to 48 business hours</strong> from our central Pune and regional yards. Bulk orders or specialized grafted fruit tree varieties may take 2-3 business days for custom crate boxing.
          </p>

          <h3 className="text-base font-serif font-bold text-stone-900">
            2. Delivery Partners & Pincode Coverage
          </h3>
          <p>
            We partner with India's leading express logistics services including <strong>BlueDart, Delhivery, DTDC, and India Post Speed Post</strong> to cover over 19,000+ pincodes nationwide.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-stone-700">
            <li><strong>Metro Cities:</strong> 2 to 4 business days after dispatch</li>
            <li><strong>Tier 2 & Tier 3 Cities:</strong> 3 to 6 business days after dispatch</li>
            <li><strong>Remote & Hill Regions:</strong> 5 to 8 business days via Speed Post</li>
          </ul>

          <h3 className="text-base font-serif font-bold text-stone-900">
            3. Shipping Charges
          </h3>
          <p>
            Standard shipping is calculated based on weight and box dimensions at checkout. Orders above ₹999 qualify for <strong>FREE Standard Delivery</strong> across eligible pincodes.
          </p>

          <h3 className="text-base font-serif font-bold text-stone-900">
            4. Order Tracking
          </h3>
          <p>
            Once dispatched, a tracking AWB number and live SMS/WhatsApp updates are sent to your registered phone number. You can also monitor real-time shipment status on our <Link to="/track-order" className="text-[#2A8A3C] font-bold underline">Track Order</Link> page.
          </p>
        </div>
      </div>
    </PolicyLayout>
  );
};

/* 2. RETURN & REPLACEMENT POLICY PAGE */
export const ReturnPolicyPage: React.FC = () => {
  return (
    <PolicyLayout activePolicy="return">
      <div className="space-y-6">
        <div className="border-b border-stone-200 pb-4">
          <span className="text-xs font-bold text-[#FF5252] uppercase tracking-wider">
            Customer Protection
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-stone-900 mt-1">
            Return & 48-Hour Replacement Policy
          </h1>
          <p className="text-stone-500 text-xs mt-1">
            Last updated: July 2026 • Time-bound live plant guarantee
          </p>
        </div>

        {/* TIME-BOUND CRITICAL WARNING BOX */}
        <div className="bg-rose-50 border-2 border-[#FF5252]/40 rounded-xl p-5 space-y-2 text-stone-900">
          <div className="flex items-center gap-2 text-[#FF5252] font-black text-sm">
            <AlertTriangle size={20} />
            <span>CRITICAL: 48-Hour Transit Damage Replacement Guarantee</span>
          </div>
          <p className="text-xs text-stone-700 leading-relaxed">
            Live plants are perishable living organisms. If your plant arrives severely damaged, snapped, wilted beyond recovery, or with a broken graft joint, you must notify us within <strong>48 hours of delivery</strong> to claim a 100% FREE replacement plant or store refund!
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-serif font-bold text-stone-900">
            1. How To Submit A 48-Hour Replacement Claim
          </h3>
          <p>
            To submit a claim within the 48-hour post-delivery window:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-xs text-stone-700">
            <li>
              Take a clear photograph or unboxing video showing the damaged plant alongside the shipping label box tag.
            </li>
            <li>
              Send the photos via WhatsApp to <strong>+91 87219 09049</strong> or email <strong>support@talukdarnursery.com</strong> with your Order ID.
            </li>
            <li>
              Our horticulture review team will verify the claim and dispatch a fresh replacement plant free of cost within 24 hours!
            </li>
          </ol>

          <h3 className="text-base font-serif font-bold text-stone-900">
            2. Non-Perishable Goods (Pots, Seeds & Accessories)
          </h3>
          <p>
            Ceramic pots, plastic planters, seeds, and gardening tools carry a <strong>7-Day Replacement Guarantee</strong> against manufacturing defects or transit breakage.
          </p>

          <h3 className="text-base font-serif font-bold text-stone-900">
            3. Exceptions & Natural Plant Characteristics
          </h3>
          <p>
            Please note that minor leaf yellowing, loss of 1-2 lower leaves during 4-day transit, or temporary minor bent stem due to dark packaging are normal transit stress reactions. With immediate deep hydration and 3 days of indirect sunlight rest, healthy plants bounce back completely.
          </p>
        </div>
      </div>
    </PolicyLayout>
  );
};

/* 3. PRIVACY POLICY PAGE */
export const PrivacyPolicyPage: React.FC = () => {
  return (
    <PolicyLayout activePolicy="privacy">
      <div className="space-y-6">
        <div className="border-b border-stone-200 pb-4">
          <span className="text-xs font-bold text-[#2A8A3C] uppercase tracking-wider">
            Data Safety
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-stone-900 mt-1">
            Privacy Policy
          </h1>
          <p className="text-stone-500 text-xs mt-1">
            Last updated: July 2026 • How we protect your personal information
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-serif font-bold text-stone-900">
            1. Information We Collect
          </h3>
          <p>
            We collect personal information necessary to fulfill your plant orders, including your name, delivery address, phone number, and email address.
          </p>

          <h3 className="text-base font-serif font-bold text-stone-900">
            2. Payment Security
          </h3>
          <p>
            All online transactions (UPI, Credit/Debit cards, Net Banking) are processed via PCI-DSS compliant payment gateways with 256-bit SSL encryption. Talukdar Nursery never stores your credit card or CVV credentials.
          </p>

          <h3 className="text-base font-serif font-bold text-stone-900">
            3. Zero Spam Guarantee
          </h3>
          <p>
            We respect your privacy. We will never sell, rent, or trade your personal information or mobile contact details to third-party marketing companies.
          </p>
        </div>
      </div>
    </PolicyLayout>
  );
};

/* 4. TERMS & CONDITIONS PAGE */
export const TermsPage: React.FC = () => {
  return (
    <PolicyLayout activePolicy="terms">
      <div className="space-y-6">
        <div className="border-b border-stone-200 pb-4">
          <span className="text-xs font-bold text-[#2A8A3C] uppercase tracking-wider">
            Legal Terms
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-stone-900 mt-1">
            Terms & Conditions
          </h1>
          <p className="text-stone-500 text-xs mt-1">
            Last updated: July 2026 • General terms of website usage & purchases
          </p>
        </div>

        <div className="space-y-4">
          <p>
            By accessing Talukdar Nursery or purchasing plants and gardening accessories from our website, you agree to comply with our store policies, shipping guidelines, and replacement terms.
          </p>
          <h3 className="text-base font-serif font-bold text-stone-900">
            1. Plant Growth & Environmental Variables
          </h3>
          <p>
            Living plants require proper sunlight, watering, and soil care. While Talukdar Nursery guarantees healthy live plant arrival and true-to-variety mother scion origin, long-term fruiting and growth depend on local climatic conditions and gardener maintenance.
          </p>
        </div>
      </div>
    </PolicyLayout>
  );
};
