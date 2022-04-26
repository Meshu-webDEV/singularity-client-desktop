import React, { useReducer } from 'react';
import { SIDEMENU_OFF, SIDEMENU_ON } from '../types';

import SidemenuContext from './SidemenuContext';
import SidemenuReducer from './SidemenuReducer';

const SidemenuState = props => {
  const initialState = {
    show: false,
  };

  const [state, dispatch] = useReducer(SidemenuReducer, initialState);

  const setSidemenu = async _toast => {
    dispatch({ type: SIDEMENU_ON });
  };

  const offSidemenu = () => {
    dispatch({ type: SIDEMENU_OFF });
  };

  return (
    <SidemenuContext.Provider
      value={{
        show: state.show,
        setSidemenu,
        offSidemenu,
      }}
    >
      {props.children}
    </SidemenuContext.Provider>
  );
};

export default SidemenuState;
