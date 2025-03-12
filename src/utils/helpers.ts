import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import {showMessage} from 'react-native-flash-message';

export const formatDateHelper = (value: any, format: any) => {
  return moment(value).format(format);
};

// header axios
export const headerAxiosHelper = (token?: any) => {
  return {
    headers: {
      Authorization: 'Bearer ' + token,
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data; charset=utf-8',
    },
  };
};

// message helper
export const messageHelper = (message: string, type: 'danger' | 'success') => {
  showMessage({
    message: message,
    type: type,
    duration: 2000,
  });
};

// save data asyncStorage
export const saveDataLoginHelper = async (token: any) => {
  try {
    if (token != null) {
      await AsyncStorage.setItem('user_token', token);
    }
  } catch (error) {
    console.log(error);
  }
};

export async function getDataLoginHelper() {
  try {
    const token = await AsyncStorage.getItem('user_token');

    return {
      token: token,
    };
  } catch (e) {
    console.log(e);
  }
}
