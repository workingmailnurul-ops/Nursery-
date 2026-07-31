import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  ArrowRight,
  Trash2,
  Plus,
  Minus,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Ticket,
  Boxes,
  MapPin,
  Sparkles,
  ChevronRight,
  Info,
  RotateCcw,
  Sprout,
  Check,
  PhoneCall,
  X,
  CreditCard,
  Building,
} from 'lucide-react';
import { useCart, getEffectiveUnitPrice, getCartItemId } from '../context/CartContext';
import { Button } from '../components/Button';

export const CartPage: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, subtotal, cartCount } = useCart();
  const navigate = useNavigate();

  // Delivery options state
  const [deliveryRegion, setDeliveryRegion] = useState<'metro' | 'national' | 'express'>('metro');

  // Promo code state
  const [coupon, setCoupon] = useState('GROW2026');
  const [discountApplied, setDiscountApplied] = useState(true);
  const [couponError, setCouponError] = useState('');

  // Checkout Modal State
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
    name: '',
    phone: '',
    address: '',
    city: 'Kolkata',
    paymentMethod: 'cod',
    notes: '',
  });

  // Calculate delivery fee
  const isFreeDelivery = subtotal >= 2000;
  const deliveryFee = isFreeDelivery
    ? 0
    : deliveryRegion === 'metro'
    ? 99
    : deliveryRegion === 'national'
    ? 180
    : 290;

  // Calculate discount (10% if GROW2026 applied)
  const discountAmount = discountApplied ? Math.round(subtotal * 0.1) : 0;
  const finalTotal = subtotal - discountAmount + deliveryFee;

  // Count items with bulk pricing applied
  const bulkItemsCount = cartItems.filter((i) => i.quantity >= 10).length;

  // Apply Coupon logic
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = coupon.trim().toUpperCase();
    if (clean === 'GROW2026' || clean === 'GARDEN10' || clean === 'BULK15') {
      setDiscountApplied(true);
      setCouponError('');
    } else {
      setCouponError('Invalid promo code. Try GROW2026 for 10% OFF!');
      setDiscountApplied(false);
    }
  };

  const handleRemoveCoupon = () => {
    setDiscountApplied(false);
    setCoupon('');
    setCouponError('');
  };

  // Submit Order / Checkout
  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderSuccess(true);
    clearCart();
  };

  // ORDER SUCCESS SCREEN
  if (orderSuccess) {
    return (
      <div className="max-w-3xl mx-auto my-12 p-8 sm:p-10 bg-white rounded-3xl border border-stone-200 shadow-xl text-center space-y-6">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 size={44} />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E8862E]">
            Order Received • #AMT-{Math.floor(100000 + Math.random() * 900000)}
          </span>
          <h1 className="text-3xl font-serif font-black text-[#2F5233]">
            Thank You for Your Order!
          </h1>
          <p className="text-xs text-stone-600 max-w-lg mx-auto leading-relaxed">
            Your grafted sapling order has been placed successfully. Our nursery packing team is carefully preparing your plants with moisture-retaining root gel.
          </p>
        </div>

        <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-stone-200 text-xs text-stone-700 space-y-3 text-left max-w-lg mx-auto">
          <div className="flex justify-between border-b border-stone-200 pb-2">
            <span className="font-bold text-[#2F5233]">Payment Method:</span>
            <span className="font-semibold capitalize text-stone-800">
              {checkoutForm.paymentMethod === 'cod' ? 'Cash on Delivery' : 'bKash / Nagad Mobile Banking'}
            </span>
          </div>
          <div className="flex justify-between border-b border-stone-200 pb-2">
            <span className="font-bold text-[#2F5233]">Delivery Destination:</span>
            <span className="font-semibold text-stone-800">
              {checkoutForm.address || 'Uttara, Sector 4'}, {checkoutForm.city}
            </span>
          </div>
          <div className="flex justify-between pt-1">
            <span className="font-bold text-[#2F5233]">Transit Guarantee:</span>
            <span className="font-bold text-emerald-700 flex items-center gap-1">
              <ShieldCheck size={14} /> 100% Live Arrival Assured
            </span>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/shop">
            <Button variant="primary" size="lg" leftIcon={<Sprout size={18} />}>
              Continue Shopping Fruit Trees
            </Button>
          </Link>
          <Link to="/">
            <Button variant="outline" size="lg">
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // EMPTY CART STATE
  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto my-12 p-8 sm:p-12 bg-white rounded-3xl border border-stone-200 text-center space-y-6 shadow-sm">
        <div className="w-20 h-20 bg-emerald-50 text-[#2F5233] rounded-full flex items-center justify-center mx-auto border border-emerald-100">
          <ShoppingBag size={36} />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-serif font-black text-[#2F5233]">
            Your Nursery Cart is Currently Empty
          </h2>
          <p className="text-xs text-stone-500 max-w-md mx-auto leading-relaxed">
            Discover our premium selection of 100% certified grafted mangoes, dwarf citrus trees, exotic guavas, and saver combo packs ready for your rooftop or garden.
          </p>
        </div>

        <div className="pt-2">
          <Link to="/shop">
            <Button variant="accent" size="lg" rightIcon={<ArrowRight size={18} />}>
              Continue Shopping Saplings
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. CART HEADER BREADCRUMB & BANNER */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <nav aria-label="Breadcrumb" className="flex items-center text-xs text-stone-500 gap-1.5 mb-1">
            <Link to="/" className="hover:text-[#2F5233] font-medium">Home</Link>
            <ChevronRight size={12} />
            <span className="font-bold text-[#2F5233]">Shopping Cart</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-[#2F5233] flex items-center gap-2.5">
            <ShoppingBag size={28} className="text-[#E8862E]" />
            Your Nursery Cart ({cartCount} {cartCount === 1 ? 'Plant' : 'Plants'})
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {bulkItemsCount > 0 && (
            <span className="bg-[#E8862E] text-white text-xs font-extrabold px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-xs">
              <Boxes size={15} /> Wholesale Bulk Tier Active
            </span>
          )}
          <Link to="/shop">
            <Button variant="outline" size="sm" leftIcon={<Plus size={14} />}>
              Add More Plants
            </Button>
          </Link>
        </div>
      </div>

      {/* 2. MAIN GRID: CART ITEMS LIST + ORDER SUMMARY SIDEBAR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: LIST OF CART ITEMS */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between text-xs text-stone-500 px-1 font-bold">
            <span>Selected Saplings & Variants</span>
            <button
              onClick={clearCart}
              className="text-rose-600 hover:underline flex items-center gap-1"
            >
              <RotateCcw size={12} /> Clear Entire Cart
            </button>
          </div>

          {cartItems.map((item) => {
            const cartItemId = getCartItemId(
              item.product.id,
              item.selectedPotSize,
              item.selectedAge
            );
            const baseUnit = item.baseUnitPrice || item.product.price;
            const effectiveUnit = getEffectiveUnitPrice(baseUnit, item.quantity);
            const isBulk = item.quantity >= 10;
            const lineTotal = effectiveUnit * item.quantity;

            return (
              <div
                key={cartItemId}
                className={`bg-white p-5 rounded-3xl border transition-all shadow-2xs space-y-4 ${
                  isBulk ? 'border-amber-300 ring-2 ring-amber-400/20 bg-amber-50/20' : 'border-stone-200'
                }`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  {/* Plant Info & Thumbnail */}
                  <div className="flex items-start gap-4 flex-1">
                    <Link to={`/product/${item.product.id}`} className="shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-22 h-22 object-cover rounded-2xl border border-stone-200 bg-[#FAF7F2] hover:scale-105 transition-transform"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=400&q=80';
                        }}
                      />
                    </Link>

                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#E8862E]">
                          {item.product.category}
                        </span>

                        {/* BULK PRICING BADGE AUTOMATIC DETECTION */}
                        {isBulk && (
                          <span className="bg-[#E8862E] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md flex items-center gap-1">
                            <Boxes size={11} /> Bulk Pricing Applied ({item.quantity >= 50 ? '35% OFF' : '20% OFF'})
                          </span>
                        )}
                      </div>

                      <Link to={`/product/${item.product.id}`}>
                        <h3 className="font-serif font-bold text-base text-[#2F5233] hover:text-[#E8862E] transition-colors leading-snug">
                          {item.product.name}
                        </h3>
                      </Link>

                      {/* SELECTED VARIANTS (POT SIZE & PLANT AGE) */}
                      <div className="bg-[#FAF7F2] p-2 rounded-xl text-[11px] text-stone-600 border border-stone-200/80 space-y-0.5 inline-block">
                        <p className="font-medium text-stone-700">
                          🪴 <strong>Pot Size:</strong> {item.selectedPotSize || '10-inch Nursery Soil Bag'}
                        </p>
                        <p className="font-medium text-stone-700">
                          🌱 <strong>Plant Age:</strong> {item.selectedAge || '1.5 Year Grafted'}
                        </p>
                      </div>

                      {/* UNIT PRICE WITH BULK DISCOUNT DISPLAY */}
                      <div className="pt-1 flex items-baseline gap-2 text-xs">
                        <span className="text-stone-500 font-medium">Unit Price:</span>
                        <span className="font-bold text-[#2F5233] text-sm">₹{effectiveUnit}</span>
                        {isBulk && (
                          <span className="text-stone-400 line-through text-xs font-medium">
                            ₹{baseUnit}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* QUANTITY STEPPER & LINE TOTAL */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4 border-t sm:border-t-0 pt-3 sm:pt-0">
                    {/* QUANTITY STEPPER WITH EDITABLE DIRECT INPUT */}
                    <div className="space-y-1">
                      <span className="text-[10px] text-stone-400 font-bold block sm:text-right">Quantity:</span>
                      <div className="flex items-center border border-stone-300 rounded-xl overflow-hidden bg-[#FAF7F2]">
                        <button
                          onClick={() => updateQuantity(cartItemId, item.quantity - 1)}
                          className="p-2 text-stone-600 hover:bg-stone-200 transition-colors"
                          title="Decrease"
                        >
                          <Minus size={14} />
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(cartItemId, Math.max(1, parseInt(e.target.value) || 1))
                          }
                          className="w-12 text-center text-xs font-black text-[#2F5233] bg-transparent focus:outline-none"
                        />
                        <button
                          onClick={() => updateQuantity(cartItemId, item.quantity + 1)}
                          className="p-2 text-stone-600 hover:bg-stone-200 transition-colors"
                          title="Increase"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    {/* LINE TOTAL & REMOVE BUTTON */}
                    <div className="text-right space-y-1">
                      <span className="text-[10px] text-stone-400 font-bold block">Line Total:</span>
                      <span className="text-lg font-serif font-black text-[#2F5233] block">
                        ₹{lineTotal.toLocaleString()}
                      </span>
                      <button
                        onClick={() => removeFromCart(cartItemId)}
                        className="text-stone-400 hover:text-rose-600 text-xs font-bold flex items-center gap-1 ml-auto transition-colors pt-0.5"
                      >
                        <Trash2 size={13} /> Remove
                      </button>
                    </div>
                  </div>
                </div>

                {/* BULK THRESHOLD TIP IF QUANTITY < 10 */}
                {!isBulk && (
                  <div className="bg-amber-50/60 p-2.5 rounded-xl border border-amber-200/80 text-[11px] text-amber-900 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Boxes size={13} className="text-[#E8862E]" />
                      Add <strong>{10 - item.quantity} more units</strong> of this plant to unlock 20% Wholesale Bulk Discount!
                    </span>
                    <button
                      onClick={() => updateQuantity(cartItemId, 10)}
                      className="text-[10px] font-bold text-[#2F5233] underline hover:text-[#E8862E]"
                    >
                      Set to 10 Pcs
                    </button>
                  </div>
                )}
              </div>
            );
          })}

          {/* FREE SHIPPING PROGRESS BAR */}
          <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-stone-200 text-xs space-y-2">
            <div className="flex justify-between items-center font-bold text-[#2F5233]">
              <span className="flex items-center gap-1.5">
                <Truck size={16} className="text-[#E8862E]" /> Free Plant Delivery Status
              </span>
              <span>
                {isFreeDelivery ? (
                  <span className="text-emerald-700 font-extrabold flex items-center gap-1">
                    <CheckCircle2 size={14} /> Qualified for Free Courier Delivery!
                  </span>
                ) : (
                  `Add ₹${(2000 - subtotal).toLocaleString()} more for Free Delivery`
                )}
              </span>
            </div>
            <div className="w-full h-2.5 bg-stone-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#2F5233] rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (subtotal / 2000) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: ORDER SUMMARY SIDEBAR */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-md space-y-5 sticky top-24">
            <h2 className="font-serif font-bold text-xl text-[#2F5233] border-b border-stone-200 pb-3 flex items-center gap-2">
              <ShoppingBag size={20} className="text-[#E8862E]" /> Order Summary
            </h2>

            {/* 1. DELIVERY REGION / DESTINATION SELECTOR */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-700 block flex items-center gap-1">
                <MapPin size={14} className="text-[#E8862E]" /> Select Delivery Region:
              </label>

              <div className="space-y-1.5 text-xs">
                {[
                  { id: 'metro', label: 'State Capital / Metro Cities', fee: 99, desc: '24-48 Hours Express Plant Courier' },
                  { id: 'national', label: 'All India District Courier', fee: 180, desc: '3-4 Days Conditioned Root Packaging' },
                  { id: 'express', label: 'Special Speed Post / Air Freight', fee: 290, desc: 'Fast track living plant transport' },
                ].map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition ${
                      deliveryRegion === opt.id
                        ? 'bg-[#FAF7F2] border-[#2F5233] font-bold text-[#2F5233]'
                        : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="delivery"
                        checked={deliveryRegion === opt.id}
                        onChange={() => setDeliveryRegion(opt.id as any)}
                        className="text-[#2F5233] focus:ring-[#2F5233]"
                      />
                      <div>
                        <span className="block font-bold text-xs">{opt.label}</span>
                        <span className="text-[10px] text-stone-400 font-normal">{opt.desc}</span>
                      </div>
                    </div>
                    <span className="font-bold text-xs">
                      {isFreeDelivery ? (
                        <span className="text-emerald-700">FREE</span>
                      ) : (
                        `₹${opt.fee}`
                      )}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* 2. PROMO / COUPON CODE INPUT */}
            <div className="space-y-2 pt-1 border-t border-stone-100">
              <label className="text-xs font-bold text-stone-700 block flex items-center gap-1">
                <Ticket size={14} className="text-[#E8862E]" /> Promo / Discount Coupon:
              </label>

              {discountApplied ? (
                <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-2xl flex items-center justify-between text-xs text-emerald-900 font-bold">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 size={16} className="text-emerald-600" /> Promo Code Active (10% OFF)
                  </span>
                  <button
                    onClick={handleRemoveCoupon}
                    className="text-rose-600 hover:underline text-[11px]"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      placeholder="Enter promo code (e.g. GROW2026)"
                      className="flex-1 bg-[#FAF7F2] border border-stone-300 rounded-xl px-3 py-2 text-xs uppercase font-bold text-[#2F5233] focus:ring-2 focus:ring-[#2F5233]"
                    />
                    <Button variant="outline" size="sm" type="submit">
                      Apply
                    </Button>
                  </div>
                  {couponError && (
                    <p className="text-[11px] text-rose-600 font-bold">{couponError}</p>
                  )}
                  <p className="text-[10px] text-stone-400">
                    💡 Tip: Try code <strong className="text-[#2F5233]">GROW2026</strong> for 10% instant discount.
                  </p>
                </form>
              )}
            </div>

            {/* 3. COST BREAKDOWN ROWS */}
            <div className="space-y-2.5 text-xs text-stone-600 pt-3 border-t border-stone-200">
              <div className="flex justify-between">
                <span>Items Subtotal ({cartCount} plants)</span>
                <span className="font-bold text-stone-800">₹{subtotal.toLocaleString()}</span>
              </div>

              {discountApplied && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Special Promo Discount (10%)</span>
                  <span>-₹{discountAmount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between items-center">
                <span>Courier Delivery Charge</span>
                <span className="font-bold text-stone-800">
                  {isFreeDelivery ? (
                    <span className="text-emerald-700 font-extrabold">FREE (Over ₹2,000)</span>
                  ) : (
                    `₹${deliveryFee}`
                  )}
                </span>
              </div>
            </div>

            {/* TOTAL COST */}
            <div className="pt-3 border-t border-stone-200 flex justify-between items-baseline">
              <div>
                <span className="font-serif font-bold text-lg text-[#2F5233]">Total Payable</span>
                <span className="text-[10px] text-stone-400 block">Includes plant packaging & insurance</span>
              </div>
              <span className="text-2xl font-serif font-black text-[#2F5233]">
                ₹{finalTotal.toLocaleString()}
              </span>
            </div>

            {/* PROCEED TO CHECKOUT BUTTON */}
            <Button
              variant="accent"
              size="lg"
              fullWidth
              onClick={() => navigate('/checkout')}
              rightIcon={<ArrowRight size={18} />}
              className="mt-2"
            >
              Proceed to Checkout
            </Button>

            {/* GUARANTEE FOOTER */}
            <div className="bg-[#FAF7F2] p-3.5 rounded-2xl border border-stone-200 text-[11px] text-stone-600 space-y-1">
              <span className="font-bold text-[#2F5233] flex items-center gap-1.5">
                <ShieldCheck size={15} className="text-emerald-700" /> 100% Transit Live Growth Insurance
              </span>
              <p className="text-[10px] leading-snug text-stone-500">
                Packed with wet root coco-peat in reinforced wooden crates. Free replacement if broken in transit.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CHECKOUT MODAL */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-5 shadow-2xl border border-stone-200 relative animate-scaleUp max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setCheckoutModalOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700"
            >
              <X size={20} />
            </button>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase text-[#E8862E] tracking-wider flex items-center gap-1">
                <ShieldCheck size={15} /> Easy Express Checkout
              </span>
              <h3 className="font-serif font-bold text-2xl text-[#2F5233]">
                Delivery Address & Payment
              </h3>
              <p className="text-xs text-stone-500">
                Order Total: <strong>₹{finalTotal.toLocaleString()}</strong> ({cartCount} Grafted Saplings)
              </p>
            </div>

            <form onSubmit={handleCheckoutSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Customer Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tanvir Ahmed"
                    value={checkoutForm.name}
                    onChange={(e) => setCheckoutForm({ ...checkoutForm, name: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-stone-300 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-[#2F5233]"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Mobile / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+880 1700-000000"
                    value={checkoutForm.phone}
                    onChange={(e) => setCheckoutForm({ ...checkoutForm, phone: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-stone-300 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-[#2F5233]"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Delivery Address *</label>
                <input
                  type="text"
                  required
                  placeholder="House #, Road #, Area, Thana..."
                  value={checkoutForm.address}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, address: e.target.value })}
                  className="w-full bg-[#FAF7F2] border border-stone-300 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-[#2F5233]"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Select Payment Method *</label>
                <div className="grid grid-cols-2 gap-3">
                  <label
                    className={`p-3 rounded-2xl border cursor-pointer text-left transition flex items-center gap-2 ${
                      checkoutForm.paymentMethod === 'cod'
                        ? 'bg-[#2F5233] text-white border-[#2F5233]'
                        : 'bg-[#FAF7F2] text-stone-700 border-stone-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={checkoutForm.paymentMethod === 'cod'}
                      onChange={() => setCheckoutForm({ ...checkoutForm, paymentMethod: 'cod' })}
                      className="hidden"
                    />
                    <Building size={18} />
                    <div>
                      <span className="font-bold block text-xs">Cash on Delivery</span>
                      <span className="text-[10px] opacity-80 block">Pay upon receiving plants</span>
                    </div>
                  </label>

                  <label
                    className={`p-3 rounded-2xl border cursor-pointer text-left transition flex items-center gap-2 ${
                      checkoutForm.paymentMethod === 'bkash'
                        ? 'bg-[#2F5233] text-white border-[#2F5233]'
                        : 'bg-[#FAF7F2] text-stone-700 border-stone-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={checkoutForm.paymentMethod === 'bkash'}
                      onChange={() => setCheckoutForm({ ...checkoutForm, paymentMethod: 'bkash' })}
                      className="hidden"
                    />
                    <CreditCard size={18} />
                    <div>
                      <span className="font-bold block text-xs">bKash / Nagad</span>
                      <span className="text-[10px] opacity-80 block">5% Extra Cashback</span>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Delivery Instructions (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="Special instructions for nursery courier (e.g., deliver before 5 PM)..."
                  value={checkoutForm.notes}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, notes: e.target.value })}
                  className="w-full bg-[#FAF7F2] border border-stone-300 rounded-xl p-3 focus:ring-2 focus:ring-[#2F5233]"
                />
              </div>

              <div className="pt-2">
                <Button variant="accent" size="lg" fullWidth type="submit" rightIcon={<CheckCircle2 size={18} />}>
                  Confirm Order (₹{finalTotal.toLocaleString()})
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
