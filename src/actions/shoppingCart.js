export const ADD_PRODUCT = 'ADD_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const DELETE_STORE_PRODUCTS = 'DELETE_STORE_PRODUCTS';
export const EDIT_QUANTITY = 'EDIT_QUANTITY';
export const CLEAR_SHOPPINGCART = 'CLEAR_SHOPPINGCART';

export function addProduct(product) {
    return {
        type: ADD_PRODUCT,
        product: product
    }
}

export function deleteProduct(product) {
    return {
        type: DELETE_PRODUCT,
        product: product
    }
}

export function deleteStoreProducts(store) {
    return {
        type: DELETE_STORE_PRODUCTS,
        store: store
    }
}

export function editQuantity(quantity) {
    return {
        type: EDIT_QUANTITY,
        quantity: quantity
    }
}

export function clearShoppingCart(){
    return {
        type: CLEAR_SHOPPINGCART
    }
}
