'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ArrowRight, ShieldCheck, Truck, Users, Activity, Award, HeartHandshake, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: '/images/healthcare_clinic.png',
      title: 'A Journey of Care Across Nepal',
      subtitle: 'Delivering world-class healthcare products to every family—from the bustling streets of Kathmandu to the quiet villages of the Himalayas.',
      ctaText: 'Explore Our Products',
      ctaLink: '/products',
    },
    {
      image: '/images/healthcare_photography.png',
      title: 'Importing Trust and Hope',
      subtitle: 'Providing professional grade medical essentials and clinical cosmeceuticals designed for precision and patient trust.',
      ctaText: 'Our 5-Year Journey',
      ctaLink: '/about',
    },
    {
      image: '/images/about_nepal.png',
      title: 'Reaching Remote Communities',
      subtitle: 'Bridging the gap between global medical innovation and local accessibility, across all 7 provinces.',
      ctaText: 'Get in Touch',
      ctaLink: '/contact',
    }
  ];

  // Auto scroll slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const categories = [
    {
      id: 'infant-formula',
      name: 'Infant Milk Formulas',
      desc: 'Supporting brain development and healthy growth for the next generation.',
      image: '/images/infant_formula.png',
      color: 'bg-emerald-50 text-emerald-800 border-emerald-100',
    },
    {
      id: 'supplements',
      name: 'Dietary Supplements',
      desc: 'Everyday wellness solutions for students, diligent workers, and elders.',
      image: '/images/dietary_supplement.png',
      color: 'bg-blue-50 text-blue-800 border-blue-100',
    },
    {
      id: 'cosmeceuticals',
      name: 'Cosmeceuticals',
      desc: 'Clinically tested skincare designed for confidence and professional care.',
      image: '/images/cosmeceutical.png',
      color: 'bg-teal-50 text-teal-800 border-teal-100',
    },
    {
      id: 'surgical',
      name: 'Surgical Items',
      desc: 'Reliable, high-precision essentials for our frontline healthcare heroes.',
      image: '/images/surgical_kit.png',
      color: 'bg-purple-50 text-purple-800 border-purple-100',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="pt-16 flex-grow">
        {/* Dynamic Hero Section with Slider */}
        <section className="relative bg-primary overflow-hidden h-[500px] md:h-[600px] lg:h-[650px] flex items-center">
          <div className="absolute inset-0 z-0">
            {slides.map((slide, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  idx === currentSlide ? 'opacity-30 scale-100' : 'opacity-0 scale-105 pointer-events-none'
                }`}
                style={{
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            ))}
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-transparent" />
          </div>

          <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full text-white">
            <div className="max-w-2xl animate-fade-up">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary-container/20 text-on-primary-container rounded-full text-xs font-semibold uppercase tracking-wider mb-6 border border-white/10">
                <Activity className="w-3.5 h-3.5 text-secondary" />
                Trusted Healthcare Importer
              </span>
              <h1 className="font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight tracking-tight mb-6">
                {slides[currentSlide].title}
              </h1>
              <p className="text-lg md:text-xl text-on-primary-container leading-relaxed mb-8 font-light">
                {slides[currentSlide].subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={slides[currentSlide].ctaLink}
                  className="bg-cta-warm text-white px-8 py-3.5 rounded-xl font-semibold text-center hover:brightness-110 shadow-lg btn-hover-effect flex items-center justify-center gap-2"
                >
                  {slides[currentSlide].ctaText}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/about"
                  className="bg-transparent border border-white/30 text-white px-8 py-3.5 rounded-xl font-semibold text-center hover:bg-white/10 transition-colors"
                >
                  Our 5-Year Journey
                </Link>
              </div>
            </div>
          </div>

          {/* Slider Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-2 rounded-full text-white backdrop-blur-sm z-20 transition-all cursor-pointer outline-none"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-2 rounded-full text-white backdrop-blur-sm z-20 transition-all cursor-pointer outline-none"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dot Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-3 h-3 rounded-full transition-all cursor-pointer outline-none ${
                  idx === currentSlide ? 'bg-cta-warm w-6' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        </section>

        {/* Stats Bar */}
        <section className="bg-secondary-container py-8 relative z-10 shadow-inner border-y border-outline-variant/10">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center space-y-1">
                <div className="text-3xl md:text-4xl font-extrabold text-primary">5+</div>
                <div className="text-xs md:text-sm font-semibold text-on-secondary-container uppercase tracking-wider">Years of Service</div>
              </div>
              <div className="text-center space-y-1">
                <div className="text-3xl md:text-4xl font-extrabold text-primary">200+</div>
                <div className="text-xs md:text-sm font-semibold text-on-secondary-container uppercase tracking-wider">Hospitals Supplied</div>
              </div>
              <div className="text-center space-y-1">
                <div className="text-3xl md:text-4xl font-extrabold text-primary">7</div>
                <div className="text-xs md:text-sm font-semibold text-on-secondary-container uppercase tracking-wider">Provinces Reached</div>
              </div>
              <div className="text-center space-y-1">
                <div className="text-3xl md:text-4xl font-extrabold text-primary">100%</div>
                <div className="text-xs md:text-sm font-semibold text-on-secondary-container uppercase tracking-wider">Quality Standards</div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Categories Grid */}
        <section className="py-20 md:py-28 bg-surface" id="products">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center mb-16 space-y-4">
              <h2 className="font-bold text-3xl md:text-4xl text-primary">Premium Care for Every Stage of Life</h2>
              <p className="text-on-surface-variant max-w-xl mx-auto text-sm md:text-base">
                Curating the finest medical grade and wellness imports to elevate healthcare delivery standards in Nepal.
              </p>
              <div className="h-1.5 w-16 bg-cta-warm mx-auto rounded-full" />
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {categories.map((cat, idx) => (
                <div
                  key={cat.id}
                  className="card-shadow bg-white p-6 rounded-2xl flex flex-col items-center text-center group product-card-hover border border-transparent transition-all duration-300"
                >
                  <div className="w-28 h-28 mb-6 p-4 rounded-full bg-secondary-container/20 group-hover:scale-110 transition-transform duration-500 flex items-center justify-center">
                    <img
                      alt={cat.name}
                      className="w-full h-full object-contain"
                      src={cat.image}
                    />
                  </div>
                  <h3 className="font-bold text-xl text-primary mb-3">{cat.name}</h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed mb-6 flex-grow">{cat.desc}</p>
                  <Link
                    href={`/products?category=${cat.id}`}
                    className="inline-flex items-center gap-1.5 text-secondary hover:text-primary font-bold text-sm"
                  >
                    View Catalog
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact/Mission Section */}
        <section className="py-20 md:py-28 bg-surface-container-low" id="about">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 items-center">
              {/* Image Column */}
              <div className="w-full lg:col-span-5 order-2 lg:order-1">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl group zoom-container h-[350px] md:h-[450px]">
                  <img
                    alt="Healthcare reach in Nepal"
                    className="zoom-image"
                    src="/images/healthcare_photography.png"
                  />
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-300" />
                </div>
              </div>

              {/* Text Column */}
              <div className="w-full lg:col-span-7 order-1 lg:order-2 space-y-6">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary/10 rounded-full text-secondary font-bold text-xs uppercase tracking-wider">
                  <HeartHandshake className="w-4 h-4" />
                  Our Mission
                </span>
                <h2 className="font-bold text-3xl md:text-4xl text-primary leading-tight">
                  More Than Just Products. We Import Trust and Hope.
                </h2>
                <div className="space-y-4 text-on-surface-variant text-sm md:text-base leading-relaxed font-light">
                  <p>
                    At Tejasmanyata, we believe healthcare shouldn't be a privilege of the city. We've dedicated the last half-decade to bridging the gap between global medical innovation and local accessibility.
                  </p>
                  <p>
                    Every product we import carries a silent promise to make healthcare in Nepal better, safer, and more accessible for all.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <p className="text-on-surface text-sm font-medium">Reaching remote clinics with temperature-controlled logistics.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Truck className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <p className="text-on-surface text-sm font-medium">Ensuring price transparency and ethical distribution.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <p className="text-on-surface text-sm font-medium">Over 200 partner healthcare facilities nationwide.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <p className="text-on-surface text-sm font-medium">Strict adherence to global quality standards.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 md:py-24 bg-primary relative overflow-hidden text-center text-white">
          <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-container/30 via-transparent to-transparent opacity-65" />
          <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-8">
            <h2 className="font-bold text-3xl md:text-4xl leading-tight">Ready to partner with Nepal's most trusted importer?</h2>
            <p className="text-on-primary-container text-base md:text-lg max-w-xl mx-auto font-light">
              Join over 200 hospitals and clinics nationwide in delivering better healthcare outcomes.
            </p>
            <div className="pt-4">
              <Link
                href="/contact"
                className="inline-block bg-white text-primary px-10 py-4 rounded-xl font-bold hover:bg-primary-fixed hover:text-on-primary-fixed shadow-2xl btn-hover-effect text-center"
              >
                Contact Our Distribution Team
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
