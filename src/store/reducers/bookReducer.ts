import {BookAction} from '../actions';

const initialState = {
  booksCategory: [],
  bookDetail: '',
  banner: [],
  booksTrending: [],
  booksFeaured: [],
  booksLatest: [],
  booksAll: [],
  bookPdf: '',
};

const BookReducer = (state = initialState, action: BookAction) => {
  switch (action.type) {
    case 'GetBooksByCategory':
      return {
        ...state,
        booksCategory: action.payload,
        books: [],
        banner: [],
      };
    case 'GetBookDetail':
      return {
        ...state,
        bookDetail: action.payload,
        bookPdf: action.bookPdf,
      };
    case 'GetBookBanner':
      return {
        ...state,
        banner: action.payload,
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
