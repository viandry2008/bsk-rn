import {combineReducers} from 'redux';
import {AuthReducer} from './authReducer';
import {CategoryReducer} from './categoryReducer';
import {FavoriteReducer} from './favoriteReducer';
import {AuthorReducer} from './authorReducer';

const rootReducer = combineReducers({
  authReducer: AuthReducer,
  categoryReducer: CategoryReducer,
  favoriteReducer: FavoriteReducer,
  authorReducer: AuthorReducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;

export {rootReducer};
