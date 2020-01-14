import {BEGIN_FETCH_DATA, ERROR_FETCH_DATA, SUCCESS_FETCH_DATA} from "../actions/actionName";

const initState = {
    isLoading: false,
    jsonResult: null,
    error: null,
    isLoadMore: false
};

export const fetchDataReducers = function (state = initState, action) {
    switch (action.type) {
        case BEGIN_FETCH_DATA:
            return {
                ...state,
                isLoading: true,
                isLoadMore: (action.payload === true),
            };
        case SUCCESS_FETCH_DATA:
            return {
                ...state,
                isLoading: false,
                error: null,
                jsonResult: action.payload,
                isLoadMore: false
            };
        case ERROR_FETCH_DATA:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
                isLoadMore: false
            };
        default:
    }

    return state;
};