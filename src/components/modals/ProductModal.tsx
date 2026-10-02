import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import type { Product, CustomizationOption } from "../../types";

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (item: {
    product: Product;
    customValues: Record<string, string>;
    quantity: number;
  }) => void;
}

export const ProductModal = ({
  product,
  onClose,
  onAddToCart,
}: ProductModalProps) => {
  const [quantity, setQuantity] = useState<number>(product.minQuantity || 1);
  const [customValues, setCustomValues] = useState<Record<string, string>>({});

  const handleCustomChange = (optionId: string, value: string) => {
    setCustomValues((prev) => ({ ...prev, [optionId]: value }));
  };

  const handleAddToCart = () => {
    onAddToCart({ product, customValues, quantity });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8">
      <div className="relative w-full md:w-[98%] max-w-[1400px] bg-[#FFF5F6] rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl overflow-y-auto max-h-[90dvh]">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-pink-100/50 cursor-pointer z-10"
        >
          <X className="w-7 h-7" />
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start mt-2">
          <div className="w-full flex flex-col gap-4">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full aspect-square max-h-[460px] object-cover rounded-2xl shadow-sm"
            />

            <div className="bg-white/60 rounded-2xl p-4 text-xs lg:text-sm text-gray-600 flex flex-col gap-1 border border-pink-100">
              <p>
                <strong>Prazo de produção:</strong> {product.productionsDays}{" "}
                dias úteis
              </p>
              <p>
                <strong>Quantidade mínima:</strong> {product.minQuantity}{" "}
                unidade(s)
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div>
              <span className="text-xs lg:text-sm uppercase tracking-wider text-pink-500 font-bold">
                {product.category}
              </span>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mt-1">
                {product.name}
              </h2>
              <p className="text-sm lg:text-base text-gray-600 mt-2 leading-relaxed">
                {product.description}
              </p>
            </div>

            <p className="text-3xl lg:text-4xl font-bold text-[#FF6987]">
              R$ {product.price.toFixed(2).replace(".", ",")}
            </p>
            <div className="flex flex-col gap-4 my-2">
              {product.customizationOptions?.map(
                (option: CustomizationOption) => (
                  <div key={option.id} className="flex flex-col gap-1.5">
                    <label className="text-xs lg:text-sm font-semibold text-gray-700">
                      {option.label}{" "}
                      {option.required && (
                        <span className="text-red-500">*</span>
                      )}
                    </label>

                    {option.type === "select" && (
                      <select
                        onChange={(e) =>
                          handleCustomChange(option.id, e.target.value)
                        }
                        className="w-full p-2.5 border border-pink-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
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
                        placeholder="Digite aqui..."
                        onChange={(e) =>
                          handleCustomChange(option.id, e.target.value)
                        }
                        className="w-full p-2.5 border border-pink-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                      />
                    )}

                    {option.type === "image" && (
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleCustomChange(
                            option.id,
                            e.target.files?.[0]?.name || "",
                          )
                        }
                        className="w-full text-xs text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-pink-100 file:text-pink-700 hover:file:bg-pink-200 cursor-pointer"
                      />
                    )}
                  </div>
                ),
              )}
            </div>
            <div className="flex flex-col xl:flex-row items-stretch gap-4 mt-2">
              <div className="flex items-center border border-pink-200 rounded-full bg-white px-4 py-1.5">
                <button
                  onClick={() =>
                    setQuantity((prev) =>
                      Math.max(product.minQuantity || 1, prev - 1),
                    )
                  }
                  className="px-2 text-xl font-bold text-gray-600 hover:text-pink-500 cursor-pointer"
                >
                  -
                </button>
                <span className="px-4 text-base font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="px-2 text-xl font-bold text-gray-600 hover:text-pink-500 cursor-pointer"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 bg-[#b93857] hover:bg-[#982d47] text-white py-3 px-6 rounded-full text-base font-semibold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                Adicionar ao Carrinho
              </button>

              <a
                href={`https://wa.me/?text=Olá! Tenho dúvidas sobre o produto: ${product.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border border-emerald-500 rounded-full text-emerald-600 hover:bg-emerald-50 transition-colors"
                title="Tirar dúvidas no WhatsApp"
              >
                <MessageCircle className="w-6 h-6 text-emerald-500" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
