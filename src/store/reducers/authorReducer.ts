import {AuthorAction} from '../actions';

const initialState = {
  authorDetail: '',
  authorBooks: [],
  loading: false,
  authorHome: [],
  allAuthors: [],
};

const AuthorReducer = (state = initialState, action: AuthorAction) => {
  switch (action.type) {
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
    case 'GetAllAuthors':
      return {
        ...state,
        allAuthors: action.payload,
      };
    default:
      return state;
  }
};

export {AuthorReducer};
