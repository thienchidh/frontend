import {ACTION_CHANGE_ITEM_PAGE, ACTION_CHANGE_PAGE, ACTION_DELETE_PRODUCT} from "./actionName";

export const actionDeleteProduct = function (payload) {
    return {
        type: ACTION_DELETE_PRODUCT,
        payload: payload
    }
};
export const actionChangePage = function (payload) {
    return {
        type: ACTION_CHANGE_PAGE,
        payload: payload
    }
};
export const actionChangeItemPage = function (payload) {
    return {
        type: ACTION_CHANGE_ITEM_PAGE,
        payload: payload
    }
};
