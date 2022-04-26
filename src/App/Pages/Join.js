import React, { useContext, useEffect } from "react";
import FastInput from "../../Components/forms/FastInput";
import Header from "../../Components/layouts/Header";
import Button from "../../Components/actions/Button";
import Hr from "../../Components/layouts/Hr";
import MobileBaseLayout from "../../Components/layouts/MobileBaseLayout";
import PrimaryCard from "../../Components/layouts/PrimaryCard";
import LoadingWithDots from "../../Components/layouts/LoadingWithDots";
import Tabs from "../../Components/layouts/Tabs";
import Google from "../../Images/Google";
import Twitch from "../../Images/Twitch";
import { useState } from "react";
import AuthContext from "../../Context/Auth/AuthContext";
import { useHistory } from "react-router";
import ToastContext from "../../Context/Toast/ToastContext";
import { useSearchParam } from "react-use";
import { useFormikContext } from "formik";
import InputPassword from "../../Components/forms/InputPassword";

const Join = () => {
  const error = useSearchParam("error");
  const message = useSearchParam("message");
  const [currentTab, setCurrentTab] = useState(0);
  const { setToast } = useContext(ToastContext);
  const {
    GoogleSignup,
    TwitchSignup,
    LocalSignup,
    LocalSignin,
    twitchLoading,
    googleLoading,
    localLoading,
  } = useContext(AuthContext);
  const formikCtx = useFormikContext();

  useEffect(() => {
    if (!parseInt(error)) return;

    setToast({
      variant: "error",
      message: message
        ? message
        : "Apologies, Error occurred while trying to authenticate.",
      duration: 9000,
    });
  }, []);

  return (
    <MobileBaseLayout header={<Header />}>
      <div className="text-whites-light flex flex-col pb-16 w-119 xl:w-122">
        <Tabs
          currentTab={currentTab}
          tabs={[
            {
              label: "Sign-in",
              component: (
                <Signin
                  setCurrentTab={setCurrentTab}
                  twitchLoading={twitchLoading}
                  googleLoading={googleLoading}
                  localLoading={localLoading}
                  formikCtx={formikCtx}
                  GoogleSignup={GoogleSignup}
                  TwitchSignup={TwitchSignup}
                  LocalSignin={LocalSignin}
                />
              ),
            },
            {
              label: "Sign-up",
              component: (
                <Signup
                  setCurrentTab={setCurrentTab}
                  twitchLoading={twitchLoading}
                  googleLoading={googleLoading}
                  localLoading={localLoading}
                  formikCtx={formikCtx}
                  GoogleSignup={GoogleSignup}
                  TwitchSignup={TwitchSignup}
                  LocalSignup={LocalSignup}
                />
              ),
            },
          ]}
        />
      </div>
    </MobileBaseLayout>
  );
};

export default Join;

