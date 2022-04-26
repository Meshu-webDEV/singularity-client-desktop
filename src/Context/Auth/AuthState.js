import { useContext, useReducer } from "react";
import { useHistory, useLocation } from "react-router";

// Context
import {
  SET_IS_AUTHORIZED,
  SIGNOUT,
  SET_IS_AUTHENTICATING,
  SET_NOT_AUTHORIZED,
  SET_LOCAL_LOADING,
  SET_TWITCH_LOADING,
  SET_GOOGLE_LOADING,
} from "./../types";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import ToastContext from "../../Context/Toast/ToastContext";

// Utils
import { backendAPI } from "../../lib/backend";

const AuthState = (props) => {
  const initialState = {
    id: "",
    username: "",
    displayName: "",
    email: "",
    isAuthenticating: true,
    authState: false,
    loading: false,
    googleLoading: false,
    localLoading: false,
    twitchLoading: false,
    awaitingActivation: false,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const { setToast } = useContext(ToastContext);

  let history = useHistory();
  const location = useLocation();

  const isAuthorized = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await backendAPI.get(`/user`);
        // Set is authorized state
        dispatch({
          type: SET_IS_AUTHORIZED,
          payload: {
            ...data,
            authState: true,
          },
        });
        return resolve();
      } catch (error) {
        dispatch({
          type: SET_NOT_AUTHORIZED,
          payload: initialState,
        });
        reject();
        // history.replace('/dashboard');
      } finally {
        // Indicate finished authenticating
        dispatch({
          type: SET_IS_AUTHENTICATING,
          payload: false,
        });
        dispatch({
          type: SET_TWITCH_LOADING,
          payload: false,
        });
        dispatch({
          type: SET_GOOGLE_LOADING,
          payload: false,
        });
        dispatch({ type: SET_LOCAL_LOADING, payload: false });
      }
    });
  };

  const LocalSignup = (user) => {
    if (isCurrentlyTryingToAuthenticate()) return;

    dispatch({ type: SET_LOCAL_LOADING, payload: true });

    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await backendAPI.post(
          `${
            process.env.NODE_ENV === "production"
              ? `${process.env.REACT_APP_BACKEND}/v1/authenticate/local/signup`
              : "/authenticate/local/signup"
          }`,
          user
        );

        setToast({
          variant: "success",
          message:
            "Successfully signed-up!. Verify your Email to activate your account",
        });
        history.replace(`/activate-email?username=${data.username}`);
      } catch (error) {
        setToast({
          variant: "error",
          message: error.response
            ? error.response.data.message
            : "Apologies, Error occurred while trying to process your request. try again or contact us.",
        });
        dispatch({ type: SET_LOCAL_LOADING, payload: false });
        reject();
      } finally {
        dispatch({ type: SET_LOCAL_LOADING, payload: false });
      }
    });
  };

  const LocalSignin = (user) => {
    if (isCurrentlyTryingToAuthenticate()) return;

    dispatch({ type: SET_LOCAL_LOADING, payload: true });

    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await backendAPI.post(
          `${
            process.env.NODE_ENV === "production"
              ? `${process.env.REACT_APP_BACKEND}/v1/authenticate/local/signin`
              : "/authenticate/local/signin"
          }`,
          user
        );
        await isAuthorized();
        history.replace("/dashboard");
      } catch (error) {
        setToast({
          variant: "error",
          message: error.response
            ? error.response.data.message
            : "Apologies, Error occurred while trying to process your request. try again or contact us.",
          duration: 9000,
        });
        dispatch({ type: SET_LOCAL_LOADING, payload: false });
        reject();
      }
    });
  };

  const GoogleSignup = async (user) => {
    if (isCurrentlyTryingToAuthenticate()) return;

    dispatch({
      type: SET_GOOGLE_LOADING,
      payload: true,
    });
    window.open(
      `${
        process.env.NODE_ENV === "production"
          ? `${backendAPI.defaults.baseURL}/authenticate/google`
          : "http://localhost:6060/v1/authenticate/google"
      }`,
      "_self"
    );
  };

  const TwitchSignup = async (user) => {
    if (isCurrentlyTryingToAuthenticate()) return;

    dispatch({
      type: SET_TWITCH_LOADING,
      payload: true,
    });

    window.open(
      `${
        process.env.NODE_ENV === "production"
          ? `${backendAPI.defaults.baseURL}/authenticate/twitch`
          : "http://localhost:6060/v1/authenticate/twitch"
      }`,
      "_self"
    );
  };

  const signout = async () => {
    try {
      dispatch({
        type: SIGNOUT,
        payload: initialState,
      });
      await backendAPI.get("/authenticate/signout");
      history.replace("/");
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({
        type: SET_IS_AUTHENTICATING,
        payload: false,
      });
    }
  };

  const resetPassword = ({ email }) => {
    return new Promise(async (resolve, reject) => {
      try {
        await backendAPI.patch("/user/reset-password", { email });
        setToast({
          variant: "success",
          message:
            "Successfully reset account password. Check your Email and follow the instructions from there.",
          duration: 8000,
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
      }
    });
  };

  const passwordSuccessfullyChanged = (value) => {
    dispatch({
      type: SIGNOUT,
      payload: initialState,
    });
    return dispatch({
      type: SET_IS_AUTHENTICATING,
      payload: false,
    });
  };

  // helpers
  const isCurrentlyTryingToAuthenticate = () =>
    state.googleLoading || state.twitchLoading || state.localLoading;

  return (
    <AuthContext.Provider
      value={{
        isAuthenticating: state.isAuthenticating,
        id: state.id,
        username: state.username,
        displayName: state.displayName,
        authState: state.authState,
        loading: state.loading,
        googleLoading: state.googleLoading,
        twitchLoading: state.twitchLoading,
        localLoading: state.localLoading,
        email: state.email,
        GoogleSignup,
        TwitchSignup,
        LocalSignup,
        LocalSignin,
        signout,
        isAuthorized,
        resetPassword,
        passwordSuccessfullyChanged,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
