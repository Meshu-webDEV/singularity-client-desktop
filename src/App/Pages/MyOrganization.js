import React, { useContext, useEffect } from "react";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
  useRouteMatch,
} from "react-router";
import { Link } from "react-router-dom";
import { useSessionStorage } from "react-use";

// Components
import Header from "../../Components/layouts/Header";
import MobileBaseLayout from "../../Components/layouts/MobileBaseLayout";
import SecondaryCard from "../../Components/layouts/SecondaryCard";
import Button from "../../Components/actions/Button";
import MarkdownInput from "../../Components/forms/MarkdownInput";
import LoadingWithDots from "../../Components/layouts/LoadingWithDots";
import EventCard from "../../Components/layouts/EventCard";
import PopoverWrapper from "../../Components/actions/PopoverWrapper";
import CopyToClipboard from "../../Components/actions/CopyToClipboard";
import Hr from "../../Components/layouts/Hr";

// Animations
import FadeAnimation from "../../Animations/FadeAnimation";

// Context
import OrganizationContext from "../../Context/Organization/OrganizationContext";
import MarkdownDisplay from "../../Components/layouts/MarkdownDisplay";
import DashboardContext from "../../Context/Dashboard/DashboardContext";
import { Formik, useFormikContext } from "formik";

// images
import Twitch from "../../Images/Twitch";
import Discord from "../../Images/Discord";
import Twitter from "../../Images/Twitter";

// Other
import { USER_ORGANIZATION_STATUS } from "../../lib/constants";
import { organizationAboutSchema } from "../../lib/validation";
import { isEmpty } from "lodash";
import * as Yup from "yup";
import sortArray from "sort-array";
import ButtonLink from "../../Components/actions/ButtonLink";

const MyOrganization = () => {
  //
  let match = useRouteMatch();
  let location = useLocation();

  const {
    getMyOrganization,
    status,
    organization,
    isLoading,
    shouldUpdate,
    resetOrganization,
  } = useContext(OrganizationContext);

  const {
    getRecentEvents,
    recentEvents,
    isLoading: isRecentEventsLoading,
  } = useContext(DashboardContext);

  useEffect(() => {
    if (!isEmpty(organization)) return;

    getMyOrganization();
  }, []);

  useEffect(() => {
    if (shouldUpdate) getMyOrganization();
  }, [shouldUpdate]);

  return (
    <Switch>
      <Route path={`${match.path}/edit-bio`}>
        <Formik
          initialValues={{ about: organization?.about }}
          validationSchema={Yup.object({
            about: organizationAboutSchema,
          })}
          enableReinitialize
        >
          <EditBio />
        </Formik>
      </Route>
      <Route path="/">
        {isLoading ? (
          <LoadingOrganization />
        ) : !organization || status === USER_ORGANIZATION_STATUS.REJECTED ? (
          <OrganizationPlaceholder status={status} rejection={organization} />
        ) : (
          <RootOrganization
            organization={organization}
            status={status}
            recentEvents={recentEvents}
          />
        )}
      </Route>
    </Switch>
  );
};

export default MyOrganization;

