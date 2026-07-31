import React, { useState } from 'react';
import { Users, Search, Award, Mail, Phone, MapPin, Calendar, ShoppingBag, ChevronRight, UserPlus, X } from 'lucide-react';
import { AdminCustomer } from './adminData';

interface CustomersManagerProps {
  customers: AdminCustomer[];
  onAddCustomer: (cust: AdminCustomer) => void;
}

export const CustomersManager: React.FC<CustomersManagerProps> = ({
  customers,
  onAddCustomer,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<AdminCustomer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
  });

  const filteredCustomers = customers.filter((c) => {
    return (
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery) ||
      c.city.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    onAddCustomer({
      id: `cust-${Date.now()}`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      city: formData.city || 'Dhaka',
      totalOrders: 1,
      totalSpent: 1200,
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      status: 'active',
    });

    setIsModalOpen(false);
    setFormData({ name: '', email: '', phone: '', city: '' });
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-stone-200 shadow-2xs">
        <div>
          <h2 className="text-xl font-serif font-black text-[#2F5233] flex items-center gap-2">
            <Users size={22} className="text-emerald-700" /> Plant Parent Community & Customers
          </h2>
          <p className="text-xs text-stone-500">
            View registered gardener profiles, lifetime purchase value, and order frequency.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-[#2F5233] hover:bg-[#1E3A20] text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center justify-center gap-2 cursor-pointer shrink-0"
        >
          <UserPlus size={16} /> Register Customer
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs">
        <div className="relative w-full sm:w-80 text-xs">
          <Search size={16} className="absolute left-3 top-2.5 text-stone-400" />
          <input
            type="text"
            placeholder="Search customer name, phone, or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-stone-50 border border-stone-300 rounded-xl pl-9 pr-3 py-2 text-xs font-medium focus:ring-2 focus:ring-[#2F5233]"
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#FAF7F2] border-b border-stone-200 text-stone-600 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Customer Name</th>
                <th className="py-3 px-4">Contact Info</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Total Orders</th>
                <th className="py-3 px-4">Lifetime Spent</th>
                <th className="py-3 px-4">Tier Status</th>
                <th className="py-3 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-medium">
              {filteredCustomers.map((cust) => (
                <tr key={cust.id} className="hover:bg-stone-50/80 transition">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-emerald-100 text-[#2F5233] font-bold flex items-center justify-center text-xs">
                        {cust.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-bold text-stone-900 text-xs">{cust.name}</h4>
                        <span className="text-[10px] text-stone-400 block">Joined {cust.joinedDate}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-stone-700 space-y-0.5">
                    <div className="flex items-center gap-1">
                      <Mail size={12} className="text-stone-400" /> {cust.email}
                    </div>
                    <div className="flex items-center gap-1 font-mono text-[11px] text-stone-500">
                      <Phone size={12} className="text-emerald-700" /> {cust.phone}
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-stone-700 font-semibold">
                    {cust.city}
                  </td>

                  <td className="py-3.5 px-4 font-bold text-stone-900">
                    {cust.totalOrders} order(s)
                  </td>

                  <td className="py-3.5 px-4 font-black text-[#2F5233] text-xs">
                    ₹{cust.totalSpent.toLocaleString()}
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                        cust.status === 'vip'
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      }`}
                    >
                      {cust.status === 'vip' && <Award size={12} className="text-amber-600" />}
                      {cust.status === 'vip' ? 'VIP Gardener' : 'Active Member'}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedCustomer(cust)}
                      className="p-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg transition cursor-pointer"
                      title="View Customer Profile"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CUSTOMER PROFILE MODAL */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#2F5233] text-white font-serif font-black flex items-center justify-center text-lg">
                  {selectedCustomer.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-[#2F5233]">
                    {selectedCustomer.name}
                  </h3>
                  <span className="text-xs text-stone-400">Gardener Profile</span>
                </div>
              </div>
              <button onClick={() => setSelectedCustomer(null)} className="text-stone-400 hover:text-stone-700">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-xs bg-[#FAF7F2] p-4 rounded-2xl border border-stone-200">
              <div className="flex justify-between">
                <span className="text-stone-500">Phone:</span>
                <span className="font-bold text-stone-900">{selectedCustomer.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Email:</span>
                <span className="font-bold text-stone-900">{selectedCustomer.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">City / Address:</span>
                <span className="font-bold text-stone-900">{selectedCustomer.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Total Orders:</span>
                <span className="font-bold text-[#2F5233]">{selectedCustomer.totalOrders} Completed</span>
              </div>
              <div className="flex justify-between text-sm font-black text-[#2F5233] pt-2 border-t border-stone-200">
                <span>Lifetime Value:</span>
                <span>₹{selectedCustomer.totalSpent.toLocaleString()}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-4 py-2 bg-[#2F5233] text-white rounded-xl text-xs font-bold"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REGISTER NEW CUSTOMER MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h3 className="text-base font-serif font-bold text-[#2F5233]">Register New Customer</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-stone-700">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3 text-xs font-semibold">
              <div>
                <label className="block text-stone-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mahbub Alam"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-stone-700 mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="mahbub@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-stone-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  placeholder="+880 1711 000000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-stone-700 mb-1">City / Region</label>
                <input
                  type="text"
                  placeholder="Dhaka, Bangladesh"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-stone-300 rounded-xl text-stone-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#2F5233] text-white rounded-xl shadow-xs"
                >
                  Save Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
