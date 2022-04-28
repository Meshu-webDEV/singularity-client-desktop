import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  Route,
  Switch,
  useHistory,
  useLocation,
  useRouteMatch,
} from "react-router";
import { Link, Redirect } from "react-router-dom";

// Components
import Header from "../../Components/layouts/Header";
import MobileBaseLayout from "../../Components/layouts/MobileBaseLayout";
import SecondaryCard from "../../Components/layouts/SecondaryCard";
import Button from "../../Components/actions/Button";
import FastInput from "../../Components/forms/FastInput";
import InputPassword from "../../Components/forms/InputPassword";
import InfoPopover from "../../Components/actions/InfoPopover";
import LoadingWithDots from "../../Components/layouts/LoadingWithDots";

// Animations
import FadeAnimation from "./../../Animations/FadeAnimation";

// Context
import ProfileContext from "../../Context/Profile/ProfileContext";
import ModalContext from "../../Context/Modal/ModalContext";
import FormikAccountContext from "../../Context/Formik/FormikAccountContext";
import { useFormikContext } from "formik";

// Other
import {
  blobToFile,
  dataURLtoFile,
  formatDate,
  getCroppedImg,
  readFile,
} from "../../lib/utils";
import { isEmpty } from "lodash";
import Hr from "../../Components/layouts/Hr";
import ToastContext from "../../Context/Toast/ToastContext";
import OrganizationContext from "../../Context/Organization/OrganizationContext";
import PrimaryCard from "../../Components/layouts/PrimaryCard";
import MarkdownInput from "../../Components/forms/MarkdownInput";
import Twitch from "../../Images/Twitch";
import Twitter from "../../Images/Twitter";
import Discord from "../../Images/Discord";
import FormikOrgContext from "../../Context/Formik/FormikOrgContext";
import OrganizationState from "../../Context/Organization/OrganizationState";
import AvatarInput from "../../Components/forms/AvatarInput";
import {
  ORG_APPLICATION_STATUS,
  USER_ORGANIZATION_STATUS,
} from "../../lib/constants";
import FormikPasswordContext from "../../Context/Formik/FormikPasswordContext";

const MyProfile = () => {
  //

  let match = useRouteMatch();

  const [hasSubmittedApplication, setSubmittedApplication] = useState(false);

  const {
    getProfile,
    editDisplayName,
    changePassword,
    profile,
    isLoading,
    shouldUpdate,
  } = useContext(ProfileContext);

  const { shouldUpdate: organizationShouldUpdate } =
    useContext(OrganizationContext);

  useEffect(() => {
    if (isEmpty(profile) || shouldUpdate || organizationShouldUpdate)
      getProfile();
  }, [shouldUpdate, profile]);

  return (
    <Switch>
      <Route path={`${match.path}/edit-account`}>
        <FormikAccountContext
          initial={false}
          values={{
            username: profile.username,
            email: profile.email,
            displayName: profile.displayName,
            altered: profile.altered,
          }}
        >
          <EditDisplayName profile={profile} editDisplay={editDisplayName} />
        </FormikAccountContext>
      </Route>
      <Route path={`${match.path}/change-password`}>
        <FormikPasswordContext>
          <ChangePassword profile={profile} changePassword={changePassword} />
        </FormikPasswordContext>
      </Route>
      <Route path={`${match.path}/setup-organization`}>
        <FormikOrgContext initial>
          <OrganizationState>
            <OrganizationSetup
              setSubmittedApplication={setSubmittedApplication}
            />
          </OrganizationState>
        </FormikOrgContext>
      </Route>
      <Route path="/">
        <RootProfile
          profile={profile}
          isLoading={isLoading}
          hasSubmittedApplication={hasSubmittedApplication}
          setSubmittedApplication={setSubmittedApplication}
        />
      </Route>
    </Switch>
  );
};

export default MyProfile;

