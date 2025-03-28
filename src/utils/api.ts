import {API_URL} from '@env';

// authetication
export const postLogin = API_URL + `api/v2/auth/login`;

// category
export const getCategories = API_URL + `api/v2/categories`;
export const getSubCategories = ({id}: any) =>
  API_URL + `api/v2/categories/${id}`;

// favorites
export const getFavorites = ({page}: any) =>
  API_URL + `api/v2/favorites?page=${page}&limit=12`;
export const postFavorite = API_URL + `api/v2/favorites`;

// authors
export const getAuthorDetail = ({id}: any) => API_URL + `api/v2/authors/${id}`;
export const getAuthorBooks = ({id, page}: any) =>
  API_URL + `api/v2/authors/${id}/books?page=${page}`;
export const getAllAuthors = ({limit, page, query}: any) =>
  API_URL +
  `api/v2/authors?limit=${limit}&page=${page}${
    query != '' ? `&query=${query}` : ''
  }`;

// books
export const getBooksByCategory = ({category, page}: any) =>
  API_URL + `api/v2/ebooks?page=${page}&category=${category}`;
export const getBookDetail = ({id}: any) => API_URL + `api/v2/ebook/${id}`;
export const getAllBooks = ({category, type, limit, page, query}: any) =>
  API_URL +
  `api/v2/ebooks?category=${category}&type=${type}&limit=${limit}&page=${page}${
    query != '' ? `&query=${query}` : ''
  }`;

// profile
export const getMe = API_URL + `api/v2/profil/getbytoken`;

// review
export const getReviews = ({id}: any) => API_URL + `api/v2/ebooks/${id}/rating`;
export const postReview = ({id}: any) => API_URL + `api/v2/ebooks/${id}/rating`;
