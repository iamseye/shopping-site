import { createContext, useEffect, useState } from "react";
import CartItem from "../components/cart-item/cart-item.component";

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (item) => item.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, productToRemove, removeAll = false) => {
  const existingCartItem = cartItems.find(
    (item) => item.id === productToRemove.id
  );

  if (!existingCartItem) {
    return;
  }

  if (removeAll) {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
  }

  return cartItems.reduce((acc, cartItem) => {
    if (cartItem.id === productToRemove.id) {
      if (cartItem.quantity - 1 !== 0) {
        return [...acc, { ...cartItem, quantity: cartItem.quantity - 1 }];
      }
    }
    return acc;
  }, []);
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  cartCount: 0,
  totalPrice: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const newCartData = cartItems.reduce(
      (acc, item) => {
        const { price, quantity } = item;
        const { cartCount, cartPrice } = acc;
        return {
          cartCount: cartCount + quantity,
          cartPrice: cartPrice + price * quantity,
        };
      },
      { cartCount: 0, cartPrice: 0 }
    );

    setCartCount(newCartData.cartCount);
    setTotalPrice(newCartData.cartPrice);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    setCartItems(newCartItems);
  };

  const removeItemFromCart = (productToRemove, removeAll = false) => {
    const newCartItems = removeCartItem(cartItems, productToRemove, removeAll);
    setCartItems(newCartItems);
  };
  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    cartCount,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
