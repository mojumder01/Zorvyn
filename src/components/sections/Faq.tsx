import { ChevronDown } from 'lucide-react';
import { FAQS } from '../../data/content';

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="mx-auto max-w-3xl scroll-mt-36 px-4 py-12">
      <h2 id="faq-title" className="text-center text-2xl font-bold">
        Questions? Answers.
      </h2>
      <div className="mt-6 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
        {FAQS.map((f) => (
          <details key={f.q} className="group px-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-medium [&::-webkit-details-marker]:hidden">
              {f.q}
              <ChevronDown className="size-5 shrink-0 text-slate-400 transition group-open:rotate-180" aria-hidden />
            </summary>
            <p className="pb-4 text-sm text-slate-600">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