const RootProfile = ({
  profile,
  isLoading,
  hasSubmittedApplication,
  setSubmittedApplication,
}) => {
  //

  // Destructure and memoize organization
  const organization = useMemo(() => {
    const { organization_data: organization } = profile;
    return organization;
  }, [profile]);

  return (
    <FadeAnimation fadeIn>
      <div className="flex flex-col space-y-5 w-full px-10">
        <div className="text-whites-light text-tiny font-bold pl-1">
          <div className="header text-sm text-whites-light font-bold p-3 -ml-2.5 flex space-x-3 items-center">
            <div className="w-4 h-4 rounded-sm bg-primary-light shadow-sm" />
            <span>My Profile</span>
          </div>
        </div>
        {isLoading ? (
          <div className="text-2xs h-full flex-grow text-whites-light pt-40">
            <LoadingWithDots size="0.7rem" label="Loading profile" />
          </div>
        ) : (
          <FadeAnimation fadeIn={!isLoading}>
            <div className="px-5 flex flex-col flex-shrink-0 flex-grow space-y-10">
              {/* Info */}
              <div className="flex flex-col space-y-5">
                {/* Username */}
                <div className="flex flex-col">
                  <div className="text-2xs italic font-light text-whites-dark">
                    Username
                  </div>
                  <div className="pl-1.5 leading-none text-sm text-whites-light">
                    {profile?.username ? profile.username : "-"}
                  </div>
                </div>
                {/* Email */}
                <div className="flex flex-col">
                  <div className="text-2xs italic font-light text-whites-dark">
                    Email
                  </div>
                  <div className="pl-1.5 leading-none text-sm text-whites-light">
                    {profile?.email ? profile.email : "-"}
                  </div>
                </div>
                {/* Display name */}
                <div className="flex flex-col">
                  <div className="flex items-center text-2xs italic font-light text-whites-dark">
                    <span>Display Name</span>
                    <div className="text-tiny">
                      <InfoPopover
                        info={
                          <span>
                            What others see. Must be the same as your username.{" "}
                            <br />- Can be separated with a single dash
                            <span className="font-sans"> ( - )</span>
                            <br />- Can be separated with a single space
                            <br />- Can be capitalized.
                          </span>
                        }
                      />
                    </div>
                  </div>
                  <div className="pl-1.5 leading-none text-sm text-whites-light">
                    {profile?.displayName ? profile.displayName : "-"}
                  </div>
                </div>
              </div>
              {/* Settings */}
              <div className="flex flex-col space-y-1.5">
                <div className="text-2xs font-light italic text-whites-dark">
                  Settings
                </div>
                <div className="flex flex-col space-y-2.5">
                  {/* Edit display name */}
                  <Link
                    to="/dashboard/my-profile/edit-account"
                    className="w-11/12 ml-1.5 border border-dark-backgroundDark border-opacity-75 rounded-md text-whites-light bg-dark-background shadow-md flex justify-between items-center px-2 py-1.5 space-x-4"
                  >
                    <div className="max-w-min rounded-md bg-info flex justify-center items-center p-1.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                        <path
                          fillRule="evenodd"
                          d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="min-w-min flex-grow text-xs">
                      Edit display name
                    </div>
                    <div className="text-2xs">
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
                    </div>
                  </Link>
                  {/* Set-up account as an organizer / Go to my org page */}
                  <OrganizationSettingButton
                    organization_status={profile.organization_status}
                    hasSubmittedApplication={hasSubmittedApplication}
                    setSubmittedApplication={setSubmittedApplication}
                    organization={profile.organization_data}
                  />

                  {/* Change my password */}
                  {profile.strategy === "local" && (
                    <Link
                      to="/dashboard/my-profile/change-password"
                      className="w-11/12 ml-1.5 border border-dark-backgroundDark border-opacity-75 rounded-md text-whites-light bg-dark-background shadow-md flex justify-between items-center px-2 py-1.5 space-x-4"
                    >
                      <div className="max-w-min rounded-md bg-primary-light flex justify-center items-center p-1.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="min-w-min flex-grow text-xs">
                        Change my password
                      </div>
                      <div className="text-2xs">
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
                      </div>
                    </Link>
                  )}

                  {/* Quick links */}
                  <div className="text-2xs pt-2 font-light italic text-whites-dark">
                    Quick Links
                  </div>
                  {/* My organizer page */}
                  <OrganizationPageLink profile={profile} />
                  {/* Create a new event */}
                  <Link
                    to="/dashboard/new-event"
                    className="w-11/12 ml-1.5 rounded-md text-whites-light bg-dark-background shadow-md flex justify-between items-center px-2 py-1.5 space-x-4"
                  >
                    <div className="max-w-min rounded-md bg-blacks-dark flex justify-center items-center p-1.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="min-w-min flex-grow text-xs">
                      Create a new event
                    </div>
                    <div className="text-2xs">
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
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </FadeAnimation>
        )}
      </div>
    </FadeAnimation>
  );
};

