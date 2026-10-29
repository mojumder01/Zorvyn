/** Demo catalogue. Prices are in Bangladeshi taka (৳) and are sample values. */
export type Category = 'sneakers' | 'jeans' | 'women' | 'kids';

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  /** Price before the sale, when the product is discounted. */
  oldPrice?: number;
  image: string;
  /** More photos shown in the product details. */
  gallery?: string[];
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
const WOMEN_SIZES = ['S', 'M', 'L', 'XL'];
const KIDS_SIZES = ['2-3Y', '4-5Y', '6-7Y', '8-9Y'];

export interface SizeChart {
  /** Shown above the size buttons, e.g. "Size (EU)". */
  label: string;
  headers: string[];
  rows: string[][];
}

/** Size chart shown in each product's details, per category. */
export const SIZE_CHARTS: Record<Category, SizeChart> = {
  sneakers: {
    label: 'Size (EU)',
    headers: ['EU size', 'Foot length (cm)'],
    rows: [['39', '24.5'], ['40', '25.0'], ['41', '25.5'], ['42', '26.5'], ['43', '27.0'], ['44', '28.0']],
  },
  jeans: {
    label: 'Size (waist, inches)',
    headers: ['Waist size', 'Waist (cm)', 'Hip (cm)'],
    rows: [['30', '76', '94'], ['32', '81', '99'], ['34', '86', '104'], ['36', '91', '109'], ['38', '97', '114']],
  },
  women: {
    label: 'Size',
    headers: ['Size', 'Bust (in)', 'Waist (in)', 'Length (in)'],
    rows: [['S', '34', '28', '44'], ['M', '36', '30', '45'], ['L', '38', '32', '46'], ['XL', '40', '34', '47']],
  },
  kids: {
    label: 'Size (age)',
    headers: ['Age', 'Height (cm)', 'Chest (in)', 'Length (in)'],
    rows: [['2-3Y', '92–98', '21', '22'], ['4-5Y', '104–110', '22.5', '25'], ['6-7Y', '116–122', '24', '28'], ['8-9Y', '128–134', '25.5', '31']],
  },
};

export const CATEGORIES: { id: Category | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'sneakers', label: 'Sneakers' },
  { id: 'jeans', label: 'Jeans' },
  { id: 'women', label: 'Women' },
  { id: 'kids', label: 'Kids' },
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
  {
    id: 'floral-garden-dress',
    name: 'Floral Garden Dress',
    category: 'women',
    price: 2190,
    image: 'products/floral-garden-dress.jpg',
    colour: 'Navy & Black floral',
    sizes: WOMEN_SIZES,
    rating: 4.6,
    reviews: 74,
    badge: 'New',
    description: 'A flowing floral dress with a fitted waist — light and easy for summer days, outings and parties.',
    details: ['Soft breathable crepe', 'Fitted waist, flared skirt', 'Midi length', 'Gentle hand wash'],
  },
  {
    id: 'golden-check-lehenga',
    name: 'Golden Check Lehenga Set',
    category: 'kids',
    price: 2890,
    oldPrice: 3290,
    image: 'products/golden-check-lehenga.jpg',
    gallery: ['products/golden-check-lehenga-model.jpg'],
    colour: 'Leaf Green / Gold',
    sizes: KIDS_SIZES,
    rating: 4.8,
    reviews: 58,
    badge: 'Festive',
    description: 'A festive two-piece set for girls: an embroidered green top and a pleated checked skirt with a golden border.',
    details: ['Sleeveless top with mirror embroidery', 'Pleated checked skirt, gold border', 'Tie-up waist with tassels', 'Soft cotton-silk blend'],
  },
  {
    id: 'princess-satin-gown',
    name: 'Princess Satin Gown',
    category: 'kids',
    price: 4490,
    image: 'products/princess-satin-gown.jpg',
    colour: 'Ice Blue / Peach',
    sizes: KIDS_SIZES,
    rating: 4.7,
    reviews: 31,
    description: 'A fairy-tale satin gown with a peach bodice and a gathered ice-blue skirt — made for weddings, birthdays and photo days.',
    details: ['Satin skirt with ruched gathers', 'Corset-style bodice with soft lining', 'Long flowing train', 'Tiara and umbrella not included'],
  },
];

export const DELIVERY_FEE = { insideDhaka: 70, outsideDhaka: 130 };

const formatter = new Intl.NumberFormat('en-IN');
export const taka = (amount: number) => `৳${formatter.format(amount)}`;
