import React, { useState } from 'react';
import {
  ShoppingBag,
  Search,
  Filter,
  Eye,
  CheckCircle2,
  Clock,
  Truck,
  XCircle,
  FileSpreadsheet,
  Calendar,
  Phone,
  Mail,
  MapPin,
  X,
  Printer,
  ChevronDown,
} from 'lucide-react';
import { PlacedOrder, OrderStatus } from '../../types';

interface OrdersManagerProps {
  orders: PlacedOrder[];
  onUpdateOrderStatus: (orderId: string, status: OrderStatus) => void;
}

export const OrdersManager: React.FC<OrdersManagerProps> = ({ orders, onUpdateOrderStatus }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<PlacedOrder | null>(null);

  // Filtered Orders
  const filteredOrders = orders.filter((ord) => {
    const matchesSearch =
      ord.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.deliveryDetails.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.deliveryDetails.phone.includes(searchQuery);

    const matchesStatus = selectedStatus === 'all' || ord.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Out for Delivery':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Processing':
        return 'bg-indigo-100 text-indigo-800 border-indigo-300';
      case 'Cancelled':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      default:
        return 'bg-amber-100 text-amber-800 border-amber-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-stone-200 shadow-2xs">
        <div>
          <h2 className="text-xl font-serif font-black text-[#2F5233] flex items-center gap-2">
            <ShoppingBag size={22} className="text-emerald-700" /> Customer Orders & Dispatch Desk
          </h2>
          <p className="text-xs text-stone-500">
            Track courier dispatches, update order fulfillment statuses, and issue invoice receipts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const jsonStr = JSON.stringify(orders, null, 2);
              const blob = new Blob([jsonStr], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `Green_Heaven_Orders_${Date.now()}.json`;
              a.click();
            }}
            className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer"
          >
            <FileSpreadsheet size={15} /> Export Orders
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search size={16} className="absolute left-3 top-2.5 text-stone-400" />
            <input
              type="text"
              placeholder="Search by Order ID, Name, or Phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-50 border border-stone-300 rounded-xl pl-9 pr-3 py-2 text-xs font-medium focus:ring-2 focus:ring-[#2F5233]"
            />
          </div>

          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 text-xs">
            {[
              { id: 'all', label: 'All Orders' },
              { id: 'Placed', label: 'Placed (New)' },
              { id: 'Processing', label: 'Processing' },
              { id: 'Out for Delivery', label: 'In Transit' },
              { id: 'Delivered', label: 'Delivered' },
              { id: 'Cancelled', label: 'Cancelled' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedStatus(tab.id)}
                className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition cursor-pointer ${
                  selectedStatus === tab.id
                    ? 'bg-[#2F5233] text-white shadow-xs'
                    : 'bg-stone-50 text-stone-600 hover:bg-stone-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#FAF7F2] border-b border-stone-200 text-stone-600 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Order ID & Date</th>
                <th className="py-3 px-4">Customer Details</th>
                <th className="py-3 px-4">Plant Items</th>
                <th className="py-3 px-4">Payment & Total</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-medium">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-stone-500">
                    No orders found matching your search filters.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((ord) => (
                  <tr key={ord.orderId} className="hover:bg-stone-50/80 transition">
                    <td className="py-3.5 px-4">
                      <div className="font-mono font-bold text-stone-900 text-xs">
                        {ord.orderId}
                      </div>
                      <span className="text-[10px] text-stone-400 block mt-0.5">
                        {ord.createdAt}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-stone-900">{ord.deliveryDetails.name}</div>
                      <div className="text-[10px] text-stone-500">
                        {ord.deliveryDetails.phone} • {ord.deliveryDetails.city}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 max-w-[200px]">
                      <span className="font-semibold text-stone-800 line-clamp-1">
                        {ord.items.map((i) => `${i.quantity}x ${i.name}`).join(', ')}
                      </span>
                      <span className="text-[10px] text-emerald-700 font-bold">
                        {ord.items.length} item(s) total
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-black text-[#2F5233] text-xs">₹{ord.total}</div>
                      <span className="text-[10px] text-stone-500 uppercase font-bold">
                        {ord.paymentMethod === 'cod' ? 'Cash on Delivery' : ord.paymentMethod}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <select
                        value={ord.status}
                        onChange={(e) =>
                          onUpdateOrderStatus(ord.orderId, e.target.value as OrderStatus)
                        }
                        className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border focus:outline-hidden ${getStatusBadge(
                          ord.status
                        )}`}
                      >
                        <option value="Placed">Placed</option>
                        <option value="Processing">Processing</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedOrder(ord)}
                        className="px-3 py-1.5 bg-stone-100 hover:bg-[#2F5233] hover:text-white text-stone-700 rounded-xl transition text-xs font-bold flex items-center gap-1 ml-auto cursor-pointer"
                      >
                        <Eye size={14} /> View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ORDER DETAILS MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto border border-stone-200">
            <div className="flex items-start justify-between border-b border-stone-200 pb-4">
              <div>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Invoice & Order Receipt
                </span>
                <h3 className="text-xl font-serif font-black text-[#2F5233] mt-1">
                  Order #{selectedOrder.orderId}
                </h3>
                <span className="text-xs text-stone-400">Placed on {selectedOrder.createdAt}</span>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            {/* Shipping & Customer Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#FAF7F2] p-4 rounded-2xl border border-stone-200 text-xs">
              <div className="space-y-1">
                <span className="font-bold text-stone-500 uppercase tracking-wider text-[10px]">
                  Customer Shipping Address
                </span>
                <h4 className="font-bold text-stone-900">{selectedOrder.deliveryDetails.name}</h4>
                <p className="text-stone-600 leading-relaxed">
                  {selectedOrder.deliveryDetails.address}, {selectedOrder.deliveryDetails.city},{' '}
                  {selectedOrder.deliveryDetails.state} - {selectedOrder.deliveryDetails.pincode}
                </p>
                <p className="text-stone-700 font-semibold pt-1 flex items-center gap-1">
                  <Phone size={12} className="text-emerald-700" /> {selectedOrder.deliveryDetails.phone}
                </p>
              </div>

              <div className="space-y-1 sm:border-l border-stone-200 sm:pl-4">
                <span className="font-bold text-stone-500 uppercase tracking-wider text-[10px]">
                  Fulfillment Status
                </span>
                <div>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(
                      selectedOrder.status
                    )}`}
                  >
                    {selectedOrder.status}
                  </span>
                </div>
                <p className="text-stone-600 pt-2 font-medium">
                  Payment Method: <span className="font-bold uppercase text-stone-900">{selectedOrder.paymentMethod}</span>
                </p>
                {selectedOrder.courierName && (
                  <p className="text-stone-600 font-medium">
                    Courier: <span className="font-bold text-stone-900">{selectedOrder.courierName}</span> ({selectedOrder.trackingNumber})
                  </p>
                )}
              </div>
            </div>

            {/* Plant Items Breakdown */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-stone-700">
                Ordered Plant Saplings
              </h4>
              <div className="divide-y divide-stone-100 border-t border-b border-stone-200">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="py-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-xl border border-stone-200"
                      />
                      <div>
                        <h5 className="font-serif font-bold text-stone-900">{item.name}</h5>
                        <span className="text-[11px] text-stone-500 block">
                          {item.potSize} • {item.age}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-stone-900">
                        {item.quantity} x ₹{item.unitPrice}
                      </span>
                      <span className="block font-black text-[#2F5233]">
                        ₹{item.lineTotal || item.quantity * item.unitPrice}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Totals Summary */}
            <div className="bg-stone-50 p-4 rounded-2xl space-y-1.5 text-xs text-stone-700 font-semibold">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{selectedOrder.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charge</span>
                <span>₹{selectedOrder.deliveryFee}</span>
              </div>
              {selectedOrder.discount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Discount Applied</span>
                  <span>-₹{selectedOrder.discount}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-black text-[#2F5233] pt-2 border-t border-stone-200">
                <span>Total Paid / Amount Due</span>
                <span>₹{selectedOrder.total}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 border border-stone-300 rounded-xl text-stone-700 font-bold hover:bg-stone-100 flex items-center gap-1.5 text-xs cursor-pointer"
              >
                <Printer size={15} /> Print Invoice
              </button>

              <button
                onClick={() => setSelectedOrder(null)}
                className="px-5 py-2 bg-[#2F5233] text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