const EditDisplayName = ({ profile, editDisplay }) => {
  //

  const originalDisplayName = useMemo(() => profile.displayName, []);
  const history = useHistory();
  const { isSubmitting, setSubmitting, values, initialValues } =
    useFormikContext();
  const { setModal, offModal, setModalComponent, setModalProps } =
    useContext(ModalContext);

  // Handlers
  const handleUpdateInfo = async () => {
    try {
      // validate
      // check if values has not changed

      offModal();
      setSubmitting(true);
      await editDisplay(values.displayName.replace(/\s\s+/g, " "));
      setSubmitting(false);
      // Redirect back to my profile, context should indicate "shouldUpdate"
      history.replace("/dashboard/my-profile", { update: true });
    } catch (error) {
      setSubmitting(false);
    }
  };

  const handleEditClick = () => {
    if (originalDisplayName === values.displayName) return;

    setModalComponent(
      <div className="flex flex-col space-y-4 px-5 pb-6 pt-3 text-whites-light">
        <div className="text-sm text-whites-light">
          Are you sure you want to update your display name?
        </div>
        <div className="relative flex flex-col rounded-sm bg-dark-backgroundDark px-3 py-5">
          {/* From */}
          <div className="flex space-x-2 items-center pb-3">
            <div className="text-tiny font-semibold ">From</div>
            <Hr className="text-whites-dark opacity-20 w-10" />
          </div>
          <div className="flex flex-col space-y-2 pl-2 mb-4">
            <div className="flex flex-col">
              <div className="text-sm text-whites-light">
                {initialValues.displayName}
              </div>
            </div>
          </div>
          {/* To */}
          <div className="flex space-x-2 items-center py-3">
            <div className="text-tiny font-semibold ">To</div>
            <Hr className="text-whites-dark opacity-20 w-10" />
          </div>
          <div className="flex flex-col space-y-2 pl-2 mb-4">
            <div className="flex flex-col">
              <div className="text-sm text-whites-light">
                {values.displayName}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    setModalProps({
      title: "Confirm Updating",
      variant: "success",
      action: (
        <Button
          className="text-xs px-3.5 py-1.5"
          text="Confirm"
          onClick={handleUpdateInfo}
          variant="success"
        />
      ),
      secondary: (
        <div className="text-xs opacity-75 px-2">
          <Button text="Cancel" onClick={offModal} textOnly variant="light" />
        </div>
      ),
    });

    setModal("content");
  };

  // helpers
  const renderPrimaryButton = () => {
    if (isSubmitting)
      return (
        <Button
          disabled
          className="text-whites-light text-sm py-1.5"
          icon={null}
          variant="dark"
          text={
            <LoadingWithDots
              flow="row"
              label="Submitting"
              size="0.6rem"
              color="inherit"
            />
          }
        />
      );

    return (
      <Button
        onClick={handleEditClick}
        className="text-whites-light text-sm py-1.5 px-3.5"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 pb-0.5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
            <path
              fillRule="evenodd"
              d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
              clipRule="evenodd"
            />
          </svg>
        }
        variant="info"
        text="Update"
      />
    );
  };

  useEffect(() => {
    if (isEmpty(profile)) return history.replace("/dashboard/my-profile");
  }, []);

  return (
    <div className="w-full flex flex-col space-y-5 px-10">
      <div className="text-whites-light text-tiny font-bold pl-1">
        <div className="header text-sm text-whites-light font-bold p-3 -ml-2.5 flex space-x-3 items-center">
          <div className="w-4 h-4 rounded-sm bg-primary-light shadow-sm" />
          <span>Edit display name</span>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="text-2xs font-light text-whites-dark italic">
          Username
        </div>
        <div className="pl-2 text-whites-light text-xs tracking-tight">
          {profile.username}
        </div>
      </div>
      {/* display name */}
      <FastInput
        label="Display name"
        secondaryLabel={
          <span className="text-sm">
            <InfoPopover
              info={
                <span>
                  What others see. Must be the same as your username. <br />-
                  Can be separated with a single dash
                  <span className="font-sans"> ( - )</span>
                  <br />- Can be separated with a single space
                  <br />- Can be capitalized.
                </span>
              }
            />
          </span>
        }
        size="large"
        name="displayName"
      />
      <div className="self-end">{renderPrimaryButton()}</div>
    </div>
  );
};

