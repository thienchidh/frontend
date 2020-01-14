import {ACTION_UPDATE_CART} from "./actionName";

export const actionUpdateCart = function (payload) {
    return {
        type: ACTION_UPDATE_CART,
        payload: payload
    }
};
