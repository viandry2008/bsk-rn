import axios from 'axios';
import {Dispatch} from 'react';
import {getBookDetail, getBooksByCategory} from '../../utils/api';
import {headerAxiosHelper, messageHelper} from '../../utils/helpers';

interface GetBooksByCategory {
  readonly type: 'GetBooksByCategory';
  payload: any;
}
interface GetBookDetail {
  readonly type: 'GetBookDetail';
  payload: any;
}

export type BookAction = GetBooksByCategory | GetBookDetail;

export const getBooksByCategoryAction = (
  category: any,
  page: any,
  navigation: any,
) => {
  return async (dispatch: Dispatch<BookAction>) => {
    dispatch({
      type: 'GetBooksByCategory',
      payload: [],
    });
    try {
      const res = await axios.get(
        getBooksByCategory({category: category?.slug, page: page}),
        headerAxiosHelper(),
      );
      console.log('res GetBooksByCategory', res.data);

      dispatch({
        type: 'GetBooksByCategory',
        payload: res.data.data,
      });

      navigation.navigate('BookCategory', category);
    } catch (err: any) {
      console.log('err GetBooksByCategory', err.response.data);
      messageHelper(err.response.data.message, 'danger');

      dispatch({
        type: 'GetBooksByCategory',
        payload: [],
      });
    }
  };
};

export const getBookDetailAction = (id: any, navigation: any) => {
  return async (dispatch: Dispatch<BookAction>) => {
    try {
      const res = await axios.get(getBookDetail({id: id}), headerAxiosHelper());
      console.log('res GetBookDetail', res.data);

      dispatch({
        type: 'GetBookDetail',
        payload: res.data,
      });

      navigation.navigate('BookDetail');
    } catch (err: any) {
      console.log('err GetBookDetail', err.response.data);
      messageHelper(err.response.data.message, 'danger');

      dispatch({
        type: 'GetBookDetail',
        payload: '',
      });
    }
  };
};
