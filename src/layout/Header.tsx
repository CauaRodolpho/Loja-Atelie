import {
  BookOpen,
  ChevronDown,
  Gift,
  Grid2X2,
  Heart,
  Home,
  LockKeyhole,
  Menu,
  MessageCircle,
  Package,
  Search,
  ShoppingBag,
  Star,
  Truck,
  Users,
  X,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import logo1 from "../assets/logo1.png";
import { CategoryDropdown } from "../components/CategoryDropdown";
import { PRODUCTS } from "../data/products";
import type { Product } from "../types";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";

export const Header = () => {
  const { totalItems, openCart } = useCart();
  const { totalFavorites, openFavorites } = useFavorites();
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsCategoryOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsCategoryOpen(false), 100);
  };

  const filteredProducts = searchTerm.trim()
    ? PRODUCTS.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : [];

  const handleSelectProduct = (product: Product) => {
    setSearchTerm("");
    navigate(`/produto/${product.productId}`);
  };

  const goToSection = (section: string) => {
    setIsMobileOpen(false);
    if (location.pathname !== "/") {
      navigate(`/#${section}`);
      setTimeout(() => document.getElementById(section)?.scrollIntoView({ behavior: "smooth" }), 100);
      return;
    }
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
  };

  const navItem = "flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-pink-50 hover:text-[#FF6987]";

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-xl border-b border-pink-100 shadow-[0_4px_24px_rgba(255,105,135,0.08)]">
      <div className="hidden lg:block bg-gradient-to-r from-[#fff3f6] via-[#ffe8ee] to-[#fff3f6] border-b border-pink-100">
        <div className="max-w-[1500px] mx-auto h-10 px-8 flex items-center justify-between text-[13px] font-medium text-[#b94760]">
          <span className="flex items-center gap-2"><Gift className="w-4 h-4" /> Produtos feitos com amor <Heart className="w-3 h-3 fill-current" /></span>
          <span className="h-5 w-px bg-pink-200" />
          <span className="flex items-center gap-2"><Truck className="w-4 h-4" /> Enviamos para todo o Brasil <Heart className="w-3 h-3 fill-current" /></span>
          <span className="h-5 w-px bg-pink-200" />
          <span className="flex items-center gap-2"><LockKeyhole className="w-4 h-4" /> Compra 100% segura <Heart className="w-3 h-3 fill-current" /></span>
          <span className="h-5 w-px bg-pink-200" />
          <span className="flex items-center gap-2"><Star className="w-4 h-4" /> Atendimento personalizado <Heart className="w-3 h-3 fill-current" /></span>
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto px-4 md:px-8">
        <div className="min-h-[92px] flex items-center gap-4 lg:gap-8">
          <Link to="/" className="shrink-0" aria-label="Ir para o início">
            <img src={logo1} alt="AnaCraft Ateliê" className="w-28 md:w-36 lg:w-44 h-20 object-contain" />
          </Link>

          <div className="hidden lg:flex flex-1 flex-col gap-3">
            <nav className="flex items-center justify-center gap-1">
              <button onClick={() => navigate("/")} className={`${navItem} ${location.pathname === "/" ? "bg-pink-50 text-[#FF6987]" : ""}`}><Home className="w-4 h-4" /> Início</button>
              <button onClick={() => goToSection("produtos")} className={navItem}><Package className="w-4 h-4" /> Produtos</button>
              <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <button onClick={() => goToSection("categorias")} className={navItem}><Grid2X2 className="w-4 h-4" /> Categorias <ChevronDown className="w-3.5 h-3.5" /></button>
                {isCategoryOpen && <CategoryDropdown />}
              </div>
              <button onClick={() => navigate("/catalogo")} className={`${navItem} ${location.pathname === "/catalogo" ? "bg-pink-50 text-[#FF6987]" : ""}`}><BookOpen className="w-4 h-4" /> Catálogo</button>
              <button onClick={() => navigate("/sobre")} className={`${navItem} ${location.pathname === "/sobre" ? "bg-pink-50 text-[#FF6987]" : ""}`}><Users className="w-4 h-4" /> Sobre Nós</button>
              <a href="https://www.instagram.com/atelie_anacraft/" target="_blank" rel="noreferrer" className={navItem}><MessageCircle className="w-4 h-4" /> Contato</a>
            </nav>

            <div className="relative w-full max-w-3xl mx-auto">
              <div className="relative flex items-center h-11 rounded-full border border-pink-200 bg-white shadow-sm focus-within:border-[#FF6987] focus-within:ring-2 focus-within:ring-pink-100">
                <Search className="absolute left-4 w-4 h-4 text-slate-400" />
                <input type="search" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="O que você está procurando hoje? (ex: caneca, caderno, chaveiro...)" className="w-full h-full pl-11 pr-28 rounded-full bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400" />
                {searchTerm && <button type="button" onClick={() => setSearchTerm("")} aria-label="Limpar busca" className="absolute right-16 p-1 text-slate-400 hover:text-slate-700"><X className="w-4 h-4" /></button>}
                <button type="button" aria-label="Pesquisar" className="absolute right-1.5 w-12 h-8 rounded-full bg-[#FF6987] text-white flex items-center justify-center hover:bg-pink-600 transition-colors"><Search className="w-4 h-4" /></button>
              </div>
              {searchTerm.trim() && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-pink-100 p-3 max-h-80 overflow-y-auto">
                  <p className="text-[11px] font-bold text-gray-400 mb-2 uppercase tracking-wider px-1">Resultados ({filteredProducts.length})</p>
                  {filteredProducts.length ? filteredProducts.map((product) => (
                    <button key={product.productId} onClick={() => handleSelectProduct(product)} className="flex items-center gap-3 p-2 rounded-xl hover:bg-pink-50 text-left w-full group">
                      <img src={product.imageUrl} alt={product.name} className="w-10 h-10 object-cover rounded-lg border border-pink-100" />
                      <div className="min-w-0"><p className="text-xs font-semibold text-gray-800 truncate group-hover:text-[#FF6987]">{product.name}</p><span className="text-xs text-[#FF6987] font-bold">R$ {product.price.toFixed(2).replace(".", ",")}</span></div>
                    </button>
                  )) : <p className="text-xs text-gray-500 text-center py-4">Nenhum produto encontrado.</p>}
                </div>
              )}
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2 md:gap-4">
            <button onClick={openFavorites} aria-label="Abrir favoritos" className="relative flex flex-col items-center text-slate-700 hover:text-[#FF6987] transition-colors">
              <Heart className="w-6 h-6" />
              <span className="hidden lg:block text-[10px] mt-1">Favoritos</span>
              {totalFavorites > 0 && <span className="absolute -top-2 -right-2 min-w-4 h-4 px-1 rounded-full bg-[#FF6987] text-white text-[9px] font-bold flex items-center justify-center">{totalFavorites}</span>}
            </button>
            <button onClick={openCart} aria-label="Abrir carrinho" className="relative flex flex-col items-center text-slate-700 hover:text-[#FF6987] transition-colors">
              <ShoppingBag className="w-6 h-6" />
              <span className="hidden lg:block text-[10px] mt-1">Carrinho</span>
              {totalItems > 0 && <span className="absolute -top-2 -right-2 min-w-4 h-4 px-1 rounded-full bg-[#FF6987] text-white text-[9px] font-bold flex items-center justify-center">{totalItems}</span>}
            </button>
            <button type="button" onClick={() => setIsMobileOpen((open) => !open)} aria-label="Abrir menu" className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-pink-50">
              {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <div className="lg:hidden pb-3">
          <div className="relative flex items-center h-10 rounded-full border border-pink-200 bg-white">
            <Search className="absolute left-4 w-4 h-4 text-slate-400" />
            <input type="search" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Buscar produtos..." className="w-full h-full pl-11 pr-10 rounded-full bg-transparent outline-none text-sm" />
            {searchTerm && <button type="button" onClick={() => setSearchTerm("")} aria-label="Limpar busca" className="absolute right-3 text-slate-400"><X className="w-4 h-4" /></button>}
          </div>
          {searchTerm.trim() && (
            <div className="absolute left-4 right-4 mt-2 bg-white rounded-2xl shadow-xl border border-pink-100 p-3 max-h-72 overflow-y-auto z-50">
              {filteredProducts.length ? filteredProducts.map((product) => (
                <button key={product.productId} onClick={() => handleSelectProduct(product)} className="flex items-center gap-3 p-2 rounded-xl hover:bg-pink-50 text-left w-full">
                  <img src={product.imageUrl} alt={product.name} className="w-10 h-10 object-cover rounded-lg" />
                  <span className="text-sm text-slate-700">{product.name}</span>
                </button>
              )) : <p className="text-xs text-gray-500 text-center py-4">Nenhum produto encontrado.</p>}
            </div>
          )}
        </div>

        {isMobileOpen && (
          <nav className="lg:hidden border-t border-pink-100 py-3 grid grid-cols-2 gap-2">
            <button onClick={() => { navigate("/"); setIsMobileOpen(false); }} className={navItem}><Home className="w-4 h-4" /> Início</button>
            <button onClick={() => goToSection("produtos")} className={navItem}><Package className="w-4 h-4" /> Produtos</button>
            <button onClick={() => goToSection("categorias")} className={navItem}><Grid2X2 className="w-4 h-4" /> Categorias</button>
            <button onClick={() => { navigate("/catalogo"); setIsMobileOpen(false); }} className={navItem}><BookOpen className="w-4 h-4" /> Catálogo</button>
            <button onClick={() => { navigate("/sobre"); setIsMobileOpen(false); }} className={navItem}><Users className="w-4 h-4" /> Sobre Nós</button>
            <a href="https://www.instagram.com/atelie_anacraft/" target="_blank" rel="noreferrer" className={navItem}><MessageCircle className="w-4 h-4" /> Contato</a>
          </nav>
        )}
      </div>
    </header>
  );
};
