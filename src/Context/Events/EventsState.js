import { useContext, useReducer } from "react";

// Context
import EventsContext from "./EventsContext";
import EventsReducer from "./EventsReducer";

// Other
import {
  EVENTS_SET_EVENTS,
  SET_EVENTS_SKIP,
  RESET_PAGINATION,
  EVENTS_LOAD_EVENTS,
  SET_EVENTS_LOADING_MORE,
  SET_EVENTS_IS_LOADING,
  EVENTS_SET_LIVE_EVENTS,
  SET_EVENTS_LIVE_EVENTS_IS_LOADING,
} from "../types";
import { backendAPI } from "../../lib/backend";
import { sortBy } from "lodash";
import ToastContext from "../Toast/ToastContext";
import { EXPLORE_LOAD_TYPES } from "../../lib/constants";
import { isBefore } from "../../lib/utils";

const EventsState = (props) => {
  const initialState = {
    events: [],
    liveEvents: [],
    isLoadingMore: false,
    isLiveLoading: true,
    isLoading: true,
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
        term: "",
        gte: null,
        lte: null,
        status: [],
      },
    },
  };

  const { setToast } = useContext(ToastContext);
  const [state, dispatch] = useReducer(EventsReducer, initialState);

  const initialLoadExploreEvents = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await backendAPI.post(
          `/events/explore?skip=0`,
          state.load
        );

        const { events, pagination } = data;

        const sortedEvents = sortBy(events, "status");
        dispatch({
          type: EVENTS_LOAD_EVENTS,
          payload: { events: sortedEvents, pagination },
        });

        return resolve();
      } catch (error) {
        setToast({
          variant: "error",
          message: error.response
            ? error.response.data.message
            : "Apologies, Error occurred while trying to process your request. try again or contact us.",
          duration: 8000,
        });
        return reject();
      } finally {
        dispatch({
          type: SET_EVENTS_LOADING_MORE,
          payload: false,
        });
        dispatch({
          type: SET_EVENTS_IS_LOADING,
          payload: false,
        });
      }
    });
  };

  const initialLoadOrganizerEvents = (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await backendAPI.post(
          `/events/by-owner/${id}?skip=0`,
          state.load
        );

        const { events, pagination } = data;

        const sortedEvents = sortBy(events, "status");
        dispatch({
          type: EVENTS_LOAD_EVENTS,
          payload: { events: sortedEvents, pagination },
        });

        return resolve();
      } catch (error) {
        setToast({
          variant: "error",
          message: error.response
            ? error.response.data.message
            : "Apologies, Error occurred while trying to process your request. try again or contact us.",
          duration: 8000,
        });
        return reject();
      } finally {
        dispatch({
          type: SET_EVENTS_LOADING_MORE,
          payload: false,
        });
        dispatch({
          type: SET_EVENTS_IS_LOADING,
          payload: false,
        });
      }
    });
  };

  const loadLiveEvents = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await backendAPI.get(`/events/live`);

        dispatch({
          type: EVENTS_SET_LIVE_EVENTS,
          payload: data,
        });

        return resolve(data);
      } catch (error) {
        setToast({
          variant: "error",
          message: error.response
            ? error.response.data.message
            : "Apologies, Error occurred while trying to load live events.",
          duration: 8000,
        });
        return reject();
      } finally {
        dispatch({
          type: SET_EVENTS_LIVE_EVENTS_IS_LOADING,
          payload: false,
        });
      }
    });
  };

  const searchExploreEvents = (fetch_configs) => {
    return new Promise(async (resolve, reject) => {
      try {
        dispatch({
          type: SET_EVENTS_LOADING_MORE,
          payload: true,
        });
        dispatch({
          type: SET_EVENTS_IS_LOADING,
          payload: true,
        });

        dispatch({
          type: SET_EVENTS_SKIP,
          payload: 0,
        });

        console.log("=== Search, Configs:");
        console.log(fetch_configs);
        console.log("Skip: ", 0);
        const { data } = await backendAPI.post(
          `/events/explore?skip=0`,
          fetch_configs
        );

        const { events, pagination } = data;

        const sortedEvents = sortBy(events, "status");
        return dispatch({
          type: EVENTS_SET_EVENTS,
          payload: { events: sortedEvents, pagination },
        });
      } catch (error) {
        setToast({
          variant: "error",
          message: error.response
            ? error.response.data.message
            : "Apologies, Error occurred while trying to process your request. try again or contact us.",
          duration: 8000,
        });
        return reject();
      } finally {
        dispatch({
          type: SET_EVENTS_IS_LOADING,
          payload: false,
        });
      }
    });
  };

  const applyFiltersExplore = (fetch_configs) => {
    const { gte, lte, status } = fetch_configs.filters;

    // Validate
    if (isBefore(new Date(lte), new Date(gte))) return;

    if (status && !status?.length) return;

    return new Promise(async (resolve, reject) => {
      try {
        dispatch({
          type: SET_EVENTS_LOADING_MORE,
          payload: true,
        });
        dispatch({
          type: SET_EVENTS_IS_LOADING,
          payload: true,
        });

        dispatch({
          type: SET_EVENTS_SKIP,
          payload: 0,
        });

        console.log("=== Search, Configs:");
        console.log(fetch_configs);
        console.log("Skip: ", 0);
        const { data } = await backendAPI.post(
          `/events/explore?skip=0`,
          fetch_configs
        );

        const { events, pagination } = data;

        const sortedEvents = sortBy(events, "status");
        dispatch({
          type: EVENTS_SET_EVENTS,
          payload: { events: sortedEvents, pagination },
        });
        return resolve();
      } catch (error) {
        setToast({
          variant: "error",
          message: error.response
            ? error.response.data.message
            : "Apologies, Error occurred while trying to process your request. try again or contact us.",
          duration: 8000,
        });
        return reject();
      } finally {
        dispatch({
          type: SET_EVENTS_IS_LOADING,
          payload: false,
        });
      }
    });
  };

  const loadMoreEvents = async (load_configs) => {
    try {
      dispatch({
        type: SET_EVENTS_LOADING_MORE,
        payload: true,
      });

      const { data } = await backendAPI.post(
        `/events/explore?skip=${state.pagination.skip}`,
        load_configs
      );

      const { events, pagination } = data;

      const sortedEvents = sortBy(events, "status");
      return dispatch({
        type: EVENTS_LOAD_EVENTS,
        payload: { events: sortedEvents, pagination },
      });
    } catch (error) {
    } finally {
      dispatch({
        type: SET_EVENTS_LOADING_MORE,
        payload: false,
      });
    }
  };

  const loadMoreOrganizerEvents = async (load_configs, id) => {
    try {
      dispatch({
        type: SET_EVENTS_LOADING_MORE,
        payload: true,
      });

      console.log("=== Load more, Configs:");
      console.log(load_configs);
      console.log("Skip: ", state.pagination.skip);

      const { data } = await backendAPI.post(
        `/events/by-owner/${id}?skip=${state.pagination.skip}`,
        load_configs
      );

      const { events, pagination } = data;

      const sortedEvents = sortBy(events, "status");
      return dispatch({
        type: EVENTS_LOAD_EVENTS,
        payload: { events: sortedEvents, pagination },
      });
    } catch (error) {
    } finally {
      dispatch({
        type: SET_EVENTS_LOADING_MORE,
        payload: false,
      });
    }
  };

  const resetPagination = () => {
    dispatch({
      type: RESET_PAGINATION,
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
    <EventsContext.Provider
      value={{
        events: state.events,
        liveEvents: state.liveEvents,
        pagination: state.pagination,
        filtered: state.filtered,
        status: state.status,
        range: state.range,
        isLoading: state.isLoading,
        isLiveLoading: state.isLiveLoading,
        isLoadingMore: state.isLoadingMore,
        initialLoadExploreEvents,
        initialLoadOrganizerEvents,
        loadLiveEvents,
        searchExploreEvents,
        applyFiltersExplore,
        loadMoreEvents,
        loadMoreOrganizerEvents,
        resetPagination,
      }}
    >
      {props.children}
    </EventsContext.Provider>
  );
};

export default EventsState;
