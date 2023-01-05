import { useContext } from 'react'
import { CartContext } from '../../context/cart.context'
import Button from '../button/button.component'

import './checkout-item-card.style.scss'

const CheckoutItemCard = ({ item }) => {
    const { price, qty, name, imageUrl } = item
    const { addItemToCart, removeItemFromCart, deleteItemFromCart } = useContext(CartContext)
    const addItem = () => { addItemToCart(item) }
    const removeItem = () => { removeItemFromCart(item) }
    const deleteItem = () => {
        console.log("CLICK")
        deleteItemFromCart(item)
    }
    return (
        <div className='ckeckout-card-container'>
            <div className='product-container'>
                <div className='img-box'>
                    <img src={imageUrl} alt={name} />
                </div>
            </div>
            <div className="description-container">
                <p className='name'>{name}</p>
                <p className='price'>${price}</p>
                <div className='qty'>
                    <i onClick={removeItem} className="fa-solid fa-caret-left qty-control"></i>
                    <span>{qty}</span>
                    <i onClick={addItem} className="fa-solid fa-caret-right qty-control"></i>
                </div>
                <Button onClick={deleteItem} buttonType="pink"> Remove {name}</Button>


            </div>
        </div>
    )
}

export default CheckoutItemCard