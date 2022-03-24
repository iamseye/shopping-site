import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../../contexts/cart.context";

import CartItem from "../cart-item/cart-item.component";
import {CartDropDownContainer, CartItems, EmptyMessage} from "./cart-dropdown.styles";
import {BaseButton} from "../button/button.styles";

const CartDropdown = () => {
  const { cartItems, isCartOpen, setIsCartOpen } = useContext(CartContext);
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate("/checkout");
    setIsCartOpen(!isCartOpen);
  };

  return (
    <CartDropDownContainer>

      <CartItems>
        {cartItems.length ? cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        )) : (<EmptyMessage> Your cart is empty</EmptyMessage>)}
      </CartItems>

      <BaseButton onClick={goToCheckoutHandler}>GO TO CHECKOUT</BaseButton>
    </CartDropDownContainer>
  );
};

export default CartDropdown;
