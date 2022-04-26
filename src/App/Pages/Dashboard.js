import React, { useState, useContext, useEffect } from "react";
import { Switch, Route, useRouteMatch, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

// Components
import DashboardGridLayout from "../../Components/layouts/DashboardGridLayout";
import EventCard from "../../Components/layouts/EventCard";
import Header from "../../Components/layouts/Header";

// MUI
import { CircularProgress } from "@material-ui/core";
import LinkIcon from "@material-ui/icons/Link";

// GSAP
import { Tween } from "react-gsap";

// Context
import AuthContext from "../../Context/Auth/AuthContext";
import DashboardContext from "../../Context/Dashboard/DashboardContext";
import FormikEventContext from "../../Context/Formik/FormikEventContext";
import IntegrationsState from "../../Context/Integrations/IntegrationsState";

// State
import TeamsState from "../../Context/Teams/TeamsState";
import NewEventState from "../../Context/New-event/NewEventState";
import EventsState from "../../Context/Events/EventsState";

// Sub-pages
import NewEvent from "./NewEvent";
import NewEventPreview from "./NewEventPreview";
import NewEventStatus from "./NewEventStatus";
import MyIntegrations from "./MyIntegrations";

// Utils
import sortArray from "sort-array";
import { isEmpty } from "lodash";
import MyTemplates from "./MyTemplates";
import TemplatesState from "../../Context/Templates/TemplatesState";
import MyEvents from "./MyEvents";
import MyEventsState from "../../Context/My-Events/MyEventsState";
import MyProfile from "./MyProfile";
import ProfileState from "../../Context/Profile/ProfileState";
import MyOrganization from "./MyOrganization";
import OrganizationState from "../../Context/Organization/OrganizationState";
import FormikEventsFilterContext from "../../Context/Formik/FormikEventsFilterContext";
import FormikTemplatesFilterContext from "../../Context/Formik/FormikTemplatesFilterContext";
import Hr from "../../Components/layouts/Hr";
import ButtonLink from "../../Components/actions/ButtonLink";
import TemplatesContext from "../../Context/Templates/TemplatesContext";
import ProfileContext from "../../Context/Profile/ProfileContext";
import { formatDate } from "../../lib/utils";
import TemplateCard from "../../Components/layouts/TemplateCard";
import LoadingWithDots from "../../Components/layouts/LoadingWithDots";
import FadeAnimation from "../../Animations/FadeAnimation";
import BreadcrumbsContext from "../../Context/Breadcrumbs/BreadcrumbsContext";
import ConfirmationModal from "../../Components/actions/ConfirmationModal";
import ModalContext from "../../Context/Modal/ModalContext";

const Dashboard = () => {
  //

  let match = useRouteMatch();

  const {
    getProfile,
    profile,
    shouldUpdate: profileShouldUpdate,
  } = useContext(ProfileContext);
  const { stack } = useContext(BreadcrumbsContext);
  const { signout } = useContext(AuthContext);
  const { setModal, offModal, setModalComponent, setModalProps } =
    useContext(ModalContext);

  const getLinkTo = (page, index, array) => {
    return `/${array.slice(0, index + 1).join("/")}`;
  };

  const handleSignOut = () => {
    setModalComponent(
      <ConfirmationModal
        description={`Are you sure you want to sign out?`}
        confirmVariant="error"
        confirm={signout}
        cancel={offModal}
      />
    );
    setModalProps({
      title: `sign out`,
      variant: "error",
      actions: null,
      secondary: null,
    });
    setModal("content");
  };

  useEffect(() => {
    if (isEmpty(profile) || profileShouldUpdate) getProfile();
  }, [profileShouldUpdate, profile]);

  return (
    <DashboardGridLayout header={<Header />}>
      <nav className="vertical-nav bg-dark-backgroundDark col-start-1 col-span-2 h-screen shadow-sm">
        <div className="flex-wrapper h-full flex flex-col justify-between items-center py-5">
          <Link
            to="/dashboard"
            className="header text-sm text-whites-light font-bold p-3 -ml-2.5 flex space-x-3 items-center"
          >
            <div className="w-4 h-4 rounded-sm bg-dark-backgroundDarker bg-opacity-50 shadow-sm" />
            <span>Dashboard</span>
          </Link>
          <div className="main-nav w-full flex flex-col space-y-1">
            <Link
              to="/dashboard/my-events"
              className="my-events bg-dark-backgroundDarker bg-opacity-50 hover:bg-dark-background hover:bg-opacity-40 hover:shadow-md hover:underline font-light text-xs w-full py-4 flex justify-start pl-4 items-center text-whites-light"
            >
              My events
            </Link>
            <Link
              to="/dashboard/my-organization"
              className="my-organization bg-dark-backgroundDarker bg-opacity-50 hover:bg-dark-background hover:bg-opacity-40 hover:underline hover:shadow-md font-light text-xs w-full py-4 flex justify-start pl-4 items-center text-whites-light"
            >
              My organization
            </Link>
            <Link
              to="/dashboard/my-templates"
              className="my-templates bg-dark-backgroundDarker bg-opacity-50 hover:bg-dark-background hover:bg-opacity-40 hover:underline hover:shadow-md font-light text-xs w-full py-4 flex justify-start pl-4 items-center text-whites-light"
            >
              My templates
            </Link>
            <Link
              to="/dashboard/my-integrations"
              className="my-integrations bg-dark-backgroundDarker bg-opacity-50 hover:bg-dark-background hover:bg-opacity-40 hover:underline hover:shadow-md font-light text-xs w-full py-4 flex justify-start pl-4 items-center text-whites-light"
            >
              My integrations
            </Link>
          </div>
          <div className="special-nav w-full flex flex-col space-y-1">
            <Link
              to="/explore"
              className="explore-events bg-primary-dark bg-opacity-70 hover:bg-primary-light hover:bg-opacity-90 filter hover:shadow-md font-medium hover:underline text-xs w-full py-4 flex justify-start pl-4 items-center text-whites-light"
            >
              Explore events
            </Link>
            <Link
              to="/dashboard/new-event"
              className="new-event bg-primary-dark bg-opacity-70 hover:bg-primary-light hover:bg-opacity-90 filter hover:shadow-md font-medium hover:underline text-xs w-full py-4 flex justify-start pl-4 items-center text-whites-light"
            >
              New event
            </Link>
          </div>
          <a
            href="mailto:contact@singularity.events"
            className="contact w-full text-xs text-whites-dark flex justify-center items-center space-x-3 py-2 filter transform hover:bg-dark-background hover:bg-opacity-40 hover:shadow-md"
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </span>
            <span>contact us</span>
          </a>
        </div>
      </nav>
      <div className="content-wrapper-relative min-h-screen relative flex flex-col flex-grow mx-8 col-start-3 col-span-9 bg-dark-backgroundDark shadow-sm">
        <section className="content-wrapper flex-grow w-full h-full py-5 flex flex-col space-y-16 justify-start items-center">
          <TeamsState>
            <NewEventState>
              <FormikEventContext initial>
                <Switch>
                  <Route exact path={`${match.path}/new-event/preview`}>
                    <FadeAnimation fadeIn>
                      <NewEventPreview />
                    </FadeAnimation>
                  </Route>
                  <Route exact path={`${match.path}/new-event/status`}>
                    <FadeAnimation fadeIn>
                      <NewEventStatus />
                    </FadeAnimation>
                  </Route>
                  <Route exact path={`${match.path}/new-event`}>
                    <FadeAnimation fadeIn>
                      <NewEvent />
                    </FadeAnimation>
                  </Route>
                </Switch>
              </FormikEventContext>
              <Switch>
                <Route path={`${match.path}/my-events`}>
                  <FadeAnimation fadeIn>
                    <FormikEventsFilterContext>
                      <MyEventsState>
                        <MyEvents />
                      </MyEventsState>
                    </FormikEventsFilterContext>
                  </FadeAnimation>
                </Route>
                <Route path={`${match.path}/my-profile`}>
                  <FadeAnimation fadeIn>
                    <ProfileState>
                      <OrganizationState>
                        <MyProfile />
                      </OrganizationState>
                    </ProfileState>
                  </FadeAnimation>
                </Route>
                <Route path={`${match.path}/my-templates`}>
                  <FadeAnimation fadeIn>
                    <FormikTemplatesFilterContext>
                      <TemplatesState>
                        <MyTemplates />
                      </TemplatesState>
                    </FormikTemplatesFilterContext>
                  </FadeAnimation>
                </Route>
                <Route path={`${match.path}/my-integrations`}>
                  <FadeAnimation fadeIn>
                    <IntegrationsState>
                      <MyIntegrations />
                    </IntegrationsState>
                  </FadeAnimation>
                </Route>
                <Route path={`${match.path}/my-organization`}>
                  <FadeAnimation fadeIn>
                    <OrganizationState>
                      <MyOrganization />
                    </OrganizationState>
                  </FadeAnimation>
                </Route>
                <Route exact path="/dashboard">
                  <FadeAnimation fadeIn>
                    <DashboardView />
                  </FadeAnimation>
                </Route>
              </Switch>
            </NewEventState>
          </TeamsState>
        </section>
        <div className="breadcrumbs absolute left-1 bottom-full flex items-center justify-center space-x-1 text-whites-dark text-sm tracking-wider font-sans py-1 ">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 pb-0.5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <div className="flex justify-center items-center">
            {stack
              .filter((s) => s !== "")
              .map((page, index, array) => (
                <React.Fragment key={page}>
                  <Link
                    key={page}
                    to={getLinkTo(page, index, array)}
                    className={`cursor-pointer hover:opacity-100 ${
                      index + 1 === array.length
                        ? "text-whites-light"
                        : "text-whites-dark opacity-75"
                    }`}
                  >
                    {page}
                  </Link>
                  {array.length - 1 === index ? (
                    ""
                  ) : (
                    <div
                      className="h-0.5 rounded-full bg-whites-light opacity-25 transform px-2 mx-1"
                      style={{ transform: "rotate(-60deg)" }}
                    />
                  )}
                </React.Fragment>
              ))}
          </div>
        </div>
      </div>
      <section className="side-menu col-start-12 col-span-1 bg-dark-backgroundDark h-screen flex flex-col justify-between items-center py-5 shadow-sm">
        <div className="user p-1 text-whites-light flex flex-col space-y-6">
          <Link
            to="/dashboard/my-profile"
            className="w-10 h-10 flex justify-center items-center rounded-full bg-grays-light hover:shadow-md transform hover:scale-105"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
          </Link>

          <div
            onClick={handleSignOut}
            className="w-10 h-10 flex justify-center cursor-pointer rounded-full pl-1.5 text-primary-light bg-primary-dark bg-opacity-10 items-center hover:shadow-md transform hover:scale-105"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        <div className="stats flex flex-col space-y-6 p-1 w-full justify-around items-center">
          <div className="items-center flex flex-col text-whites-light">
            <span className="text-xs font-medium">
              {profile?.events ? profile.events : "-"}
            </span>
            <span className="text-4xs opacity-70">Events</span>
          </div>
          <div className="items-center flex flex-col text-whites-light">
            <span className="text-xs font-medium">
              {profile?.templates ? profile.templates : "-"}
            </span>
            <span className="text-4xs opacity-70">Templates</span>
          </div>
          <div className="items-center flex flex-col text-whites-light">
            <span className="text-xs font-medium">
              {profile?.webhooks ? profile.webhooks : "-"}
            </span>
            <span className="text-4xs opacity-70">Webhooks</span>
          </div>
          <div className="items-center flex flex-col text-whites-light">
            <span className="text-2xs tracking-tighter font-medium font-sans">
              {profile?.createdAt ? formatDate(profile.createdAt, false) : "-"}
            </span>
            <span className="text-4xs opacity-70">Joined</span>
          </div>
        </div>
      </section>
    </DashboardGridLayout>
  );
};

const DashboardView = () => {
  //

  const location = useLocation();

  // Context
  const { username, displayName } = useContext(AuthContext);

  const {
    getDashboardData,
    recentEvents,
    topTemplates,
    isLoading,
    shouldUpdate,
  } = useContext(DashboardContext);

  const renderRecentGames = () => {
    if (isEmpty(recentEvents)) return <EventCard placeholder />;

    sortArray(recentEvents, {
      by: "status",
    });

    return recentEvents.map((event) => (
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

  const renderTemplates = () => {
    if (isEmpty(topTemplates))
      return (
        <div className="w-full self-center">
          <div className="px-4 py-4 space-y-1 flex items-start flex-col flex-shrink-0">
            <div className="flex flex-col space-y-1 items-center text-whites-dark p-5 rounded-sm text-2xs whitespace-nowrap">
              <span className="opacity-70">You don't have any templates</span>
              <span className="opacity-70">
                Start by creating your first template{" "}
                <Link
                  to="/dashboard/my-templates/new"
                  className="font-medium text-success"
                >
                  here
                </Link>
              </span>
            </div>
          </div>
        </div>
      );

    return topTemplates.map((template, i) => (
      <TemplateCard
        view="my-templates"
        template={template}
        key={`${i}-${template.name}`}
      />
    ));
  };

  useEffect(() => {
    // prettier-ignore
    if (isEmpty(recentEvents) || isEmpty(topTemplates) || shouldUpdate) getDashboardData();
    return;
  }, [location.pathname]);

  return (
    <FadeAnimation fadeIn>
      <section className="dashboard-view py-5 flex flex-col space-y-16 justify-start items-center mx-8 bg-dark-backgroundDark h-full shadow-sm w-full">
        <div className="header bg-dark-backgroundDarker bg-opacity-20 w-full py-4 px-6 text-whites-light flex justify-between items-center">
          <div className="username flex-shrink-0 flex flex-col -space-y-1 justify-center items-end">
            <span className="italic font-light text-whites-dark text-sm opacity-90">
              Username
            </span>
            <span className="font-medium text-xs pr-1">{username}</span>
          </div>
          <div className="display-name flex-shrink-0 flex flex-col -space-y-1 justify-center items-end">
            <span className="italic font-light text-whites-dark text-sm opacity-90">
              Display name
            </span>
            <span className="font-medium text-xs pr-1">{displayName}</span>
          </div>
          <div className="line">
            <Hr className="w-30 opacity-10" />
          </div>
          <div className="settings-button flex-shrink-0">
            <ButtonLink
              href="/dashboard/my-profile"
              text="Settings"
              className="px-15 text-tiny py-1 uppercase"
              variant="light"
            />
          </div>
        </div>
        <div className="content flex flex-col space-y-10 w-full">
          <div className="recent-events px-6 text-whites-light flex flex-col space-y-2 w-full items-start justify-center">
            <div className="title text-tiny font-medium flex w-full justify-between items-center">
              <span>My recent events</span>
              <Link
                to="/dashboard/my-events"
                className="view-more-templates flex items-center justify-center text-3xs text-whites-dark"
              >
                <span>View more</span>
                <span>
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
                </span>
              </Link>
            </div>
            <div className="events-cards w-full flex space-x-8 items-center overflow-x-scroll pb-4">
              {isLoading ? (
                <LoadingWithDots
                  color="primary"
                  label="loading events"
                  flow="col"
                  size="0.75rem"
                  className="text-3xs text-whites-dark"
                />
              ) : (
                renderRecentGames()
              )}
            </div>
          </div>
          <div className="my-templates px-6 text-whites-light flex flex-col space-y-2 w-full items-start justify-center">
            <div className="title text-tiny font-medium flex w-full justify-between items-center">
              <span>
                My top used templates
                <span className="font-light text-4xs text-whites-dark pl-1">
                  quickly create a new event
                </span>
              </span>
              <Link
                to="/dashboard/my-templates"
                className="view-more-templates flex items-center justify-center text-3xs text-whites-dark"
              >
                <span>View more</span>
                <span>
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
                </span>
              </Link>
            </div>
            <div className="templates-cards w-full">
              {isLoading ? (
                <LoadingWithDots
                  color="primary"
                  label="loading templates"
                  flow="col"
                  size="0.75rem"
                  className="text-3xs text-whites-dark self-center"
                />
              ) : (
                <div className="flex space-x-8 items-center overflow-x-scroll pb-4 w-full">
                  {renderTemplates()}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </FadeAnimation>
  );
};

export default Dashboard;
