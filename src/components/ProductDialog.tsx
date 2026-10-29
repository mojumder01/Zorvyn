import { useState } from 'react';
import { Check, X } from 'lucide-react';
import type { Product } from '../data/products';
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

  const add = () => {
    if (!size) {
      setShowSizeError(true);
      return;
    }
    onAdd(product, size, quantity);
  };

  return (
    <div className="grid md:grid-cols-2">
      <div className="relative bg-slate-100">
        <img src={product.image} alt={`${product.name} in ${product.colour}`} className="aspect-square size-full object-cover md:aspect-auto" />
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
          <legend className="mb-2 text-sm font-semibold">
            Size {product.category === 'jeans' ? '(waist, inches)' : '(EU)'}
          </legend>
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
