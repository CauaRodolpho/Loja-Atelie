import { ShoppingBag, Heart, Search, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo1 from "../assets/logo1.png";
import { CategoryDropdown } from "../components/CategoryDropdown";
import { useRef, useState } from "react";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";

// Importação com o nome em maiúsculas conforme seu arquivo de dados
import { PRODUCTS } from "../data/products";

export const Header = () => {
  const { totalItems, openCart } = useCart();

  const { totalFavorites, openFavorites } = useFavorites();

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsCategoryOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsCategoryOpen(false);
    }, 50);
  };

  const filteredProducts = searchTerm.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.category.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : [];

  const handleSelectProduct = (product: any) => {
    const id = product.id || product.productId;
    if (!id) return;

    setSearchTerm("");
    navigate(`/produto/${id}`);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-pink-100 shadow-sm py-2">
      <div className="max-w-7xl mx-auto px-4 md:px-10 flex flex-col items-center gap-1 relative">
        {/* PRIMEIRA LINHA: Logo (Absoluta) | Menu Alinhado | Ícones de Ação */}
        <div className="w-full flex items-center justify-between gap-4 h-10">
          {/* Container da Logo com Posicionamento Absoluto */}
          <div className="relative w-28 h-10 shrink-0">
            <Link
              to="/"
              onClick={() => {
                if (window.location.hash) {
                  window.history.pushState(
                    "",
                    document.title,
                    window.location.pathname,
                  );
                }
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="absolute -top-3 left-0 cursor-pointer group transition-transform hover:scale-105 z-10"
            >
              <img
                src={logo1}
                alt="Logo AnaCraft"
                className="w-28 h-28 object-contain drop-shadow-sm"
              />
            </Link>
          </div>

          {/* Menu de Navegação */}
          <nav className="flex items-center gap-8">
            <button
              onClick={() => {
                if (window.location.pathname !== "/") {
                  window.location.href = "/#produtos";
                  return;
                }
                if (window.location.hash) {
                  window.history.pushState(
                    "",
                    document.title,
                    window.location.pathname,
                  );
                }
                document
                  .getElementById("produtos")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="hover:text-brand-hover transition-colors font-medium text-gray-700 cursor-pointer text-base"
            >
              Produtos
            </button>

            <div
              className="relative py-1"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => {
                  if (window.location.pathname !== "/") {
                    window.location.href = "/#categorias";
                    return;
                  }
                  if (window.location.hash) {
                    window.history.pushState(
                      "",
                      document.title,
                      window.location.pathname,
                    );
                  }
                  document
                    .getElementById("categorias")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="hover:text-brand-hover transition-colors font-medium text-gray-700 cursor-pointer text-base"
              >
                Categorias
              </button>

              {isCategoryOpen && <CategoryDropdown />}
            </div>

            <button
              onClick={() => {
                if (window.location.pathname !== "/catalogo") {
                  window.location.href = "/catalogo";
                  return;
                }
                if (window.location.search || window.location.hash) {
                  window.history.pushState(
                    "",
                    document.title,
                    window.location.pathname,
                  );
                }
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="hover:text-brand-hover transition-colors font-medium text-gray-700 cursor-pointer text-base"
            >
              Catálogo
            </button>

            <button
              onClick={() => {
                if (window.location.pathname !== "/sobre") {
                  window.location.href = "/sobre";
                  return;
                }
                if (window.location.hash) {
                  window.history.pushState(
                    "",
                    document.title,
                    window.location.pathname,
                  );
                }
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="hover:text-brand-hover transition-colors font-medium text-gray-700 cursor-pointer text-base"
            >
              Sobre Nós
            </button>
          </nav>

          {/* Ações (Favoritos e Carrinho) Alinhados no centro da linha */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={openFavorites}
              className="p-1.5 text-gray-600 hover:text-[#FF6987] transition-colors relative cursor-pointer flex items-center justify-center"
              title="Abrir Favoritos"
            >
              <Heart className="w-5 h-5" />
              {totalFavorites > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FF6987] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                  {totalFavorites}
                </span>
              )}
            </button>

            <button
              onClick={openCart}
              className="p-1.5 text-gray-600 hover:text-brand-hover transition-colors relative cursor-pointer flex items-center justify-center"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-[#FF6987] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            </button>
          </div>
        </div>

        {/* SEGUNDA LINHA: Barra de Pesquisa */}
        <div className="relative w-full max-w-xl mt-1">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="O que você está procurando hoje? (ex: caneca, caderno, chaveiro...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-9 py-1.5 text-sm rounded-full border border-pink-200 focus:outline-none focus:border-[#FF6987] bg-pink-50/40 text-gray-700 placeholder:text-gray-400 shadow-inner transition-all"
            />
            <Search className="w-4 h-4 absolute left-3.5 text-gray-400 pointer-events-none" />

            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Dropdown de Resultados da Pesquisa */}
          {searchTerm.trim() !== "" && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-pink-100 p-3 z-50 max-h-80 overflow-y-auto">
              <p className="text-[11px] font-bold text-gray-400 mb-2 uppercase tracking-wider px-1">
                Resultados Encontrados ({filteredProducts.length})
              </p>

              {filteredProducts.length > 0 ? (
                <div className="flex flex-col gap-1">
                  {filteredProducts.map((prod) => (
                    <button
                      key={prod.productId}
                      onClick={() => handleSelectProduct(prod)}
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-pink-50 transition-colors text-left w-full cursor-pointer group"
                    >
                      <img
                        src={prod.imageUrl}
                        alt={prod.name}
                        className="w-10 h-10 object-cover rounded-lg border border-pink-100 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h5 className="text-xs font-semibold text-gray-800 truncate group-hover:text-[#FF6987]">
                          {prod.name}
                        </h5>
                        <span className="text-xs text-[#FF6987] font-bold">
                          R$ {prod.price.toFixed(2).replace(".", ",")}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-500 text-center py-4">
                  Nenhum produto encontrado com esse nome 🌸
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
