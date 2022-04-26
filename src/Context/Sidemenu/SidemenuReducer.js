import { SIDEMENU_OFF, SIDEMENU_ON } from './../types';

export default (state, action) => {
  switch (action.type) {
    case SIDEMENU_ON:
      return {
        ...state,
        show: true,
      };
    case SIDEMENU_OFF:
      return {
        ...state,
        show: false,
      };
    default:
      return state;
  }
};
