import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkle, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import type { HeroSlide } from '../types';

import hero1 from '../assets/hero1.png';
import hero2 from '../assets/hero2.png';
import hero3 from '../assets/hero3.png';

const HERO_SLIDES: HeroSlide[] = [
  {
    id: '1',
    badgeText: 'Feito à mão com amor ♡',
    title: 'onde a arte encontra a criatividade!',
    description: 'Aqui você encontra produtos feitos com carinho, criatividade e muita personalidade. Cada peça é única, assim como você!',
    buttonText: 'Ver Produtos',
    buttonLink: '/categorias',
    imageUrl: hero1,
    imagePosition: 'right',
    bgColor: 'bg-pink-50/60',
    badgeBg: 'bg-[#FF6987]',
    buttonBg: 'bg-[#FF6987] hover:bg-pink-600',
    titleColor: 'text-gray-800',
  },
  {
    id: '2',
    badgeText: 'Do seu jeitinho ♡',
    title: 'em algo único!',
    description: 'Canecas, chaveiros e presentes personalizados, criados especialmente para deixar cada momento ainda mais especial.',
    buttonText: 'Ver Produtos',
    buttonLink: '/categorias',
    imageUrl: hero2,
    imagePosition: 'left',
    bgColor: 'bg-amber-50/60',
    badgeBg: 'bg-amber-500',
    buttonBg: 'bg-amber-500 hover:bg-amber-600',
    titleColor: 'text-gray-800',
  },
  {
    id: '3',
    badgeText: 'Da AnaCraft até você ♡',
    title: 'com todo carinho!',
    description: 'Cada detalhe é feito, embalado e preparado com cuidado para que seu pedido chegue até você tão especial quanto foi criado.',
    buttonText: 'Fazer Meu Pedido',
    buttonLink: '/categorias',
    imageUrl: hero3,
    imagePosition: 'right',
    bgColor: 'bg-purple-50/60',
    badgeBg: 'bg-purple-500',
    buttonBg: 'bg-purple-500 hover:bg-purple-600',
    titleColor: 'text-gray-800',
  },
];

export const Hero = () => { 
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);  
    return () => clearInterval(interval);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section className="min-h-screen relative w-full overflow-hidden flex items-center bg-[#FFF5F6] transition-colors duration-500">
      {/* Imagem de Fundo Dinâmica */}
      <img 
        src={slide.imageUrl} 
        alt={slide.badgeText} 
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 pointer-events-none ${
          slide.imagePosition === 'left' ? 'object-left' : 'object-right'
        }`}
      />

      {/* Gradiente na Base */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#FFF5F6] to-transparent z-10 pointer-events-none" />

      {/* Setas de Navegação Manual */}
      <button 
        onClick={prevSlide}
        aria-label="Slide anterior"
        className="absolute left-4 z-30 p-2 rounded-full bg-white/70 text-[#FF6987] hover:bg-white shadow-md transition-all cursor-pointer hidden md:flex"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button 
        onClick={nextSlide}
        aria-label="Próximo slide"
        className="absolute right-4 z-30 p-2 rounded-full bg-white/70 text-[#FF6987] hover:bg-white shadow-md transition-all cursor-pointer hidden md:flex"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Conteúdo Dinâmico */}
      <div className="container mx-auto px-8 md:px-16 pt-12 pb-12 z-20 relative">
        <div className={`max-w-xl flex flex-col transition-all duration-500 ${
          slide.imagePosition === 'left' ? 'ml-auto items-start md:items-end text-left md:text-right' : 'items-start text-left'
        }`}>
          
          {/* Badge */}
          <span className="relative inline-block font-handwritten font-semibold text-2xl text-[#FF6987] mb-2">
            {slide.badgeText}
            <Sparkle className="w-5 h-5 text-[#FF6987] rotate-12 absolute -top-2 -right-6" />
          </span>

          {/* Título Principal */}
          <h1 className="text-4xl md:text-5xl font- font-bold text-brand-dark leading-tight mt-1">
            {slide.id === '1' && (
              <>
                Bem-vinda à <span className="text-[#FF6987]">AnaCraft</span>, <br />
                {slide.title}
              </>
            )}
            {slide.id === '2' && (
              <>
                Transforme suas ideias <br />
                em algo <span className="text-[#FF6987]">único!</span>
              </>
            )}
            {slide.id === '3' && (
              <>
                Seu pedido preparado <br />
                com todo <span className="text-[#FF6987]">carinho!</span>
              </>
            )}
          </h1>

          {/* Subtítulo */}
          <p className="text-lg md:text-xl text-gray-700 mt-4 font-sans leading-relaxed">
            {slide.description}
          </p>

          {/* Botões */}
          <div className="flex flex-wrap items-center gap-4 mt-8">
            <Link 
              to={slide.buttonLink}
              className="px-7 py-3 bg-[#FF6987] hover:bg-pink-600 text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
            >
              {slide.buttonText}
            </Link>
            
            <Link 
              to="/categorias"
              className="px-6 py-3 border-2 border-[#FF6987] text-[#FF6987] hover:bg-pink-50 font-semibold rounded-full transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              {slide.id === '1' ? 'Explorar Mais' : slide.id === '2' ? 'Personalizar' : 'Saiba Mais'}
              <Heart className="w-4 h-4 fill-current" />
            </Link>
          </div>

        </div> 
      </div>

      {/* Indicadores (Bolinhas) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {HERO_SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Ir para o slide ${index + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
              currentSlide === index ? 'w-8 bg-[#FF6987]' : 'w-2.5 bg-pink-200 hover:bg-pink-300'
            }`}
          />
        ))}
      </div>
    </section>
  );
};