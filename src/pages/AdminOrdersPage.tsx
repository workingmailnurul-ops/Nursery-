import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  PackageCheck,
  Search,
  Building2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Filter,
  RefreshCw,
  Eye,
  CheckCircle2,
  Clock,
  Truck,
  XCircle,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Download,
  Plus,
  ExternalLink,
  MessageSquare,
  AlertCircle,
  FileSpreadsheet,
} from 'lucide-react';
import { PlacedOrder, OrderStatus } from '../types';

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
  status?: string;
}

const SAMPLE_DEMO_ORDERS: PlacedOrder[] = [
  {
    orderId: 'AMT-2026-837192',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toLocaleString('en-IN', {
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
      email: 'anisur@example.com',
      address: 'Plot 42, Green Valley Enclave, Near Civil Hospital',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411001',
    },
    paymentMethod: 'cod',
    subtotal: 980,
    deliveryFee: 0,
    discount: 50,
    total: 930,
    status: 'Placed',
    courierName: 'BlueDart Express',
    trackingNumber: 'BD-889123049',
    estimatedDeliveryDate: 'July 30, 2026',
  },
  {
    orderId: 'AMT-2026-904128',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }),
    items: [
      {
        id: 'prod-3',
        name: 'BARI 1 Seedless Sweet Malta Lemon Tree',
        image: 'https://images.unsplash.com/photo-1582979512210-99b6a53385f9?auto=format&fit=crop&w=400&q=80',
        category: 'citrus',
        potSize: '12-inch Grow Bag',
        age: '2 Year Grafted',
        quantity: 3,
        unitPrice: 320,
        lineTotal: 960,
      },
    ],
    deliveryDetails: {
      name: 'Priya Deshmukh',
      phone: '+91 91234 56789',
      email: 'priya.d@example.com',
      address: 'Flat 302, Sai Heights, Baner Road',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411045',
    },
    paymentMethod: 'upi',
    subtotal: 960,
    deliveryFee: 0,
    discount: 0,
    total: 960,
    status: 'Confirmed',
  },
];

const SAMPLE_DEMO_BULK_ENQUIRIES: BulkEnquiry[] = [
  {
    id: 'BLK-948102',
    name: 'Rajesh Kumar',
    businessName: 'GreenEarth Agri Tech',
    phone: '+91 98220 11223',
    email: 'rajesh@greenearth.in',
    city: 'Nashik',
    plantDetails: 'Need 150 units of Grafted Ratnagiri Alphonso Mango and 100 units of Thai 7 Pink Guava for 3-acre orchard setup.',
    preferredDeliveryDate: '2026-08-15',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }),
    status: 'Pending',
  },
];

const ALLOWED_STATUSES: OrderStatus[] = [
  'Placed',
  'Confirmed',
  'Shipped',
  'Delivered',
  'Cancelled',
];

