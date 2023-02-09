import Button from '../button/button.component';
import { addItemToCart } from '../../store/cart/cart.action';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';

import { ProductCardContainer, CartBtn, Footer, ImgContainer } from './product-card.style.jsx'

const ProductCard = ({ product }) => {
    const dispatch = useDispatch()
    const { name, price, imageUrl } = product
    const cartItems = useSelector(selectCartItems)

    const addProductToCart = () => dispatch(addItemToCart(cartItems, product))

    return (
        <ProductCardContainer>
            <ImgContainer>
                <img src={imageUrl} alt={name} />
            </ImgContainer>
            <CartBtn>
                <Button onClick={addProductToCart} buttonType='inverted'> Add to Cart</Button>
            </CartBtn>
            <Footer>
                <span className='name'>{name}</span>
                <span className='price'>$ {price}</span>
            </Footer>


        </ProductCardContainer>
    )
}

export default ProductCard