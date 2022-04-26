import {
  TOAST_OFF,
  TOAST_SET,
  TOAST_VARIANT,
  TOAST_DURATION,
} from './../types';

export default (state, action) => {
  switch (action.type) {
    case TOAST_DURATION:
      return {
        ...state,
        duration: action.payload,
      };
    case TOAST_VARIANT:
      return {
        ...state,
        variant: action.payload,
      };
    case TOAST_SET:
      return {
        ...state,
        message: action.payload,
        show: true,
      };
    case TOAST_OFF:
      return {
        ...state,
        show: false,
      };
    default:
      break;
  }
};
