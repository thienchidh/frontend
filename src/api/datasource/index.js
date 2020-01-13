import axios from "axios";
import {apiConfig} from "../../apiConfig";

const {baseApiUrl} = apiConfig;

export async function register(account) {
    const response = await axios.post(
        `${baseApiUrl}/register`,
        account
    ).catch(ignored => {
    });
    return response?.status === 200 ? response.data.body : null;
}

export async function login({username, password, token}) {
    return token != null ? _autoLogin(token) : _manualLogin({username, password});
}

async function _autoLogin(token) {
    const response = await axios.post(
        `${baseApiUrl}/loginWithToken`,
        token,
        {
            headers: {
                'Content-Type': 'text/plain'
            }
        }
    ).catch(ignored => {
    });
    return response?.status === 200 ? response.data.body : null;
}

async function _manualLogin({username, password}) {
    const response = await axios.post(
        `${baseApiUrl}/login`,
        {username, password}
    ).catch(ignored => {
    });
    return response?.status === 200 ? response.data.body : null;
}

export async function logout(token) {
    const response = await axios.post(
        `${baseApiUrl}/logout`,
        {token}
    ).catch(ignored => {
    });
    return response?.status === 200;
}

export async function fetchProducts({page = 0, limit = 30}) {
    const response = await axios.get(
        `${baseApiUrl}/products?page=${page}&limit=${limit}`
    ).catch(ignored => {
    });
    return response?.status === 200 ? [...response.data.body] : [];
}

export async function fetchProductById(id) {
    const response = await axios.get(
        `${baseApiUrl}/products/${id}`
    ).catch(ignored => {
    });
    return response?.status === 200 ? [response.data.body] : [];
}


/** BEGIN ADMIN ONLY **/
export async function addProduct(product) {
    const response = await axios.post(
        `${baseApiUrl}/products/add`,
        product
    ).catch(ignored => {
    });
    return response?.status === 200;
}

export async function addListProducts(products) {
    const response = await axios.post(
        `${baseApiUrl}/products/addList`,
        products
    ).catch(ignored => {
    });
    return response?.status === 200;
}

export async function deleteProductById({id}) {
    const {baseApiUrl} = apiConfig;
    const response = await axios.post(
        `${baseApiUrl}/products/delete`,
        {id}
    ).catch(ignored => {
    });
    return response?.status === 200;
}

/** END ADMIN ONLY **/


/** BEGIN USER ONLY **/

export async function fetchCart(token) {
    const response = await axios.post(
        `${baseApiUrl}/products/cart`,
        token
    ).catch(ignored => {
    });
    return response?.status === 200 ? response.data.body : {};
}

export async function updateCart(token, cart = {}) {
    const response = await axios.post(
        `${baseApiUrl}/products/cart/update`,
        {token, cart}
    ).catch(ignored => {
    });
    return response?.status === 200 ? response.data.body : cart;
}

// TODO
export async function payment(token) {
    return true;
}

/** END USER ONLY **/


