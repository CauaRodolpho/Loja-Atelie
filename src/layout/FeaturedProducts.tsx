import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Sparkles, Star } from "lucide-react";
import { PRODUCTS } from "../data/products";
import { useFavorites } from "../context/FavoritesContext";

export const FeaturedProducts = () => {
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <section id="produtos" className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="text-center flex flex-col items-center mb-14">
        <span className="relative inline-flex items-center gap-1 font-handwritten text-2xl text-[#FF6987] mb-2">
          <Sparkles className="w-5 h-5" /> Seleção Especial <Sparkles className="w-5 h-5" />
        </span>
        <div className="relative inline-block mt-1">
          <div className="bg-[#FF6987] text-white px-8 py-2.5 rounded-full shadow-md -rotate-1 hover:rotate-0 transition-transform duration-300">
            <h2 className="text-2xl md:text-4xl font-bold font-handwritten tracking-wide">Melhores Produtos</h2>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {PRODUCTS.map((product) => {
          const favorite = isFavorite(product.productId);
          return (
            <article key={product.productId} className="group bg-white/90 rounded-3xl p-4 border-2 border-pink-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between relative">
              <span className="absolute top-7 left-7 z-10 bg-[#FF6987] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm capitalize">{product.category}</span>
              <button type="button" onClick={() => toggleFavorite(product)} aria-label={favorite ? `Remover ${product.name} dos favoritos` : `Adicionar ${product.name} aos favoritos`} className="absolute top-7 right-7 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm hover:scale-110 transition-all duration-200">
                <Heart className={`w-4 h-4 ${favorite ? "fill-[#FF6987] text-[#FF6987]" : "text-pink-400"}`} />
              </button>
              <Link to={`/produto/${product.productId}`} className="relative w-full h-64 rounded-2xl overflow-hidden bg-pink-50/50 mb-4">
                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </Link>
              <div className="px-2 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                    <span className="capitalize">{product.category}</span>
                    <div className="flex items-center gap-0.5 text-amber-400"><Star className="w-3.5 h-3.5 fill-current" /><span className="text-gray-600 font-medium ml-1">5.0</span></div>
                  </div>
                  <h3 className="font-handwritten text-2xl font-bold text-gray-800 leading-snug">{product.name}</h3>
                </div>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-pink-100/60 gap-3">
                  <span className="text-2xl font-bold text-[#FF6987]">R$ {product.price.toFixed(2).replace(".", ",")}</span>
                  <Link to={`/produto/${product.productId}`} className="flex items-center gap-2 bg-[#FF6987] hover:bg-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-300">
                    <ShoppingBag className="w-4 h-4" /> Ver Detalhes
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};