import axios from "axios";
import {apiConfig} from "../../apiConfig";

const {baseApiUrl} = apiConfig;

async function _autoLogin({token}) {
    const response = await axios.post(
        `${baseApiUrl}/login`,
        {token}
    );
    return response.status === 200 ? response.data.body : null;
}

async function _manualLogin({username, password}) {
    const response = await axios.post(
        `${baseApiUrl}/login`,
        {username, password}
    );
    return response.status === 200 ? response.data.body : null;
}

export async function login({username, password, token}) {
    return token != null ? _autoLogin({token: token}) : _manualLogin({username, password});
}

export async function logout({token}) {
    const response = await axios.post(
        `${baseApiUrl}/logout`,
        {token}
    );
    return response.status === 200;
}

export async function register({account}) {
    const response = await axios.post(
        `${baseApiUrl}/register`,
        {account}
    );
    return response.status === 200 ? response.data.body : null;
}

export async function fetchProducts({page = 0, limit = 30}) {
    const response = await axios.get(
        `${baseApiUrl}/products?page=${page}&limit=${limit}`
    );
    return response.status === 200 ? [...response.data.body] : [];
}

export async function fetchProductsById(id) {
    const response = await axios.get(
        `${baseApiUrl}/products/${id}`
    );
    return response.status === 200 ? [response.data.body] : [];
}


/** BEGIN ADMIN ONLY **/
export async function addProduct(product) {
    const response = await axios.post(
        `${baseApiUrl}/products/add`,
        product
    );
    return response.status === 200;
}

export async function deleteProductById({id}) {
    const {baseApiUrl} = apiConfig;
    const response = await axios.post(
        `${baseApiUrl}/products/delete`,
        {id}
    );
    return response.status === 200;
}

/** END ADMIN ONLY **/


/** BEGIN USER ONLY **/

export async function fetchCart({token}) {
    const response = await axios.post(
        `${baseApiUrl}/products/cart`,
        {token}
    );
    return response.status === 200 ? response.data.body : {};
}

export async function updateCart({token, cart = {}}) {
    try {
        const response = await axios.post(
            `${baseApiUrl}/products/cart/update`,
            {token, cart}
        );
        return response.status === 200 ? response.data.body : cart;
    } catch (ignored) {
        return cart;
    }
}

// TODO
export async function payment(token) {
    return true;
}

/** END USER ONLY **/


