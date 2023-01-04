import './cart-item.style.scss'

const CartItem = ({ cartItem }) => {
    const { name, imageUrl, price, qty } = cartItem
    return (
        <div className='cart-item-container'>
            <div className='img-container'>
                <img src={imageUrl} alt={name} />
            </div>

            <div className='item-details'>
                <div className='name-container'>
                    <span className='name'>{name}</span>

                </div>
                <span>{qty} x ${price}</span>
            </div>

        </div>
    )
}

export default CartItem