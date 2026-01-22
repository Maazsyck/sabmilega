
import React, { useState } from 'react';
import { Search, ShoppingCart, User, Menu, ChevronDown } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  onHomeClick: () => void;
  onSearch: (term: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ cartCount, onCartClick, onHomeClick, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <header className="bg-[#2874f0] text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-4 md:gap-8">
        {/* Logo */}
        <div 
          className="flex flex-col items-start cursor-pointer flex-shrink-0"
          onClick={onHomeClick}
        >
          <h1 className="text-xl md:text-2xl font-bold italic leading-tight">SabMilta</h1>
          <span className="text-[10px] md:text-xs italic text-gray-200 flex items-center gap-1">
            Everything for You <span className="text-yellow-400 font-bold">+</span>
          </span>
        </div>

        {/* Search */}
        <form 
          onSubmit={handleSubmit}
          className="flex-grow max-w-2xl flex items-center bg-white rounded-sm overflow-hidden"
        >
          <input
            type="text"
            placeholder="Search for products, brands and more"
            className="w-full px-4 py-2 text-gray-800 outline-none placeholder:text-gray-500 text-sm md:text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="p-2 text-[#2874f0]">
            <Search size={20} />
          </button>
        </form>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 font-medium">
          <button className="flex items-center gap-1 hover:text-gray-100">
            Login
          </button>
          
          <button className="flex items-center gap-1 hover:text-gray-100">
            Become a Seller
          </button>

          <div className="flex items-center gap-1 group cursor-pointer">
            More <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
          </div>

          <button 
            onClick={onCartClick}
            className="flex items-center gap-2 hover:text-gray-100 relative"
          >
            <ShoppingCart size={20} />
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#ff6161] text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center border-2 border-[#2874f0]">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center gap-4">
          <button onClick={onCartClick} className="relative">
             <ShoppingCart size={24} />
             {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#ff6161] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <Menu size={24} />
        </div>
      </div>
    </header>
  );
};
