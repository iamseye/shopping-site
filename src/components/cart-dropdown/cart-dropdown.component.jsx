import { useNavigate } from "react-router-dom";

import CartItem from "../cart-item/cart-item.component";
import {CartDropDownContainer, CartItems, EmptyMessage} from "./cart-dropdown.styles";
import {BaseButton} from "../button/button.styles";
import {useDispatch, useSelector} from "react-redux";
import { selectCartItems, selectIsCartOpen} from "../../store/cart/cart.selector";
import {setIsCartOpen} from "../../store/cart/cart.action";

const CartDropdown = () => {
    const dispatch = useDispatch();
    const isCartOpen = useSelector(selectIsCartOpen);
    const cartItems = useSelector(selectCartItems)

    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate("/checkout");
        dispatch(setIsCartOpen(!isCartOpen));
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
