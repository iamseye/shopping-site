import {useDispatch, useSelector} from "react-redux";

import "./checkout-item.styles.scss";
import {selectCartItems} from "../../store/cart/cart.selector";
import {addItemToCart, removeItemFromCart, clearItemFromCart} from "../../store/cart/cart.action";

const CheckoutItem = ({ checkoutItem }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems)

  const { name, imageUrl, price, quantity } = checkoutItem;

  const addItemHandler = () => dispatch(addItemToCart(cartItems,checkoutItem));
  const removeItemHandler = () => dispatch(removeItemFromCart(cartItems,checkoutItem));
  const clearItemHandler = () => dispatch(clearItemFromCart(cartItems,checkoutItem));

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
