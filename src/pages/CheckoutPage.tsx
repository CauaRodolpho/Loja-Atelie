import { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  ArrowLeft,
  Info,
  MapPin,
  User,
 
} from "lucide-react";

export const CheckoutPage = () => {
  const { cart, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  // Estados do Formulário de Checkout
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    cep: "",
    address: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    observations: "",
  });

  const [deliveryMethod, setDeliveryMethod] = useState<"delivery" | "pickup">(
    "delivery",
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFinishOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) return;

    // Prepara os dados do pedido para exibir na tela de sucesso/README
    const orderDetails = {
      cart: [...cart],
      subtotal,
      formData,
      deliveryMethod,
    };

    // Limpa o carrinho
    clearCart();

    // Redireciona para a página /pedido-confirmado enviando os dados
    navigate("/pedido-confirmado", { state: orderDetails });
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
        <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center text-[#FF6987] mb-4">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          Seu carrinho está vazio
        </h2>
        <p className="text-gray-500 text-sm max-w-md mt-2">
          Adicione alguns produtos ao seu carrinho antes de prosseguir para o
          checkout.
        </p>
        <Link
          to="/catalogo"
          className="mt-6 bg-[#FF6987] hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-full shadow-md transition-all text-sm"
        >
          Explorar Produtos
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-50/30 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        {/* 🚨 BANNER DE AVISO: PROJETO DE PORTFÓLIO FICTÍCIO */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 sm:p-5 flex items-start gap-3 shadow-sm">
          <Info className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-amber-900 leading-relaxed">
            <strong className="font-bold text-amber-950 block text-sm mb-0.5">
              ⚠️ Nota de Portfólio / Demonstration Project
            </strong>
            Este e-commerce é um{" "}
            <strong>
              projeto fictício de demonstração para portfólio de desenvolvimento
              web
            </strong>
            . Nenhuma cobrança real será efetuada e nenhum produto
            comercializado será entregue.
          </div>
        </div>

        {/* Botão de Voltar */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#FF6987] transition-colors group cursor-pointer w-fit"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Voltar para a loja</span>
        </button>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800">
          Finalizar Pedido 🌸
        </h1>

        <form
          onSubmit={handleFinishOrder}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        >
          {/* COLUNA DA ESQUERDA: Formulário de Dados e Endereço */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Seção 1: Dados Pessoais */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-pink-100/60 flex flex-col gap-4">
              <div className="flex items-center gap-2 pb-3 border-b border-pink-100">
                <User className="w-5 h-5 text-[#FF6987]" />
                <h3 className="text-base font-bold text-gray-800">
                  Seus Dados
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-gray-700">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Digite seu nome completo"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 border border-pink-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all text-gray-700"
                  />
                </div>

                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-gray-700">
                    WhatsApp / Celular *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="(11) 99999-9999"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-3 border border-pink-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all text-gray-700"
                  />
                </div>
              </div>
            </div>

            {/* Seção 2: Método de Entrega & Endereço */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-pink-100/60 flex flex-col gap-4">
              <div className="flex items-center gap-2 pb-3 border-b border-pink-100">
                <MapPin className="w-5 h-5 text-[#FF6987]" />
                <h3 className="text-base font-bold text-gray-800">Entrega</h3>
              </div>

              {/* Opções Entrega / Retirada */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDeliveryMethod("delivery")}
                  className={`p-3 rounded-2xl border text-xs font-bold transition-all text-center cursor-pointer ${
                    deliveryMethod === "delivery"
                      ? "border-[#FF6987] bg-pink-50 text-[#FF6987] shadow-xs"
                      : "border-pink-100 bg-white text-gray-600 hover:bg-pink-50/50"
                  }`}
                >
                  🚚 Receber no Endereço
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryMethod("pickup")}
                  className={`p-3 rounded-2xl border text-xs font-bold transition-all text-center cursor-pointer ${
                    deliveryMethod === "pickup"
                      ? "border-[#FF6987] bg-pink-50 text-[#FF6987] shadow-xs"
                      : "border-pink-100 bg-white text-gray-600 hover:bg-pink-50/50"
                  }`}
                >
                  🏬 Retirar no Ateliê
                </button>
              </div>

              {/* Campos do Endereço */}
              {deliveryMethod === "delivery" && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 animate-in fade-in duration-200">
                  <div className="flex flex-col gap-1.5 sm:col-span-1">
                    <label className="text-xs font-semibold text-gray-700">
                      CEP
                    </label>
                    <input
                      type="text"
                      name="cep"
                      placeholder="00000-000"
                      value={formData.cep}
                      onChange={handleChange}
                      className="w-full p-2.5 border border-pink-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-pink-300 text-gray-700"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label className="text-xs font-semibold text-gray-700">
                      Rua / Logradouro *
                    </label>
                    <input
                      type="text"
                      name="address"
                      required={deliveryMethod === "delivery"}
                      placeholder="Ex: Rua das Flores"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full p-2.5 border border-pink-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-pink-300 text-gray-700"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 sm:col-span-1">
                    <label className="text-xs font-semibold text-gray-700">
                      Número *
                    </label>
                    <input
                      type="text"
                      name="number"
                      required={deliveryMethod === "delivery"}
                      placeholder="123"
                      value={formData.number}
                      onChange={handleChange}
                      className="w-full p-2.5 border border-pink-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-pink-300 text-gray-700"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label className="text-xs font-semibold text-gray-700">
                      Complemento
                    </label>
                    <input
                      type="text"
                      name="complement"
                      placeholder="Apto 42, Bloco B"
                      value={formData.complement}
                      onChange={handleChange}
                      className="w-full p-2.5 border border-pink-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-pink-300 text-gray-700"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 sm:col-span-1">
                    <label className="text-xs font-semibold text-gray-700">
                      Bairro
                    </label>
                    <input
                      type="text"
                      name="neighborhood"
                      placeholder="Centro"
                      value={formData.neighborhood}
                      onChange={handleChange}
                      className="w-full p-2.5 border border-pink-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-pink-300 text-gray-700"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label className="text-xs font-semibold text-gray-700">
                      Cidade / UF
                    </label>
                    <input
                      type="text"
                      name="city"
                      placeholder="São Paulo / SP"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full p-2.5 border border-pink-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-pink-300 text-gray-700"
                    />
                  </div>
                </div>
              )}

              {/* Observações */}
              <div className="flex flex-col gap-1.5 pt-2">
                <label className="text-xs font-semibold text-gray-700">
                  Observações do Pedido
                </label>
                <textarea
                  name="observations"
                  rows={2}
                  placeholder="Instruções especiais de entrega ou personalização..."
                  value={formData.observations}
                  onChange={handleChange}
                  className="w-full p-2.5 border border-pink-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-pink-300 text-gray-700"
                />
              </div>
            </div>
          </div>

          {/* COLUNA DA DIREITA: Resumo dos Itens e Ação Final */}
          <div className="lg:col-span-5 flex flex-col gap-6 sticky top-24">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-pink-100/60 flex flex-col gap-4">
              <h3 className="text-base font-bold text-gray-800 pb-3 border-b border-pink-100">
                Resumo do Pedido ({cart.length})
              </h3>

              {/* Lista compacta dos itens */}
              <div className="flex flex-col gap-3 max-h-72 overflow-y-auto pr-1">
                {cart.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 py-2 border-b border-pink-50 last:border-none"
                  >
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded-lg border border-pink-100 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-gray-800 truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-gray-500">
                        Qtd: {item.quantity}
                      </p>

                      {/* Personalizações solicitadas */}
                      {Object.keys(item.customValues).length > 0 && (
                        <div className="text-[10px] text-gray-400 truncate">
                          {Object.values(item.customValues).join(", ")}
                        </div>
                      )}
                    </div>
                    <span className="text-xs font-bold text-[#FF6987] shrink-0">
                      R$ {item.totalPrice.toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                ))}
              </div>

              {/* Valores Totais */}
              <div className="flex flex-col gap-2 pt-3 border-t border-pink-100 text-sm">
                <div className="flex justify-between text-gray-600 text-xs">
                  <span>Subtotal</span>
                  <span>R$ {subtotal.toFixed(2).replace(".", ",")}</span>
                </div>
                <div className="flex justify-between text-gray-600 text-xs">
                  <span>Frete</span>
                  <span className="text-emerald-600 font-semibold">
                    A combinar via WhatsApp
                  </span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-gray-800 pt-2 border-t border-pink-100">
                  <span>Total</span>
                  <span className="text-[#FF6987]">
                    R$ {subtotal.toFixed(2).replace(".", ",")}
                  </span>
                </div>
              </div>

              {/* Botão de Enviar via WhatsApp */}
              <button
                type="submit"
                className="w-full bg-[#FF6987] hover:bg-pink-600 text-white py-3.5 px-6 rounded-full text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Confirmar e Simular Pedido</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
