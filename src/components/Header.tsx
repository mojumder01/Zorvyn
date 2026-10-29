import { Search, ShoppingBag } from 'lucide-react';

const NAV = [
  ['Shop', '#shop'],
  ['Deals', '#deals'],
  ['Reviews', '#reviews'],
  ['FAQ', '#faq'],
] as const;

interface HeaderProps {
  query: string;
  onQuery: (value: string) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export function Header({ query, onQuery, cartCount, onOpenCart }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="bg-ink px-4 py-1.5 text-center text-xs font-medium text-white">
        Demo store — browse freely, no real orders or payments
      </div>
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:gap-6">
        <a href="#top" className="flex shrink-0 items-center gap-2 text-xl font-extrabold tracking-tight">
          <span className="grid size-8 place-items-center rounded-lg bg-ink text-brand">Z</span>
          <span>Zorvyn</span>
        </a>
        <label className="relative min-w-0 flex-1">
          <span className="sr-only">Search products</span>
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder="Search shoes, jeans, dresses…"
            className="w-full rounded-full border border-slate-200 bg-slate-50 py-2 pr-3 pl-9 text-sm outline-none focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20"
          />
        </label>
        <button
          type="button"
          onClick={onOpenCart}
          className="relative grid size-10 shrink-0 place-items-center rounded-full bg-slate-100 hover:bg-slate-200 focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
          aria-label={`Open cart, ${cartCount} item${cartCount === 1 ? '' : 's'}`}
        >
          <ShoppingBag className="size-5" aria-hidden />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 grid min-w-5 place-items-center rounded-full bg-brand px-1 text-[11px] font-bold text-white">
              {cartCount}
            </span>
          )}
        </button>
      </div>
      <nav aria-label="Sections" className="mx-auto max-w-6xl overflow-x-auto px-4">
        <ul className="flex gap-5 pb-2.5 text-sm font-medium whitespace-nowrap text-slate-600">
          {NAV.map(([label, href]) => (
            <li key={href}>
              <a href={href} className="hover:text-brand-dark">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
