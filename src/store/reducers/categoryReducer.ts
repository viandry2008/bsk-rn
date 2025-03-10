import {CategoryAction} from '../actions';

const initialState = {
  categories: [],
  subCategories: [],
};

const CategoryReducer = (state = initialState, action: CategoryAction) => {
  switch (action.type) {
    case 'GetCategories':
      return {
        ...state,
        categories: action.payload,
      };
    case 'GetSubCategories':
      return {
        ...state,
        subCategories: action.payload,
      };
    default:
      return state;
  }
};

export {CategoryReducer};
