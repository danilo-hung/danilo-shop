import { addItemToCart, removeItemFromCart, deleteItemFromCart } from '../../store/cart/cart.action'
import Button from '../button/button.component'

import { useSelector, useDispatch } from 'react-redux'
import { selectCartItems } from '../../store/cart/cart.selector'
import { CheckoutCardContainer, ProductContainer, ImgBox, Img, DescriptionContainer,QtyControl } from './checkout-item-card.style.jsx'

const CheckoutItemCard = ({ item }) => {
    const dispatch = useDispatch()
    const { price, qty, name, imageUrl } = item
    const cartItems = useSelector(selectCartItems)
    const addItem = () => dispatch(addItemToCart(cartItems,item))
    const removeItem = () =>  dispatch(removeItemFromCart(cartItems,item))
    const deleteItem = () =>  dispatch(deleteItemFromCart(cartItems, item))
    
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