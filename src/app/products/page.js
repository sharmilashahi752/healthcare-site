'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { 
  Search, 
  ShoppingCart, 
  Check, 
  LayoutGrid, 
  Baby, 
  Leaf, 
  Sparkles, 
  Stethoscope, 
  ShoppingBag, 
  ChevronDown, 
  Star 
} from 'lucide-react';

function ProductsCatalogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Sync URL search params
  const categoryParam = searchParams.get('category') || 'all';

  // Filters State
  const [currentCategory, setCurrentCategory] = useState(categoryParam);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [priceRange, setPriceRange] = useState(10000);
  const [minRating, setMinRating] = useState(0); // 0 = all, 3 = 3+ stars, 4 = 4+ stars
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('popularity'); // popularity, price-low, price-high, rating-high
  const [compareList, setCompareList] = useState([]); // Array of product IDs to compare
  const [addedProductId, setAddedProductId] = useState(null); // Adding visual feedback

  const { addToCart } = useCart();

  useEffect(() => {
    setCurrentCategory(searchParams.get('category') || 'all');
    setSearchQuery(searchParams.get('search') || '');
  }, [searchParams]);

  const categories = [
    { id: 'all', name: 'All Products', icon: LayoutGrid },
    { id: 'infant-formula', name: 'Infant Formulas', icon: Baby },
    { id: 'supplements', name: 'Supplements', icon: Leaf },
    { id: 'cosmeceuticals', name: 'Cosmeceuticals', icon: Sparkles },
    { id: 'surgical', name: 'Surgical Items', icon: Stethoscope },
  ];

  const handleCategoryClick = (id) => {
    setCurrentCategory(id);
    // Update URL query params without full reload
    const params = new URLSearchParams(searchParams);
    if (id === 'all') {
      params.delete('category');
    } else {
      params.set('category', id);
    }
    router.push(`/products?${params.toString()}`);
  };

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    if (!product.inStock) return;
    
    addToCart(product, 1);
    
    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId(null);
    }, 2000);
  };

  const handleCompareToggle = (productId, e) => {
    e.stopPropagation();
    setCompareList((prev) => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // Filter products
  const filteredProducts = products.filter((p) => {
    const matchesCategory = currentCategory === 'all' || p.category === currentCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = p.price <= priceRange;
    const matchesRating = p.rating >= minRating;
    const matchesStock = !inStockOnly || p.inStock;

    return matchesCategory && matchesSearch && matchesPrice && matchesRating && matchesStock;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'popularity') {
      // Sort by rating desc
      return b.rating - a.rating;
    } else if (sortBy === 'price-low') {
      return a.price - b.price;
    } else if (sortBy === 'price-high') {
      return b.price - a.price;
    } else if (sortBy === 'rating-high') {
      return b.rating - a.rating;
    }
    return 0;
  });

  // Helper to determine badge color matching the design
  const getBadgeStyle = (category) => {
    switch (category) {
      case 'infant-formula':
        return 'bg-[#e2f1e8] text-[#006a68]'; // Soft Teal
      case 'supplements':
        return 'bg-[#e0f2fe] text-[#0369a1]'; // Soft Blue
      case 'cosmeceuticals':
        return 'bg-[#f0fdf4] text-[#15803d]'; // Soft Green
      case 'surgical':
        return 'bg-[#fdf2f8] text-[#be185d]'; // Soft Pink/Red
      default:
        return 'bg-surface-container-high text-on-surface-variant';
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="pt-24 pb-16 px-6 md:px-12 max-w-7xl mx-auto w-full flex-grow">
        
        {/* Compare floating badge */}
        {compareList.length > 0 && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#0f4c81] text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-4 animate-fade-up border border-white/10">
            <span className="text-xs font-semibold">{compareList.length} items selected to compare</span>
            <button 
              onClick={() => setCompareList([])}
              className="text-xs underline hover:text-secondary-fixed outline-none cursor-pointer"
            >
              Clear
            </button>
            <Link 
              href="#"
              className="bg-cta-warm text-white px-4 py-1.5 rounded-xl text-xs font-bold hover:brightness-110 btn-hover-effect"
            >
              Compare Now
            </Link>
          </div>
        )}

        {/* Top Header */}
        <header className="mb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <h1 className="font-extrabold text-4xl text-primary leading-tight">Our Products</h1>
            <p className="text-on-surface-variant text-sm md:text-base mt-2">Premium healthcare solutions curated for excellence.</p>
          </div>
          
          {/* Top Actions: Search & Sort */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            {/* Search */}
            <div className="relative w-full sm:w-72 group">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">
                <Search className="w-4 h-4" />
              </span>
              <input
                className="w-full pl-9 pr-4 py-2.5 bg-[#f3f4f6]/80 border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-primary focus:bg-white focus:outline-none text-xs transition-all outline-none"
                placeholder="Search medical supplies..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Sort Dropdown */}
            <div className="relative w-full sm:w-48">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-[#f3f4f6]/80 border border-outline-variant/30 px-4 py-2.5 rounded-xl text-xs font-semibold focus:outline-primary outline-none cursor-pointer appearance-none text-on-surface"
              >
                <option value="popularity">Popularity</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating-high">Highest Rated</option>
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">
                <ChevronDown className="w-4 h-4" />
              </span>
            </div>
          </div>
        </header>

        {/* Sidebar & Grid */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Sidebar Filters */}
          <aside className="w-full lg:w-60 flex-shrink-0 bg-white p-6 rounded-3xl border border-outline-variant/30 shadow-sm space-y-8">
            
            {/* Categories */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-outline uppercase tracking-wider">Categories</h3>
              <div className="flex flex-col gap-1">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = currentCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryClick(cat.id)}
                      className={`w-full px-3.5 py-2.5 rounded-xl text-left text-[13px] font-bold transition-all flex items-center gap-3 cursor-pointer outline-none ${
                        isActive
                          ? 'bg-[#d2e4ff] text-[#001c37]'
                          : 'text-on-surface-variant hover:bg-surface-container-high'
                      }`}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span>{cat.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="h-px bg-outline-variant/20" />

            {/* Price Range */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-outline uppercase tracking-wider">Price Range</h3>
              <div className="space-y-3">
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="100"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#eceef0] rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-xs font-bold text-on-surface-variant">
                  <span>NPR 0</span>
                  <span>Up to NPR {priceRange.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="h-px bg-outline-variant/20" />

            {/* Min Rating */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-outline uppercase tracking-wider">Min. Rating</h3>
              <div className="flex flex-col gap-2.5">
                <label className="flex items-center gap-3 text-xs font-semibold text-on-surface-variant cursor-pointer select-none">
                  <input
                    type="radio"
                    name="min-rating"
                    checked={minRating === 0}
                    onChange={() => setMinRating(0)}
                    className="w-4 h-4 text-primary border-outline-variant focus:ring-primary cursor-pointer"
                  />
                  <span>All Ratings</span>
                </label>
                <label className="flex items-center gap-3 text-xs font-semibold text-on-surface-variant cursor-pointer select-none">
                  <input
                    type="radio"
                    name="min-rating"
                    checked={minRating === 4}
                    onChange={() => setMinRating(4)}
                    className="w-4 h-4 text-primary border-outline-variant focus:ring-primary cursor-pointer"
                  />
                  <span className="flex items-center gap-1">
                    4+ Stars
                    <span className="flex text-amber-500 text-[10px]">
                      ★★★★<span className="text-gray-300">★</span>
                    </span>
                  </span>
                </label>
                <label className="flex items-center gap-3 text-xs font-semibold text-on-surface-variant cursor-pointer select-none">
                  <input
                    type="radio"
                    name="min-rating"
                    checked={minRating === 3}
                    onChange={() => setMinRating(3)}
                    className="w-4 h-4 text-primary border-outline-variant focus:ring-primary cursor-pointer"
                  />
                  <span className="flex items-center gap-1">
                    3+ Stars
                    <span className="flex text-amber-500 text-[10px]">
                      ★★★<span className="text-gray-300">★★</span>
                    </span>
                  </span>
                </label>
              </div>
            </div>

            <div className="h-px bg-outline-variant/20" />

            {/* In Stock Only */}
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-outline uppercase tracking-wider select-none">In Stock Only</h3>
              <button
                onClick={() => setInStockOnly(!inStockOnly)}
                className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 outline-none ${
                  inStockOnly ? 'bg-secondary' : 'bg-surface-container-high'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                    inStockOnly ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

          </aside>

          {/* Right Product Grid */}
          <section className="flex-grow">
            {sortedProducts.length === 0 ? (
              /* Empty State */
              <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-3xl border border-dashed border-outline-variant/60 shadow-sm">
                <ShoppingBag className="text-outline w-16 h-16 mb-4 animate-pulse" />
                <h3 className="font-bold text-xl text-on-surface-variant">No products match filters</h3>
                <p className="text-outline text-sm mt-1">Try relaxing your search, rating, or price bounds.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-up">
                {sortedProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    className="bg-[#f8fafc] border border-outline-variant/20 rounded-2xl overflow-hidden group hover:shadow-[0px_4px_12px_rgba(15,76,129,0.06)] hover:bg-white transition-all duration-350 flex flex-col h-full relative"
                  >
                    
                    {/* Compare Checkbox */}
                    <div className="absolute top-4 left-4 z-20">
                      <label 
                        onClick={(e) => handleCompareToggle(product.id, e)}
                        className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-[10px] font-bold text-on-surface-variant border border-outline-variant/20 shadow-sm cursor-pointer select-none hover:bg-white"
                      >
                        <input
                          type="checkbox"
                          checked={compareList.includes(product.id)}
                          onChange={() => {}} // Controlled manually via label click
                          className="w-3.5 h-3.5 text-primary border-outline-variant rounded focus:ring-primary cursor-pointer"
                        />
                        Compare
                      </label>
                    </div>

                    {/* Image Area */}
                    <div className="relative h-52 bg-white flex items-center justify-center p-6 border-b border-outline-variant/10">
                      <img
                        src={product.image}
                        className="max-h-[160px] max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                        alt={product.name}
                      />
                      
                      {/* Out of Stock blur overlay */}
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] flex items-center justify-center pointer-events-none">
                          <span className="bg-white/90 border border-outline-variant/30 text-on-surface-variant text-[10px] font-extrabold uppercase px-4 py-2 rounded-full tracking-widest shadow-md">
                            OUT OF STOCK
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Card Content details */}
                    <div className="p-5 flex flex-col flex-grow bg-white">
                      
                      {/* Badge row: Benefits left, Star Rating right */}
                      <div className="flex items-center justify-between mb-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold tracking-wider ${getBadgeStyle(product.category)}`}>
                          {product.benefits[0]}
                        </span>
                        <div className="flex items-center gap-1 text-[11px] font-bold text-on-surface-variant">
                          <span className="text-amber-500 font-sans">★</span>
                          <span>{product.rating}</span>
                        </div>
                      </div>

                      {/* Product Name */}
                      <h3 className="font-extrabold text-base text-primary group-hover:text-primary-container leading-snug transition-colors mb-4 line-clamp-2 h-10">
                        {product.name}
                      </h3>

                      {/* Price & Add to Cart action */}
                      <div className="mt-auto pt-4 flex items-center justify-between border-t border-outline-variant/10">
                        <div>
                          <span className="text-[10px] font-bold text-outline uppercase tracking-wider block mb-0.5">Price</span>
                          <span className="font-extrabold text-base text-on-surface">
                            NPR {product.price.toLocaleString()}
                          </span>
                        </div>

                        <button
                          disabled={!product.inStock}
                          onClick={(e) => handleAddToCart(product, e)}
                          className={`w-11 h-11 rounded-full flex items-center justify-center transition-all active:scale-95 outline-none cursor-pointer shadow-sm ${
                            !product.inStock
                              ? 'bg-surface-container-high border border-outline-variant/10 text-on-surface-variant cursor-not-allowed'
                              : addedProductId === product.id
                              ? 'bg-emerald-500 text-white'
                              : 'bg-tertiary-container text-[#ffa190] hover:brightness-110 btn-hover-effect'
                          }`}
                          style={product.inStock && addedProductId !== product.id ? { backgroundColor: '#6b0a01' } : {}}
                        >
                          {addedProductId === product.id ? (
                            <Check className="w-5 h-5" />
                          ) : (
                            <ShoppingCart className="w-5 h-5 text-white" />
                          )}
                        </button>
                      </div>

                    </div>

                  </Link>
                ))}
              </div>
            )}
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function ProductsCatalog() {
  return (
    <Suspense fallback={
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="pt-24 pb-16 px-6 md:px-12 max-w-7xl mx-auto w-full flex-grow flex items-center justify-center">
          <div className="text-center text-outline animate-pulse">Loading catalog...</div>
        </main>
        <Footer />
      </div>
    }>
      <ProductsCatalogContent />
    </Suspense>
  );
}
