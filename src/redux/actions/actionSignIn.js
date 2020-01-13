import {
    ACTION_BEGIN_LOGIN,
    ACTION_CHANGE_LOGIN_INFO,
    ACTION_CHANGE_REMEMBER,
    ACTION_CHANGE_SESSION,
    ACTION_ERROR_LOGIN
} from "./actionName";

export const actionChangeRemember = function () {
    return {
        type: ACTION_CHANGE_REMEMBER
    }
};

export const actionChangeLoginInfo = function (payload) {
    return {
        type: ACTION_CHANGE_LOGIN_INFO,
        payload: payload
    }
};

export const actionBeginLogin = function (payload) {
    return {
        type: ACTION_BEGIN_LOGIN,
        payload: payload
    }
};

export const actionChangeSession = function (payload) {
    return {
        type: ACTION_CHANGE_SESSION,
        payload: payload
    }
};

export const actionErrorLogin = function (payload) {
    return {
        type: ACTION_ERROR_LOGIN,
        payload: payload
    }
};

