import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Truck,
  RotateCcw,
  ShieldCheck,
  FileText,
  Clock,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Phone,
} from 'lucide-react';

interface PolicyLayoutProps {
  activePolicy: 'shipping' | 'return' | 'privacy' | 'terms';
  children: React.ReactNode;
}

export const PolicyLayout: React.FC<PolicyLayoutProps> = ({ activePolicy, children }) => {
  const policies = [
    {
      id: 'shipping',
      title: 'Shipping & Delivery Policy',
      path: '/shipping-policy',
      icon: <Truck size={18} />,
    },
    {
      id: 'return',
      title: 'Return & 48-Hour Replacement',
      path: '/return-policy',
      icon: <RotateCcw size={18} />,
      badge: '48h Window',
    },
    {
      id: 'privacy',
      title: 'Privacy Policy',
      path: '/privacy-policy',
      icon: <ShieldCheck size={18} />,
    },
    {
      id: 'terms',
      title: 'Terms & Conditions',
      path: '/terms',
      icon: <FileText size={18} />,
    },
  ];

  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-16">
      {/* HEADER BANNER */}
      <section className="bg-gradient-to-b from-[#1C3320] to-[#2A5232] text-white py-10 px-4">
        <div className="max-w-6xl mx-auto text-center space-y-2">
          <span className="text-xs font-bold text-amber-300 uppercase tracking-widest">
            Talukdar Nursery Customer Care
          </span>
          <h1 className="text-2xl sm:text-4xl font-serif font-black text-amber-50">
            Store Policies & Customer Commitments
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm max-w-lg mx-auto">
            Transparent guidelines on express plant shipping, our 48-hour transit damage replacement guarantee, and data privacy.
          </p>
        </div>
      </section>

      {/* CONTENT WITH SIDEBAR */}
      <section className="max-w-6xl mx-auto px-4 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* SIDEBAR NAVIGATION */}
          <div className="md:col-span-4 bg-white rounded-2xl p-4 border border-stone-200 shadow-2xs space-y-1 sticky top-24">
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider px-3 py-1.5 block">
              Policy Index
            </span>
            {policies.map((p) => {
              const isActive = activePolicy === p.id;
              return (
                <Link
                  key={p.id}
                  to={p.path}
                  className={`flex items-center justify-between p-3 rounded-xl text-xs sm:text-sm font-bold transition ${
                    isActive
                      ? 'bg-[#2A8A3C] text-white shadow-xs'
                      : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {p.icon}
                    <span>{p.title}</span>
                  </div>
                  {p.badge && (
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                        isActive
                          ? 'bg-amber-300 text-stone-900'
                          : 'bg-rose-100 text-[#FF5252]'
                      }`}
                    >
                      {p.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            <div className="pt-4 border-t border-stone-100 mt-4 p-3 bg-stone-50 rounded-xl space-y-2 text-xs">
              <span className="font-bold text-stone-900 block flex items-center gap-1">
                <HelpCircle size={14} className="text-[#2A8A3C]" /> Need Policy Help?
              </span>
              <p className="text-stone-500 text-[11px] leading-relaxed">
                Our support team is available Mon-Sat to resolve transit damage or delivery inquiries.
              </p>
              <Link
                to="/contact"
                className="inline-block text-[#2A8A3C] font-bold hover:underline text-[11px]"
              >
                Contact Customer Desk &rarr;
              </Link>
            </div>
          </div>

          {/* MAIN POLICY CONTENT */}
          <div className="md:col-span-8 bg-white rounded-2xl p-6 sm:p-10 border border-stone-200 shadow-sm space-y-6 text-stone-800 text-xs sm:text-sm leading-relaxed">
            {children}
          </div>
        </div>
      </section>
    </div>
  );
};
