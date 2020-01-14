import {combineReducers} from "redux";
import {fetchDataReducers} from "./fetchDataReducers";
import {authenticationReducers} from "./authenticationReducers";
import {signUpReducers} from "./signUpReducers";
import {productReducers} from "./productReducers";
import {cartReducers} from "./cartReducers";

export default combineReducers(
    {
        fetchDataReducers,
        authenticationReducers,
        signUpReducers,
        productReducers,
        cartReducers
    }
);