import {
  MY_EVENTS_SET_EVENTS,
  SET_MY_EVENTS_SKIP,
  MY_EVENTS_RESET_PAGINATION,
  MY_EVENTS_LOAD_EVENTS,
  SET_MY_EVENTS_LOADING_MORE,
  SET_MY_EVENTS_IS_LOADING,
  SET_MY_EVENTS_STATS,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case SET_MY_EVENTS_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case SET_MY_EVENTS_LOADING_MORE:
      return {
        ...state,
        isLoadingMore: action.payload,
      };
    case MY_EVENTS_SET_EVENTS:
      return {
        ...state,
        events: [...action.payload.events],
        pagination: {
          ...action.payload.pagination,
          skip: state.pagination.skip + action.payload.pagination.resultCount,
        },
      };
    case MY_EVENTS_LOAD_EVENTS:
      return {
        ...state,
        events: [...state.events, ...action.payload.events],
        pagination: {
          skip: state.pagination.skip + action.payload.pagination.resultCount,
          ...action.payload.pagination,
        },
      };
    case MY_EVENTS_RESET_PAGINATION:
      return {
        ...state,
        pagination: action.payload,
      };
    case SET_MY_EVENTS_SKIP:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          skip: action.payload,
        },
      };
    case SET_MY_EVENTS_STATS:
      return {
        ...state,
        stats: action.payload,
      };
    default:
      return state;
  }
};
