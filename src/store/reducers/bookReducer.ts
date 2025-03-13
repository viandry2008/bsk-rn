import {BookAction} from '../actions';

const initialState = {
  booksCategory: [],
  bookDetail: '',
  books: [],
  banner: '',
  booksTrending: [],
  booksFeaured: [],
};

const BookReducer = (state = initialState, action: BookAction) => {
  switch (action.type) {
    case 'GetBooksByCategory':
      return {
        ...state,
        booksCategory: action.payload,
        books: [],
        banner: action.banner,
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
    case 'GetBooksTrending':
      return {
        ...state,
        booksTrending: action.payload,
      };
    case 'GetBooksFeatured':
      return {
        ...state,
        booksFeaured: action.payload,
      };
    default:
      return state;
  }
};

export {BookReducer};
