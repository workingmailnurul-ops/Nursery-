import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { WhatsAppButton } from './WhatsAppButton';
import { useCart } from '../context/CartContext';

export const MainLayout: React.FC = () => {
  const { cartCount } = useCart();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-stone-800 antialiased selection:bg-[#E8862E] selection:text-white">
      {/* Sticky Header */}
      <Header cartItemCount={cartCount} />

      {/* Main Outlet Page Content */}
      <main className="flex-1 w-full">
        <Outlet />
      </main>

      {/* Floating WhatsApp Button */}
      <WhatsAppButton />

      {/* Footer */}
      <Footer />
    </div>
  );
};
