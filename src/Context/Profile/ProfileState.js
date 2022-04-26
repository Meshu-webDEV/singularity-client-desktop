import React, { useContext, useReducer } from 'react';
import { useHistory } from 'react-router-dom';

import {
  SET_MY_PROFILE_LOADING,
  SET_MY_PROFILE_PROFILE,
  SET_MY_PROFILE_SHOULD_UPDATE,
} from '../types';

import ProfileContext from './ProfileContext';
import ProfileReducer from './ProfileReducer';
import { backendAPI } from '../../lib/backend';
import ToastContext from '../Toast/ToastContext';
import AuthContext from '../Auth/AuthContext';

const ProfileState = props => {
  const initialState = {
    profile: {},
    isLoading: true,
    shouldUpdate: false,
  };
  const history = useHistory();
  const { setToast } = useContext(ToastContext);
  const { passwordSuccessfullyChanged } = useContext(AuthContext);

  const [state, dispatch] = useReducer(ProfileReducer, initialState);

  const getProfile = () => {
    return new Promise(async (resolve, reject) => {
      try {
        dispatch({
          type: SET_MY_PROFILE_LOADING,
          payload: true,
        });
        const { data } = await backendAPI.get('/user/my-profile');
        dispatch({
          type: SET_MY_PROFILE_PROFILE,
          payload: data,
        });
        dispatch({
          type: SET_MY_PROFILE_LOADING,
          payload: false,
        });
        resolve();
      } catch (error) {
        console.log(error);
        setToast({
          variant: 'error',
          message: error.response
            ? error.response.data.message
            : 'Apologies, Error occurred while trying to process your request. try again or contact us.',
        });
        dispatch({
          type: SET_MY_PROFILE_LOADING,
          payload: false,
        });
        reject();
      } finally {
        dispatch({
          type: SET_MY_PROFILE_SHOULD_UPDATE,
          payload: false,
        });
      }
    });
  };

  const editDisplayName = data => {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(data);
        await backendAPI.patch('/user/edit-display', { displayName: data });
        dispatch({
          type: SET_MY_PROFILE_SHOULD_UPDATE,
          payload: true,
        });
        resolve();
      } catch (error) {
        console.log(error);
        setToast({
          variant: 'error',
          message: error.response
            ? error.response.data.message
            : 'Apologies, Error occurred while trying to process your request. try again or contact us.',
        });
        return reject();
      }
    });
  };

  const changePassword = data => {
    return new Promise(async (resolve, reject) => {
      try {
        await backendAPI.patch('/user/change-password', data);
        passwordSuccessfullyChanged();
        console.log('After setAuthInitialState');
        setToast({
          variant: 'success',
          message: 'Successfully changed password, Please sign-in again.',
        });
        return resolve();
      } catch (error) {
        console.log(error);
        setToast({
          variant: 'error',
          message: error.response
            ? error.response.data.message
            : 'Apologies, Error occurred while trying to process your request. try again or contact us.',
        });
        return reject();
      }
    });
  };

  const resetApplicationRejection = () => {
    return new Promise(async (resolve, reject) => {
      try {
        await backendAPI.patch('/organizations/reset-rejection');
        return resolve();
      } catch (error) {
        setToast({
          variant: 'error',
          message: error.response
            ? error.response.data.message
            : 'Apologies, Error occurred while trying to process your request. try again or contact us.',
        });
        return reject();
      }
    });
  };

  const setShouldUpdate = value => {
    dispatch({
      type: SET_MY_PROFILE_SHOULD_UPDATE,
      payload: value,
    });
  };

  return (
    <ProfileContext.Provider
      value={{
        profile: state.profile,
        isLoading: state.isLoading,
        shouldUpdate: state.shouldUpdate,
        getProfile,
        setShouldUpdate,
        editDisplayName,
        changePassword,
        resetApplicationRejection,
      }}
    >
      {props.children}
    </ProfileContext.Provider>
  );
};

export default ProfileState;
