import { useDialog } from "../hooks/useDialog";
import { ShoppingBag, X, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { useCart } from "../hooks/useCart";
import { Link } from "react-router-dom";

export const CartDrawer = () => {
  const { isCartOpen, closeCart, cart, removeFromCart, updateQuantity, subtotal, totalItems } = useCart();

  const dialogRef = useDialog(isCartOpen, closeCart);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden">
      <div 
        onClick={closeCart}
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="cart-title" tabIndex={-1} className="drawer bg-white shadow-2xl flex flex-col border-l border-pink-100">
          <div className="p-4 shrink-0 bg-pink-50/50 border-b border-pink-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#FF6987]" />
              <h2 id="cart-title" className="text-lg font-bold text-gray-800">Seu Carrinho</h2>
              <span className="bg-[#b93857] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            </div>
            <button
              onClick={closeCart}
              aria-label="Fechar painel"
              className="h-11 w-11 flex items-center justify-center text-gray-500 hover:text-gray-700 rounded-full hover:bg-pink-100/50 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-4 flex flex-col gap-4">
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
                  className="mt-2 bg-[#b93857] text-white px-6 py-2 rounded-full text-xs font-bold hover:bg-[#982d47] transition-colors shadow-sm cursor-pointer"
                >
                  Continuar Comprando
                </button>
              </div>
            ) : (
              cart.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-3 p-3 bg-pink-50/30 rounded-2xl border border-pink-100/60 relative group"
                >
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-xl border border-pink-100 shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-bold text-gray-800 line-clamp-2">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(index)}
                          className="text-gray-500 hover:text-red-600 h-11 w-11 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                          title="Remover item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      {Object.keys(item.customValues).length > 0 && (
                        <div className="mt-1 flex flex-col gap-0.5 text-sm text-gray-600 bg-white/80 p-1.5 rounded-lg border border-pink-100">
                          {Object.entries(item.customValues).map(([key, value]) => (
                            <span key={key} className="break-words">
                              <strong>{item.product.customizationOptions.find(option => option.id === key)?.label ?? key}:</strong> {value}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mt-2">
                      <span className="text-xs font-bold text-[#FF6987]">
                        R$ {item.totalPrice.toFixed(2).replace(".", ",")}
                      </span>

                      <div className="flex items-center border border-pink-200 rounded-full bg-white px-2 py-0.5">
                        <button
                          onClick={() => updateQuantity(index, item.quantity - 1)}
                          disabled={item.quantity <= item.product.minQuantity}
                          aria-label={`Diminuir quantidade de ${item.product.name}`}
                          className="text-gray-600 hover:text-[#b93857] w-11 h-11 flex items-center justify-center cursor-pointer"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-2 text-xs font-bold text-gray-700">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(index, item.quantity + 1)}
                          aria-label={`Aumentar quantidade de ${item.product.name}`}
                          className="text-gray-600 hover:text-[#b93857] w-11 h-11 flex items-center justify-center cursor-pointer"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          {cart.length > 0 && (
            <div className="p-4 shrink-0 border-t border-pink-100 bg-white flex flex-col gap-3 shadow-lg">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 font-medium">Subtotal</span>
                <span className="text-lg font-extrabold text-[#FF6987]">
                  R$ {subtotal.toFixed(2).replace(".", ",")}
                </span>
              </div>

              <p className="text-[11px] text-gray-400 text-center">
                Produção sob encomenda. Frete a combinar com o ateliê.
              </p>

              <Link
                to="/checkout"
                onClick={closeCart}
                className="w-full bg-[#b93857] hover:bg-[#982d47] text-white py-3 px-4 rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
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