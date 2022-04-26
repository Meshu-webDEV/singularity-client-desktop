import {
  SET_LOADING,
  SET_UPDATING,
  SET_EVENT,
  SET_LOBBYCODE,
  SET_LOBBYCODE_LOADING,
  SET_SHOULD_UPDATE,
  SET_DISCORD_CHANNELS_LOADING,
  SET_HOOKED_DISCORD_CHANNELS,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case SET_UPDATING:
      return {
        ...state,
        isUpdating: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case SET_SHOULD_UPDATE:
      return {
        ...state,
        shouldUpdate: action.payload,
      };
    case SET_DISCORD_CHANNELS_LOADING:
      return {
        ...state,
        lobbyCodeLoading: action.payload,
      };
    case SET_LOBBYCODE_LOADING:
      return {
        ...state,
        lobbyCodeLoading: action.payload,
      };
    case SET_EVENT:
      return {
        ...state,
        event: action.payload,
      };
    case SET_HOOKED_DISCORD_CHANNELS:
      return {
        ...state,
        event: {
          ...state.event,
          discordWebhooks: action.payload,
        },
      };
    case SET_LOBBYCODE:
      return {
        ...state,
        event: {
          ...state.event,
          lobbyCode: action.payload,
        },
      };
    default:
      return state;
  }
};
