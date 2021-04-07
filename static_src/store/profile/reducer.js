import { CHANGE_NAME } from './types';

const initialState = {
  name: "default name"
}

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_NAME: {
      return {
        ...state,
        name: action.name,
        checked: !state.checked
      }
    }
    default:
      return state;
  }
}