import {BookAction} from '../actions';

const initialState = {
  booksCategory: [],
  bookDetail: '',
};

const BookReducer = (state = initialState, action: BookAction) => {
  switch (action.type) {
    case 'GetBooksByCategory':
      return {
        ...state,
        booksCategory: action.payload,
      };
    case 'GetBookDetail':
      return {
        ...state,
        bookDetail: action.payload,
      };
    default:
      return state;
  }
};

export {BookReducer};
