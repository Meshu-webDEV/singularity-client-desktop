import React, { useContext, useReducer } from 'react';

import {
  SET_INTEGRATIONS_LOADING,
  SET_DISCORD_WEBHOOKS,
  SET_INTEGRATIONS_SHOULD_UPDATE,
  SET_NIGHTBOT_EVENTS,
  SET_NIGHTBOT_LOADING,
} from '../types';

import IntegrationsContext from './IntegrationsContext';
import IntegrationsReducer from './IntegrationsReducer';
import { backendAPI } from '../../lib/backend';
import ToastContext from '../Toast/ToastContext';
import { isDateHoursAgo } from '../../lib/utils';
import { EXPLORE_LOAD_TYPES } from '../../lib/constants';

const IntegrationsState = props => {
  const initialState = {
    discordWebhooks: [],
    shouldUpdate: false,
    isLoading: true,
    nightbot: {
      pagination: {
        skip: 0,
        sort: 'asc',
        total: 0,
        remaining: 0,
        hasMore: false,
        resultCount: 0,
      },
      events: [],
      isLoading: true,
    },
  };
  const { setToast } = useContext(ToastContext);

  const [state, dispatch] = useReducer(IntegrationsReducer, initialState);

  const newDiscordChannel = async data => {
    try {
      await backendAPI.post('/webhooks/new', data);
      dispatch({
        type: SET_INTEGRATIONS_LOADING,
        payload: false,
      });
      dispatch({
        type: SET_INTEGRATIONS_SHOULD_UPDATE,
        payload: true,
      });
    } catch (error) {
      setToast({
        variant: 'error',
        message: error.response
          ? error.response.data.message
          : 'Apologies, Error occurred while trying to process your request. try again or contact us.',
        duration: 8000,
      });
    }
  };

  const pingDiscordChannel = async (uniqueid, channel, server) => {
    try {
      await backendAPI.post(`webhooks/${uniqueid}/ping`);
      return setToast({
        variant: 'success',
        message: `Successfully pinged <span class="font-medium">${server}'s</span> server, check the channel <span class="font-medium">${channel}</span>, you should see our hardworking <span class="font-bold">Galactico ✨</span> saying hi`,
        duration: 8000,
      });
    } catch (error) {
      return setToast({
        variant: 'error',
        message: error.response
          ? error.response.data.message
          : 'Apologies, but you can only ping a channel once per day.',
      });
    }
  };

  const deleteDiscordChannelById = async (uniqueid, channel) => {
    try {
      dispatch({
        type: SET_INTEGRATIONS_LOADING,
        payload: true,
      });
      await backendAPI.delete(`/webhooks/${uniqueid}`);
      return setToast({
        variant: 'warning',
        message: `Successfully deleted the channel <span class="font-bold">${channel}</span>`,
      });
    } catch (error) {
      return setToast({
        variant: 'error',
        message: error.response
          ? error.response.data.message
          : 'Apologies, Error occurred while trying to get your discord channels. try again or contact us.',
      });
    } finally {
      dispatch({
        type: SET_INTEGRATIONS_LOADING,
        payload: false,
      });
      dispatch({
        type: SET_INTEGRATIONS_SHOULD_UPDATE,
        payload: true,
      });
    }
  };

  const updateDiscordChannelById = async (uniqueid, data) => {
    try {
      dispatch({
        type: SET_INTEGRATIONS_LOADING,
        payload: true,
      });
      await backendAPI.patch(`/webhooks/${uniqueid}`, data);
      dispatch({
        type: SET_INTEGRATIONS_SHOULD_UPDATE,
        payload: true,
      });
    } catch (error) {
      setToast({
        variant: 'error',
        message: error.response
          ? error.response.data.message
          : 'Apologies, Error occurred while trying to process your request. try again or contact us.',
        duration: 8000,
      });
    } finally {
      dispatch({
        type: SET_INTEGRATIONS_LOADING,
        payload: false,
      });
    }
  };

  const getDiscordChannels = () => {
    return new Promise(async (resolve, reject) => {
      try {
        dispatch({
          type: SET_INTEGRATIONS_LOADING,
          payload: true,
        });
        const { data } = await backendAPI.get('/webhooks');

        const indicatedWithIsPingable = data.map(hook => {
          if (!isDateHoursAgo(hook.lastPinged, 24))
            return { ...hook, pingable: false };
          return { ...hook, pingable: true };
        });

        dispatch({
          type: SET_DISCORD_WEBHOOKS,
          payload: indicatedWithIsPingable,
        });
        return resolve(indicatedWithIsPingable);
      } catch (error) {
        setToast({
          variant: 'error',
          message: error.response
            ? error.response.data.message
            : 'Apologies, Error occurred while trying to get your discord channels. try again or contact us.',
        });
        return reject();
      } finally {
        dispatch({
          type: SET_INTEGRATIONS_LOADING,
          payload: false,
        });
        dispatch({
          type: SET_INTEGRATIONS_SHOULD_UPDATE,
          payload: false,
        });
      }
    });
  };

  const getNightbotEvents = () => {
    return new Promise(async (resolve, reject) => {
      try {
        dispatch({
          type: SET_NIGHTBOT_LOADING,
          payload: true,
        });
        const { data } = await backendAPI.post(
          `/events/my-events?skip=${state.nightbot.pagination.skip}&sort=${state.nightbot.pagination.sort}`,
          {
            type: EXPLORE_LOAD_TYPES.INITIAL,
            filters: {
              term: '',
              gte: null,
              lte: null,
              status: [],
            },
          }
        );
        dispatch({
          type: SET_NIGHTBOT_EVENTS,
          payload: data,
        });

        console.log(data);
      } catch (error) {
        console.log(error);
      } finally {
        dispatch({
          type: SET_NIGHTBOT_LOADING,
          payload: false,
        });
      }
    });
  };

  const loadMoreNightbotEvents = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await backendAPI.post(
          `/events/my-events?skip=${state.nightbot.pagination.skip}&sort=${state.nightbot.pagination.sort}`,
          {
            type: EXPLORE_LOAD_TYPES.INITIAL,
            filters: {
              term: '',
              gte: null,
              lte: null,
              status: [],
            },
          }
        );
        dispatch({
          type: SET_NIGHTBOT_EVENTS,
          payload: data,
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
      }
    });
  };

  return (
    <IntegrationsContext.Provider
      value={{
        nightbot: state.nightbot,
        discordWebhooks: state.discordWebhooks,
        isLoading: state.isLoading,
        shouldUpdate: state.shouldUpdate,
        getDiscordChannels,
        newDiscordChannel,
        pingDiscordChannel,
        deleteDiscordChannelById,
        updateDiscordChannelById,
        getNightbotEvents,
        loadMoreNightbotEvents,
      }}
    >
      {props.children}
    </IntegrationsContext.Provider>
  );
};

export default IntegrationsState;
