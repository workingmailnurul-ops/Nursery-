import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Sprout,
  ShoppingBag,
  Heart,
  Search,
  Menu,
  X,
  Phone,
  MapPin,
  HelpCircle,
  PackageCheck,
  ChevronDown,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Leaf,
  FileText,
  User,
  ShieldCheck,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

interface HeaderProps {
  cartItemCount?: number;
}

interface SubCategoryGroup {
  title: string;
  items: { name: string; path: string; badge?: string }[];
}

interface CategoryNavItem {
  id: string;
  name: string;
  path: string;
  subCategories?: SubCategoryGroup[];
}

export const Header: React.FC<HeaderProps> = ({ cartItemCount = 3 }) => {
  const navigate = useNavigate();
  const { wishlistCount } = useWishlist();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  
  // Pincode State
  const [pincode, setPincode] = useState('700001');
  const [pincodeInput, setPincodeInput] = useState('');
  const [isPincodeModalOpen, setIsPincodeModalOpen] = useState(false);
  const [pincodeStatus, setPincodeStatus] = useState<{
    checked: boolean;
    valid: boolean;
    message: string;
  } | null>({
    checked: true,
    valid: true,
    message: 'Express plant courier delivery available across India in 2-4 business days!',
  });

  // Mobile Accordion expanded state
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<string | null>('fruit-type');

  const menuRef = useRef<HTMLDivElement>(null);

  const categories: CategoryNavItem[] = [
    {
      id: 'fruit-saplings',
      name: 'Fruit Saplings',
      path: '/shop?cat=fruit-saplings',
      subCategories: [
        {
          title: 'Popular Fruit Trees',
          items: [
            { name: 'Grafted Mango Trees', path: '/category/mango', badge: 'Hot' },
            { name: 'Thai & Seedless Guava', path: '/category/guava' },
            { name: 'Sweet Citrus & Malta', path: '/category/citrus' },
            { name: 'Hybrid Pomegranate', path: '/category/pomegranate' },
            { name: 'Sapodilla (Chikoo) Grafted', path: '/category/sapodilla' },
            { name: 'All-Season Jackfruit', path: '/category/jackfruit' },
          ],
        },
        {
          title: 'Special Collections',
          items: [
            { name: 'Dwarf Fruit Trees for Pots', path: '/shop?tag=dwarf', badge: 'Rooftop' },
            { name: 'Exotic Overseas Varieties', path: '/category/exotic', badge: 'New' },
            { name: 'Early Bearing (1st Year)', path: '/shop?tag=early-fruiting' },
            { name: 'High Vitamin C Plants', path: '/shop?tag=vitamin-c' },
            { name: 'Heavy Yield Scions', path: '/shop?tag=heavy-yield' },
          ],
        },
      ],
    },
    {
      id: 'fruit-type',
      name: 'By Fruit Type',
      path: '/shop',
      subCategories: [
        {
          title: 'Mango Varieties',
          items: [
            { name: 'Haribhanga Mango', path: '/category/mango' },
            { name: 'Amrapali Grafted', path: '/category/mango' },
            { name: 'Miyazaki (Egg of Sun)', path: '/category/mango', badge: 'Premium' },
            { name: 'Katimon (All-Season)', path: '/category/mango', badge: 'Popular' },
            { name: 'Gourmati & Mallika', path: '/category/mango' },
          ],
        },
        {
          title: 'Guava & Citrus',
          items: [
            { name: 'Thai 7 Seedless Guava', path: '/category/guava' },
            { name: 'Red Diamond Guava', path: '/category/guava', badge: 'High Yield' },
            { name: 'BARI Malta-1', path: '/category/citrus' },
            { name: 'Seedless Elachi Lemon', path: '/category/citrus' },
            { name: 'China-3 Kumquat Orange', path: '/category/citrus' },
          ],
        },
        {
          title: 'Exotic & Berries',
          items: [
            { name: 'Crimson Dragon Fruit', path: '/category/exotic' },
            { name: 'Hass Avocado Grafted', path: '/category/exotic', badge: 'Exotic' },
            { name: 'Thai Starfruit (Kamranga)', path: '/category/exotic' },
            { name: 'Seedless Blackberry', path: '/category/exotic' },
            { name: 'Miracle Fruit Plant', path: '/category/exotic' },
          ],
        },
      ],
    },
    {
      id: 'grafted-plants',
      name: 'Grafted Plants',
      path: '/shop?type=grafted',
      subCategories: [
        {
          title: 'Grafting Techniques',
          items: [
            { name: 'V-Grafted Saplings', path: '/shop?technique=v-graft' },
            { name: 'Air-Layered (Guti Kalam)', path: '/shop?technique=air-layered', badge: 'Fast Growing' },
            { name: 'Multi-Variety Grafted', path: '/shop?technique=multi-graft', badge: 'Special' },
            { name: 'Rootstock Certified', path: '/shop?technique=rootstock' },
          ],
        },
        {
          title: 'Height & Maturity',
          items: [
            { name: '1.5 - 2 Feet Young Saplings', path: '/shop?height=1.5-2ft' },
            { name: '3 - 4 Feet Ready Bush Trees', path: '/shop?height=3-4ft' },
            { name: 'Flowering Stage Saplings', path: '/shop?stage=flowering', badge: 'Ready' },
          ],
        },
      ],
    },
    {
      id: 'combo-packs',
      name: 'Combo Packs',
      path: '/shop?cat=combo',
      subCategories: [
        {
          title: 'Bestseller Bundles',
          items: [
            { name: 'Rooftop Starter Pack (3 Trees)', path: '/shop?pack=rooftop', badge: 'Best Value' },
            { name: 'Citrus Quad Collection (4 Plants)', path: '/shop?pack=citrus-quad' },
            { name: 'Exotic Fruit Trio Pack', path: '/shop?pack=exotic-trio', badge: 'Save 25%' },
            { name: 'Mango Lovers Variety Kit', path: '/shop?pack=mango-kit' },
          ],
        },
      ],
    },
    {
      id: 'bulk-wholesale',
      name: 'Bulk / Wholesale Orders',
      path: '/bulk-orders',
      subCategories: [
        {
          title: 'Commercial Supply',
          items: [
            { name: 'Commercial Orchard Setup', path: '/bulk-orders', badge: 'Discount' },
            { name: 'Reseller & Corporate Bulk', path: '/bulk-orders' },
            { name: 'Landscaping & Event Orders', path: '/bulk-orders' },
            { name: 'Submit Wholesale Enquiry', path: '/bulk-orders', badge: 'Enquire' },
          ],
        },
      ],
    },
    {
      id: 'garden-accessories',
      name: 'Garden Accessories',
      path: '/shop?cat=accessories',
      subCategories: [
        {
          title: 'Soil & Growth Nutrition',
          items: [
            { name: 'Organic Vermicompost (5kg)', path: '/shop?acc=vermicompost' },
            { name: 'Rooting Powder & Growth Hormone', path: '/shop?acc=rooting-powder', badge: 'Must Have' },
            { name: 'Trichoderma Bio-Fungicide', path: '/shop?acc=fungicide' },
            { name: 'Bone Meal & Bio-NPK Mix', path: '/shop?acc=bone-meal' },
          ],
        },
        {
          title: 'Tools & Containers',
          items: [
            { name: 'Bypass Pruning Shears', path: '/shop?acc=shears' },
            { name: 'Grafting Tape & Knife Set', path: '/shop?acc=grafting-tape' },
            { name: 'Heavy Duty UV Grow Bags', path: '/shop?acc=grow-bags' },
          ],
        },
      ],
    },
    {
      id: 'all-categories',
      name: 'Categories',
      path: '/categories',
    },
    {
      id: 'offers-coupons',
      name: 'Offers & Coupons',
      path: '/offers',
      subCategories: [
        {
          title: 'Promotions & Discounts',
          items: [
            { name: 'Special Nursery Offers', path: '/offers', badge: 'Hot' },
            { name: 'Active Promo Coupons', path: '/coupons', badge: 'Vouchers' },
            { name: 'Trending Plant Saplings', path: '/trending' },
            { name: 'Featured Selections', path: '/featured' },
            { name: 'Best Sellers Collection', path: '/bestsellers' },
          ],
        },
      ],
    },
    {
      id: 'articles-hub',
      name: 'Articles',
      path: '/articles',
      subCategories: [
        {
          title: 'Agronomy & Care',
          items: [
            { name: 'All Plant Care Articles', path: '/articles', badge: 'Hub' },
            { name: 'Grafted Sapling Guide', path: '/articles/grafted-fruit-tree-care-guide' },
            { name: 'Rooftop Container Gardening', path: '/articles/top-dwarf-fruit-plants-rooftop-gardening' },
            { name: 'Organic Fertilizer Schedule', path: '/articles/organic-fertilizer-schedule-fruit-trees' },
          ],
        },
      ],
    },
    {
      id: 'blog',
      name: 'Blog',
      path: '/blogs',
      subCategories: [
        {
          title: 'Plant Care Guides',
          items: [
            { name: 'All Gardening Blog Posts', path: '/blogs' },
            { name: 'How to Care for Grafted Saplings', path: '/blog/grafted-sapling-care-guide' },
            { name: 'Best Fruit Trees for Rooftops', path: '/blog/rooftop-gardening-guide', badge: 'Read' },
            { name: 'Organic Fertilizer Schedule', path: '/care-guide' },
          ],
        },
      ],
    },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false);
    }
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = pincodeInput.trim();
    if (!cleanCode) return;

    setPincode(cleanCode);
    setPincodeStatus({
      checked: true,
      valid: true,
      message: `Deliverable to pincode ${cleanCode}! Safe packaging with live plant replacement guarantee.`,
    });
    setTimeout(() => {
      setIsPincodeModalOpen(false);
    }, 1200);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-stone-200 shadow-xs transition-all">
      {/* MAIN HEADER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5">
        {/* Top Header Row: Menu Icon (left), Brand Logo (center), Search, User, Cart Icons (right) */}
        <div className="flex items-center justify-between gap-1 sm:gap-3 relative py-1">
          {/* Left: Mobile Hamburger / Menu */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-1 text-stone-800 hover:text-[#2A8A3C] transition cursor-pointer shrink-0"
            aria-label="Open Navigation Menu"
          >
            <Menu size={22} className="sm:w-6 sm:h-6" />
          </button>

          {/* Center: Brand Logo matching screenshot layout with Amargaon Nursery */}
          <Link to="/" className="flex items-center gap-1 sm:gap-1.5 group min-w-0">
            <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-md bg-[#2A8A3C] text-white flex items-center justify-center shadow-xs shrink-0">
              <Sprout size={14} className="sm:hidden" />
              <Sprout size={18} className="hidden sm:block" />
            </div>
            <span className="text-xs xs:text-sm sm:text-2xl font-black tracking-tight text-[#2A8A3C] truncate">
              Amargaon <span className="text-stone-900 font-bold">Nursery</span>
            </span>
          </Link>

          {/* Right: Search, User Profile, Admin, Wishlist & Cart Icons */}
          <div className="flex items-center gap-0.5 sm:gap-2.5 shrink-0">
            <button
              onClick={() => {
                const el = document.getElementById('header-search-input');
                el?.focus();
              }}
              className="p-1 text-stone-800 hover:text-[#2A8A3C] transition cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-[18px] h-[18px] sm:w-[21px] sm:h-[21px]" />
            </button>

            <Link
              to="/orders"
              className="p-1 text-stone-800 hover:text-[#2A8A3C] transition"
              title="My Orders"
            >
              <User className="w-[18px] h-[18px] sm:w-[21px] sm:h-[21px]" />
            </Link>

            <Link
              to="/admin"
              className="p-1 text-stone-800 hover:text-[#2F5233] transition"
              title="Admin Dashboard"
            >
              <ShieldCheck className="w-[18px] h-[18px] sm:w-[21px] sm:h-[21px] text-[#2F5233]" />
            </Link>

            <Link
              to="/wishlist"
              className="relative p-1 text-stone-800 hover:text-[#FF5252] transition flex items-center"
              title="My Wishlist"
            >
              <Heart className="w-[18px] h-[18px] sm:w-[21px] sm:h-[21px]" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#FF5252] text-white text-[8px] sm:text-[9px] font-extrabold w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              className="relative p-1 text-stone-800 hover:text-[#2A8A3C] transition flex items-center"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-[18px] h-[18px] sm:w-[21px] sm:h-[21px]" />
              {cartItemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#FF5252] text-white text-[8px] sm:text-[9px] font-extrabold w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center shadow-xs">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Search Bar Row (Full width input with magnifying glass icon inside on right) */}
        <form onSubmit={handleSearchSubmit} className="mt-2 relative">
          <input
            id="header-search-input"
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-stone-300 rounded-md py-2 pl-3.5 pr-10 text-xs sm:text-sm text-stone-800 focus:outline-none focus:border-[#2A8A3C] placeholder-stone-400 shadow-2xs"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-[#2A8A3C] transition cursor-pointer"
            aria-label="Search Plants"
          >
            <Search size={18} />
          </button>
        </form>

        {/* Centered Select Delivery Location Pill Button */}
        <div className="mt-2 flex justify-center">
          <button
            onClick={() => setIsPincodeModalOpen(true)}
            className="inline-flex items-center gap-1.5 bg-white border border-stone-200/90 hover:border-[#FF5252] px-4 py-1.5 rounded-full text-[11px] sm:text-xs text-stone-700 transition shadow-2xs hover:bg-stone-50 cursor-pointer"
          >
            <MapPin size={13} className="text-[#2A8A3C]" />
            <span className="font-medium">
              {pincode ? `Select Delivery Location (${pincode})` : 'Select Delivery Location'}
            </span>
          </button>
        </div>
      </div>

      {/* 3. HORIZONTAL CATEGORY NAV BAR WITH MEGA-MENU DROPDOWNS (DESKTOP) */}
      <nav className="hidden md:block bg-white border-t border-b border-stone-200 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center justify-between text-xs sm:text-sm font-semibold text-stone-700">
            {categories.map((category) => (
              <li
                key={category.id}
                className="relative py-3 group"
                onMouseEnter={() => setHoveredCategory(category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <Link
                  to={category.path}
                  className="flex items-center gap-1 hover:text-[#2F5233] py-1 transition-colors relative"
                >
                  <span>{category.name}</span>
                  {category.subCategories && (
                    <ChevronDown
                      size={14}
                      className="text-stone-400 group-hover:rotate-180 transition-transform duration-200"
                    />
                  )}
                  {/* Active Indicator Line */}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E8862E] transition-all duration-200 group-hover:w-full rounded-full"></span>
                </Link>

                {/* Desktop Mega-Menu Dropdown on Hover */}
                {category.subCategories && hoveredCategory === category.id && (
                  <div className="absolute top-full left-0 mt-0 w-80 sm:w-[480px] bg-white rounded-2xl shadow-xl border border-stone-200 p-5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {category.subCategories.map((group, gIdx) => (
                        <div key={gIdx} className="space-y-2">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-[#2F5233] border-b border-stone-100 pb-1.5 flex items-center justify-between">
                            <span>{group.title}</span>
                            <Leaf size={12} className="text-[#E8862E]" />
                          </h4>
                          <ul className="space-y-1.5 text-xs text-stone-600 font-normal">
                            {group.items.map((item, iIdx) => (
                              <li key={iIdx}>
                                <Link
                                  to={item.path}
                                  className="flex items-center justify-between py-1 px-2 rounded-lg hover:bg-[#FAF7F2] hover:text-[#2F5233] hover:font-medium transition"
                                >
                                  <span>{item.name}</span>
                                  {item.badge && (
                                    <span className="text-[9px] bg-[#E8862E]/10 text-[#E8862E] font-bold px-1.5 py-0.5 rounded-md">
                                      {item.badge}
                                    </span>
                                  )}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500 bg-[#FAF7F2] -mx-5 -mb-5 p-3 rounded-b-2xl">
                      <span className="flex items-center gap-1 font-medium text-[#2F5233]">
                        <CheckCircle2 size={13} className="text-emerald-600" /> All plants shipped with moisture-sealed root bag
                      </span>
                      <Link
                        to={category.path}
                        className="font-bold text-[#E8862E] hover:underline flex items-center gap-0.5"
                      >
                        View All <ChevronRight size={12} />
                      </Link>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* 4. MOBILE SLIDE-IN DRAWER MENU */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative w-full max-w-xs sm:max-w-sm bg-[#FAF7F2] h-full shadow-2xl flex flex-col z-10 overflow-hidden animate-in slide-in-from-left duration-250">
            {/* Drawer Header */}
            <div className="p-4 bg-[#2F5233] text-white flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#E8862E] text-white flex items-center justify-center">
                  <Sprout size={18} />
                </div>
                <div>
                  <span className="font-extrabold text-base sm:text-lg block leading-none text-white whitespace-nowrap">Amargaon Nursery</span>
                  <span className="text-[10px] text-stone-200">Online Plants & Gardening Hub</span>
                </div>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 text-white/80 hover:text-white rounded-lg hover:bg-white/10"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-5">
              {/* Mobile Search */}
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search plant names..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-stone-300 rounded-xl py-2.5 pl-3.5 pr-10 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#2F5233]"
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-[#2F5233] text-white rounded-lg">
                  <Search size={14} />
                </button>
              </form>

              {/* Mobile Pincode Location Check */}
              <div className="bg-white p-3 rounded-xl border border-stone-200 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-stone-500 font-medium flex items-center gap-1">
                    <MapPin size={13} className="text-[#E8862E]" /> Delivery Location:
                  </span>
                  <span className="font-bold text-[#2F5233]">{pincode ? `Pincode ${pincode}` : 'Not set'}</span>
                </div>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsPincodeModalOpen(true);
                  }}
                  className="w-full py-1.5 text-xs text-center font-semibold text-[#2F5233] bg-[#2F5233]/10 hover:bg-[#2F5233]/20 rounded-lg transition"
                >
                  Change Delivery Pincode
                </button>
              </div>

              {/* Navigation Categories Accordion */}
              <div className="space-y-1">
                <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 px-2 pb-1">
                  Plant Categories
                </div>
                {categories.map((category) => {
                  const isExpanded = expandedMobileCategory === category.id;
                  return (
                    <div key={category.id} className="bg-white rounded-xl border border-stone-200/70 overflow-hidden">
                      <button
                        onClick={() =>
                          setExpandedMobileCategory(isExpanded ? null : category.id)
                        }
                        className="w-full flex items-center justify-between p-3 text-left font-bold text-xs text-stone-800 hover:bg-stone-50"
                      >
                        <span>{category.name}</span>
                        {category.subCategories ? (
                          <ChevronDown
                            size={16}
                            className={`text-stone-400 transition-transform duration-200 ${
                              isExpanded ? 'rotate-180' : ''
                            }`}
                          />
                        ) : (
                          <ChevronRight size={16} className="text-stone-400" />
                        )}
                      </button>

                      {/* Accordion Sub-categories */}
                      {category.subCategories && isExpanded && (
                        <div className="bg-[#FAF7F2] p-3 border-t border-stone-100 space-y-3">
                          {category.subCategories.map((group, gIdx) => (
                            <div key={gIdx} className="space-y-1">
                              <span className="text-[10px] font-bold uppercase text-[#2F5233] block">
                                {group.title}
                              </span>
                              <ul className="space-y-1">
                                {group.items.map((item, iIdx) => (
                                  <li key={iIdx}>
                                    <Link
                                      to={item.path}
                                      onClick={() => setIsMobileMenuOpen(false)}
                                      className="flex items-center justify-between py-1 px-2 rounded-md text-xs text-stone-600 hover:bg-white hover:text-[#2F5233]"
                                    >
                                      <span>{item.name}</span>
                                      {item.badge && (
                                        <span className="text-[9px] bg-[#E8862E] text-white px-1.5 py-0.2 rounded font-bold">
                                          {item.badge}
                                        </span>
                                      )}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Quick Links */}
              <div className="space-y-2 pt-2 border-t border-stone-200">
                <Link
                  to="/wishlist"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between p-2.5 bg-white border border-stone-200 rounded-xl text-xs font-semibold text-stone-800"
                >
                  <div className="flex items-center gap-2">
                    <Heart size={16} className="text-[#FF5252] fill-[#FF5252]" />
                    <span>My Saved Wishlist</span>
                  </div>
                  {wishlistCount > 0 && (
                    <span className="bg-[#FF5252] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                <Link
                  to="/orders"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2.5 bg-white border border-stone-200 rounded-xl text-xs font-semibold text-stone-800"
                >
                  <FileText size={16} className="text-[#2F5233]" />
                  <span>My Orders & Status</span>
                </Link>

                <Link
                  to="/care-guide"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2.5 bg-white border border-stone-200 rounded-xl text-xs font-semibold text-stone-800"
                >
                  <HelpCircle size={16} className="text-[#E8862E]" />
                  <span>Help Center & Planting Advice</span>
                </Link>

                <a
                  href="https://wa.me/918011253258"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition"
                >
                  <MessageCircle size={16} /> WhatsApp Nursery (+91 8011253258)
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. PINCODE MODAL (SELECT DELIVERY LOCATION WIDGET) */}
      {isPincodeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setIsPincodeModalOpen(false)}
          />
          <div className="relative bg-white rounded-3xl shadow-2xl border border-stone-200 max-w-md w-full p-6 z-10 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2 text-[#2F5233]">
                <MapPin size={20} className="text-[#E8862E]" />
                <h3 className="font-serif font-bold text-lg">Select Delivery Location</h3>
              </div>
              <button
                onClick={() => setIsPincodeModalOpen(false)}
                className="p-1 text-stone-400 hover:text-stone-600 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              Enter your area pincode or postal code to verify live plant delivery availability & packaging speeds.
            </p>

            <form onSubmit={handleCheckPincode} className="space-y-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter 4-digit pincode (e.g. 1205, 4000)..."
                  value={pincodeInput}
                  onChange={(e) => setPincodeInput(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-stone-300 rounded-xl py-2.5 pl-3.5 pr-20 text-sm font-semibold text-stone-800 focus:ring-2 focus:ring-[#2F5233]"
                  autoFocus
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-[#2F5233] text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-[#244128] transition"
                >
                  Check
                </button>
              </div>

              {pincodeStatus && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">Pincode {pincode} Active</span>
                    <span className="text-[11px] text-emerald-700">{pincodeStatus.message}</span>
                  </div>
                </div>
              )}
            </form>

            <div className="pt-2 border-t text-xs space-y-2">
              <span className="text-stone-400 font-medium block">Popular Delivery Hubs:</span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { name: 'Kolkata', code: '700001' },
                  { name: 'Mumbai', code: '400001' },
                  { name: 'Bengaluru', code: '560001' },
                  { name: 'Delhi NCR', code: '110001' },
                  { name: 'Pune', code: '411001' },
                  { name: 'Hyderabad', code: '500001' },
                ].map((city) => (
                  <button
                    key={city.code}
                    onClick={() => {
                      setPincodeInput(city.code);
                      setPincode(city.code);
                      setPincodeStatus({
                        checked: true,
                        valid: true,
                        message: `Delivery available in ${city.name} (${city.code}) via express plant packaging courier!`,
                      });
                    }}
                    className="px-2.5 py-1 bg-stone-100 hover:bg-[#2F5233] hover:text-white rounded-lg text-stone-700 font-medium transition text-[11px]"
                  >
                    {city.name} ({city.code})
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
