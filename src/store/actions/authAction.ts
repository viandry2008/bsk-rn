import axios from 'axios';
import {Dispatch} from 'react';
import {postLogin} from '../../utils/api';
import {
  headerAxiosHelper,
  messageHelper,
  saveDataLoginHelper,
} from '../../utils/helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface PostLogin {
  type: 'PostLogin';
  loading: boolean;
}
interface PostLogout {
  type: 'PostLogout';
  loading: boolean;
}

export type AuthAction = PostLogin | PostLogout;

export const postLoginAction = (data: any, navigation: any) => {
  return async (dispatch: Dispatch<AuthAction>) => {
    dispatch({
      type: 'PostLogin',
      loading: true,
    });
    try {
      const res = await axios.post(postLogin, data, headerAxiosHelper());
      console.log('res login', res.data);

      dispatch({
        type: 'PostLogin',
        loading: false,
      });

      saveDataLoginHelper(res.data.token);

      navigation.reset({
        index: 0,
        routes: [{name: 'MainHome'}],
      });
    } catch (err: any) {
      console.log('err regis user', err.response.data);
      messageHelper(err.response.data.message, 'danger');

      dispatch({
        type: 'PostLogin',
        loading: false,
      });
    }
  };
};

export const postLogoutAppAction =
  (navigation: any) => async (dispatch: Dispatch<AuthAction>) => {
    dispatch({
      type: 'PostLogout',
      loading: true,
    });
    try {
      await AsyncStorage.clear();
      dispatch({
        type: 'PostLogout',
        loading: false,
      });
      // reset navigation
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    } catch (e) {
      dispatch({
        type: 'PostLogout',
        loading: false,
      });
      console.log(e);
    }
  };
