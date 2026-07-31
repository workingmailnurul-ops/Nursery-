import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Layers,
  ShoppingBag,
  Users,
  Tag,
  BookOpen,
  BarChart2,
  Settings,
  Menu,
  X,
  Search,
  Bell,
  Sparkles,
  ExternalLink,
  ChevronDown,
  LogOut,
  Plus,
  AlertCircle,
  CheckCircle2,
  Sprout,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import { DashboardOverview } from './DashboardOverview';
import { ProductsManager } from './ProductsManager';
import { CategoriesManager } from './CategoriesManager';
import { OrdersManager } from './OrdersManager';
import { CustomersManager } from './CustomersManager';
import { CouponsManager } from './CouponsManager';
import { BlogsManager } from './BlogsManager';
import { AnalyticsView } from './AnalyticsView';
import { SettingsView } from './SettingsView';

import { PRODUCTS } from '../../data/products';
import { PlacedOrder, Product, OrderStatus } from '../../types';
import {
  INITIAL_CUSTOMERS,
  INITIAL_COUPONS,
  INITIAL_CATEGORIES,
  INITIAL_BLOG_POSTS,
  AdminCustomer,
  Coupon,
  AdminCategory,
  AdminBlogPost,
} from './adminData';

export const AdminDashboardPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Active Section Tab (Default 'dashboard')
  const activeTab = searchParams.get('tab') || 'dashboard';

  // Mobile Sidebar Drawer open state
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Top Search state
  const [topSearch, setTopSearch] = useState('');

  // Notifications dropdown open state
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Quick Action dropdown open state
  const [isQuickActionOpen, setIsQuickActionOpen] = useState(false);

  // Admin User Profile menu open state
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  // Persistent States
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('green_heaven_custom_products');
      return saved ? JSON.parse(saved) : PRODUCTS;
    } catch {
      return PRODUCTS;
    }
  });

  const [orders, setOrders] = useState<PlacedOrder[]>(() => {
    try {
      const saved1 = localStorage.getItem('green_heaven_placed_orders');
      const saved2 = localStorage.getItem('orders');
      if (saved1) return JSON.parse(saved1);
      if (saved2) return JSON.parse(saved2);
      return [];
    } catch {
      return [];
    }
  });

  const [customers, setCustomers] = useState<AdminCustomer[]>(() => {
    try {
      const saved = localStorage.getItem('green_heaven_admin_customers');
      return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
    } catch {
      return INITIAL_CUSTOMERS;
    }
  });

  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    try {
      const saved = localStorage.getItem('green_heaven_admin_coupons');
      return saved ? JSON.parse(saved) : INITIAL_COUPONS;
    } catch {
      return INITIAL_COUPONS;
    }
  });

  const [categories, setCategories] = useState<AdminCategory[]>(() => {
    try {
      const saved = localStorage.getItem('green_heaven_admin_categories');
      return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
    } catch {
      return INITIAL_CATEGORIES;
    }
  });

  const [blogPosts, setBlogPosts] = useState<AdminBlogPost[]>(() => {
    try {
      const saved = localStorage.getItem('green_heaven_admin_blogs');
      return saved ? JSON.parse(saved) : INITIAL_BLOG_POSTS;
    } catch {
      return INITIAL_BLOG_POSTS;
    }
  });

  // Save changes to LocalStorage
  const handleUpdateOrders = (newOrders: PlacedOrder[]) => {
    setOrders(newOrders);
    localStorage.setItem('green_heaven_placed_orders', JSON.stringify(newOrders));
    localStorage.setItem('orders', JSON.stringify(newOrders));
  };

  const handleUpdateOrderStatus = (orderId: string, status: OrderStatus) => {
    const updated = orders.map((o) => (o.orderId === orderId ? { ...o, status } : o));
    handleUpdateOrders(updated);
  };

  const handleAddProduct = (newProd: Product) => {
    const updated = [newProd, ...products];
    setProducts(updated);
    localStorage.setItem('green_heaven_custom_products', JSON.stringify(updated));
  };

  const handleUpdateProduct = (updatedProd: Product) => {
    const updated = products.map((p) => (p.id === updatedProd.id ? updatedProd : p));
    setProducts(updated);
    localStorage.setItem('green_heaven_custom_products', JSON.stringify(updated));
  };

  const handleDeleteProduct = (productId: string) => {
    const updated = products.filter((p) => p.id !== productId);
    setProducts(updated);
    localStorage.setItem('green_heaven_custom_products', JSON.stringify(updated));
  };

  const handleAddCategory = (cat: AdminCategory) => {
    const updated = [cat, ...categories];
    setCategories(updated);
    localStorage.setItem('green_heaven_admin_categories', JSON.stringify(updated));
  };

  const handleUpdateCategory = (cat: AdminCategory) => {
    const updated = categories.map((c) => (c.id === cat.id ? cat : c));
    setCategories(updated);
    localStorage.setItem('green_heaven_admin_categories', JSON.stringify(updated));
  };

  const handleAddCustomer = (cust: AdminCustomer) => {
    const updated = [cust, ...customers];
    setCustomers(updated);
    localStorage.setItem('green_heaven_admin_customers', JSON.stringify(updated));
  };

  const handleAddCoupon = (coupon: Coupon) => {
    const updated = [coupon, ...coupons];
    setCoupons(updated);
    localStorage.setItem('green_heaven_admin_coupons', JSON.stringify(updated));
  };

  const handleUpdateCoupon = (coupon: Coupon) => {
    const updated = coupons.map((c) => (c.id === coupon.id ? coupon : c));
    setCoupons(updated);
    localStorage.setItem('green_heaven_admin_coupons', JSON.stringify(updated));
  };

  const handleDeleteCoupon = (id: string) => {
    const updated = coupons.filter((c) => c.id !== id);
    setCoupons(updated);
    localStorage.setItem('green_heaven_admin_coupons', JSON.stringify(updated));
  };

  const handleAddBlog = (post: AdminBlogPost) => {
    const updated = [post, ...blogPosts];
    setBlogPosts(updated);
    localStorage.setItem('green_heaven_admin_blogs', JSON.stringify(updated));
  };

  const handleUpdateBlog = (post: AdminBlogPost) => {
    const updated = blogPosts.map((b) => (b.id === post.id ? post : b));
    setBlogPosts(updated);
    localStorage.setItem('green_heaven_admin_blogs', JSON.stringify(updated));
  };

  const handleDeleteBlog = (id: string) => {
    const updated = blogPosts.filter((b) => b.id !== id);
    setBlogPosts(updated);
    localStorage.setItem('green_heaven_admin_blogs', JSON.stringify(updated));
  };

  const switchTab = (tabId: string) => {
    setSearchParams({ tab: tabId });
    setIsMobileSidebarOpen(false);
  };

  const pendingCount = orders.filter((o) => o.status === 'Placed' || o.status === 'Processing').length;

  // Sidebar Menu Items Definition
  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package, badge: products.length },
    { id: 'categories', label: 'Categories', icon: Layers, badge: categories.length },
    { id: 'orders', label: 'Orders', icon: ShoppingBag, badge: pendingCount, badgeAlert: pendingCount > 0 },
    { id: 'customers', label: 'Customers', icon: Users, badge: customers.length },
    { id: 'coupons', label: 'Coupons', icon: Tag, badge: coupons.filter((c) => c.isActive).length },
    { id: 'blogs', label: 'Blogs & Guides', icon: BookOpen, badge: blogPosts.length },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-stone-100 flex text-stone-900 font-sans">
      {/* MOBILE SIDEBAR DRAWER OVERLAY */}
      {isMobileSidebarOpen && (
        <div
          onClick={() => setIsMobileSidebarOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* SIDEBAR NAVIGATION (DARK GREEN SCHEME) */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#1E3A20] text-white flex flex-col justify-between transition-transform duration-300 ease-in-out shrink-0 ${
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-emerald-900/60 flex items-center justify-between">
          <Link to="/admin" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition">
              <Sprout size={22} />
            </div>
            <div>
              <h1 className="font-serif font-black text-lg tracking-tight leading-none text-white flex items-center gap-1.5">
                Talukdar
              </h1>
              <span className="text-[10px] text-emerald-300 font-bold uppercase tracking-wider block mt-1">
                Admin Control Desk
              </span>
            </div>
          </Link>

          <button
            onClick={() => setIsMobileSidebarOpen(false)}
            className="p-1 text-emerald-300 hover:text-white lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Section Links */}
        <nav className="p-4 space-y-1 overflow-y-auto flex-1 text-xs font-bold">
          <span className="text-[10px] uppercase font-extrabold text-emerald-400/70 tracking-wider px-3 mb-2 block">
            Core Modules
          </span>

          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => switchTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#2F5233] text-white shadow-sm border border-emerald-500/30 font-extrabold'
                    : 'text-stone-300 hover:bg-emerald-900/40 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    size={18}
                    className={isActive ? 'text-emerald-400' : 'text-emerald-300/70'}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge !== undefined && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                      item.badgeAlert
                        ? 'bg-amber-500 text-stone-950 font-black animate-pulse'
                        : isActive
                        ? 'bg-emerald-800 text-emerald-200'
                        : 'bg-emerald-900/80 text-emerald-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer Admin Profile Card & Public Site Switch */}
        <div className="p-4 border-t border-emerald-900/60 space-y-3 bg-[#172D19]">
          <Link
            to="/"
            className="w-full py-2 px-3 bg-emerald-900/60 hover:bg-emerald-800/80 text-emerald-200 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 border border-emerald-800/50"
          >
            <ExternalLink size={14} /> View Live Customer Store
          </Link>

          <div className="flex items-center gap-3 pt-1">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white font-bold flex items-center justify-center text-xs border border-emerald-400/30">
              TN
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-xs font-bold text-white block truncate">Nursery Admin</span>
              <span className="text-[10px] text-emerald-300 block truncate">admin@talukdarnursery.com</span>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {/* TOP NAVIGATION BAR */}
        <header className="bg-white border-b border-stone-200 sticky top-0 z-30 shadow-2xs">
          <div className="px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
            {/* Left: Mobile Toggle & Page Title */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileSidebarOpen(true)}
                className="p-2 text-stone-600 hover:text-stone-900 lg:hidden rounded-xl bg-stone-100"
              >
                <Menu size={20} />
              </button>

              <div className="hidden sm:block">
                <span className="text-[10px] font-bold uppercase text-emerald-700 tracking-wider">
                  Talukdar Nursery
                </span>
                <h2 className="text-lg font-serif font-black text-stone-900 capitalize">
                  {activeTab} Overview
                </h2>
              </div>
            </div>

            {/* Center: Search Bar */}
            <div className="flex-1 max-w-md relative hidden md:block">
              <Search size={16} className="absolute left-3 top-2.5 text-stone-400" />
              <input
                type="text"
                placeholder="Search orders, plants, customers..."
                value={topSearch}
                onChange={(e) => setTopSearch(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-9 pr-3 py-2 text-xs font-medium focus:ring-2 focus:ring-[#2F5233]"
              />
            </div>

            {/* Right: Quick Actions, Store Status & Admin Profile */}
            <div className="flex items-center gap-3">
              {/* Store Status Indicator */}
              <div className="hidden xl:flex items-center gap-2 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 text-xs font-bold text-emerald-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Store Online 🟢</span>
              </div>

              {/* Quick Actions Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsQuickActionOpen(!isQuickActionOpen)}
                  className="px-3 py-1.5 bg-[#2F5233] text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5 hover:bg-[#1E3A20] cursor-pointer"
                >
                  <Plus size={15} />
                  <span className="hidden sm:inline">Quick Action</span>
                  <ChevronDown size={14} />
                </button>

                {isQuickActionOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-stone-200 py-1.5 z-50 text-xs font-semibold">
                    <button
                      onClick={() => {
                        switchTab('products');
                        setIsQuickActionOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-stone-50 flex items-center gap-2 text-stone-800"
                    >
                      <Package size={14} className="text-emerald-700" /> Add Plant Product
                    </button>
                    <button
                      onClick={() => {
                        switchTab('coupons');
                        setIsQuickActionOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-stone-50 flex items-center gap-2 text-stone-800"
                    >
                      <Tag size={14} className="text-emerald-700" /> Create Coupon
                    </button>
                    <button
                      onClick={() => {
                        switchTab('blogs');
                        setIsQuickActionOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-stone-50 flex items-center gap-2 text-stone-800"
                    >
                      <BookOpen size={14} className="text-emerald-700" /> Write Blog Post
                    </button>
                  </div>
                )}
              </div>

              {/* Notifications Bell */}
              <div className="relative">
                <button
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className="p-2 text-stone-600 hover:text-stone-900 rounded-xl hover:bg-stone-100 transition relative cursor-pointer"
                  title="Notifications"
                >
                  <Bell size={18} />
                  {pendingCount > 0 && (
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-amber-500 rounded-full border-2 border-white" />
                  )}
                </button>

                {isNotificationsOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-stone-200 p-3 z-50 text-xs space-y-2">
                    <div className="flex items-center justify-between border-b border-stone-100 pb-2 font-bold text-stone-900">
                      <span>Nursery Notifications</span>
                      <span className="text-[10px] text-emerald-700 font-extrabold">
                        {pendingCount} Pending
                      </span>
                    </div>

                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {pendingCount > 0 ? (
                        <div
                          onClick={() => {
                            switchTab('orders');
                            setIsNotificationsOpen(false);
                          }}
                          className="p-2 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 space-y-0.5 cursor-pointer hover:bg-amber-100/70"
                        >
                          <span className="font-bold block">Orders Awaiting Shipping</span>
                          <span className="text-[11px]">
                            {pendingCount} new order(s) require courier tracking assignment.
                          </span>
                        </div>
                      ) : (
                        <p className="text-stone-400 py-2 text-center">No pending notifications.</p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Admin Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-stone-100 transition cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#2F5233] text-white font-bold text-xs flex items-center justify-center">
                    GH
                  </div>
                  <ChevronDown size={14} className="text-stone-500 hidden sm:block" />
                </button>

                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-stone-200 py-1.5 z-50 text-xs font-semibold">
                    <div className="px-4 py-2 border-b border-stone-100">
                      <span className="font-bold text-stone-900 block">Horticulture Admin</span>
                      <span className="text-[10px] text-stone-400 block">Super Administrator</span>
                    </div>
                    <Link
                      to="/"
                      className="w-full text-left px-4 py-2 hover:bg-stone-50 flex items-center gap-2 text-stone-700"
                    >
                      <ExternalLink size={14} /> Exit to Customer Store
                    </Link>
                    <button
                      onClick={() => {
                        navigate('/');
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-rose-50 text-rose-600 flex items-center gap-2 border-t border-stone-100"
                    >
                      <LogOut size={14} /> Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* DYNAMIC SECTION CONTENT RENDERER */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1">
          {activeTab === 'dashboard' && (
            <DashboardOverview
              orders={orders}
              products={products}
              customers={customers}
              onSelectTab={switchTab}
              onUpdateOrderStatus={handleUpdateOrderStatus}
            />
          )}

          {activeTab === 'products' && (
            <ProductsManager
              products={products}
              onAddProduct={handleAddProduct}
              onUpdateProduct={handleUpdateProduct}
              onDeleteProduct={handleDeleteProduct}
            />
          )}

          {activeTab === 'categories' && (
            <CategoriesManager
              categories={categories}
              onAddCategory={handleAddCategory}
              onUpdateCategory={handleUpdateCategory}
            />
          )}

          {activeTab === 'orders' && (
            <OrdersManager orders={orders} onUpdateOrderStatus={handleUpdateOrderStatus} />
          )}

          {activeTab === 'customers' && (
            <CustomersManager customers={customers} onAddCustomer={handleAddCustomer} />
          )}

          {activeTab === 'coupons' && (
            <CouponsManager
              coupons={coupons}
              onAddCoupon={handleAddCoupon}
              onUpdateCoupon={handleUpdateCoupon}
              onDeleteCoupon={handleDeleteCoupon}
            />
          )}

          {activeTab === 'blogs' && (
            <BlogsManager
              blogPosts={blogPosts}
              onAddBlog={handleAddBlog}
              onUpdateBlog={handleUpdateBlog}
              onDeleteBlog={handleDeleteBlog}
            />
          )}

          {activeTab === 'analytics' && <AnalyticsView />}

          {activeTab === 'settings' && <SettingsView />}
        </main>
      </div>
    </div>
  );
};
