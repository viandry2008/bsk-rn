import axios from 'axios';
import {Dispatch} from 'react';
import {getFavorites, postFavorite} from '../../utils/api';
import {headerAxiosHelper, messageHelper} from '../../utils/helpers';

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
        payload: res.data,
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
    } catch (err: any) {
      console.log('err PostFavorite', err.response.data);
      messageHelper(err.response.data.message, 'danger');

      dispatch({
        type: 'PostFavorite',
        loading: false,
      });
    }
  };
};
