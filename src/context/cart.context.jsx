import { createContext, useState, useEffect } from 'react';

const addCartItem = (cartItems, productToAdd) => {
    const existingItem = cartItems.find(item => item.id === productToAdd.id)
    if (!existingItem) {
        return [...cartItems, { ...productToAdd, qty: 1 }]
    } else {
        return cartItems.map(item => item.id === productToAdd.id ? ({ ...item, qty: item.qty + 1 }) : (item))
    }
}

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

const deleteCartItem = (cartItems, productToDelete) => {
    return cartItems.filter(item => item.id !== productToDelete.id)
}


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => null,
    cartItems: [],
    addItemToCart: () => null,
    removeItemFromCart: () => null,
    deleteItemFromCart: () => null,
    cartCount: 0,
    totalPrice: 0
})

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [cartCount, setCartCount] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove))
    }
    const deleteItemFromCart = (productToDelete) => {
        setCartItems(deleteCartItem(cartItems, productToDelete))
    }

    useEffect(() => {
        const newCount = cartItems.reduce((total, cartItem) => total + cartItem.qty, 0);
        setCartCount(newCount)
    }, [cartItems])

    useEffect(() => {
        const newTotal = cartItems.reduce((total, item) => total + item.qty * item.price, 0)
        setTotalPrice(newTotal)
    }, [cartItems])

    const value = {
        isCartOpen,
        setIsCartOpen,
        cartItems,
        addItemToCart,
        cartCount,
        removeItemFromCart,
        deleteItemFromCart,
        totalPrice
    }
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}