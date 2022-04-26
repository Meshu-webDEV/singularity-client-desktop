import {
  SET_INTEGRATIONS_LOADING,
  SET_DISCORD_WEBHOOKS,
  SET_INTEGRATIONS_SHOULD_UPDATE,
  SET_NIGHTBOT_EVENTS,
  SET_NIGHTBOT_LOADING,
} from '../types';
export default (state, action) => {
  switch (action.type) {
    case SET_DISCORD_WEBHOOKS:
      return {
        ...state,
        discordWebhooks: action.payload,
      };
    case SET_INTEGRATIONS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case SET_INTEGRATIONS_SHOULD_UPDATE:
      return {
        ...state,
        shouldUpdate: action.payload,
      };
    case SET_NIGHTBOT_EVENTS:
      return {
        ...state,
        nightbot: {
          ...state.nightbot,
          pagination: {
            ...state.nightbot.pagination,
            ...action.payload.pagination,
            skip:
              state.nightbot.events.length +
              action.payload.pagination.resultCount,
          },
          events: [...state.nightbot.events, ...action.payload.events],
        },
      };
    case SET_NIGHTBOT_LOADING:
      return {
        ...state,
        nightbot: {
          ...state.nightbot,
          isLoading: action.payload,
        },
      };
    default:
      return state;
  }
};
