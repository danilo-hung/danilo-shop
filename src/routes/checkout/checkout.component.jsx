import { useContext } from 'react'

import { CartContext } from '../../context/cart.context'

import CheckoutItemCard from '../../components/checkout-item-card/checkout-item-card.component'


import {CheckoutContainer, Header, Product, Description, ItemCardsContainer, Total} from './checkout.style.jsx'

const Checkout = () => {
    const { cartItems, totalPrice } = useContext(CartContext)

    return (
        <CheckoutContainer>
            <Header>
                <Product>Product</Product>
                <Description>Description</Description>
            </Header>
            <ItemCardsContainer>
                {
                    cartItems.map(item => {
                        return <CheckoutItemCard key={item.id} item={item} />
                    })
                }
            </ItemCardsContainer>
            {
                totalPrice!==0 && <Total>total: $ {totalPrice}</Total>
            }
            


        </CheckoutContainer>
    )
}

export default Checkout