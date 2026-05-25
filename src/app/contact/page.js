'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import { 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  Send, 
  ShieldCheck, 
  ArrowRight, 
  BadgeCheck,
  Globe,
  Share2,
  Users
} from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    org: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSent, setIsSent] = useState(false);

  const validate = () => {
    const tempErrors = {};
    if (!form.name.trim()) tempErrors.name = 'Full Name is required.';
    if (!form.email.trim()) {
      tempErrors.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      tempErrors.email = 'Invalid email address.';
    }
    if (!form.message.trim()) tempErrors.message = 'Message content is required.';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSent(true);
      setForm({ name: '', org: '', email: '', subject: 'General Inquiry', message: '' });
      setTimeout(() => setIsSent(false), 5000);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f7f9fb]">
      <Navbar />

      <main className="flex-grow pt-16">
        
        {/* Hero Section Banner */}
        <section className="bg-[#00355f] text-white pt-16 pb-36 relative overflow-hidden">
          {/* Subtle dotted matrix bg */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-3">
            <h1 className="font-extrabold text-3xl md:text-4xl tracking-tight">Get in Touch</h1>
            <p className="text-white/80 text-xs md:text-sm max-w-2xl font-light leading-relaxed">
              Supporting Nepal's healthcare community by bridging the gap between global medical innovation and local clinical excellence. We are here to answer your questions and facilitate your journey.
            </p>
          </div>
        </section>

        {/* Content Overlap Grid */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 relative z-20 -mt-24 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column: Contact Cards */}
            <div className="lg:col-span-4 space-y-4">
              
              {/* Card 1: Address */}
              <div className="bg-white p-5 rounded-2xl border border-outline-variant/20 shadow-md flex gap-4 items-start">
                <div className="w-10 h-10 bg-[#e2f1e8] text-[#006a68] rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-bold text-[10px] text-primary uppercase tracking-wider">Physical Address</h4>
                  <p className="text-on-surface font-semibold text-xs mt-0.5">Biratnagar, Nepal</p>
                  <p className="text-on-surface-variant text-[11px] font-light">Saugat Marg, Bargachi, Biratnagar-2</p>
                </div>
              </div>

              {/* Card 2: Email */}
              <div className="bg-white p-5 rounded-2xl border border-outline-variant/20 shadow-md flex gap-4 items-start">
                <div className="w-10 h-10 bg-[#e2f1e8] text-[#006a68] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-bold text-[10px] text-primary uppercase tracking-wider">Professional Email</h4>
                  <a href="mailto:tmcbintlgroup@gmail.com" className="text-on-surface font-semibold text-xs mt-0.5 hover:underline block">
                    tmcbintlgroup@gmail.com
                  </a>
                </div>
              </div>

              {/* Card 3: Support Phone */}
              <div className="bg-white p-5 rounded-2xl border border-outline-variant/20 shadow-md flex gap-4 items-start">
                <div className="w-10 h-10 bg-[#e2f1e8] text-[#006a68] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-bold text-[10px] text-primary uppercase tracking-wider">Dedicated Support</h4>
                  <p className="text-on-surface font-semibold text-xs mt-0.5">9705036555, 9802020001</p>
                </div>
              </div>

              {/* Mission Badge */}
              <div className="bg-[#e2f1e8]/75 p-5 rounded-2xl border border-secondary/15 space-y-2 shadow-xs">
                <div className="flex items-center gap-2 text-secondary">
                  <BadgeCheck className="w-4.5 h-4.5" />
                  <h4 className="font-bold text-xs text-[#00201f]">Our Mission</h4>
                </div>
                <p className="text-[11px] text-on-surface-variant leading-relaxed font-light">
                  We are committed to empowering local clinics with the latest global medical advancements, ensuring every patient in Nepal receives world-class care.
                </p>
              </div>

            </div>

            {/* Right Column: Send Message Box */}
            <div className="lg:col-span-8 bg-white p-6 md:p-8 rounded-2xl border border-outline-variant/20 shadow-md space-y-6">
              
              <h3 className="font-bold text-lg text-[#00355f] tracking-tight">Send us a Message</h3>

              {isSent && (
                <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 p-3.5 rounded-xl flex items-center gap-3 animate-fade-up">
                  <CheckCircle2 className="w-4.5 h-4.5 flex-shrink-0" />
                  <span className="text-xs font-semibold">Message sent successfully! Our team will contact you shortly.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-primary uppercase tracking-wider">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleInputChange}
                      placeholder="Dr. Sameer Thapa"
                      className={`w-full bg-[#f7f9fb] border px-4.5 py-2.5 rounded-xl text-xs focus:ring-1 focus:ring-primary outline-none transition-all ${
                        errors.name ? 'border-error' : 'border-outline-variant/30'
                      }`}
                    />
                    {errors.name && <p className="text-xs text-error font-medium mt-0.5">{errors.name}</p>}
                  </div>

                  {/* Organization/Hospital */}
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-primary uppercase tracking-wider">Organization/Hospital</label>
                    <input
                      type="text"
                      name="org"
                      value={form.org}
                      onChange={handleInputChange}
                      placeholder="Central General Hospital"
                      className="w-full bg-[#f7f9fb] border border-outline-variant/30 px-4.5 py-2.5 rounded-xl text-xs focus:ring-1 focus:ring-primary outline-none"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-primary uppercase tracking-wider">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleInputChange}
                      placeholder="sameer@hospital.com"
                      className={`w-full bg-[#f7f9fb] border px-4.5 py-2.5 rounded-xl text-xs focus:ring-1 focus:ring-primary outline-none transition-all ${
                        errors.email ? 'border-error' : 'border-[#dcdfe3]'
                      }`}
                    />
                    {errors.email && <p className="text-xs text-error font-medium mt-0.5">{errors.email}</p>}
                  </div>

                  {/* Subject */}
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-primary uppercase tracking-wider">Subject</label>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleInputChange}
                      className="w-full bg-[#f7f9fb] border border-outline-variant/30 px-4.5 py-2.5 rounded-xl text-xs focus:ring-1 focus:ring-primary outline-none text-on-surface"
                    >
                      <option>General Inquiry</option>
                      <option>Hospital Equipment Bulk Orders</option>
                      <option>Retail Partnerships</option>
                      <option>Technical Support</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-primary uppercase tracking-wider">Your Message</label>
                  <textarea
                    name="message"
                    rows="5"
                    value={form.message}
                    onChange={handleInputChange}
                    placeholder="How can we assist your clinical needs today?"
                    className={`w-full bg-[#f7f9fb] border px-4.5 py-2.5 rounded-xl text-xs focus:ring-1 focus:ring-primary outline-none resize-none transition-all ${
                      errors.message ? 'border-error' : 'border-outline-variant/30'
                    }`}
                  />
                  {errors.message && <p className="text-xs text-error font-medium mt-0.5">{errors.message}</p>}
                </div>

                <div className="flex justify-start">
                  <button
                    type="submit"
                    className="bg-[#00355f] text-white px-5 py-2.5 rounded-lg font-bold flex items-center gap-2 hover:bg-[#00355f]/95 shadow-md btn-hover-effect transition-all text-xs"
                  >
                    Send Message <Send className="w-3.5 h-3.5" />
                  </button>
                </div>

              </form>
            </div>

          </div>
        </section>

        {/* Department Directory Grid */}
        <section className="bg-white border-t border-b border-outline-variant/10 py-16">
          <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-10">
            
            <div className="text-center space-y-1">
              <h2 className="font-bold text-xl md:text-2xl text-[#00355f] tracking-tight">Department Directory</h2>
              <p className="text-xs md:text-sm text-on-surface-variant font-light">
                Connect directly with our specialized teams
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="bg-white p-6 rounded-2xl border border-outline-variant/20 space-y-3.5 hover:shadow-md transition-shadow duration-300">
                <h3 className="font-bold text-xs md:text-sm text-primary">Wholesale Inquiries</h3>
                <p className="text-[11px] text-on-surface-variant leading-relaxed font-light">
                  Bulk medical supplies and hospital-grade equipment procurement.
                </p>
                <a 
                  href="mailto:wholesale@tejasmanyata.com" 
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary hover:text-secondary-fixed-dim transition-colors"
                >
                  wholesale@tejasmanyata.com <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Card 2 */}
              <div className="bg-white p-6 rounded-2xl border border-outline-variant/20 space-y-3.5 hover:shadow-md transition-shadow duration-300">
                <h3 className="font-bold text-xs md:text-sm text-primary">Product Support</h3>
                <p className="text-[11px] text-on-surface-variant leading-relaxed font-light">
                  Technical assistance and maintenance for medical devices.
                </p>
                <a 
                  href="mailto:support@tejasmanyata.com" 
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary hover:text-secondary-fixed-dim transition-colors"
                >
                  support@tejasmanyata.com <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Card 3 */}
              <div className="bg-white p-6 rounded-2xl border border-outline-variant/20 space-y-3.5 hover:shadow-md transition-shadow duration-300">
                <h3 className="font-bold text-xs md:text-sm text-primary">Media Relations</h3>
                <p className="text-[11px] text-on-surface-variant leading-relaxed font-light">
                  Press inquiries, community outreach, and brand partnerships.
                </p>
                <a 
                  href="mailto:media@tejasmanyata.com" 
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary hover:text-secondary-fixed-dim transition-colors"
                >
                  media@tejasmanyata.com <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* Grayscale Map Section */}
        <section>
          <div className="w-full h-80 relative overflow-hidden border-b border-outline-variant/10">
            <iframe 
              src="https://maps.google.com/maps?q=Saugat%20Marg,%20Bargachi,%20Biratnagar,%20Nepal&t=&z=16&ie=UTF8&iwloc=B&output=embed" 
              className="w-full h-full border-0 filter grayscale contrast-125 opacity-90" 
              allowFullScreen="" 
              loading="lazy"
              title="Tejas Manyata Healthcare HQ Google Map"
            />
          </div>
        </section>

      </main>

      {/* Grayscale custom matching footer to screenshot */}
      <footer className="bg-[#eceef0] pt-12 pb-10 text-on-surface">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            
            {/* Column 1: Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img src="/images/logo.png" alt="Tejas Manyata Logo" className="w-9 h-9 object-contain" />
                <span className="font-sans font-bold text-xl text-primary tracking-tight">Tejas Manyata</span>
              </div>
              <p className="text-on-surface-variant text-xs md:text-sm leading-relaxed font-light max-w-xs">
                Pioneering healthcare excellence in Nepal through innovative medical solutions and unwavering professional support.
              </p>
            </div>

            {/* Column 2: Links */}
            <div className="space-y-4">
              <h4 className="font-bold text-primary text-xs uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-2.5 text-xs text-on-surface-variant font-light">
                <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
                <li><Link href="/support" className="hover:text-primary transition-colors">Support</Link></li>
              </ul>
            </div>

            {/* Column 3: Connect & Copy */}
            <div className="space-y-6">
              <div className="space-y-3">
                <h4 className="font-bold text-primary text-xs uppercase tracking-wider">Connect</h4>
                <div className="flex items-center gap-4 text-primary">
                  <Link href="#" className="hover:text-[#006a68] transition-colors"><Globe className="w-4 h-4" /></Link>
                  <Link href="#" className="hover:text-[#006a68] transition-colors"><Share2 className="w-4 h-4" /></Link>
                  <Link href="#" className="hover:text-[#006a68] transition-colors"><Users className="w-4 h-4" /></Link>
                </div>
              </div>
              <p className="text-[10px] text-on-surface-variant font-light pt-2">
                &copy; 2026 Tejas Manyata Healthcare. All rights reserved.
              </p>
            </div>

          </div>
        </div>
      </footer>
    </div>
  );
}
