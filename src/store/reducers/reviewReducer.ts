import {ReviewAction} from '../actions';

const initialState = {
  reviews: [],
  loading: false,
};

const ReviewReducer = (state = initialState, action: ReviewAction) => {
  switch (action.type) {
    case 'GetReviews':
      return {
        ...state,
        reviews: action.payload,
      };
    case 'PostReview':
      return {
        ...state,
        loading: action.loading,
      };
    default:
      return state;
  }
};

export {ReviewReducer};