const ChangePassword = ({ profile, changePassword }) => {
  //

  const history = useHistory();
  const { isSubmitting, setSubmitting, values, initialValues } =
    useFormikContext();

  // Handlers
  const handleChangePassword = async () => {
    try {
      setSubmitting(true);
      await changePassword(values);
      console.log("changePassword");
    } catch (error) {
      setSubmitting(false);
    }
  };

  // helpers
  const renderPrimaryButton = () => {
    if (isSubmitting)
      return (
        <Button
          disabled
          className="text-whites-light text-sm px-2.5 py-1"
          icon={null}
          variant="dark"
          text={
            <div className="py-0.5">
              <LoadingWithDots
                flow="row"
                label="Submitting"
                size="0.6rem"
                color="inherit"
              />
            </div>
          }
        />
      );

    return (
      <Button
        onClick={handleChangePassword}
        className="text-whites-light text-sm px-2.5 py-1"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 pb-0.5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
            <path
              fillRule="evenodd"
              d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
              clipRule="evenodd"
            />
          </svg>
        }
        variant="info"
        text="Change"
      />
    );
  };

  useEffect(() => {
    if (isEmpty(profile)) return history.replace("/dashboard/my-profile");
  }, []);

  if (profile.strategy === "provider")
    return <Redirect to="/dashboard/my-profile" />;

  return (
    <div className="relative w-full px-10 flex-grow flex flex-col space-y-8">
      <div className="text-whites-light text-tiny font-bold pl-1">
        <div className="header text-sm text-whites-light font-bold p-3 -ml-2.5 flex space-x-3 items-center">
          <div className="w-4 h-4 rounded-sm bg-primary-light shadow-sm" />
          <span>Change password</span>
        </div>
      </div>
      <div className="flex flex-col space-y-8">
        {/* Current password */}
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-1 text-whites-light">
            <div className="w-full flex items-center">
              <label className="pl-1 text-tiny capitalize">
                Current password
              </label>
            </div>
            <InputPassword
              label="Current password"
              noLabel={false}
              size="large"
              name="currentPassword"
            />
          </div>
          <div className="flex flex-col space-y-1 text-whites-light">
            <div className="w-full flex items-center">
              <label className="pl-1 text-tiny capitalize">New password</label>
            </div>

            <InputPassword
              label="New password"
              size="large"
              name="newPassword"
            />
          </div>
        </div>
        <div className="self-end">{renderPrimaryButton()}</div>
        <div className="absolute top-full text-whites-light text-2xs pt-1 left-1">
          <span className="opacity-90">Note: Changing the password will</span>
          <span className="font-medium"> sign you out!</span>.
        </div>
      </div>
    </div>
  );
};

