import {API_URL} from '@env';

// authetication
export const postLogin = API_URL + `api/v2/auth/login`;
export const getMe = API_URL + `api/v2/profil/getbytoken`;

// category
export const getCategories = API_URL + `api/v2/categories`;
export const getSubCategories = ({id}: any) =>
  API_URL + `api/v2/categories/${id}`;
