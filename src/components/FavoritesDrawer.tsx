import { Heart, X, Trash2, ArrowRight } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";
import { useNavigate } from "react-router-dom";

export const FavoritesDrawer = () => {
  const { isFavoritesOpen, closeFavorites, favorites, toggleFavorite, totalFavorites } = useFavorites();
  const navigate = useNavigate();

  if (!isFavoritesOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        onClick={closeFavorites}
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-pink-100">
          
          {/* Cabeçalho */}
          <div className="p-5 bg-pink-50/50 border-b border-pink-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#FF6987] fill-[#FF6987]" />
              <h2 className="text-lg font-bold text-gray-800">Meus Favoritos</h2>
              <span className="bg-[#FF6987] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {totalFavorites}
              </span>
            </div>
            <button
              onClick={closeFavorites}
              className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-pink-100/50 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Lista de Favoritos */}
          <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
            {favorites.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center gap-3 text-gray-500 py-12">
                <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center text-[#FF6987]">
                  <Heart className="w-8 h-8" />
                </div>
                <p className="font-semibold text-gray-700">Sua lista de desejos está vazia 🌸</p>
                <p className="text-xs text-gray-400 max-w-xs">
                  Salve os produtos que você mais amou para acessar facilmente depois!
                </p>
                <button
                  onClick={closeFavorites}
                  className="mt-2 bg-[#FF6987] text-white px-6 py-2 rounded-full text-xs font-bold hover:bg-pink-600 transition-colors shadow-sm cursor-pointer"
                >
                  Explorar Produtos
                </button>
              </div>
            ) : (
              favorites.map((product) => (
                <div
                  key={product.productId}
                  className="flex gap-4 p-3 bg-pink-50/30 rounded-2xl border border-pink-100/60 relative group items-center"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-xl border border-pink-100 shrink-0"
                  />

                  <div className="flex-1 min-w-0 flex flex-col gap-1">
                    <h4 className="text-xs font-bold text-gray-800 truncate">
                      {product.name}
                    </h4>
                    <span className="text-xs font-bold text-[#FF6987]">
                      R$ {product.price.toFixed(2).replace(".", ",")}
                    </span>

                    <button
                      onClick={() => {
                        closeFavorites();
                        navigate(`/produto/${product.productId}`);
                      }}
                      className="text-[11px] font-semibold text-gray-600 hover:text-[#FF6987] flex items-center gap-1 mt-1 transition-colors cursor-pointer"
                    >
                      <span>Ver Detalhes</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  <button
                    onClick={() => toggleFavorite(product)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                    title="Remover dos favoritos"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
};