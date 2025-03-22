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
  nextLinkLatest: '',
  hasScrolledLates: false,
  nextLinkAll: '',
  hasScrolledAll: false,
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
        nextLinkLatest: action.nextLink,
        hasScrolledLates: action.hasScrolled,
      };
    case 'GetAllBooks':
      return {
        ...state,
        booksAll: action.payload,
        nextLinkAll: action.nextLink,
        hasScrolledAll: action.hasScrolled,
      };
    default:
      return state;
  }
};

export {BookReducer};
