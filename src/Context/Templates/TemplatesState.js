import React, { useContext, useReducer } from "react";
import { useHistory } from "react-router-dom";

import {
  SET_TEMPLATES_LOADING,
  SET_INTEGRATIONS_LOADING,
  SET_INTEGRATIONS_SHOULD_UPDATE,
  SET_TEMPLATES,
  SET_TEMPLATE_SHOULD_UPDATE,
  SET_MY_TEMPLATES_SKIP,
  LOAD_MORE_TEMPLATES,
  RESET_TEMPLATE_STATE,
} from "../types";

import TemplatesContext from "./TemplatesContext";
import TemplatesReducer from "./TemplatesReducer";
import { backendAPI } from "../../lib/backend";
import ToastContext from "../Toast/ToastContext";
import { sortBy, uniq } from "lodash";
import { TEMPLATES_LOAD_TYPES } from "../../lib/constants";

const TemplatesState = (props) => {
  const initialState = {
    templates: [],
    isLoading: true,
    isLoadingMore: false,
    shouldUpdate: false,
    pagination: {
      skip: 0,
      total: 0,
      remaining: 0,
      hasMore: false,
      resultCount: 0,
    },
    load: {
      type: TEMPLATES_LOAD_TYPES.INITIAL,
      filters: {
        term: "",
      },
    },
  };
  const { setToast } = useContext(ToastContext);

  const [state, dispatch] = useReducer(TemplatesReducer, initialState);
  const history = useHistory();

  const newTemplate = (data, options) => {
    return new Promise(async (resolve, reject) => {
      try {
        const template = {
          description: options.description ? data.description : false,
          rounds: options.rounds ? data.rounds : false,
          teams: options.teams ? data.teams : false,
          points: options.points
            ? {
                pointsDistribution: data.pointsDistribution,
                pointPerKill: data.pointPerKill,
              }
            : false,
          prizes: options.prizes
            ? {
                prizepoolDistribution: data.prizepoolDistribution,
                prizepoolCurrency: data.prizepoolCurrency,
                prizepool: data.prizepool,
                hasPrizepool: data.hasPrizepool,
                remainingPrizepool: data.remainingPrizepool,
              }
            : false,
        };
        console.log(template);
        await backendAPI.post("/templates/new", {
          name: data.name,
          description: data.templateDescription,
          visible: data.visible,
          template: template,
          used_options: options,
        });
        setToast({
          variant: "success",
          message: "Template has been created successfully!",
        });
        dispatch({
          type: SET_TEMPLATE_SHOULD_UPDATE,
          payload: true,
        });
        resolve();
      } catch (error) {
        console.log(error);
        setToast({
          variant: "error",
          message: error.response
            ? error.response.data.message
            : "Apologies, Error occurred while trying to process your request. try again or contact us.",
        });
        reject();
      } finally {
        dispatch({
          type: SET_TEMPLATES_LOADING,
          payload: true,
        });

        dispatch({
          type: SET_MY_TEMPLATES_SKIP,
          payload: 0,
        });
      }
    });
  };

  const getTemplateByUniqueid = (uniqueid) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await backendAPI.get(`/templates/${uniqueid}`);
        return resolve(data);
      } catch (error) {
        console.log(error);
        setToast({
          variant: "error",
          message: error.response
            ? error.response.data.message
            : "Apologies, Error occurred while trying to process your request. try again or contact us.",
        });
        return reject();
      }
    });
  };

  const deleteTemplateById = async (
    uniqueid,
    template,
    redirect = false,
    updateDashboardData = () => null
  ) => {
    try {
      updateDashboardData(true);
      dispatch({
        type: RESET_TEMPLATE_STATE,
        payload: initialState,
      });
      // await backendAPI.delete(`/templates/${uniqueid}`);
      if (redirect) history.replace("/dashboard");
      setToast({
        variant: "success",
        message: `Template successfully deleted`,
      });
    } catch (error) {
      return setToast({
        variant: "error",
        message: error.response
          ? error.response.data.message
          : "Apologies, Error occurred while trying to delete your template. try again or contact us.",
      });
    } finally {
      dispatch({
        type: SET_TEMPLATE_SHOULD_UPDATE,
        payload: true,
      });
    }
  };

  const initialLoadTemplates = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await backendAPI.post(
          `/templates/explore?skip=0`,
          state.load
        );

        const { templates, pagination } = data;

        dispatch({
          type: SET_TEMPLATES,
          payload: { templates, pagination },
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
          type: SET_TEMPLATES_LOADING,
          payload: false,
        });
        dispatch({
          type: SET_TEMPLATE_SHOULD_UPDATE,
          payload: false,
        });
      }
    });
  };

  const loadMoreTemplates = async (load_configs) => {
    try {
      console.log("=== Load more, Configs:");
      console.log(load_configs);
      console.log("Skip: ", state.pagination.skip);

      const { data } = await backendAPI.post(
        `/templates/explore?skip=${state.pagination.skip}`,
        load_configs
      );

      const { templates, pagination } = data;

      return dispatch({
        type: LOAD_MORE_TEMPLATES,
        payload: { templates, pagination },
      });
    } catch (error) {
      return setToast({
        variant: "error",
        message: error.response
          ? error.response.data.message
          : "Apologies, Error occurred while trying to process your request. try again or contact us.",
        duration: 8000,
      });
    }
  };

  const searchTemplates = (fetch_configs) => {
    return new Promise(async (resolve, reject) => {
      try {
        dispatch({
          type: SET_TEMPLATES_LOADING,
          payload: true,
        });

        dispatch({
          type: SET_MY_TEMPLATES_SKIP,
          payload: 0,
        });

        console.log("=== Search, Configs:");
        console.log(fetch_configs);
        console.log("Skip: ", 0);

        const { data } = await backendAPI.post(
          `/templates/explore?skip=0`,
          fetch_configs
        );

        const { templates, pagination } = data;

        dispatch({
          type: SET_TEMPLATES,
          payload: { templates, pagination },
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
          type: SET_TEMPLATES_LOADING,
          payload: false,
        });
      }
    });
  };

  // My templates page functions

  const initialLoadMyTemplates = () => {
    return new Promise(async (resolve, reject) => {
      try {
        dispatch({
          type: RESET_TEMPLATE_STATE,
          payload: initialState,
        });

        const { data } = await backendAPI.post(
          `/templates/my-templates?skip=0`,
          state.load
        );

        const { templates, pagination } = data;

        dispatch({
          type: SET_TEMPLATES,
          payload: { templates, pagination },
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
          type: SET_TEMPLATES_LOADING,
          payload: false,
        });
        dispatch({
          type: SET_TEMPLATE_SHOULD_UPDATE,
          payload: false,
        });
      }
    });
  };

  const loadMoreMyTemplates = async (load_configs) => {
    try {
      console.log("=== Load more, Configs:");
      console.log(load_configs);
      console.log("Skip: ", state.pagination.skip);

      const { data } = await backendAPI.post(
        `/templates/my-templates?skip=${state.pagination.skip}`,
        load_configs
      );

      const { templates, pagination } = data;

      return dispatch({
        type: LOAD_MORE_TEMPLATES,
        payload: { templates, pagination },
      });
    } catch (error) {
      return setToast({
        variant: "error",
        message: error.response
          ? error.response.data.message
          : "Apologies, Error occurred while trying to process your request. try again or contact us.",
        duration: 8000,
      });
    }
  };

  const searchMyTemplates = (fetch_configs) => {
    return new Promise(async (resolve, reject) => {
      try {
        dispatch({
          type: SET_TEMPLATES_LOADING,
          payload: true,
        });

        dispatch({
          type: SET_MY_TEMPLATES_SKIP,
          payload: 0,
        });

        console.log("=== Search, Configs:");
        console.log(fetch_configs);
        console.log("Skip: ", 0);

        const { data } = await backendAPI.post(
          `/templates/my-templates?skip=0`,
          fetch_configs
        );

        const { templates, pagination } = data;

        dispatch({
          type: SET_TEMPLATES,
          payload: { templates, pagination },
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
          type: SET_TEMPLATES_LOADING,
          payload: false,
        });
      }
    });
  };

  // Other

  const resetState = () => {
    return dispatch({
      type: RESET_TEMPLATE_STATE,
      payload: initialState,
    });
  };

  return (
    <TemplatesContext.Provider
      value={{
        templates: state.templates,
        isLoading: state.isLoading,
        shouldUpdate: state.shouldUpdate,
        pagination: state.pagination,
        newTemplate,
        getTemplateByUniqueid,
        // My-templates
        initialLoadMyTemplates,
        loadMoreMyTemplates,
        searchMyTemplates,
        deleteTemplateById,
        // Templates
        initialLoadTemplates,
        loadMoreTemplates,
        searchTemplates,
      }}
    >
      {props.children}
    </TemplatesContext.Provider>
  );
};

export default TemplatesState;
