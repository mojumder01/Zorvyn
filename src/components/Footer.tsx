const COLUMNS = [
  { title: 'Shop', links: [['All products', '#shop'], ['Deal of the week', '#deals'], ['Reviews', '#reviews']] },
  { title: 'Help', links: [['FAQ', '#faq'], ['Delivery & exchange', '#faq'], ['Size help', '#faq']] },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2">
          <p className="flex items-center gap-2 text-xl font-extrabold">
            <span className="grid size-8 place-items-center rounded-lg bg-ink text-brand">Z</span> Zorvyn
          </p>
          <p className="mt-3 max-w-sm text-sm text-slate-500">
            Sneakers, denim and dresses for the whole family. This is a demo e-commerce store — products, prices, reviews and orders are samples.
          </p>
        </div>
        {COLUMNS.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <p className="font-semibold">{col.title}</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-500">
              {col.links.map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="hover:text-ink">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-slate-100">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-5 text-sm text-slate-500 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Zorvyn (demo)</p>
          <p>
            Built by{' '}
            <a href="https://mojumder01.github.io/muntasir_Portfolio/" className="font-medium text-brand-dark underline-offset-2 hover:underline">
              Md Muntasir Mamun Mojumder
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
