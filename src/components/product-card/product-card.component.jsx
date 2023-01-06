import { useContext } from 'react';

import Button from '../button/button.component';
import { CartContext } from '../../context/cart.context';

import {ProductCardContainer, CartBtn, Footer, ImgContainer} from './product-card.style.jsx'

const ProductCard = ({ product }) => {
    const { name, price, imageUrl } = product
    const {addItemToCart} = useContext(CartContext)

    const addProductToCart = () => {
        addItemToCart(product)
    }

    return (
        <ProductCardContainer>
            <ImgContainer>
                <img src={imageUrl}  alt={name} />
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