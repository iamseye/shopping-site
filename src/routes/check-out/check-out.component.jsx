import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import CheckOutItem from "../../components/check-out-item/check-out-item.component";
import "./check-out.styles.scss";

const CheckOut = () => {
  const { cartItems, totalPrice } = useContext(CartContext);

  return (
    <div className="check-out-container">
      <div className="check-out-items">
        <div className="titles">
          <span>Product</span>
          <span>Description</span>
          <span>Quantity</span>
          <span>Price</span>
          <span>Remove</span>
        </div>
        {cartItems.map((cartItem) => (
          <CheckOutItem key={cartItem.id} checkOutItem={cartItem} />
        ))}
      </div>
      <div className="total-price">
        <span>Total: {totalPrice}</span>
      </div>
    </div>
  );
};

export default CheckOut;
