import { createAction } from '../../utils/reducer/reducer.utils';
import CART_ACTION_TYPES from './cart.types';

const matchItem = (item, cartItemToChange) => item.id === cartItemToChange.id;

const clearCartItem = (cartItems, cartItemToClear) => cartItems.filter((cartItem) => !matchItem(cartItem, cartItemToClear));

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find((item) => matchItem(item, productToAdd));

  if (existingCartItem) {
    return cartItems.map((cartItem) => (matchItem(cartItem, productToAdd)
      ? { ...cartItem, quantity: cartItem.quantity + 1 }
      : cartItem));
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find((item) => matchItem(item, cartItemToRemove));

  if (!existingCartItem) {
    return cartItems;
  }

  if (existingCartItem.quantity === 1) {
    return cartItems.filter(
      (cartItem) => !matchItem(cartItem, cartItemToRemove),
    );
  }

  return cartItems.map((cartItem) => (matchItem(cartItem, cartItemToRemove)
    ? { ...cartItem, quantity: cartItem.quantity - 1 }
    : cartItem));
};

export const setIsCartOpen = (isCartOpen) => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isCartOpen);

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (cartItems, cartItemToClear) => {
  const newCartItems = clearCartItem(cartItems, cartItemToClear);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
