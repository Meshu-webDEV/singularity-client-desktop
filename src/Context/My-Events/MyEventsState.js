import { useContext, useReducer } from 'react';

// Context
import MyEventsContext from './MyEventsContext';
import MyEventsReducer from './MyEventsReducer';

// Other
import {
  MY_EVENTS_SET_EVENTS,
  SET_MY_EVENTS_SKIP,
  MY_EVENTS_RESET_PAGINATION,
  MY_EVENTS_LOAD_EVENTS,
  SET_MY_EVENTS_LOADING_MORE,
  SET_MY_EVENTS_IS_LOADING,
  SET_MY_EVENTS_STATS,
} from '../types';
import { backendAPI } from '../../lib/backend';
import { sortBy } from 'lodash';
import ToastContext from '../Toast/ToastContext';
import { EXPLORE_LOAD_TYPES } from '../../lib/constants';
import { isBefore } from '../../lib/utils';

const MyEventsState = props => {
  const initialState = {
    events: [],
    isLoadingMore: false,
    isLoading: true,
    stats: {},
    pagination: {
      total: 0,
      remaining: 0,
      hasMore: false,
      resultCount: 0,
      skip: 0,
    },
    load: {
      type: EXPLORE_LOAD_TYPES.INITIAL,
      filters: {
        term: '',
        gte: null,
        lte: null,
        status: [],
      },
    },
  };

  const { setToast } = useContext(ToastContext);
  const [state, dispatch] = useReducer(MyEventsReducer, initialState);

  const initialLoadExploreEvents = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await backendAPI.post(
          `/events/my-events?skip=0`,
          state.load
        );

        const { events, pagination, stats } = data;

        const sortedEvents = sortBy(events, 'status');
        dispatch({
          type: MY_EVENTS_LOAD_EVENTS,
          payload: { events: sortedEvents, pagination },
        });
        dispatch({
          type: SET_MY_EVENTS_STATS,
          payload: stats,
        });

        return resolve();
      } catch (error) {
        setToast({
          variant: 'error',
          message: error.response
            ? error.response.data.message
            : 'Apologies, Error occurred while trying to process your request. try again or contact us.',
          duration: 8000,
        });
        return reject();
      } finally {
        dispatch({
          type: SET_MY_EVENTS_LOADING_MORE,
          payload: false,
        });
        dispatch({
          type: SET_MY_EVENTS_IS_LOADING,
          payload: false,
        });
      }
    });
  };

  const searchExploreEvents = fetch_configs => {
    return new Promise(async (resolve, reject) => {
      try {
        dispatch({
          type: SET_MY_EVENTS_LOADING_MORE,
          payload: true,
        });
        dispatch({
          type: SET_MY_EVENTS_IS_LOADING,
          payload: true,
        });

        dispatch({
          type: SET_MY_EVENTS_SKIP,
          payload: 0,
        });

        console.log('=== Search, Configs:');
        console.log(fetch_configs);
        console.log('Skip: ', 0);
        const { data } = await backendAPI.post(
          `/events/my-events?skip=0`,
          fetch_configs
        );

        const { events, pagination } = data;

        const sortedEvents = sortBy(events, 'status');
        return dispatch({
          type: MY_EVENTS_SET_EVENTS,
          payload: { events: sortedEvents, pagination },
        });
      } catch (error) {
        setToast({
          variant: 'error',
          message: error.response
            ? error.response.data.message
            : 'Apologies, Error occurred while trying to process your request. try again or contact us.',
          duration: 8000,
        });
        return reject();
      } finally {
        dispatch({
          type: SET_MY_EVENTS_IS_LOADING,
          payload: false,
        });
      }
    });
  };

  const applyFiltersExplore = fetch_configs => {
    const { gte, lte, status } = fetch_configs.filters;

    // Validate
    if (isBefore(new Date(lte), new Date(gte))) return;

    if (status && !status?.length) return;

    return new Promise(async (resolve, reject) => {
      try {
        dispatch({
          type: SET_MY_EVENTS_LOADING_MORE,
          payload: true,
        });
        dispatch({
          type: SET_MY_EVENTS_IS_LOADING,
          payload: true,
        });

        dispatch({
          type: SET_MY_EVENTS_SKIP,
          payload: 0,
        });

        console.log('=== Search, Configs:');
        console.log(fetch_configs);
        console.log('Skip: ', 0);
        const { data } = await backendAPI.post(
          `/events/my-events?skip=0`,
          fetch_configs
        );

        const { events, pagination } = data;

        const sortedEvents = sortBy(events, 'status');
        dispatch({
          type: MY_EVENTS_SET_EVENTS,
          payload: { events: sortedEvents, pagination },
        });
        return resolve();
      } catch (error) {
        setToast({
          variant: 'error',
          message: error.response
            ? error.response.data.message
            : 'Apologies, Error occurred while trying to process your request. try again or contact us.',
          duration: 8000,
        });
        return reject();
      } finally {
        dispatch({
          type: SET_MY_EVENTS_IS_LOADING,
          payload: false,
        });
      }
    });
  };

  const loadMoreEvents = async load_configs => {
    try {
      dispatch({
        type: SET_MY_EVENTS_LOADING_MORE,
        payload: true,
      });

      console.log('=== Load more, Configs:');
      console.log(load_configs);
      console.log('Skip: ', state.pagination.skip);

      const { data } = await backendAPI.post(
        `/events/my-events?skip=${state.pagination.skip}`,
        load_configs
      );

      const { events, pagination } = data;

      const sortedEvents = sortBy(events, 'status');
      return dispatch({
        type: MY_EVENTS_LOAD_EVENTS,
        payload: { events: sortedEvents, pagination },
      });
    } catch (error) {
    } finally {
      dispatch({
        type: SET_MY_EVENTS_LOADING_MORE,
        payload: false,
      });
    }
  };

  const resetPagination = () => {
    dispatch({
      type: MY_EVENTS_RESET_PAGINATION,
      payload: {
        total: 0,
        remaining: 0,
        hasMore: false,
        resultCount: 0,
        skip: 0,
      },
    });
  };

  return (
    <MyEventsContext.Provider
      value={{
        events: state.events,
        pagination: state.pagination,
        filtered: state.filtered,
        load: state.load,
        status: state.status,
        stats: state.stats,
        range: state.range,
        isLoading: state.isLoading,
        isLoadingMore: state.isLoadingMore,
        initialLoadExploreEvents,
        searchExploreEvents,
        applyFiltersExplore,
        loadMoreEvents,
        resetPagination,
      }}
    >
      {props.children}
    </MyEventsContext.Provider>
  );
};

export default MyEventsState;
