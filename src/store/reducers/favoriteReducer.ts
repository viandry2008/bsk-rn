import {FavoriteAction} from '../actions';

const initialState = {
  loading: false,
  favorites: [],
  hasScrolled: false,
  nextLink: '',
};

const FavoriteReducer = (state = initialState, action: FavoriteAction) => {
  switch (action.type) {
    case 'GetFavorites':
      return {
        ...state,
        favorites: action.payload,
        nextLink: action.nextLink,
        hasScrolled: action.hasScrolled,
      };
    case 'PostFavorite':
      return {
        ...state,
        loading: action.loading,
      };
    default:
      return state;
  }
};

export {FavoriteReducer};
