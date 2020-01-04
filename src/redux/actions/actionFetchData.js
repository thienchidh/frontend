import {BEGIN_FETCH_DATA, ERROR_FETCH_DATA, SUCCESS_FETCH_DATA} from "./actionName";

export const actionBeginFetchData = function () {
    return {
        type: BEGIN_FETCH_DATA
    }
};

export const actionSuccessFetchData = function (payload) {
    return {
        type: SUCCESS_FETCH_DATA,
        payload: payload
    }
};

export const actionErrorFetchData = function (payload) {
    return {
        type: ERROR_FETCH_DATA,
        payload: payload
    }
};

