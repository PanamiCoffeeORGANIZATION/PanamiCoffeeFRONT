import axios from "axios";
import { URL } from "../api/linkConnection";

export const validateToken = async () => {

    const token = localStorage.getItem("token");
    
    // Se valida si el token pertenece al sistema
    if ( token ) {
        const response = await axios.get(`${URL}/api/users/token/validateToken`, {
            headers: {
                'x-token': token 
            }
        })
        .then( resp => resp.data )
        .catch( resp => resp.response.data )


        return response.ok === true ? { ok: true, token, user : response.user } : { ok: false };
    }
    else{
        return { ok: false }
    }

}
