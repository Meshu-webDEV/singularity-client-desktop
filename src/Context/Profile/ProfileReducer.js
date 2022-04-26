import {
  SET_MY_PROFILE_LOADING,
  SET_MY_PROFILE_PROFILE,
  SET_MY_PROFILE_SHOULD_UPDATE,
} from '../types';
export default (state, action) => {
  switch (action.type) {
    case SET_MY_PROFILE_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case SET_MY_PROFILE_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };
    case SET_MY_PROFILE_SHOULD_UPDATE:
      return {
        ...state,
        shouldUpdate: action.payload,
      };
    default:
      return state;
  }
};
