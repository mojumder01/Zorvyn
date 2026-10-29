import { JEAN_SIZE_GUIDE, SHOE_SIZE_GUIDE } from '../../data/content';

function SizeTable({ caption, headers, rows }: { caption: string; headers: [string, string]; rows: readonly (readonly [string, string])[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <table className="w-full text-sm">
        <caption className="bg-slate-50 px-4 py-3 text-left font-semibold">{caption}</caption>
        <thead>
          <tr className="border-y border-slate-200 text-left text-slate-500">
            {headers.map((h) => (
              <th key={h} scope="col" className="px-4 py-2 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([size, value]) => (
            <tr key={size} className="border-b border-slate-100 last:border-0">
              <th scope="row" className="px-4 py-2 text-left font-semibold">
                {size}
              </th>
              <td className="px-4 py-2">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function SizeGuide() {
  return (
    <section id="size-guide" aria-labelledby="size-title" className="mx-auto max-w-6xl scroll-mt-36 px-4 py-12">
      <h2 id="size-title" className="text-2xl font-bold">
        Size guide
      </h2>
      <p className="mt-1 text-sm text-slate-500">Between two sizes? Pick the larger one — exchanges are free within 7 days.</p>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <SizeTable caption="Sneakers" headers={['EU size', 'Foot length (cm)']} rows={SHOE_SIZE_GUIDE} />
        <SizeTable caption="Jeans" headers={['Waist size', 'Waist (cm)']} rows={JEAN_SIZE_GUIDE} />
      </div>
    </section>
  );
}
