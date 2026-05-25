'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { 
  ChevronLeft, 
  ShieldCheck, 
  CheckCircle2, 
  CreditCard, 
  Truck, 
  AlertCircle,
  Lock,
  Info,
  Building,
  Upload,
  FileText,
  Smile,
  Phone,
  HelpCircle,
  Wallet
} from 'lucide-react';

export default function CheckoutPage() {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [checkoutStep, setCheckoutStep] = useState(1); // 1 = Shipping, 2 = Payment Method
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingText, setProcessingText] = useState('');

  // Form fields state
  const [shippingForm, setShippingForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    province: 'Bagmati Province',
  });
  
  const [billingForm, setBillingForm] = useState({
    name: '',
    address: '',
    city: '',
    province: 'Bagmati Province',
  });

  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card', 'esewa', 'khalti', 'bank'
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);

  // Card details state
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
  });

  // Mobile wallets state
  const [walletPhone, setWalletPhone] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpError, setOtpError] = useState('');
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(60);

  // Direct Bank Transfer slip upload state
  const [bankSlip, setBankSlip] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  const [errors, setErrors] = useState({});
  const [cvvTooltipVisible, setCvvTooltipVisible] = useState(false);

  // Dynamic calculations based on exact design formulas
  const subtotal = getCartTotal();
  // shipping is 150 as in mockup, free if grand total threshold reached
  const shipping = subtotal >= 15000 || subtotal === 0 ? 0 : 150;
  // tax is exactly 13% of (subtotal + shipping)
  const tax = (subtotal + shipping) * 0.13;
  const total = subtotal + shipping + tax;

  // OTP Timer countdown
  useEffect(() => {
    let interval = null;
    if (showOtpModal && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [showOtpModal, otpTimer]);

  const validateShipping = () => {
    const tempErrors = {};
    if (!shippingForm.name.trim()) tempErrors.name = 'Full Name is required.';
    if (!shippingForm.email.trim()) {
      tempErrors.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(shippingForm.email)) {
      tempErrors.email = 'Invalid email address.';
    }
    if (!shippingForm.phone.trim()) {
      tempErrors.phone = 'Phone number is required.';
    } else if (!/^\+?[0-9]{9,15}$/.test(shippingForm.phone)) {
      tempErrors.phone = 'Invalid phone number format.';
    }
    if (!shippingForm.address.trim()) tempErrors.address = 'Detailed address is required.';
    if (!shippingForm.city.trim()) tempErrors.city = 'City or District is required.';

    if (!billingSameAsShipping) {
      if (!billingForm.name.trim()) tempErrors.billName = 'Billing Name is required.';
      if (!billingForm.address.trim()) tempErrors.billAddress = 'Billing Address is required.';
      if (!billingForm.city.trim()) tempErrors.billCity = 'Billing City is required.';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const validatePayment = () => {
    const tempErrors = {};
    if (paymentMethod === 'card') {
      const cleanCard = cardDetails.number.replace(/\s/g, '');
      if (cleanCard.length !== 16) {
        tempErrors.cardNumber = 'Enter a valid 16-digit card number.';
      }
      if (!/^(0[1-9]|1[0-2])\s\/\s\d{2}$/.test(cardDetails.expiry)) {
        tempErrors.cardExpiry = 'Enter expiry date in MM / YY format.';
      }
      if (cardDetails.cvv.length !== 3) {
        tempErrors.cardCvv = 'Enter 3-digit CVV.';
      }
    } else if (paymentMethod === 'esewa' || paymentMethod === 'khalti') {
      if (!/^(98|97)\d{8}$/.test(walletPhone)) {
        tempErrors.walletPhone = 'Enter a valid 10-digit mobile number starting with 98 or 97.';
      }
    } else if (paymentMethod === 'bank') {
      if (!bankSlip) {
        tempErrors.bankSlip = 'Please upload a bank transfer slip or transaction screenshot.';
      }
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingForm((prev) => ({ ...prev, [name]: value }));
    const errName = 'bill' + name.charAt(0).toUpperCase() + name.slice(1);
    if (errors[errName]) setErrors((prev) => ({ ...prev, [errName]: '' }));
  };

  // Automated formatters for Credit Card inputs
  const handleCardNumberChange = (e) => {
    let val = e.target.value.replace(/\D/g, ''); // numbers only
    if (val.length > 16) val = val.slice(0, 16);
    const formatted = val.match(/.{1,4}/g)?.join(' ') || '';
    setCardDetails(prev => ({ ...prev, number: formatted }));
    if (errors.cardNumber) setErrors(prev => ({ ...prev, cardNumber: '' }));
  };

  const handleExpiryChange = (e) => {
    let val = e.target.value.replace(/\D/g, ''); // numbers only
    if (val.length > 4) val = val.slice(0, 4);
    if (val.length >= 2) {
      val = val.slice(0, 2) + ' / ' + val.slice(2);
    }
    setCardDetails(prev => ({ ...prev, expiry: val }));
    if (errors.cardExpiry) setErrors(prev => ({ ...prev, cardExpiry: '' }));
  };

  const handleCvvChange = (e) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 3) val = val.slice(0, 3);
    setCardDetails(prev => ({ ...prev, cvv: val }));
    if (errors.cardCvv) setErrors(prev => ({ ...prev, cardCvv: '' }));
  };

  const getCardBrand = (number) => {
    const clean = number.replace(/\s/g, '');
    if (clean.startsWith('4')) return 'Visa';
    if (clean.startsWith('5')) return 'Mastercard';
    if (clean.startsWith('3')) return 'Amex';
    return 'Unknown';
  };

  // Simulate upload drag/drop
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragOver(true);
    } else if (e.type === "dragleave") {
      setDragOver(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setBankSlip(e.dataTransfer.files[0]);
      if (errors.bankSlip) setErrors(prev => ({ ...prev, bankSlip: '' }));
    }
  };

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    if (validateShipping()) {
      setCheckoutStep(2);
    }
  };

  const submitOrderToWooCommerce = async () => {
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          shippingForm,
          billingForm: billingSameAsShipping ? shippingForm : billingForm,
          cartItems,
          paymentMethod,
          total,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setOrderNumber(result.orderNumber || `WC-${result.orderId}`);
          setIsSuccess(true);
          clearCart();
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Error submitting order to API:', error);
      return false;
    }
  };

  const triggerProcessingSimulation = (completionCallback) => {
    setIsProcessing(true);
    setProcessingText('Establishing secure gateway connection...');
    setTimeout(() => {
      setProcessingText('Verifying credentials & authorization details...');
      setTimeout(() => {
        setProcessingText('Transmitting order to WooCommerce database...');
        setTimeout(() => {
          setIsProcessing(false);
          completionCallback();
        }, 1200);
      }, 1000);
    }, 1000);
  };

  const handleCompletePayment = (e) => {
    e.preventDefault();
    if (!validatePayment()) return;

    if (paymentMethod === 'esewa' || paymentMethod === 'khalti') {
      // Show Wallet OTP Modal
      setOtpTimer(60);
      setOtpSent(true);
      setShowOtpModal(true);
    } else {
      // Directly process Card / Bank Transfer
      triggerProcessingSimulation(async () => {
        setIsProcessing(true);
        setProcessingText('Confirming order registration...');
        const success = await submitOrderToWooCommerce();
        setIsProcessing(false);
        if (!success) {
          alert('There was an issue processing your order. Please try again.');
        }
      });
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otpCode.length !== 6) {
      setOtpError('OTP code must be 6 digits.');
      return;
    }
    
    setShowOtpModal(false);
    triggerProcessingSimulation(async () => {
      setIsProcessing(true);
      setProcessingText('Verifying OTP code...');
      const success = await submitOrderToWooCommerce();
      setIsProcessing(false);
      if (!success) {
        alert('There was an issue verifying your wallet. Please try again.');
      }
    });
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col min-h-screen bg-[#f7f9fb]">
        <Navbar />
        <main className="flex-grow flex flex-col items-center justify-center pt-32 pb-20 px-6 text-center animate-fade-up">
          <div className="bg-emerald-50 text-emerald-600 p-5 rounded-full mb-6 shadow-sm border border-emerald-100">
            <CheckCircle2 className="w-16 h-16" />
          </div>
          <h1 className="font-extrabold text-3xl md:text-4xl text-[#00355f] mb-3">Order Placed Successfully!</h1>
          <p className="text-on-surface-variant text-base max-w-lg mb-8 leading-relaxed font-light">
            Thank you for choosing Tejasmanyata Healthcare. Your order <strong className="text-on-surface font-semibold">{orderNumber}</strong> has been secured and dispatched to our pharmacy verification team.
          </p>
          <div className="bg-white border border-outline-variant/30 shadow-md rounded-2xl p-6 max-w-md w-full mb-10 text-left space-y-4">
            <h3 className="font-bold text-sm text-[#00355f] uppercase tracking-wider border-b border-outline-variant/10 pb-2">
              Dispatch Summary
            </h3>
            <div className="flex justify-between text-xs">
              <span className="text-outline font-light">Estimated Delivery Time</span>
              <span className="font-semibold text-[#006a68]">3-5 Working Days</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-outline font-light">Recipient Name</span>
              <span className="font-semibold text-primary">{shippingForm.name}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-outline font-light">Delivery Target</span>
              <span className="font-semibold text-on-surface">{shippingForm.address}, {shippingForm.city}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-outline font-light">Settlement via</span>
              <span className="font-semibold text-on-surface uppercase">{paymentMethod === 'card' ? 'Credit / Debit Card' : paymentMethod}</span>
            </div>
            <div className="flex justify-between text-xs border-t border-outline-variant/10 pt-3">
              <span className="text-outline font-bold">Paid Total</span>
              <span className="font-extrabold text-primary text-sm">NPR {total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
          </div>
          <Link
            href="/"
            className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary/95 transition-all shadow-md btn-hover-effect text-sm"
          >
            Return to Homepage
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f7f9fb]">
      <Navbar />

      {/* Simulated Processing Loading Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex flex-col items-center justify-center text-white">
          <div className="w-16 h-16 border-4 border-t-white border-white/20 rounded-full animate-spin mb-4" />
          <p className="font-bold text-lg">{processingText}</p>
          <p className="text-xs text-white/60 mt-1">Please do not refresh the page or click back.</p>
        </div>
      )}

      {/* OTP Wallet Verification Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-[90] flex items-center justify-center p-4">
          <form onSubmit={handleVerifyOtp} className="bg-white rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-2xl border border-outline-variant/30 space-y-5 animate-fade-up">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-50 text-secondary rounded-lg">
                <Wallet className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-primary">Verify Wallet Payment</h3>
                <p className="text-xs text-on-surface-variant font-light">OTP Sent to {walletPhone}</p>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-primary uppercase tracking-wider">Verification OTP Code</label>
              <input
                type="text"
                placeholder="Enter 6-digit OTP code"
                maxLength={6}
                value={otpCode}
                onChange={(e) => {
                  setOtpCode(e.target.value.replace(/\D/g, ''));
                  if (otpError) setOtpError('');
                }}
                className="w-full bg-[#f7f9fb] border border-outline-variant/30 rounded-xl px-4 py-3 text-center text-lg font-bold tracking-widest focus:ring-1 focus:ring-primary outline-none"
              />
              {otpError && <p className="text-xs text-error font-medium">{otpError}</p>}
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="text-outline font-light">
                {otpTimer > 0 ? `Resend OTP in ${otpTimer}s` : 'Did not receive?'}
              </span>
              <button
                type="button"
                disabled={otpTimer > 0}
                onClick={() => {
                  setOtpTimer(60);
                  setOtpSent(true);
                }}
                className={`font-semibold transition-colors ${
                  otpTimer > 0 ? 'text-outline cursor-not-allowed' : 'text-secondary hover:text-secondary-fixed-dim'
                }`}
              >
                Resend OTP Code
              </button>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowOtpModal(false)}
                className="flex-1 border border-outline-variant/30 text-on-surface-variant py-2.5 rounded-full font-bold text-xs hover:bg-[#f7f9fb] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-primary text-white py-2.5 rounded-full font-bold text-xs hover:bg-primary/95 transition-all shadow-md"
              >
                Verify & Pay
              </button>
            </div>
          </form>
        </div>
      )}

      <main className="pt-28 pb-20 px-6 md:px-12 max-w-7xl mx-auto w-full flex-grow">
        
        {/* Back Link */}
        <div className="mb-6">
          <button 
            onClick={() => checkoutStep === 2 ? setCheckoutStep(1) : window.location.href = '/cart'}
            className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors text-sm font-semibold cursor-pointer outline-none"
          >
            <ChevronLeft className="w-4 h-4" /> {checkoutStep === 2 ? 'Back to Shipping' : 'Back to Cart'}
          </button>
        </div>

        <h1 className="font-bold text-3xl md:text-4xl text-[#00355f] mb-8 tracking-tight">Secure Checkout</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-outline-variant/30 shadow-sm max-w-3xl mx-auto">
            <AlertCircle className="w-12 h-12 text-outline mx-auto mb-4" />
            <h2 className="font-bold text-2xl text-on-surface">No Items to Checkout</h2>
            <p className="text-outline text-sm mt-1 font-light">Please add products to your cart before proceeding.</p>
            <Link href="/products" className="inline-block bg-primary text-white px-8 py-3 rounded-full font-bold mt-6 shadow-md hover:bg-primary/95">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column forms */}
            <div className="lg:col-span-8">
              
              {checkoutStep === 1 ? (
                /* Step 1: Shipping Address Form */
                <form onSubmit={handleProceedToPayment} className="bg-white p-6 md:p-8 rounded-2xl border border-outline-variant/30 shadow-sm space-y-6 animate-fade-up">
                  <h2 className="font-bold text-xl text-primary border-b border-outline-variant/15 pb-3.5 flex items-center gap-2.5">
                    <Truck className="w-5 h-5 text-secondary" /> Shipping Address
                  </h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-[10px] font-bold text-primary uppercase tracking-wider">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={shippingForm.name}
                        onChange={handleShippingChange}
                        className={`w-full bg-[#f7f9fb] border px-4 py-2.5 rounded-xl text-xs focus:ring-1 focus:ring-primary outline-none transition-all ${
                          errors.name ? 'border-error' : 'border-outline-variant/30'
                        }`}
                        placeholder="Enter your full name"
                      />
                      {errors.name && <p className="text-xs text-error font-medium mt-0.5">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-primary uppercase tracking-wider">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={shippingForm.email}
                        onChange={handleShippingChange}
                        className={`w-full bg-[#f7f9fb] border px-4 py-2.5 rounded-xl text-xs focus:ring-1 focus:ring-primary outline-none transition-all ${
                          errors.email ? 'border-error' : 'border-outline-variant/30'
                        }`}
                        placeholder="you@example.com"
                      />
                      {errors.email && <p className="text-xs text-error font-medium mt-0.5">{errors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-primary uppercase tracking-wider">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={shippingForm.phone}
                        onChange={handleShippingChange}
                        className={`w-full bg-[#f7f9fb] border px-4 py-2.5 rounded-xl text-xs focus:ring-1 focus:ring-primary outline-none transition-all ${
                          errors.phone ? 'border-error' : 'border-outline-variant/30'
                        }`}
                        placeholder="e.g. 98XXXXXXXX"
                      />
                      {errors.phone && <p className="text-xs text-error font-medium mt-0.5">{errors.phone}</p>}
                    </div>

                    {/* Address */}
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-[10px] font-bold text-primary uppercase tracking-wider">Detailed Address</label>
                      <input
                        type="text"
                        name="address"
                        value={shippingForm.address}
                        onChange={handleShippingChange}
                        className={`w-full bg-[#f7f9fb] border px-4 py-2.5 rounded-xl text-xs focus:ring-1 focus:ring-primary outline-none transition-all ${
                          errors.address ? 'border-error' : 'border-outline-variant/30'
                        }`}
                        placeholder="Street, ward, area details"
                      />
                      {errors.address && <p className="text-xs text-error font-medium mt-0.5">{errors.address}</p>}
                    </div>

                    {/* City/District */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-primary uppercase tracking-wider">City / District</label>
                      <input
                        type="text"
                        name="city"
                        value={shippingForm.city}
                        onChange={handleShippingChange}
                        className={`w-full bg-[#f7f9fb] border px-4 py-2.5 rounded-xl text-xs focus:ring-1 focus:ring-primary outline-none transition-all ${
                          errors.city ? 'border-error' : 'border-outline-variant/30'
                        }`}
                        placeholder="e.g. Kathmandu"
                      />
                      {errors.city && <p className="text-xs text-error font-medium mt-0.5">{errors.city}</p>}
                    </div>

                    {/* Province */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-primary uppercase tracking-wider">Province</label>
                      <select
                        name="province"
                        value={shippingForm.province}
                        onChange={handleShippingChange}
                        className="w-full bg-[#f7f9fb] border border-outline-variant/30 px-4 py-2.5 rounded-xl text-xs focus:ring-1 focus:ring-primary outline-none"
                      >
                        <option>Koshi Province</option>
                        <option>Madhesh Province</option>
                        <option>Bagmati Province</option>
                        <option>Gandaki Province</option>
                        <option>Lumbini Province</option>
                        <option>Karnali Province</option>
                        <option>Sudurpashchim Province</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4 border-t border-outline-variant/10">
                    <button
                      type="submit"
                      className="bg-[#0f4c81] text-white px-8 py-3 rounded-full font-bold hover:bg-[#0f4c81]/95 shadow-md btn-hover-effect transition-all text-xs"
                    >
                      Proceed to Payment
                    </button>
                  </div>
                </form>
              ) : (
                /* Step 2: Payment Method Form */
                <form onSubmit={handleCompletePayment} className="space-y-6 animate-fade-up">
                  <div className="bg-white p-6 md:p-8 rounded-2xl border border-outline-variant/30 shadow-sm space-y-6">
                    <h2 className="font-bold text-xl text-primary pb-1">Payment Method</h2>
                    
                    {/* Option 1: Credit / Debit Card Box */}
                    <div className={`border rounded-2xl p-5 space-y-4 transition-all duration-300 ${
                      paymentMethod === 'card' 
                        ? 'border-[#0f4c81] bg-white shadow-sm ring-1 ring-[#0f4c81]/20' 
                        : 'border-outline-variant/30 bg-[#f7f9fb]'
                    }`}>
                      <label className="flex justify-between items-center cursor-pointer select-none">
                        <span className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="paymentOption"
                            value="card"
                            checked={paymentMethod === 'card'}
                            onChange={() => setPaymentMethod('card')}
                            className="text-[#0f4c81] focus:ring-[#0f4c81] w-4 h-4 cursor-pointer"
                          />
                          <span className="font-bold text-sm text-[#00355f]">Credit / Debit Card</span>
                        </span>
                        <CreditCard className="w-5 h-5 text-primary" />
                      </label>

                      {paymentMethod === 'card' && (
                        <div className="space-y-4 pt-2 border-t border-outline-variant/10 animate-fade-in">
                          {/* Card number */}
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-primary uppercase tracking-wider">Card Number</label>
                            <div className="relative">
                              <Lock className="w-4 h-4 text-outline absolute left-3.5 top-1/2 -translate-y-1/2" />
                              <input
                                type="text"
                                placeholder="0000 0000 0000 0000"
                                value={cardDetails.number}
                                onChange={handleCardNumberChange}
                                className={`w-full bg-[#f7f9fb] border pl-10 pr-12 py-2.5 rounded-xl text-xs focus:ring-1 focus:ring-primary outline-none tracking-widest ${
                                  errors.cardNumber ? 'border-error' : 'border-outline-variant/30'
                                }`}
                              />
                              {cardDetails.number && (
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold bg-[#e2f1e8] text-secondary px-2 py-0.5 rounded-md border border-secondary/10 shadow-xs">
                                  {getCardBrand(cardDetails.number)}
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-outline font-light">Enter 16-digit card number without spaces</span>
                            {errors.cardNumber && <p className="text-xs text-error font-medium">{errors.cardNumber}</p>}
                          </div>

                          {/* Expiry and CVV Row */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-primary uppercase tracking-wider">Expiry Date</label>
                              <input
                                type="text"
                                placeholder="MM / YY"
                                value={cardDetails.expiry}
                                onChange={handleExpiryChange}
                                className={`w-full bg-[#f7f9fb] border px-4 py-2.5 rounded-xl text-xs text-center focus:ring-1 focus:ring-primary outline-none ${
                                  errors.cardExpiry ? 'border-error' : 'border-outline-variant/30'
                                }`}
                              />
                              {errors.cardExpiry && <p className="text-xs text-error font-medium">{errors.cardExpiry}</p>}
                            </div>
                            
                            <div className="space-y-1 relative">
                              <label className="flex items-center gap-1 text-[10px] font-bold text-primary uppercase tracking-wider">
                                CVV
                                <span 
                                  className="cursor-pointer relative text-outline hover:text-primary"
                                  onMouseEnter={() => setCvvTooltipVisible(true)}
                                  onMouseLeave={() => setCvvTooltipVisible(false)}
                                >
                                  <HelpCircle className="w-3.5 h-3.5" />
                                  
                                  {/* CVV tooltip popover */}
                                  {cvvTooltipVisible && (
                                    <span className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[9px] font-medium leading-normal w-32 p-2 rounded-lg shadow-xl z-20 text-center animate-fade-in">
                                      3-digit safety code printed on the signature strip on the back of your card.
                                    </span>
                                  )}
                                </span>
                              </label>
                              
                              <input
                                type="password"
                                placeholder="***"
                                maxLength={3}
                                value={cardDetails.cvv}
                                onChange={handleCvvChange}
                                className={`w-full bg-[#f7f9fb] border px-4 py-2.5 rounded-xl text-xs text-center tracking-widest focus:ring-1 focus:ring-primary outline-none ${
                                  errors.cardCvv ? 'border-error' : 'border-outline-variant/30'
                                }`}
                              />
                              {errors.cardCvv && <p className="text-xs text-error font-medium">{errors.cardCvv}</p>}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Mobile Wallets section */}
                    <div className="space-y-3.5 pt-2">
                      <h4 className="text-[10px] font-bold text-primary uppercase tracking-widest">Mobile Wallets</h4>
                      
                      <div className="grid grid-cols-2 gap-4">
                        {/* eSewa */}
                        <div className={`border rounded-xl p-4 flex items-center justify-between cursor-pointer transition-all ${
                          paymentMethod === 'esewa' 
                            ? 'border-secondary bg-secondary/5 shadow-xs ring-1 ring-secondary/10' 
                            : 'border-outline-variant/30 bg-[#f7f9fb]'
                        }`} onClick={() => setPaymentMethod('esewa')}>
                          <label className="flex items-center gap-3 cursor-pointer select-none">
                            <input
                              type="radio"
                              name="paymentOption"
                              value="esewa"
                              checked={paymentMethod === 'esewa'}
                              onChange={() => setPaymentMethod('esewa')}
                              className="text-secondary focus:ring-secondary w-4 h-4 cursor-pointer"
                            />
                            <span className="font-bold text-xs text-[#00201f]">eSewa</span>
                          </label>
                          <span className="text-[10px] font-bold border border-emerald-500 text-emerald-500 rounded px-1.5 py-0.5 bg-emerald-50 select-none">
                            eSewa
                          </span>
                        </div>

                        {/* Khalti */}
                        <div className={`border rounded-xl p-4 flex items-center justify-between cursor-pointer transition-all ${
                          paymentMethod === 'khalti' 
                            ? 'border-purple-600 bg-purple-50/20 shadow-xs ring-1 ring-purple-600/10' 
                            : 'border-outline-variant/30 bg-[#f7f9fb]'
                        }`} onClick={() => setPaymentMethod('khalti')}>
                          <label className="flex items-center gap-3 cursor-pointer select-none">
                            <input
                              type="radio"
                              name="paymentOption"
                              value="khalti"
                              checked={paymentMethod === 'khalti'}
                              onChange={() => setPaymentMethod('khalti')}
                              className="text-purple-600 focus:ring-purple-600 w-4 h-4 cursor-pointer"
                            />
                            <span className="font-bold text-xs text-[#1e003b]">Khalti</span>
                          </label>
                          <span className="text-[10px] font-bold border border-purple-500 text-purple-500 rounded px-1.5 py-0.5 bg-purple-50 select-none">
                            Khalti
                          </span>
                        </div>
                      </div>

                      {(paymentMethod === 'esewa' || paymentMethod === 'khalti') && (
                        <div className="p-4 bg-[#f7f9fb] border border-outline-variant/20 rounded-xl space-y-2 animate-fade-in">
                          <label className="text-[10px] font-bold text-primary uppercase tracking-wider">
                            {paymentMethod === 'esewa' ? 'eSewa ID / Mobile Number' : 'Khalti ID / Mobile Number'}
                          </label>
                          <div className="relative">
                            <Phone className="w-4 h-4 text-outline absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                              type="tel"
                              placeholder="98XXXXXXXX"
                              value={walletPhone}
                              onChange={(e) => {
                                setWalletPhone(e.target.value.replace(/\D/g, ''));
                                if (errors.walletPhone) setErrors(prev => ({ ...prev, walletPhone: '' }));
                              }}
                              className={`w-full bg-white border pl-9 pr-4 py-2 rounded-lg text-xs focus:ring-1 focus:ring-primary outline-none ${
                                errors.walletPhone ? 'border-error' : 'border-outline-variant/30'
                              }`}
                            />
                          </div>
                          {errors.walletPhone && <p className="text-xs text-error font-medium">{errors.walletPhone}</p>}
                          <p className="text-[9px] text-outline font-light leading-relaxed">
                            Simulated OTP verification code will be sent to confirm payment transaction from {paymentMethod === 'esewa' ? 'eSewa' : 'Khalti'}.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Direct Bank Transfer Option */}
                    <div className={`border rounded-xl p-4 flex flex-col gap-3 transition-all ${
                      paymentMethod === 'bank' 
                        ? 'border-[#0f4c81] bg-white shadow-xs ring-1 ring-[#0f4c81]/15' 
                        : 'border-outline-variant/30 bg-[#f7f9fb]'
                    }`}>
                      <label className="flex justify-between items-center cursor-pointer select-none">
                        <span className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="paymentOption"
                            value="bank"
                            checked={paymentMethod === 'bank'}
                            onChange={() => setPaymentMethod('bank')}
                            className="text-[#0f4c81] focus:ring-[#0f4c81] w-4 h-4 cursor-pointer"
                          />
                          <span className="font-bold text-xs text-[#00355f]">Direct Bank Transfer</span>
                        </span>
                        <Building className="w-5 h-5 text-primary" />
                      </label>

                      {paymentMethod === 'bank' && (
                        <div className="space-y-4 pt-3 border-t border-outline-variant/10 animate-fade-in">
                          {/* Corporate Bank credentials */}
                          <div className="bg-[#f7f9fb] p-3 rounded-lg border border-outline-variant/20 text-xs font-light text-on-surface-variant space-y-1">
                            <p className="font-bold text-primary">Tejasmanyata Corporate Account Details:</p>
                            <p><span className="font-semibold">Bank:</span> Nabil Bank Ltd.</p>
                            <p><span className="font-semibold">Account Name:</span> Tejasmanyata Healthcare Pvt. Ltd.</p>
                            <p><span className="font-semibold">Account Number:</span> 0101017728391</p>
                            <p><span className="font-semibold">Branch:</span> Kathmandu Main Branch</p>
                          </div>

                          {/* Slip Drag and Drop Area */}
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-primary uppercase tracking-wider">Upload Transfer Slip</label>
                            
                            <div 
                              onDragEnter={handleDrag}
                              onDragOver={handleDrag}
                              onDragLeave={handleDrag}
                              onDrop={handleDrop}
                              className={`border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2 ${
                                dragOver ? 'border-[#0f4c81] bg-[#0f4c81]/5' : 'border-outline-variant/30 hover:bg-[#f7f9fb]'
                              }`}
                              onClick={() => document.getElementById('slip-upload-input').click()}
                            >
                              <input 
                                id="slip-upload-input"
                                type="file" 
                                className="hidden" 
                                accept="image/*,.pdf" 
                                onChange={handleFileChange}
                              />
                              <Upload className="w-8 h-8 text-primary/60" />
                              <div>
                                <p className="text-xs font-semibold text-primary">Click to upload or drag & drop</p>
                                <p className="text-[10px] text-outline mt-0.5">JPEG, PNG, or PDF up to 5MB</p>
                              </div>
                            </div>

                            {bankSlip && (
                              <div className="bg-[#e2f1e8] border border-secondary/15 text-secondary p-2.5 rounded-lg flex items-center justify-between gap-3 text-xs">
                                <span className="flex items-center gap-1.5 font-medium truncate">
                                  <FileText className="w-4 h-4 flex-shrink-0" /> {bankSlip.name}
                                </span>
                                <button 
                                  type="button" 
                                  onClick={(e) => { e.stopPropagation(); setBankSlip(null); }} 
                                  className="text-[#ff7043] font-bold text-xs"
                                >
                                  Remove
                                </button>
                              </div>
                            )}
                            {errors.bankSlip && <p className="text-xs text-error font-medium">{errors.bankSlip}</p>}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Billing Address Card */}
                  <div className="bg-white p-6 md:p-8 rounded-2xl border border-outline-variant/30 shadow-sm space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-sm text-[#00355f]">Billing Address</h3>
                      <label className="flex items-center gap-2 text-xs text-on-surface-variant cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={billingSameAsShipping}
                          onChange={(e) => setBillingSameAsShipping(e.target.checked)}
                          className="rounded border-outline-variant text-[#0f4c81] focus:ring-[#0f4c81] w-4 h-4 cursor-pointer"
                        />
                        <span>Same as shipping</span>
                      </label>
                    </div>

                    {!billingSameAsShipping && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-outline-variant/10 animate-fade-in">
                        <div className="space-y-1 sm:col-span-2">
                          <label className="text-[10px] font-bold text-primary uppercase tracking-wider">Billing Contact Name</label>
                          <input
                            type="text"
                            name="name"
                            value={billingForm.name}
                            onChange={handleBillingChange}
                            placeholder="Billing Recipient Name"
                            className={`w-full bg-[#f7f9fb] border px-4 py-2.5 rounded-xl text-xs focus:ring-1 focus:ring-primary outline-none ${
                              errors.billName ? 'border-error' : 'border-outline-variant/30'
                            }`}
                          />
                          {errors.billName && <p className="text-xs text-error font-medium">{errors.billName}</p>}
                        </div>
                        <div className="space-y-1 sm:col-span-2">
                          <label className="text-[10px] font-bold text-primary uppercase tracking-wider">Billing Address Details</label>
                          <input
                            type="text"
                            name="address"
                            value={billingForm.address}
                            onChange={handleBillingChange}
                            placeholder="Detailed address billing"
                            className={`w-full bg-[#f7f9fb] border px-4 py-2.5 rounded-xl text-xs focus:ring-1 focus:ring-primary outline-none ${
                              errors.billAddress ? 'border-error' : 'border-outline-variant/30'
                            }`}
                          />
                          {errors.billAddress && <p className="text-xs text-error font-medium">{errors.billAddress}</p>}
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-primary uppercase tracking-wider">City</label>
                          <input
                            type="text"
                            name="city"
                            value={billingForm.city}
                            onChange={handleBillingChange}
                            placeholder="Billing City"
                            className={`w-full bg-[#f7f9fb] border px-4 py-2.5 rounded-xl text-xs focus:ring-1 focus:ring-primary outline-none ${
                              errors.billCity ? 'border-error' : 'border-outline-variant/30'
                            }`}
                          />
                          {errors.billCity && <p className="text-xs text-error font-medium">{errors.billCity}</p>}
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-primary uppercase tracking-wider">Province</label>
                          <select
                            name="province"
                            value={billingForm.province}
                            onChange={handleBillingChange}
                            className="w-full bg-[#f7f9fb] border border-outline-variant/30 px-4 py-2.5 rounded-xl text-xs focus:ring-1 focus:ring-primary outline-none"
                          >
                            <option>Koshi Province</option>
                            <option>Madhesh Province</option>
                            <option>Bagmati Province</option>
                            <option>Gandaki Province</option>
                            <option>Lumbini Province</option>
                            <option>Karnali Province</option>
                            <option>Sudurpashchim Province</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {/* Bottom Security Note */}
                    <div className="bg-[#f7f9fb] border border-outline-variant/10 p-4 rounded-xl flex items-start gap-3 mt-4 text-xs font-light text-on-surface-variant">
                      <ShieldCheck className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <p>Your transaction is secured with 256-bit SSL encryption. We do not store your CVV or card details.</p>
                    </div>
                  </div>
                </form>
              )}
            </div>

            {/* Right Column: Order Summary & Guarantee */}
            <div className="lg:col-span-4 space-y-4">
              
              {/* Order Summary Card */}
              <div className="bg-white p-6 rounded-2xl border border-outline-variant/30 shadow-sm space-y-5">
                <h2 className="font-bold text-xl text-primary pb-3 border-b border-outline-variant/10">Order Summary</h2>
                
                {/* Cart products scroll view */}
                <div className="max-h-60 overflow-y-auto no-scrollbar space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center gap-3">
                      <div className="flex items-center gap-3 w-full">
                        <div className="w-12 h-12 bg-[#f7f9fb] rounded-xl p-1.5 flex items-center justify-center border border-outline-variant/10 flex-shrink-0">
                          <img src={item.image} className="w-full h-full object-contain" alt="" />
                        </div>
                        <div className="w-full min-w-0">
                          <p className="font-bold text-xs text-primary truncate">{item.name}</p>
                          <p className="text-[10px] text-outline font-light mt-0.5">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-semibold text-xs text-primary flex-shrink-0 whitespace-nowrap">
                        NPR {(item.price * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="h-px bg-outline-variant/10 my-3" />

                {/* Subtotal calculations */}
                <div className="space-y-3 text-xs font-light text-on-surface-variant">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-primary">NPR {subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping Fee</span>
                    <span className="font-semibold text-primary">
                      {shipping === 0 
                        ? 'FREE' 
                        : `NPR ${shipping.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (13%)</span>
                    <span className="font-semibold text-primary">NPR {tax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                  
                  <div className="h-px bg-outline-variant/20 my-3" />
                  
                  <div className="flex justify-between text-base font-bold text-primary">
                    <span>Total Amount</span>
                    <span className="font-extrabold">NPR {total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                </div>

                {checkoutStep === 2 && (
                  <button
                    type="submit"
                    onClick={handleCompletePayment}
                    className="w-full bg-[#00355f] text-white h-12 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-[#00355f]/95 shadow-md btn-hover-effect transition-all text-xs whitespace-nowrap cursor-pointer mt-3"
                  >
                    <Lock className="w-3.5 h-3.5" /> Complete Secure Payment
                  </button>
                )}

                {checkoutStep === 1 && (
                  <button
                    type="button"
                    onClick={handleProceedToPayment}
                    className="w-full bg-[#0f4c81] text-white h-12 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-[#0f4c81]/95 shadow-md btn-hover-effect transition-all text-xs whitespace-nowrap cursor-pointer mt-3"
                  >
                    Proceed to Payment
                  </button>
                )}
                
                <div className="flex items-center justify-center gap-1.5 text-outline text-[10px] pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
                  <span>PCI-DSS Compliant & Secured</span>
                </div>
              </div>

              {/* Satisfaction Guarantee card */}
              <div className="bg-[#e2f1e8]/45 border border-secondary/10 p-5 rounded-2xl flex items-start gap-3 shadow-xs">
                <Smile className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <h4 className="font-bold text-sm text-[#006a68]">Satisfaction Guarantee</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed font-light">
                    30-day easy returns on all health products.
                  </p>
                </div>
              </div>

            </div>

          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
