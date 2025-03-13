import {combineReducers} from 'redux';
import {AuthReducer} from './authReducer';
import {CategoryReducer} from './categoryReducer';
import {FavoriteReducer} from './favoriteReducer';
import {AuthorReducer} from './authorReducer';
import {ProfileReducer} from './profileReducer';
import {BookReducer} from './bookReducer';
import {ReviewReducer} from './reviewReducer';

const rootReducer = combineReducers({
  authReducer: AuthReducer,
  categoryReducer: CategoryReducer,
  favoriteReducer: FavoriteReducer,
  authorReducer: AuthorReducer,
  profileReducer: ProfileReducer,
  bookReducer: BookReducer,
  reviewReducer: ReviewReducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;

export {rootReducer};
