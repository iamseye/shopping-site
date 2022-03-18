import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import "./checkout-item.styles.scss";

const CheckoutItem = ({ checkoutItem }) => {
  const { addItemToCart, removeItemFromCart, clearItemFromCart } =
    useContext(CartContext);
  const { name, imageUrl, price, quantity } = checkoutItem;

  const addItemHandler = () => addItemToCart(checkoutItem);
  const removeItemHandler = () => removeItemFromCart(checkoutItem);
  const clearItemHandler = () => clearItemFromCart(checkoutItem);

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <div className="quantity">
        <span className="arrow" onClick={removeItemHandler}>
          ❮{" "}
        </span>
        <span className="value">{quantity}</span>
        <span className="arrow" onClick={addItemHandler}>
          {" "}
          ❯
        </span>
      </div>
      <span className="price">{price}</span>
      <div className="remove-button " onClick={clearItemHandler}>
        ✖
      </div>
    </div>
  );
};

export default CheckoutItem;
