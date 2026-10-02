import { PRODUCTS } from "../data/products";
import { CartContext } from "../hooks/useCart";
import { useState, useEffect, useCallback, type ReactNode } from "react";
import type { Product, CartItem } from "../types";


export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("anacraft_cart");
      const parsed: unknown = saved ? JSON.parse(saved) : [];
      if (!Array.isArray(parsed)) return [];
      return parsed.flatMap((item): CartItem[] => {
        if (!item || typeof item !== "object") return [];
        const product = PRODUCTS.find(product => product.productId === item.product?.productId);
        if (!product || !Number.isSafeInteger(item.quantity) || item.quantity < 1) return [];
        const values = item.customValues;
        if (!values || typeof values !== "object" || Array.isArray(values)) return [];
        const customValues: Record<string, string> = {};
        for (const option of product.customizationOptions) {
          const value = values[option.id];
          if (value !== undefined && typeof value !== "string") return [];
          if (option.required && !value?.trim()) return [];
          if (value && option.type === "select" && !option.options?.includes(value)) return [];
          if (typeof value === "string") customValues[option.id] = value;
        }
        const quantity = Math.max(product.minQuantity || 1, item.quantity);
        const totalPrice = product.price * quantity;
        if (!Number.isFinite(totalPrice)) return [];
        return [{ product, quantity, customValues, photoUrl: typeof item.photoUrl === "string" ? item.photoUrl : "", totalPrice }];
      });
    } catch { return []; }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try { localStorage.setItem("anacraft_cart", JSON.stringify(cart)); } catch { /* O estado permanece disponível durante a sessão. */ }
  }, [cart]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const addToCart = (
    product: Product,
    quantity: number,
    customValues: Record<string, string> = {},
    photoUrl: string = ""
  ) => {
    quantity = Math.max(product.minQuantity || 1, Math.floor(quantity));
    const totalPrice = product.price * quantity;

    setCart((prevCart) => {
      // Verifica se já existe um item rigorosamente igual (mesmo produto + mesmas personalizações)
      const existingIndex = prevCart.findIndex(
        (item) =>
          item.product.productId === product.productId &&
          JSON.stringify(Object.entries(item.customValues).sort()) === JSON.stringify(Object.entries(customValues).sort()) &&
          item.photoUrl === photoUrl
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
    if (!Number.isFinite(newQuantity)) return;

    setCart((prevCart) =>
      prevCart.map((item, i) =>
        i === index
          ? {
              ...item,
              quantity: Math.max(item.product.minQuantity || 1, Math.floor(newQuantity)),
              totalPrice: item.product.price * Math.max(item.product.minQuantity || 1, Math.floor(newQuantity)),
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
