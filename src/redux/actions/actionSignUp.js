import {
    ACTION_BEGIN_SIGN_UP,
    ACTION_CHANGE_ACCOUNT_INFO,
    ACTION_CHANGE_SIGN_UP_INFO,
    ACTION_CHANGE_USER_INFO,
    ACTION_ERROR_SIGN_UP,
    ACTION_SUCCESS_SIGN_UP
} from "./actionName";

export const actionChangeSignUpInfo = function (payload) {
    return {
        type: ACTION_CHANGE_SIGN_UP_INFO,
        payload: payload
    }
};
export const actionChangeUserInfo = function (payload) {
    return {
        type: ACTION_CHANGE_USER_INFO,
        payload: payload
    }
};

export const actionChangeAccountInfo = function (payload) {
    return {
        type: ACTION_CHANGE_ACCOUNT_INFO,
        payload: payload
    }
};

export const actionBeginSignUp = function (payload) {
    return {
        type: ACTION_BEGIN_SIGN_UP,
        payload: payload
    }
};


export const actionSuccessSignUp = function (payload) {
    return {
        type: ACTION_SUCCESS_SIGN_UP,
        payload: payload
    }
};


export const actionErrorSignUp = function (payload) {
    return {
        type: ACTION_ERROR_SIGN_UP,
        payload: payload
    }
};

