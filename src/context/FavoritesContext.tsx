import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { Product } from "../types";

interface FavoritesContextData {
  favorites: Product[];
  isFavoritesOpen: boolean;
  openFavorites: () => void;
  closeFavorites: () => void;
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: string) => boolean;
  totalFavorites: number;
}

const FavoritesContext = createContext<FavoritesContextData>({} as FavoritesContextData);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Product[]>(() => {
    const saved = localStorage.getItem("anacraft_favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("anacraft_favorites", JSON.stringify(favorites));
  }, [favorites]);

  const openFavorites = () => setIsFavoritesOpen(true);
  const closeFavorites = () => setIsFavoritesOpen(false);

  const isFavorite = (productId: string) => {
    return favorites.some(
      (p) => String(p.productId || p.id) === String(productId)
    );
  };

  const toggleFavorite = (product: Product) => {
    const pId = product.productId || product.id;
    setFavorites((prev) => {
      const exists = prev.some((p) => String(p.productId || p.id) === String(pId));
      if (exists) {
        return prev.filter((p) => String(p.productId || p.id) !== String(pId));
      }
      return [...prev, product];
    });
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isFavoritesOpen,
        openFavorites,
        closeFavorites,
        toggleFavorite,
        isFavorite,
        totalFavorites: favorites.length,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);