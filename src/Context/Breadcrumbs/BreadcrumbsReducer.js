import {
  PUSH_BREADCRUMBS,
  POP_BREADCRUMBS,
  UPDATE_BREADCRUMBS,
} from "../types";
export default (state, action) => {
  switch (action.type) {
    case UPDATE_BREADCRUMBS:
      return {
        ...state,
        stack: action.payload,
      };
    default:
      return state;
  }
};
