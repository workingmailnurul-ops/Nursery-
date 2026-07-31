import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { MainLayout } from './components/MainLayout';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { CategoryPage } from './pages/CategoryPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CareGuidePage } from './pages/CareGuidePage';
import { ContactPage } from './pages/ContactPage';
import { CartPage } from './pages/CartPage';
import { WishlistPage } from './pages/WishlistPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrdersPage } from './pages/OrdersPage';
import { TrackOrderPage } from './pages/TrackOrderPage';
import { BulkOrdersPage } from './pages/BulkOrdersPage';
import { AdminOrdersPage } from './pages/AdminOrdersPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';

import { AboutPage } from './pages/AboutPage';
import { BlogListingPage } from './pages/BlogListingPage';
import { BlogPostPage } from './pages/BlogPostPage';
import {
  ShippingPolicyPage,
  ReturnPolicyPage,
  PrivacyPolicyPage,
  TermsPage,
} from './pages/PoliciesPage';

function HomePageWrapper() {
  const { addToCart } = useCart();
  return <HomePage onAddToCart={addToCart} />;
}

export default function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePageWrapper />} />
              <Route path="shop" element={<ShopPage />} />
              <Route path="category/:slug" element={<CategoryPage />} />
              <Route path="product/:slug" element={<ProductDetailPage />} />
              <Route path="care-guide" element={<CareGuidePage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="wishlist" element={<WishlistPage />} />
              <Route path="checkout" element={<CheckoutPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="track-order" element={<TrackOrderPage />} />
            <Route path="bulk-orders" element={<BulkOrdersPage />} />
            <Route path="admin" element={<AdminDashboardPage />} />
            <Route path="admin/*" element={<AdminDashboardPage />} />
            <Route path="admin/orders" element={<AdminOrdersPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="blog" element={<BlogListingPage />} />
            <Route path="blog/:slug" element={<BlogPostPage />} />
            <Route path="policies" element={<ShippingPolicyPage />} />
            <Route path="shipping-policy" element={<ShippingPolicyPage />} />
            <Route path="return-policy" element={<ReturnPolicyPage />} />
            <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="terms" element={<TermsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </WishlistProvider>
  </CartProvider>
  );
}


