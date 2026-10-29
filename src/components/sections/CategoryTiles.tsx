import { ArrowRight } from 'lucide-react';
import { PRODUCTS, type Category } from '../../data/products';

const TILES: { id: Category; title: string; text: string; image: string }[] = [
  { id: 'sneakers', title: 'Sneakers', text: 'Light runners and trainers', image: 'products/aero-mesh-trainer.jpg' },
  { id: 'jeans', title: 'Jeans', text: 'Straight and tapered denim', image: 'products/classic-straight-jeans.jpg' },
];

export function CategoryTiles({ onPick }: { onPick: (category: Category) => void }) {
  return (
    <section aria-labelledby="categories-title" className="mx-auto max-w-6xl px-4 pt-12">
      <h2 id="categories-title" className="text-2xl font-bold">
        Shop by category
      </h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {TILES.map((tile) => (
          <button
            key={tile.id}
            type="button"
            onClick={() => onPick(tile.id)}
            className="group relative flex h-44 items-center overflow-hidden rounded-3xl border border-slate-200 bg-white text-left shadow-sm transition hover:shadow-lg focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none sm:h-52"
          >
            <div className="relative z-10 flex max-w-[60%] flex-col gap-1 p-6">
              <span className="text-2xl font-extrabold">{tile.title}</span>
              <span className="text-sm text-slate-500">{tile.text}</span>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-dark">
                {PRODUCTS.filter((p) => p.category === tile.id).length} styles
                <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden />
              </span>
            </div>
            <img src={tile.image} alt="" loading="lazy" className="absolute right-0 h-full w-2/5 object-contain sm:w-1/2 transition duration-300 group-hover:scale-105" />
          </button>
        ))}
      </div>
    </section>
  );
}
