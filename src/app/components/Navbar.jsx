'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, ShoppingCart, Search, User } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const { getCartCount } = useCart();
  const pathname = usePathname();
  const router = useRouter();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchVal.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchVal.trim())}`);
    }
  };

  const links = [
    { name: 'Products', href: '/products' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-surface-container-lowest/90 backdrop-blur-md border-b border-outline-variant h-16 flex justify-between items-center px-4 md:px-12">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-3">
            {/* SVG Logo Mark */}
            <svg className="w-8 h-8" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="60" height="60" rx="12" fill="#0f4c81" />
              <path d="M25 30 H35 M30 25 V35" stroke="white" strokeWidth="4" strokeLinecap="round" />
              <path d="M38 22 L45 15" stroke="#2dd4bf" strokeWidth="3" strokeLinecap="round" />
            </svg>
            <span className="font-sans font-bold text-xl text-primary tracking-tight">Tejasmanyata</span>
          </Link>
        </div>

        {/* Desktop Search */}
        <form onSubmit={handleSearchSubmit} className="hidden lg:flex items-center relative group mx-4 max-w-xs w-full">
          <input
            className="bg-surface-container-low border-none rounded-full pl-10 pr-4 py-1.5 text-sm focus:ring-2 focus:ring-primary w-full transition-all outline-none"
            placeholder="Search products..."
            type="text"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
          />
          <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors outline-none">
            <Search className="w-4 h-4" />
          </button>
        </form>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium text-sm transition-colors pb-1 whitespace-nowrap ${
                  isActive
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Desktop Right Buttons */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/cart"
              className={`relative transition-colors ${
                pathname === '/cart' ? 'text-primary' : 'text-on-surface hover:text-primary'
              }`}
            >
              <ShoppingCart className="w-6 h-6" />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-cta-warm text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-bounce">
                  {getCartCount()}
                </span>
              )}
            </Link>
            <Link
              href="/auth/login"
              className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors"
            >
              Login
            </Link>
            <Link
              href="/contact"
              className="bg-primary text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-primary/95 transition-all btn-hover-effect whitespace-nowrap"
            >
              Book consultation
            </Link>
          </div>

          {/* Cart Icon Mobile */}
          <Link
            href="/cart"
            className="md:hidden relative text-on-surface hover:text-primary transition-colors mr-2"
          >
            <ShoppingCart className="w-6 h-6" />
            {getCartCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-cta-warm text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {getCartCount()}
              </span>
            )}
          </Link>

          {/* Mobile Menu Trigger */}
          <button className="md:hidden p-2 text-on-surface outline-none" onClick={toggleMenu}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[60] md:hidden transition-opacity"
          onClick={toggleMenu}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-[280px] bg-white z-[70] shadow-2xl p-6 md:hidden transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center mb-10">
          <span className="font-bold text-xl text-primary">Tejasmanyata</span>
          <button className="p-2 outline-none" onClick={toggleMenu}>
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="space-y-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={toggleMenu}
              className={`block font-medium text-lg ${
                pathname === link.href ? 'text-primary font-semibold' : 'text-on-surface-variant'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="h-px bg-outline-variant my-4" />
          <Link
            href="/auth/login"
            onClick={toggleMenu}
            className="block font-medium text-lg text-on-surface-variant"
          >
            Login
          </Link>
          <Link
            href="/contact"
            onClick={toggleMenu}
            className="block w-full bg-primary text-white text-center py-3 rounded-full font-medium btn-hover-effect"
          >
            Book consultation
          </Link>
        </div>
      </div>
    </>
  );
}
