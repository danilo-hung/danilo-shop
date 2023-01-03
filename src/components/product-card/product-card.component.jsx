import './product-card.style.scss'
import Button from '../button/button.component'

const ProductCard = ({ product }) => {
    const { name, price, imageUrl } = product
    return (
        <div className='product-card-container'>
            <div className='product-line'> </div>
            <div className='img-container'>
                <img src={imageUrl} alt={name} />
            </div>
            <div className='cart-btn'>
                <Button buttonType='inverted'> Add to Cart</Button>
            </div>
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>$ {price}</span>
            </div>


        </div>
    )
}

export default ProductCard