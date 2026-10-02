import { createContext, useContext } from "react";
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

export const FavoritesContext = createContext<FavoritesContextData>({} as FavoritesContextData);


export const useFavorites = () => useContext(FavoritesContext);
