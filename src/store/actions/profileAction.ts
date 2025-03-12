import axios from 'axios';
import {Dispatch} from 'react';
import {getMe} from '../../utils/api';
import {headerAxiosHelper, messageHelper} from '../../utils/helpers';

interface GetMe {
  type: 'GetMe';
  loading: boolean;
  payload: any;
}

export type ProfileAction = GetMe;

export const getMeAction = (token: any) => {
  return async (dispatch: Dispatch<ProfileAction>) => {
    try {
      const res = await axios.get(getMe, headerAxiosHelper(token));
      console.log('res GetMe', res.data);

      dispatch({
        type: 'GetMe',
        payload: res.data,
        loading: false,
      });
    } catch (err: any) {
      console.log('err GetMe', err.response.data);
      messageHelper(err.response.data.message, 'danger');

      dispatch({
        type: 'GetMe',
        payload: '',
        loading: false,
      });
    }
  };
};
