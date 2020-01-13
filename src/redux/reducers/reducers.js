import {combineReducers} from "redux";
import {fetchDataReducers} from "./fetchDataReducers";
import {authenticationReducers} from "./authenticationReducers";

export default combineReducers(
    {
        fetchDataReducers,
        authenticationReducers,
    }
);