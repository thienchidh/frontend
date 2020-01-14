import {actionBeginFetchData, actionErrorFetchData, actionSuccessFetchData} from "./actionFetchData"
import {
    actionBeginLogin,
    actionChangeLoginInfo,
    actionChangeRemember,
    actionChangeSession,
    actionErrorLogin
} from "./actionSignIn";
import {actionChangeAccountInfo, actionChangeSignUpInfo, actionChangeUserInfo} from "./actionSignUp";
import {actionChangePage, actionDeleteProduct} from "./actionProducts";
import {actionUpdateCart} from "./actionCart";

export default {
    actionBeginFetchData,
    actionErrorFetchData,
    actionSuccessFetchData,
    actionChangeLoginInfo,
    actionUpdateCart,
    actionChangeRemember,
    actionBeginLogin,
    actionChangeSession,
    actionErrorLogin,
    actionChangeSignUpInfo,
    actionChangeAccountInfo,
    actionChangeUserInfo,
    actionDeleteProduct,
    actionChangePage,
};
