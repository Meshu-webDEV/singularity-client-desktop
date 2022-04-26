import React, { useContext, useReducer } from 'react';

import { SET_LOADING, SET_TEAMS } from '../types';

import TeamsContext from './TeamsContext';
import TeamsReducer from './TeamsReducer';
import { backendAPI } from '../../lib/backend';
import AuthContext from '../Auth/AuthContext';

const TeamsState = props => {
  const initialState = {
    teams: [],
    isLoading: false,
  };

  const [state, dispatch] = useReducer(TeamsReducer, initialState);

  // get backend variables(games and other things)
  const getTeams = () => {
    return new Promise(async (resolve, reject) => {
      try {
        dispatch({
          type: SET_LOADING,
        });
        const { data } = await backendAPI.get('/teams');
        dispatch({
          type: SET_TEAMS,
          payload: data,
        });
        resolve(data);
      } catch (error) {
        console.log('error: ', error);
      } finally {
        dispatch({
          type: SET_LOADING,
        });
      }
    });
  };

  return (
    <TeamsContext.Provider
      value={{
        teams: state.teams,
        isLoading: state.isLoading,
        getTeams,
      }}
    >
      {props.children}
    </TeamsContext.Provider>
  );
};

export default TeamsState;
