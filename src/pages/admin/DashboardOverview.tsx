import React from 'react';
import { Link } from 'react-router-dom';
import {
  DollarSign,
  ShoppingBag,
  Clock,
  CheckCircle2,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Package,
  Users,
  Eye,
  ChevronRight,
  Sparkles,
  AlertTriangle,
  Award,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { PlacedOrder } from '../../types';
import { Product } from '../../types';
import { MONTHLY_SALES_DATA, CATEGORY_SALES_DATA, AdminCustomer } from './adminData';

interface DashboardOverviewProps {
  orders: PlacedOrder[];
  products: Product[];
  customers: AdminCustomer[];
  onSelectTab: (tab: string) => void;
  onUpdateOrderStatus: (orderId: string, status: any) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  orders,
  products,
  customers,
  onSelectTab,
  onUpdateOrderStatus,
}) => {
  // Calculated KPIs
  const totalOrdersCount = orders.length;
  const totalRevenue = orders.reduce((sum, ord) => sum + ord.total, 0);
  const pendingOrdersCount = orders.filter(
    (o) => o.status === 'Placed' || o.status === 'Processing'
  ).length;
  const deliveredOrdersCount = orders.filter((o) => o.status === 'Delivered').length;

  const deliveredPercentage = totalOrdersCount > 0
    ? Math.round((deliveredOrdersCount / totalOrdersCount) * 100)
    : 100;

  // Top Selling Products (sorted by sales or rating)
  const topSellingProducts = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  // Recent 5 Orders
  const recentOrders = orders.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-[#2F5233] text-white rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-linear-to-l from-emerald-600/20 to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="bg-emerald-400/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-400/30 flex items-center gap-1.5">
                <Sparkles size={13} className="text-amber-300" /> Talukdar Nursery Control Desk
              </span>
              <span className="text-stone-300 text-xs font-medium hidden sm:inline">
                Live System Operational
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-black tracking-tight">
              Welcome back, Nursery Manager
            </h1>
            <p className="text-stone-200 text-xs sm:text-sm max-w-xl">
              Here is what's happening across your fruit sapling orders, live nursery stock, and delivery dispatches today.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onSelectTab('products')}
              className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-2 cursor-pointer"
            >
              <Package size={15} /> Manage Products
            </button>
            <button
              onClick={() => onSelectTab('orders')}
              className="px-4 py-2.5 bg-white text-[#2F5233] hover:bg-stone-100 font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-2 cursor-pointer"
            >
              <ShoppingBag size={15} /> View Orders ({pendingOrdersCount} Pending)
            </button>
          </div>
        </div>
      </div>

      {/* 4 PRIMARY KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Revenue */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3 hover:border-emerald-500 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Total Revenue
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              ₹
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-serif font-black text-[#2F5233]">
              ₹{totalRevenue.toLocaleString()}
            </span>
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5 bg-emerald-50 px-2 py-0.5 rounded-full">
              <ArrowUpRight size={14} /> +18.4%
            </span>
          </div>
          <p className="text-[11px] text-stone-400">vs. ₹{(totalRevenue * 0.82).toFixed(0)} last month</p>
        </div>

        {/* Card 2: Total Orders */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3 hover:border-emerald-500 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Total Orders
            </span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <ShoppingBag size={20} />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-serif font-black text-stone-900">
              {totalOrdersCount}
            </span>
            <span className="text-xs font-bold text-blue-600 flex items-center gap-0.5 bg-blue-50 px-2 py-0.5 rounded-full">
              <ArrowUpRight size={14} /> +12%
            </span>
          </div>
          <p className="text-[11px] text-stone-400">All-time nursery orders processed</p>
        </div>

        {/* Card 3: Pending Orders */}
        <div
          onClick={() => onSelectTab('orders')}
          className="bg-white p-5 rounded-2xl border border-amber-200 shadow-xs space-y-3 hover:border-amber-400 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Pending Orders
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Clock size={20} className="group-hover:rotate-45 transition-transform" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-serif font-black text-amber-900">
              {pendingOrdersCount}
            </span>
            <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
              Requires Dispatch
            </span>
          </div>
          <p className="text-[11px] text-amber-700 font-medium flex items-center justify-between">
            <span>Needs courier assignment</span>
            <ChevronRight size={14} />
          </p>
        </div>

        {/* Card 4: Delivered Orders */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3 hover:border-emerald-500 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Delivered Orders
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 size={20} />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-serif font-black text-[#2F5233]">
              {deliveredOrdersCount}
            </span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              {deliveredPercentage}% Success
            </span>
          </div>
          <p className="text-[11px] text-stone-400">Safe live plant arrival rate</p>
        </div>
      </div>

      {/* CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Monthly Sales Revenue Area Chart */}
        <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-stone-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-serif font-bold text-[#2F5233] flex items-center gap-2">
                <TrendingUp size={18} className="text-emerald-600" /> Monthly Sales & Revenue Performance
              </h3>
              <p className="text-xs text-stone-500">Overview of 2026 nursery revenue trajectory (in INR ₹)</p>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
              Year 2026
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MONTHLY_SALES_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2F5233" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#2F5233" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E7E5E4" />
                <XAxis dataKey="month" stroke="#78716C" fontSize={12} tickLine={false} />
                <YAxis stroke="#78716C" fontSize={12} tickLine={false} tickFormatter={(val) => `₹${val / 1000}k`} />
                <Tooltip
                  formatter={(val: any) => [`₹${Number(val).toLocaleString()}`, 'Revenue']}
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', borderColor: '#E7E5E4', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#2F5233" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Sales Distribution Pie Chart */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-stone-200 shadow-2xs space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-serif font-bold text-[#2F5233]">
              Category Share
            </h3>
            <p className="text-xs text-stone-500">Sales breakdown by plant variety</p>
          </div>

          <div className="h-48 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={CATEGORY_SALES_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {CATEGORY_SALES_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(val: any) => [`${val}%`, 'Share']} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-stone-100 text-xs">
            {CATEGORY_SALES_DATA.map((cat) => (
              <div key={cat.name} className="flex items-center justify-between text-stone-600">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                  {cat.name}
                </span>
                <span className="font-bold text-stone-900">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TABLES SECTION: TOP SELLING & RECENT ORDERS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Top Selling Products */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-stone-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-serif font-bold text-[#2F5233] flex items-center gap-2">
                <Award size={18} className="text-amber-500" /> Bestselling Saplings
              </h3>
              <p className="text-xs text-stone-500">Highest rated & requested varieties</p>
            </div>
            <button
              onClick={() => onSelectTab('products')}
              className="text-xs font-bold text-[#2F5233] hover:underline"
            >
              View All
            </button>
          </div>

          <div className="space-y-3">
            {topSellingProducts.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between p-3 rounded-2xl border border-stone-100 bg-[#FAF7F2] hover:border-emerald-300 transition"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-12 h-12 object-cover rounded-xl border border-stone-200 shrink-0"
                  />
                  <div className="space-y-0.5 max-w-[180px]">
                    <h4 className="font-serif font-bold text-xs text-stone-900 truncate">
                      {p.name}
                    </h4>
                    <span className="text-[10px] text-stone-500 block capitalize">
                      {p.category} • {p.graftAge || 'Grafted'}
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-black text-[#2F5233] block">
                    ₹{p.salePrice || p.price}
                  </span>
                  <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                    ★ {p.rating} ({p.reviewCount})
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders Overview */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-stone-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-serif font-bold text-[#2F5233] flex items-center gap-2">
                <ShoppingBag size={18} className="text-emerald-700" /> Recent Nursery Orders
              </h3>
              <p className="text-xs text-stone-500">Latest customer orders awaiting processing or shipping</p>
            </div>
            <button
              onClick={() => onSelectTab('orders')}
              className="text-xs font-bold text-[#2F5233] hover:underline flex items-center gap-1"
            >
              Manage Orders <ChevronRight size={14} />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-200 text-stone-500 uppercase tracking-wider text-[10px]">
                  <th className="py-2.5 px-3">Order ID</th>
                  <th className="py-2.5 px-3">Customer</th>
                  <th className="py-2.5 px-3">Total</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {recentOrders.map((ord) => (
                  <tr key={ord.orderId} className="hover:bg-stone-50/80 transition">
                    <td className="py-3 px-3 font-mono font-bold text-stone-800">
                      {ord.orderId}
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-bold text-stone-900">{ord.deliveryDetails.name}</div>
                      <div className="text-[10px] text-stone-400">{ord.deliveryDetails.city}</div>
                    </td>
                    <td className="py-3 px-3 font-bold text-[#2F5233]">
                      ₹{ord.total}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          ord.status === 'Delivered'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : ord.status === 'Out for Delivery'
                            ? 'bg-blue-100 text-blue-800 border border-blue-300'
                            : ord.status === 'Processing'
                            ? 'bg-indigo-100 text-indigo-800 border border-indigo-300'
                            : 'bg-amber-100 text-amber-800 border border-amber-300'
                        }`}
                      >
                        {ord.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <select
                        value={ord.status}
                        onChange={(e) => onUpdateOrderStatus(ord.orderId, e.target.value)}
                        className="bg-white border border-stone-200 rounded-lg px-2 py-1 text-[11px] font-bold text-stone-700 focus:ring-2 focus:ring-[#2F5233]"
                      >
                        <option value="Placed">Placed</option>
                        <option value="Processing">Processing</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
