import { Heart, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return <footer className="mt-10 border-t border-pink-100 bg-pink-50/70 py-10 sm:py-14">
    <div className="page-container">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div><h2 className="font-handwritten text-3xl font-bold text-[#b93857]">Ateliê AnaCraft</h2><p className="mt-3 text-sm leading-relaxed text-gray-600">Presentes e detalhes artesanais feitos com carinho, para tornar cada momento mais especial.</p></div>
        <nav aria-label="Navegação do rodapé"><h3 className="mb-3 text-base font-bold">Explore</h3><div className="flex flex-col items-start"><Link className="min-h-11 py-2 text-sm text-gray-700 hover:text-[#b93857]" to="/">Início</Link><Link className="min-h-11 py-2 text-sm text-gray-700 hover:text-[#b93857]" to="/catalogo">Catálogo completo</Link><Link className="min-h-11 py-2 text-sm text-gray-700 hover:text-[#b93857]" to="/#categorias">Categorias</Link><Link className="min-h-11 py-2 text-sm text-gray-700 hover:text-[#b93857]" to="/sobre">Sobre o ateliê</Link></div></nav>
        <div><h3 className="mb-3 text-base font-bold">Fale com a gente</h3><a href="https://www.instagram.com/atelie_anacraft/" target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 break-all text-sm font-semibold text-[#b93857]">@atelie_anacraft <ArrowUpRight className="h-4 w-4 shrink-0" /></a><p className="mt-2 text-sm leading-relaxed text-gray-600">Tire dúvidas sobre personalização e produção pelo Instagram.</p></div>
        <div className="rounded-3xl border border-pink-100 bg-white p-5"><Heart className="h-6 w-6 text-[#b93857]" /><h3 className="mt-3 text-base font-bold">Um presente do seu jeito</h3><p className="mt-2 text-sm leading-relaxed text-gray-600">Escolha seu mimo e personalize os detalhes. Cada peça é preparada sob encomenda.</p></div>
      </div>
      <div className="mt-8 flex flex-col gap-3 border-t border-pink-200 pt-6 text-sm text-gray-600 sm:flex-row sm:flex-wrap sm:justify-between"><p>© {new Date().getFullYear()} Ateliê AnaCraft.</p><p>Desenvolvido por <a href="https://github.com/CauaRodolpho" target="_blank" rel="noreferrer" className="font-semibold text-gray-800 underline underline-offset-4">Cauã Rodolpho</a></p></div>
    </div>
  </footer>;
}
