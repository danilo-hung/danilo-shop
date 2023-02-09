import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPE } from "./cart.type";

const addCartItem = (cartItems, productToAdd) => {
    const existingItem = cartItems.find(
        item => item.id === productToAdd.id
    );

    if (!existingItem) {
        return [...cartItems, { ...productToAdd, qty: 1 }]
    } else {
        return cartItems.map(item =>
            item.id === productToAdd.id ?
                ({ ...item, qty: item.qty + 1 })
                : (item))
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

export const setIsCartOpen = (bool) =>
    createAction(CART_ACTION_TYPE.CART_TOGGLE, bool)

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPE.SET_CART_ITEMS, newCartItems)
}
export const removeItemFromCart = (cartItems, productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove);
    return createAction(CART_ACTION_TYPE.SET_CART_ITEMS, newCartItems)
}
export const deleteItemFromCart = (cartItems, productToDelete) => {
    const newCartItems = deleteCartItem(cartItems, productToDelete);
    return createAction(CART_ACTION_TYPE.SET_CART_ITEMS, newCartItems)
}



