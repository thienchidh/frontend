import {
    ACTION_BEGIN_LOGIN,
    ACTION_CHANGE_LOGIN_INFO,
    ACTION_CHANGE_REMEMBER,
    ACTION_CHANGE_SESSION,
    ACTION_ERROR_LOGIN
} from "../actions/actionName";

const initState = {
    isRemember: localStorage["isRemember"] || false,
    account: {
        username: localStorage["username"] || "",
        password: localStorage["password"] || "",
    },
    isBeginLogin: false,
    isSuccessLogin: false,
    isErrorLogin: false,
    session: localStorage["session"] && JSON.parse(localStorage["session"] || null),
};

export const authenticationReducers = function (state = initState, action) {

    switch (action.type) {
        case ACTION_CHANGE_REMEMBER:
            const isRemember = !state.isRemember;
            return {
                ...state,
                isRemember: isRemember
            };
        case ACTION_CHANGE_LOGIN_INFO:
            const {name, value} = action.payload;
            return {
                ...state,
                account: {
                    ...state.account,
                    [name]: value
                }
            };
        case ACTION_BEGIN_LOGIN:
            return {
                ...state,
                isBeginLogin: true,
            };
        case ACTION_CHANGE_SESSION:
            localStorage["session"] = JSON.stringify(action.payload || null);
            return {
                ...state,
                isBeginLogin: false,
                isSuccessLogin: true,
                isErrorLogin: false,
                session: action.payload
            };
        case ACTION_ERROR_LOGIN:
            return {
                ...state,
                isBeginLogin: false,
                isSuccessLogin: false,
                isErrorLogin: true,
                session: null
            };
        default:
    }

    return state;
};