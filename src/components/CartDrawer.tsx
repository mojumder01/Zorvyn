import { ShoppingBag, Trash2, X } from 'lucide-react';
import { findProduct, type Cart } from '../cart';
import { taka } from '../data/products';
import { Dialog } from './Dialog';
import { QuantityPicker } from './QuantityPicker';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  cart: Cart;
  onCheckout: () => void;
}

export function CartDrawer({ open, onClose, cart, onCheckout }: CartDrawerProps) {
  return (
    <Dialog open={open} onClose={onClose} label="Shopping cart" variant="drawer" className="bg-white shadow-2xl">
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h2 className="text-lg font-bold">Your cart ({cart.count})</h2>
          <button type="button" onClick={onClose} className="grid size-9 place-items-center rounded-full hover:bg-slate-100" aria-label="Close cart">
            <X className="size-5" aria-hidden />
          </button>
        </div>

        {cart.lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center text-slate-500">
            <ShoppingBag className="size-12 text-slate-300" aria-hidden />
            <p>Your cart is empty.</p>
            <button type="button" onClick={onClose} className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white">
              Continue shopping
            </button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-slate-100 overflow-y-auto px-5">
              {cart.lines.map((line) => {
                const product = findProduct(line.productId);
                if (!product) return null;
                return (
                  <li key={`${line.productId}-${line.size}`} className="flex gap-3 py-4">
                    <img src={product.image} alt="" className="size-20 shrink-0 rounded-xl bg-slate-100 object-cover" />
                    <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="truncate font-semibold">{product.name}</p>
                          <p className="text-xs text-slate-500">
                            Size {line.size} · {product.colour}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => cart.setQuantity(line.productId, line.size, 0)}
                          className="grid size-8 shrink-0 place-items-center rounded-full text-slate-400 hover:bg-red-50 hover:text-red-600"
                          aria-label={`Remove ${product.name}, size ${line.size}`}
                        >
                          <Trash2 className="size-4" aria-hidden />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <QuantityPicker
                          value={line.quantity}
                          onChange={(q) => cart.setQuantity(line.productId, line.size, q)}
                          label={`Quantity of ${product.name}, size ${line.size}`}
                          allowZero
                        />
                        <span className="font-semibold">{taka(product.price * line.quantity)}</span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="space-y-3 border-t border-slate-200 p-5">
              <div className="flex justify-between text-base">
                <span>Subtotal</span>
                <span className="font-bold">{taka(cart.subtotal)}</span>
              </div>
              <p className="text-xs text-slate-500">Delivery is added at checkout.</p>
              <button type="button" onClick={onCheckout} className="w-full rounded-full bg-brand py-3 font-semibold text-white hover:bg-brand-dark">
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </Dialog>
  );
}