const RootOrganization = ({ organization, status, recentEvents }) => {
  //

  // Renderers
  const renderRecentEvents = () => {
    if (isEmpty(organization.recent_events))
      return (
        <div className="text-2xs italic uppercase text-whites-dark w-full flex-grow py-10 justify-center items-center text-center">
          No recent events..
        </div>
      );

    sortArray(organization.recent_events, {
      by: "status",
    });

    return organization.recent_events.map((event) => (
      <EventCard
        key={event.uniqueid}
        uniqueid={event.uniqueid}
        datetime={event.datetime}
        name={event.name}
        rounds={event.rounds}
        currentRound={event.currentRound}
        status={event.status}
        hasPrizepool={event.hasPrizepool}
        prizepool={event.prizepool}
        prizepoolCurrency={event.prizepoolCurrency}
        isPublic={event.isPublic}
      />
    ));
  };

  return (
    <FadeAnimation fadeIn>
      <div className="w-full flex flex-col flex-grow text-whites-light items-center space-y-14">
        {/* Banner */}
        <div className="banner w-full h-24 bg-dark-backgroundDarker bg-opacity-40 rounded-b-md -mt-5">
          <div className="relative w-full h-full z-40">
            <div className="absolute z-10 w-full px-12 top-full -translate-y-11 rounded-md flex items-start space-x-4 transform left-1/2 -translate-x-1/2">
              <div className="flex justify-center items-center w-20 h-20 rounded-full flex-shrink-0 relative bg-grays-light shadow-md">
                <img
                  className="inline w-6/7 h-6/7 object-cover rounded-full"
                  src={organization.avatar}
                  alt="Organization logo"
                />
              </div>

              <div className="w-full flex-grow flex flex-col space-y-4 items-stretch">
                <div className="flex flex-grow items-center pt-2.5 space-x-4 text-whites-light ">
                  <PopoverWrapper info={organization.name}>
                    {organization.name}
                  </PopoverWrapper>
                  <Hr className="w-full text-whites-dark opacity-20 mt-0.5" />
                </div>
                <div className="flex flex-col justify-end items-end text-2xs text-whites-light self-end">
                  <CopyToClipboard
                    text={`${window.location.origin}/organization/${organization.uniqueid}`}
                  >
                    <Button
                      className="text-2xs"
                      textOnly
                      text="Copy your org. URL"
                      variant="dark"
                      icon={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3.5 w-3.5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
                          <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
                        </svg>
                      }
                    />
                  </CopyToClipboard>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Organization content */}
        <div className="content-wrapper flex flex-col space-y-6 w-full flex-grow px-10">
          {/* Bio */}
          <div className="bio flex flex-col space-y-2 xl:w-95 xl:self-end 2xl:w-11/12 3xl:w-6/7 4xl:w-4/5">
            {/* About */}
            <div className="flex w-full flex-col space-y-0.5">
              <div className="relative text-xs w-full p-2 z-40 rounded-lg bg-dark-backgroundDarker text-whites-dark">
                <MarkdownDisplay
                  value={organization.about}
                  dense
                  className="h-36 whitespace-normal"
                />
                <Link
                  to="/dashboard/my-organization/edit-bio"
                  className="absolute right-2 bottom-2 opacity-80"
                >
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
                </Link>
              </div>
            </div>
            {/* Socials */}
            <div className="flex justify-between max-w-min space-x-3 px-4 self-end">
              {organization?.website && (
                <a
                  href={organization.website}
                  target="_blank"
                  rel="noopener"
                  className="w-7 h-7 2xl:w-8 2xl:h-8 bg-dark-backgroundDarker text-whites-light bg-opacity-75 shadow-md rounded-full p-1.5 hover:shadow-lg hover:brightness-150 hover:text-whites-light filter"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-full w-full"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                </a>
              )}
              {organization?.twitter && (
                <a
                  href={organization.twitter}
                  target="_blank"
                  rel="noopener"
                  className="w-7 h-7 2xl:w-8 2xl:h-8 bg-dark-backgroundDarker text-whites-light bg-opacity-75 shadow-md rounded-full p-1.5 hover:shadow-lg hover:brightness-150 hover:text-whites-light filter"
                >
                  <Twitter className="w-full h-full" />
                </a>
              )}
              {organization?.twitch && (
                <a
                  href={organization.twitch}
                  target="_blank"
                  rel="noopener"
                  className="w-7 h-7 2xl:w-8 2xl:h-8 bg-dark-backgroundDarker text-whites-light bg-opacity-75 shadow-md rounded-full p-1.5 hover:shadow-lg hover:brightness-150 hover:text-whites-light filter"
                >
                  <Twitch className="w-full h-full" />
                </a>
              )}
              {organization?.discord && (
                <a
                  href={organization.discord}
                  target="_blank"
                  rel="noopener"
                  className="w-7 h-7 2xl:w-8 2xl:h-8 bg-dark-backgroundDarker text-whites-light bg-opacity-75 shadow-md rounded-full p-1.5 hover:shadow-lg hover:brightness-150 hover:text-whites-light filter"
                >
                  <Discord className="w-full h-full" />
                </a>
              )}
            </div>
          </div>
          {/* Recent events */}
          <div className="flex flex-col w-full">
            <Hr className="text-whites-dark my-2 opacity-5 w-3/5 self-center" />
            <div className="flex flex-col space-y-4">
              <div className="text-whites-light font-light text-xs pl-1">
                Recent events
              </div>
              <div className="w-full flex flex-col -space-y-2">
                <div className="flex space-x-4 flex-nowrap flex-shrink-0 px-0.5 pb-2 w-auto overflow-x-scroll">
                  {renderRecentEvents()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FadeAnimation>
  );
};

