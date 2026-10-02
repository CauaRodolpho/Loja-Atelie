import { Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';
import { CATEGORY_ICONS } from '../data/products';
import type { Product } from '../types';
import { formatPrice } from '../utils/format';

export function ProductCard({ product }: { product: Product }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(product.productId);
  const category = CATEGORY_ICONS[product.category as keyof typeof CATEGORY_ICONS]?.title ?? product.category;
  return (
    <article className="product-card group flex min-w-0 flex-col rounded-3xl border border-pink-100 bg-white p-3 shadow-sm transition-shadow hover:shadow-lg sm:p-4">
      <div className="relative mb-4">
        <Link to={`/produto/${product.productId}`} aria-label={`Ver ${product.name}`} className="block aspect-square overflow-hidden rounded-2xl bg-pink-50">
          <img src={product.imageUrl} srcSet={product.imageUrlSmall ? `${product.imageUrlSmall} 480w, ${product.imageUrl} 800w` : undefined} sizes="(max-width: 579px) calc(100vw - 64px), (max-width: 1023px) 45vw, (max-width: 1399px) 30vw, 290px" alt={product.name} loading="lazy" decoding="async" width="800" height="800" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        </Link>
        <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-gray-700">{category}</span>
        <button type="button" onClick={() => toggleFavorite(product)} aria-pressed={favorite} aria-label={`${favorite ? 'Remover' : 'Adicionar'} ${product.name} ${favorite ? 'dos' : 'aos'} favoritos`} className="absolute right-2 top-2 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-[#b93857] shadow-sm hover:bg-pink-50">
          <Heart className={`h-5 w-5 ${favorite ? 'fill-current' : ''}`} />
        </button>
      </div>
      <div className="flex flex-1 flex-col px-1">
        <h3 className="text-base font-bold leading-snug text-brand-dark sm:text-lg"><Link to={`/produto/${product.productId}`}>{product.name}</Link></h3>
        <p className="mt-2 text-sm text-gray-500">Feito sob encomenda · {product.productionsDays} dias úteis</p>
        <div className="product-card-actions mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-pink-100 pt-4">
          <span className="whitespace-nowrap text-xl font-extrabold text-[#b93857]">{formatPrice(product.price)}</span>
          <Link to={`/produto/${product.productId}`} className="flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#b93857] px-4 py-2 text-sm font-bold text-white hover:bg-[#982d47]">Ver detalhes <ArrowRight className="h-4 w-4 shrink-0" /></Link>
        </div>
      </div>
    </article>
  );
}
