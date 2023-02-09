import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component'
import { selectCartItems } from '../../store/cart/cart.selector';


import { CartDropdownContainer, CartItems, EmptyCart } from './cart-dropdown.styles.jsx'

const CartDropDown = () => {
    const  cartItems  = useSelector(selectCartItems);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate("/checkout")
    }

    return (
        <CartDropdownContainer>
            <CartItems>
                {
                    cartItems.length ? (cartItems.map((item) => {
                        return (
                            <CartItem key={item.id} cartItem={item} />
                        )
                    })) : (
                        <EmptyCart>
                            <p>I AM EMPTY!!! </p>
                            <p>Fill Me UP :)</p>
                        </EmptyCart>
                    )

                }
            </CartItems>
            <Button onClick={goToCheckoutHandler}>CKECKOUT</Button>

        </CartDropdownContainer>
    )
}

export default CartDropDown