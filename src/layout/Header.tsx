import { Heart, Menu, Search, ShoppingBag, X, Gift, Truck } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import logo from '../assets/logo1.webp';
import { PRODUCTS } from '../data/products';
import { useCart } from '../hooks/useCart';
import { useFavorites } from '../hooks/useFavorites';
import { formatPrice } from '../utils/format';

function ProductSearch({ id }: { id: string }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const results = PRODUCTS.filter(product => normalize(`${product.name} ${product.category}`).includes(normalize(query.trim())));
  useEffect(() => {
    const outside = (event: PointerEvent) => { if (!ref.current?.contains(event.target as Node)) setOpen(false); };
    document.addEventListener('pointerdown', outside);
    return () => document.removeEventListener('pointerdown', outside);
  }, []);
  return <form ref={ref} role="search" className="relative w-full" onKeyDown={event => { if (event.key === 'Escape') setOpen(false); }} onSubmit={event => { event.preventDefault(); setOpen(false); navigate(query.trim() ? `/catalogo?q=${encodeURIComponent(query.trim())}` : '/catalogo'); }}>
    <label htmlFor={id} className="sr-only">Buscar produtos</label>
    <input id={id} type="search" autoComplete="off" value={query} onFocus={() => setOpen(true)} onChange={event => { setQuery(event.target.value); setOpen(true); }} placeholder="Buscar canecas, chaveiros, presentes..." className="h-11 w-full rounded-full border border-pink-200 bg-white pl-4 pr-14 text-base text-gray-700 placeholder:text-sm" />
    <button type="submit" aria-label="Pesquisar no catálogo" className="absolute right-0 top-0 flex h-11 w-12 items-center justify-center rounded-full text-[#b93857] hover:bg-pink-50"><Search className="h-5 w-5" /></button>
    {open && query.trim() && <div className="search-results absolute left-0 right-0 top-full z-50 mt-2 overflow-y-auto rounded-2xl border border-pink-100 bg-white p-2 shadow-xl">
      <p className="px-3 py-2 text-xs font-bold text-gray-500">{results.length} resultado(s)</p>
      {results.slice(0, 5).map(product => <button key={product.productId} type="button" onClick={() => { setOpen(false); setQuery(''); navigate(`/produto/${product.productId}`); }} className="flex w-full items-center gap-3 rounded-xl p-3 text-left hover:bg-pink-50"><img src={product.imageUrl} alt="" width="40" height="40" className="h-10 w-10 shrink-0 rounded-lg object-cover" /><span className="min-w-0"><span className="block text-sm font-semibold text-gray-800">{product.name}</span><span className="text-sm text-[#b93857]">{formatPrice(product.price)}</span></span></button>)}
      {!results.length && <p className="p-3 text-sm text-gray-600">Nenhum produto encontrado. Tente outro termo.</p>}
      {results.length > 5 && <button type="submit" className="min-h-11 w-full text-sm font-bold text-[#b93857]">Ver todos os resultados</button>}
    </div>}
  </form>;
}

