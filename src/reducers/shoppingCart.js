import {
    ADD_PRODUCT,
    CLEAR_SHOPPINGCART,
    DELETE_PRODUCT,
    DELETE_STORE_PRODUCTS,
    EDIT_QUANTITY
} from "../actions/shoppingCart";
import update from 'immutability-helper';


// shoppingCart: {
//     products: [
//         {
//             productId: 1,
//             name: 'milk',
//             description: 'milk desc',
//             imageUrl: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
//             brand: 'acd',
//             category: 'd',
//             unit: 'L',
//             price: 9.99,
//             quantity: 1
//         }
//     ]
// }

const initialState = {
    products: []
}

export function shoppingCart(state=initialState,action) {

    switch (action.type) {
        case ADD_PRODUCT:
            let index = state.products.findIndex(p => (p.productId === action.product.product.productId)&&(p.store === action.product.product.store));
            if(index === -1)
                return {products: [...state.products, action.product.product]};
            return state;
        case DELETE_PRODUCT:
            return Object.assign({}, state,{
                products: state.products.filter(item => (item.productId !== action.product.productId) || (item.store !== action.product.store))
            });
        case DELETE_STORE_PRODUCTS:
            return Object.assign({}, state,{
                products: state.products.filter(item => (item.store !== action.store.store))
            });
        case CLEAR_SHOPPINGCART:
            return Object.assign({}, state,{
                products: initialState.products
            });
        case EDIT_QUANTITY:
            let i = state.products.findIndex(p => (p.productId === action.quantity.productId)&&(p.store === action.quantity.storeId));
            console.log(i);
            return update(state, {
                products: {
                    [i]: {
                        quantity: {$set: action.quantity.quantity}
                    }
                }
            })

        default:
            return state;
    }
}