export const AdminOrdersPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'orders' | 'bulk'>('orders');
  const [orders, setOrders] = useState<PlacedOrder[]>([]);
  const [bulkEnquiries, setBulkEnquiries] = useState<BulkEnquiry[]>([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  // Load from localStorage
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    try {
      const storedOrders = localStorage.getItem('orders');
      if (storedOrders) {
        setOrders(JSON.parse(storedOrders));
      } else {
        setOrders(SAMPLE_DEMO_ORDERS);
        localStorage.setItem('orders', JSON.stringify(SAMPLE_DEMO_ORDERS));
      }

      const storedBulk = localStorage.getItem('bulkEnquiries');
      if (storedBulk) {
        setBulkEnquiries(JSON.parse(storedBulk));
      } else {
        setBulkEnquiries(SAMPLE_DEMO_BULK_ENQUIRIES);
        localStorage.setItem('bulkEnquiries', JSON.stringify(SAMPLE_DEMO_BULK_ENQUIRIES));
      }
    } catch (e) {
      console.error('Error loading admin orders data:', e);
    }
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    const updated = orders.map((o) =>
      o.orderId === orderId ? { ...o, status: newStatus } : o
    );
    setOrders(updated);
    localStorage.setItem('orders', JSON.stringify(updated));
  };

  const handleUpdateCourierInfo = (
    orderId: string,
    courierName: string,
    trackingNumber: string
  ) => {
    const updated = orders.map((o) =>
      o.orderId === orderId ? { ...o, courierName, trackingNumber } : o
    );
    setOrders(updated);
    localStorage.setItem('orders', JSON.stringify(updated));
  };

  const handleUpdateBulkStatus = (enquiryId: string, newStatus: string) => {
    const updated = bulkEnquiries.map((b) =>
      b.id === enquiryId ? { ...b, status: newStatus } : b
    );
    setBulkEnquiries(updated);
    localStorage.setItem('bulkEnquiries', JSON.stringify(updated));
  };

  const handleResetToDemo = () => {
    if (window.confirm('Reset local storage with fresh demo orders?')) {
      setOrders(SAMPLE_DEMO_ORDERS);
      localStorage.setItem('orders', JSON.stringify(SAMPLE_DEMO_ORDERS));

      setBulkEnquiries(SAMPLE_DEMO_BULK_ENQUIRIES);
      localStorage.setItem('bulkEnquiries', JSON.stringify(SAMPLE_DEMO_BULK_ENQUIRIES));
    }
  };

  // Filtered lists
  const filteredOrders = orders.filter((o) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      o.orderId.toLowerCase().includes(query) ||
      o.deliveryDetails.phone.toLowerCase().includes(query) ||
      o.deliveryDetails.name.toLowerCase().includes(query) ||
      o.deliveryDetails.city.toLowerCase().includes(query);

    const matchesStatus = statusFilter === 'All' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredBulkEnquiries = bulkEnquiries.filter((b) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      b.id.toLowerCase().includes(query) ||
      b.phone.toLowerCase().includes(query) ||
      b.name.toLowerCase().includes(query) ||
      (b.businessName && b.businessName.toLowerCase().includes(query)) ||
      b.city.toLowerCase().includes(query);

    const matchesStatus = statusFilter === 'All' || (b.status || 'Pending') === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Placed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Confirmed':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'Shipped':
      case 'Dispatched':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Delivered':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Cancelled':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      default:
        return 'bg-stone-100 text-stone-800 border-stone-200';
    }
  };

  const totalSalesRevenue = orders.reduce((acc, curr) => acc + (curr.total || 0), 0);

  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-16">
      {/* HEADER BANNER */}
      <section className="bg-gradient-to-b from-[#1C3320] to-[#2A5232] text-white py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 bg-amber-400 text-stone-900 text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider">
              <ShieldCheck size={12} />
              <span>Internal Admin Panel</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-black text-amber-50">
              Order & Enquiry Operations Manager
            </h1>
            <p className="text-stone-300 text-xs">
              Manage client orders, update shipment statuses, and view commercial bulk enquiries stored in browser memory.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetToDemo}
              className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-3 py-2 rounded-lg border border-white/20 transition flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw size={14} />
              <span>Reset Demo Data</span>
            </button>
            <Link
              to="/orders"
              className="bg-[#FF5252] hover:bg-[#e04545] text-white text-xs font-bold px-4 py-2 rounded-lg transition shadow-xs flex items-center gap-1.5"
            >
              <ExternalLink size={14} />
              <span>Customer Portal View</span>
            </Link>
          </div>
        </div>
      </section>

      {/* STATS OVERVIEW CARDS */}
      <section className="max-w-7xl mx-auto px-4 -mt-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-2xs space-y-1">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">Total Customer Orders</span>
            <div className="text-2xl font-serif font-bold text-stone-900">{orders.length}</div>
            <span className="text-[11px] text-emerald-600 font-semibold">Stored in LocalStorage</span>
          </div>

          <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-2xs space-y-1">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">Pending / Placed</span>
            <div className="text-2xl font-serif font-bold text-blue-600">
              {orders.filter((o) => o.status === 'Placed' || o.status === 'Confirmed').length}
            </div>
            <span className="text-[11px] text-stone-500">Requires Dispatch Action</span>
          </div>

          <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-2xs space-y-1">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">Bulk Quotes Received</span>
            <div className="text-2xl font-serif font-bold text-amber-600">{bulkEnquiries.length}</div>
            <span className="text-[11px] text-stone-500">Nursery Commercial Enquiries</span>
          </div>

          <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-2xs space-y-1">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">Total Order Volume</span>
            <div className="text-2xl font-serif font-bold text-[#2A8A3C]">₹{totalSalesRevenue.toLocaleString('en-IN')}</div>
            <span className="text-[11px] text-stone-500">Gross Sales Subtotal</span>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <section className="max-w-7xl mx-auto px-4 pt-8 space-y-6">
        {/* TAB TOGGLE & SEARCH BAR */}
        <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-2xs space-y-4 md:space-y-0 md:flex md:items-center md:justify-between gap-4">
          {/* TABS */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setActiveTab('orders');
                setStatusFilter('All');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                activeTab === 'orders'
                  ? 'bg-[#2A8A3C] text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              <PackageCheck size={16} />
              <span>Customer Orders ({orders.length})</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('bulk');
                setStatusFilter('All');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                activeTab === 'bulk'
                  ? 'bg-[#2A8A3C] text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              <Building2 size={16} />
              <span>Bulk Enquiries ({bulkEnquiries.length})</span>
            </button>
          </div>

          {/* SEARCH & STATUS FILTER */}
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
              <input
                type="text"
                placeholder="Search phone number, Order ID, or customer name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs focus:outline-none focus:border-[#2A8A3C] focus:bg-white"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs font-semibold text-stone-700 focus:outline-none focus:border-[#2A8A3C]"
            >
              <option value="All">All Statuses</option>
              {activeTab === 'orders' ? (
                ALLOWED_STATUSES.map((st) => <option key={st} value={st}>{st}</option>)
              ) : (
                <>
                  <option value="Pending">Pending</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Quoted">Quoted</option>
                  <option value="Fulfilled">Fulfilled</option>
                  <option value="Cancelled">Cancelled</option>
                </>
              )}
            </select>
          </div>
        </div>

        {/* TAB 1: CUSTOMER ORDERS TABLE */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden">
            {filteredOrders.length === 0 ? (
              <div className="p-12 text-center space-y-3">
                <PackageCheck size={40} className="text-stone-300 mx-auto" />
                <h3 className="font-bold text-stone-800 text-sm">No Orders Found</h3>
                <p className="text-stone-500 text-xs">
                  {searchQuery || statusFilter !== 'All'
                    ? 'No orders match your filter criteria.'
                    : 'No customer orders have been placed yet.'}
                </p>
                <button
                  onClick={handleResetToDemo}
                  className="text-xs font-bold text-[#2A8A3C] hover:underline"
                >
                  Load Sample Demo Orders
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="p-4">Order ID & Date</th>
                      <th className="p-4">Customer Details</th>
                      <th className="p-4">Items / Total</th>
                      <th className="p-4">Payment</th>
                      <th className="p-4">Order Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200 font-medium text-stone-800">
                    {filteredOrders.map((order) => {
                      const isExpanded = expandedOrderId === order.orderId;
                      return (
                        <React.Fragment key={order.orderId}>
                          <tr className="hover:bg-stone-50/80 transition">
                            {/* Order ID & Date */}
                            <td className="p-4 space-y-1 align-top">
                              <span className="font-serif font-black text-stone-900 text-sm block">
                                {order.orderId}
                              </span>
                              <span className="text-[11px] text-stone-400 flex items-center gap-1">
                                <Calendar size={12} /> {order.createdAt}
                              </span>
                            </td>

                            {/* Customer Details */}
                            <td className="p-4 space-y-1 align-top">
                              <span className="font-bold text-stone-900 block">{order.deliveryDetails.name}</span>
                              <a
                                href={`tel:${order.deliveryDetails.phone}`}
                                className="text-[#2A8A3C] font-semibold hover:underline flex items-center gap-1 text-[11px]"
                              >
                                <Phone size={12} />
                                <span>{order.deliveryDetails.phone}</span>
                              </a>
                              <span className="text-[11px] text-stone-500 block truncate max-w-[180px]">
                                {order.deliveryDetails.city}, {order.deliveryDetails.pincode}
                              </span>
                            </td>

                            {/* Items / Total */}
                            <td className="p-4 space-y-1 align-top">
                              <span className="font-bold text-stone-900 text-sm block">
                                ₹{order.total.toLocaleString('en-IN')}
                              </span>
                              <span className="text-[11px] text-stone-500 block">
                                {order.items.reduce((acc, i) => acc + i.quantity, 0)} plant(s)
                              </span>
                            </td>

                            {/* Payment */}
                            <td className="p-4 align-top">
                              <span className="uppercase text-[10px] font-extrabold px-2 py-0.5 rounded bg-stone-100 border border-stone-200">
                                {order.paymentMethod}
                              </span>
                            </td>

                            {/* Order Status Dropdown */}
                            <td className="p-4 align-top">
                              <select
                                value={order.status}
                                onChange={(e) =>
                                  handleUpdateOrderStatus(order.orderId, e.target.value as OrderStatus)
                                }
                                className={`text-xs font-extrabold px-2.5 py-1.5 rounded-lg border focus:outline-none cursor-pointer shadow-2xs ${getStatusBadge(
                                  order.status
                                )}`}
                              >
                                {ALLOWED_STATUSES.map((st) => (
                                  <option key={st} value={st} className="bg-white text-stone-800">
                                    {st}
                                  </option>
                                ))}
                              </select>
                            </td>

                            {/* Actions */}
                            <td className="p-4 text-right align-top">
                              <button
                                onClick={() =>
                                  setExpandedOrderId(isExpanded ? null : order.orderId)
                                }
                                className="bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold px-3 py-1.5 rounded-lg text-xs transition inline-flex items-center gap-1 cursor-pointer"
                              >
                                <span>{isExpanded ? 'Hide Details' : 'View Details'}</span>
                                {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                              </button>
                            </td>
                          </tr>

                          {/* EXPANDED ROW DETAILS */}
                          {isExpanded && (
                            <tr className="bg-stone-50/90 border-b border-stone-200">
                              <td colSpan={6} className="p-6 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-4 rounded-xl border border-stone-200">
                                  {/* Item Breakdown */}
                                  <div className="space-y-3">
                                    <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider border-b border-stone-100 pb-2">
                                      Order Items Summary
                                    </h4>
                                    <div className="space-y-2">
                                      {order.items.map((item, idx) => (
                                        <div
                                          key={idx}
                                          className="flex items-center justify-between text-xs border-b border-stone-100 pb-2"
                                        >
                                          <div className="flex items-center gap-2">
                                            <img
                                              src={item.image}
                                              alt={item.name}
                                              className="w-10 h-10 rounded-lg object-cover border"
                                            />
                                            <div>
                                              <span className="font-bold text-stone-900 block line-clamp-1">
                                                {item.name}
                                              </span>
                                              <span className="text-[10px] text-stone-400">
                                                Qty: {item.quantity} × ₹{item.unitPrice}
                                              </span>
                                            </div>
                                          </div>
                                          <span className="font-bold text-stone-900">
                                            ₹{item.lineTotal}
                                          </span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Delivery & Courier Edit */}
                                  <div className="space-y-3">
                                    <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider border-b border-stone-100 pb-2">
                                      Full Delivery Address & Tracking
                                    </h4>
                                    <div className="text-xs space-y-1 text-stone-600">
                                      <p className="font-bold text-stone-900">{order.deliveryDetails.name}</p>
                                      <p>{order.deliveryDetails.address}</p>
                                      <p>
                                        {order.deliveryDetails.city}, {order.deliveryDetails.state} -{' '}
                                        {order.deliveryDetails.pincode}
                                      </p>
                                      <p className="pt-1">Phone: {order.deliveryDetails.phone}</p>
                                      {order.deliveryDetails.email && <p>Email: {order.deliveryDetails.email}</p>}
                                    </div>

                                    {/* Courier Input */}
                                    <div className="pt-2 space-y-2 bg-stone-50 p-3 rounded-lg border border-stone-200">
                                      <span className="text-[10px] font-bold text-stone-500 uppercase block">
                                        Shipment Tracking Details
                                      </span>
                                      <div className="grid grid-cols-2 gap-2">
                                        <input
                                          type="text"
                                          placeholder="Courier (e.g. BlueDart)"
                                          defaultValue={order.courierName || ''}
                                          onBlur={(e) =>
                                            handleUpdateCourierInfo(
                                              order.orderId,
                                              e.target.value,
                                              order.trackingNumber || ''
                                            )
                                          }
                                          className="px-2.5 py-1.5 bg-white border border-stone-300 rounded text-xs"
                                        />
                                        <input
                                          type="text"
                                          placeholder="AWB / Tracking #"
                                          defaultValue={order.trackingNumber || ''}
                                          onBlur={(e) =>
                                            handleUpdateCourierInfo(
                                              order.orderId,
                                              order.courierName || '',
                                              e.target.value
                                            )
                                          }
                                          className="px-2.5 py-1.5 bg-white border border-stone-300 rounded text-xs"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: BULK COMMERCIAL ENQUIRIES TABLE */}
        {activeTab === 'bulk' && (
          <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden">
            {filteredBulkEnquiries.length === 0 ? (
              <div className="p-12 text-center space-y-3">
                <Building2 size={40} className="text-stone-300 mx-auto" />
                <h3 className="font-bold text-stone-800 text-sm">No Bulk Enquiries Found</h3>
                <p className="text-stone-500 text-xs">
                  {searchQuery || statusFilter !== 'All'
                    ? 'No bulk quotes match your filter criteria.'
                    : 'No commercial nursery quotes have been submitted yet.'}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="p-4">Enquiry ID & Date</th>
                      <th className="p-4">Client / Business Name</th>
                      <th className="p-4">Contact Info</th>
                      <th className="p-4">Plant & Quantity Request</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200 font-medium text-stone-800">
                    {filteredBulkEnquiries.map((enquiry) => (
                      <tr key={enquiry.id} className="hover:bg-stone-50/80 transition">
                        <td className="p-4 space-y-1 align-top">
                          <span className="font-serif font-black text-stone-900 text-sm block">
                            {enquiry.id}
                          </span>
                          <span className="text-[11px] text-stone-400 block">{enquiry.submittedAt}</span>
                        </td>

                        <td className="p-4 space-y-1 align-top">
                          <span className="font-bold text-stone-900 block">{enquiry.name}</span>
                          {enquiry.businessName && (
                            <span className="text-[11px] text-amber-800 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block">
                              {enquiry.businessName}
                            </span>
                          )}
                          <span className="text-[11px] text-stone-500 block">{enquiry.city}</span>
                        </td>

                        <td className="p-4 space-y-1 align-top">
                          <a
                            href={`tel:${enquiry.phone}`}
                            className="text-[#2A8A3C] font-semibold hover:underline flex items-center gap-1"
                          >
                            <Phone size={12} />
                            <span>{enquiry.phone}</span>
                          </a>
                          <a
                            href={`mailto:${enquiry.email}`}
                            className="text-stone-500 hover:underline flex items-center gap-1 text-[11px]"
                          >
                            <Mail size={12} />
                            <span>{enquiry.email}</span>
                          </a>
                        </td>

                        <td className="p-4 max-w-xs align-top">
                          <p className="text-stone-700 text-xs bg-stone-50 p-2.5 rounded-lg border border-stone-200 line-clamp-3">
                            {enquiry.plantDetails}
                          </p>
                          {enquiry.preferredDeliveryDate && (
                            <span className="text-[10px] text-stone-400 mt-1 block">
                              Preferred Date: {enquiry.preferredDeliveryDate}
                            </span>
                          )}
                        </td>

                        <td className="p-4 align-top">
                          <select
                            value={enquiry.status || 'Pending'}
                            onChange={(e) => handleUpdateBulkStatus(enquiry.id, e.target.value)}
                            className="text-xs font-bold px-2.5 py-1.5 rounded-lg border bg-stone-50 border-stone-300 focus:outline-none cursor-pointer"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Quoted">Quoted</option>
                            <option value="Fulfilled">Fulfilled</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};
