# 建立Checkout Page
概念 : 
1. 當用戶點擊購物車的checkout btn, 移動到ckeckout page
2. checkout page顯示產品圖片、名稱、價格、數量、移除產品btn
3. 用戶可以在checkout page中調整購買數量
4. checkout page底端顯示購買的總金額

## 建立Checkout page的Route
1. 在src/routes中新增checkout component
2. 在 src/App.js中設定checkout page的路徑 <br>
src/App.js
```diff
import { Routes, Route } from 'react-router-dom'
import Home from './routes/home/home.component'
import Navigation from './routes/navigation/navigation.component'
import Authentication from './routes/authentication/authentication.component.jsx'
import Shop from './routes/shop/shop.component'
+ import Checkout from './routes/checkout/checkout.component'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='shop' element={<Shop />} />
+       <Route path='checkout' element={<Checkout />} />
      </Route>
    </Routes>
  )
}
export default App;
```

## 設定cart dropdown中的check out btn連結至check out page
1. import "react-router-dom"中的 useNavigat功能 : 該功能可以設定引導至web app的指定route
2. 將該功能置入到 Checkout btn的OnClick中
```diff 
+ import { useNavigate } from 'react-router-dom';

+ const navigate = useNavigate();

+     const goToCheckoutHandler = ()=>{
+       navigate("/checkout")
+   }

-            <Button>CKECKOUT</Button>
+           <Button onClick={goToCheckoutHandler}>CKECKOUT</Button>
```
src/components/cart-dropdown/cart-dropdown.component.jsx

```js
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/cart.context';


import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component'

import './cart-dropdown.styles.scss'

const CartDropDown = () => {
    const {cartItems} = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckoutHandler = ()=>{
        navigate("/checkout")
    }

    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {
                    cartItems.map((item)=>{
                        return (
                            <CartItem key={item.id} cartItem={item}/>
                        )
                    })
                }
            </div>
            <Button onClick={goToCheckoutHandler}>CKECKOUT</Button>

        </div>
    )
}
export default CartDropDown
```

## 配置checkout component
1. 取用CartContext中的 cartItems數據，用來撈取產品的資訊
```diff
+ import { useContext } from 'react'
+ import { CartContext } from '../../context/cart.context'

const Checkout = () => {
+   const { cartItems } = useContext(CartContext)

    return (
        <div className='checkout-container'>
          ...
        </div>
    )
}

export default Checkout
```
2. 連結CheckoutItemCard component，將cartItems數據做為props傳遞到CheckoutItemCard，以呈現產品資訊 (後續配置CheckoutItemCart)
> 迴圈製作的html element 都需要key (通常=id)
```diff
+ import CheckoutItemCard from '../../components/checkout-item-card/checkout-item-card.component'

const Checkout = () => {
    ...

    return (
        <div className='checkout-container'>
            <div className="header">
                <p className='product'>Product</p>
                <p className='description'>Description</p>
            </div>
            <div className="item-cards-container">
+               {
+                   cartItems.map(item => {
+                       return <CheckoutItemCard key={item.id} item={item} />
+                   })
+               }
            </div>
        </div>
    )
}
export default Checkout
```
3. 取用CartContext中的 totalPrice數據，用來呈現總價格 (後續製作totalPrice功能)
```diff
import { useContext } from 'react'
import { CartContext } from '../../context/cart.context'

const Checkout = () => {
+   const { cartItems, totalPrice } = useContext(CartContext)

    return (
        <div className='checkout-container'>
                ...
+           {
+               totalPrice!==0 && <p className='total'>total: $ {totalPrice}</p>
+           }
        </div>
    )
}
export default Checkout
```
src/routes/checkout/checkout.component.jsx
```js
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
```

## CartContext中建立 totalPrice數據
1. 在CartContext 中 新增 totalPrice，初始值為0
```diff
export const CartContext = createContext({
    ...
+   totalPrice: 0
})
```
2. 在CartProvider中以useState重設totalPrice，並透過useEffect設定當cartItems發生改變時，計算totalPrice的值
```js
export const CartProvider = ({ children }) => {
const [totalPrice, setTotalPrice] = useState(0);
   useEffect(() => {
        const newTotal = cartItems.reduce((total, item) => total + item.qty * item.price, 0)
        setTotalPrice(newTotal)
    }, [cartItems])

const value = {
        ...,
        totalPrice
    }
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}
```

## 新增CheckoutItemCard Component
1. 取用 Checkout Component傳遞下來的props(產品資訊)，顯示在網頁中
2. 在顯示的qty中，新增增加及減少的按鈕，讓用戶可以增減購買的產品數量
3. 在CartContext中新增 "減少產品數量"的功能
```js
import { createContext } from 'react';
   const removeCartItem = (cartItems, productToRemove) => {
    const newCartItems = cartItems.map(item => item.id === productToRemove.id ? { ...item, qty: item.qty - 1 } : item);
    newCartItems.forEach(item => {
        if (item.qty === 0) {
            const index = newCartItems.indexOf(item);
            newCartItems.splice(index, 1)
        }
    })
    return newCartItems
}

export const CartContext = createContext({
    removeItemFromCart: () => null,
})

export const CartProvider = ({ children }) =>{
    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove))
    }

    const value = {removeItemFromCart}

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}


```
4. 在CheckoutItemCard中新增刪除產品的按鈕，讓用戶可以直接刪除放到購物車的產品，並在CartContext中新增 "刪除產品"的功能

```js
import { createContext } from 'react';

const deleteCartItem = (cartItems, productToDelete) => {
    return cartItems.filter(item => item.id !== productToDelete.id)
}

export const CartContext = createContext({
    deleteItemFromCart: () => null
})

export const CartProvider = ({ children }) =>{
    const deleteItemFromCart = (productToDelete) => {
        setCartItems(deleteCartItem(cartItems, productToDelete))
    }
    
    const value = {deleteItemFromCart}

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}
```
src/components/checkout-item-card/checkout-item-card.component.jsx
```js
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
```