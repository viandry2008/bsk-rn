import {FavoriteAction} from '../actions';

const initialState = {
  loading: false,
  favorites: [],
};

const FavoriteReducer = (state = initialState, action: FavoriteAction) => {
  switch (action.type) {
    case 'GetFavorites':
      return {
        ...state,
        favorites: action.payload,
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
