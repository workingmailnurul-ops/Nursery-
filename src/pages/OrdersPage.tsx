import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  PackageCheck,
  Search,
  ChevronDown,
  ChevronUp,
  MapPin,
  CreditCard,
  Calendar,
  Truck,
  ArrowRight,
  Copy,
  Check,
  Printer,
  Sparkles,
  ShoppingBag,
  ExternalLink,
  Info,
  Clock,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';
import { PlacedOrder, OrderStatus } from '../types';
import { Button } from '../components/Button';

// Sample demo orders for quick evaluation if localStorage is empty
const SAMPLE_DEMO_ORDERS: PlacedOrder[] = [
  {
    orderId: 'AMT-2026-837192',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }),
    items: [
      {
        id: 'prod-1',
        name: 'Ratnagiri Alphonso Grafted Mango Tree',
        image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=400&q=80',
        category: 'mango',
        potSize: '12-inch Nursery Grow Bag',
        age: '2 Year Grafted (Fruiting Ready)',
        quantity: 2,
        unitPrice: 350,
        lineTotal: 700,
      },
      {
        id: 'prod-2',
        name: 'L-49 Sardar Lucknowi Guava Plant',
        image: 'https://images.unsplash.com/photo-1536511157201-5222b3a67231?auto=format&fit=crop&w=400&q=80',
        category: 'guava',
        potSize: '10-inch Nursery Soil Bag',
        age: '1.5 Year Grafted',
        quantity: 1,
        unitPrice: 280,
        lineTotal: 280,
      },
    ],
    deliveryDetails: {
      name: 'Anisur Rahman',
      phone: '+91 98765 43210',
      email: 'anisur.gardens@gmail.com',
      address: 'Flat 3B, Lake Garden Apartments, Southern Avenue',
      city: 'Kolkata',
      state: 'West Bengal',
      pincode: '700045',
    },
    orderType: 'Retail',
    paymentMethod: 'cod',
    subtotal: 980,
    deliveryFee: 0,
    discount: 98,
    total: 882,
    status: 'Shipped',
    courierName: 'Delhivery Express Plant Courier',
    trackingNumber: 'DT-89301294',
    estimatedDeliveryDate: 'Tomorrow, 5:00 PM',
  },
  {
    orderId: 'AMT-2026-541290',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }),
    items: [
      {
        id: 'combo-1',
        name: 'Rooftop Sweet Fruit Orchard Trio',
        image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=400&q=80',
        category: 'combo',
        potSize: '12-inch Heavy Crate',
        age: '2 Year Grafted Set',
        quantity: 1,
        unitPrice: 890,
        lineTotal: 890,
      },
    ],
    deliveryDetails: {
      name: 'Anisur Rahman',
      phone: '+91 98765 43210',
      email: 'anisur.gardens@gmail.com',
      address: 'Flat 3B, Lake Garden Apartments, Southern Avenue',
      city: 'Kolkata',
      state: 'West Bengal',
      pincode: '700045',
    },
    orderType: 'Retail',
    paymentMethod: 'upi',
    subtotal: 890,
    deliveryFee: 99,
    discount: 0,
    total: 989,
    status: 'Delivered',
    courierName: 'India Post Speed Post',
    trackingNumber: 'SP-99128301',
    estimatedDeliveryDate: 'Delivered on July 20',
  },
];

