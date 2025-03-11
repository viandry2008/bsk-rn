import {BookAction} from '../actions';

const initialState = {
  booksCategory: [],
};

const BookReducer = (state = initialState, action: BookAction) => {
  switch (action.type) {
    case 'GetBooksByCategory':
      return {
        ...state,
        booksCategory: action.payload,
      };
    default:
      return state;
  }
};

export {BookReducer};
