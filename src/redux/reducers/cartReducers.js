import {ACTION_CLOSE_CART, ACTION_OPEN_CART, ACTION_UPDATE_CART} from "../actions/actionName";

const initState = {
    cart: null,
    isOpen: false,
};
export const cartReducers = function (state = initState, action) {
    switch (action.type) {
        case ACTION_UPDATE_CART:
            return {
                ...state,
                cart: action.payload,
            };
        case ACTION_OPEN_CART:
            return {
                ...state,
                isOpen: true,
            };
        case ACTION_CLOSE_CART:
            return {
                ...state,
                isOpen: false,
            };
        default:
    }

    return state;
};