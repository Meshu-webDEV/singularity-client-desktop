import {
  SET_SUBMITTING,
  SET_NEWEVENT_INITIAL_INFO,
  SET_NEWEVENT_POINTS,
  SET_NEWEVENT_PRIZE,
  SET_NEWEVENT_TEAMS,
  SET_NEWEVENT_IS_TEMPLATE_SET,
  SET_CREATED_EVENT_ID,
  SET_SUCCESSFUL_SUBMIT,
  NEW_EVENT_RESET,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case SET_NEWEVENT_IS_TEMPLATE_SET:
      return {
        ...state,
        isTemplateSetup: action.payload,
      };
    case SET_SUBMITTING:
      return {
        ...state,
        isSubmitting: !state.isSubmitting,
      };
    case SET_SUCCESSFUL_SUBMIT:
      return {
        ...state,
        successfulSubmit: action.payload,
      };
    case SET_NEWEVENT_INITIAL_INFO:
      return {
        ...state,
        initialInfo: action.payload,
      };
    case SET_NEWEVENT_TEAMS:
      return {
        ...state,
        teams: action.payload,
      };
    case SET_NEWEVENT_POINTS:
      return {
        ...state,
        points: action.payload,
      };
    case SET_NEWEVENT_PRIZE:
      return {
        ...state,
        prize: action.payload,
      };
    case SET_CREATED_EVENT_ID:
      return {
        ...state,
        createdEventId: action.payload,
      };
    case NEW_EVENT_RESET:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};
