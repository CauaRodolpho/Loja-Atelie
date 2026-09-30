import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Sparkles, Star } from 'lucide-react';
import { PRODUCTS } from '../data/products';

export const FeaturedProducts = () => {
  return (
    <section id="produtos" className="py-16 px-6 md:px-12 max-w-7xl mx-auto" >
      {/* 1. TEXTO CENTRALIZADO COM FAIXA ROSA */}
      <div className="text-center flex flex-col items-center mb-14">
        <span className="relative inline-flex items-center gap-1 font-handwritten text-2xl text-[#FF6987] mb-2">
          <Sparkles className="w-5 h-5 text-[#FF6987]" />
          Seleção Especial
          <Sparkles className="w-5 h-5 text-[#FF6987]" />
        </span>

        <div className="relative inline-block mt-1">
          <div className="bg-[#FF6987] text-white px-8 py-2.5 rounded-full shadow-md transform -rotate-1 hover:rotate-0 transition-transform duration-300">
            <h2 className="text-2xl md:text-4xl font-bold font-handwritten tracking-wide">
              Melhores Produtos
            </h2>
          </div>
        </div>
      </div>

      {/* 2. GRID DOS PRODUTOS DA BASE OFICIAL */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {PRODUCTS.map((product) => (
          <div
            key={product.productId}
            className="group bg-white/90 rounded-3xl p-4 border-2 border-pink-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between relative"
          >
            {/* Categoria / Tag */}
            <span className="absolute top-7 left-7 z-10 bg-[#FF6987] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm capitalize">
              {product.category}
            </span>

            {/* Botão Favorito */}
            <button className="absolute top-7 right-7 z-10 bg-white/80 backdrop-blur-sm p-2 rounded-full text-pink-400 hover:text-[#FF6987] hover:scale-110 transition-all duration-200">
              <Heart className="w-4 h-4 fill-current" />
            </button>

            {/* Imagem do Produto */}
            <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-pink-50/50 mb-4">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Informações do Produto */}
            <div className="px-2 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <span className="capitalize">{product.category}</span>
                  <div className="flex items-center gap-0.5 text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="text-gray-600 font-medium ml-1">5.0</span>
                  </div>
                </div>

                <h3 className="font-handwritten text-2xl font-bold text-gray-800 leading-snug">
                  {product.name}
                </h3>
              </div>

              {/* Preço e Link para a Página de Detalhes */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-pink-100/60">
                <span className="text-2xl font-bold text-[#FF6987]">
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </span>

                <Link 
                  to={`/produto/${product.productId}`}
                  className="flex items-center gap-2 bg-[#FF6987] hover:bg-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Ver Detalhes
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};