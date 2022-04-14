import {createContext,  useReducer} from "react";
import {createAction} from "../utils/reducer/reducer.utils"

const matchItem = (item, cartItemToChange) => item.id === cartItemToChange.id;

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find((item) =>
    matchItem(item, productToAdd)
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      matchItem(cartItem, productToAdd)
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find((item) =>
    matchItem(item, cartItemToRemove)
  );

  if (!existingCartItem) {
    return cartItems;
  }

  if (existingCartItem.quantity === 1) {
    return cartItems.filter(
      (cartItem) => !matchItem(cartItem, cartItemToRemove)
    );
  }

  return cartItems.map((cartItem) =>
    matchItem(cartItem, cartItemToRemove)
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => !matchItem(cartItem, cartItemToClear));

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  totalPrice: 0,
});

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}
const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  totalPrice: 0
}

const cartReducer = (state, action) => {
  const {type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload
      }
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload
      }
    default:
      throw Error(`Unhandled type of ${type} in cartReducer`)
  }
}
export const CartProvider = ({ children }) => {

  const [{cartItems,isCartOpen,cartCount,totalPrice}, dispatch] = useReducer(cartReducer, INITIAL_STATE);

  const updateCartItemsReducer = (newCartItems) => {
    const newTotalPrice = cartItems.reduce(
        (total, cartItem) => total + cartItem.quantity * cartItem.price,
        0
    );
    const newCartCount = cartItems.reduce(
        (total, cartItem) => total + cartItem.quantity,
        0
    );

    dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {cartItems: newCartItems, cartTotal: newTotalPrice, cartCount: newCartCount}))
  }

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemFromCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const clearItemFromCart = (cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    updateCartItemsReducer(newCartItems);
  };

  const setIsCartOpen = (bool) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool))
  }

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartCount,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
