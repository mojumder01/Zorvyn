import { Star } from 'lucide-react';

export function Rating({ value, reviews }: { value: number; reviews: number }) {
  return (
    <span className="flex items-center gap-1 text-xs text-slate-500">
      <Star className="size-3.5 fill-amber-400 text-amber-400" aria-hidden />
      <span className="font-semibold text-slate-700">{value.toFixed(1)}</span>
      <span>({reviews} reviews)</span>
    </span>
  );
}
