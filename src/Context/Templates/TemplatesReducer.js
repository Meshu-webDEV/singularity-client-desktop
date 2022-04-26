import {
  LOAD_MORE_TEMPLATES,
  RESET_TEMPLATE_STATE,
  SET_MY_TEMPLATES_SKIP,
  SET_TEMPLATES,
  SET_TEMPLATES_LOADING,
  SET_TEMPLATE_SHOULD_UPDATE,
} from '../types';
export default (state, action) => {
  switch (action.type) {
    case SET_TEMPLATES_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case SET_TEMPLATES:
      return {
        ...state,
        templates: [...action.payload.templates],
        pagination: {
          ...action.payload.pagination,
          skip: state.pagination.skip + action.payload.pagination.resultCount,
        },
      };
    case LOAD_MORE_TEMPLATES:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          ...action.payload.pagination,
          skip: state.templates.length + action.payload.pagination.resultCount,
        },
        templates: [...state.templates, ...action.payload.templates],
      };
    case SET_TEMPLATE_SHOULD_UPDATE:
      return {
        ...state,
        shouldUpdate: action.payload,
      };
    case SET_MY_TEMPLATES_SKIP:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          skip: action.payload,
        },
      };
    case RESET_TEMPLATE_STATE:
      return { ...action.payload };

    default:
      return state;
  }
};
