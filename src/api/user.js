import axios from "axios";
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
