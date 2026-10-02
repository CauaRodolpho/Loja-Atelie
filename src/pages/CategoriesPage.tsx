import { useSearchParams } from 'react-router-dom';
import { PRODUCTS, CATEGORY_ICONS } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export function CategoriesPage() {
  const [params, setParams] = useSearchParams();
  const category = params.get('cat') || 'todos';
  const query = (params.get('q') || '').trim();
  const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const filtered = PRODUCTS.filter(product => (category === 'todos' || product.category === category) && (!query || normalize(`${product.name} ${product.category}`).includes(normalize(query))));
  const categories = [{ id: 'todos', title: 'Todos os produtos' }, ...Object.entries(CATEGORY_ICONS).map(([id, item]) => ({ id, title: item.title }))];
  return <section className="page-container py-8 sm:py-12">
    <div className="mb-8 text-center">
      <span className="font-handwritten text-2xl text-[#b93857]">Nosso catálogo</span>
      <h1 className="font-handwritten text-4xl font-bold sm:text-5xl">Encontre seu próximo mimo</h1>
      <p className="mx-auto mt-3 max-w-xl text-base text-gray-600">Escolha um presente e deixe os detalhes com a sua personalidade.</p>
    </div>
    <nav aria-label="Filtrar produtos por categoria" className="mb-6 overflow-x-auto overscroll-x-contain pb-3">
      <div className="mx-auto flex w-max gap-2 rounded-2xl border border-pink-100 bg-white p-2">
        {categories.map(item => <button type="button" key={item.id} aria-pressed={category === item.id} onClick={() => { const next = new URLSearchParams(params); next.delete('cat'); if (item.id !== 'todos') next.set('cat', item.id); setParams(next); }} className={`min-h-11 shrink-0 whitespace-nowrap rounded-xl px-4 py-2 text-sm font-semibold ${category === item.id ? 'bg-[#b93857] text-white' : 'text-gray-700 hover:bg-pink-50'}`}>{item.title}</button>)}
      </div>
    </nav>
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3 text-sm text-gray-600" aria-live="polite">
      <p>{filtered.length} {filtered.length === 1 ? 'produto encontrado' : 'produtos encontrados'}{query && <> para <strong>“{query}”</strong></>}</p>
      {query && <button type="button" className="min-h-11 font-bold text-[#b93857]" onClick={() => { const next = new URLSearchParams(params); next.delete('q'); setParams(next); }}>Limpar pesquisa</button>}
    </div>
    {filtered.length ? <div className="product-grid">{filtered.map(product => <ProductCard key={product.productId} product={product} />)}</div> : <div className="rounded-3xl border border-pink-100 bg-white p-8 text-center"><p className="text-gray-600">Não encontramos produtos com esses filtros.</p><button type="button" onClick={() => setParams({})} className="mt-4 min-h-11 font-bold text-[#b93857]">Ver todos os produtos</button></div>}
  </section>;
}
