# 完善購物車彈出視窗功能
目標 : webApp可以追蹤用戶加入購物車的商品與數量，並顯示在購物車彈出視窗中。主要工作流程為兩步驟，第一 : 將購物車視窗顯示商品與數量，第二 : 購物車icon顯示已選擇的產品總數量

## 在CartContext中追蹤產品數量
1. 在CartContext中設定cartItems來儲放用戶加入購物車的產品，並設定addItemToCart function 作為當用戶點擊產品時，將產品加入cartItems的方法
```diff
export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: ()=>null
+   cartItems: [],
+   addItemToCart: () => null,
})
```
2. 在cart.context.jsx中設置addItemToCart function。邏輯 : Cart中沒有用戶選擇的產品，將該產品的數據加入到cartItems中（包含 id, name, imageUrl, price），並將qty key 的value設置為1，如果Cart中已經存在用戶選擇的產品，讓該產品的qty +1
```js
const addCartItem = (cartItems, productToAdd) => {
    const existingItem = cartItems.find(item => item.id === productToAdd.id)
    if (!existingItem) {
        return [...cartItems, { ...productToAdd, qty: 1 }]
    } else {
        return cartItems.map(item => item.id === productToAdd.id ? ({ ...item, qty: item.qty + 1 }) : (item))
    }
}
```
3. 在 CartProvider中 將cartItems設定useState, 並新增addItemToCart作為更新cart中產品的function，傳遞至子component中取用
```diff
export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false)
+   const [cartItems, setCartItems] = useState([])

+   const addItemToCart = (productToAdd) => {
+       setCartItems(addCartItem(cartItems, productToAdd));
+   }

+   const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart}
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}
```
4. 在src/components/product-card/product-card.component.jsx 中 提取CardProvider的 addItemToCart function，作為Button 裡 Onclick觸發的動作，使用戶點擊add to cart Button時，納入或增加產品的數量

```js
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
            <div className='product-line'> </div>
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
```
5. 在card-dropdown.component中取用 cartItems ，並將 cartItems.map中的item傳遞給CartItem Compoent中使用
```diff
+ import { useContext } from 'react';
+ import { CartContext } from '../../context/cart.context';

import Button from '../button/button.component'
+ import CartItem from '../cart-item/cart-item.component'

import './cart-dropdown.styles.scss'

const CartDropDown = () => {
+    const {cartItems} = useContext(CartContext)

    return (
        <div className='cart-dropdown-container'>
+            <div className='cart-items'>
+                {
+                   cartItems.map((item)=>{
+                       return (
+                           <CartItem key={item.id} cartItem={item}/>
+                       )
+                    })
+               }
+           </div>
            <Button>CKECKOUT</Button>
        </div>
    )
}
export default CartDropDown    
```
6. 新增 cart-item component，將用戶新增的item進行html配置，以呈現產品圖片、名稱、價格及數量
```js
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
```

## 在CartIcon上計算用戶選擇的產品總數
1. 在CartContext中新增cartCount, 並透過useEffect設定當cartItems改變時(用戶新增產品至購物車)，計算總產品數量，並setState到cartCount之中
```diff
+ import { createContext, useState, useEffect } from 'react';

const addCartItem = (cartItems, productToAdd) => {
    const existingItem = cartItems.find(item => item.id === productToAdd.id)
    if (!existingItem) {
        return [...cartItems, { ...productToAdd, qty: 1 }]
    } else {
        return cartItems.map(item => item.id === productToAdd.id ? ({ ...item, qty: item.qty + 1 }) : (item))
    }
}


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => null,
    cartItems: [],
    addItemToCart: () => null,
+   cartCount: 0,
})

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState([])
+   const [cartCount, setCartCount] = useState(0)

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

+   useEffect(() => {
+       const newCount = cartItems.reduce((total, cartItem) => total + cartItem.qty, 0);
+       setCartCount(newCount)
+   }, [cartItems])


+   const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount }
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}
```
2. 在cart icon component中取用CartContext中的cartCount，更新在反映產品總數中
```diff
-    const {isCartOpen, setIsCartOpen} = useContext(CartContext)
+   const {isCartOpen, setIsCartOpen, cartCount} = useContext(CartContext)
-  <span className='item-count'>0</span>
+  <span className='item-count'>{cartCount}</span>
```
```js
import { useContext } from 'react';
import {ReactComponent as ShoppingIcon} from "../../assets/shopping-bag.svg";
import { CartContext } from '../../context/cart.context';

import './cart-icon.styles.scss';

const CartIcon = () => {
    const {isCartOpen, setIsCartOpen, cartCount} = useContext(CartContext)

    const toggleCart = () => {
        console.log("click");
        setIsCartOpen(!isCartOpen);
    }
    return (
        <div className='cart-icon-container' onClick={toggleCart}>
            <ShoppingIcon className='shopping-icon'/>
            <span className='item-count'>{cartCount}</span>
        </div>
    )
}
export default CartIcon
```