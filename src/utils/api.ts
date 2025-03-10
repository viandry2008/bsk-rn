import {API_URL} from '@env';

// authetication
export const postLogin = API_URL + `api/v2/auth/login`;

// category
export const getCategories = API_URL + `api/v2/categories`;
export const getSubCategories = ({id}: any) =>
  API_URL + `api/v2/categories/${id}`;

// favorites
export const getFavorites = API_URL + `api/v2/favorites`;
export const postFavorite = API_URL + `api/v2/favorites`;

// authors
export const getAuthors = ({page}: any) =>
  API_URL + `api/v2/authors?page=${page}`;
export const getAuthorsSearch = ({search, page}: any) =>
  API_URL + `api/v2/authors?query=${search}&page=${page}`;
export const getAuthorDetail = ({id}: any) => API_URL + `api/v2/authors/${id}`;
export const getAuthorBooks = ({id, page}: any) =>
  API_URL + `api/v2/authors/${id}/books?page=${page}`;

// profile
export const getMe = API_URL + `api/v2/profil/getbytoken`;
