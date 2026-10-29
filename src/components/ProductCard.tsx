import type { Product } from '../data/products';
import { Price } from './Price';
import { Rating } from './Rating';

export function ProductCard({ product, onOpen }: { product: Product; onOpen: () => void }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <button type="button" onClick={onOpen} className="block w-full text-left focus-visible:outline-none">
        <div className="relative aspect-square overflow-hidden bg-slate-100">
          <img
            src={product.image}
            alt={`${product.name} in ${product.colour}`}
            loading="lazy"
            className="size-full object-cover transition duration-300 group-hover:scale-105"
          />
          {product.badge && (
            <span className="absolute top-3 left-3 rounded-full bg-brand px-2.5 py-1 text-xs font-bold text-white">
              {product.badge}
            </span>
          )}
        </div>
        <div className="space-y-1.5 p-4 group-focus-within:ring-2 group-focus-within:ring-brand group-focus-within:ring-inset">
          <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">{product.category}</p>
          <h3 className="font-semibold">{product.name}</h3>
          <Rating value={product.rating} reviews={product.reviews} />
          <Price product={product} />
        </div>
      </button>
    </article>
  );
}