const OrganizationSetup = ({ setSubmittedApplication }) => {
  //

  // State
  const [hasSelectedFile, setHasSelectedFile] = useState(false);
  const [pixelCrop, setPixelCrop] = useState({});

  // Context
  const history = useHistory();
  const { setToast } = useContext(ToastContext);
  const { submitApplication } = useContext(OrganizationContext);

  const {
    values,
    setFieldValue,
    setFieldTouched,
    isValid,
    isSubmitting,
    setSubmitting,
  } = useFormikContext();

  // Handlers
  const handleOnImageSelected = (file) => {
    setFieldValue("avatar", file);
  };

  const handleOnSubmit = async () => {
    if (isSubmitting) return;

    if (!isValid)
      return setToast({
        variant: "error",
        message:
          "Apologies, Unable to submit. Invalid values, Check the fields for any corresponding error",
      });

    setSubmitting(true);
    setSubmittedApplication(true);
    try {
      const imageAsFile = await readFile(values.avatar);
      const canvas = await getCroppedImg(imageAsFile, pixelCrop);
      const canvasDataUrl = canvas.toDataURL(
        values.avatar.type ? values.avatar.type : "image/jpeg"
      );
      const convertedUrlToFile = dataURLtoFile(
        canvasDataUrl,
        `${values.avatar.name ? values.avatar.name : "image.jpeg"}`
      );
      await submitApplication({
        ...values,
        avatar: convertedUrlToFile,
      });
      setToast({
        variant: "success",
        message: "Successfully submitted your organization application.",
      });
      history.replace("/dashboard/my-profile");
    } catch (error) {}
  };

  // Renderers
  const renderSubmitButton = () => {
    if (isSubmitting)
      return (
        <Button
          className="mt-6 py-1 px-4 text-sm"
          text={
            <LoadingWithDots
              label="Submitting"
              flow="row"
              size="0.7rem"
              color="inherit"
            />
          }
          variant="success"
          onClick={handleOnSubmit}
        />
      );

    return (
      <Button
        className="mt-6 py-1 px-4 text-sm"
        text="Submit"
        variant="success"
        onClick={handleOnSubmit}
      />
    );
  };

  useEffect(() => {
    return () => {
      if (isSubmitting) setSubmitting(false);
    };
  }, []);
  useEffect(() => {
    return () => {
      if (isSubmitting) setSubmitting(false);
    };
  }, []);

  return (
    <div className="relative w-full px-10 flex-grow flex flex-col space-y-8">
      <div className="text-whites-light text-tiny font-bold pl-1">
        <div className="header text-sm text-whites-light font-bold p-3 -ml-2.5 flex space-x-3 items-center">
          <div className="w-4 h-4 rounded-sm bg-primary-light shadow-sm" />
          <span>Organization setup</span>
        </div>
      </div>
      <PrimaryCard
        variant="success"
        title="Application"
        subtitle="Look professional & set it up now!"
        primaryAction={renderSubmitButton()}
      >
        <div className="flex flex-col space-y-6 pt-4 w-full">
          <FastInput name="name" label="Organization name *" size="large" />
          <MarkdownInput name="about" label="About *" maxChar={300} />
          <AvatarInput
            setPixelCrop={setPixelCrop}
            name="avatar"
            setHasSelectedFile={setHasSelectedFile}
            handleImageSelected={handleOnImageSelected}
          />
          <div
            className={`flex space-x-4 items-center px-3 pb-4 ${
              hasSelectedFile ? "pt-20" : "pt-4"
            }`}
          >
            <Hr className="text-primary-dark w-full" />
            <div className="whitespace-nowrap text-xs text-whites-dark opacity-80 font-light">
              Social media & links
            </div>
            <Hr className="text-primary-dark w-full" />
          </div>
          <FastInput
            name="website"
            label="Official website"
            secondaryLabel={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            }
            size="large"
          />
          <FastInput
            name="twitch"
            label="twitch"
            secondaryLabel={
              <div className="px-1">
                <Twitch className="w-3.5 h-3.5" height="10" width="10" />
              </div>
            }
            size="large"
          />
          <FastInput
            name="twitter"
            label="Twitter"
            secondaryLabel={
              <div className="px-1">
                <Twitter className="w-3.5 h-3.5" />
              </div>
            }
            size="large"
          />
          <FastInput
            name="discord"
            label="discord"
            secondaryLabel={
              <div className="px-1">
                <Discord className="w-3.5 h-3.5" />
              </div>
            }
            size="large"
          />
        </div>
      </PrimaryCard>
      <div className="pl-1 pt-1 absolute flex flex-col top-full text-3xs text-whites-dark opacity-80 italic font-medium">
        <span>- Fields marked with (*) are required.</span>
        <span>
          - Applications are manually reviewed & approved. might take up to 1
          day.
        </span>
      </div>
    </div>
  );
};

