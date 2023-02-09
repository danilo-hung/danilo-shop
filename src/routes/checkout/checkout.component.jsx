import { useSelector } from 'react-redux'
import { selectCartItems, selectCartTotal } from '../../store/cart/cart.selector'

import CheckoutItemCard from '../../components/checkout-item-card/checkout-item-card.component'


import {CheckoutContainer, Header, Product, Description, ItemCardsContainer, Total} from './checkout.style.jsx'

const Checkout = () => {
    const cartItems = useSelector(selectCartItems)
    const cartTotal = useSelector(selectCartTotal)

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
                cartTotal!==0 && <Total>total: $ {cartTotal}</Total>
            }
            


        </CheckoutContainer>
    )
}

export default Checkout