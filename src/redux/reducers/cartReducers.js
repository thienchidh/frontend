import {ACTION_UPDATE_CART} from "../actions/actionName";

const initState = {
    cart: null
};
export const cartReducers = function (state = initState, action) {
    switch (action.type) {
        case ACTION_UPDATE_CART:
            return {
                ...state,
                cart: action.payload,
            };
        default:
    }

    return state;
};