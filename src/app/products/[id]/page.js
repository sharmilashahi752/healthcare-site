'use client';

import React, { use, useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useCart } from '../../context/CartContext';
import { 
  ChevronLeft, 
  Star, 
  ShoppingCart, 
  Heart, 
  ShieldCheck, 
  Truck, 
  Award, 
  FlaskConical, 
  Microscope, 
  HeartHandshake, 
  Check, 
  Layers, 
  Droplet, 
  RefreshCw 
} from 'lucide-react';

export default function ProductDetails({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const productId = params.id;

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specs'); // specs, safety, references
  const [isAdded, setIsAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({ transformOrigin: 'center' });
  const [isZooming, setIsZooming] = useState(false);

  const { addToCart } = useCart();

  useEffect(() => {
    async function loadProduct() {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/products/${productId}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Network error');
      } finally {
        setIsLoading(false);
      }
    }
    loadProduct();
  }, [productId]);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
    });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-[#f7f9fb]">
        <Navbar />
        <main className="flex-grow flex flex-col items-center justify-center pt-24 pb-16">
          <div className="w-10 h-10 border-4 border-[#0f4c81] border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-on-surface-variant font-medium text-sm">Retrieving product certifications and specifications...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex flex-col min-h-screen bg-[#f7f9fb]">
        <Navbar />
        <main className="flex-grow flex flex-col items-center justify-center pt-24 pb-16">
          <h2 className="text-2xl font-bold text-primary">{error || 'Product Not Found'}</h2>
          <Link href="/products" className="text-secondary hover:underline mt-4 flex items-center gap-2">
            <ChevronLeft className="w-5 h-5" /> Back to Products
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!product.inStock) return;
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  // Helper to map icon components based on string
  const getDetailBadgeIcon = (iconName) => {
    switch (iconName) {
      case 'droplet': return <Droplet className="w-4 h-4 text-[#006a68]" />;
      case 'shield': return <ShieldCheck className="w-4 h-4 text-[#006a68]" />;
      case 'refresh': return <RefreshCw className="w-4 h-4 text-[#006a68]" />;
      case 'brain': return <Layers className="w-4 h-4 text-[#006a68]" />;
      case 'heart': return <Heart className="w-4 h-4 text-[#006a68]" />;
      case 'activity': return <ShieldCheck className="w-4 h-4 text-[#006a68]" />;
      case 'users': return <ShieldCheck className="w-4 h-4 text-[#006a68]" />;
      case 'award': return <Award className="w-4 h-4 text-[#006a68]" />;
      default: return <ShieldCheck className="w-4 h-4 text-[#006a68]" />;
    }
  };

  // Determine top-left overlapping badge text
  const getCategoryBadgeText = (cat) => {
    switch (cat) {
      case 'infant-formula': return '✓ ORGANIC QUALITY';
      case 'cosmeceuticals': return '✓ CLINICAL GRADE';
      case 'surgical': return '✓ STERILE MEDICAL';
      default: return '✓ PREMIUM STANDARD';
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f7f9fb]">
      <Navbar />

      <main className="pt-24 pb-16 px-6 md:px-12 max-w-7xl mx-auto w-full flex-grow">
        
        {/* Top Product details block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-12">
          
          {/* Left Column: Image wrapper with overlapping badge */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div 
              className="relative bg-white rounded-3xl p-8 border border-outline-variant/30 shadow-sm flex items-center justify-center h-[350px] md:h-[450px] overflow-hidden cursor-zoom-in"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsZooming(true)}
              onMouseLeave={() => {
                setIsZooming(false);
                setZoomStyle({ transformOrigin: 'center' });
              }}
            >
              <img 
                src={product.image} 
                className="max-h-full max-w-full object-contain transition-transform duration-100 ease-out" 
                style={{
                  transform: isZooming ? 'scale(2)' : 'scale(1)',
                  transformOrigin: zoomStyle.transformOrigin,
                }}
                alt={product.name} 
              />
              
              {/* Teal Overlapping Badge at bottom right of image box */}
              <div className="absolute bottom-4 right-4 bg-[#e2f1e8]/90 backdrop-blur-sm text-[#006a68] border border-[#006a68]/10 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm z-10">
                <span className="w-4 h-4 bg-[#006a68] rounded-full flex items-center justify-center text-white text-[9px] font-sans">✓</span>
                <span>{getCategoryBadgeText(product.category)}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Title, ratings, price, badges, action buttons */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Stars Review Count */}
            <div className="flex items-center gap-1.5 text-xs text-on-surface-variant font-medium">
              <div className="flex text-[#006a68]">
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
              </div>
              <span className="font-bold text-on-surface">5.0</span>
              <span className="text-outline">({product.ratingCount || '120+ reviews'})</span>
            </div>

            {/* Title & Suffix */}
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight leading-tight">
                {product.name} {product.category === 'cosmeceuticals' && '- Clinical Grade'}
              </h1>
              <p className="text-on-surface-variant text-sm md:text-base mt-3 font-light leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Pricing Section */}
            <div className="flex items-baseline gap-4">
              <span className="text-3xl font-extrabold text-primary">NPR {product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-sm text-outline line-through">NPR {product.originalPrice.toLocaleString()}</span>
              )}
            </div>

            {/* Benefit Badges */}
            <div className="flex flex-wrap gap-2.5">
              {product.detailBadges?.map((badge, idx) => (
                <div 
                  key={idx} 
                  className="bg-[#e2f1e8] text-[#006a68] px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 border border-[#006a68]/5"
                >
                  {getDetailBadgeIcon(badge.icon)}
                  <span>{badge.text}</span>
                </div>
              ))}
            </div>

            {/* Quantity and Actions buttons side by side */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              
              {/* Quantity Adjuster */}
              <div className="flex items-center border border-outline-variant/60 rounded-xl bg-white h-12 w-28 justify-between px-2 flex-shrink-0">
                <button
                  disabled={quantity <= 1 || !product.inStock}
                  onClick={() => setQuantity((q) => q - 1)}
                  className="p-1 text-on-surface-variant hover:text-primary disabled:opacity-30 cursor-pointer outline-none"
                >
                  -
                </button>
                <span className="font-bold text-sm text-on-surface">{quantity}</span>
                <button
                  disabled={!product.inStock}
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-1 text-on-surface-variant hover:text-primary disabled:opacity-30 cursor-pointer outline-none"
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                disabled={!product.inStock}
                onClick={handleAddToCart}
                className={`flex-grow h-12 px-8 rounded-xl text-white font-bold flex items-center justify-center gap-2 transition-all active:scale-95 outline-none cursor-pointer w-full sm:w-auto bg-primary hover:bg-primary/95 shadow-md`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" /> Added Successfully
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4 fill-white text-primary" /> Add to Cart
                  </>
                )}
              </button>

              {/* Save to Wishlist */}
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`h-12 px-6 rounded-xl border font-bold flex items-center justify-center gap-2 transition-all active:scale-95 outline-none cursor-pointer w-full sm:w-auto ${
                  isWishlisted 
                    ? 'bg-rose-50 border-rose-200 text-rose-500' 
                    : 'bg-white border-outline-variant/60 text-on-surface hover:bg-surface-container-low'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-outline-variant'}`} />
                <span>Save to Wishlist</span>
              </button>

            </div>

            {/* Logistics Info Tags */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2 text-xs text-on-surface-variant font-medium">
              <div className="flex items-center gap-1.5">
                <span className="text-secondary font-bold">🚚</span>
                <span>Express delivery available</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-secondary font-bold">🛡</span>
                <span>Quality guarantee check passed</span>
              </div>
            </div>

          </div>

        </div>

        {/* Middle Section: Specs/Safety Tabs (Left) + How to Use (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Left Block: Tab Content Box & Beaker Banner */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Tabs container card */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-outline-variant/30 shadow-sm space-y-8">
              
              {/* Tabs buttons */}
              <div className="flex border-b border-outline-variant/30 gap-6 md:gap-8 overflow-x-auto no-scrollbar">
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-3 text-sm font-bold transition-all relative cursor-pointer outline-none whitespace-nowrap ${
                    activeTab === 'specs' ? 'text-primary' : 'text-outline hover:text-on-surface-variant'
                  }`}
                >
                  Clinical Specifications
                  {activeTab === 'specs' && <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#0f4c81] rounded-full" />}
                </button>
                <button
                  onClick={() => setActiveTab('safety')}
                  className={`pb-3 text-sm font-bold transition-all relative cursor-pointer outline-none whitespace-nowrap ${
                    activeTab === 'safety' ? 'text-primary' : 'text-outline hover:text-on-surface-variant'
                  }`}
                >
                  Safety Protocols
                  {activeTab === 'safety' && <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#0f4c81] rounded-full" />}
                </button>
                <button
                  onClick={() => setActiveTab('references')}
                  className={`pb-3 text-sm font-bold transition-all relative cursor-pointer outline-none whitespace-nowrap ${
                    activeTab === 'references' ? 'text-primary' : 'text-outline hover:text-on-surface-variant'
                  }`}
                >
                  Study References
                  {activeTab === 'references' && <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#0f4c81] rounded-full" />}
                </button>
              </div>

              {/* Tab Display Panel */}
              <div className="min-h-[160px]">
                {activeTab === 'specs' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Core Ingredients List */}
                    <div className="space-y-4">
                      <h4 className="font-bold text-sm text-[#0f4c81] tracking-wide border-b border-outline-variant/10 pb-2">Core Composition</h4>
                      <table className="w-full text-xs">
                        <tbody>
                          {product.tabs.specs.map((spec, i) => (
                            <tr key={i} className="border-b border-outline-variant/10">
                              <td className="py-2.5 text-on-surface-variant font-medium">{spec.label}</td>
                              <td className="py-2.5 text-right font-bold text-on-surface">{spec.value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Clinical Trial results progress bars */}
                    <div className="space-y-4">
                      <h4 className="font-bold text-sm text-[#0f4c81] tracking-wide border-b border-outline-variant/10 pb-2">Clinical Trial Results</h4>
                      <div className="space-y-4 pt-1">
                        {product.tabs.results.map((result, i) => (
                          <div key={i} className="space-y-2">
                            <div className="flex justify-between text-xs font-bold text-on-surface-variant">
                              <span>{result.label}</span>
                              <span className="text-[#006a68]">{result.value}</span>
                            </div>
                            <div className="w-full bg-[#eceef0] h-2 rounded-full overflow-hidden">
                              <div 
                                className="bg-[#006a68] h-full rounded-full transition-all duration-1000"
                                style={{ width: `${result.progress}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                      <p className="text-[10px] text-outline pt-2 leading-relaxed italic">
                        {product.tabs.references}
                      </p>
                    </div>

                  </div>
                )}

                {activeTab === 'safety' && (
                  <div className="text-sm text-on-surface-variant leading-relaxed font-light space-y-3">
                    <p>✓ Dermatologist tested and certified for hyper-sensitive epidermal cells.</p>
                    <p>✓ Formulated with zero added parabens, synthetic scents, or drying alcohol bases.</p>
                    <p>✓ Non-comedogenic assessment score: 0 (will not block skin pores).</p>
                    <p>✓ pH value balanced at 5.5 to match natural skin protective barrier acidity levels.</p>
                  </div>
                )}

                {activeTab === 'references' && (
                  <div className="text-sm text-on-surface-variant leading-relaxed font-light">
                    <p className="font-semibold text-primary mb-2">Scientific Literature Citations:</p>
                    <p className="italic mb-3">"{product.tabs.references}"</p>
                    <p>Additional literature supports that combining the core ingredients increases moisture transport efficiency across cell membranes via active aquaporin channels.</p>
                  </div>
                )}
              </div>

            </div>

            {/* Beaker Flask Scientific Precision Banner */}
            <div className="bg-[#0f4c81] text-white rounded-3xl p-6 md:p-8 flex items-center gap-6 shadow-sm">
              <div className="bg-white/10 p-4 rounded-2xl flex-shrink-0">
                <FlaskConical className="w-8 h-8 text-white" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-bold text-lg">{product.precisionTitle || 'Scientific Precision'}</h3>
                <p className="text-on-primary-container text-xs md:text-sm leading-relaxed font-light">
                  {product.precisionText}
                </p>
              </div>
            </div>

          </div>

          {/* Right Block: How to Use Sidebar */}
          <div className="lg:col-span-4 bg-white p-6 md:p-8 rounded-3xl border border-outline-variant/30 shadow-sm space-y-6">
            <h3 className="font-bold text-sm text-outline uppercase tracking-wider">How to Use</h3>
            
            <div className="space-y-6">
              {product.howToUse.map((step, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  {/* Step counter dark circle */}
                  <span className="w-7 h-7 bg-[#006a68] text-white text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0">
                    {step.step}
                  </span>
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm text-primary">{step.title}</h4>
                    <p className="text-on-surface-variant text-xs leading-relaxed font-light">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* Commitment to Excellence Cards */}
        <section className="border-t border-outline-variant/30 pt-16 space-y-12">
          <h2 className="text-center font-bold text-2xl md:text-3xl text-primary">Our Commitment to Excellence</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white p-6 rounded-2xl border border-outline-variant/20 shadow-sm text-center space-y-4">
              <div className="w-12 h-12 bg-[#e2f1e8] text-[#006a68] rounded-full flex items-center justify-center mx-auto">
                <FlaskConical className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-primary">Sterile Processing</h3>
              <p className="text-on-surface-variant text-xs leading-relaxed font-light">
                Class 100 cleanroom manufacturing protocols ensuring zero contamination.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 rounded-2xl border border-outline-variant/20 shadow-sm text-center space-y-4">
              <div className="w-12 h-12 bg-[#e2f1e8] text-[#006a68] rounded-full flex items-center justify-center mx-auto">
                <Microscope className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-primary">Laboratory Tested</h3>
              <p className="text-on-surface-variant text-xs leading-relaxed font-light">
                Third-party dermatological testing for sensitive skin compatibility.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 rounded-2xl border border-outline-variant/20 shadow-sm text-center space-y-4">
              <div className="w-12 h-12 bg-[#e2f1e8] text-[#006a68] rounded-full flex items-center justify-center mx-auto">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-primary">Sustainably Sourced</h3>
              <p className="text-on-surface-variant text-xs leading-relaxed font-light">
                Ethically harvested ingredients with 100% recyclable packaging.
              </p>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
