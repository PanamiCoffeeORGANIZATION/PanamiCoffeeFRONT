import axios from 'axios';
import { URL } from './linkConnection';

export const getAllProducts = async () => {

    const products = await axios.get(`${URL}/api/products`);
    return products.data.products;

}
export const getProductsByPage = async ( from = 0 ) => {

    const products = await axios.get(`${URL}/api/products/page?from=${from}`);
    return products.data;

}
