'use client';

import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';
import { 
  ClipboardCheck, 
  HeartHandshake, 
  Globe, 
  Headphones,
  MapPin,
  Users
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-grow">
        
        {/* Hero Section Banner */}
        <section 
          className="relative bg-primary overflow-hidden h-[450px] md:h-[500px] flex items-center pt-16"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0, 53, 95, 0.85) 35%, rgba(0, 53, 95, 0.25)), url('/images/healthcare_clinic.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12 w-full text-white z-10">
            <div className="max-w-xl space-y-6 animate-fade-up">
              <h1 className="font-extrabold text-4xl sm:text-5xl leading-tight">
                Bridging the Gap in Nepal's Healthcare
              </h1>
              <p className="text-base sm:text-lg text-on-primary-container leading-relaxed font-light">
                Tejasmanyata is dedicated to bringing world-class medical innovation to every corner of our nation.
              </p>
              <div>
                <a 
                  href="#journey" 
                  className="inline-block bg-white text-primary px-8 py-3 rounded-full font-bold hover:bg-white/90 shadow-lg btn-hover-effect text-sm transition-all"
                >
                  Our Philosophy
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Our Journey */}
        <section id="journey" className="py-16 md:py-24 max-w-7xl mx-auto px-6 md:px-12 bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Narrative */}
            <div className="space-y-6 animate-fade-up">
              <span className="text-xs font-bold text-secondary uppercase tracking-widest block">OUR JOURNEY</span>
              <h2 className="text-3xl font-extrabold text-primary leading-snug">
                Empowering local clinics with global excellence
              </h2>
              <div className="space-y-4 text-on-surface-variant text-sm md:text-base leading-relaxed font-light">
                <p>
                  Founded in the heart of Nepal, Tejasmanyata started with a simple vision: to bring the latest in healthcare innovation to local clinics. Recognizing the challenges faced by community healthcare providers, we sought to bridge the gap by delivering advanced medical diagnostic tools and services.
                </p>
                <p>
                  Our commitment to bridging global healthcare innovations to local clinics remains unwavering. We believe that by equipping clinics with modern tools, we can elevate patient care and improve health outcomes across the country.
                </p>
              </div>
            </div>

            {/* Right Image Block */}
            <div className="relative animate-fade-up animation-delay-100 flex justify-center">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[300px] w-full max-w-[450px] group zoom-container">
                <img 
                  src="/images/healthcare_photography.png" 
                  className="w-full h-full object-cover zoom-image" 
                  alt="Clinical support" 
                />
                <div className="absolute inset-0 bg-[#006a68]/10 group-hover:bg-transparent transition-colors duration-300" />
              </div>
              
              {/* Overlapping Floating Badge at bottom-left */}
              <div className="absolute bottom-[-16px] left-4 md:left-8 bg-secondary-container text-on-secondary-container px-5 py-3.5 rounded-xl flex items-center gap-3 shadow-lg border border-white/20 z-20">
                <span className="text-3xl font-black leading-none text-secondary">10+</span>
                <div className="flex flex-col text-[10px] font-bold uppercase tracking-wider leading-tight text-on-secondary-fixed-variant">
                  <span>Years of</span>
                  <span>Service</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Section 3: Foundations of Excellence */}
        <section className="bg-surface py-20 border-t border-b border-outline-variant/10">
          <div className="max-w-7xl mx-auto px-6 md:px-12 text-center space-y-16">
            <div className="space-y-3">
              <h2 className="font-extrabold text-3xl text-primary">Foundations of Excellence</h2>
              <p className="text-on-surface-variant text-sm md:text-base max-w-xl mx-auto font-light">
                The values that guide us in bringing healthcare solutions to you.
              </p>
            </div>

            {/* 4 Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
              {/* Card 1 */}
              <div className="bg-white p-6 rounded-2xl border border-outline-variant/20 shadow-sm space-y-4 hover:shadow-md transition-shadow duration-300">
                <div className="w-10 h-10 bg-[#e2f1e8] text-[#006a68] rounded-xl flex items-center justify-center">
                  <ClipboardCheck className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-primary">Clinical Excellence</h3>
                <p className="text-on-surface-variant text-xs leading-relaxed font-light">
                  Leveraging pioneering science and diagnostics to deliver the highest standard of patient care.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white p-6 rounded-2xl border border-outline-variant/20 shadow-sm space-y-4 hover:shadow-md transition-shadow duration-300">
                <div className="w-10 h-10 bg-[#e2f1e8] text-[#006a68] rounded-xl flex items-center justify-center">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-primary">Local Trust</h3>
                <p className="text-on-surface-variant text-xs leading-relaxed font-light">
                  Sourcing products we would use in our own homes. Providing essential healthcare tools with care and honesty.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white p-6 rounded-2xl border border-outline-variant/20 shadow-sm space-y-4 hover:shadow-md transition-shadow duration-300">
                <div className="w-10 h-10 bg-[#e2f1e8] text-[#006a68] rounded-xl flex items-center justify-center">
                  <Globe className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-primary">Global Innovation</h3>
                <p className="text-on-surface-variant text-xs leading-relaxed font-light">
                  Introducing cutting-edge medical technologies from around the world to Nepali healthcare.
                </p>
              </div>

              {/* Card 4 */}
              <div className="bg-white p-6 rounded-2xl border border-outline-variant/20 shadow-sm space-y-4 hover:shadow-md transition-shadow duration-300">
                <div className="w-10 h-10 bg-[#e2f1e8] text-[#006a68] rounded-xl flex items-center justify-center">
                  <Headphones className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-primary">Unwavering Support</h3>
                <p className="text-on-surface-variant text-xs leading-relaxed font-light">
                  Dedicated to support healthcare providers with continuous training and reliable servicing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Our Impact */}
        <section className="py-16 md:py-24 max-w-7xl mx-auto px-6 md:px-12 bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Image Column with overlay */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[300px] w-full max-w-[450px] group zoom-container">
                <img 
                  src="/images/about_nepal.png" 
                  className="zoom-image w-full h-full object-cover" 
                  alt="Rural Nepal support" 
                />
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-300" />
                
                {/* Floating Capsule Overlay */}
                <div className="absolute top-6 right-6 bg-primary-container text-white p-5 rounded-2xl border border-white/10 shadow-xl z-20 flex flex-col items-start gap-1">
                  <span className="text-3xl font-extrabold leading-none">200+</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider leading-tight text-on-primary-container">
                    Active Clinic Partners
                  </span>
                </div>
              </div>
            </div>

            {/* Right Stats and Copy */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold text-secondary uppercase tracking-widest block">OUR IMPACT</span>
              <h2 className="text-3xl font-extrabold text-primary leading-snug">
                A Presence that Transforms Lives Across All 7 Provinces
              </h2>
              <p className="text-on-surface-variant text-sm md:text-base leading-relaxed font-light">
                From local health posts in remote areas to leading hospitals in urban centers, our diagnostic systems and medical solutions empower healthcare providers to deliver fast, accurate, and reliable treatment. We are proud to support healthcare professionals at every level.
              </p>
              
              {/* Stats Row */}
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#e2f1e8] rounded-xl flex items-center justify-center text-secondary flex-shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-2xl text-primary leading-none">75</h4>
                    <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mt-1">Districts Served</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#e2f1e8] rounded-xl flex items-center justify-center text-secondary flex-shrink-0">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-2xl text-primary leading-none">1.2M+</h4>
                    <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mt-1">Lives Impacted</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Section 5: Dark Blue CTA Banner */}
        <section className="py-12 max-w-7xl mx-auto px-6 md:px-12 bg-white">
          <div className="bg-primary-container text-white rounded-3xl p-8 md:p-12 text-center relative overflow-hidden shadow-xl">
            {/* Elegant sweep arcs SVG */}
            <div className="absolute inset-0 pointer-events-none opacity-25">
              <svg className="w-full h-full" viewBox="0 0 800 300" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                <path d="M-100 350 C 200 150, 600 150, 900 350" stroke="white" strokeWidth="1.5" />
                <path d="M-100 380 C 200 120, 600 120, 900 380" stroke="white" strokeWidth="1.5" />
                <path d="M-100 410 C 200 90, 600 90, 900 410" stroke="white" strokeWidth="1.5" />
              </svg>
            </div>
            
            <div className="max-w-2xl mx-auto space-y-6 relative z-10">
              <h2 className="font-extrabold text-2xl md:text-3xl leading-snug">
                Join our mission to transform healthcare in Nepal
              </h2>
              <p className="text-xs md:text-sm text-on-primary-container font-light leading-relaxed max-w-lg mx-auto">
                Whether you are a healthcare professional, a vendor, or a technology partner, let's work together to build a healthier nation.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
                <Link
                  href="/contact"
                  className="bg-white text-primary px-8 py-3 rounded-full font-bold hover:bg-white/90 shadow-md text-sm btn-hover-effect"
                >
                  Contact Our Team
                </Link>
                <Link
                  href="/contact"
                  className="bg-transparent border border-white/40 text-white px-8 py-3 rounded-full font-bold hover:bg-white/10 text-sm transition-colors"
                >
                  Explore Partnerships
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
