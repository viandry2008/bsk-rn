import {BookAction} from '../actions';

const initialState = {
  booksCategory: [],
  bookDetail: '',
  banner: [],
  loadingBanner: false,
  booksTrending: [],
  loadingBooksTrending: false,
  booksFeaured: [],
  loadingBooksFeaured: false,
  booksLatest: [],
  booksAll: [],
  bookPdf: '',
  nextLinkLatest: '',
  hasScrolledLates: false,
  nextLinkAll: '',
  hasScrolledAll: false,
  nextLinkByCategory: '',
  hasScrolledByCategory: false,
};

const BookReducer = (state = initialState, action: BookAction) => {
  switch (action.type) {
    case 'GetBooksByCategory':
      return {
        ...state,
        booksCategory: action.payload,
        hasScrolledByCategory: action.hasScrolled,
        nextLinkByCategory: action.nextLink,
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
        loadingBanner: action.loading,
      };
    case 'GetBooksTrending':
      return {
        ...state,
        booksTrending: action.payload,
        loadingBooksTrending: action.loading,
      };
    case 'GetBooksFeatured':
      return {
        ...state,
        booksFeaured: action.payload,
        loadingBooksFeaured: action.loading,
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
