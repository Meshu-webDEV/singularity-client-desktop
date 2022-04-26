import React, { useEffect, useReducer } from 'react';
import {
  TOAST_SET,
  TOAST_OFF,
  TOAST_VARIANT,
  TOAST_DURATION,
} from './../types';

import ToastContext from './ToastContext';
import ToastReducer from './ToastReducer';

const ToastState = props => {
  const initialState = {
    message: '',
    duration: 6000,
    show: false,
    variant: 'error',
  };

  const [state, dispatch] = useReducer(ToastReducer, initialState);

  const setToast = async _toast => {
    if (state.show) {
      return setTimeout(() => {
        if (_toast.duration)
          dispatch({ type: TOAST_DURATION, payload: _toast.duration });
        dispatch({ type: TOAST_VARIANT, payload: _toast.variant });
        dispatch({ type: TOAST_SET, payload: _toast.message });
      }, 4000);
    }
    if (_toast.duration)
      dispatch({ type: TOAST_DURATION, payload: _toast.duration });

    dispatch({ type: TOAST_VARIANT, payload: _toast.variant });
    dispatch({ type: TOAST_SET, payload: _toast.message });
  };

  const offToast = () => {
    dispatch({ type: TOAST_OFF });
    dispatch({ type: TOAST_DURATION, payload: 6000 });
  };

  useEffect(() => {
    const id = setTimeout(() => {
      offToast();
    }, state.duration);

    return () => {
      clearTimeout(id);
    };
  }, [state.show]);

  return (
    <ToastContext.Provider
      value={{
        message: state.message,
        duration: state.duration,
        show: state.show,
        variant: state.variant,
        setToast,
        offToast,
      }}
    >
      {props.children}
    </ToastContext.Provider>
  );
};

export default ToastState;
