import {
  RESET_ORGANIZATION,
  SET_ORGANIZATION,
  SET_ORGANIZATION_LOADING,
  SET_ORGANIZATION_SHOULD_UPDATE,
} from '../types';
export default (state, action) => {
  switch (action.type) {
    case SET_ORGANIZATION:
      return {
        ...state,
        status: action.payload.status,
        organization: action.payload.data,
      };
    case SET_ORGANIZATION_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case SET_ORGANIZATION_SHOULD_UPDATE:
      return {
        ...state,
        shouldUpdate: action.payload,
      };
    case RESET_ORGANIZATION:
      return action.payload;
    default:
      return state;
  }
};
