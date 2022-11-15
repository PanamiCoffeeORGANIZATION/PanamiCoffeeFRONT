import axios from "axios";
import { validateToken } from "../helpers/validateToken";
import { URL } from './linkConnection';

// LOG-IN
export const login = async (data) => {
    try {
        const res = await axios
            .post(`${URL}/api/auth/login`, {
                email: data.email,
                password: data.password
            })
            .then((resp) => resp.data )
            .catch((error) => error.response.data );

            return res;

    } catch (error) {
        console.log(error);
    }
};

// SIGN-UP
export const signup = async (user, role = 'USER_ROLE') => {
    try {
        const res = await axios
            .post(`${URL}/api/users`, {
                name: user.name,
                email: user.email,
                password: user.password,
                role: role
            })
            .then((resp) => resp.data )
            .catch((error) => error.response.data );

            return res;

    } catch (error) {
        console.log(error);
    }
};

export const getOneUser = async ( uid ) => {

    const user = await axios.get(`${URL}/api/users/${uid}`);
    return user.data.user;

}

export const getAllUsers = async () => {

    const user = await axios.get(`${URL}/api/users`);
    return user.data.users;

}

export const getAllPurchases = async () => {

    const purchases = await axios.get(`${URL}/api/users/purchases`);

    return purchases.data.purchases;

}

// PURCHASE
export const purchase = async (data) => {

    const { ok = false , token } = await validateToken();
    if ( !ok ) return;

    try {
        const res = await axios
            .put(`${URL}/api/users/purchase`,{
                cant: data.products.length,
                products: data.products,
                total: data.total
            },
            {
                headers: {
                    'x-token':token
                }
            })
            .then((resp) => resp.data )
            .catch((error) => error.response.data );

            return res;

    } catch (error) {
        console.log(error);
    }
};
