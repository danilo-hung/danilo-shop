import { useContext } from 'react'

import { CartContext } from '../../context/cart.context'

import CheckoutItemCard from '../../components/checkout-item-card/checkout-item-card.component'


import './checkout.style.scss'

const Checkout = () => {
    const { cartItems, totalPrice } = useContext(CartContext)

    return (
        <div className='checkout-container'>
            <div className="header">
                <p className='product'>Product</p>
                <p className='description'>Description</p>
            </div>
            <div className="item-cards-container">
                {
                    cartItems.map(item => {
                        return <CheckoutItemCard key={item.id} item={item} />
                    })
                }
            </div>
            {
                totalPrice!==0 && <p className='total'>total: $ {totalPrice}</p>
            }
            


        </div>
    )
}

export default Checkout