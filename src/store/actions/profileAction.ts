import axios from 'axios';
import {Dispatch} from 'react';
import {postLogin} from '../../utils/api';
import {
  headerAxiosHelper,
  messageHelper,
  saveDataLoginHelper,
} from '../../utils/helpers';

interface GetMe {
  type: 'GetMe';
  loading: boolean;
  payload: any;
}

export type ProfileAction = GetMe;

export const getMeAction = (token: any) => {
  return async (dispatch: Dispatch<ProfileAction>) => {
    dispatch({
      type: 'GetMe',
      loading: true,
      payload: '',
    });
    try {
      const res = await axios.get(postLogin, headerAxiosHelper(token));
      console.log('res GetMe', res.data);

      dispatch({
        type: 'GetMe',
        loading: false,
        payload: res.data,
      });
    } catch (err: any) {
      console.log('err GetMe', err.response.data);
      messageHelper(err.response.data.message, 'danger');

      dispatch({
        type: 'GetMe',
        loading: false,
        payload: '',
      });
    }
  };
};
