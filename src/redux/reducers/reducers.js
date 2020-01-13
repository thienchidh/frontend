import {combineReducers} from "redux";
import {fetchDataReducers} from "./fetchDataReducers";
import {authenticationReducers} from "./authenticationReducers";
import {signUpReducers} from "./signUpReducers";

export default combineReducers(
    {
        fetchDataReducers,
        authenticationReducers,
        signUpReducers,
    }
);