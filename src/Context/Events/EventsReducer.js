import {
  RESET_PAGINATION,
  EVENTS_LOAD_EVENTS,
  SET_EVENTS_IS_FILTERED,
  SET_EVENTS_DATE_RANGE,
  SET_EVENTS_LOADING_MORE,
  SET_EVENTS_IS_LOADING,
  SET_EVENTS_SKIP,
  EVENTS_SET_EVENTS,
  EVENTS_SET_LIVE_EVENTS,
  SET_EVENTS_LIVE_EVENTS_IS_LOADING,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case SET_EVENTS_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case SET_EVENTS_LIVE_EVENTS_IS_LOADING:
      return {
        ...state,
        isLiveLoading: action.payload,
      };
    case SET_EVENTS_LOADING_MORE:
      return {
        ...state,
        isLoadingMore: action.payload,
      };
    case SET_EVENTS_DATE_RANGE:
      return {
        ...state,
        range: action.payload,
      };
    case SET_EVENTS_IS_FILTERED:
      return {
        ...state,
        filtered: action.payload,
      };
    case EVENTS_SET_EVENTS:
      return {
        ...state,
        events: [...action.payload.events],
        pagination: {
          ...action.payload.pagination,
          skip: state.pagination.skip + action.payload.pagination.resultCount,
        },
      };
    case EVENTS_SET_LIVE_EVENTS:
      return {
        ...state,
        liveEvents: action.payload,
      };
    case EVENTS_LOAD_EVENTS:
      return {
        ...state,
        events: [...state.events, ...action.payload.events],
        pagination: {
          skip: state.pagination.skip + action.payload.pagination.resultCount,
          ...action.payload.pagination,
        },
      };
    case RESET_PAGINATION:
      return {
        ...state,
        pagination: action.payload,
      };
    case SET_EVENTS_SKIP:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          skip: action.payload,
        },
      };
    default:
      return state;
  }
};
