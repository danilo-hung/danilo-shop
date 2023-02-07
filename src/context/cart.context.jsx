import { createContext, useReducer } from 'react';
import { createAction } from '../utils/reducer/reducer.utils';


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
    cartTotal: 0
})

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}
export const CART_ACTION_TYPE = {
    CART_TOGGLE: "CART_TOGGLE",
    SET_CART_ITEMS: "SET_CART_ITEMS"
}

const cartReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case CART_ACTION_TYPE.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        case CART_ACTION_TYPE.CART_TOGGLE:
            return {
                ...state,
                isCartOpen: payload
            }
        default:
            throw new Error(`Unhandled type ${type} in cartReducer`)
    }
}

export const CartProvider = ({ children }) => {
    const [{ isCartOpen, cartItems, cartCount, cartTotal }, dispatch] = useReducer(cartReducer, INITIAL_STATE);
    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.qty, 0);
        const newCartTotal = newCartItems.reduce((total, item) => total + item.qty * item.price, 0);
        dispatch(createAction(
            CART_ACTION_TYPE.SET_CART_ITEMS,
            {
                cartItems: newCartItems,
                cartTotal: newCartTotal,
                cartCount: newCartCount
            }))
    }
    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems)
    }
    const removeItemFromCart = (productToRemove) => {
        const newCartItems = removeCartItem(cartItems, productToRemove);
        updateCartItemsReducer(newCartItems)
    }
    const deleteItemFromCart = (productToDelete) => {
        const newCartItems = deleteCartItem(cartItems, productToDelete);
        updateCartItemsReducer(newCartItems)
    }

    const setIsCartOpen = (bool) => {
        // dispatch({
        //     type: CART_ACTION_TYPE.CART_TOGGLE,
        //     payload: bool
        // })
        dispatch(createAction(CART_ACTION_TYPE.CART_TOGGLE, bool))
    }
    
    const value = {
        isCartOpen,
        setIsCartOpen,
        cartItems,
        addItemToCart,
        cartCount,
        removeItemFromCart,
        deleteItemFromCart,
        cartTotal
    }
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}