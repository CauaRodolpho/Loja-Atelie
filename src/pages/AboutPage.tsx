import {
  Heart,
  Sparkles,
  Scissors,
  Gift,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { InstagramIcon } from "../components/InstagramIcon";
import { Link } from "react-router-dom";
import sobre from "../assets/sobre.webp"

export const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50/40 via-white to-pink-50/20 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto flex flex-col gap-12">
        <div className="text-center flex flex-col items-center gap-3 max-w-2xl mx-auto">
          <span className="text-xs uppercase font-bold tracking-widest text-[#FF6987] bg-pink-100/60 px-3.5 py-1 rounded-full flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Inspiração & Essência
          </span>
          <h1 className="text-3xl sm:text-4xl font-handwritten text-gray-800 leading-tight">
            AnaCraft Ateliê 🌸
          </h1>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Transformando momentos especiais em lembranças inesquecíveis através
            da papelaria personalizada, mimos corporativos e presentes afetivos.
          </p>
        </div>
        <div className="bg-white rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl border border-pink-100/60 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col gap-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex flex-wrap items-center gap-2">
              Feito à Mão com Afeto
              <Heart className="w-5 h-5 text-[#FF6987] fill-[#FF6987]" />
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              O <strong>AnaCraft Ateliê</strong> nasceu do desejo de criar
              produtos únicos que traduzem sentimentos reais. Especializado em
              mimos corporativos, canecas em relevo, papelaria de luxo e mimos
              personalizados para datas comemorativas.
            </p>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Cada encomenda passa por um cuidado artesanal rigoroso: desde a
              escolha das cores e fontes até o acabamento final com laços,
              embalagens especiais e um toque de aroma do ateliê.
            </p>
            <div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-3 pt-2">
              <div className="bg-pink-50/70 p-3 rounded-2xl border border-pink-100 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF6987] shrink-0" />
                <span className="text-xs font-bold text-gray-700">
                  Aprovação da Arte
                </span>
              </div>
              <div className="bg-pink-50/70 p-3 rounded-2xl border border-pink-100 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF6987] shrink-0" />
                <span className="text-xs font-bold text-gray-700">
                  Mimos de Luxo
                </span>
              </div>
            </div>
          </div>

          <div className="relative group overflow-hidden rounded-2xl bg-pink-50 border border-pink-100">
            <img
              src={sobre}
              loading="lazy" decoding="async" width="800" height="800"
              alt="Ateliê AnaCraft Produção"
              className="w-full h-72 sm:h-80 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-2xl" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-semibold">
              <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30">
                ✂️ @atelie_anacraft
              </span>
              <a
                href="https://www.instagram.com/atelie_anacraft/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#b93857] hover:bg-[#982d47] text-white p-2 rounded-full shadow-md transition-colors"
                title="Visitar Instagram Oficial"
              >
                <InstagramIcon className="w-5 h-5 text-[#FF6987] hover:text-pink-600 transition-colors" />
              </a>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-pink-100/80 shadow-sm flex flex-col items-center text-center gap-3 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-pink-100/60 rounded-2xl flex items-center justify-center text-[#FF6987]">
              <Scissors className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-gray-800">
              Criação Exclusiva
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Desenvolvemos layouts sob medida para datas comemorativas, eventos
              empresariais e festas especiais.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-pink-100/80 shadow-sm flex flex-col items-center text-center gap-3 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-pink-100/60 rounded-2xl flex items-center justify-center text-[#FF6987]">
              <Gift className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-gray-800">
              Unboxing Inesquecível
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Embalagens preparadas para encantar logo no primeiro olhar,
              prontas para presentear.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-pink-100/80 shadow-sm flex flex-col items-center text-center gap-3 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-pink-100/60 rounded-2xl flex items-center justify-center text-[#FF6987]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-gray-800">
              Insumos de Luxo
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Utilização de papéis de alta gramatura, acrílicos premium e
              estampas em altíssima definição.
            </p>
          </div>
        </div>
        <div className="bg-gradient-to-r from-[#FF6987] to-pink-500 rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-extrabold">
              Acompanhe nossas novidades no Instagram!
            </h3>
            <p className="text-xs sm:text-sm text-pink-100 max-w-md">
              Siga <strong>@atelie_anacraft</strong> para conferir bastidores de
              produção, lançamentos de coleções e inspirações.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <a
              href="https://www.instagram.com/atelie_anacraft/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-white hover:bg-pink-50 text-[#FF6987] font-bold py-3.5 px-6 rounded-full text-xs transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <InstagramIcon className="w-5 h-5 text-[#FF6987] hover:text-pink-600 transition-colors" />
              <span>Siga no Instagram</span>
            </a>

            <Link
              to="/catalogo"
              className="w-full sm:w-auto bg-pink-600/40 hover:bg-pink-600/60 border border-white/30 text-white font-bold py-3.5 px-6 rounded-full text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Ver Catálogo</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
