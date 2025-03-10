import {combineReducers} from 'redux';
import {AuthReducer} from './authReducer';
import {CategoryReducer} from './categoryReducer';
import {FavoriteReducer} from './favoriteReducer';

const rootReducer = combineReducers({
  authReducer: AuthReducer,
  categoryReducer: CategoryReducer,
  favoriteReducer: FavoriteReducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;

export {rootReducer};
