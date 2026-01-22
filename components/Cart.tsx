
import React from 'react';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

export const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemove }) => {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalOriginal = items.reduce((acc, item) => acc + item.originalPrice * item.quantity, 0);
  const totalDiscount = totalOriginal - subtotal;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="relative w-full max-w-md bg-gray-100 h-full flex flex-col shadow-2xl animate-slide-in">
        <div className="bg-white p-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <ShoppingBag className="text-[#2874f0]" /> My Cart ({items.length})
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={24} />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
              <div className="bg-white p-8 rounded-full shadow-inner">
                <ShoppingBag size={80} strokeWidth={1} />
              </div>
              <p className="text-lg font-medium">Your cart is empty!</p>
              <button 
                onClick={onClose}
                className="bg-[#2874f0] text-white px-8 py-2 rounded-sm font-medium shadow-lg hover:shadow-xl active:scale-95 transition-all"
              >
                Shop Now
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-sm shadow-sm flex gap-4">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-contain" />
                <div className="flex-grow">
                  <h3 className="text-sm font-medium line-clamp-1">{item.name}</h3>
                  <p className="text-xs text-gray-500 mb-2">Brand: {item.brand}</p>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-bold">₹{item.price.toLocaleString()}</span>
                    <span className="text-xs text-gray-400 line-through">₹{item.originalPrice.toLocaleString()}</span>
                    <span className="text-xs text-green-600 font-bold">{item.discount}% Off</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center border rounded-sm">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="p-1 hover:bg-gray-50 border-r"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-4 py-1 text-sm font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="p-1 hover:bg-gray-50 border-l"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <button 
                      onClick={() => onRemove(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="bg-white p-6 border-t shadow-2xl">
            <h3 className="text-lg font-bold text-gray-400 border-b pb-4 mb-4 uppercase tracking-widest text-xs">Price Details</h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-700">
                <span>Price ({items.length} items)</span>
                <span>₹{totalOriginal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>- ₹{totalDiscount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Delivery Charges</span>
                <span className="text-green-600">FREE</span>
              </div>
              <div className="flex justify-between font-bold text-xl border-t border-dashed pt-4">
                <span>Total Amount</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <p className="text-green-600 text-sm font-medium">You will save ₹{totalDiscount.toLocaleString()} on this order</p>
            </div>
            <button className="w-full bg-[#fb641b] hover:bg-[#e65a18] text-white py-4 font-bold rounded-sm shadow-lg transition-colors flex items-center justify-center gap-2">
               PLACE ORDER
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