const LoadingOrganization = () => {
  return (
    <FadeAnimation fadeIn>
      <div className="w-full flex flex-col flex-grow text-whites-light items-center justify-center text-2xs">
        <LoadingWithDots size="1.2rem" className="-mt-28" color="primary" />
      </div>
    </FadeAnimation>
  );
};

const OrganizationPlaceholder = ({ status, rejection }) => {
  return (
    <FadeAnimation fadeIn>
      <div className="flex flex-col space-y-14 flex-grow w-full text-whites-light items-center px-6">
        <div className="z-40 bg-blacks-light filter brightness-105 text-xs mt-16 w-11/12 py-8 rounded-md shadow-xl flex justify-center ">
          {status === USER_ORGANIZATION_STATUS.DEFAULT && (
            <div className="font-light w-full flex flex-col space-y-10 justify-center items-center px-6">
              <div className="text-base uppercase font-medium tracking-wide flex justify-center items-center space-x-2">
                <X />
                <div>Profile not available.</div>
              </div>

              <div className="flex flex-col space-y-8 justify-center items-center self-start">
                <div className="self-start text-whites-dark">
                  <span className="font-bold text-sm self-start text-whites-light">
                    Status:
                  </span>{" "}
                  <span className="text-whites-dark">Not set</span>. Setup your
                  organization{" "}
                  <Link
                    to="/dashboard/my-profile/setup-organization"
                    className="text-success font-bold"
                  >
                    Here
                  </Link>
                </div>
                <Hr className="text-whites-dark opacity-5 w-3/5 my-2 self-start ml-4" />
                {/* Explaining what is an org page */}
                <div className="">
                  <div className="font-bold pb-2 text-sm">
                    Why setup an organization?
                  </div>
                  <div className="p-1 flex text-sm flex-col space-y-4">
                    <p className="flex space-x-2 justify-center items-center self-start">
                      <span className="flex-shrink-0">
                        <Check />
                      </span>
                      <span className="flex-grow-0">Professional look</span>
                    </p>
                    <p className="flex space-x-2 justify-center items-center self-start">
                      <span className="flex-shrink-0">
                        <Check />
                      </span>

                      <span className="flex-grow-0">
                        All your events in one place.
                      </span>
                    </p>
                    <p className="flex space-x-2 justify-center items-center self-start">
                      <span className="flex-shrink-0">
                        <Check />
                      </span>
                      <span className="flex-grow-0">
                        Ability to have a unique logo or avatar
                      </span>
                    </p>
                    <p className="flex space-x-2 justify-center items-center self-start">
                      <span className="flex-shrink-0">
                        <Check />
                      </span>
                      <span className="flex-grow-0">
                        Link your website or social medias
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <ButtonLink
                href="/dashboard/my-profile/setup-organization"
                variant="success"
                text="Setup here"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                }
                className="px-3 py-1 text-tiny self-end"
              />
            </div>
          )}
          {status === USER_ORGANIZATION_STATUS.PENDING && (
            <div className="font-light w-full flex flex-col space-y-10 justify-center items-center">
              <div className="text-base uppercase font-medium tracking-wide flex justify-center items-center space-x-2">
                <X />
                <div>Profile not available yet.</div>
              </div>

              <div className="flex flex-col space-y-8 justify-center items-center self-start">
                <div className="self-start px-4 text-whites-dark">
                  <span className="font-bold text-sm self-start text-whites-light">
                    Status:
                  </span>{" "}
                  Pending review...
                </div>
                <Hr className="text-whites-dark opacity-5 w-3/5 my-2 self-start ml-4" />
                {/* Explaining what is an org page */}
                <div className="px-4">
                  <div className="font-bold pb-2 text-sm">
                    Why setup an organization?
                  </div>
                  <div className="p-1 flex text-sm flex-col space-y-4">
                    <p className="flex space-x-2 justify-center items-center self-start">
                      <span className="flex-shrink-0">
                        <Check />
                      </span>
                      <span className="flex-grow-0">Professional look</span>
                    </p>
                    <p className="flex space-x-2 justify-center items-center self-start">
                      <span className="flex-shrink-0">
                        <Check />
                      </span>

                      <span className="flex-grow-0">
                        All your events in one place.
                      </span>
                    </p>
                    <p className="flex space-x-2 justify-center items-center self-start">
                      <span className="flex-shrink-0">
                        <Check />
                      </span>
                      <span className="flex-grow-0">
                        Ability to have a unique logo or avatar
                      </span>
                    </p>
                    <p className="flex space-x-2 justify-center items-center self-start">
                      <span className="flex-shrink-0">
                        <Check />
                      </span>
                      <span className="flex-grow-0">
                        Link your website or social medias
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {status === USER_ORGANIZATION_STATUS.REJECTED && (
            <div className="h-3/4 font-light flex flex-col justify-center items-center">
              <div className="text-sm uppercase py-4 font-medium tracking-wide flex justify-center items-center space-x-2">
                <div className="w-1.5 h-3 bg-primary-dark"></div>
                <div>Profile not available.</div>
              </div>
              <Hr className="text-whites-dark opacity-10 w-9/12 my-2" />
              <div className="self-start my-2">
                <div className="italic pl-1 self-start text-whites-dark">
                  Status:
                </div>
                <div>
                  <span className="font-normal uppercase">
                    Application{" "}
                    <span className="text-primary-light">Rejected</span>
                  </span>
                </div>
              </div>
              <div className="my-2">
                <div className="italic pl-1 self-start text-whites-dark">
                  Reason:
                </div>
                <div className="bg-blacks-dark w-52 rounded-md shadow-md py-1 px-2">
                  <div className="font-normal uppercase">{rejection}</div>
                </div>
              </div>
              <div className="my-2">
                <div className="italic pl-1 self-start text-whites-dark">
                  Re-submit an application{" "}
                  <Link
                    to="/dashboard/my-profile/setup-organization"
                    className="text-success font-bold"
                  >
                    Here
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </FadeAnimation>
  );
};

const EditBio = () => {
  const { values, isValid, isSubmitting, setSubmitting } = useFormikContext();
  const history = useHistory();
  const { organization, editOrgBio } = useContext(OrganizationContext);

  // Handlers
  const handleEditBio = async () => {
    try {
      if (!isValid) return;

      setSubmitting(true);
      await editOrgBio(values.about);
      history.replace("/dashboard/my-organization");
      // setToast success
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    return () => setSubmitting(false);
  }, []);

  if (isEmpty(organization))
    return <Redirect to="/dashboard/my-organization" />;

  return (
    <FadeAnimation fadeIn>
      <div className="flex flex-col space-y-8 w-full h-full px-10 text-whites-light">
        <div className="text-whites-light text-tiny font-bold pl-1">
          <div className="header text-sm text-whites-light font-bold p-3 -ml-2.5 flex space-x-3 items-center">
            <div className="w-4 h-4 rounded-sm bg-primary-light shadow-sm" />
            <span>Edit bio</span>
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <MarkdownInput
            name="about"
            label=""
            bg="bg-dark-background"
            maxChar={300}
          />
          <div className="w-full self-center flex justify-center">
            <Hr className="bg-whites-light w-95 my-6 opacity-10" />
          </div>
          <div className="flex space-x-4 justify-center items-center self-end">
            <Button
              text="Discard"
              textOnly
              className="text-whites-dark text-2xs"
              onClick={() => history.goBack()}
            />
            <Button
              text={
                isSubmitting ? (
                  <LoadingWithDots
                    label="Submitting"
                    flow="row"
                    size="0.65rem"
                    color="inherit"
                  />
                ) : (
                  "Edit"
                )
              }
              variant="success"
              onClick={handleEditBio}
              className="text-sm px-2.5 py-1"
              icon={
                !isSubmitting ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : null
              }
            />
          </div>
        </div>
      </div>
    </FadeAnimation>
  );
};

const Check = () => {
  return (
    <div className="w-6 h-6 rounded-full flex justify-center items-center bg-secondary-light bg-opacity-10 shadow-md text-whites-light">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 text-success"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
};

const X = () => {
  return (
    <div className="w-6 h-6 rounded-full flex justify-center items-center bg-primary-light bg-opacity-10 shadow-md text-whites-light">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 text-primary-light"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
};
