import {useSelector} from "react-redux";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import {CheckoutContainer, CheckoutHeader, HeaderBlock, TotalPrice} from "./checkout.styles";
import {selectCartItems, selectCartTotal} from "../../store/cart/cart.selector";
import PaymentForm from '../../components/payment-form/payment-form.component';

const Checkout = () => {
    const cartItems = useSelector(selectCartItems)
    const totalPrice = useSelector(selectCartTotal)

  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock>Product</HeaderBlock>
        <HeaderBlock>Description</HeaderBlock>
        <HeaderBlock>Quantity</HeaderBlock>
        <HeaderBlock>Price</HeaderBlock>
        <HeaderBlock>Remove</HeaderBlock>
      </CheckoutHeader>
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} checkoutItem={cartItem} />
      ))}
      <TotalPrice>
        <span>Total: {totalPrice}</span>
      </TotalPrice>
      <PaymentForm />
    </CheckoutContainer>
  );
};

export default Checkout;