export function Header() {
  const { totalItems, openCart } = useCart();
  const { totalFavorites, openFavorites } = useFavorites();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const menuButton = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    const measure = () => { if (header.current) document.documentElement.style.setProperty('--header-height', `${header.current.getBoundingClientRect().height}px`); };
    const observer = new ResizeObserver(measure);
    if (header.current) observer.observe(header.current);
    measure();
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!mobileOpen) return;
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') { setMobileOpen(false); menuButton.current?.focus(); } };
    const outside = (event: PointerEvent) => { if (!header.current?.contains(event.target as Node)) setMobileOpen(false); };
    document.addEventListener('keydown', close);
    document.addEventListener('pointerdown', outside);
    return () => { document.removeEventListener('keydown', close); document.removeEventListener('pointerdown', outside); };
  }, [mobileOpen]);
  const links = [
    { to: '/', label: 'Início' }, { to: '/#categorias', label: 'Categorias' }, { to: '/#produtos', label: 'Produtos' }, { to: '/catalogo', label: 'Catálogo' }, { to: '/sobre', label: 'Sobre nós' },
  ];
  const navigation = links.map(link => <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)} aria-current={`${location.pathname}${location.hash}` === link.to ? 'page' : undefined} className="flex min-h-11 items-center rounded-xl px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-pink-50 hover:text-[#b93857] aria-[current=page]:bg-pink-50 aria-[current=page]:text-[#b93857]">{link.label}</Link>);
  return <header ref={header} className="site-header sticky top-0 z-40 border-b border-pink-100 bg-white/95 shadow-sm backdrop-blur-xl">
    <div className="announcement-bar flex border-b border-pink-100 bg-pink-50 text-xs font-medium text-[#a33750]">
      <div className="announcement-window min-w-0 flex-1 overflow-hidden">
        <div className="announcement-track">
          {[0, 1].map(copy => <div key={copy} className="announcement-group" aria-hidden={copy === 1 ? true : undefined}>
            <span className="flex items-center gap-2"><Gift className="h-4 w-4" aria-hidden="true" />Feito à mão, com carinho</span>
            <span className="flex items-center gap-2"><Truck className="h-4 w-4" aria-hidden="true" />Enviamos para todo o Brasil</span>
            <span>Presentes com a sua personalidade</span>
          </div>)}
        </div>
      </div>
    </div>
    <div className="page-container">
      <div className="flex min-h-16 items-center gap-3 xl:min-h-20 xl:gap-6">
        <Link to="/" onClick={() => setMobileOpen(false)} aria-label="AnaCraft — início" className="shrink-0"><img src={logo} alt="AnaCraft Ateliê" width="140" height="70" className="h-14 w-24 object-contain sm:w-32 xl:h-18 xl:w-36" /></Link>
        <div className="hidden min-w-0 flex-1 xl:block"><ProductSearch id="desktop-search" /></div>
        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <button type="button" onClick={() => { setMobileOpen(false); openFavorites(); }} aria-label={`Abrir favoritos (${totalFavorites})`} className="relative flex h-11 w-11 items-center justify-center rounded-full text-gray-700 hover:bg-pink-50"><Heart className="h-6 w-6" />{totalFavorites > 0 && <span className="counter">{totalFavorites > 99 ? '99+' : totalFavorites}</span>}</button>
          <button type="button" onClick={() => { setMobileOpen(false); openCart(); }} aria-label={`Abrir carrinho (${totalItems})`} className="relative flex h-11 w-11 items-center justify-center rounded-full text-gray-700 hover:bg-pink-50"><ShoppingBag className="h-6 w-6" />{totalItems > 0 && <span className="counter">{totalItems > 99 ? '99+' : totalItems}</span>}</button>
          <button ref={menuButton} type="button" onClick={() => setMobileOpen(value => !value)} aria-expanded={mobileOpen} aria-controls="mobile-navigation" aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'} className="flex h-11 w-11 items-center justify-center rounded-xl text-gray-700 hover:bg-pink-50 xl:hidden">{mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}</button>
        </div>
      </div>
      <div className="pb-3 xl:hidden"><ProductSearch id="mobile-search" /></div>
      <nav aria-label="Navegação principal" className="hidden items-center justify-center gap-3 pb-2 xl:flex">{navigation}<a href="https://www.instagram.com/atelie_anacraft/" target="_blank" rel="noreferrer" className="flex min-h-11 items-center rounded-xl px-3 text-sm font-semibold text-gray-700 hover:bg-pink-50">Contato</a></nav>
      {mobileOpen && <nav id="mobile-navigation" aria-label="Navegação do celular" className="grid max-h-[50dvh] grid-cols-2 gap-2 overflow-y-auto border-t border-pink-100 py-3 xl:hidden">{navigation}<a href="https://www.instagram.com/atelie_anacraft/" target="_blank" rel="noreferrer" onClick={() => setMobileOpen(false)} className="flex min-h-11 items-center rounded-xl px-3 text-sm font-semibold text-gray-700">Contato</a></nav>}
    </div>
  </header>;
}
