import {
    ACTION_BEGIN_SIGN_UP,
    ACTION_CHANGE_ACCOUNT_INFO,
    ACTION_CHANGE_SIGN_UP_INFO,
    ACTION_CHANGE_USER_INFO,
    ACTION_ERROR_SIGN_UP,
    ACTION_SUCCESS_SIGN_UP
} from "../actions/actionName";

const initState = {
    isLoading: false,
    account: {
        username: "",
        password: "",
        user: {
            firstName: "",
            lastName: "",
            email: "",
            role: "IS_USER",
            address: "_",
            other: "_"
        }
    },
    isError: false,
    error: undefined
};

export const signUpReducers = function (state = initState, action) {
    switch (action.type) {
        case ACTION_CHANGE_SIGN_UP_INFO:
            return {
                ...state,
            };
        case ACTION_CHANGE_ACCOUNT_INFO: {
            const {name, value} = action.payload;
            return {
                ...state,
                account: {
                    ...state.account,
                    [name]: value
                }
            };
        }
        case ACTION_CHANGE_USER_INFO: {
            const {name, value} = action.payload;
            return {
                ...state,
                account: {
                    ...state.account,
                    user: {
                        ...state.account.user,
                        [name]: value
                    }
                }
            };
        }
        case ACTION_BEGIN_SIGN_UP:
            return {
                ...state,
                isLoading: true,
            };
        case ACTION_SUCCESS_SIGN_UP:
            return {
                ...state,
                isLoading: false,
                isError: false,
                error: undefined
            };
        case ACTION_ERROR_SIGN_UP:
            return {
                ...state,
                isLoading: false,
                isError: true,
                error: action.payload
            };
        default:
    }

    return state;
};