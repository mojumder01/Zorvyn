import { useState, type FormEvent, type ReactNode } from 'react';
import { CircleCheck, X } from 'lucide-react';
import type { Cart } from '../cart';
import { DELIVERY_FEE, taka } from '../data/products';
import { Dialog } from './Dialog';

interface CheckoutDialogProps {
  open: boolean;
  onClose: () => void;
  cart: Cart;
}

type Area = keyof typeof DELIVERY_FEE;
interface Order {
  number: string;
  name: string;
  total: number;
}

/** Bangladeshi mobile number: 01XXXXXXXXX, optionally with +880 / 880 in front. */
const PHONE_PATTERN = /^(?:\+?880)?01[3-9]\d{8}$/;

export function CheckoutDialog({ open, onClose, cart }: CheckoutDialogProps) {
  const [order, setOrder] = useState<Order | null>(null);

  const close = () => {
    setOrder(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={close} label="Checkout" className="w-[min(520px,calc(100vw-2rem))] rounded-3xl bg-white shadow-2xl">
      {order ? <Confirmation order={order} onClose={close} /> : <CheckoutForm cart={cart} onClose={close} onPlaced={setOrder} />}
    </Dialog>
  );
}

function CheckoutForm({ cart, onClose, onPlaced }: { cart: Cart; onClose: () => void; onPlaced: (order: Order) => void }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [area, setArea] = useState<Area>('insideDhaka');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  /** Typing in a field hides its error until the next submit. */
  const edit = (field: string, set: (value: string) => void, value: string) => {
    set(value);
    if (errors[field]) setErrors(({ [field]: _, ...rest }) => rest);
  };

  const delivery = DELIVERY_FEE[area];
  const total = cart.subtotal + delivery;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const found: Record<string, string> = {};
    if (name.trim().length < 2) found.name = 'Please enter your name.';
    if (!PHONE_PATTERN.test(phone.replace(/[\s-]/g, ''))) found.phone = 'Enter a valid mobile number, e.g. 01712345678.';
    if (address.trim().length < 8) found.address = 'Please enter your full address.';
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(`checkout-${Object.keys(found)[0]}`)?.focus();
      return;
    }
    // Demo store: nothing is sent anywhere
    const number = `ZV-${String(crypto.getRandomValues(new Uint32Array(1))[0] % 1_000_000).padStart(6, '0')}`;
    onPlaced({ number, name: name.trim(), total });
    cart.clear();
  };

  const input = 'w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 aria-[invalid=true]:border-red-500';

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-4 p-5 sm:p-7">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold">Checkout</h2>
          <p className="text-sm text-slate-500">Demo store — no order is sent and no payment is taken.</p>
        </div>
        <button type="button" onClick={onClose} className="grid size-9 shrink-0 place-items-center rounded-full hover:bg-slate-100" aria-label="Close checkout">
          <X className="size-5" aria-hidden />
        </button>
      </div>

      <Field id="checkout-name" label="Full name" error={errors.name}>
        <input id="checkout-name" className={input} value={name} onChange={(e) => edit('name', setName, e.target.value)} autoComplete="name" aria-invalid={!!errors.name} aria-describedby="checkout-name-error" />
      </Field>
      <Field id="checkout-phone" label="Mobile number" error={errors.phone}>
        <input id="checkout-phone" className={input} value={phone} onChange={(e) => edit('phone', setPhone, e.target.value)} type="tel" inputMode="tel" autoComplete="tel" placeholder="01XXXXXXXXX" aria-invalid={!!errors.phone} aria-describedby="checkout-phone-error" />
      </Field>
      <fieldset>
        <legend className="mb-1.5 text-sm font-medium">Delivery area</legend>
        <div className="grid grid-cols-2 gap-2">
          {(
            [
              ['insideDhaka', 'Inside Dhaka'],
              ['outsideDhaka', 'Outside Dhaka'],
            ] as const
          ).map(([value, label]) => (
            <label key={value} className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-300 px-3 py-2.5 text-sm has-checked:border-ink has-checked:bg-slate-50">
              <input type="radio" name="area" value={value} checked={area === value} onChange={() => setArea(value)} className="accent-brand" />
              <span>
                {label} <span className="text-slate-500">({taka(DELIVERY_FEE[value])})</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <Field id="checkout-address" label="Full address" error={errors.address}>
        <textarea id="checkout-address" className={input} rows={3} value={address} onChange={(e) => edit('address', setAddress, e.target.value)} autoComplete="street-address" aria-invalid={!!errors.address} aria-describedby="checkout-address-error" />
      </Field>

      <dl className="space-y-1.5 rounded-2xl bg-slate-50 p-4 text-sm">
        <div className="flex justify-between">
          <dt>Subtotal ({cart.count} item{cart.count === 1 ? '' : 's'})</dt>
          <dd>{taka(cart.subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Delivery</dt>
          <dd>{taka(delivery)}</dd>
        </div>
        <div className="flex justify-between border-t border-slate-200 pt-1.5 text-base font-bold">
          <dt>Total</dt>
          <dd>{taka(total)}</dd>
        </div>
        <p className="pt-1 text-xs text-slate-500">Payment: cash on delivery</p>
      </dl>

      <button type="submit" disabled={cart.count === 0} className="rounded-full bg-brand py-3 font-semibold text-white hover:bg-brand-dark disabled:opacity-50">
        Place demo order
      </button>
    </form>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      {children}
      <p id={`${id}-error`} className="min-h-0 text-sm text-red-600">
        {error}
      </p>
    </div>
  );
}

function Confirmation({ order, onClose }: { order: Order; onClose: () => void }) {
  return (
    <div className="flex flex-col items-center gap-3 p-8 text-center" role="status">
      <CircleCheck className="size-14 text-emerald-500" aria-hidden />
      <h2 className="text-2xl font-bold">Thank you, {order.name}!</h2>
      <p className="text-slate-600">
        Demo order <span className="font-semibold">{order.number}</span> for <span className="font-semibold">{taka(order.total)}</span> is confirmed.
      </p>
      <p className="text-sm text-slate-500">This is a demo store, so nothing will be delivered and no payment is taken.</p>
      <button type="button" onClick={onClose} className="mt-2 rounded-full bg-ink px-6 py-3 font-semibold text-white">
        Continue shopping
      </button>
    </div>
  );
}
