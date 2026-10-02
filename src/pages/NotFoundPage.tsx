import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return <section className="page-container flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
    <p className="text-sm font-bold text-[#b93857]">Página não encontrada</p>
    <h1 className="text-3xl font-bold">Vamos encontrar seu próximo mimo?</h1>
    <p className="text-gray-600">Este endereço não está disponível. Você pode continuar pelo catálogo.</p>
    <Link to="/catalogo" className="rounded-full bg-[#b93857] px-6 py-3 font-bold text-white">Ver catálogo</Link>
  </section>;
}
