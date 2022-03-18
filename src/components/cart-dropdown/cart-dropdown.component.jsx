import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../../contexts/cart.context";

import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import "./cart-dropdown.styles.scss";

const CartDropdown = () => {
  const { cartItems, isCartOpen, setIsCartOpen } = useContext(CartContext);
  const navigate = useNavigate();

  const goToCheckOut = () => {
    navigate("/checkout");
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </div>
      <Button onClick={goToCheckOut}>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;