import {BookAction} from '../actions';

const initialState = {
  booksCategory: [],
  bookDetail: '',
  books: [],
  banner: '',
  booksTrending: [],
  booksFeaured: [],
  booksLatest: [],
  booksAll: [],
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
    case 'GetBooksLatest':
      return {
        ...state,
        booksLatest: action.payload,
      };
    case 'GetAllBooks':
      return {
        ...state,
        booksAll: action.payload,
      };
    default:
      return state;
  }
};

export {BookReducer};
