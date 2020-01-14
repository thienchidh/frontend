import {ACTION_CLOSE_CART, ACTION_OPEN_CART, ACTION_UPDATE_CART} from "./actionName";

export const actionUpdateCart = function (payload) {
    return {
        type: ACTION_UPDATE_CART,
        payload: payload
    }
};
export const actionOpenCart = function (payload) {
    return {
        type: ACTION_OPEN_CART,
        payload: payload
    }
};
export const actionCloseCart = function (payload) {
    return {
        type: ACTION_CLOSE_CART,
        payload: payload
    }
};
