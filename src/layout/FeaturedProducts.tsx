import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export function FeaturedProducts() {
  const featured = ['acessorios', 'canecas', 'decoracao', 'papelaria'].map(category => PRODUCTS.find(product => product.category === category)).filter(product => product !== undefined);
  return <section id="produtos" className="page-container py-10 sm:py-16">
    <div className="mb-8 text-center">
      <span className="font-handwritten text-2xl text-[#b93857]">Seleção especial</span>
      <h2 className="mt-1 font-handwritten text-4xl font-bold text-brand-dark sm:text-5xl">Mimos em destaque</h2>
    </div>
    <div className="product-grid">{featured.map(product => <ProductCard key={product.productId} product={product} />)}</div>
    <div className="mt-8 text-center"><Link to="/catalogo" className="catalog-button inline-flex min-h-12 items-center gap-2 rounded-full border border-[#b93857] px-6 py-3 font-bold text-[#b93857]">Ver todos os produtos <ArrowRight className="h-4 w-4" /></Link></div>
  </section>;
}
