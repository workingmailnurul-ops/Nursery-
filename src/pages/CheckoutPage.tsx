import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  Truck,
  Building,
  CreditCard,
  QrCode,
  MapPin,
  User,
  Phone,
  Mail,
  Home,
  Boxes,
  ArrowLeft,
  ArrowRight,
  ShoppingBag,
  Info,
  Check,
  Copy,
  Clock,
  Sparkles,
  ExternalLink,
  ChevronRight,
  PackageCheck,
  Search,
} from 'lucide-react';
import { useCart, getEffectiveUnitPrice, getCartItemId } from '../context/CartContext';
import { Button } from '../components/Button';
import { PlacedOrder } from '../types';

export const CheckoutPage: React.FC = () => {
  const { cartItems, clearCart, subtotal } = useCart();
  const navigate = useNavigate();

  // Active step in checkout stepper: 1 = Delivery, 2 = Payment, 3 = Review
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [formData, setFormData] = useState({
    name: 'Anisur Rahman',
    phone: '+91 98765 43210',
    email: 'anisur.gardens@gmail.com',
    address: 'Flat 3B, Lake Garden Apartments',
    city: 'Kolkata',
    state: 'West Bengal',
    pincode: '700045',
  });

  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bank_transfer' | 'upi'>('cod');
  const [bankTxRef, setBankTxRef] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [copiedBank, setCopiedBank] = useState(false);

  // Completed Order State (shows confirmation screen when set)
  const [placedOrder, setPlacedOrder] = useState<PlacedOrder | null>(null);

  // Tracking Modal State inside Confirmation Screen
  const [trackingModalOpen, setTrackingModalOpen] = useState(false);

  // Detect Order Type (Bulk if any item qty >= 10 or total qty >= 10)
  const totalQuantity = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const isBulkOrder = useMemo(
    () => cartItems.some((item) => item.quantity >= 10) || totalQuantity >= 10,
    [cartItems, totalQuantity]
  );

  const orderType: 'Retail' | 'Wholesale Bulk' = isBulkOrder ? 'Wholesale Bulk' : 'Retail';

  // Shipping Calculation
  const isFreeDelivery = subtotal >= 2000;
  const deliveryFee = isFreeDelivery ? 0 : isBulkOrder ? 200 : 120;
  const discountAmount = subtotal > 3000 ? Math.round(subtotal * 0.1) : 0;
  const finalTotal = subtotal - discountAmount + deliveryFee;

  // Handle Form Change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Step Validation
  const isStep1Valid =
    formData.name.trim() !== '' &&
    formData.phone.trim() !== '' &&
    formData.address.trim() !== '' &&
    formData.city.trim() !== '' &&
    formData.state.trim() !== '' &&
    formData.pincode.trim() !== '';

  // Handle Order Placement
  const handlePlaceOrder = () => {
    if (!isStep1Valid) {
      alert('Please complete all required delivery details before placing the order.');
      setCurrentStep(1);
      return;
    }

    const orderId = `AMT-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: PlacedOrder = {
      orderId,
      createdAt: new Date().toLocaleString(),
      items: cartItems.map((item) => {
        const base = item.baseUnitPrice || item.product.price;
        const effectiveUnit = getEffectiveUnitPrice(base, item.quantity);
        return {
          id: item.product.id,
          name: item.product.name,
          image: item.product.image,
          category: item.product.category,
          potSize: item.selectedPotSize || '10-inch Nursery Soil Bag',
          age: item.selectedAge || '1.5 Year Grafted',
          quantity: item.quantity,
          unitPrice: effectiveUnit,
          lineTotal: effectiveUnit * item.quantity,
        };
      }),
      deliveryDetails: { ...formData },
      orderType,
      paymentMethod,
      subtotal,
      deliveryFee,
      discount: discountAmount,
      total: finalTotal,
      status: 'Placed',
      courierName: 'Delhivery Express / India Post Speed',
      trackingNumber: `DT-${Math.floor(100000 + Math.random() * 900000)}`,
      estimatedDeliveryDate: '2-4 Business Days',
    };

    // Save to localStorage array
    try {
      const existingStr = localStorage.getItem('green_heaven_placed_orders') || localStorage.getItem('amtola_placed_orders');
      const existingOrders: PlacedOrder[] = existingStr ? JSON.parse(existingStr) : [];
      localStorage.setItem('green_heaven_placed_orders', JSON.stringify([newOrder, ...existingOrders]));
    } catch (e) {
      console.error('Failed to save order in localStorage:', e);
    }

    setPlacedOrder(newOrder);
    clearCart();
  };

  // -------------------------------------------------------------
  // ORDER CONFIRMATION SCREEN
  // -------------------------------------------------------------
  if (placedOrder) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8 animate-fadeIn">
        {/* SUCCESS HEADER BANNER */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-lg text-center space-y-6 relative overflow-hidden">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner border border-emerald-200">
            <CheckCircle2 size={48} />
          </div>

          <div className="space-y-2">
            <span className="bg-[#2F5233] text-white font-extrabold text-xs px-3.5 py-1 rounded-full uppercase tracking-wider inline-block">
              Order Confirmed • ID: {placedOrder.orderId}
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-black text-[#2F5233]">
              Thank You! Your Plant Order is Placed
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto leading-relaxed">
              We have received your request for{' '}
              <strong className="text-[#2F5233]">
                {placedOrder.items.reduce((sum, i) => sum + i.quantity, 0)} Grafted Saplings
              </strong>
              . Our certified nursery horticulturists are inspecting and preparing your rootstock.
            </p>
          </div>

          {/* TEAM CALLOUT NOTICE */}
          <div className="bg-amber-50 border-2 border-amber-300 p-4 sm:p-5 rounded-2xl text-left max-w-2xl mx-auto space-y-1 text-amber-950 shadow-xs">
            <div className="flex items-center gap-2 font-serif font-bold text-sm text-[#2F5233]">
              <Phone className="text-[#E8862E]" size={18} />
              Stock Verification & Confirmation Call Notice
            </div>
            <p className="text-xs text-amber-900 leading-relaxed font-medium">
              Our nursery team will call you at{' '}
              <strong className="text-[#2F5233]">{placedOrder.deliveryDetails.phone}</strong> within 2 hours
              to verify plant height, root gel moisture sealing, and courier dispatch timeline.
            </p>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button
              variant="accent"
              size="lg"
              onClick={() => setTrackingModalOpen(true)}
              leftIcon={<Search size={18} />}
            >
              Track Order Status
            </Button>
            <Link to="/shop">
              <Button variant="primary" size="lg" leftIcon={<ShoppingBag size={18} />}>
                Continue Shopping Saplings
              </Button>
            </Link>
          </div>
        </div>

        {/* ORDER DETAILS RECAP GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT: ORDERED ITEMS LIST */}
          <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
            <h3 className="font-serif font-bold text-lg text-[#2F5233] border-b border-stone-100 pb-3 flex items-center justify-between">
              <span>Order Summary ({placedOrder.items.length} Varieties)</span>
              <span className="text-xs font-sans font-bold bg-[#FAF7F2] text-stone-700 px-2.5 py-1 rounded-lg border border-stone-200">
                {placedOrder.orderType} Mode
              </span>
            </h3>

            <div className="divide-y divide-stone-100">
              {placedOrder.items.map((item, idx) => (
                <div key={idx} className="py-3 flex items-center gap-3.5 text-xs">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-xl border border-stone-200 bg-[#FAF7F2] shrink-0"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=400&q=80';
                    }}
                  />
                  <div className="flex-1 space-y-0.5">
                    <h4 className="font-serif font-bold text-xs text-[#2F5233]">{item.name}</h4>
                    <p className="text-[11px] text-stone-500">
                      {item.potSize} • {item.age}
                    </p>
                    <span className="text-stone-400 font-medium">
                      Qty: <strong>{item.quantity}</strong> × ₹{item.unitPrice}
                    </span>
                  </div>
                  <span className="font-serif font-bold text-sm text-[#2F5233]">
                    ₹{item.lineTotal.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-stone-200 space-y-2 text-xs text-stone-600 pt-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-stone-800">₹{placedOrder.subtotal.toLocaleString()}</span>
              </div>
              {placedOrder.discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Volume Discount</span>
                  <span>-₹{placedOrder.discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping & Root Gel Packaging</span>
                <span className="font-bold text-stone-800">
                  {placedOrder.deliveryFee === 0 ? 'FREE' : `₹${placedOrder.deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-stone-200 text-sm font-bold text-[#2F5233]">
                <span>Total Amount Paid / Due</span>
                <span className="text-lg font-serif font-black">₹{placedOrder.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* RIGHT: DELIVERY & PAYMENT RECAP */}
          <div className="lg:col-span-5 space-y-6">
            {/* Delivery Destination */}
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-3">
              <h3 className="font-serif font-bold text-base text-[#2F5233] flex items-center gap-2 border-b border-stone-100 pb-2">
                <MapPin size={18} className="text-[#E8862E]" /> Delivery Address
              </h3>
              <div className="text-xs text-stone-600 space-y-1">
                <p className="font-bold text-[#2F5233] text-sm">{placedOrder.deliveryDetails.name}</p>
                <p className="flex items-center gap-1.5 font-medium text-stone-700">
                  <Phone size={13} className="text-stone-400" /> {placedOrder.deliveryDetails.phone}
                </p>
                {placedOrder.deliveryDetails.email && (
                  <p className="flex items-center gap-1.5 font-medium text-stone-500">
                    <Mail size={13} className="text-stone-400" /> {placedOrder.deliveryDetails.email}
                  </p>
                )}
                <p className="pt-1 leading-relaxed">
                  {placedOrder.deliveryDetails.address}, {placedOrder.deliveryDetails.city},{' '}
                  {placedOrder.deliveryDetails.state} - {placedOrder.deliveryDetails.pincode}
                </p>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-3">
              <h3 className="font-serif font-bold text-base text-[#2F5233] flex items-center gap-2 border-b border-stone-100 pb-2">
                <CreditCard size={18} className="text-[#E8862E]" /> Payment Method
              </h3>
              <div className="text-xs text-stone-700 space-y-1">
                <span className="font-bold uppercase text-[#2F5233] block">
                  {placedOrder.paymentMethod === 'cod'
                    ? '💵 Cash on Delivery (COD)'
                    : placedOrder.paymentMethod === 'bank_transfer'
                    ? '🏦 Bank Transfer (Stock Verification Pending)'
                    : '📱 UPI / Mobile Banking Manual Verification'}
                </span>
                <p className="text-[11px] text-stone-500 leading-snug">
                  {placedOrder.paymentMethod === 'cod'
                    ? 'Pay cash to courier upon inspecting live plant stems.'
                    : 'Our account manager will verify transaction receipt after calling.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ORDER TRACKING MODAL */}
        {trackingModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl border border-stone-200 relative animate-scaleUp">
              <button
                onClick={() => setTrackingModalOpen(false)}
                className="absolute top-4 right-4 text-stone-400 hover:text-stone-700"
              >
                ✕
              </button>

              <div className="space-y-1">
                <span className="text-xs font-bold uppercase text-[#E8862E] tracking-wider flex items-center gap-1">
                  <PackageCheck size={16} /> Live Order Tracker
                </span>
                <h3 className="font-serif font-bold text-xl text-[#2F5233]">
                  Order #{placedOrder.orderId} Status
                </h3>
              </div>

              {/* TRACKING TIMELINE STEPS */}
              <div className="space-y-4 text-xs">
                {[
                  {
                    step: 1,
                    title: 'Order Placed & Received',
                    desc: 'Your grafted plant selection has been registered in our nursery dashboard.',
                    active: true,
                    time: 'Completed',
                  },
                  {
                    step: 2,
                    title: 'Mother Stock Health Check',
                    desc: 'Chief Horticulturist inspecting grafted joint & rootstock firmness.',
                    active: true,
                    time: 'In Progress',
                  },
                  {
                    step: 3,
                    title: 'Moisture Root Gel Packing',
                    desc: 'Roots wrapped in damp coco-peat and locked inside double-crate container.',
                    active: false,
                    time: 'Upcoming',
                  },
                  {
                    step: 4,
                    title: 'Handover to Express Courier',
                    desc: 'Dispatched via conditioned plant transport vehicle.',
                    active: false,
                    time: 'Upcoming',
                  },
                ].map((s) => (
                  <div key={s.step} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                          s.active
                            ? 'bg-[#2F5233] text-white ring-4 ring-[#2F5233]/20'
                            : 'bg-stone-200 text-stone-500'
                        }`}
                      >
                        {s.step}
                      </div>
                      {s.step < 4 && <div className="w-0.5 h-10 bg-stone-200 my-1" />}
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-stone-800 text-xs">{s.title}</span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${
                            s.time === 'Completed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : s.time === 'In Progress'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-stone-100 text-stone-500'
                          }`}
                        >
                          {s.time}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500 leading-snug">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                variant="outline"
                size="md"
                fullWidth
                onClick={() => setTrackingModalOpen(false)}
              >
                Close Tracker
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // -------------------------------------------------------------
  // EMPTY CART GUARD IN CHECKOUT
  // -------------------------------------------------------------
  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto my-12 p-8 sm:p-12 bg-white rounded-3xl border border-stone-200 text-center space-y-6 shadow-sm">
        <div className="w-20 h-20 bg-emerald-50 text-[#2F5233] rounded-full flex items-center justify-center mx-auto border border-emerald-100">
          <ShoppingBag size={36} />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-serif font-black text-[#2F5233]">
            No Items in Cart to Checkout
          </h2>
          <p className="text-xs text-stone-500 max-w-md mx-auto">
            Please select your desired grafted fruit trees or combo packs from our shop first.
          </p>
        </div>
        <Link to="/shop">
          <Button variant="accent" size="lg" rightIcon={<ArrowRight size={18} />}>
            Browse Fruit Saplings
          </Button>
        </Link>
      </div>
    );
  }

  // -------------------------------------------------------------
  // MAIN CHECKOUT FLOW STEPPER PAGE
  // -------------------------------------------------------------
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* PAGE HEADER & BREADCRUMB */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <nav aria-label="Breadcrumb" className="flex items-center text-xs text-stone-500 gap-1.5 mb-1">
            <Link to="/cart" className="hover:text-[#2F5233] font-medium flex items-center gap-1">
              <ArrowLeft size={12} /> Return to Cart
            </Link>
            <ChevronRight size={12} />
            <span className="font-bold text-[#2F5233]">Checkout Order</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-[#2F5233] flex items-center gap-2.5">
            <ShieldCheck size={28} className="text-[#E8862E]" />
            Secure Plant Checkout
          </h1>
        </div>

        {/* ORDER TYPE INDICATOR BADGE */}
        <div className="flex items-center gap-2 bg-[#FAF7F2] p-2.5 rounded-2xl border border-stone-200">
          <Boxes size={20} className={isBulkOrder ? 'text-[#E8862E]' : 'text-emerald-700'} />
          <div className="text-left">
            <span className="text-[10px] text-stone-400 font-bold uppercase block">Order Type</span>
            <span className="text-xs font-black text-[#2F5233]">
              {orderType} Mode ({totalQuantity} Saplings)
            </span>
          </div>
        </div>
      </div>

      {/* STEPPER PROGRESS TABS */}
      <div className="grid grid-cols-3 gap-2 bg-stone-100 p-1.5 rounded-2xl text-xs font-bold">
        <button
          onClick={() => setCurrentStep(1)}
          className={`py-2.5 px-3 rounded-xl transition flex items-center justify-center gap-2 ${
            currentStep === 1
              ? 'bg-[#2F5233] text-white shadow-xs'
              : isStep1Valid
              ? 'bg-white text-stone-700 hover:bg-stone-200'
              : 'text-stone-500'
          }`}
        >
          <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">
            1
          </span>
          <span className="hidden sm:inline">1. Delivery Details</span>
        </button>

        <button
          onClick={() => isStep1Valid && setCurrentStep(2)}
          disabled={!isStep1Valid}
          className={`py-2.5 px-3 rounded-xl transition flex items-center justify-center gap-2 ${
            currentStep === 2
              ? 'bg-[#2F5233] text-white shadow-xs'
              : 'bg-white text-stone-700 hover:bg-stone-200 disabled:opacity-50'
          }`}
        >
          <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">
            2
          </span>
          <span className="hidden sm:inline">2. Payment Method</span>
        </button>

        <button
          onClick={() => isStep1Valid && setCurrentStep(3)}
          disabled={!isStep1Valid}
          className={`py-2.5 px-3 rounded-xl transition flex items-center justify-center gap-2 ${
            currentStep === 3
              ? 'bg-[#2F5233] text-white shadow-xs'
              : 'bg-white text-stone-700 hover:bg-stone-200 disabled:opacity-50'
          }`}
        >
          <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">
            3
          </span>
          <span className="hidden sm:inline">3. Review & Place Order</span>
        </button>
      </div>

      {/* MAIN CHECKOUT FORM & SUMMARY GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: ACTIVE STEP FORMS */}
        <div className="lg:col-span-8 space-y-6">
          {/* STEP 1: DELIVERY DETAILS FORM */}
          {currentStep === 1 && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6 animate-fadeIn">
              <div className="border-b border-stone-200 pb-4">
                <span className="text-[11px] font-extrabold text-[#E8862E] uppercase tracking-wider block">
                  Step 1 of 3
                </span>
                <h2 className="text-2xl font-serif font-black text-[#2F5233] flex items-center gap-2">
                  <MapPin size={22} className="text-[#E8862E]" /> Delivery & Recipient Details
                </h2>
                <p className="text-xs text-stone-500 pt-0.5">
                  Enter address where courier can deliver moisture-sealed wooden crates safely.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* Full Name */}
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Full Name *</label>
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-2.5 text-stone-400" />
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Mahfuzur Rahman"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-[#FAF7F2] border border-stone-300 rounded-xl pl-9 pr-3.5 py-2.5 text-xs font-semibold focus:ring-2 focus:ring-[#2F5233]"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Phone Number / WhatsApp *</label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3 top-2.5 text-stone-400" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-[#FAF7F2] border border-stone-300 rounded-xl pl-9 pr-3.5 py-2.5 text-xs font-semibold focus:ring-2 focus:ring-[#2F5233]"
                    />
                  </div>
                </div>

                {/* Email Optional */}
                <div className="sm:col-span-2">
                  <label className="font-bold text-stone-700 block mb-1">
                    Email Address <span className="text-stone-400 font-normal">(Optional for order updates)</span>
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-2.5 text-stone-400" />
                    <input
                      type="email"
                      name="email"
                      placeholder="e.g. customer@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-[#FAF7F2] border border-stone-300 rounded-xl pl-9 pr-3.5 py-2.5 text-xs font-semibold focus:ring-2 focus:ring-[#2F5233]"
                    />
                  </div>
                </div>

                {/* Street Address */}
                <div className="sm:col-span-2">
                  <label className="font-bold text-stone-700 block mb-1">Full Street Address *</label>
                  <div className="relative">
                    <Home size={16} className="absolute left-3 top-3 text-stone-400" />
                    <input
                      type="text"
                      name="address"
                      required
                      placeholder="Flat/House No, Road, Area, Landmark..."
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full bg-[#FAF7F2] border border-stone-300 rounded-xl pl-9 pr-3.5 py-2.5 text-xs font-semibold focus:ring-2 focus:ring-[#2F5233]"
                    />
                  </div>
                </div>

                {/* City */}
                <div>
                  <label className="font-bold text-stone-700 block mb-1">City / District *</label>
                  <input
                    type="text"
                    name="city"
                    required
                    placeholder="e.g. Kolkata"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full bg-[#FAF7F2] border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:ring-2 focus:ring-[#2F5233]"
                  />
                </div>

                {/* State / Division */}
                <div>
                  <label className="font-bold text-stone-700 block mb-1">State *</label>
                  <input
                    type="text"
                    name="state"
                    required
                    placeholder="e.g. West Bengal"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full bg-[#FAF7F2] border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:ring-2 focus:ring-[#2F5233]"
                  />
                </div>

                {/* Pincode */}
                <div>
                  <label className="font-bold text-stone-700 block mb-1">6-Digit PIN Code *</label>
                  <input
                    type="text"
                    name="pincode"
                    required
                    placeholder="e.g. 700045"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="w-full bg-[#FAF7F2] border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:ring-2 focus:ring-[#2F5233]"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100 flex justify-end">
                <Button
                  variant="accent"
                  size="lg"
                  disabled={!isStep1Valid}
                  onClick={() => setCurrentStep(2)}
                  rightIcon={<ArrowRight size={18} />}
                >
                  Continue to Payment Method
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2: PAYMENT METHOD SELECTION */}
          {currentStep === 2 && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6 animate-fadeIn">
              <div className="border-b border-stone-200 pb-4">
                <span className="text-[11px] font-extrabold text-[#E8862E] uppercase tracking-wider block">
                  Step 2 of 3
                </span>
                <h2 className="text-2xl font-serif font-black text-[#2F5233] flex items-center gap-2">
                  <CreditCard size={22} className="text-[#E8862E]" /> Select Payment Method
                </h2>
                <p className="text-xs text-stone-500 pt-0.5">
                  Choose how you wish to pay. No immediate card charging required.
                </p>
              </div>

              {/* PAYMENT OPTIONS RADIOS */}
              <div className="space-y-3">
                {/* 1. CASH ON DELIVERY */}
                <label
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer block transition ${
                    paymentMethod === 'cod'
                      ? 'border-[#2F5233] bg-[#FAF7F2] ring-2 ring-[#2F5233]/20'
                      : 'border-stone-200 bg-white hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="text-[#2F5233] focus:ring-[#2F5233]"
                    />
                    <Building size={22} className="text-[#2F5233]" />
                    <div className="flex-1">
                      <span className="font-serif font-bold text-sm text-[#2F5233] block">
                        Cash on Delivery (COD)
                      </span>
                      <span className="text-xs text-stone-500 block">
                        Pay cash after receiving and inspecting live sapling crates.
                      </span>
                    </div>
                  </div>
                </label>

                {/* 2. BANK TRANSFER */}
                <label
                  onClick={() => setPaymentMethod('bank_transfer')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer block transition ${
                    paymentMethod === 'bank_transfer'
                      ? 'border-[#2F5233] bg-[#FAF7F2] ring-2 ring-[#2F5233]/20'
                      : 'border-stone-200 bg-white hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'bank_transfer'}
                      onChange={() => setPaymentMethod('bank_transfer')}
                      className="text-[#2F5233] focus:ring-[#2F5233]"
                    />
                    <Building size={22} className="text-blue-700" />
                    <div className="flex-1">
                      <span className="font-serif font-bold text-sm text-[#2F5233] block">
                        Bank Transfer / NEFT / RTGS
                      </span>
                      <span className="text-xs text-stone-500 block">
                        Direct bank account transfer (Preferred for Wholesale Bulk orders).
                      </span>
                    </div>
                  </div>

                  {/* BANK DETAILS EXPANDABLE TEXT */}
                  {paymentMethod === 'bank_transfer' && (
                    <div className="mt-4 bg-white p-4 rounded-xl border border-stone-200 text-xs space-y-2 animate-fadeIn">
                      <div className="flex justify-between items-center border-b border-stone-100 pb-2">
                        <span className="font-bold text-[#2F5233]">Official Nursery Account:</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigator.clipboard.writeText('382910485720');
                            setCopiedBank(true);
                            setTimeout(() => setCopiedBank(false), 2000);
                          }}
                          className="text-[#2F5233] font-bold text-[11px] hover:underline flex items-center gap-1"
                        >
                          {copiedBank ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                          {copiedBank ? 'Copied!' : 'Copy Account No'}
                        </button>
                      </div>
                      <p className="text-stone-700"><strong>Account Name:</strong> Talukdar Organic Nursery Pvt Ltd</p>
                      <p className="text-stone-700"><strong>Account Number:</strong> 382910485720</p>
                      <p className="text-stone-700"><strong>Bank Name:</strong> State Bank of India (SBI)</p>
                      <p className="text-stone-700"><strong>IFSC Code:</strong> SBIN0001234</p>
                      <p className="text-stone-700"><strong>Branch:</strong> Malda / Kolkata Main Branch</p>

                      <div className="bg-amber-100/70 p-2.5 rounded-lg border border-amber-300 text-amber-900 font-bold text-[11px] flex items-center gap-2">
                        <Info size={16} className="text-amber-700 shrink-0" />
                        <span>Notice: Pay after we confirm stock availability during our call.</span>
                      </div>
                    </div>
                  )}
                </label>

                {/* 3. UPI / MOBILE BANKING */}
                <label
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer block transition ${
                    paymentMethod === 'upi'
                      ? 'border-[#2F5233] bg-[#FAF7F2] ring-2 ring-[#2F5233]/20'
                      : 'border-stone-200 bg-white hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                      className="text-[#2F5233] focus:ring-[#2F5233]"
                    />
                    <QrCode size={22} className="text-purple-700" />
                    <div className="flex-1">
                      <span className="font-serif font-bold text-sm text-[#2F5233] block">
                        UPI Instant Payment (GPay / PhonePe / Paytm)
                      </span>
                      <span className="text-xs text-stone-500 block">
                        Instant scan & pay via any Indian UPI app or QR code.
                      </span>
                    </div>
                  </div>

                  {/* UPI DETAILS EXPANDABLE AREA */}
                  {paymentMethod === 'upi' && (
                    <div className="mt-4 bg-white p-4 rounded-xl border border-stone-200 text-xs space-y-3 animate-fadeIn">
                      <div className="flex flex-col sm:flex-row items-center gap-4">
                        {/* Mock QR Placeholder */}
                        <div className="w-28 h-28 bg-stone-900 text-white rounded-xl flex flex-col items-center justify-center p-2 text-center shrink-0 border border-stone-300">
                          <QrCode size={40} className="text-amber-400 mb-1" />
                          <span className="text-[9px] font-mono tracking-tighter">SCAN WITH UPI</span>
                        </div>

                        <div className="space-y-1.5 flex-1">
                          <span className="font-bold text-[#2F5233] block">UPI / Mobile Wallet:</span>
                          <div className="bg-[#FAF7F2] p-2 rounded-lg font-mono text-stone-800 font-bold flex items-center justify-between">
                            <span>UPI ID: talukdar.nursery@sbi</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                navigator.clipboard.writeText('talukdar.nursery@sbi');
                                setCopiedUpi(true);
                                setTimeout(() => setCopiedUpi(false), 2000);
                              }}
                              className="text-[#2F5233] text-[11px] font-sans hover:underline"
                            >
                              {copiedUpi ? 'Copied' : 'Copy'}
                            </button>
                          </div>
                          <p className="text-stone-600"><strong>GPay / PhonePe Number:</strong> +91 70027 65701 / +91 87219 09049</p>
                        </div>
                      </div>

                      <div className="bg-sky-50 p-2.5 rounded-lg border border-sky-200 text-sky-900 font-medium text-[11px]">
                        ℹ️ Manual payment — our team will verify the Transaction ID during order confirmation call.
                      </div>
                    </div>
                  )}
                </label>
              </div>

              {/* STEP 2 NAV BUTTONS */}
              <div className="pt-4 border-t border-stone-100 flex justify-between">
                <Button variant="outline" size="md" onClick={() => setCurrentStep(1)} leftIcon={<ArrowLeft size={16} />}>
                  Back
                </Button>
                <Button variant="accent" size="lg" onClick={() => setCurrentStep(3)} rightIcon={<ArrowRight size={18} />}>
                  Proceed to Order Review
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: ORDER REVIEW & PLACE ORDER */}
          {currentStep === 3 && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6 animate-fadeIn">
              <div className="border-b border-stone-200 pb-4">
                <span className="text-[11px] font-extrabold text-[#E8862E] uppercase tracking-wider block">
                  Step 3 of 3
                </span>
                <h2 className="text-2xl font-serif font-black text-[#2F5233] flex items-center gap-2">
                  <ShieldCheck size={22} className="text-[#E8862E]" /> Final Order Review
                </h2>
                <p className="text-xs text-stone-500 pt-0.5">
                  Review recipient address and items before generating official nursery order ticket.
                </p>
              </div>

              {/* RECAP GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* Delivery Address Recap */}
                <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-stone-200 space-y-1 relative">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="absolute top-3 right-3 text-[11px] font-bold text-[#2F5233] hover:underline"
                  >
                    Edit
                  </button>
                  <span className="font-bold text-[#2F5233] flex items-center gap-1.5">
                    <MapPin size={14} className="text-[#E8862E]" /> Delivery Address
                  </span>
                  <p className="font-bold text-stone-800 pt-1">{formData.name}</p>
                  <p className="text-stone-600">{formData.phone}</p>
                  <p className="text-stone-500 leading-snug">
                    {formData.address}, {formData.city}, {formData.state} - {formData.pincode}
                  </p>
                </div>

                {/* Payment Method Recap */}
                <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-stone-200 space-y-1 relative">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="absolute top-3 right-3 text-[11px] font-bold text-[#2F5233] hover:underline"
                  >
                    Edit
                  </button>
                  <span className="font-bold text-[#2F5233] flex items-center gap-1.5">
                    <CreditCard size={14} className="text-[#E8862E]" /> Selected Payment
                  </span>
                  <p className="font-bold text-stone-800 pt-1 capitalize">
                    {paymentMethod === 'cod'
                      ? 'Cash on Delivery (COD)'
                      : paymentMethod === 'bank_transfer'
                      ? 'Bank Transfer / EFT'
                      : 'UPI / Mobile Banking'}
                  </p>
                  <p className="text-stone-500">
                    {paymentMethod === 'cod'
                      ? 'Pay cash upon delivery'
                      : 'Pay after stock confirmation'}
                  </p>
                </div>
              </div>

              {/* CART ITEMS RECAP LIST */}
              <div className="space-y-3 pt-2">
                <span className="font-serif font-bold text-sm text-[#2F5233] block">
                  Items to be Dispatched ({cartItems.length} Varieties)
                </span>
                <div className="divide-y divide-stone-100 bg-[#FAF7F2] p-4 rounded-2xl border border-stone-200">
                  {cartItems.map((item) => {
                    const base = item.baseUnitPrice || item.product.price;
                    const effectiveUnit = getEffectiveUnitPrice(base, item.quantity);
                    return (
                      <div key={item.product.id} className="py-2.5 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-12 h-12 object-cover rounded-xl border border-stone-200 bg-white"
                            onError={(e) => {
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=400&q=80';
                            }}
                          />
                          <div>
                            <span className="font-bold text-[#2F5233] block">{item.product.name}</span>
                            <span className="text-[11px] text-stone-500">
                              Qty: {item.quantity} × ₹{effectiveUnit} ({item.selectedPotSize || 'Soil Bag'})
                            </span>
                          </div>
                        </div>
                        <span className="font-serif font-bold text-stone-800">
                          ₹{(effectiveUnit * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* STEP 3 PLACE ORDER FINAL BUTTON */}
              <div className="pt-4 border-t border-stone-100 flex justify-between items-center">
                <Button variant="outline" size="md" onClick={() => setCurrentStep(2)} leftIcon={<ArrowLeft size={16} />}>
                  Back
                </Button>
                <Button
                  variant="accent"
                  size="lg"
                  onClick={handlePlaceOrder}
                  leftIcon={<CheckCircle2 size={18} />}
                >
                  Place Order Now (₹{finalTotal.toLocaleString()})
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: STICKY ORDER SUMMARY SIDEBAR */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-md space-y-5 sticky top-24">
            <h3 className="font-serif font-bold text-xl text-[#2F5233] border-b border-stone-200 pb-3 flex items-center gap-2">
              <ShoppingBag size={20} className="text-[#E8862E]" /> Summary Breakdown
            </h3>

            {/* ORDER TYPE BANNER */}
            <div className="bg-[#FAF7F2] p-3 rounded-2xl border border-stone-200 text-xs space-y-1">
              <span className="font-extrabold text-[#E8862E] flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
                <Boxes size={13} /> {orderType} Classification
              </span>
              <p className="text-stone-600 text-[11px] leading-tight">
                {isBulkOrder
                  ? 'Wholesale volume tiers applied across items. Packed in crate crates.'
                  : 'Retail order wrapped in individual root gel moisture pouches.'}
              </p>
            </div>

            {/* FINANCIAL BREAKDOWN */}
            <div className="space-y-2.5 text-xs text-stone-600 pt-1">
              <div className="flex justify-between">
                <span>Subtotal ({totalQuantity} Plants)</span>
                <span className="font-bold text-stone-800">₹{subtotal.toLocaleString()}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Special Discount</span>
                  <span>-₹{discountAmount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Estimated Courier Fee</span>
                <span className="font-bold text-stone-800">
                  {deliveryFee === 0 ? <span className="text-emerald-700">FREE</span> : `₹${deliveryFee}`}
                </span>
              </div>
            </div>

            {/* TOTAL */}
            <div className="pt-3 border-t border-stone-200 flex justify-between items-baseline">
              <div>
                <span className="font-serif font-bold text-lg text-[#2F5233]">Total Amount</span>
                <span className="text-[10px] text-stone-400 block">Inclusive of all taxes</span>
              </div>
              <span className="text-2xl font-serif font-black text-[#2F5233]">
                ₹{finalTotal.toLocaleString()}
              </span>
            </div>

            {/* LIVE ARRIVAL GUARANTEE */}
            <div className="bg-emerald-50 p-3.5 rounded-2xl border border-emerald-200 text-[11px] text-emerald-900 space-y-1">
              <span className="font-bold flex items-center gap-1.5">
                <ShieldCheck size={16} className="text-emerald-700" /> 100% Transit Live Guarantee
              </span>
              <p className="text-[10px] text-emerald-800/80 leading-snug">
                Free replacement if plant stems suffer any transit breakage or wilting.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
