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

export default {
    actionBeginFetchData,
    actionErrorFetchData,
    actionSuccessFetchData,
    actionChangeLoginInfo,
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
