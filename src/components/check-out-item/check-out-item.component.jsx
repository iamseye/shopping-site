import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import "./check-out-item.styles.scss";

const CheckOutItem = ({ checkOutItem }) => {
  const { addItemToCart, removeItemFromCart } = useContext(CartContext);
  const { name, imageUrl, price, quantity } = checkOutItem;
  const addProductToCart = () => addItemToCart(checkOutItem);
  const removeProductToCart = (removeAll = false) => {
    removeItemFromCart(checkOutItem, removeAll);
  };

  return (
    <div className="check-out-item-container">
      <img src={imageUrl} alt={name} />
      <span className="name">{name}</span>
      <div className="adjust-quantity">
        <span className="decrease" onClick={() => removeProductToCart()}>
          ❮{" "}
        </span>
        <span className="quantity">{quantity}</span>
        <span className="increase" onClick={addProductToCart}>
          {" "}
          ❯
        </span>
      </div>
      <span className="price">{price}</span>
      <div className="remove" onClick={() => removeProductToCart(true)}>
        ✖
      </div>
    </div>
  );
};

export default CheckOutItem;
