import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ShoppingBag,
  ArrowLeft,
  Check,
  Truck,
  ShieldCheck,
  Heart,
} from "lucide-react";
import { InstagramIcon } from "../components/InstagramIcon";
import { PRODUCTS } from "../data/products";
import type { CustomizationOption } from "../types";
import { useCart } from "../hooks/useCart";
import { useFavorites } from "../hooks/useFavorites";

export const ProductDetailPage = () => {
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const product = PRODUCTS.find(
    (p) => String(p.productId) === String(productId)
  );

  const [quantity, setQuantity] = useState<number>(product?.minQuantity || 1);
  const [customValues, setCustomValues] = useState<Record<string, string>>({});
  const [isAdded, setIsAdded] = useState(false);
  const [customizationError, setCustomizationError] = useState("");

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Produto não encontrado
        </h2>
        <p className="text-gray-500 text-sm">
          O item que você procura não está disponível em nosso catálogo.
        </p>
        <Link
          to="/"
          className="bg-[#b93857] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#982d47] transition-colors"
        >
          Voltar para a página inicial
        </Link>
      </div>
    );
  }

  const handleCustomChange = (optionId: string, value: string) => {
    setCustomValues((prev) => ({ ...prev, [optionId]: value }));
    setCustomizationError("");
  };

  const handleAddToCart = () => {
    const missing = product.customizationOptions.find(option => option.required && !customValues[option.id]?.trim());
    if (missing) {
      setCustomizationError(`Preencha o campo: ${missing.label}.`);
      document.getElementById(`custom-${missing.id}`)?.focus();
      return;
    }
    addToCart(product, quantity, customValues);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50/30 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate("/catalogo")}
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#b93857] transition-colors mb-6 group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Voltar</span>
        </button>

        <div className="bg-white rounded-3xl p-4 sm:p-6 xl:p-8 shadow-xl border border-pink-100/60 grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-10 items-start">
          <div className="flex flex-col gap-6">
            <div className="relative group overflow-hidden rounded-2xl bg-pink-50/50 border border-pink-100">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full aspect-square max-h-[520px] object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
              />
              <button
                onClick={() => toggleFavorite(product)}
                className="absolute top-4 right-4 p-3 rounded-full bg-white/80 backdrop-blur-md shadow-md hover:bg-white transition-colors cursor-pointer"
                title={
                  isFavorite(product.productId)
                    ? "Remover dos favoritos"
                    : "Adicionar aos favoritos"
                }
              >
                <Heart
                  className={`w-5 h-5 transition-colors ${
                    isFavorite(product.productId)
                      ? "fill-[#FF6987] text-[#b93857]"
                      : "text-gray-400"
                  }`}
                />
              </button>
            </div>

            <div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-3">
              <div className="bg-pink-50/60 border border-pink-100 p-4 rounded-2xl flex items-center gap-3">
                <Truck className="w-6 h-6 text-[#b93857] shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                    Prazo
                  </h4>
                  <p className="text-xs text-gray-600 mt-0.5">
                    {product.productionsDays} dias úteis p/ produção
                  </p>
                </div>
              </div>

              <div className="bg-pink-50/60 border border-pink-100 p-4 rounded-2xl flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-[#b93857] shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                    Garantia
                  </h4>
                  <p className="text-xs text-gray-600 mt-0.5">
                    Feito à mão com afeto
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-[#b93857] bg-pink-100/60 px-3 py-1 rounded-full">
                {product.category}
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-3">
                {product.name}
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-2 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="flex flex-wrap items-baseline gap-3 pb-4 border-b border-pink-100">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#b93857]">
                R$ {product.price.toFixed(2).replace(".", ",")}
              </span>
              {product.minQuantity > 1 && (
                <span className="text-xs text-gray-400 font-medium">
                  (Mínimo de {product.minQuantity} unidades)
                </span>
              )}
            </div>
            {product.customizationOptions?.length > 0 && (
              <div className="flex flex-col gap-4 py-2">
                <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Personalize seu produto
                </h3>
                {product.customizationOptions.map((option: CustomizationOption) => (
                  <div key={option.id} className="flex flex-col gap-1.5">
                    <label htmlFor={`custom-${option.id}`} className="text-sm font-semibold text-gray-700">
                      {option.label}{" "}
                      {option.required && <span className="text-red-500">*</span>}
                    </label>

                    {option.type === "select" && (
                      <select
                        id={`custom-${option.id}`}
                        value={customValues[option.id] || ""}
                        onChange={(e) =>
                          handleCustomChange(option.id, e.target.value)
                        }
                        className="w-full p-3 border border-pink-200 rounded-xl bg-white text-base focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all text-gray-700"
                      >
                        <option value="">Selecione uma opção...</option>
                        {option.options?.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    )}

                    {option.type === "text" && (
                      <input
                        type="text"
                        id={`custom-${option.id}`}
                        value={customValues[option.id] || ""}
                        placeholder="Digite a frase personalizada..."
                        onChange={(e) =>
                          handleCustomChange(option.id, e.target.value)
                        }
                        className="w-full p-3 border border-pink-200 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all text-gray-700"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
            {customizationError && (
              <p role="alert" className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                {customizationError}
              </p>
            )}

            <div className="flex flex-col xl:flex-row xl:flex-wrap items-stretch xl:items-center gap-4 pt-4">
              <div className="flex items-center justify-between border border-pink-200 rounded-full bg-white px-4 py-2 shrink-0">
                <button
                  aria-label="Diminuir quantidade"
                  disabled={quantity <= product.minQuantity}
                  onClick={() =>
                    setQuantity((prev) =>
                      Math.max(product.minQuantity || 1, prev - 1)
                    )
                  }
                  className="text-lg font-bold text-gray-500 hover:text-[#b93857] w-11 h-11 flex items-center justify-center cursor-pointer"
                >
                  -
                </button>
                <span className="px-4 text-base font-bold text-gray-800">
                  {quantity}
                </span>
                <button
                  aria-label="Aumentar quantidade"
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="text-lg font-bold text-gray-500 hover:text-[#b93857] w-11 h-11 flex items-center justify-center cursor-pointer"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`flex-1 py-3.5 px-6 rounded-full text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                  isAdded
                    ? "bg-emerald-500 text-white"
                    : "bg-[#b93857] hover:bg-[#982d47] text-white"
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-5 h-5 animate-bounce" />
                    <span>Adicionado!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>Adicionar ao Carrinho</span>
                  </>
                )}
              </button>

              <a
                href="https://www.instagram.com/atelie_anacraft/"
                aria-label="Tirar dúvidas pelo Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-12 p-3 border border-pink-300 rounded-full text-[#b93857] hover:bg-pink-50 flex items-center justify-center gap-2 text-sm font-bold cursor-pointer"
              >
                <InstagramIcon className="w-5 h-5" />
                <span>Tirar dúvidas</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};