import {CartItemContainer, ImgContainer, ItemDetails, NameContainer} from './cart-item.style.jsx'

const CartItem = ({ cartItem }) => {
    const { name, imageUrl, price, qty } = cartItem
    return (
        <CartItemContainer>
            <ImgContainer>
                <img src={imageUrl} alt={name} />
            </ImgContainer>

            <ItemDetails>
                <NameContainer>
                    <span>{name}</span>

                </NameContainer>
                <span>{qty} x ${price}</span>
            </ItemDetails>

        </CartItemContainer>
    )
}

export default CartItem