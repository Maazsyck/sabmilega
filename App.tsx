
import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { CategoryBar } from './components/CategoryBar';
import { ProductCard } from './components/ProductCard';
import { AIAssistant } from './components/AIAssistant';
import { Cart } from './components/Cart';
import { PRODUCTS } from './constants';
import { Product, CartItem, View } from './types';
import { ChevronRight, ArrowLeft, Star, ShieldCheck, Truck, RefreshCcw } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return PRODUCTS;
    return PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView(View.PRODUCT_DETAIL);
    window.scrollTo(0, 0);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentView(View.HOME);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header 
        cartCount={cartItems.length} 
        onCartClick={() => setIsCartOpen(true)}
        onHomeClick={() => {
          setCurrentView(View.HOME);
          setSearchTerm('');
        }}
        onSearch={handleSearch}
      />

      {currentView === View.HOME && <CategoryBar />}

      <main className="flex-grow bg-gray-100 pb-20">
        <div className="max-w-7xl mx-auto px-4 pt-6">
          
          {/* Breadcrumbs / Back button */}
          {currentView === View.PRODUCT_DETAIL && (
            <button 
              onClick={() => setCurrentView(View.HOME)}
              className="flex items-center gap-2 text-[#2874f0] font-medium mb-6 hover:underline"
            >
              <ArrowLeft size={20} /> Back to Results
            </button>
          )}

          {currentView === View.HOME && (
            <>
              {/* Hero Banner Mockup */}
              <div className="w-full h-32 md:h-64 bg-[#2874f0] rounded-sm mb-8 relative overflow-hidden flex items-center justify-between px-10">
                <div className="text-white z-10 animate-in fade-in slide-in-from-left duration-1000">
                  <h2 className="text-2xl md:text-5xl font-black mb-2 italic">BIG BILLION DEALS</h2>
                  <p className="text-sm md:text-xl font-medium text-blue-100">Upto 80% Off on Electronics & More</p>
                  <button className="mt-4 bg-white text-[#2874f0] px-6 py-2 rounded-sm font-bold shadow-lg hover:shadow-xl transition-all">
                    SHOP NOW
                  </button>
                </div>
                <div className="absolute right-0 top-0 h-full w-1/2 opacity-20 pointer-events-none">
                   <div className="w-full h-full bg-gradient-to-l from-white to-transparent" />
                </div>
              </div>

              {/* Product Grid */}
              <div className="mb-10">
                <div className="flex items-center justify-between mb-4 bg-white p-4 border-b">
                  <h2 className="text-xl font-bold text-gray-800">
                    {searchTerm ? `Search Results for "${searchTerm}"` : 'Top Deals for You'}
                  </h2>
                  <button className="bg-[#2874f0] text-white px-4 py-1.5 rounded-sm text-sm font-bold shadow-md">VIEW ALL</button>
                </div>
                
                {filteredProducts.length === 0 ? (
                  <div className="bg-white p-20 text-center rounded-sm shadow-sm">
                    <p className="text-gray-500 text-lg">No products found matching your search.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {filteredProducts.map(p => (
                      <ProductCard key={p.id} product={p} onClick={handleProductClick} />
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          {currentView === View.PRODUCT_DETAIL && selectedProduct && (
            <div className="bg-white p-4 md:p-8 rounded-sm shadow-sm grid grid-cols-1 md:grid-cols-12 gap-10">
              {/* Left Column: Image */}
              <div className="md:col-span-5 space-y-4">
                <div className="border p-4 rounded-sm flex items-center justify-center aspect-square overflow-hidden group">
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name} 
                    className="max-h-full object-contain cursor-zoom-in hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => addToCart(selectedProduct)}
                    className="bg-[#ff9f00] hover:bg-[#e68f00] text-white py-4 font-bold rounded-sm shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    ADD TO CART
                  </button>
                  <button className="bg-[#fb641b] hover:bg-[#e65a18] text-white py-4 font-bold rounded-sm shadow-lg transition-all active:scale-95">
                    BUY NOW
                  </button>
                </div>
              </div>

              {/* Right Column: Info */}
              <div className="md:col-span-7 flex flex-col">
                <p className="text-gray-500 text-sm mb-1">{selectedProduct.brand}</p>
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">{selectedProduct.name}</h1>
                
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1">
                    {selectedProduct.rating} <Star size={12} fill="currentColor" />
                  </div>
                  <span className="text-gray-500 font-medium text-sm">
                    {selectedProduct.reviews.toLocaleString()} Ratings & {Math.floor(selectedProduct.reviews * 0.1).toLocaleString()} Reviews
                  </span>
                </div>

                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-3xl font-bold">₹{selectedProduct.price.toLocaleString()}</span>
                  <span className="text-gray-500 line-through text-lg">₹{selectedProduct.originalPrice.toLocaleString()}</span>
                  <span className="text-green-600 font-bold text-lg">{selectedProduct.discount}% off</span>
                </div>

                {/* Offers Section */}
                <div className="mb-6 space-y-2">
                  <h3 className="font-bold text-sm mb-2">Available Offers</h3>
                  <div className="flex items-start gap-2 text-sm">
                    <span className="text-green-600 font-bold">🏷️ Bank Offer</span>
                    <span>10% off on ICICI Bank Credit Cards, up to ₹1250. On orders of ₹5000 and above</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <span className="text-green-600 font-bold">🏷️ Partner Offer</span>
                    <span>Sign up for SabMilta Pay Later and get SabMilta Gift Card worth up to ₹500*</span>
                  </div>
                </div>

                <div className="border-t pt-6 mb-6">
                  <h3 className="font-bold text-gray-800 mb-2">Product Description</h3>
                  <p className="text-gray-600 leading-relaxed">{selectedProduct.description}</p>
                </div>

                {/* Features Badges */}
                <div className="grid grid-cols-3 gap-4 py-6 border-y">
                  <div className="flex flex-col items-center text-center gap-2 group">
                    <div className="bg-blue-50 p-3 rounded-full text-[#2874f0] group-hover:scale-110 transition-transform">
                      <Truck size={24} />
                    </div>
                    <span className="text-[10px] md:text-xs font-bold text-gray-500">FREE SHIPPING</span>
                  </div>
                  <div className="flex flex-col items-center text-center gap-2 group">
                    <div className="bg-blue-50 p-3 rounded-full text-[#2874f0] group-hover:scale-110 transition-transform">
                      <RefreshCcw size={24} />
                    </div>
                    <span className="text-[10px] md:text-xs font-bold text-gray-500">7 DAYS RETURN</span>
                  </div>
                  <div className="flex flex-col items-center text-center gap-2 group">
                    <div className="bg-blue-50 p-3 rounded-full text-[#2874f0] group-hover:scale-110 transition-transform">
                      <ShieldCheck size={24} />
                    </div>
                    <span className="text-[10px] md:text-xs font-bold text-gray-500">1 YEAR WARRANTY</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-[#172337] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 text-xs font-medium">
          <div className="space-y-3">
            <h4 className="text-gray-400 font-bold uppercase tracking-wider mb-2">ABOUT</h4>
            <p className="hover:underline cursor-pointer">Contact Us</p>
            <p className="hover:underline cursor-pointer">About Us</p>
            <p className="hover:underline cursor-pointer">Careers</p>
            <p className="hover:underline cursor-pointer">SabMilta Stories</p>
          </div>
          <div className="space-y-3">
            <h4 className="text-gray-400 font-bold uppercase tracking-wider mb-2">HELP</h4>
            <p className="hover:underline cursor-pointer">Payments</p>
            <p className="hover:underline cursor-pointer">Shipping</p>
            <p className="hover:underline cursor-pointer">Cancellation & Returns</p>
            <p className="hover:underline cursor-pointer">FAQ</p>
          </div>
          <div className="space-y-3">
            <h4 className="text-gray-400 font-bold uppercase tracking-wider mb-2">POLICY</h4>
            <p className="hover:underline cursor-pointer">Return Policy</p>
            <p className="hover:underline cursor-pointer">Terms Of Use</p>
            <p className="hover:underline cursor-pointer">Security</p>
            <p className="hover:underline cursor-pointer">Privacy</p>
          </div>
          <div className="space-y-3">
            <h4 className="text-gray-400 font-bold uppercase tracking-wider mb-2">SOCIAL</h4>
            <p className="hover:underline cursor-pointer">Facebook</p>
            <p className="hover:underline cursor-pointer">Twitter</p>
            <p className="hover:underline cursor-pointer">YouTube</p>
          </div>
          <div className="lg:col-span-2 border-l border-gray-700 pl-8 hidden lg:block">
            <h4 className="text-gray-400 font-bold uppercase tracking-wider mb-2">Registered Office Address:</h4>
            <p className="text-gray-300 leading-relaxed italic">
              SabMilta Internet Private Limited,<br />
              Buildings Alyssa, Begonia & Clove Embassy Tech Village,<br />
              Outer Ring Road, Devarabeesanahalli Village,<br />
              Bengaluru, 560103, Karnataka, India
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2024-2025 SabMilta.com</p>
          <div className="flex items-center gap-4 text-gray-400">
            <span className="flex items-center gap-1"><ShieldCheck size={14} /> 100% Genuine Products</span>
            <span className="flex items-center gap-1"><RefreshCcw size={14} /> Easy Returns</span>
          </div>
        </div>
      </footer>

      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemove={removeFromCart}
      />

      <AIAssistant />
    </div>
  );
};

export default App;
