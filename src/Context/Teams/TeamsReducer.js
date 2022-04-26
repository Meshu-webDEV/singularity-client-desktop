import { MODAL_RESET_STATE, SET_LOADING, SET_TEAMS } from '../types';
export default (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    case SET_TEAMS:
      return {
        ...state,
        teams: action.payload,
      };
    case MODAL_RESET_STATE:
      return action.payload;
    default:
      return state;
  }
};
