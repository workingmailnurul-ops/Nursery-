import React from 'react';
import {
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Users,
  MapPin,
  Sparkles,
  Award,
  BarChart2,
  PieChart as PieChartIcon,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { MONTHLY_SALES_DATA, CATEGORY_SALES_DATA } from './adminData';

const DISTRICT_DEMAND = [
  { city: 'Dhaka Division', orders: 480, percentage: 42, growth: '+24%' },
  { city: 'Chittagong Division', orders: 240, percentage: 21, growth: '+18%' },
  { city: 'Sylhet & Sunamganj', orders: 160, percentage: 14, growth: '+15%' },
  { city: 'Pune & Maharashtra', orders: 130, percentage: 11, growth: '+30%' },
  { city: 'Kolkata & WB', orders: 110, percentage: 10, growth: '+12%' },
  { city: 'Rajshahi & Khulna', orders: 45, percentage: 4, growth: '+8%' },
];

export const AnalyticsView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-stone-200 shadow-2xs">
        <div>
          <h2 className="text-xl font-serif font-black text-[#2F5233] flex items-center gap-2">
            <BarChart2 size={22} className="text-emerald-700" /> Executive Nursery Business Analytics
          </h2>
          <p className="text-xs text-stone-500">
            Real-time analytics on plant category sales, geographic demand, and order retention metrics.
          </p>
        </div>

        <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 shrink-0">
          Updated Live (Q3 2026)
        </span>
      </div>

      {/* Top 3 Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-2xs space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
            Avg Order Value (AOV)
          </span>
          <div className="text-2xl font-serif font-black text-[#2F5233]">₹1,480</div>
          <p className="text-xs text-emerald-600 font-semibold">+₹150 vs previous quarter</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-2xs space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
            Live Plant Courier Survival Rate
          </span>
          <div className="text-2xl font-serif font-black text-emerald-700">98.6%</div>
          <p className="text-xs text-stone-500">Zero transit damage guarantee</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-2xs space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
            Repeat Customer Rate
          </span>
          <div className="text-2xl font-serif font-black text-stone-900">38.4%</div>
          <p className="text-xs text-stone-500">High satisfaction among rooftop gardeners</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Monthly Orders Bar Chart */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-stone-200 shadow-2xs space-y-4">
          <div>
            <h3 className="text-base font-serif font-bold text-[#2F5233] flex items-center gap-2">
              <ShoppingBag size={18} className="text-emerald-700" /> Monthly Order Volumes
            </h3>
            <p className="text-xs text-stone-500">Total plant orders dispatched per calendar month</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MONTHLY_SALES_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E7E5E4" />
                <XAxis dataKey="month" stroke="#78716C" fontSize={12} tickLine={false} />
                <YAxis stroke="#78716C" fontSize={12} tickLine={false} />
                <Tooltip
                  formatter={(val: any) => [`${val} Orders`, 'Volume']}
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', borderColor: '#E7E5E4', fontSize: '12px' }}
                />
                <Bar dataKey="orders" fill="#2F5233" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Geographic Demand Heatlist */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-stone-200 shadow-2xs space-y-4">
          <div>
            <h3 className="text-base font-serif font-bold text-[#2F5233] flex items-center gap-2">
              <MapPin size={18} className="text-emerald-700" /> Regional Delivery Heatmap
            </h3>
            <p className="text-xs text-stone-500">Top delivery regions by order volume</p>
          </div>

          <div className="space-y-3">
            {DISTRICT_DEMAND.map((dist) => (
              <div key={dist.city} className="space-y-1 text-xs">
                <div className="flex justify-between font-bold text-stone-800">
                  <span>{dist.city}</span>
                  <span className="text-[#2F5233]">{dist.orders} orders ({dist.percentage}%)</span>
                </div>
                <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-[#2F5233] h-full rounded-full transition-all duration-500"
                    style={{ width: `${dist.percentage * 2}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
