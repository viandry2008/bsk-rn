import axios from 'axios';
import {Dispatch} from 'react';
import {getReviews, postReview} from '../../utils/api';
import {headerAxiosHelper, messageHelper} from '../../utils/helpers';
import {getBookDetailAction} from './bookAction';

interface GetReviews {
  readonly type: 'GetReviews';
  payload: any;
}
interface PostReview {
  readonly type: 'PostReview';
  loading: boolean;
}

export type ReviewAction = GetReviews | PostReview;

export const getReviewsAction = (token: any, bookId: any) => {
  return async (dispatch: Dispatch<ReviewAction>) => {
    try {
      const res = await axios.get(
        getReviews({id: bookId}),
        headerAxiosHelper(token),
      );
      console.log('res GetReviews', res.data);

      dispatch({
        type: 'GetReviews',
        payload: res.data,
      });
    } catch (err: any) {
      console.log('err GetReviews', err.response.data);
      messageHelper(err.response.data.message, 'danger');

      dispatch({
        type: 'GetReviews',
        payload: [],
      });
    }
  };
};

export const postReviewAction = (token: any, body: any, bookId: any) => {
  return async (dispatch: Dispatch<ReviewAction>) => {
    dispatch({
      type: 'PostReview',
      loading: true,
    });
    try {
      const res = await axios.post(
        postReview({id: bookId}),
        body,
        headerAxiosHelper(token),
      );
      console.log('res PostReview', res.data);

      dispatch({
        type: 'PostReview',
        loading: false,
      });

      dispatch(getBookDetailAction(bookId, null) as any);
      dispatch(getReviewsAction(token, bookId) as any);

      messageHelper(res.data.message, 'success');
    } catch (err: any) {
      console.log('err GetReviews', err.response.data);
      messageHelper(err.response.data.message, 'danger');

      dispatch({
        type: 'PostReview',
        loading: false,
      });
    }
  };
};
