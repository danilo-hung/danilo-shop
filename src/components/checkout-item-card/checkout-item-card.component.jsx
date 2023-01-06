import { useContext } from 'react'
import { CartContext } from '../../context/cart.context'
import Button from '../button/button.component'

import { CheckoutCardContainer, ProductContainer, ImgBox, Img, DescriptionContainer,QtyControl } from './checkout-item-card.style.jsx'

const CheckoutItemCard = ({ item }) => {
    const { price, qty, name, imageUrl } = item
    const { addItemToCart, removeItemFromCart, deleteItemFromCart } = useContext(CartContext)
    const addItem = () => { addItemToCart(item) }
    const removeItem = () => { removeItemFromCart(item) }
    const deleteItem = () => {
        deleteItemFromCart(item)
    }
    return (
        <CheckoutCardContainer>
            <ProductContainer>
                <ImgBox>
                    <Img src={imageUrl} alt={name} />
                </ImgBox>
            </ProductContainer>
            <DescriptionContainer>
                <p className='name'>{name}</p>
                <p className='price'>${price}</p>
                <div className='qty'>
                    <QtyControl onClick={removeItem} className="fa-solid fa-caret-left "></QtyControl>
                    <span>{qty}</span>
                    <QtyControl onClick={addItem} className="fa-solid fa-caret-right "></QtyControl>
                </div>
                <Button onClick={deleteItem} buttonType="pink"> Remove {name}</Button>
            </DescriptionContainer>
        </CheckoutCardContainer>
    )
}

export default CheckoutItemCard