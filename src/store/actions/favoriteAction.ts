import axios from 'axios';
import {Dispatch} from 'react';
import {getFavorites, postFavorite} from '../../utils/api';
import {headerAxiosHelper, messageHelper} from '../../utils/helpers';
import {getBookDetailAction} from './bookAction';

interface GetFavorites {
  type: 'GetFavorites';
  payload: any;
}
interface PostFavorite {
  type: 'PostFavorite';
  loading: boolean;
}

export type FavoriteAction = GetFavorites | PostFavorite;

export const getFavoritesAction = (token: any) => {
  return async (dispatch: Dispatch<FavoriteAction>) => {
    dispatch({
      type: 'GetFavorites',
      payload: [],
    });
    try {
      const res = await axios.get(getFavorites, headerAxiosHelper(token));
      console.log('res GetFavorites', res.data);

      dispatch({
        type: 'GetFavorites',
        payload: res.data.data,
      });
    } catch (err: any) {
      console.log('err GetFavorites', err.response.data);
      messageHelper(err.response.data.message, 'danger');

      dispatch({
        type: 'GetFavorites',
        payload: [],
      });
    }
  };
};

export const postFavoriteAction = (token: any, body: any) => {
  return async (dispatch: Dispatch<FavoriteAction>) => {
    dispatch({
      type: 'PostFavorite',
      loading: true,
    });
    try {
      const res = await axios.post(
        postFavorite,
        body,
        headerAxiosHelper(token),
      );
      console.log('res PostFavorite', res.data);

      dispatch({
        type: 'PostFavorite',
        loading: false,
      });

      if (res.data.message == 'Ebook added to favorites.') {
        messageHelper('Buku ditambah ke favorit', 'success');
      }

      dispatch(getBookDetailAction(body?.ebook_id, null) as any);
    } catch (err: any) {
      console.log('err PostFavorite', err.response.data);

      dispatch({
        type: 'PostFavorite',
        loading: false,
      });

      if (err.response.data.message == 'Ebook already in favorites.') {
        messageHelper('Buku sudah di tambah ke favorit', 'danger');
      } else {
        messageHelper(err.response.data.message, 'danger');
      }
    }
  };
};
