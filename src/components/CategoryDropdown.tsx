import { Link } from 'react-router-dom';
import { CATEGORY_ICONS } from '../data/products';

export const CategoryDropdown = () => {
  return (
    <div className="absolute top-full left-0 mt-2 w-56 bg-white/30 rounded-2xl shadow-xl border border-pink-100 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
      <ul className="flex flex-col gap-1">
        {Object.entries(CATEGORY_ICONS).map(([key, item]) => (
          <li key={key}>
            <Link
              to={`/categorias?cat=${key}`}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-pink-50 transition-colors group"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-7 h-7 object-contain group-hover:scale-110 transition-transform"
              />
              <span className="text-sm font-medium text-gray-700 group-hover:text-[#FF6987] ">
                {item.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};