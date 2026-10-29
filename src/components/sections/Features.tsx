import { Footprints, RotateCcw, Truck, Wallet } from 'lucide-react';
import { FEATURES } from '../../data/content';

const ICONS = { footprints: Footprints, wallet: Wallet, rotate: RotateCcw, truck: Truck };

export function Features() {
  return (
    <section aria-labelledby="features-title" className="mx-auto max-w-6xl px-4 py-12">
      <h2 id="features-title" className="text-2xl font-bold">
        Why shop with Zorvyn
      </h2>
      <ul className="mt-5 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {FEATURES.map((f) => {
          const Icon = ICONS[f.icon];
          return (
            <li key={f.title} className="rounded-2xl border border-slate-200 bg-white p-5">
              <span className="grid size-11 place-items-center rounded-xl bg-orange-100 text-brand-dark">
                <Icon className="size-5" aria-hidden />
              </span>
              <h3 className="mt-3 font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-slate-500">{f.text}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
