import {AuthorAction} from '../actions';

const initialState = {
  authors: [],
  authorsSearch: [],
  authorDetail: '',
  authorBooks: [],
  loading: false,
  authorHome: [],
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
    case 'GetAuthorHome':
      return {
        ...state,
        authorHome: action.payload,
      };
    default:
      return state;
  }
};

export {AuthorReducer};
