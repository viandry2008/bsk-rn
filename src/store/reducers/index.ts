import {combineReducers} from 'redux';
import {AuthReducer} from './authReducer';

const rootReducer = combineReducers({
  authReducer: AuthReducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;

export {rootReducer};
