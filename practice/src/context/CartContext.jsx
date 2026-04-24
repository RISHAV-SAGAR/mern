import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "edumart-cart";

const parsePrice = (price) => Number(String(price).replace(/[^0-9.]/g, "")) || 0;
const isSinglePurchaseItem = (item) => item.type === "pdfs";

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    if (typeof window === "undefined") return [];

    try {
      const savedCart = window.localStorage.getItem(STORAGE_KEY);
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        if (isSinglePurchaseItem(existingItem)) {
          return currentItems;
        }

        return currentItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }

      return [
        ...currentItems,
        {
          ...item,
          numericPrice: parsePrice(item.price),
          quantity: 1,
        },
      ];
    });
  };

  const updateQuantity = (id, nextQuantity) => {
    if (nextQuantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCartItems((currentItems) =>
      currentItems.map((item) => {
        if (item.id !== id) {
          return item;
        }

        return {
          ...item,
          quantity: isSinglePurchaseItem(item) ? 1 : nextQuantity,
        };
      })
    );
  };

  const removeFromCart = (id) => {
    setCartItems((currentItems) => currentItems.filter((item) => item.id !== id));
  };

  const clearCart = () => setCartItems([]);

  const summary = useMemo(() => {
    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.numericPrice * item.quantity,
      0
    );
    const deliveryFee = subtotal === 0 ? 0 : subtotal >= 50 ? 0 : 4.99;
    const total = subtotal + deliveryFee;

    return { itemCount, subtotal, deliveryFee, total };
  }, [cartItems]);

  const value = {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartCount: summary.itemCount,
    subtotal: summary.subtotal,
    deliveryFee: summary.deliveryFee,
    total: summary.total,
    formatPrice: (value) => `$${value.toFixed(2)}`,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
