'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Mail, Lock, Check } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const tempErrors = {};
    if (!form.email.trim()) {
      tempErrors.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      tempErrors.email = 'Invalid email address.';
    }
    if (!form.password) tempErrors.password = 'Password is required.';
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
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        router.push('/');
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6">
      
      {/* Back to Home Link */}
      <div className="absolute top-6 left-6">
        <Link href="/" className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1">
          ← Back to Homepage
        </Link>
      </div>

      {/* Login Box */}
      <div className="bg-white p-6 md:p-10 rounded-3xl border border-outline-variant/30 shadow-lg max-w-md w-full space-y-8 animate-fade-up">
        
        {/* Branding header */}
        <div className="text-center space-y-3">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <svg className="w-9 h-9" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="60" height="60" rx="12" fill="#0f4c81" />
              <path d="M25 30 H35 M30 25 V35" stroke="white" strokeWidth="4" strokeLinecap="round" />
              <path d="M38 22 L45 15" stroke="#2dd4bf" strokeWidth="3" strokeLinecap="round" />
            </svg>
            <span className="font-extrabold text-2xl text-primary tracking-tight">Tejasmanyata</span>
          </Link>
          <h2 className="text-xl font-bold text-on-surface">Welcome Back</h2>
          <p className="text-xs text-outline">Access your clinical account or distributor console.</p>
        </div>

        {/* Form fields */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Email */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-on-surface-variant uppercase">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-outline absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleInputChange}
                className={`w-full bg-surface border pl-10 pr-4 py-2.5 rounded-xl text-sm focus:outline-primary outline-none ${
                  errors.email ? 'border-error' : 'border-outline-variant'
                }`}
                placeholder="you@example.com"
              />
            </div>
            {errors.email && <p className="text-xs text-error font-medium">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-on-surface-variant uppercase">Password</label>
              <Link href="#" className="text-xs font-semibold text-secondary hover:underline">
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-outline absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleInputChange}
                className={`w-full bg-surface border pl-10 pr-4 py-2.5 rounded-xl text-sm focus:outline-primary outline-none ${
                  errors.password ? 'border-error' : 'border-outline-variant'
                }`}
                placeholder="••••••••"
              />
            </div>
            {errors.password && <p className="text-xs text-error font-medium">{errors.password}</p>}
          </div>

          {/* Remember me check */}
          <div className="flex items-center gap-2 py-1 select-none">
            <input
              type="checkbox"
              id="remember"
              className="w-4 h-4 text-primary border-outline-variant rounded focus:ring-primary cursor-pointer"
            />
            <label htmlFor="remember" className="text-xs font-semibold text-on-surface-variant cursor-pointer">
              Remember me
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-white h-12 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/95 transition-all outline-none cursor-pointer btn-hover-effect disabled:opacity-50"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>

        </form>

        {/* Footer signup option */}
        <div className="text-center pt-2">
          <p className="text-xs text-on-surface-variant">
            Don't have an account yet?{' '}
            <Link href="/auth/register" className="font-bold text-secondary hover:underline">
              Create an Account
            </Link>
          </p>
        </div>

        {/* Security Shield */}
        <div className="flex items-center justify-center gap-2 text-outline text-[10px] pt-4 border-t border-outline-variant/20">
          <ShieldCheck className="w-4 h-4 text-secondary" />
          <span>Clinical Portal Encrypted Protection</span>
        </div>

      </div>

    </div>
  );
}