// Misc components
const OrganizationSettingButton = ({
  organization_status,
  organization,
  hasSubmittedApplication,
  setSubmittedApplication,
}) => {
  //

  const history = useHistory();

  // State
  const [isResetting, setIsResetting] = useState(false);

  // Context
  const { setModal, offModal, setModalComponent, setModalProps } =
    useContext(ModalContext);
  const { resetApplicationRejection, setShouldUpdate: setProfileShouldUpdate } =
    useContext(ProfileContext);
  const { setToast } = useContext(ToastContext);

  // Handlers
  const handleOnReasonClick = () => {
    setModalComponent(
      <div className="flex flex-col space-y-8 justify-center items-center text-whites-light pt-2 pb-8 px-2">
        <div className="text-xs">
          We are sorry to reject your application. Sincerely review the reason
          <span className="font-sans">/</span>s below..
        </div>
        <div className="px-2 border-l-2 leading-tight border-primary-light font-medium uppercase italic text-2xs self-start">
          {organization.rejection_reason
            ? organization.rejection_reason
            : "Unknown, please contact us."}
        </div>
        <Hr className="text-whites-light opacity-10 w-3/4 self-center" />
      </div>
    );

    setModalProps({
      title: "Application rejection reason",
      action: (
        <Button
          disabled={isResetting}
          className="text-xs"
          text="Submit again"
          variant="success"
          onClick={handleResetRejection}
        />
      ),
      secondary: (
        <Button
          className="text-2xs pr-4"
          text="Close"
          textOnly
          variant="none"
          onClick={offModal}
        />
      ),
    });

    setModal("full");
  };

  const handleResetRejection = async () => {
    try {
      setSubmittedApplication(false);
      setIsResetting(true);
      await resetApplicationRejection();
      setProfileShouldUpdate(true);
      history.replace("/dashboard/my-profile");
      return setToast({
        variant: "success",
        message:
          "Successfully reset the application status. You now can submit again.",
      });
    } catch (error) {
      offModal();
    }
  };

  useEffect(() => {
    return () => {
      if (isResetting) setIsResetting(false);
      if (!isResetting) offModal();
    };
  }, [isResetting]);

  if (
    organization_status === USER_ORGANIZATION_STATUS.PENDING ||
    hasSubmittedApplication
  )
    return (
      <div className="relative">
        <div className="absolute transform flex justify-center items-center rounded-sm px-2 py-4 inset-0 bg-blacks-dark z-50 bg-opacity-75 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="uppercase italic text-2xs text-whites-light">
            Pending review
          </div>
        </div>
        <div className="w-11/12 ml-1.5 border border-dark-backgroundDark border-opacity-75 rounded-md text-whites-light bg-dark-background shadow-md flex justify-between items-center px-2 py-1.5 space-x-4 opacity-70">
          <div className="max-w-min rounded-md bg-opacity-50 bg-secondary-light flex justify-center items-center p-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.504 1.132a1 1 0 01.992 0l1.75 1a1 1 0 11-.992 1.736L10 3.152l-1.254.716a1 1 0 11-.992-1.736l1.75-1zM5.618 4.504a1 1 0 01-.372 1.364L5.016 6l.23.132a1 1 0 11-.992 1.736L4 7.723V8a1 1 0 01-2 0V6a.996.996 0 01.52-.878l1.734-.99a1 1 0 011.364.372zm8.764 0a1 1 0 011.364-.372l1.733.99A1.002 1.002 0 0118 6v2a1 1 0 11-2 0v-.277l-.254.145a1 1 0 11-.992-1.736l.23-.132-.23-.132a1 1 0 01-.372-1.364zm-7 4a1 1 0 011.364-.372L10 8.848l1.254-.716a1 1 0 11.992 1.736L11 10.58V12a1 1 0 11-2 0v-1.42l-1.246-.712a1 1 0 01-.372-1.364zM3 11a1 1 0 011 1v1.42l1.246.712a1 1 0 11-.992 1.736l-1.75-1A1 1 0 012 14v-2a1 1 0 011-1zm14 0a1 1 0 011 1v2a1 1 0 01-.504.868l-1.75 1a1 1 0 11-.992-1.736L16 13.42V12a1 1 0 011-1zm-9.618 5.504a1 1 0 011.364-.372l.254.145V16a1 1 0 112 0v.277l.254-.145a1 1 0 11.992 1.736l-1.735.992a.995.995 0 01-1.022 0l-1.735-.992a1 1 0 01-.372-1.364z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="min-w-min flex-grow text-xs">
            <span>Edit organization info</span>
          </div>
          <div className="text-2xs">
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
          </div>
        </div>
      </div>
    );

  if (organization_status === USER_ORGANIZATION_STATUS.REJECTED)
    return (
      <div className="relative w-full">
        <div className="absolute min-w-min transform flex justify-center items-center rounded-sm px-2 py-4 inset-0 bg-blacks-dark z-50 bg-opacity-75 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="uppercase italic text-2xs text-whites-light whitespace-nowrap">
            Application rejected.{" "}
            <span
              className="text-primary-light underline font-medium"
              onClick={handleOnReasonClick}
            >
              Reason
            </span>
          </div>
        </div>
        <div className="w-11/12 ml-1.5 border border-dark-backgroundDark border-opacity-75 rounded-md text-whites-light bg-dark-background shadow-md flex justify-between items-center px-2 py-1.5 space-x-4 opacity-70">
          <div className="max-w-min rounded-md bg-opacity-50 bg-secondary-light flex justify-center items-center p-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.504 1.132a1 1 0 01.992 0l1.75 1a1 1 0 11-.992 1.736L10 3.152l-1.254.716a1 1 0 11-.992-1.736l1.75-1zM5.618 4.504a1 1 0 01-.372 1.364L5.016 6l.23.132a1 1 0 11-.992 1.736L4 7.723V8a1 1 0 01-2 0V6a.996.996 0 01.52-.878l1.734-.99a1 1 0 011.364.372zm8.764 0a1 1 0 011.364-.372l1.733.99A1.002 1.002 0 0118 6v2a1 1 0 11-2 0v-.277l-.254.145a1 1 0 11-.992-1.736l.23-.132-.23-.132a1 1 0 01-.372-1.364zm-7 4a1 1 0 011.364-.372L10 8.848l1.254-.716a1 1 0 11.992 1.736L11 10.58V12a1 1 0 11-2 0v-1.42l-1.246-.712a1 1 0 01-.372-1.364zM3 11a1 1 0 011 1v1.42l1.246.712a1 1 0 11-.992 1.736l-1.75-1A1 1 0 012 14v-2a1 1 0 011-1zm14 0a1 1 0 011 1v2a1 1 0 01-.504.868l-1.75 1a1 1 0 11-.992-1.736L16 13.42V12a1 1 0 011-1zm-9.618 5.504a1 1 0 011.364-.372l.254.145V16a1 1 0 112 0v.277l.254-.145a1 1 0 11.992 1.736l-1.735.992a.995.995 0 01-1.022 0l-1.735-.992a1 1 0 01-.372-1.364z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="min-w-min flex-grow text-xs">
            <span>Go my organization page</span>
          </div>
          <div className="text-2xs">
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
          </div>
        </div>
      </div>
    );

  if (organization_status === USER_ORGANIZATION_STATUS.APPROVED) return null;

  return (
    <Link
      className="w-11/12 ml-1.5 border border-dark-backgroundDark border-opacity-75 rounded-md text-whites-light bg-dark-background shadow-md flex justify-between items-center px-2 py-1.5 space-x-4"
      to="/dashboard/my-profile/setup-organization"
    >
      <div className="max-w-min rounded-md bg-secondary-light flex justify-center items-center p-1.5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.504 1.132a1 1 0 01.992 0l1.75 1a1 1 0 11-.992 1.736L10 3.152l-1.254.716a1 1 0 11-.992-1.736l1.75-1zM5.618 4.504a1 1 0 01-.372 1.364L5.016 6l.23.132a1 1 0 11-.992 1.736L4 7.723V8a1 1 0 01-2 0V6a.996.996 0 01.52-.878l1.734-.99a1 1 0 011.364.372zm8.764 0a1 1 0 011.364-.372l1.733.99A1.002 1.002 0 0118 6v2a1 1 0 11-2 0v-.277l-.254.145a1 1 0 11-.992-1.736l.23-.132-.23-.132a1 1 0 01-.372-1.364zm-7 4a1 1 0 011.364-.372L10 8.848l1.254-.716a1 1 0 11.992 1.736L11 10.58V12a1 1 0 11-2 0v-1.42l-1.246-.712a1 1 0 01-.372-1.364zM3 11a1 1 0 011 1v1.42l1.246.712a1 1 0 11-.992 1.736l-1.75-1A1 1 0 012 14v-2a1 1 0 011-1zm14 0a1 1 0 011 1v2a1 1 0 01-.504.868l-1.75 1a1 1 0 11-.992-1.736L16 13.42V12a1 1 0 011-1zm-9.618 5.504a1 1 0 011.364-.372l.254.145V16a1 1 0 112 0v.277l.254-.145a1 1 0 11.992 1.736l-1.735.992a.995.995 0 01-1.022 0l-1.735-.992a1 1 0 01-.372-1.364z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="min-w-min flex-grow text-xs">
        <span>Setup my organization page</span>
        <span className="text-3xs text-whites-dark px-1 font-sans tracking-wide opacity-70">
          (optional)
        </span>
      </div>
      <div className="text-2xs">
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
      </div>
    </Link>
  );
};

