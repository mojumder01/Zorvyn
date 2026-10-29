import { taka, type Product } from '../data/products';

export function Price({ product, large = false }: { product: Product; large?: boolean }) {
  return (
    <span className="flex items-baseline gap-2">
      <span className={`font-bold ${large ? 'text-2xl' : 'text-lg'}`}>{taka(product.price)}</span>
      {product.oldPrice && (
        <>
          <s className="text-sm text-slate-400">
            <span className="sr-only">was </span>
            {taka(product.oldPrice)}
          </s>
          <span className="text-xs font-semibold text-emerald-600">
            {Math.round((1 - product.price / product.oldPrice) * 100)}% off
          </span>
        </>
      )}
    </span>
  );
}
