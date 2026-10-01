import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import acessorios from "../assets/icons/acessorios.png";
import papelaria from "../assets/icons/papelaria.png";
import decoracao from "../assets/icons/decoracao.png";
import canecas from "../assets/icons/canecas.png";
import personalizado from "../assets/icons/personalizado.png";

const categories = [
  { id: "acessorios", title: "Acessórios", description: "Chaveiros e mimos fofos", image: acessorios, alt: "Acessórios", bgColor: "bg-purple-100/70", circleBg: "bg-purple-200/50", arrowColor: "text-purple-400" },
  { id: "papelaria", title: "Papelaria", description: "Cadernos, blocos e organizadores", image: papelaria, alt: "Papelaria", bgColor: "bg-emerald-100/70", circleBg: "bg-emerald-200/50", arrowColor: "text-emerald-400" },
  { id: "decoracao", title: "Decoração", description: "Velas, quadros e detalhes afetivos", image: decoracao, alt: "Decoração", bgColor: "bg-amber-100/70", circleBg: "bg-amber-200/50", arrowColor: "text-amber-400" },
  { id: "canecas", title: "Canecas", description: "Canecas fofas para o teu café", image: canecas, alt: "Canecas", bgColor: "bg-sky-100/70", circleBg: "bg-sky-200/50", arrowColor: "text-sky-400" },
  { id: "todos", title: "Personalizados", description: "Presentes únicos feitos sob medida", image: personalizado, alt: "Personalizados", bgColor: "bg-pink-100/70", circleBg: "bg-pink-200/50", arrowColor: "text-pink-400" },
];

export const Categories = () => {
  const navigate = useNavigate();

  return (
    <section id="categorias" className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <span className="font-handwritten text-2xl text-[#FF6987]">Nossos Mundos</span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-1 font-handwritten">Explore por Categorias</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {categories.map((category) => (
          <button type="button" key={category.id} onClick={() => navigate(category.id === "todos" ? "/catalogo" : `/catalogo?cat=${category.id}`)} className={`group relative p-8 lg:p-10 lg:min-h-[260px] rounded-3xl ${category.bgColor} border-2 border-white/80 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden text-left`}>
            <Sparkles className="absolute top-2 left-2 w-4 h-4 text-white/60 pointer-events-none" />
            <div className="flex flex-col items-center justify-center text-center w-full">
              <h3 className="font-handwritten text-2xl lg:text-3xl font-bold text-gray-800 leading-tight">{category.title}</h3>
              <div className={`relative w-26 h-22 lg:w-22 lg:h-24 my-3 rounded-full ${category.circleBg} flex items-center justify-center shrink-0 overflow-hidden`}>
                <img src={category.image} alt={category.alt} className="w-full h-full object-cover rounded-full" />
                <Sparkles className="absolute top-0 right-0 w-4 h-4 text-amber-300" />
              </div>
              <p className="text-sm lg:text-base text-gray-600 font-sans line-clamp-2 max-w-[200px]">{category.description}</p>
            </div>
            <span className="flex justify-center items-center gap-1.5 mt-4 text-xs lg:text-sm font-semibold text-gray-700 transition-transform duration-300 group-hover:translate-x-1">
              Ver Categoria
              <ArrowRight className={`w-4 h-4 lg:w-5 lg:h-5 ${category.arrowColor}`} />
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};