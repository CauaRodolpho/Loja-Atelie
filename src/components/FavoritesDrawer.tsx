import { useDialog } from "../hooks/useDialog";
import { Heart, X, Trash2, ArrowRight } from "lucide-react";
import { useFavorites } from "../hooks/useFavorites";
import { useNavigate } from "react-router-dom";

export const FavoritesDrawer = () => {
  const { isFavoritesOpen, closeFavorites, favorites, toggleFavorite, totalFavorites } = useFavorites();
  const navigate = useNavigate();

  const dialogRef = useDialog(isFavoritesOpen, closeFavorites);

  if (!isFavoritesOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden">
      <div 
        onClick={closeFavorites}
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="favorites-title" tabIndex={-1} className="drawer bg-white shadow-2xl flex flex-col border-l border-pink-100">
          <div className="p-4 shrink-0 bg-pink-50/50 border-b border-pink-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#FF6987] fill-[#FF6987]" />
              <h2 id="favorites-title" className="text-lg font-bold text-gray-800">Meus Favoritos</h2>
              <span className="bg-[#b93857] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {totalFavorites}
              </span>
            </div>
            <button
              onClick={closeFavorites}
              aria-label="Fechar painel"
              className="h-11 w-11 flex items-center justify-center text-gray-500 hover:text-gray-700 rounded-full hover:bg-pink-100/50 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-4 flex flex-col gap-4">
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
                  className="mt-2 bg-[#b93857] text-white px-6 py-2 rounded-full text-xs font-bold hover:bg-[#982d47] transition-colors shadow-sm cursor-pointer"
                >
                  Explorar Produtos
                </button>
              </div>
            ) : (
              favorites.map((product) => (
                <div
                  key={product.productId}
                  className="flex gap-3 p-3 bg-pink-50/30 rounded-2xl border border-pink-100/60 relative group items-center"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-xl border border-pink-100 shrink-0"
                  />

                  <div className="flex-1 min-w-0 flex flex-col gap-1">
                    <h4 className="text-sm font-bold text-gray-800 line-clamp-2">
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
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => toggleFavorite(product)}
                    className="p-2 text-gray-500 hover:text-red-600 h-11 w-11 flex items-center justify-center transition-colors cursor-pointer"
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