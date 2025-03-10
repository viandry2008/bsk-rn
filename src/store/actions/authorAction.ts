import axios from 'axios';
import {Dispatch} from 'react';
import {
  getAuthorBooks,
  getAuthorDetail,
  getAuthors,
  getAuthorsSearch,
  getCategories,
  getSubCategories,
} from '../../utils/api';
import {headerAxiosHelper, messageHelper} from '../../utils/helpers';

interface GetAuthors {
  type: 'GetAuthors';
  payload: any;
}
interface GetAuthorsSearch {
  type: 'GetAuthorsSearch';
  payload: any;
}
interface GetAuthorDetail {
  type: 'GetAuthorDetail';
  payload: any;
}
interface GetAuthorBooks {
  type: 'GetAuthorBooks';
  payload: any;
}

export type AuthorAction =
  | GetAuthors
  | GetAuthorsSearch
  | GetAuthorDetail
  | GetAuthorBooks;

export const getAuthorsAction = (page: any) => {
  return async (dispatch: Dispatch<AuthorAction>) => {
    dispatch({
      type: 'GetAuthors',
      payload: [],
    });
    try {
      const res = await axios.get(
        getAuthors({page: page}),
        headerAxiosHelper(),
      );
      console.log('res GetAuthors', res.data);

      dispatch({
        type: 'GetAuthors',
        payload: res.data,
      });
    } catch (err: any) {
      console.log('err GetAuthors', err.response.data);
      messageHelper(err.response.data.message, 'danger');

      dispatch({
        type: 'GetAuthors',
        payload: [],
      });
    }
  };
};

export const getAuthorsSearchAction = (search: any) => {
  return async (dispatch: Dispatch<AuthorAction>) => {
    dispatch({
      type: 'GetAuthorsSearch',
      payload: [],
    });
    try {
      const res = await axios.get(
        getAuthorsSearch({search: search}),
        headerAxiosHelper(),
      );
      console.log('res GetAuthorsSearch', res.data);

      dispatch({
        type: 'GetAuthorsSearch',
        payload: res.data,
      });
    } catch (err: any) {
      console.log('err GetAuthorsSearch', err.response.data);
      messageHelper(err.response.data.message, 'danger');

      dispatch({
        type: 'GetAuthorsSearch',
        payload: [],
      });
    }
  };
};

export const getAuthorDetailAction = (id: any) => {
  return async (dispatch: Dispatch<AuthorAction>) => {
    dispatch({
      type: 'GetAuthorDetail',
      payload: '',
    });
    try {
      const res = await axios.get(
        getAuthorDetail({id: id}),
        headerAxiosHelper(),
      );
      console.log('res GetAuthorDetail', res.data);

      dispatch({
        type: 'GetAuthorDetail',
        payload: res.data,
      });
    } catch (err: any) {
      console.log('err GetAuthorDetail', err.response.data);
      messageHelper(err.response.data.message, 'danger');

      dispatch({
        type: 'GetAuthorDetail',
        payload: '',
      });
    }
  };
};

export const getAuthorBooksAction = (id: any, page: any) => {
  return async (dispatch: Dispatch<AuthorAction>) => {
    dispatch({
      type: 'GetAuthorBooks',
      payload: '',
    });
    try {
      const res = await axios.get(
        getAuthorBooks({id: id, page: page}),
        headerAxiosHelper(),
      );
      console.log('res GetAuthorBooks', res.data);

      dispatch({
        type: 'GetAuthorBooks',
        payload: res.data,
      });
    } catch (err: any) {
      console.log('err GetAuthorBooks', err.response.data);
      messageHelper(err.response.data.message, 'danger');

      dispatch({
        type: 'GetAuthorBooks',
        payload: '',
      });
    }
  };
};
