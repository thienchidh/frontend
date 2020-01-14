import {combineReducers} from "redux";
import {fetchDataReducers} from "./fetchDataReducers";
import {authenticationReducers} from "./authenticationReducers";
import {signUpReducers} from "./signUpReducers";
import {productReducers} from "./productReducers";

export default combineReducers(
    {
        fetchDataReducers,
        authenticationReducers,
        signUpReducers,
        productReducers
    }
);