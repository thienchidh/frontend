import {
    ACTION_CHANGE_ITEM_PAGE,
    ACTION_CHANGE_PAGE,
    ACTION_DELETE_PRODUCT,
    ACTION_UPDATE_QUANTITY
} from "../actions/actionName";

const initState = {
    deletedItems: [],
    quantityItems: [],
    currentPage: 0,
    limitItemPage: 8
};

export const productReducers = function (state = initState, action) {
    switch (action.type) {
        case ACTION_DELETE_PRODUCT:
            state.deletedItems[action.payload] = true;
            return {
                ...state,
                deletedItem: state.deletedItems,
            };
        case ACTION_CHANGE_PAGE:
            return {
                ...state,
                currentPage: parseInt(action.payload)
            };
        case ACTION_CHANGE_ITEM_PAGE:
            return {
                ...state,
                limitItemPage: parseInt(action.payload),
                currentPage: 0,
                deletedItem: []
            };
        case ACTION_UPDATE_QUANTITY:
            const quantities = action.payload;
            return {
                ...state,
                quantityItems: quantities,
            };
        default:
    }
    return state;
};