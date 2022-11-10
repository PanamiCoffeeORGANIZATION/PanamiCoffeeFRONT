import axios from 'axios';
import { URL } from './linkConnection';

export const getAllCategories = async () => {

    const categories = await axios(`${URL}/api/categories`)
    console.log( categories );
    return categories.data.categories;

}
export const getOneCategory = async ( id = '') => {

    const categories = await axios(`${URL}/api/categories/${ id }`)
    return categories.data.myCategory;

}