export const OrdersPage: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<PlacedOrder[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Load orders from localStorage
  useEffect(() => {
    loadOrdersFromStorage();
  }, []);

  const loadOrdersFromStorage = () => {
    try {
      const stored = localStorage.getItem('green_heaven_placed_orders') || localStorage.getItem('amtola_placed_orders');
      if (stored) {
        const parsed: PlacedOrder[] = JSON.parse(stored);
        setOrders(parsed);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.error('Error reading orders from localStorage', err);
      setOrders([]);
    }
  };

  // Helper to load sample demo orders into localStorage
  const handleLoadDemoOrders = () => {
    try {
      localStorage.setItem('green_heaven_placed_orders', JSON.stringify(SAMPLE_DEMO_ORDERS));
      setOrders(SAMPLE_DEMO_ORDERS);
    } catch (e) {
      console.error(e);
    }
  };

  const handleClearOrders = () => {
    if (confirm('Are you sure you want to clear order history from this browser?')) {
      localStorage.removeItem('green_heaven_placed_orders');
      localStorage.removeItem('amtola_placed_orders');
      setOrders([]);
    }
  };

  const handleCopyOrderId = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filter orders by ID or item name
  const filteredOrders = orders.filter((order) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    const matchId = order.orderId.toLowerCase().includes(q);
    const matchCustomer = order.deliveryDetails?.name?.toLowerCase().includes(q);
    const matchItem = order.items?.some((i) => i.name.toLowerCase().includes(q));
    return matchId || matchCustomer || matchItem;
  });

  // Get status badge colors
  const getStatusBadge = (status?: string) => {
    const s = (status || 'Placed').toLowerCase();
    if (s.includes('delivered')) {
      return (
        <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-300">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
          Delivered
        </span>
      );
    }
    if (s.includes('shipped') || s.includes('dispatch')) {
      return (
        <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-800 text-xs font-bold px-2.5 py-1 rounded-full border border-purple-300">
          <Truck size={12} className="text-purple-600" />
          Shipped
        </span>
      );
    }
    if (s.includes('confirm') || s.includes('stock') || s.includes('pack')) {
      return (
        <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-1 rounded-full border border-amber-300">
          <Clock size={12} className="text-amber-600" />
          Confirmed
        </span>
      );
    }
    // Default to "Placed"
    return (
      <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-1 rounded-full border border-blue-300">
        <PackageCheck size={12} className="text-blue-600" />
        Placed
      </span>
    );
  };

  // Calculate stats
  const totalSpent = orders.reduce((acc, curr) => acc + (curr.total || 0), 0);
  const totalPlantCount = orders.reduce(
    (acc, curr) => acc + curr.items.reduce((sum, item) => sum + item.quantity, 0),
    0
  );

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* BREADCRUMB */}
        <div className="flex items-center gap-2 text-xs text-stone-500">
          <Link to="/" className="hover:text-[#2F5233]">Home</Link>
          <span>/</span>
          <span className="text-stone-800 font-bold">My Orders</span>
        </div>

        {/* HEADER HERO BANNER */}
        <div className="bg-[#2F5233] text-stone-100 rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden flex flex-col md:flex-row justify-between md:items-center gap-6">
          <div className="space-y-2 max-w-xl relative z-10">
            <span className="bg-[#E8862E] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
              <PackageCheck size={12} /> Order Management & Tracking
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-white">
              My Sapling Orders
            </h1>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              Track your living fruit tree saplings, inspect root gel packaging updates, and view your purchase receipts.
            </p>
          </div>

          {/* Quick Summary Stats */}
          {orders.length > 0 && (
            <div className="flex items-center gap-3 bg-[#244128]/80 backdrop-blur-xs p-4 rounded-2xl border border-emerald-800/60 shrink-0">
              <div className="text-center px-3 border-r border-emerald-800/80">
                <span className="text-2xl font-serif font-extrabold text-white block">{orders.length}</span>
                <span className="text-[10px] text-stone-300 uppercase tracking-wider font-semibold">Total Orders</span>
              </div>
              <div className="text-center px-3 border-r border-emerald-800/80">
                <span className="text-2xl font-serif font-extrabold text-emerald-400 block">{totalPlantCount}</span>
                <span className="text-[10px] text-stone-300 uppercase tracking-wider font-semibold">Trees Planted</span>
              </div>
              <div className="text-center px-3">
                <span className="text-xl font-serif font-extrabold text-[#E8862E] block">₹{totalSpent.toLocaleString()}</span>
                <span className="text-[10px] text-stone-300 uppercase tracking-wider font-semibold">Total Spent</span>
              </div>
            </div>
          )}
        </div>

        {/* SEARCH & ACTION TOOLBAR */}
        {orders.length > 0 && (
          <div className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-xs flex flex-col sm:flex-row justify-between items-center gap-3">
            {/* Search Box */}
            <div className="relative w-full sm:w-80">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Search by Order ID or Plant Name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-stone-300 rounded-xl pl-9 pr-3.5 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#2F5233]"
              />
            </div>

            {/* Right Buttons */}
            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end text-xs">
              <Link
                to="/track-order"
                className="bg-[#2F5233] text-white hover:bg-[#244128] font-bold px-3.5 py-2 rounded-xl transition flex items-center gap-1.5"
              >
                <Truck size={14} className="text-[#E8862E]" />
                <span>Track by Order ID</span>
              </Link>

              <button
                onClick={handleClearOrders}
                className="text-stone-500 hover:text-rose-600 font-semibold px-3 py-2 rounded-xl border border-stone-200 hover:bg-stone-50 transition"
              >
                Clear History
              </button>
            </div>
          </div>
        )}

        {/* ORDERS LIST */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-stone-200/90 shadow-xs space-y-5 my-6">
            <div className="w-16 h-16 bg-[#2F5233]/10 text-[#2F5233] rounded-2xl flex items-center justify-center mx-auto border border-[#2F5233]/20">
              <ShoppingBag size={32} className="text-[#E8862E]" />
            </div>

            <div className="max-w-md mx-auto space-y-2">
              <h2 className="text-xl font-serif font-bold text-[#2F5233]">No Orders Saved Yet</h2>
              <p className="text-xs text-stone-600 leading-relaxed">
                You haven't placed any fruit tree sapling orders in this browser session yet. Place a new order or try our sample tracking test!
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Button
                variant="primary"
                onClick={() => navigate('/shop')}
                leftIcon={<ShoppingBag size={16} />}
              >
                Browse Fruit Saplings
              </Button>

              <button
                onClick={handleLoadDemoOrders}
                className="bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100 font-bold px-4 py-2.5 rounded-xl text-xs transition flex items-center gap-2 shadow-xs"
              >
                <Sparkles size={16} className="text-[#E8862E]" />
                Load Sample Demo Orders
              </button>

              <Link
                to="/track-order"
                className="bg-stone-100 text-stone-800 border border-stone-300 hover:bg-stone-200 font-bold px-4 py-2.5 rounded-xl text-xs transition flex items-center gap-2"
              >
                <Truck size={16} className="text-[#2F5233]" />
                Track Guest Order ID
              </Link>
            </div>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-stone-200/90 space-y-3">
            <p className="text-sm font-bold text-stone-700">No orders match "{searchQuery}"</p>
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-[#2F5233] underline font-semibold"
            >
              Clear search filter
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const isExpanded = expandedOrderId === order.orderId;
              const itemCount = order.items.reduce((acc, i) => acc + i.quantity, 0);

              return (
                <div
                  key={order.orderId}
                  className="bg-white rounded-2xl border border-stone-200/90 shadow-xs hover:shadow-md transition duration-200 overflow-hidden"
                >
                  {/* CARD HEADER */}
                  <div
                    onClick={() => setExpandedOrderId(isExpanded ? null : order.orderId)}
                    className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-stone-50/80 transition"
                  >
                    {/* Left Info */}
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="font-mono font-black text-sm text-[#2F5233] bg-[#FAF7F2] px-2.5 py-0.5 rounded-md border border-stone-300">
                          #{order.orderId}
                        </span>

                        <button
                          onClick={(e) => handleCopyOrderId(order.orderId, e)}
                          className="text-stone-400 hover:text-stone-700 p-1"
                          title="Copy Order ID"
                        >
                          {copiedId === order.orderId ? (
                            <Check size={14} className="text-emerald-600" />
                          ) : (
                            <Copy size={14} />
                          )}
                        </button>

                        {getStatusBadge(order.status)}
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-500 font-medium">
                        <span className="flex items-center gap-1">
                          <Calendar size={13} className="text-[#E8862E]" />
                          {order.createdAt}
                        </span>
                        <span>•</span>
                        <span>
                          <strong>{itemCount}</strong> {itemCount === 1 ? 'Plant' : 'Plants'}
                        </span>
                        <span>•</span>
                        <span className="capitalize">
                          Payment: <strong>{order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod.toUpperCase()}</strong>
                        </span>
                      </div>
                    </div>

                    {/* Right Info: Price & Expand Toggle */}
                    <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-stone-100">
                      <div className="text-left sm:text-right">
                        <span className="text-[10px] text-stone-400 font-bold uppercase block tracking-wider">
                          Order Total
                        </span>
                        <span className="text-xl font-serif font-black text-[#2F5233]">
                          ₹{order.total.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/track-order?id=${order.orderId}`);
                          }}
                          className="bg-[#2F5233] text-white hover:bg-[#244128] font-bold text-xs px-3 py-1.5 rounded-xl transition flex items-center gap-1 shadow-xs"
                        >
                          <Truck size={13} />
                          <span className="hidden sm:inline">Track</span>
                        </button>

                        <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-600">
                          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ITEM PREVIEWS SUMMARY ROW (When collapsed) */}
                  {!isExpanded && (
                    <div className="px-4 sm:px-5 pb-4 pt-1 border-t border-stone-100 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2 overflow-x-auto py-1 max-w-full">
                        {order.items.slice(0, 3).map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 bg-[#FAF7F2] p-1.5 pr-3 rounded-xl border border-stone-200 shrink-0 text-xs"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-8 h-8 rounded-lg object-cover"
                              onError={(e) => {
                                e.currentTarget.src = 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=400&q=80';
                              }}
                            />
                            <div className="leading-tight">
                              <span className="font-bold text-stone-800 text-[11px] block line-clamp-1 max-w-[140px]">
                                {item.name}
                              </span>
                              <span className="text-[10px] text-stone-500 font-medium">
                                Qty: {item.quantity}
                              </span>
                            </div>
                          </div>
                        ))}
                        {order.items.length > 3 && (
                          <span className="text-xs font-bold text-stone-500 px-2">
                            +{order.items.length - 3} more
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => setExpandedOrderId(order.orderId)}
                        className="text-xs font-bold text-[#2F5233] hover:underline shrink-0"
                      >
                        View Details
                      </button>
                    </div>
                  )}

                  {/* EXPANDED ORDER DETAIL VIEW */}
                  {isExpanded && (
                    <div className="bg-[#FAF7F2]/80 border-t border-stone-200 p-5 sm:p-6 space-y-6">
                      {/* STATUS TIMELINE BAR */}
                      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 space-y-3">
                        <div className="flex justify-between items-center text-xs font-bold text-[#2F5233]">
                          <span className="flex items-center gap-1.5">
                            <Truck size={16} className="text-[#E8862E]" /> Live Courier Progress
                          </span>
                          <Link
                            to={`/track-order?id=${order.orderId}`}
                            className="text-[#E8862E] hover:underline flex items-center gap-1"
                          >
                            Full Tracking Timeline <ExternalLink size={12} />
                          </Link>
                        </div>

                        <div className="grid grid-cols-4 gap-2 text-center text-[10px] sm:text-xs font-bold">
                          <div className="bg-emerald-100 text-emerald-900 py-2 px-1 rounded-xl border border-emerald-300">
                            1. Placed ✓
                          </div>
                          <div
                            className={`py-2 px-1 rounded-xl border ${
                              order.status !== 'Placed'
                                ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                                : 'bg-amber-50 text-amber-900 border-amber-300 animate-pulse'
                            }`}
                          >
                            2. Confirmed
                          </div>
                          <div
                            className={`py-2 px-1 rounded-xl border ${
                              order.status === 'Shipped' || order.status === 'Delivered'
                                ? 'bg-purple-100 text-purple-900 border-purple-300'
                                : 'bg-stone-100 text-stone-400 border-stone-200'
                            }`}
                          >
                            3. Root Packed & Shipped
                          </div>
                          <div
                            className={`py-2 px-1 rounded-xl border ${
                              order.status === 'Delivered'
                                ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                                : 'bg-stone-100 text-stone-400 border-stone-200'
                            }`}
                          >
                            4. Delivered
                          </div>
                        </div>

                        {order.courierName && (
                          <div className="text-xs text-stone-600 pt-1 flex flex-wrap justify-between items-center gap-2">
                            <span>
                              Partner: <strong>{order.courierName}</strong>
                            </span>
                            {order.trackingNumber && (
                              <span>
                                AWB / Tracking Ref: <strong className="font-mono text-[#2F5233]">{order.trackingNumber}</strong>
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* ITEMS LIST */}
                      <div className="bg-white rounded-2xl border border-stone-200 p-4 space-y-3">
                        <h3 className="font-serif font-bold text-sm text-[#2F5233]">Ordered Saplings & Combos</h3>
                        <div className="divide-y divide-stone-100 text-xs">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                              <div className="flex items-center gap-3">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-12 h-12 rounded-xl object-cover border border-stone-200 shrink-0"
                                  onError={(e) => {
                                    e.currentTarget.src = 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=400&q=80';
                                  }}
                                />
                                <div className="space-y-0.5">
                                  <h4 className="font-bold text-stone-800 text-sm">{item.name}</h4>
                                  <div className="flex flex-wrap gap-2 text-[11px] text-stone-500 font-medium">
                                    <span>Container: {item.potSize || '10-inch Nursery Soil Bag'}</span>
                                    <span>•</span>
                                    <span>Age: {item.age || '1.5 Year Grafted'}</span>
                                  </div>
                                </div>
                              </div>

                              <div className="text-right shrink-0">
                                <span className="font-bold text-stone-800 block text-sm">
                                  ₹{item.lineTotal.toLocaleString()}
                                </span>
                                <span className="text-[11px] text-stone-500">
                                  {item.quantity} × ₹{item.unitPrice}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* TWO COLUMN GRID: DELIVERY ADDRESS + PAYMENT BREAKDOWN */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Delivery Address */}
                        <div className="bg-white p-4 rounded-2xl border border-stone-200 space-y-2 text-xs">
                          <h4 className="font-serif font-bold text-xs text-[#2F5233] flex items-center gap-1.5 border-b border-stone-100 pb-2">
                            <MapPin size={14} className="text-[#E8862E]" /> Delivery Address
                          </h4>
                          <p className="font-bold text-stone-800 text-sm">{order.deliveryDetails.name}</p>
                          <p className="text-stone-600">{order.deliveryDetails.address}</p>
                          <p className="text-stone-600">
                            {order.deliveryDetails.city}, {order.deliveryDetails.state} -{' '}
                            <strong>{order.deliveryDetails.pincode}</strong>
                          </p>
                          <p className="text-stone-700 font-semibold pt-1">
                            Phone: {order.deliveryDetails.phone}
                          </p>
                          {order.deliveryDetails.email && (
                            <p className="text-stone-500">Email: {order.deliveryDetails.email}</p>
                          )}
                        </div>

                        {/* Payment & Total Breakdown */}
                        <div className="bg-white p-4 rounded-2xl border border-stone-200 space-y-2 text-xs">
                          <h4 className="font-serif font-bold text-xs text-[#2F5233] flex items-center gap-1.5 border-b border-stone-100 pb-2">
                            <CreditCard size={14} className="text-[#E8862E]" /> Payment & Price Details
                          </h4>
                          <div className="space-y-1.5 text-stone-600 pt-1">
                            <div className="flex justify-between">
                              <span>Items Subtotal</span>
                              <span className="font-bold text-stone-800">₹{order.subtotal.toLocaleString()}</span>
                            </div>
                            {order.discount > 0 && (
                              <div className="flex justify-between text-emerald-700 font-bold">
                                <span>Discount</span>
                                <span>-₹{order.discount.toLocaleString()}</span>
                              </div>
                            )}
                            <div className="flex justify-between">
                              <span>Delivery Charge</span>
                              <span className="font-bold text-stone-800">
                                {order.deliveryFee === 0 ? 'FREE' : `₹${order.deliveryFee}`}
                              </span>
                            </div>
                            <div className="flex justify-between pt-2 border-t border-stone-200 text-sm font-bold text-[#2F5233]">
                              <span>Grand Total Paid</span>
                              <span className="font-serif font-black text-lg">₹{order.total.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* BOTTOM ACTIONS */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                        <button
                          onClick={() => window.print()}
                          className="bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 font-bold text-xs px-3.5 py-2 rounded-xl transition flex items-center gap-1.5"
                        >
                          <Printer size={14} /> Print Order Receipt
                        </button>

                        <div className="flex items-center gap-2">
                          <a
                            href="https://wa.me/918721909049"
                            target="_blank"
                            rel="noreferrer"
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition flex items-center gap-1.5"
                          >
                            Nursery WhatsApp Help
                          </a>

                          <Link
                            to={`/track-order?id=${order.orderId}`}
                            className="bg-[#2F5233] hover:bg-[#244128] text-white font-bold text-xs px-4 py-2 rounded-xl transition flex items-center gap-1.5"
                          >
                            <Truck size={14} className="text-[#E8862E]" /> Live Track
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
