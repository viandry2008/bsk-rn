import {ProfileAction} from '../actions';

const initialState = {
  loading: false,
  user: '',
};

const ProfileReducer = (state = initialState, action: ProfileAction) => {
  switch (action.type) {
    case 'GetMe':
      return {
        ...state,
        loading: action.loading,
        user: action.payload,
      };
    default:
      return state;
  }
};

export {ProfileReducer};
