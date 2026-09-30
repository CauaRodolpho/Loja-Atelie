import {
  ArrowRight,
  Sparkles,
} from "lucide-react";

import acessorios from "../assets/icons/acessorios.png";
import papelaria from "../assets/icons/papelaria.png";
import decoracao from "../assets/icons/decoracao.png";
import canecas from "../assets/icons/canecas.png";
import personalizado from "../assets/icons/personalizado.png";

const categories = [
  {
    title: "Acessórios",
    description: "Chaveiros e mimos fofos",
    img: <img src={acessorios} alt="Acessórios"/>,
    bgColor: "bg-purple-100/70",
    circleBg: "bg-purple-200/50",
    iconColor: "text-purple-500",
    arrowColor: "text-purple-400",
    p: "Ver Categoria",
  },
  {
    title: "Papelaria",
    description: "Cadernos, blocos e organizadores",
    img: <img src={papelaria} alt="Papelaria"/>,
    bgColor: "bg-emerald-100/70",
    circleBg: "bg-emerald-200/50",
    iconColor: "text-emerald-500",
    arrowColor: "text-emerald-400",
    p: "Ver Categoria",
  },
  {
    title: "Decoração",
    description: "Velas, quadros e detalhes afetivos",
    img: <img src={decoracao} alt="Decoração"/>,
    bgColor: "bg-amber-100/70",
    circleBg: "bg-amber-200/50",
    iconColor: "text-amber-500",
    arrowColor: "text-amber-400",
    p: "Ver Categoria",
  },
  {
    title: "Canecas",
    description: "Canecas fofas para o teu café",
    img: <img src={canecas} alt="Canecas"/>,
    bgColor: "bg-sky-100/70",
    circleBg: "bg-sky-200/50",
    iconColor: "text-sky-500",
    arrowColor: "text-sky-400",
    p: "Ver Categoria",
  },
  {
    title: "Personalizados",
    description: "Presentes únicos feitos sob medida",
    img: <img src={personalizado} alt="Personalizados"/>,
    bgColor: "bg-pink-100/70",
    circleBg: "bg-pink-200/50",
    iconColor: "text-pink-500",
    arrowColor: "text-pink-400",
    p: "Ver Categoria",
  },
];

export const Categories = () => {
  return (
    <section id="categorias" className="py-16 px-6 md:px-12 max-w-7xl mx-auto" >
      {/* Título da Seção */}
      <div className="text-center mb-12">
        <span className="font-handwritten text-2xl text-[#FF6987]">
          Nossos Mundos
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-1 font-handwritten">
          Explore por Categorias
        </h2>
      </div>

      {/* Grid de Cards Scrollable ou Responsivo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {categories.map((cat, index) => {
          return (
            <div
              key={index}
              className={`group relative p-8 lg:p-10 lg:min-h-[260px] rounded-3xl ${cat.bgColor} border-2 border-white/80 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden`}
            >
              {/* Estrelinhas/Doodles Decorativos ao fundo */}
              <Sparkles className="absolute top-2 left-2 w-4 h-4 text-white/60 pointer-events-none" />

              {/* Conteúdo do Card */}

              {/* Textos */}
              <div className="flex flex-col items-center justify-center text-center w-full">
                {/* Título Maior */}
                <h3 className="font-handwritten text-2xl lg:text-3xl font-bold text-gray-800 leading-tight">
                  {cat.title}
                </h3>

                {/* Círculo Maior */}
                <div
                  className={`relative w-26 h-22 lg:w-22 lg:h-24 my-3 rounded-full ${cat.circleBg} flex items-center justify-center shrink-0  overflow-hidden [&>img]:w-full [&>img]:h-full [&>img]:object-cover [&>img]:rounded-full`}
                >
                  {cat.img}
                  <Sparkles className="absolute top-0 right-0 w-4 h-4 text-amber-300 z-10" />
                </div>

                {/* Descrição Maior */}
                <p className="text-sm lg:text-base text-gray-600 font-sans line-clamp-2 max-w-[200px]">
                  {cat.description}
                </p>
              </div>
              {/* Seta no canto inferior direito */}
              <div className="flex justify-center mt-4">
                {cat.p && (
                  <button className="flex items-center gap-1.5 text-xs lg:text-sm font-semibold text-gray-700 transition-transform duration-300 group-hover:translate-x-2">
                    <span>{cat.p}</span>
                    <ArrowRight
                      className={`w-4 h-4 lg:w-5 lg:h-5 ${cat.arrowColor}`}
                    />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
