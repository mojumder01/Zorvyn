/** Demo catalogue. Prices are in Bangladeshi taka (৳) and are sample values. */
export type Category = 'sneakers' | 'jeans';

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  /** Price before the sale, when the product is discounted. */
  oldPrice?: number;
  image: string;
  colour: string;
  sizes: string[];
  rating: number;
  reviews: number;
  badge?: string;
  description: string;
  details: string[];
}

const SHOE_SIZES = ['39', '40', '41', '42', '43', '44'];
const JEAN_SIZES = ['30', '32', '34', '36', '38'];

export const CATEGORIES: { id: Category | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'sneakers', label: 'Sneakers' },
  { id: 'jeans', label: 'Jeans' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'glide-knit-runner',
    name: 'Glide Knit Runner',
    category: 'sneakers',
    price: 3490,
    oldPrice: 4290,
    image: 'products/glide-knit-runner.jpg',
    colour: 'Black / Grey',
    sizes: SHOE_SIZES,
    rating: 4.7,
    reviews: 128,
    badge: 'Sale',
    description: 'A light, breathable knit runner with a cushioned sole for all-day city walking.',
    details: ['Breathable knit upper', 'Cushioned foam midsole', 'Rubber grip outsole', 'Weight: about 260 g'],
  },
  {
    id: 'aero-mesh-trainer',
    name: 'Aero Mesh Trainer',
    category: 'sneakers',
    price: 3190,
    image: 'products/aero-mesh-trainer.jpg',
    colour: 'Light Grey / Red',
    sizes: SHOE_SIZES,
    rating: 4.5,
    reviews: 86,
    badge: 'New',
    description: 'A mesh trainer with a supportive heel and a bold red accent — made for the gym and the street.',
    details: ['Airy mesh upper', 'Padded heel collar', 'Flexible sole grooves', 'Lace-up fit'],
  },
  {
    id: 'wave-street-runner',
    name: 'Wave Street Runner',
    category: 'sneakers',
    price: 2990,
    image: 'products/wave-street-runner.jpg',
    colour: 'Grey / Navy',
    sizes: SHOE_SIZES,
    rating: 4.4,
    reviews: 64,
    description: 'An everyday runner with a wave-pattern sole that stays comfortable from morning to night.',
    details: ['Textile and synthetic upper', 'Shock-absorbing sole', 'Removable insole', 'Easy to clean'],
  },
  {
    id: 'classic-straight-jeans',
    name: 'Classic Straight Jeans',
    category: 'jeans',
    price: 2450,
    image: 'products/classic-straight-jeans.jpg',
    colour: 'Light Wash',
    sizes: JEAN_SIZES,
    rating: 4.6,
    reviews: 152,
    badge: 'Best seller',
    description: 'A timeless straight-leg jean in a soft light wash, cut from comfortable stretch cotton.',
    details: ['98% cotton, 2% elastane', 'Straight leg, mid rise', 'Five-pocket styling', 'Machine washable'],
  },
  {
    id: 'tapered-indigo-jeans',
    name: 'Tapered Indigo Jeans',
    category: 'jeans',
    price: 2650,
    image: 'products/tapered-indigo-jeans.jpg',
    colour: 'Dark Indigo',
    sizes: JEAN_SIZES,
    rating: 4.5,
    reviews: 97,
    description: 'A sharp tapered jean in deep indigo — smart enough for the office, relaxed enough for the weekend.',
    details: ['99% cotton, 1% elastane', 'Tapered leg, regular rise', 'Deep indigo dye', 'Machine washable'],
  },
];

export const DELIVERY_FEE = { insideDhaka: 70, outsideDhaka: 130 };

const formatter = new Intl.NumberFormat('en-IN');
export const taka = (amount: number) => `৳${formatter.format(amount)}`;
