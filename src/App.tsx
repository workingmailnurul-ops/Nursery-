import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { FirestoreProvider } from './context/FirestoreContext';
import { CartProvider, useCart } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { ProtectedAdminRoute } from './components/ProtectedAdminRoute';
import { MainLayout } from './components/MainLayout';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { CategoryPage } from './pages/CategoryPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { OffersPage } from './pages/OffersPage';
import { CouponsPage } from './pages/CouponsPage';
import { TrendingPage } from './pages/TrendingPage';
import { FeaturedProductsPage } from './pages/FeaturedProductsPage';
import { BestSellersPage } from './pages/BestSellersPage';
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
import { ArticlesPage } from './pages/ArticlesPage';
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
    <AdminAuthProvider>
      <FirestoreProvider>
        <CartProvider>
          <WishlistProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<MainLayout />}>
                  <Route index element={<HomePageWrapper />} />
                  <Route path="shop" element={<ShopPage />} />
                  <Route path="products" element={<ShopPage />} />
                  <Route path="categories" element={<CategoriesPage />} />
                  <Route path="category/:slug" element={<CategoryPage />} />
                  <Route path="product/:slug" element={<ProductDetailPage />} />
                  <Route path="offers" element={<OffersPage />} />
                  <Route path="coupons" element={<CouponsPage />} />
                  <Route path="trending" element={<TrendingPage />} />
                  <Route path="featured" element={<FeaturedProductsPage />} />
                  <Route path="best-sellers" element={<BestSellersPage />} />
                  <Route path="bestsellers" element={<BestSellersPage />} />
                  <Route path="care-guide" element={<CareGuidePage />} />
                  <Route path="contact" element={<ContactPage />} />
                  <Route path="cart" element={<CartPage />} />
                  <Route path="wishlist" element={<WishlistPage />} />
                  <Route path="checkout" element={<CheckoutPage />} />
                  <Route path="orders" element={<OrdersPage />} />
                  <Route path="track-order" element={<TrackOrderPage />} />
                  <Route path="bulk-orders" element={<BulkOrdersPage />} />

                  {/* PROTECTED ADMIN ROUTES */}
                  <Route
                    path="admin"
                    element={
                      <ProtectedAdminRoute>
                        <AdminDashboardPage />
                      </ProtectedAdminRoute>
                    }
                  />
                  <Route
                    path="admin/*"
                    element={
                      <ProtectedAdminRoute>
                        <AdminDashboardPage />
                      </ProtectedAdminRoute>
                    }
                  />
                  <Route
                    path="admin/orders"
                    element={
                      <ProtectedAdminRoute>
                        <AdminOrdersPage />
                      </ProtectedAdminRoute>
                    }
                  />

                  <Route path="about" element={<AboutPage />} />
                  <Route path="blog" element={<BlogListingPage />} />
                  <Route path="blog/:slug" element={<BlogPostPage />} />
                  <Route path="blogs" element={<BlogListingPage />} />
                  <Route path="articles" element={<ArticlesPage />} />
                  <Route path="articles/:slug" element={<ArticlesPage />} />
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
      </FirestoreProvider>
    </AdminAuthProvider>
  );
}
