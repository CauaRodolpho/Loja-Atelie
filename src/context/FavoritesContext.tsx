import { PRODUCTS } from "../data/products";
import { FavoritesContext } from "../hooks/useFavorites";
import { useState, useEffect, useCallback, type ReactNode } from "react";
import type { Product } from "../types";


export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem("anacraft_favorites");
      const parsed: unknown = saved ? JSON.parse(saved) : [];
      if (!Array.isArray(parsed)) return [];
      const ids = new Set(parsed.flatMap(item => item && typeof item === "object" && typeof item.productId === "string" ? [item.productId] : []));
      return PRODUCTS.filter(product => ids.has(product.productId));
    } catch { return []; }
  });

  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  useEffect(() => {
    try { localStorage.setItem("anacraft_favorites", JSON.stringify(favorites)); } catch { /* O estado permanece disponível durante a sessão. */ }
  }, [favorites]);

  const openFavorites = () => setIsFavoritesOpen(true);
  const closeFavorites = useCallback(() => setIsFavoritesOpen(false), []);

  const isFavorite = (productId: string) => {
    return favorites.some((p) => String(p.productId) === String(productId));
  };

  const toggleFavorite = (product: Product) => {
    setFavorites((prev) => {
      const exists = prev.some((p) => String(p.productId) === String(product.productId));
      if (exists) {
        return prev.filter((p) => String(p.productId) !== String(product.productId));
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
