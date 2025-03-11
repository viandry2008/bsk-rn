import {BookAction} from '../actions';

const initialState = {
  booksCategory: [],
  bookDetail: '',
  books: [],
};

const BookReducer = (state = initialState, action: BookAction) => {
  switch (action.type) {
    case 'GetBooksByCategory':
      return {
        ...state,
        booksCategory: action.payload,
        books: [],
      };
    case 'GetBookDetail':
      return {
        ...state,
        bookDetail: action.payload,
      };
    case 'GetBooks':
      return {
        ...state,
        books: action.payload,
      };
    default:
      return state;
  }
};

export {BookReducer};
