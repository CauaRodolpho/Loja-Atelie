
import { Link, useSearchParams } from 'react-router-dom';
import { ShoppingBag, Star, Sparkles, Filter } from 'lucide-react';
import { PRODUCTS, CATEGORY_ICONS } from '../data/products';

export const CategoriesPage = () => {
  // Pega e atualiza o filtro de categoria via URL (ex: /categorias?cat=canecas)
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('cat') || 'todos';

  // Lista de categorias disponíveis (incluindo "Todos")
  const categoriesList = [
    { id: 'todos', title: 'Todos os Produtos' },
    ...Object.entries(CATEGORY_ICONS).map(([key, item]) => ({
      id: key,
      title: item.title,
    })),
  ];

  // Filtra os produtos com base na categoria selecionada
  const filteredProducts = currentCategory === 'todos'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category.toLowerCase() === currentCategory.toLowerCase());

  const handleCategoryChange = (categoryId: string) => {
    if (categoryId === 'todos') {
      setSearchParams({});
    } else {
      setSearchParams({ cat: categoryId });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
      
      {/* CABEÇALHO DA PÁGINA */}
      <div className="text-center flex flex-col items-center mb-10">
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pink-100 text-[#FF6987] text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-4 h-4" /> Nosso Catálogo Completo
        </span>
        <h1 className="text-3xl md:text-5xl font-bold font-handwritten text-gray-800">
          Explore por Categoria
        </h1>
        <p className="text-gray-600 text-sm md:text-base mt-2 max-w-xl">
          Encontre o mimo perfeito para você ou para presentear alguém especial.
        </p>
      </div>

      {/* FILTROS / BOTÕES DE CATEGORIAS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar justify-start md:justify-center">
        <div className="flex items-center gap-2 bg-white/80 p-2 rounded-2xl border border-pink-100 shadow-sm">
          <span className="px-3 text-xs font-bold text-gray-500 uppercase flex items-center gap-1 hidden md:flex">
            <Filter className="w-3.5 h-3.5" /> Filtrar:
          </span>
          
          {categoriesList.map((cat) => {
            const isActive = currentCategory.toLowerCase() === cat.id.toLowerCase();
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#FF6987] text-white shadow-md scale-105'
                    : 'bg-transparent text-gray-600 hover:bg-pink-50 hover:text-[#FF6987]'
                }`}
              >
                {cat.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* CONTADOR E LISTAGEM DE PRODUTOS */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-gray-500 font-medium">
          Exibindo <span className="text-[#FF6987] font-bold">{filteredProducts.length}</span> produto(s)
        </p>
      </div>

      {/* GRID DE PRODUTOS */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white/60 rounded-3xl border border-pink-100">
          <p className="text-gray-500 text-base">Nenhum produto cadastrado para esta categoria ainda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.productId}
              className="group bg-white/90 rounded-3xl p-4 border-2 border-pink-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-pink-50/50 mb-4">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#FF6987] text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full shadow-sm">
                  {product.category}
                </span>
              </div>

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
      )}

    </div>
  );
};