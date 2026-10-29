import { ArrowRight } from 'lucide-react';
import { CATEGORIES, PRODUCTS, type Category } from '../../data/products';

const IMAGES: Record<Category, string> = {
  sneakers: 'products/aero-mesh-trainer.jpg',
  jeans: 'products/classic-straight-jeans.jpg',
  women: 'products/floral-garden-dress.jpg',
  kids: 'products/golden-check-lehenga-model.jpg',
};

export function CategoryTiles({ onPick }: { onPick: (category: Category) => void }) {
  const tiles = CATEGORIES.filter((c): c is { id: Category; label: string } => c.id !== 'all');
  return (
    <section aria-labelledby="categories-title" className="mx-auto max-w-6xl px-4 pt-12">
      <h2 id="categories-title" className="text-2xl font-bold">
        Shop by category
      </h2>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {tiles.map((tile) => (
          <button
            key={tile.id}
            type="button"
            onClick={() => onPick(tile.id)}
            className="group relative aspect-[4/5] overflow-hidden rounded-3xl bg-slate-200 text-left shadow-sm transition hover:shadow-lg focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
          >
            <img src={IMAGES[tile.id]} alt="" loading="lazy" className="absolute inset-0 size-full object-cover transition duration-300 group-hover:scale-105" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 via-ink/40 to-transparent p-4 pt-12 text-white">
              <span className="block text-xl font-extrabold">{tile.label}</span>
              <span className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-orange-200">
                {PRODUCTS.filter((p) => p.category === tile.id).length} styles
                <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden />
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