const Signin = ({
  setCurrentTab,
  GoogleSignup,
  TwitchSignup,
  LocalSignin,
  formikCtx,
  twitchLoading,
  googleLoading,
  localLoading,
}) => {
  //

  const history = useHistory();

  // Handlers
  const handleSwitchTab = () => {
    setCurrentTab(1);
  };

  const handleLocalSignup = async () => {
    try {
      await LocalSignin({
        email: formikCtx.values.signin.email,
        password: formikCtx.values.signin.password,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleContinueWithGoogle = () => {
    GoogleSignup();
  };

  const handleContinueWithTwitch = () => {
    TwitchSignup();
  };

  const handleForgetPassword = () => {
    history.replace("/forget-password");
  };

  return (
    <PrimaryCard
      className="relative"
      variant="success"
      title="Sign-in"
      subtitle="Google, Twitch or Directly"
    >
      <div className="flex flex-col space-y-4 justify-center items-center pt-2.5">
        <div
          onClick={handleContinueWithGoogle}
          className="Google w-52 h-8 px-6 py-1 space-x-3 text-blacks-dark flex items-center justify-center rounded-md shadow-md bg-whites-light cursor-pointer hover:shadow-lg bg-opacity-95 hover:bg-opacity-100 xl:w-60 xl:py-1.5"
        >
          {googleLoading ? (
            <span className="text-xs font-medium flex justify-center items-center w-full">
              <LoadingWithDots
                flow="row"
                size="0.65rem"
                color="inherit"
                label="Authenticating"
              />
            </span>
          ) : (
            <>
              <Google width="18" height="18" />
              <div className="text-xs font-medium whitespace-nowrap">
                Continue with Google
              </div>
            </>
          )}
        </div>
        <div
          onClick={handleContinueWithTwitch}
          className="Twitch w-52 h-8 px-6 py-1 space-x-3 text-whites-light flex items-center justify-center rounded-md shadow-md cursor-pointer hover:shadow-lg bg-opacity-95 hover:bg-opacity-100  xl:w-60 xl:py-1.5"
          style={{
            backgroundColor: "#9147ff",
          }}
        >
          {twitchLoading ? (
            <span className="text-xs font-medium flex justify-center items-center w-full">
              <LoadingWithDots
                flow="row"
                size="0.65rem"
                color="inherit"
                label="Authenticating"
              />
            </span>
          ) : (
            <>
              <Twitch className="w-5 h-5" />
              <div className="text-xs font-medium whitespace-nowrap">
                Continue with Twitch
              </div>
            </>
          )}
        </div>
        <div className="text-xs w-3/6 py-3 text-whites-dark flex space-x-3 justify-center items-center">
          <Hr className="w-11/12 self-center text-whites-dark opacity-20" />
          <span className="whitespace-nowrap font-light opacity-80">OR</span>
          <Hr className="w-11/12 self-center text-whites-dark opacity-20" />
        </div>

        <form className="flex flex-col space-y-3.5 max-w-min">
          <FastInput
            name="signin.email"
            type="text"
            placeholder="Email@email.com"
            noLabel
            size="large"
            bg="bg-grays-light"
          />
          <InputPassword
            name="signin.password"
            type="password"
            placeholder="Password"
            noLabel
            size="large"
            bg="bg-grays-light"
            forget
            onForgetClick={handleForgetPassword}
          />
          <Button
            type="submit"
            onClick={handleLocalSignup}
            disabled={localLoading}
            className="text-xs py-1.5"
            text={
              localLoading ? (
                <LoadingWithDots
                  flow="row"
                  size="0.6rem"
                  color="inherit"
                  label="Signing in"
                />
              ) : (
                "Sign in"
              )
            }
            variant="success"
            icon={
              !localLoading && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )
            }
          />
        </form>
      </div>
      <div className="absolute top-full right-2 text-2xs self-end py-2 text-whites-dark">
        Don't have an account?{" "}
        <span
          className="font-medium underline text-info"
          onClick={handleSwitchTab}
        >
          Sign up here.
        </span>
      </div>
    </PrimaryCard>
  );
};

const Signup = ({
  setCurrentTab,
  GoogleSignup,
  formikCtx,
  TwitchSignup,
  LocalSignup,
  twitchLoading,
  googleLoading,
  localLoading,
}) => {
  const history = useHistory();

  // Handlers
  const handleSwitchTab = () => {
    setCurrentTab(0);
  };

  const handleLocalSignup = async () => {
    try {
      await LocalSignup({
        username: formikCtx.values.signup.username,
        email: formikCtx.values.signup.email,
        password: formikCtx.values.signup.password,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleContinueWithGoogle = () => {
    GoogleSignup();
  };

  const handleContinueWithTwitch = () => {
    TwitchSignup();
  };

  return (
    <PrimaryCard
      variant="error"
      className="relative"
      title="Sign-up"
      subtitle="Google, Twitch or Directly"
    >
      <div className="flex flex-col space-y-4 justify-center items-center pt-2.5">
        <div
          onClick={handleContinueWithGoogle}
          className="Google relative w-52 h-8 px-6 py-1 space-x-3 text-blacks-dark flex items-center justify-center rounded-md shadow-md bg-whites-light cursor-pointer hover:shadow-lg bg-opacity-95 hover:bg-opacity-100 xl:w-60 xl:py-1.5"
        >
          {googleLoading ? (
            <span className="text-xs font-medium flex justify-center items-center w-full">
              <LoadingWithDots
                flow="row"
                size="0.65rem"
                color="inherit"
                label="Authenticating"
              />
            </span>
          ) : (
            <>
              <Google width="18" height="18" />
              <div className="text-xs font-medium whitespace-nowrap">
                Continue with Google
              </div>
            </>
          )}
        </div>
        <div
          onClick={handleContinueWithTwitch}
          className={`Twitch w-52 h-8 px-6 py-1 space-x-3 text-whites-light flex items-center justify-center rounded-md shadow-md cursor-pointer hover:shadow-lg bg-opacity-95 hover:bg-opacity-100 xl:w-60 xl:py-1.5 ${
            twitchLoading && "pointer-events-none "
          }`}
          style={{
            backgroundColor: "#9147ff",
          }}
        >
          {twitchLoading ? (
            <span className="text-xs font-medium flex justify-center items-center w-full">
              <LoadingWithDots
                flow="row"
                size="0.65rem"
                color="inherit"
                label="Authenticating"
              />
            </span>
          ) : (
            <>
              <Twitch className="w-5 h-5" />
              <div className="text-xs font-medium whitespace-nowrap">
                Continue with Twitch
              </div>
            </>
          )}
        </div>

        <div className="text-xs w-3/6 py-3 text-whites-dark flex space-x-3 justify-center items-center">
          <Hr className="w-11/12 self-center text-whites-dark opacity-20" />
          <span className="whitespace-nowrap font-light opacity-80">OR</span>
          <Hr className="w-11/12 self-center text-whites-dark opacity-20" />
        </div>

        <form className="flex flex-col space-y-3.5 max-w-min">
          <FastInput
            name="signup.username"
            type="text"
            placeholder="Username"
            noLabel
            size="large"
            bg="bg-grays-light"
          />
          <FastInput
            name="signup.email"
            type="text"
            placeholder="Email@email.com"
            noLabel
            size="large"
            bg="bg-grays-light"
          />
          <InputPassword
            name="signup.password"
            type="password"
            placeholder="Password"
            noLabel
            size="large"
            bg="bg-grays-light"
          />
          <InputPassword
            name="signup.repeatPassword"
            type="password"
            placeholder="Confirm password"
            noLabel
            size="large"
            bg="bg-grays-light"
          />
          <Button
            type="submit"
            disabled={localLoading}
            onClick={handleLocalSignup}
            className="text-xs"
            text={
              localLoading ? (
                <LoadingWithDots
                  flow="row"
                  size="0.6rem"
                  color="inherit"
                  label="Signing up"
                />
              ) : (
                "Sign up"
              )
            }
            variant="error"
            icon={
              !localLoading && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )
            }
          />
        </form>
      </div>
      <div className="absolute top-full right-2 text-2xs self-end py-2 text-whites-dark">
        Already have an account?{" "}
        <span
          className="font-medium underline text-info"
          onClick={handleSwitchTab}
        >
          Sign in here.
        </span>
      </div>
    </PrimaryCard>
  );
};
