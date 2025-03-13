import axios from 'axios';
import {Dispatch} from 'react';
import {
  getAllAuthors,
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
  loading: boolean;
}
interface GetAuthorHome {
  type: 'GetAuthorHome';
  payload: any;
}

export type AuthorAction =
  | GetAuthors
  | GetAuthorsSearch
  | GetAuthorDetail
  | GetAuthorBooks
  | GetAuthorHome;

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
        payload: res.data.data,
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

export const getAuthorsSearchAction = (search: any, page: any) => {
  return async (dispatch: Dispatch<AuthorAction>) => {
    dispatch({
      type: 'GetAuthorsSearch',
      payload: [],
    });
    try {
      const res = await axios.get(
        getAuthorsSearch({search: search, page: page}),
        headerAxiosHelper(),
      );
      console.log('res GetAuthorsSearch', res.data);

      dispatch({
        type: 'GetAuthorsSearch',
        payload: res.data.data,
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

export const getAuthorDetailAction = (id: any, navigation: any) => {
  return async (dispatch: Dispatch<AuthorAction>) => {
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

      dispatch(getAuthorBooksAction(res.data.id, 1, navigation) as any);
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

export const getAuthorBooksAction = (id: any, page: any, navigation: any) => {
  return async (dispatch: Dispatch<AuthorAction>) => {
    dispatch({
      type: 'GetAuthorBooks',
      payload: [],
      loading: true,
    });
    try {
      const res = await axios.get(
        getAuthorBooks({id: id, page: page}),
        headerAxiosHelper(),
      );
      console.log('res GetAuthorBooks', res.data);

      dispatch({
        type: 'GetAuthorBooks',
        payload: res.data.data,
        loading: false,
      });

      navigation.navigate('AuthorDetail');
    } catch (err: any) {
      console.log('err GetAuthorBooks', err.response.data);
      messageHelper(err.response.data.message, 'danger');

      dispatch({
        type: 'GetAuthorBooks',
        payload: '',
        loading: false,
      });
    }
  };
};

export const getAuthorHomeAction = () => {
  return async (dispatch: Dispatch<AuthorAction>) => {
    try {
      const res = await axios.get(
        getAllAuthors({limit: 5, page: 1, query: ''}),
        headerAxiosHelper(),
      );
      console.log('res getAuthorHomeAction', res.data);

      dispatch({
        type: 'GetAuthorHome',
        payload: res.data.data,
      });
    } catch (err: any) {
      console.log('err getAuthorHomeAction', err.response.data);
      messageHelper(err.response.data.message, 'danger');

      dispatch({
        type: 'GetAuthorHome',
        payload: [],
      });
    }
  };
};
