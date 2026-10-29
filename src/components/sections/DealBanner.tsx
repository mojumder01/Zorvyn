import { useEffect, useState } from 'react';
import { Timer } from 'lucide-react';
import { taka, type Product } from '../../data/products';

/** Next Saturday 00:00 local time: the weekly deal resets every week. */
function dealEnd(now: Date): Date {
  const end = new Date(now);
  end.setHours(24, 0, 0, 0);
  while (end.getDay() !== 6) end.setDate(end.getDate() + 1);
  return end;
}

function useCountdown() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  const left = Math.max(0, dealEnd(now).getTime() - now.getTime()) / 1000;
  return [
    ['Days', Math.floor(left / 86400)],
    ['Hours', Math.floor((left % 86400) / 3600)],
    ['Min', Math.floor((left % 3600) / 60)],
    ['Sec', Math.floor(left % 60)],
  ] as const;
}

export function DealBanner({ product, onOpen }: { product: Product; onOpen: () => void }) {
  const parts = useCountdown();
  return (
    <section id="deals" aria-labelledby="deal-title" className="mx-auto max-w-6xl scroll-mt-36 px-4 py-6">
      <div className="grid items-center gap-6 overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 to-rose-500 p-6 text-white sm:p-10 md:grid-cols-[1fr_auto]">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold tracking-widest uppercase">
            <Timer className="size-4" aria-hidden /> Deal of the week
          </p>
          <h2 id="deal-title" className="mt-2 text-3xl font-extrabold sm:text-4xl">
            {product.name}
          </h2>
          <p className="mt-2 text-lg">
            Now <span className="font-extrabold">{taka(product.price)}</span>
            {product.oldPrice && (
              <>
                {' '}
                <s className="text-white/70">{taka(product.oldPrice)}</s>
              </>
            )}
          </p>
          <div className="mt-5 flex gap-2" role="timer" aria-label="Time left for this deal">
            {parts.map(([label, value]) => (
              <div key={label} className="w-16 rounded-xl bg-white/15 py-2 text-center backdrop-blur">
                <div className="text-2xl font-bold tabular-nums">{String(value).padStart(2, '0')}</div>
                <div className="text-[11px] uppercase">{label}</div>
              </div>
            ))}
          </div>
          <button type="button" onClick={onOpen} className="mt-6 rounded-full bg-white px-6 py-3 font-semibold text-ink hover:bg-slate-100">
            Grab the deal
          </button>
        </div>
        <img src={product.image} alt={`${product.name} in ${product.colour}`} loading="lazy" className="mx-auto w-full max-w-xs rounded-2xl bg-white object-cover shadow-2xl md:w-72" />
      </div>
    </section>
  );
}
