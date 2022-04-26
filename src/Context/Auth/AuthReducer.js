import {
  LOADING,
  SET_AUTH_STATE,
  SET_TOKEN,
  SET_USER,
  SIGNIN,
  SIGNOUT,
  SET_IS_AUTHENTICATING,
  SET_IS_AUTHORIZED,
  SET_NOT_AUTHORIZED,
  SIGNUP,
  SET_GOOGLE_LOADING,
  SET_TWITCH_LOADING,
  SET_LOCAL_LOADING,
} from './../types';

export default (state, action) => {
  switch (action.type) {
    case SIGNUP:
      return {
        ...state,
        token: action.payload.token,
        username: action.payload.username,
        authState: action.payload.authState,
      };
    case SIGNIN:
      return {
        ...state,
        token: action.payload.token,
        username: action.payload.username,
        authState: action.payload.authState,
      };
    case SIGNOUT:
      return action.payload;
    case SET_IS_AUTHORIZED:
      return {
        ...state,
        id: action.payload.id,
        username: action.payload.username,
        displayName: action.payload.displayName,
        email: action.payload.email,
        authState: action.payload.authState,
      };
    case SET_NOT_AUTHORIZED:
      return action.payload;
    case SET_IS_AUTHENTICATING:
      return {
        ...state,
        isAuthenticating: action.payload,
      };
    case LOADING:
      return {
        ...state,
        loading: !state.loading,
      };
    case SET_GOOGLE_LOADING:
      return {
        ...state,
        googleLoading: action.payload,
      };
    case SET_TWITCH_LOADING:
      return {
        ...state,
        twitchLoading: action.payload,
      };
    case SET_LOCAL_LOADING:
      return {
        ...state,
        localLoading: action.payload,
      };
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case SET_USER:
      return {
        ...state,
        username: action.payload,
      };
    case SET_AUTH_STATE:
      return {
        ...state,
        authState: action.payload,
      };

    default:
      return state;
  }
};
