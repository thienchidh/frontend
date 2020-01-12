import {BEGIN_FETCH_DATA, ERROR_FETCH_DATA, SUCCESS_FETCH_DATA} from "../actions/actionName";

const initState = {
    isLoading: false,
    jsonResult: null,
    error: null,
};

export const fetchDataReducers = function (state = initState, action) {
    switch (action.type) {
        case BEGIN_FETCH_DATA:
            return {
                ...state,
                isLoading: true
            };
        case SUCCESS_FETCH_DATA:
            return {
                ...state,
                isLoading: false,
                error: null,
                jsonResult: action.payload
            };
        case ERROR_FETCH_DATA:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        default:
    }

    return state;
};