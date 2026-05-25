'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, MapPin, Phone, Share2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-surface-dim pt-16 pb-10 mt-auto border-t border-outline-variant/30 text-on-surface">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand block */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <svg className="w-8 h-8" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="60" height="60" rx="12" fill="#0f4c81" />
                <path d="M25 30 H35 M30 25 V35" stroke="white" strokeWidth="4" strokeLinecap="round" />
                <path d="M38 22 L45 15" stroke="#2dd4bf" strokeWidth="3" strokeLinecap="round" />
              </svg>
              <span className="font-bold text-xl text-primary tracking-tight">Tejasmanyata</span>
            </div>
            <p className="text-on-surface-variant max-w-xs text-xs md:text-sm leading-relaxed">
              Delivering quality healthcare solutions across Nepal since 2012.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-bold text-primary text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-on-surface-variant hover:text-primary transition-colors text-xs font-semibold">
                  Corporate Profile
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-on-surface-variant hover:text-primary transition-colors text-xs font-semibold">
                  News & Media
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-on-surface-variant hover:text-primary transition-colors text-xs font-semibold">
                  Technical Support
                </Link>
              </li>
              <li>
                <Link href="/about#board" className="text-on-surface-variant hover:text-primary transition-colors text-xs font-semibold">
                  Medical Advisory Board
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Standards */}
          <div className="space-y-4">
            <h4 className="font-bold text-primary text-sm uppercase tracking-wider">Our Standards</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy" className="text-on-surface-variant hover:text-primary transition-colors text-xs font-semibold">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-on-surface-variant hover:text-primary transition-colors text-xs font-semibold">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/compliance" className="text-on-surface-variant hover:text-primary transition-colors text-xs font-semibold">
                  Compliance & Regulations
                </Link>
              </li>
              <li>
                <Link href="/ethics" className="text-on-surface-variant hover:text-primary transition-colors text-xs font-semibold">
                  Ethics Hotline
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div className="space-y-4">
            <h4 className="font-bold text-primary text-sm uppercase tracking-wider">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-on-surface-variant text-xs font-semibold">
                <MapPin className="w-4 h-4 text-secondary flex-shrink-0" />
                <span>Kathmandu, Nepal</span>
              </li>
              <li className="flex items-center gap-3 text-on-surface-variant text-xs font-semibold">
                <Mail className="w-4 h-4 text-secondary flex-shrink-0" />
                <span>info@tejasmanyata.com</span>
              </li>
            </ul>
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2 text-on-surface-variant">
              <Link href="#" className="hover:text-primary transition-colors">
                <Share2 className="w-4 h-4" />
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom divider and copyright */}
        <div className="mt-16 pt-8 border-t border-outline-variant/30 text-center text-on-surface-variant text-xs font-light">
          &copy; 2026 Tejasmanyata Healthcare. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
