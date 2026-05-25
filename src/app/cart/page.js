'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ArrowLeft, 
  ArrowRight, 
  ShieldCheck, 
  Heart, 
  Truck, 
  Info, 
  Gift, 
  ShoppingCart,
  Activity,
  ArrowUpRight
} from 'lucide-react';

export default function CartPage() {
  const { 
    cartItems, 
    savedItems,
    updateQuantity, 
    removeFromCart, 
    saveForLater, 
    moveToCart, 
    removeFromSaved, 
    getCartTotal 
  } = useCart();

  const [isGift, setIsGift] = useState(false);
  const [giftWrap, setGiftWrap] = useState('free');
  const [giftMessage, setGiftMessage] = useState('');
  const [orderNotes, setOrderNotes] = useState('');

  const subtotal = getCartTotal();
  const vat = Math.round(subtotal * 0.13); // 13% VAT in Nepal
  const giftCharge = isGift && giftWrap === 'premium' ? 150 : 0;
  
  // Calculate shipping based on Grand Total (subtotal + vat + gift) >= 15000 threshold
  const initialTotal = subtotal + vat + giftCharge;
  const shipping = initialTotal >= 15000 || subtotal === 0 ? 0 : 250;
  const grandTotal = subtotal + vat + shipping + giftCharge;
  
  // Remaining amount for free delivery based on (subtotal + VAT + gift charge)
  const remainingForFree = Math.max(0, 15000 - initialTotal);
  const progressPercentage = Math.min(100, (initialTotal / 15000) * 100);

  // Helper to retrieve correct Mock SKUs as shown in the design
  const getMockSKU = (id) => {
    const skus = {
      '1': 'TM-MF-8839',
      '2': 'TM-DS-4521',
      '3': 'TM-CS-1102',
      '4': 'TM-SG-9981',
      '5': 'TM-MF-7721',
      '6': 'TM-DS-6612',
      '7': 'TM-CS-2231',
      '8': 'TM-SG-4412',
      '9': 'TM-MF-9931',
      '10': 'TM-SG-3341',
    };
    return skus[id] || `TM-GEN-${1000 + parseInt(id)}`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f7f9fb]">
      <Navbar />

      <main className="pt-28 pb-20 px-6 md:px-12 max-w-7xl mx-auto w-full flex-grow">
        
        {/* Page Title Header */}
        <div className="mb-8">
          <h1 className="font-bold text-3xl md:text-4xl text-[#00355f] tracking-tight">Your Shopping Cart</h1>
          <p className="text-sm text-on-surface-variant mt-1 font-light">
            Review your healthcare essentials before checkout.
          </p>
        </div>

        {cartItems.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl border border-outline-variant/30 shadow-sm max-w-3xl mx-auto">
            <div className="bg-surface p-6 rounded-full text-outline mb-6">
              <ShoppingCart className="w-12 h-12 text-primary/60" />
            </div>
            <h2 className="font-bold text-2xl text-on-surface mb-2">Your Cart is Empty</h2>
            <p className="text-on-surface-variant max-w-xs mb-8 text-sm leading-relaxed font-light">
              Looks like you haven't added any premium healthcare products to your cart yet.
            </p>
            <Link
              href="/products"
              className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary/95 shadow-md btn-hover-effect flex items-center gap-2 text-sm"
            >
              Explore Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Side: Items & Details */}
            <div className="lg:col-span-8 space-y-6">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white p-5 md:p-6 rounded-2xl border border-outline-variant/30 shadow-sm flex flex-col md:flex-row items-center gap-6 justify-between"
                  >
                    {/* Left block: Image & Details */}
                    <div className="flex items-center gap-5 w-full md:w-auto">
                      <div className="w-24 h-24 bg-surface-container-low rounded-xl p-2.5 flex items-center justify-center flex-shrink-0 border border-outline-variant/10">
                        <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-bold text-lg text-primary leading-tight line-clamp-1">
                          {item.name}
                        </h3>
                        <p className="text-xs text-outline font-medium tracking-wide">
                          SKU: {getMockSKU(item.id)}
                        </p>
                        
                        {/* Mobile view price */}
                        <p className="text-base font-bold text-primary mt-1.5 md:hidden">
                          NPR {item.price.toLocaleString()}
                        </p>

                        {/* Actions Row */}
                        <div className="flex items-center gap-4 pt-2">
                          {/* Quantity selector */}
                          <div className="flex items-center bg-[#f7f9fb] border border-outline-variant/40 rounded-full h-8 px-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 text-on-surface-variant hover:text-primary transition-colors cursor-pointer outline-none"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-semibold text-xs text-on-surface w-7 text-center select-none">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 text-on-surface-variant hover:text-primary transition-colors cursor-pointer outline-none"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Save for later */}
                          <button
                            onClick={() => saveForLater(item)}
                            className="flex items-center gap-1.5 text-xs font-semibold text-secondary hover:text-secondary-fixed-dim transition-colors cursor-pointer outline-none"
                          >
                            <Heart className="w-4 h-4" /> Save for Later
                          </button>

                          {/* Remove */}
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="flex items-center gap-1.5 text-xs font-semibold text-[#ff7043] hover:text-[#ff7043]/80 transition-colors cursor-pointer outline-none"
                          >
                            <Trash2 className="w-4 h-4" /> Remove
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Right Price block (Desktop) */}
                    <div className="hidden md:block text-right pr-2">
                      <p className="font-extrabold text-lg text-primary">
                        NPR {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping Link */}
              <div className="pt-2">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors text-sm font-semibold"
                >
                  <ArrowLeft className="w-4 h-4" /> Continue Shopping
                </Link>
              </div>

              {/* Order Notes Field */}
              <div className="bg-white p-5 rounded-2xl border border-outline-variant/30 shadow-sm space-y-2.5">
                <label className="block text-xs font-bold text-primary uppercase tracking-wider">
                  Delivery Instructions & Medical Notes
                </label>
                <textarea
                  className="w-full bg-[#f7f9fb] border border-outline-variant/30 rounded-xl p-3 text-xs focus:ring-1 focus:ring-primary outline-none h-20 resize-none font-light text-on-surface transition-all"
                  placeholder="Provide clinical dispatch notes or courier guidelines (e.g. 'Call doctor on arrival', 'Deliver to laboratory department')..."
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                />
              </div>

              {/* Left Column Security Badges */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                <div className="bg-white p-4 rounded-xl border border-outline-variant/30 flex items-start gap-3">
                  <div className="p-2 bg-blue-50 text-[#0f4c81] rounded-lg">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-primary">Secure SSL Encryption</h4>
                    <p className="text-[10px] text-on-surface-variant mt-0.5 leading-relaxed font-light">
                      256-bit encrypted data protection.
                    </p>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-xl border border-outline-variant/30 flex items-start gap-3">
                  <div className="p-2 bg-emerald-50 text-secondary rounded-lg">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-primary">Verified Healthcare Provider</h4>
                    <p className="text-[10px] text-on-surface-variant mt-0.5 leading-relaxed font-light">
                      Government-licensed medical distributor.
                    </p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-outline-variant/30 flex items-start gap-3">
                  <div className="p-2 bg-teal-50 text-teal-600 rounded-lg">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-primary">Safe Medical Delivery</h4>
                    <p className="text-[10px] text-on-surface-variant mt-0.5 leading-relaxed font-light">
                      Temperature-controlled logistics network.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Side: Order Summary Column */}
            <div className="lg:col-span-4 space-y-4">
              
              {/* Order Summary Main Card */}
              <div className="bg-white p-6 rounded-2xl border border-outline-variant/30 shadow-sm space-y-5">
                <h2 className="font-bold text-xl text-primary border-b border-outline-variant/20 pb-3">
                  Order Summary
                </h2>
                
                {/* Billing details */}
                <div className="space-y-3.5 text-sm">
                  <div className="flex justify-between text-on-surface-variant">
                    <span className="font-light">Subtotal</span>
                    <span className="font-semibold text-primary">NPR {subtotal.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between text-on-surface-variant">
                    <span className="font-light">Shipping (Estimated)</span>
                    <span className="font-semibold text-primary">
                      {shipping === 0 ? 'FREE' : `NPR ${shipping.toLocaleString()}`}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-on-surface-variant">
                    <span className="font-light">Taxes (VAT)</span>
                    <span className="font-semibold text-primary">NPR {vat.toLocaleString()}</span>
                  </div>

                  {isGift && giftWrap === 'premium' && (
                    <div className="flex justify-between text-on-surface-variant">
                      <span className="font-light">Gift Wrapping (Premium)</span>
                      <span className="font-semibold text-primary">NPR 150</span>
                    </div>
                  )}

                  {/* Free Delivery progress bar */}
                  <div className="pt-2 border-t border-outline-variant/10">
                    <div className="flex justify-between text-xs font-semibold text-on-surface-variant">
                      <span className="font-medium">Free Delivery Progress</span>
                      <span className="text-[#006a68]">
                        {remainingForFree === 0 ? (
                          'Qualified'
                        ) : (
                          `Add NPR ${remainingForFree.toLocaleString()} more`
                        )}
                      </span>
                    </div>
                    <div className="w-full bg-[#f7f9fb] rounded-full h-1.5 mt-1.5 overflow-hidden">
                      <div 
                        className="bg-primary h-1.5 rounded-full transition-all duration-500"
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                    {remainingForFree > 0 && (
                      <p className="text-[10px] text-outline mt-1 font-light">
                        Add NPR {remainingForFree.toLocaleString()} more for free delivery
                      </p>
                    )}
                  </div>

                  <div className="h-px bg-outline-variant/20 my-3" />
                  
                  <div className="flex justify-between text-lg font-bold text-primary">
                    <span>Grand Total</span>
                    <span>NPR {grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Gift Option Toggle */}
                <div className="pt-2 space-y-3">
                  <label className="flex items-center gap-2.5 text-xs font-medium text-on-surface-variant cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={isGift}
                      onChange={(e) => setIsGift(e.target.checked)}
                      className="rounded border-outline-variant text-[#0f4c81] focus:ring-[#0f4c81] w-4 h-4 cursor-pointer"
                    />
                    <Gift className="w-4 h-4 text-secondary" />
                    <span>This is a gift</span>
                  </label>

                  {isGift && (
                    <div className="space-y-3 p-4 bg-[#f7f9fb] border border-outline-variant/30 rounded-xl transition-all duration-300">
                      <div>
                        <label className="block text-[10px] font-bold text-primary uppercase tracking-wider mb-1">
                          Wrapping Style
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setGiftWrap('free')}
                            className={`px-2.5 py-1.5 text-xs rounded-lg border font-medium transition-all ${
                              giftWrap === 'free'
                                ? 'border-secondary bg-secondary/5 text-[#006a68]'
                                : 'border-outline-variant/30 bg-white hover:bg-[#f7f9fb] text-on-surface-variant'
                            }`}
                          >
                            Standard (FREE)
                          </button>
                          <button
                            type="button"
                            onClick={() => setGiftWrap('premium')}
                            className={`px-2.5 py-1.5 text-xs rounded-lg border font-medium transition-all ${
                              giftWrap === 'premium'
                                ? 'border-secondary bg-secondary/5 text-[#006a68]'
                                : 'border-outline-variant/30 bg-white hover:bg-[#f7f9fb] text-on-surface-variant'
                            }`}
                          >
                            Premium (+NPR 150)
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-primary uppercase tracking-wider mb-1">
                          Gift Message
                        </label>
                        <textarea
                          className="w-full bg-white border border-outline-variant/30 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-primary outline-none h-16 resize-none font-light text-on-surface"
                          placeholder="Write a warm note for the recipient..."
                          value={giftMessage}
                          onChange={(e) => setGiftMessage(e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Checkout Link Button */}
                <Link
                  href="/checkout"
                  className="w-full bg-primary text-white h-12 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-primary/95 shadow-md btn-hover-effect transition-all text-sm whitespace-nowrap cursor-pointer"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </Link>
                
                <p className="text-[10px] text-center text-outline font-light">
                  Free delivery on orders above NPR 15,000.
                </p>
              </div>

              {/* Prescription Needed Banner */}
              <div className="bg-primary text-white p-5 rounded-2xl flex items-start gap-3 shadow-sm">
                <Info className="w-5 h-5 text-on-primary-container flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-bold text-sm">Prescription Required?</h4>
                  <p className="text-[11px] text-on-primary-container/80 leading-relaxed font-light">
                    Some items in your cart may require a valid doctor's prescription. You can upload it in the next step.
                  </p>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* Saved for Later Section */}
        {savedItems.length > 0 && (
          <div className="mt-16 border-t border-outline-variant/30 pt-12">
            <h2 className="font-bold text-2xl text-[#00355f] mb-6 flex items-center gap-2">
              <Heart className="w-6 h-6 text-secondary" /> Saved for Later
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {savedItems.map((item) => (
                <div 
                  key={item.id}
                  className="bg-white p-5 rounded-2xl border border-outline-variant/30 shadow-sm flex items-center gap-4 justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-[#f7f9fb] rounded-xl p-2 flex items-center justify-center border border-outline-variant/10 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-primary line-clamp-1">{item.name}</h4>
                      <p className="text-[10px] text-outline font-medium tracking-wide">SKU: {getMockSKU(item.id)}</p>
                      <p className="text-xs font-bold text-primary mt-1">NPR {item.price.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2">
                    <button
                      onClick={() => moveToCart(item)}
                      className="bg-primary/5 hover:bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 cursor-pointer transition-all outline-none"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" /> Move to Cart
                    </button>
                    <button
                      onClick={() => removeFromSaved(item.id)}
                      className="text-xs text-[#ff7043] hover:text-[#ff7043]/80 px-2 py-1 font-semibold cursor-pointer transition-colors outline-none"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
