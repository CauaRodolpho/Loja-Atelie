import { ShoppingBag, X, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export const CartDrawer = () => {
  const { isCartOpen, closeCart, cart, removeFromCart, updateQuantity, subtotal, totalItems } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay de fundo */}
      <div 
        onClick={closeCart}
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-pink-100">
          
          {/* Cabeçalho */}
          <div className="p-5 bg-pink-50/50 border-b border-pink-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#FF6987]" />
              <h2 className="text-lg font-bold text-gray-800">Seu Carrinho</h2>
              <span className="bg-[#FF6987] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-pink-100/50 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Lista de Itens */}
          <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center gap-3 text-gray-500 py-12">
                <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center text-[#FF6987]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="font-semibold text-gray-700">Seu carrinho está vazio 🌸</p>
                <p className="text-xs text-gray-400 max-w-xs">
                  Navegue pelo catálogo e adicione os mimos perfeitos para você!
                </p>
                <button
                  onClick={closeCart}
                  className="mt-2 bg-[#FF6987] text-white px-6 py-2 rounded-full text-xs font-bold hover:bg-pink-600 transition-colors shadow-sm cursor-pointer"
                >
                  Continuar Comprando
                </button>
              </div>
            ) : (
              cart.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-3 bg-pink-50/30 rounded-2xl border border-pink-100/60 relative group"
                >
                  {/* Imagem do Produto */}
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-xl border border-pink-100 shrink-0"
                  />

                  {/* Informações do Produto */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-gray-800 truncate">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(index)}
                          className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer shrink-0"
                          title="Remover item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Personalizações */}
                      {Object.keys(item.customValues).length > 0 && (
                        <div className="mt-1 flex flex-col gap-0.5 text-[11px] text-gray-500 bg-white/80 p-1.5 rounded-lg border border-pink-100">
                          {Object.entries(item.customValues).map(([key, value]) => (
                            <span key={key} className="truncate">
                              <strong className="capitalize">{key}:</strong> {value}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Preço e Quantidade */}
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs font-bold text-[#FF6987]">
                        R$ {item.totalPrice.toFixed(2).replace(".", ",")}
                      </span>

                      <div className="flex items-center border border-pink-200 rounded-full bg-white px-2 py-0.5">
                        <button
                          onClick={() => updateQuantity(index, item.quantity - 1)}
                          className="text-gray-500 hover:text-[#FF6987] p-0.5 cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-gray-700">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(index, item.quantity + 1)}
                          className="text-gray-500 hover:text-[#FF6987] p-0.5 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Rodapé */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-pink-100 bg-white flex flex-col gap-3 shadow-lg">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 font-medium">Subtotal</span>
                <span className="text-lg font-extrabold text-[#FF6987]">
                  R$ {subtotal.toFixed(2).replace(".", ",")}
                </span>
              </div>

              <p className="text-[11px] text-gray-400 text-center">
                Prazo de produção e frete calculados na finalização do pedido.
              </p>

              <Link
                to="/checkout"
                onClick={closeCart}
                className="w-full bg-[#FF6987] hover:bg-pink-600 text-white py-3 px-4 rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Finalizar Pedido</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};