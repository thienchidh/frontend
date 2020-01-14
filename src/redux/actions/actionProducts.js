import {
    ACTION_ADD_PRODUCT,
    ACTION_CHANGE_ITEM_PAGE,
    ACTION_CHANGE_PAGE,
    ACTION_DELETE_PRODUCT,
    ACTION_TYPE_PRODUCT,
    ACTION_UPDATE_QUANTITY
} from "./actionName";

export const actionDeleteProduct = function (payload) {
    return {
        type: ACTION_DELETE_PRODUCT,
        payload: payload
    }
};
export const actionTypeProduct = function (payload) {
    return {
        type: ACTION_TYPE_PRODUCT,
        payload: payload
    }
};
export const actionAddProduct = function (payload) {
    return {
        type: ACTION_ADD_PRODUCT,
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
export const actionUpdateQuantity = function (payload) {
    return {
        type: ACTION_UPDATE_QUANTITY,
        payload: payload
    }
};
