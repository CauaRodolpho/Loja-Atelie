import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  Code2,
  Layers,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  Laptop,
} from "lucide-react";

// Componentes SVG para GitHub e LinkedIn para evitar erro de importação no lucide-react
const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

const LinkedinIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

export const OrderSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state;

  const [orderNumber] = useState(
    () => `AC-${Math.floor(100000 + Math.random() * 900000)}`,
  );

  useEffect(() => {
    if (!orderData) {
      navigate("/");
    }
  }, [orderData, navigate]);

  if (!orderData) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50/50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        {/* CARD 1: CONFIRMAÇÃO DO PEDIDO */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-pink-100 flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-pink-300 via-[#FF6987] to-pink-300" />

          <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-4 animate-bounce">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <span className="text-xs font-bold uppercase tracking-widest text-[#FF6987] bg-pink-100/60 px-3 py-1 rounded-full mb-2">
            Pedido Simulado #{orderNumber}
          </span>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800">
            Pedido Recebido com Sucesso! 🌸
          </h1>

          <p className="text-gray-500 text-sm max-w-md mt-2">
            Obrigado por testar o fluxo de compra do{" "}
            <strong>AnaCraft Ateliê</strong>. Abaixo está o resumo completo dos
            itens simulados.
          </p>

          <div className="w-full bg-pink-50/40 rounded-2xl p-4 sm:p-6 mt-6 border border-pink-100 text-left flex flex-col gap-4">
            <div className="flex justify-between items-center pb-3 border-b border-pink-100">
              <span className="text-xs font-bold text-gray-700 uppercase">
                Cliente:
              </span>
              <span className="text-xs font-semibold text-gray-800">
                {orderData.formData.name || "Cliente Fictício"}
              </span>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold text-gray-700 uppercase">
                Itens do Pedido:
              </span>
              {orderData.cart.map((item: any, idx: number) => (
                <div
                  key={idx}
                  className="flex justify-between items-center text-xs text-gray-700 bg-white p-2.5 rounded-xl border border-pink-100/60"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-10 h-10 object-cover rounded-lg shrink-0"
                    />
                    <div className="truncate">
                      <p className="font-bold truncate">{item.product.name}</p>
                      <p className="text-[10px] text-gray-400">
                        Qtd: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-[#FF6987] shrink-0">
                    R$ {item.totalPrice.toFixed(2).replace(".", ",")}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-pink-100 text-sm">
              <span className="font-bold text-gray-700">
                Valor Total Simulado:
              </span>
              <span className="text-lg font-extrabold text-[#FF6987]">
                R$ {orderData.subtotal.toFixed(2).replace(".", ",")}
              </span>
            </div>
          </div>
        </div>

        {/* CARD 2: DOCUMENTAÇÃO TÉCNICA / README */}
        {/* 💻 CARD 2: DOCUMENTAÇÃO TÉCNICA / README TURBINADO */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-800 flex flex-col gap-8 relative overflow-hidden">
          {/* Cabeçalho do README */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-800 flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-pink-500/10 rounded-2xl border border-pink-500/20 text-[#FF6987]">
                <Code2 className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  Project Readme & Architecture Overview
                  <Sparkles className="w-4 h-4 text-amber-400" />
                </h2>
                <p className="text-xs text-slate-400">
                  Ateliê AnaCraft — E-commerce de Produtos Artesanais
                  Personalizados
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700 text-[11px] font-mono text-pink-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Production Ready
            </div>
          </div>

          {/* Visão Geral da Solução */}
          <div className="flex flex-col gap-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#FF6987] flex items-center gap-2">
              🎯 Sobre o Projeto
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              O <strong>AnaCraft Ateliê</strong> é uma SPA (Single Page
              Application) e-commerce desenvolvida do zero para oferecer uma
              experiência de compra fluida e intuitiva em produtos artesanais. O
              principal desafio técnico superado foi gerenciar a{" "}
              <strong>alta complexidade de personalização dos produtos</strong>{" "}
              (inputs de texto, seletores e uploads de imagens), agrupando
              variações dinâmicas no estado global sem comprometer a performance
              de renderização.
            </p>
          </div>

          {/* Tech Stack com Tags Destacadas */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#FF6987]">
              🛠️ Tech Stack & Ferramentas
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-slate-800/60 p-3.5 rounded-2xl border border-slate-700/80 flex flex-col gap-1">
                <span className="text-xs font-bold text-pink-300">
                  React 18 + Vite
                </span>
                <span className="text-[10px] text-slate-400">
                  Arquitetura modular baseada em componentes reutilizáveis
                </span>
              </div>
              <div className="bg-slate-800/60 p-3.5 rounded-2xl border border-slate-700/80 flex flex-col gap-1">
                <span className="text-xs font-bold text-blue-300">
                  TypeScript
                </span>
                <span className="text-[10px] text-slate-400">
                  Tipagem estática estrita (Interfaces para Produtos, Carrinho e
                  Formulários)
                </span>
              </div>
              <div className="bg-slate-800/60 p-3.5 rounded-2xl border border-slate-700/80 flex flex-col gap-1">
                <span className="text-xs font-bold text-cyan-300">
                  Tailwind CSS
                </span>
                <span className="text-[10px] text-slate-400">
                  Design System responsivo, utilitários flex/grid e animações
                </span>
              </div>
              <div className="bg-slate-800/60 p-3.5 rounded-2xl border border-slate-700/80 flex flex-col gap-1">
                <span className="text-xs font-bold text-purple-300">
                  React Router v6
                </span>
                <span className="text-[10px] text-slate-400">
                  Navegação SPA client-side com parâmetros dinâmicos
                  (`:productId`)
                </span>
              </div>
            </div>
          </div>

          {/* Destaques de Engenharia e Boas Práticas */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#FF6987]">
              💡 Destaques de Engenharia & UX/UI
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
              <div className="bg-slate-800/40 p-3.5 rounded-xl border border-slate-800 flex items-start gap-3">
                <Layers className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-bold mb-0.5">
                    Gerenciamento de Estado Global com Context API
                  </strong>
                  <p className="text-[11px] text-slate-400">
                    `CartContext` centralizado com sincronização automática no
                    `localStorage` para persistência dos itens mesmo após
                    recarregar a página.
                  </p>
                </div>
              </div>

              <div className="bg-slate-800/40 p-3.5 rounded-xl border border-slate-800 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-bold mb-0.5">
                    Algoritmo de Identificação de Variações
                  </strong>
                  <p className="text-[11px] text-slate-400">
                    O carrinho diferencia o mesmo produto com opções de
                    personalização distintas (ex: caneca com nome "Ana" vs
                    "Carlos"), criando chaves únicas no estado.
                  </p>
                </div>
              </div>

              <div className="bg-slate-800/40 p-3.5 rounded-xl border border-slate-800 flex items-start gap-3">
                <Laptop className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-bold mb-0.5">
                    Busca Instantânea & Filtros no Header
                  </strong>
                  <p className="text-[11px] text-slate-400">
                    Pesquisa performática em tempo real no Header com resultados
                    em dropdown flutuante e navegação direta para a rota do
                    produto.
                  </p>
                </div>
              </div>

              <div className="bg-slate-800/40 p-3.5 rounded-xl border border-slate-800 flex items-start gap-3">
                <ShoppingBag className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-bold mb-0.5">
                    Mobile First & Acessibilidade
                  </strong>
                  <p className="text-[11px] text-slate-400">
                    Layout totalmente responsivo com suporte a toque, Drawer
                    lateral deslizante com backdrop-blur e mensagens de erro e
                    feedback imediato para o usuário.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Rodapé do README com Links do Desenvolvedor */}
          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/CauaRodolpho"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-bold text-slate-200 hover:text-white transition-all bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-xl border border-slate-700 shadow-sm"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Ver Código no GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/cau%C3%A3-rodolpho/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-bold text-slate-200 hover:text-white transition-all bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-xl border border-slate-700 shadow-sm"
              >
                <LinkedinIcon className="w-4 h-4 text-blue-400" />
                <span>Perfil no LinkedIn</span>
              </a>
            </div>

            <Link
              to="/"
              className="w-full sm:w-auto bg-[#FF6987] hover:bg-pink-600 text-white font-bold py-2.5 px-6 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-pink-500/20"
            >
              <span>Voltar ao Início da Loja</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
