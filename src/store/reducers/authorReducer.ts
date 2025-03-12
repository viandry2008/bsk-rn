import {AuthorAction, CategoryAction} from '../actions';

const initialState = {
  authors: [],
  authorsSearch: [],
  authorDetail: '',
  authorBooks: [],
  loading: false,
};

const AuthorReducer = (state = initialState, action: AuthorAction) => {
  switch (action.type) {
    case 'GetAuthors':
      return {
        ...state,
        authors: action.payload,
      };
    case 'GetAuthorsSearch':
      return {
        ...state,
        authorsSearch: action.payload,
      };
    case 'GetAuthorDetail':
      return {
        ...state,
        authorDetail: action.payload,
      };
    case 'GetAuthorBooks':
      return {
        ...state,
        authorBooks: action.payload,
        loading: action.loading,
      };
    default:
      return state;
  }
};

export {AuthorReducer};
