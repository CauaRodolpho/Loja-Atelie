import { createContext, useContext } from "react";
import type { Product, CartItem } from "../types";

interface CartContextData {
  cart: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product, quantity: number, customValues?: Record<string, string>, photoUrl?: string) => void;
  removeFromCart: (index: number) => void;
  updateQuantity: (index: number, newQuantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

export const CartContext = createContext<CartContextData>({} as CartContextData);


export const useCart = () => useContext(CartContext);
