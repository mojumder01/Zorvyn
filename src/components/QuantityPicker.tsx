import { Minus, Plus } from 'lucide-react';
import { MAX_QUANTITY } from '../cart';

interface QuantityPickerProps {
  value: number;
  onChange: (value: number) => void;
  label: string;
  /** Allow going down to 0 (remove from cart). */
  allowZero?: boolean;
}

export function QuantityPicker({ value, onChange, label, allowZero = false }: QuantityPickerProps) {
  const min = allowZero ? 0 : 1;
  const button = 'grid size-8 place-items-center rounded-full hover:bg-slate-100 disabled:opacity-40';
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-slate-200 p-0.5" role="group" aria-label={label}>
      <button type="button" className={button} onClick={() => onChange(value - 1)} disabled={value <= min} aria-label="Decrease quantity">
        <Minus className="size-4" aria-hidden />
      </button>
      <span className="w-6 text-center text-sm font-semibold" aria-live="polite">
        {value}
      </span>
      <button type="button" className={button} onClick={() => onChange(value + 1)} disabled={value >= MAX_QUANTITY} aria-label="Increase quantity">
        <Plus className="size-4" aria-hidden />
      </button>
    </div>
  );
}
