import {actionBeginFetchData, actionErrorFetchData, actionSuccessFetchData} from "./actionFetchData"
import {
    actionBeginLogin,
    actionChangeLoginInfo,
    actionChangeRemember,
    actionChangeSession,
    actionErrorLogin
} from "./actionSignIn";
import {actionChangeAccountInfo, actionChangeSignUpInfo, actionChangeUserInfo} from "./actionSignUp";
import {
    actionAddProduct,
    actionChangePage,
    actionDeleteProduct,
    actionTypeProduct,
    actionUpdateQuantity
} from "./actionProducts";
import {actionCloseCart, actionOpenCart, actionUpdateCart} from "./actionCart";

export default {
    actionBeginFetchData,
    actionErrorFetchData,
    actionSuccessFetchData,
    actionChangeLoginInfo,
    actionUpdateCart,
    actionChangeRemember,
    actionBeginLogin,
    actionChangeSession,
    actionOpenCart,
    actionCloseCart,
    actionErrorLogin,
    actionChangeSignUpInfo,
    actionChangeAccountInfo,
    actionChangeUserInfo,
    actionDeleteProduct,
    actionChangePage,
    actionUpdateQuantity,
    actionAddProduct,
    actionTypeProduct,

};
