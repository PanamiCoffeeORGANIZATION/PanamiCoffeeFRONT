import axios from 'axios';
import { validateToken } from '../helpers/validateToken';
import { URL } from './linkConnection';

export const addProduct = async product => {

    const myProduct = product;

    if (!product.img) {
        delete myProduct.img
    }

    const { ok = false , token } = await validateToken();
    if ( !ok ) return;

    const newProduct = await axios.post(`${URL}/api/products`, {
        ...product
    },{
        headers: {
            'x-token': token
        }
    })
    .then( resp => resp.data )
    .catch( resp => resp.response.data );

    return newProduct;

}