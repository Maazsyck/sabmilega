
import { Product } from './types';

export const CATEGORIES = [
  { name: 'Mobiles', icon: '📱' },
  { name: 'Fashion', icon: '👕' },
  { name: 'Electronics', icon: '💻' },
  { name: 'Home', icon: '🏠' },
  { name: 'Appliances', icon: '📺' },
  { name: 'Travel', icon: '✈️' },
  { name: 'Toys', icon: '🧸' },
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'NeoStream Pro Max 5G (Blue, 256GB)',
    category: 'Mobiles',
    price: 74999,
    originalPrice: 79999,
    rating: 4.8,
    reviews: 12450,
    image: 'https://picsum.photos/seed/mobile1/400/400',
    description: 'The ultimate flagship experience with advanced AI camera and 120Hz display.',
    brand: 'NeoStream',
    discount: 6
  },
  {
    id: '2',
    name: 'SabMilta Basics - Cotton Slim Fit Shirt',
    category: 'Fashion',
    price: 699,
    originalPrice: 1499,
    rating: 4.2,
    reviews: 3500,
    image: 'https://picsum.photos/seed/shirt1/400/400',
    description: 'Pure cotton slim fit shirt for everyday comfort and style.',
    brand: 'SabMilta Basics',
    discount: 53
  },
  {
    id: '3',
    name: 'UltraBass Wireless Noise Cancelling Headphones',
    category: 'Electronics',
    price: 3499,
    originalPrice: 8999,
    rating: 4.5,
    reviews: 8200,
    image: 'https://picsum.photos/seed/headphone1/400/400',
    description: 'Immersive sound quality with 40-hour battery life and quick charging.',
    brand: 'UltraBass',
    discount: 61
  },
  {
    id: '4',
    name: 'SmartHome Pro - Robotic Vacuum Cleaner',
    category: 'Appliances',
    price: 18999,
    originalPrice: 24999,
    rating: 4.6,
    reviews: 1200,
    image: 'https://picsum.photos/seed/vacuum1/400/400',
    description: 'Advanced LiDAR navigation and powerful suction for a spotless home.',
    brand: 'SmartHome',
    discount: 24
  },
  {
    id: '5',
    name: 'EcoComfort Ergo Office Chair',
    category: 'Home',
    price: 5499,
    originalPrice: 9999,
    rating: 4.4,
    reviews: 2100,
    image: 'https://picsum.photos/seed/chair1/400/400',
    description: 'Breathable mesh back with adjustable lumbar support for long working hours.',
    brand: 'EcoComfort',
    discount: 45
  },
  {
    id: '6',
    name: 'Zenith OLED Smart TV 55"',
    category: 'Appliances',
    price: 42999,
    originalPrice: 59999,
    rating: 4.7,
    reviews: 890,
    image: 'https://picsum.photos/seed/tv1/400/400',
    description: 'Stunning OLED display with Dolby Vision and Atmos for a cinematic experience.',
    brand: 'Zenith',
    discount: 28
  },
  {
    id: '7',
    name: 'UrbanStride Running Shoes - Volt Edition',
    category: 'Fashion',
    price: 1299,
    originalPrice: 2999,
    rating: 4.3,
    reviews: 4500,
    image: 'https://picsum.photos/seed/shoes1/400/400',
    description: 'Lightweight foam cushioning and breathable knit upper for peak performance.',
    brand: 'UrbanStride',
    discount: 56
  },
  {
    id: '8',
    name: 'PowerLink 20000mAh Power Bank',
    category: 'Electronics',
    price: 1499,
    originalPrice: 2499,
    rating: 4.5,
    reviews: 15400,
    image: 'https://picsum.photos/seed/powerbank1/400/400',
    description: 'Triple output fast charging for all your mobile devices.',
    brand: 'PowerLink',
    discount: 40
  }
];
