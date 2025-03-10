import {AuthAction} from '../actions';

const initialState = {
  loading: false,
};

const AuthReducer = (state = initialState, action: AuthAction) => {
  switch (action.type) {
    case 'PostLogin':
      return {
        ...state,
        loading: action.loading,
      };
    case 'PostLogout':
      return {
        ...state,
        loading: action.loading,
      };
    default:
      return state;
  }
};

export {AuthReducer};
