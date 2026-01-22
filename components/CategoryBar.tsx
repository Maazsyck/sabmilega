
import React from 'react';
import { CATEGORIES } from '../constants';

export const CategoryBar: React.FC = () => {
  return (
    <div className="bg-white border-b shadow-sm overflow-x-auto scrollbar-hide">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-6 md:gap-10">
        {CATEGORIES.map((cat) => (
          <button 
            key={cat.name} 
            className="flex flex-col items-center gap-1 min-w-fit group"
          >
            <span className="text-2xl md:text-3xl grayscale group-hover:grayscale-0 transition-all">
              {cat.icon}
            </span>
            <span className="text-xs md:text-sm font-medium text-gray-600 group-hover:text-[#2874f0]">
              {cat.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
