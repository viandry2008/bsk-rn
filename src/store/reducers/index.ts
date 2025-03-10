import {combineReducers} from 'redux';
import {AuthReducer} from './authReducer';
import {CategoryReducer} from './categoryReducer';

const rootReducer = combineReducers({
  authReducer: AuthReducer,
  categoryReducer: CategoryReducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;

export {rootReducer};
