import React, { useContext, useEffect, useReducer } from 'react';
import { useSessionStorage } from 'react-use';

import OrganizationContext from './OrganizationContext';
import OrganizationReducer from './OrganizationReducer';
import ToastContext from '../Toast/ToastContext';
import { backendAPI } from '../../lib/backend';
import {
  RESET_ORGANIZATION,
  SET_ORGANIZATION,
  SET_ORGANIZATION_LOADING,
  SET_ORGANIZATION_SHOULD_UPDATE,
} from '../types';
import { CACHE_KEY_NAMES } from '../../lib/constants';
import { isEmpty } from 'lodash';

const OrganizationState = props => {
  const initialState = {
    organization: {},
    status: -1,
    isLoading: false,
    shouldUpdate: false,
  };

  const [sessionStorageValue, setSessionStorageValue] = useSessionStorage(
    CACHE_KEY_NAMES.ORGANIZATION,
    initialState.organization
  );

  const { setToast } = useContext(ToastContext);

  const [state, dispatch] = useReducer(OrganizationReducer, initialState);

  const getMyOrganization = () => {
    return new Promise(async (resolve, reject) => {
      try {
        dispatch({
          type: SET_ORGANIZATION_LOADING,
          payload: true,
        });
        const { data } = await backendAPI.get('/organizations/my-organization');

        dispatch({
          type: SET_ORGANIZATION,
          payload: data,
        });
        dispatch({
          type: SET_ORGANIZATION_LOADING,
          payload: false,
        });
        return resolve();
      } catch (error) {
        setToast({
          variant: 'error',
          message: error.response
            ? error.response.data.message
            : 'Apologies, Error occurred while trying to process your request. try again or contact us.',
        });
        dispatch({
          type: SET_ORGANIZATION_LOADING,
          payload: false,
        });
        return reject();
      } finally {
        dispatch({
          type: SET_ORGANIZATION_SHOULD_UPDATE,
          payload: false,
        });
      }
    });
  };

  // TODO: implement this
  const getOrganizationByUniqueid = uniqueid => {
    return new Promise(async (resolve, reject) => {
      try {
        dispatch({
          type: SET_ORGANIZATION_LOADING,
          payload: true,
        });

        const { data } = await backendAPI.get(
          `/organizations/by-uniqueid/${uniqueid}`
        );

        dispatch({
          type: SET_ORGANIZATION_LOADING,
          payload: false,
        });
        dispatch({
          type: SET_ORGANIZATION,
          payload: data,
        });
        return resolve();
      } catch (error) {
        setToast({
          variant: 'error',
          message: error.response
            ? error.response.data.message
            : 'Apologies, Error occurred while trying to process your request. try again or contact us.',
        });
        dispatch({
          type: SET_ORGANIZATION_LOADING,
          payload: false,
        });
        return reject();
      }
    });
  };

  const submitApplication = data => {
    // Initialize & Setup the Form Data
    const dataEntries = Object.entries(data);
    const formData = new FormData();
    dataEntries.forEach(d => formData.append(`${d[0]}`, d[1]));

    return new Promise(async (resolve, reject) => {
      try {
        await backendAPI.post('/organizations/new', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        dispatch({
          type: SET_ORGANIZATION_SHOULD_UPDATE,
          payload: true,
        });
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

  const editOrgBio = data => {
    return new Promise(async (resolve, reject) => {
      try {
        await backendAPI.patch(
          `/organizations/edit-bio/${state.organization._id}`,
          { bio: data }
        );
        // setShouldUpdate
        dispatch({
          type: SET_ORGANIZATION_SHOULD_UPDATE,
          payload: true,
        });
        return resolve();
      } catch (error) {
        // setToast
        return reject();
      }
    });
  };

  const resetOrganization = () =>
    dispatch({ type: RESET_ORGANIZATION, payload: initialState });

  useEffect(() => {
    if (isEmpty(state.organization)) return;

    setSessionStorageValue({
      data: { status: state.organization.status, data: state.organization },
    });
  }, [state.organization]);

  return (
    <OrganizationContext.Provider
      value={{
        status: state.status,
        organization: state.organization,
        isLoading: state.isLoading,
        shouldUpdate: state.shouldUpdate,
        editOrgBio,
        submitApplication,
        getMyOrganization,
        getOrganizationByUniqueid,
        resetOrganization,
      }}
    >
      {props.children}
    </OrganizationContext.Provider>
  );
};

export default OrganizationState;
