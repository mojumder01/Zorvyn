import { useState } from 'react';
import { Check, ChevronDown, Ruler, X } from 'lucide-react';
import { SIZE_CHARTS, type Product } from '../data/products';
import { Dialog } from './Dialog';
import { Price } from './Price';
import { QuantityPicker } from './QuantityPicker';
import { Rating } from './Rating';

interface ProductDialogProps {
  product: Product | null;
  onClose: () => void;
  onAdd: (product: Product, size: string, quantity: number) => void;
}

export function ProductDialog({ product, onClose, onAdd }: ProductDialogProps) {
  return (
    <Dialog
      open={!!product}
      onClose={onClose}
      label={product?.name ?? 'Product'}
      className="w-[min(920px,calc(100vw-2rem))] rounded-3xl bg-white shadow-2xl"
    >
      {product && <ProductDetails key={product.id} product={product} onClose={onClose} onAdd={onAdd} />}
    </Dialog>
  );
}

function ProductDetails({ product, onClose, onAdd }: { product: Product } & Omit<ProductDialogProps, 'product'>) {
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showSizeError, setShowSizeError] = useState(false);
  const photos = [product.image, ...(product.gallery ?? [])];
  const [photo, setPhoto] = useState(photos[0]);
  const chart = SIZE_CHARTS[product.category];

  const add = () => {
    if (!size) {
      setShowSizeError(true);
      return;
    }
    onAdd(product, size, quantity);
  };

  return (
    <div className="grid md:grid-cols-2">
      <div className="flex flex-col bg-slate-100">
        <img src={photo} alt={`${product.name} in ${product.colour}`} className="aspect-square w-full object-cover" />
        {photos.length > 1 && (
          <div className="flex gap-2 p-3">
            {photos.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setPhoto(src)}
                aria-label={`Photo ${i + 1} of ${photos.length}`}
                aria-pressed={photo === src}
                className={`size-16 overflow-hidden rounded-lg ring-2 ${photo === src ? 'ring-ink' : 'ring-transparent hover:ring-slate-300'}`}
              >
                <img src={src} alt="" className="size-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-4 p-5 sm:p-7">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">{product.category}</p>
            <h2 className="mt-1 text-2xl font-bold">{product.name}</h2>
          </div>
          <button type="button" onClick={onClose} className="grid size-9 shrink-0 place-items-center rounded-full hover:bg-slate-100" aria-label="Close">
            <X className="size-5" aria-hidden />
          </button>
        </div>
        <Rating value={product.rating} reviews={product.reviews} />
        <Price product={product} large />
        <p className="text-sm text-slate-600">{product.description}</p>
        <p className="text-sm">
          <span className="text-slate-500">Colour:</span> <span className="font-medium">{product.colour}</span>
        </p>

        <fieldset>
          <legend className="mb-2 text-sm font-semibold">{chart.label}</legend>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <label key={s} className="cursor-pointer">
                <input
                  type="radio"
                  name="size"
                  value={s}
                  checked={size === s}
                  onChange={() => {
                    setSize(s);
                    setShowSizeError(false);
                  }}
                  className="peer sr-only"
                />
                <span className="grid h-10 min-w-11 place-items-center rounded-lg border border-slate-300 px-3 text-sm font-medium peer-checked:border-ink peer-checked:bg-ink peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-brand hover:border-ink">
                  {s}
                </span>
              </label>
            ))}
          </div>
          {showSizeError && (
            <p className="mt-2 text-sm text-red-600" role="alert">
              Please choose a size.
            </p>
          )}
        </fieldset>

        <div className="flex flex-wrap items-center gap-3">
          <QuantityPicker value={quantity} onChange={setQuantity} label="Quantity" />
          <button type="button" onClick={add} className="flex-1 rounded-full bg-brand px-6 py-3 font-semibold text-white hover:bg-brand-dark">
            Add to cart
          </button>
        </div>

        <details className="group rounded-xl border border-slate-200">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-4 py-3 text-sm font-semibold [&::-webkit-details-marker]:hidden">
            <span className="flex items-center gap-2">
              <Ruler className="size-4 text-brand-dark" aria-hidden /> Size chart
            </span>
            <ChevronDown className="size-4 text-slate-400 transition group-open:rotate-180" aria-hidden />
          </summary>
          <div className="overflow-x-auto border-t border-slate-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-left text-slate-500">
                  {chart.headers.map((h) => (
                    <th key={h} scope="col" className="px-4 py-2 font-medium whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {chart.rows.map(([rowSize, ...values]) => (
                  <tr key={rowSize} className={`border-t border-slate-100 ${rowSize === size ? 'bg-orange-50' : ''}`}>
                    <th scope="row" className="px-4 py-2 text-left font-semibold">
                      {rowSize}
                    </th>
                    {values.map((v, i) => (
                      <td key={i} className="px-4 py-2">
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="px-4 py-2 text-xs text-slate-500">Between two sizes? Pick the larger one — exchanges are free within 7 days.</p>
          </div>
        </details>

        <ul className="space-y-1.5 border-t border-slate-100 pt-4 text-sm text-slate-600">
          {product.details.map((d) => (
            <li key={d} className="flex items-center gap-2">
              <Check className="size-4 text-emerald-600" aria-hidden /> {d}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
