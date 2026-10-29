/** Shopping cart kept in this browser (localStorage). */
import { useEffect, useState } from 'react';
import { PRODUCTS, type Product } from './data/products';

export interface CartLine {
  productId: string;
  size: string;
  quantity: number;
}

const STORAGE_KEY = 'zorvyn.cart';
export const MAX_QUANTITY = 10;

function loadCart(): CartLine[] {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    if (!Array.isArray(saved)) return [];
    // Keep only lines that still match a product and size in the catalogue
    return saved.filter(
      (line): line is CartLine =>
        typeof line?.productId === 'string' &&
        typeof line?.size === 'string' &&
        Number.isInteger(line?.quantity) &&
        line.quantity > 0 &&
        line.quantity <= MAX_QUANTITY &&
        !!PRODUCTS.find((p) => p.id === line.productId)?.sizes.includes(line.size),
    );
  } catch {
    return [];
  }
}

export function findProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function useCart() {
  const [lines, setLines] = useState<CartLine[]>(loadCart);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // Private mode or storage full: the cart still works for this visit
    }
  }, [lines]);

  const add = (productId: string, size: string, quantity: number) =>
    setLines((current) => {
      const existing = current.find((l) => l.productId === productId && l.size === size);
      if (!existing) return [...current, { productId, size, quantity }];
      return current.map((l) =>
        l === existing ? { ...l, quantity: Math.min(MAX_QUANTITY, l.quantity + quantity) } : l,
      );
    });

  const setQuantity = (productId: string, size: string, quantity: number) =>
    setLines((current) =>
      quantity <= 0
        ? current.filter((l) => !(l.productId === productId && l.size === size))
        : current.map((l) =>
            l.productId === productId && l.size === size ? { ...l, quantity: Math.min(MAX_QUANTITY, quantity) } : l,
          ),
    );

  const clear = () => setLines([]);

  const count = lines.reduce((sum, l) => sum + l.quantity, 0);
  const subtotal = lines.reduce((sum, l) => sum + (findProduct(l.productId)?.price ?? 0) * l.quantity, 0);

  return { lines, add, setQuantity, clear, count, subtotal };
}

export type Cart = ReturnType<typeof useCart>;
