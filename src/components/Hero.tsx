import { RotateCcw, ShieldCheck, Truck } from 'lucide-react';
import { taka, DELIVERY_FEE } from '../data/products';

export function Hero() {
  return (
    <section className="bg-gradient-to-br from-ink via-slate-800 to-slate-900 text-white">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 sm:py-16 md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold tracking-widest text-brand uppercase">New season drop</p>
          <h1 className="mt-3 text-4xl leading-tight font-extrabold sm:text-5xl">
            Move easy.
            <br />
            Look sharp.
          </h1>
          <p className="mt-4 max-w-md text-slate-300">
            Sneakers, denim and festive dresses for the whole family — comfortable, stylish and made for Dhaka life.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#shop" className="rounded-full bg-brand px-6 py-3 font-semibold text-white hover:bg-brand-dark">
              Shop now
            </a>
            <a href="#shop" className="rounded-full border border-white/30 px-6 py-3 font-semibold hover:bg-white/10">
              Up to 19% off
            </a>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <img src="products/glide-knit-runner.jpg" alt="" className="aspect-square w-full rounded-2xl object-cover shadow-xl" />
          <img src="products/tapered-indigo-jeans.jpg" alt="" className="mt-8 aspect-square w-full rounded-2xl object-cover shadow-xl" />
        </div>
      </div>
      <ul className="mx-auto grid max-w-6xl gap-3 px-4 pb-8 text-sm text-slate-300 sm:grid-cols-3">
        <li className="flex items-center gap-2">
          <Truck className="size-4 text-brand" aria-hidden /> Delivery {taka(DELIVERY_FEE.insideDhaka)} inside Dhaka
        </li>
        <li className="flex items-center gap-2">
          <RotateCcw className="size-4 text-brand" aria-hidden /> 7-day easy exchange
        </li>
        <li className="flex items-center gap-2">
          <ShieldCheck className="size-4 text-brand" aria-hidden /> Cash on delivery
        </li>
      </ul>
    </section>
  );
}
