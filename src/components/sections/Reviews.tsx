import { Quote, Star } from 'lucide-react';
import { REVIEWS } from '../../data/content';

export function Reviews() {
  return (
    <section id="reviews" aria-labelledby="reviews-title" className="scroll-mt-36 bg-ink py-14 text-white">
      <div className="mx-auto max-w-6xl px-4">
        <h2 id="reviews-title" className="text-2xl font-bold">
          What customers say
        </h2>
        <p className="mt-1 text-sm text-slate-400">Sample reviews for this demo store</p>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {REVIEWS.map((r) => (
            <li key={r.name} className="flex flex-col gap-3 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
              <Quote className="size-6 text-brand" aria-hidden />
              <p className="flex-1 text-slate-200">{r.text}</p>
              <div className="flex gap-0.5" aria-label={`${r.rating} out of 5 stars`} role="img">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className={`size-4 ${i < r.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`} aria-hidden />
                ))}
              </div>
              <p className="text-sm">
                <span className="font-semibold">{r.name}</span> <span className="text-slate-400">· {r.city} · {r.product}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
