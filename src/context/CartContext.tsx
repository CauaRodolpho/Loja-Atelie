import { createContext, useContext, useState, useEffect, ReactNode } from "react";
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

const CartContext = createContext<CartContextData>({} as CartContextData);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("anacraft_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("anacraft_cart", JSON.stringify(cart));
  }, [cart]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = (
    product: Product,
    quantity: number,
    customValues: Record<string, string> = {},
    photoUrl: string = ""
  ) => {
    const totalPrice = product.price * quantity;

    setCart((prevCart) => {
      // Verifica se já existe um item rigorosamente igual (mesmo produto + mesmas personalizações)
      const existingIndex = prevCart.findIndex(
        (item) =>
          item.product.productId === product.productId &&
          JSON.stringify(item.customValues) === JSON.stringify(customValues)
      );

      if (existingIndex > -1) {
        const updatedCart = [...prevCart];
        const newQuantity = updatedCart[existingIndex].quantity + quantity;
        updatedCart[existingIndex] = {
          ...updatedCart[existingIndex],
          quantity: newQuantity,
          totalPrice: product.price * newQuantity,
        };
        return updatedCart;
      }

      return [
        ...prevCart,
        {
          product,
          quantity,
          customValues,
          photoUrl,
          totalPrice,
        },
      ];
    });

    openCart();
  };

  const removeFromCart = (index: number) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  const updateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(index);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item, i) =>
        i === index
          ? {
              ...item,
              quantity: newQuantity,
              totalPrice: item.product.price * newQuantity,
            }
          : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + item.totalPrice, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);