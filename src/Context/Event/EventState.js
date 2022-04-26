import { useReducer } from "react";

// Context
import EventContext from "./EventContext";
import EventReducer from "./EventReducer";

// Other
import {
  SET_LOADING,
  SET_EVENT,
  SET_LOBBYCODE_LOADING,
  SET_LOBBYCODE,
  SET_UPDATING,
  SET_SHOULD_UPDATE,
  SET_HOOKED_DISCORD_CHANNELS,
  SET_DISCORD_CHANNELS_LOADING,
} from "../types";
import { backendAPI } from "../../lib/backend";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import ToastContext from "../Toast/ToastContext";
import AuthContext from "../Auth/AuthContext";

const EventState = (props) => {
  const initialState = {
    event: {},
    isOwner: false,
    isLoading: true,
    discordChannelsLoading: true,
    isUpdating: true,
    lobbyCodeLoading: false,
    shouldUpdate: false,
  };

  let history = useHistory();

  const { authState } = useContext(AuthContext);
  const { setToast } = useContext(ToastContext);
  const [state, dispatch] = useReducer(EventReducer, initialState);

  const getEventById = async (id, lobbyCode = false) => {
    try {
      dispatch({
        type: SET_LOADING,
        payload: true,
      });
      const { data } = authState
        ? await backendAPI.get(
            `/events/authorized/by-id/${id}${
              lobbyCode ? `?code=${lobbyCode}` : ""
            }`
          )
        : await backendAPI.get(
            `/events/viewer/by-id/${id}${lobbyCode ? `?code=${lobbyCode}` : ""}`
          );

      dispatch({
        type: SET_EVENT,
        payload: data,
      });
      dispatch({
        type: SET_LOADING,
        payload: false,
      });
      dispatch({
        type: SET_UPDATING,
        payload: false,
      });
    } catch (error) {
      setToast({
        variant: "error",
        message: error.response
          ? error.response.data.message
          : "Apologies, Error occurred while trying to get the event, its either not found/deleted or your request is incorrect. try again or contact us.",
      });
      history.replace("/404");
    } finally {
      setShouldUpdate(false);
    }
  };

  const getLobbyCodeById = async (id) => {
    try {
      dispatch({
        type: SET_LOBBYCODE_LOADING,
        payload: true,
      });
      const { data } = await backendAPI.get(`/events/by-id/${id}/lobby-code`);
      dispatch({
        type: SET_LOBBYCODE,
        payload: data.lobby_code,
      });
      dispatch({
        type: SET_LOBBYCODE_LOADING,
        payload: false,
      });
    } catch (error) {
      history.replace("/404");
    }
  };

  const getDiscordChannelsByIds = (ids = []) => {
    if (!ids.length) return;

    return new Promise(async (resolve, reject) => {
      try {
        dispatch({
          type: SET_DISCORD_CHANNELS_LOADING,
          payload: true,
        });
        const urlQuery = ids.map((id) => `ids=${id}`).join("&");
        const { data: discordChannels } = await backendAPI.get(
          `/webhooks/by-ids/?${urlQuery}`
        );
        dispatch({
          type: SET_HOOKED_DISCORD_CHANNELS,
          payload: discordChannels,
        });
        dispatch({
          type: SET_DISCORD_CHANNELS_LOADING,
          payload: false,
        });
        resolve(discordChannels);
      } catch (error) {
        setToast({
          variant: "error",
          message: error.response
            ? error.response.data.message
            : "Apologies, Error occurred while trying to get your discord channels. try again or contact us.",
        });
        reject();
      }
    });
  };

  const setEvent = (event) => {
    dispatch({
      type: SET_EVENT,
      payload: event,
    });
  };

  const setLoading = (value) => {
    dispatch({
      type: SET_LOADING,
      payload: value,
    });
  };

  const setShouldUpdate = (value) => {
    dispatch({
      type: SET_SHOULD_UPDATE,
      payload: value,
    });
  };

  const startEvent = async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        dispatch({
          type: SET_UPDATING,
          payload: true,
        });
        // to notify webhooks if any are present
        const urlQuery = state.event.discord_webhooks
          .map((channels) => `webhookUrls=${channels.webhookUrl}`)
          .join("&");
        await backendAPI.patch(
          `/events/start/${id}?${urlQuery}&notify=${state.event.notify}`
        );
        setShouldUpdate(true);
        resolve();
      } catch (error) {
        setToast({
          variant: "error",
          message: error.response
            ? error.response.data.message
            : "Apologies, Error occurred while trying to update your event. try again or contact us.",
        });
        reject();
      } finally {
        dispatch({
          type: SET_UPDATING,
          payload: false,
        });
      }
    });
  };

  const endEvent = async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        dispatch({
          type: SET_UPDATING,
          payload: true,
        });
        // to notify webhooks if any are present
        const urlQuery = state.event.discord_webhooks
          .map((channels) => `webhookUrls=${channels.webhookUrl}`)
          .join("&");
        await backendAPI.patch(
          `/events/end/${id}?${urlQuery}&notify=${state.event.notify}`
        );
        setShouldUpdate(true);
        resolve();
      } catch (error) {
        setToast({
          variant: "error",
          message: error.response
            ? error.response.data.message
            : "Apologies, Error occurred while trying to update your event. try again or contact us.",
        });
        reject();
      } finally {
        dispatch({
          type: SET_UPDATING,
          payload: false,
        });
      }
    });
  };

  const deleteEvent = async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        dispatch({
          type: SET_UPDATING,
          payload: true,
        });
        await backendAPI.delete(`/events/${id}`);
        setToast({
          variant: "success",
          message: "Event successfully deleted.",
        });
        resolve();
      } catch (error) {
        setToast({
          variant: "error",
          message: error.response
            ? error.response.data.message
            : "Apologies, Error occurred while trying to delete your event. try again or contact us.",
        });
        resolve();
      } finally {
        dispatch({
          type: SET_UPDATING,
          payload: false,
        });
      }
    });
  };

  const updateEvent = async (id, criteria, data, shouldUpdate = true) => {
    return new Promise(async (resolve, reject) => {
      try {
        dispatch({
          type: SET_LOADING,
          payload: true,
        });
        dispatch({
          type: SET_UPDATING,
          payload: true,
        });

        await backendAPI.patch(`/events/update/${id}/${criteria}`, {
          ...data,
          uniqueid: state.event.uniqueid,
        });
        dispatch({
          type: SET_UPDATING,
          payload: false,
        });
        resolve();
      } catch (error) {
        setToast({
          variant: "error",
          message: error.response
            ? error.response.data.message
            : "Apologies, Error occurred while trying to update your event. try again or contact us.",
        });
        reject();
      } finally {
        setShouldUpdate(shouldUpdate);
      }
    });
  };

  const updateEventNotify = async (id, data) => {
    return new Promise(async (resolve, reject) => {
      try {
        await backendAPI.patch(`/events/update/${id}/discord-notification`, {
          ...data,
          uniqueid: state.event.uniqueid,
        });
        resolve();
      } catch (error) {
        setToast({
          variant: "error",
          message: error.response
            ? error.response.data.message
            : "Apologies, Error occurred while trying to update your event. try again or contact us.",
        });
        reject();
      }
    });
  };

  const progressEventRounds = async (uniqueid, round, data) => {
    return new Promise(async (resolve, reject) => {
      try {
        dispatch({
          type: SET_LOADING,
          payload: true,
        });
        dispatch({
          type: SET_UPDATING,
          payload: true,
        });
        await backendAPI.patch(`/events/progress/${uniqueid}/${round}/update`, {
          data,
        });
        setShouldUpdate(true);
        resolve();
      } catch (error) {
        setToast({
          variant: "error",
          message: error.response
            ? error.response.data.message
            : "Apologies, Error occurred while trying to update your event. try again or contact us.",
        });
        reject();
      } finally {
        dispatch({
          type: SET_UPDATING,
          payload: false,
        });
      }
    });
  };

  const progressEventEndRound = async (uniqueid, round, data) => {
    return new Promise(async (resolve, reject) => {
      try {
        dispatch({
          type: SET_LOADING,
          payload: true,
        });
        dispatch({
          type: SET_UPDATING,
          payload: true,
        });
        const urlQuery = state.event.discord_webhooks
          .map((channels) => `webhookUrls=${channels.webhookUrl}`)
          .join("&");
        await backendAPI.patch(
          `/events/progress/${uniqueid}/${round}/end?${urlQuery}&notify=${state.event.notify}`,
          {
            data,
          }
        );
        console.log(
          `/events/progress/${uniqueid}/${round}/end?${urlQuery}&notify=${state.event.notify}`
        );
        console.log(data);
        setShouldUpdate(true);
        resolve();
      } catch (error) {
        setToast({
          variant: "error",
          message: error.response
            ? error.response.data.message
            : "Apologies, Error occurred while trying to update your event. try again or contact us.",
        });
        reject();
      } finally {
        dispatch({
          type: SET_UPDATING,
          payload: false,
        });
      }
    });
  };

  return (
    <EventContext.Provider
      value={{
        event: state.event,
        isLoading: state.isLoading,
        isUpdating: state.isUpdating,
        lobbyCodeLoading: state.lobbyCodeLoading,
        shouldUpdate: state.shouldUpdate,
        setLoading,
        setEvent,
        setShouldUpdate,
        getEventById,
        getLobbyCodeById,
        getDiscordChannelsByIds,
        startEvent,
        endEvent,
        deleteEvent,
        updateEvent,
        updateEventNotify,
        progressEventRounds,
        progressEventEndRound,
      }}
    >
      {props.children}
    </EventContext.Provider>
  );
};

export default EventState;
