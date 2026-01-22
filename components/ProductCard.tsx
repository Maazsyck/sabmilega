
import React from 'react';
import { Star, Heart } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div 
      className="bg-white p-4 rounded-sm border border-transparent hover:border-gray-200 hover:shadow-xl transition-all cursor-pointer group flex flex-col relative"
      onClick={() => onClick(product)}
    >
      <button className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors z-10">
        <Heart size={20} />
      </button>

      <div className="w-full h-48 mb-4 overflow-hidden flex items-center justify-center">
        <img 
          src={product.image} 
          alt={product.name} 
          className="max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="flex-grow">
        <h3 className="text-sm font-medium text-gray-900 group-hover:text-[#2874f0] line-clamp-2 mb-1">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-green-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
            {product.rating} <Star size={10} fill="currentColor" />
          </div>
          <span className="text-gray-500 text-xs font-medium">({product.reviews.toLocaleString()})</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
          <span className="text-gray-500 text-sm line-through">₹{product.originalPrice.toLocaleString()}</span>
          <span className="text-green-600 text-xs font-bold">{product.discount}% off</span>
        </div>
      </div>

      <div className="mt-3 py-2 border-t border-gray-50 opacity-0 group-hover:opacity-100 transition-opacity">
        <p className="text-[10px] text-gray-500 font-medium">FREE delivery</p>
      </div>
    </div>
  );
};
