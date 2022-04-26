import {
  SET_DASHBOARD_DATA,
  SET_DASHBOARD_SHOULD_UPDATE,
  SET_LOADING,
  SET_RECENT_EVENTS,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    case SET_DASHBOARD_SHOULD_UPDATE:
      return {
        ...state,
        shouldUpdate: action.payload,
      };
    case SET_RECENT_EVENTS:
      return {
        ...state,
        recentEvents: action.payload,
      };
    case SET_DASHBOARD_DATA:
      return {
        ...state,
        recentEvents: action.payload.recentEvents,
        topTemplates: action.payload.topTemplates,
      };
    default:
      return state;
  }
};
