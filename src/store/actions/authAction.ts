import axios from 'axios';
import {Dispatch} from 'react';
import {postLogin} from '../../utils/api';
import {
  headerAxiosHelper,
  messageHelper,
  saveDataLoginHelper,
} from '../../utils/helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

interface PostLogin {
  type: 'PostLogin';
  loading: boolean;
}
interface PostLogout {
  type: 'PostLogout';
  loading: boolean;
}
interface PostGoogleSignin {
  type: 'PostGoogleSignin';
  loading: boolean;
}

export type AuthAction = PostLogin | PostLogout | PostGoogleSignin;

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

      saveDataLoginHelper(res.data.token.toString());

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

export const postGoogleSiginAction =
  (navigation: any) => async (dispatch: Dispatch<AuthAction>) => {
    dispatch({
      type: 'PostGoogleSignin',
      loading: false,
    });
    try {
      await GoogleSignin.configure({
        offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        webClientId:
          '914223673716-ili21diqvdc9a3el3p62s7kdbahr390l.apps.googleusercontent.com',
      });
      await GoogleSignin.hasPlayServices();
      const infoUser = await GoogleSignin.signIn();
      console.log('this info user', infoUser);
      const dataLogin = {
        email: infoUser?.data?.user?.email,
        password: infoUser.data?.serverAuthCode,
        // name: infoUser.user.name,
        // file: infoUser.user.photo,
      };
      // GoogleSignin.revokeAccess();
      // GoogleSignin.signOut();
      axios
        .post(postLogin, dataLogin, headerAxiosHelper())
        .then(res => {
          console.log('res google login', res.data);
          dispatch({
            type: 'PostGoogleSignin',
            loading: false,
          });
          saveDataLoginHelper(res.data.token.toString());
          navigation.reset({
            index: 0,
            routes: [{name: 'MainHome'}],
          });

          GoogleSignin.revokeAccess();
          GoogleSignin.signOut();
        })
        .catch(err => {
          dispatch({
            type: 'PostGoogleSignin',
            loading: false,
          });
          messageHelper(err.response.data.message, 'danger');
          GoogleSignin.revokeAccess();
          GoogleSignin.signOut();
          console.log('err google login', err.response.data);
        });
    } catch (error: any) {
      console.log(error, 'this error google sigin');
      dispatch({
        type: 'PostGoogleSignin',
        loading: false,
      });
      if (error.code === 'CANCELED') {
        messageHelper(error.message, 'danger');
        GoogleSignin.revokeAccess();
        GoogleSignin.signOut();
        console.log(error, 'thisss error canceled');
      } else {
        messageHelper('Ups!, layanan sedang dalam gangguan', 'danger');
        GoogleSignin.revokeAccess();
        GoogleSignin.signOut();
        console.log(error.message, 'error');
      }
    }
  };
