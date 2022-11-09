import axios from 'axios';
import { URL } from './linkConnection';

export const getProductsByCategory = async ( id ) => {

    const products = await axios.get(`${URL}/api/search/productByCategory/${id}`);
    return products.data.result;

}

