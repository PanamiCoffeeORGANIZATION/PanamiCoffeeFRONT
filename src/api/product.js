import axios from 'axios';
import { validateToken } from '../helpers/validateToken';
import { URL } from './linkConnection';

export const getAllProducts = async () => {

    const products = await axios.get(`${URL}/api/products`);
    return products.data.products;

}
export const getProductsByPage = async ( from = 0 ) => {

    const products = await axios.get(`${URL}/api/products/page?from=${from}`);
    return products.data;

}

export const putProduct = async product => {

    const myProductItem = product;

    const { ok, token, user } = await validateToken();
    if ( !ok ) return location.href = "/error/nonevalidation";

    if (!myProductItem.img) {
        delete myProductItem.img
    }

    try {
        const myProduct = axios.put(`${URL}/api/products/${myProductItem.id}`,
        myProductItem,
        {
            headers:{
                'x-token': token
            }
        }
        )
        .then( resp => resp.data )
        .catch( resp => resp.response.data );

        return  myProduct;

    } catch (error) {
        console.log( error );
    }

}

export const deleteProduct = async id => {

    const { ok, token, user } = await validateToken();
    if ( !ok ) return location.href = "/error/nonevalidation";

    try {
        const resp = axios.delete(`${URL}/api/products/${id}`,
        {
            headers:{
                'x-token': token
            }
        }
        )
        .then( resp => resp.data )
        .catch( resp => resp.response.data );
        console.log( resp);
        return  resp;

    } catch (error) {
        console.log( error );
    }

}
