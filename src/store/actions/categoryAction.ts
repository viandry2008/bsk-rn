import axios from 'axios';
import {Dispatch} from 'react';
import {getCategories, getSubCategories} from '../../utils/api';
import {headerAxiosHelper, messageHelper} from '../../utils/helpers';

interface GetCategories {
  type: 'GetCategories';
  payload: any;
}
interface GetSubCategories {
  type: 'GetSubCategories';
  payload: any;
}

export type CategoryAction = GetCategories | GetSubCategories;

export const getCategoriesAction = () => {
  return async (dispatch: Dispatch<CategoryAction>) => {
    dispatch({
      type: 'GetCategories',
      payload: [],
    });
    try {
      const res = await axios.get(getCategories, headerAxiosHelper());
      console.log('res GetCategories', res.data);

      dispatch({
        type: 'GetCategories',
        payload: res.data,
      });
    } catch (err: any) {
      console.log('err GetCategories', err.response.data);
      messageHelper(err.response.data.message, 'danger');

      dispatch({
        type: 'GetCategories',
        payload: [],
      });
    }
  };
};

export const getSubCategoriesAction = (id: any) => {
  return async (dispatch: Dispatch<CategoryAction>) => {
    dispatch({
      type: 'GetSubCategories',
      payload: [],
    });
    try {
      const res = await axios.get(
        getSubCategories({id: id}),
        headerAxiosHelper(),
      );
      console.log('res GetSubCategories', res.data);

      dispatch({
        type: 'GetSubCategories',
        payload: res.data,
      });
    } catch (err: any) {
      console.log('err GetSubCategories', err.response.data);
      messageHelper(err.response.data.message, 'danger');

      dispatch({
        type: 'GetSubCategories',
        payload: [],
      });
    }
  };
};
