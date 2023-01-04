import { createContext, useState, useEffect } from 'react';

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
    cartCount: 0,
})

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [cartCount, setCartCount] = useState(0)

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    useEffect(() => {
        const newCount = cartItems.reduce((total, cartItem) => total + cartItem.qty, 0);
        setCartCount(newCount)
    }, [cartItems])

    const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount }
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}