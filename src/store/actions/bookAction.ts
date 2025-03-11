import axios from 'axios';
import {Dispatch} from 'react';
import {getBooksByCategory} from '../../utils/api';
import {headerAxiosHelper, messageHelper} from '../../utils/helpers';

interface GetBooksByCategory {
  readonly type: 'GetBooksByCategory';
  payload: any;
}

export type BookAction = GetBooksByCategory;

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
