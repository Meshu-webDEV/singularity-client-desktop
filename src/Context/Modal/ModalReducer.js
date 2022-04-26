import {
  MODAL_OFF,
  MODAL_SET,
  MODAL_SET_COMPONENT,
  MODAL_SET_PRIMARY_ACTION,
  MODAL_SET_SCROLLABLE,
  MODAL_SET_SECONDARY_ACTION,
  MODAL_SET_SIZE,
  MODAL_SET_TITLE,
  MODAL_SET_VARIANT,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case MODAL_SET_SIZE:
      return {
        ...state,
        size: action.payload,
      };
    case MODAL_SET:
      return {
        ...state,
        modalShow: true,
      };
    case MODAL_OFF:
      return {
        ...state,
        modalShow: false,
      };
    case MODAL_SET_TITLE:
      return {
        ...state,
        modalProps: { ...state.modalProps, title: action.payload },
      };
    case MODAL_SET_VARIANT:
      return {
        ...state,
        modalProps: { ...state.modalProps, variant: action.payload },
      };
    case MODAL_SET_PRIMARY_ACTION:
      return {
        ...state,
        modalProps: { ...state.modalProps, action: action.payload },
      };
    case MODAL_SET_SECONDARY_ACTION:
      return {
        ...state,
        modalProps: { ...state.modalProps, secondary: action.payload },
      };
    case MODAL_SET_SCROLLABLE:
      return {
        ...state,
        modalProps: { ...state.modalProps, scrollable: action.payload },
      };
    case MODAL_SET_COMPONENT:
      return {
        ...state,
        component: action.payload,
      };
    default:
      break;
  }
};
