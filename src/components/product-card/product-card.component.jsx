import { useContext } from 'react';

import Button from '../button/button.component';
import { CartContext } from '../../context/cart.context';

import './product-card.style.scss'

const ProductCard = ({ product }) => {
    const { name, price, imageUrl } = product
    const {addItemToCart} = useContext(CartContext)

    const addProductToCart = () => {
        addItemToCart(product)
    }

    return (
        <div className='product-card-container'>
            <div className='img-container'>
                <img src={imageUrl}  alt={name} />
            </div>
            <div  className='cart-btn'>
                <Button onClick={addProductToCart} buttonType='inverted'> Add to Cart</Button>
            </div>
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>$ {price}</span>
            </div>


        </div>
    )
}

export default ProductCard