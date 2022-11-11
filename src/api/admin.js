import axios from 'axios';
import { URL } from './linkConnection';

export const addProduct = async product => {

    const { ok = false , token } = await validateToken();
    if ( !ok ) return;

    const newProduct = await axios.post(`${URL}/api/products`, {
        product
    },{
        headers: {
            'x-token': token
        }
    })
    .then( resp => resp.data )
    .catch( resp => resp.response.data );

    console.log( newProduct );

}