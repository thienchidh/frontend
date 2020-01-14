import {ACTION_CHANGE_ITEM_PAGE, ACTION_CHANGE_PAGE, ACTION_DELETE_PRODUCT} from "../actions/actionName";

const initState = {
    deletedItems: [],
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
        default:
    }
    return state;
};