const OrganizationPageLink = ({ profile }) => {
  if (profile?.organization_status === USER_ORGANIZATION_STATUS.APPROVED)
    return (
      <Link
        to={`/dashboard/my-organization`}
        className="w-11/12 ml-1.5 rounded-md text-whites-light bg-dark-background shadow-md flex justify-between items-center px-2 py-1.5 space-x-4"
      >
        <div className="max-w-min rounded-md bg-blacks-dark flex justify-center items-center p-1.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.504 1.132a1 1 0 01.992 0l1.75 1a1 1 0 11-.992 1.736L10 3.152l-1.254.716a1 1 0 11-.992-1.736l1.75-1zM5.618 4.504a1 1 0 01-.372 1.364L5.016 6l.23.132a1 1 0 11-.992 1.736L4 7.723V8a1 1 0 01-2 0V6a.996.996 0 01.52-.878l1.734-.99a1 1 0 011.364.372zm8.764 0a1 1 0 011.364-.372l1.733.99A1.002 1.002 0 0118 6v2a1 1 0 11-2 0v-.277l-.254.145a1 1 0 11-.992-1.736l.23-.132-.23-.132a1 1 0 01-.372-1.364zm-7 4a1 1 0 011.364-.372L10 8.848l1.254-.716a1 1 0 11.992 1.736L11 10.58V12a1 1 0 11-2 0v-1.42l-1.246-.712a1 1 0 01-.372-1.364zM3 11a1 1 0 011 1v1.42l1.246.712a1 1 0 11-.992 1.736l-1.75-1A1 1 0 012 14v-2a1 1 0 011-1zm14 0a1 1 0 011 1v2a1 1 0 01-.504.868l-1.75 1a1 1 0 11-.992-1.736L16 13.42V12a1 1 0 011-1zm-9.618 5.504a1 1 0 011.364-.372l.254.145V16a1 1 0 112 0v.277l.254-.145a1 1 0 11.992 1.736l-1.735.992a.995.995 0 01-1.022 0l-1.735-.992a1 1 0 01-.372-1.364z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="min-w-min flex-grow text-xs">My organization page</div>
        <div className="text-2xs">
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
        </div>
      </Link>
    );

  if (
    profile?.organization_status === USER_ORGANIZATION_STATUS.PENDING ||
    profile?.organization_status === USER_ORGANIZATION_STATUS.REJECTED ||
    profile?.organization_status === USER_ORGANIZATION_STATUS.DEFAULT
  )
    return (
      <div className="bg-opacity-70 w-11/12 ml-1.5 rounded-md text-whites-light bg-dark-background shadow-md flex justify-between items-center px-2 py-1.5 space-x-4">
        <div className="opacity-75 max-w-min rounded-md bg-blacks-dark flex justify-center items-center p-1.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.504 1.132a1 1 0 01.992 0l1.75 1a1 1 0 11-.992 1.736L10 3.152l-1.254.716a1 1 0 11-.992-1.736l1.75-1zM5.618 4.504a1 1 0 01-.372 1.364L5.016 6l.23.132a1 1 0 11-.992 1.736L4 7.723V8a1 1 0 01-2 0V6a.996.996 0 01.52-.878l1.734-.99a1 1 0 011.364.372zm8.764 0a1 1 0 011.364-.372l1.733.99A1.002 1.002 0 0118 6v2a1 1 0 11-2 0v-.277l-.254.145a1 1 0 11-.992-1.736l.23-.132-.23-.132a1 1 0 01-.372-1.364zm-7 4a1 1 0 011.364-.372L10 8.848l1.254-.716a1 1 0 11.992 1.736L11 10.58V12a1 1 0 11-2 0v-1.42l-1.246-.712a1 1 0 01-.372-1.364zM3 11a1 1 0 011 1v1.42l1.246.712a1 1 0 11-.992 1.736l-1.75-1A1 1 0 012 14v-2a1 1 0 011-1zm14 0a1 1 0 011 1v2a1 1 0 01-.504.868l-1.75 1a1 1 0 11-.992-1.736L16 13.42V12a1 1 0 011-1zm-9.618 5.504a1 1 0 011.364-.372l.254.145V16a1 1 0 112 0v.277l.254-.145a1 1 0 11.992 1.736l-1.735.992a.995.995 0 01-1.022 0l-1.735-.992a1 1 0 01-.372-1.364z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="opacity-40 min-w-min flex-grow text-xs">
          My organization page
        </div>
        <div className="opacity-40 text-2xs">
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
        </div>
      </div>
    );
};
