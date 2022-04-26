import React, { useReducer } from "react";
import { useContext } from "react";
import { backendAPI } from "../../lib/backend";
import { TEMPLATES_LOAD_TYPES } from "../../lib/constants";
import ToastContext from "../Toast/ToastContext";
import {
  RESET_TEMPLATE_STATE,
  SET_DASHBOARD_DATA,
  SET_DASHBOARD_SHOULD_UPDATE,
  SET_LOADING,
  SET_RECENT_EVENTS,
  SET_TEMPLATES,
  SET_TEMPLATES_LOADING,
  SET_TEMPLATE_SHOULD_UPDATE,
} from "../types";

import DashboardContext from "./DashboardContext";
import DashboardReducer from "./DashboardReducer";

const DashboardState = (props) => {
  const initialState = {
    recentEvents: [],
    topTemplates: [],
    // Template API endpoint load meta
    load: {
      type: TEMPLATES_LOAD_TYPES.INITIAL,
      filters: {
        term: "",
      },
    },
    shouldUpdate: true,
    isLoading: false,
  };

  const { setToast } = useContext(ToastContext);

  const [state, dispatch] = useReducer(DashboardReducer, initialState);

  const getRecentEvents = async () => {
    try {
      dispatch({
        type: SET_LOADING,
      });
      const { data } = await backendAPI.get(`/events/my-recent-events`);

      dispatch({
        type: SET_RECENT_EVENTS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      setToast({
        variant: "error",
        message: error.response
          ? error.response.data.message
          : "Apologies, Error occurred while trying to get your recent events. try again or contact us.",
      });
    } finally {
      dispatch({
        type: SET_LOADING,
      });
    }
  };

  const getTopTemplates = async () => {
    try {
      dispatch({
        type: SET_LOADING,
      });
      const { data } = await backendAPI.get(`/events/my-recent-events`);

      dispatch({
        type: SET_RECENT_EVENTS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      setToast({
        variant: "error",
        message: error.response
          ? error.response.data.message
          : "Apologies, Error occurred while trying to get your recent events. try again or contact us.",
      });
    } finally {
      dispatch({
        type: SET_LOADING,
      });
    }
  };

  const getDashboardData = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        dispatch({
          type: SET_LOADING,
        });
        const events_response = await backendAPI.get(
          `/events/my-recent-events`
        );
        // prettier-ignore
        const templates_response = await backendAPI.post(`/templates/my-templates?skip=0`, state.load);

        console.log(templates_response);

        dispatch({
          type: SET_DASHBOARD_DATA,
          payload: {
            recentEvents: events_response.data,
            topTemplates: templates_response.data.templates,
          },
        });

        dispatch({
          type: SET_RECENT_EVENTS,
          payload: events_response.data,
        });

        setDashboardShouldUpdate(false);
      } catch (error) {
        console.log(error);
        setToast({
          variant: "error",
          message: error.response
            ? error.response.data.message
            : "Apologies, Error occurred while trying to get your recent events. try again or contact us.",
        });
        setDashboardShouldUpdate(false);
      } finally {
        dispatch({
          type: SET_LOADING,
        });
      }
    });
  };

  const setDashboardShouldUpdate = (shouldUpdate) => {
    dispatch({
      type: SET_DASHBOARD_SHOULD_UPDATE,
      payload: shouldUpdate,
    });
    return;
  };

  return (
    <DashboardContext.Provider
      value={{
        recentEvents: state.recentEvents,
        topTemplates: state.topTemplates,
        isLoading: state.isLoading,
        shouldUpdate: state.shouldUpdate,
        getRecentEvents,
        getDashboardData,
        setDashboardShouldUpdate,
      }}
    >
      {props.children}
    </DashboardContext.Provider>
  );
};

export default DashboardState;
