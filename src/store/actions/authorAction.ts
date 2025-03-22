import axios from 'axios';
import {Dispatch} from 'react';
import {getAllAuthors, getAuthorBooks, getAuthorDetail} from '../../utils/api';
import {headerAxiosHelper, messageHelper} from '../../utils/helpers';

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
  loading: boolean;
}

interface GetAllAuthors {
  type: 'GetAllAuthors';
  payload: any;
  hasScrolled: boolean;
  nextLink: any;
}

export type AuthorAction =
  | GetAuthorDetail
  | GetAuthorBooks
  | GetAuthorHome
  | GetAllAuthors;

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
    dispatch({
      type: 'GetAuthorHome',
      payload: [],
      loading: true,
    });
    try {
      const res = await axios.get(
        getAllAuthors({limit: 5, page: 1, query: ''}),
        headerAxiosHelper(),
      );
      console.log('res getAuthorHomeAction', res.data);

      dispatch({
        type: 'GetAuthorHome',
        payload: res.data.data,
        loading: false,
      });
    } catch (err: any) {
      console.log('err getAuthorHomeAction', err.response.data);
      messageHelper(err.response.data.message, 'danger');

      dispatch({
        type: 'GetAuthorHome',
        payload: [],
        loading: false,
      });
    }
  };
};

export const getAllAuthorsAction = (
  page: any,
  query: any,
  currentData: any,
  navigation: any,
) => {
  return async (dispatch: Dispatch<AuthorAction>) => {
    dispatch({
      type: 'GetAllAuthors',
      payload: currentData,
      hasScrolled: true,
      nextLink: page,
    });
    try {
      const res = await axios.get(
        getAllAuthors({
          limit: 15,
          page: page,
          query: query == '' ? '' : query,
        }),
        headerAxiosHelper(),
      );
      console.log('res getAllAuthorsAction', res.data);

      dispatch({
        type: 'GetAllAuthors',
        payload: [...currentData, ...res.data.data],
        hasScrolled: false,
        nextLink: parseInt(res.data.paging?.page) + 1,
      });

      navigation == null ? null : navigation.navigate('AuthorSearch');
    } catch (err: any) {
      console.log('err getAllAuthorsAction', err.response.data);
      messageHelper(err.response.data.message, 'danger');

      dispatch({
        type: 'GetAllAuthors',
        payload: [],
        hasScrolled: false,
        nextLink: null,
      });
    }
  };
};
