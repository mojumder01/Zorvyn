import { useEffect, useMemo, useState } from 'react';
import { CircleCheck } from 'lucide-react';
import { useCart } from './cart';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutDialog } from './components/CheckoutDialog';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductDialog } from './components/ProductDialog';
import { CATEGORIES, PRODUCTS, type Category, type Product } from './data/products';

type Sort = 'featured' | 'price-asc' | 'price-desc' | 'rating';

const SORTS: { id: Sort; label: string }[] = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price: low to high' },
  { id: 'price-desc', label: 'Price: high to low' },
  { id: 'rating', label: 'Top rated' },
];

export function App() {
  const cart = useCart();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<Category | 'all'>('all');
  const [sort, setSort] = useState<Sort>('featured');
  const [selected, setSelected] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(''), 2500);
    return () => clearTimeout(timer);
  }, [toast]);

  const visible = useMemo(() => {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    const list = PRODUCTS.filter((p) => {
      if (category !== 'all' && p.category !== category) return false;
      const text = `${p.name} ${p.category} ${p.colour}`.toLowerCase();
      return words.every((w) => text.includes(w));
    });
    if (sort === 'price-asc') return [...list].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') return [...list].sort((a, b) => b.price - a.price);
    if (sort === 'rating') return [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [query, category, sort]);

  const addToCart = (product: Product, size: string, quantity: number) => {
    cart.add(product.id, size, quantity);
    setSelected(null);
    setToast(`${product.name} (size ${size}) added to cart`);
  };

  return (
    <div id="top" className="flex min-h-dvh flex-col">
      <Header
        query={query}
        onQuery={(value) => {
          setQuery(value);
          if (value) document.getElementById('shop')?.scrollIntoView({ block: 'start' });
        }}
        cartCount={cart.count}
        onOpenCart={() => setCartOpen(true)}
      />

      <main className="flex-1">
        <Hero />

        <section id="shop" className="mx-auto max-w-6xl scroll-mt-28 px-4 py-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold">Shop the collection</h2>
              <p className="text-sm text-slate-500" aria-live="polite">
                {visible.length} product{visible.length === 1 ? '' : 's'}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex gap-1 rounded-full bg-slate-200/70 p-1" role="group" aria-label="Category">
                {CATEGORIES.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCategory(c.id)}
                    aria-pressed={category === c.id}
                    className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${category === c.id ? 'bg-white shadow-sm' : 'text-slate-600 hover:text-ink'}`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
              <label className="flex items-center gap-2 text-sm">
                <span className="sr-only sm:not-sr-only sm:text-slate-500">Sort</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as Sort)}
                  className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand"
                >
                  {SORTS.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          {visible.length === 0 ? (
            <div className="mt-10 rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-500">
              <p>No products match “{query}”.</p>
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setCategory('all');
                }}
                className="mt-3 rounded-full bg-ink px-5 py-2 text-sm font-semibold text-white"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
              {visible.map((p) => (
                <ProductCard key={p.id} product={p} onOpen={() => setSelected(p)} />
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-slate-500 sm:flex-row sm:justify-between">
          <p>
            <span className="font-semibold text-ink">Zorvyn</span> — a demo e-commerce store. Products, prices and orders are samples.
          </p>
          <p>
            Built by{' '}
            <a href="https://mojumder01.github.io/muntasir_Portfolio/" className="font-medium text-brand-dark underline-offset-2 hover:underline">
              Md Muntasir Mamun Mojumder
            </a>
          </p>
        </div>
      </footer>

      <ProductDialog product={selected} onClose={() => setSelected(null)} onAdd={addToCart} />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />
      <CheckoutDialog open={checkoutOpen} onClose={() => setCheckoutOpen(false)} cart={cart} />

      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-4">
        {toast && (
          <p className="flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-white shadow-xl">
            <CircleCheck className="size-4 text-emerald-400" aria-hidden /> {toast}
          </p>
        )}
      </div>
    </div>
  );
}
