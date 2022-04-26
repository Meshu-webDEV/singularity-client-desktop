import React, { useContext, useEffect, useState } from "react";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router";
import { Link } from "react-router-dom";

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

// Other
import {
  EXPLORE_LOAD_TYPES,
  USER_ORGANIZATION_STATUS,
} from "../../lib/constants";
import { organizationAboutSchema } from "../../lib/validation";
import { isEmpty } from "lodash";
import * as Yup from "yup";
import sortArray from "sort-array";

// images
import Twitch from "../../Images/Twitch";
import Discord from "../../Images/Discord";
import Twitter from "../../Images/Twitter";
import EventsContext from "../../Context/Events/EventsContext";
import EventsState from "../../Context/Events/EventsState";
import ToastContext from "../../Context/Toast/ToastContext";
import ButtonLink from "../../Components/actions/ButtonLink";
import GridLayout from "../../Components/layouts/GridLayout";

const Organization = () => {
  //
  let history = useHistory();
  let match = useRouteMatch();
  let { uniqueid } = useParams();

  const {
    getMyOrganization,
    getOrganizationByUniqueid,
    status,
    organization,
    resetOrganization,
    isLoading,
  } = useContext(OrganizationContext);

  useEffect(() => {
    if (!isEmpty(organization)) return;
    if (isEmpty(uniqueid)) return history.replace("/404");

    getOrganizationByUniqueid(uniqueid);

    // // Clear organization state in context
    // return () => resetOrganization();
  }, []);

  return (
    <GridLayout header={<Header />}>
      <Switch>
        <Route path={`${match.path}/events`}>
          <EventsState>
            <OrganizationEvents passed_organization={organization} />
          </EventsState>
        </Route>
        <Route path="/">
          {isLoading ? (
            <LoadingOrganization />
          ) : !organization ||
            organization?.status !== USER_ORGANIZATION_STATUS.APPROVED ? (
            <OrganizationPlaceholder />
          ) : (
            <RootOrganization organization={organization} match={match} />
          )}
        </Route>
      </Switch>
    </GridLayout>
  );
};

export default Organization;

const RootOrganization = ({ organization, match }) => {
  //

  const history = useHistory();

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
      <div className="relative w-full">
        <div className="flex flex-col flex-grow text-whites-light items-center space-y-14">
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
                </div>
              </div>
              {/* Socials */}
              <div className="flex justify-between max-w-min space-x-3 px-4 self-end">
                {organization?.website && (
                  <a
                    href={organization.website}
                    rel="noopener"
                    target="_blank"
                    className="w-7 h-7 2xl:w-8 2xl:h-8 text-whites-dark bg-opacity-75 bg-dark-backgroundDarker shadow-md rounded-full p-1.5 hover:shadow-lg hover:brightness-150 hover:text-whites-light filter"
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
                    href={organization.website}
                    rel="noopener"
                    target="_blank"
                    className="w-7 h-7 2xl:w-8 2xl:h-8 text-whites-dark bg-opacity-75 bg-dark-backgroundDarker shadow-md rounded-full p-1.5 hover:shadow-lg hover:brightness-150 hover:text-whites-light filter"
                  >
                    <Twitter className="w-full h-full" />
                  </a>
                )}
                {organization?.twitch && (
                  <a
                    href={organization.twitch}
                    rel="noopener"
                    target="_blank"
                    className="w-7 h-7 2xl:w-8 2xl:h-8 text-whites-dark bg-opacity-75 bg-dark-backgroundDarker shadow-md rounded-full p-1.5 hover:shadow-lg hover:brightness-150 hover:text-whites-light filter"
                  >
                    <Twitch className="w-full h-full" />
                  </a>
                )}
                {organization?.discord && (
                  <a
                    href={organization.discord}
                    rel="noopener"
                    target="_blank"
                    className="w-7 h-7 2xl:w-8 2xl:h-8 text-whites-dark bg-opacity-75 bg-dark-backgroundDarker shadow-md rounded-full p-1.5 hover:shadow-lg hover:brightness-150 hover:text-whites-light filter"
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
            {/* View more */}
            <Link
              to={`${match.url}/events`}
              className="w-full border border-dark-backgroundDark border-opacity-75 rounded-md text-whites-light bg-dark-background shadow-md flex justify-between items-center px-2 py-1.5 space-x-4 hover:shadow-lg hover:brightness-125 hover:text-whites-light filter"
            >
              <div className="max-w-min rounded-md bg-blacks-dark flex justify-center items-center p-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                </svg>
              </div>
              <div className="min-w-min flex-grow text-xs">
                View more events
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
  );
};

const OrganizationEvents = ({ passed_organization }) => {
  //

  const match = useRouteMatch();
  const history = useHistory();
  let { uniqueid } = useParams();

  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [fetch_configs, setFetchConfigs] = useState({
    type: EXPLORE_LOAD_TYPES.INITIAL,
    filters: {
      term: "",
      gte: null,
      lte: null,
      status: null,
    },
  });

  const { setToast } = useContext(ToastContext);
  const {
    initialLoadOrganizerEvents,
    loadMoreEvents,
    loadMoreOrganizerEvents,
    events,
    isLoading: eventsIsLoading,
    pagination,
  } = useContext(EventsContext);

  const {
    getMyOrganization,
    getOrganizationByUniqueid,
    status,
    organization,
    resetOrganization,
    isLoading: organizationIsLoading,
  } = useContext(OrganizationContext);

  // Handlers
  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    setHasLoadedOnce(true);
    await loadMoreOrganizerEvents(fetch_configs, organization.owner._id);
    setIsLoadingMore(false);
  };

  // Renderers
  const renderEvents = () => {
    if (!events.length)
      return (
        <span className="text-2xs py-4 text-whites-dark font-light italic">
          No events found...
        </span>
      );

    return events.map((e, i) => (
      <EventCard key={i} view="explore" rounded="md" {...e} />
    ));
  };

  useEffect(() => {
    if (isEmpty(uniqueid)) return history.replace("/404");
  }, []);

  useEffect(() => {
    if (events.length) return;
    if (isEmpty(organization)) return;

    initialLoadOrganizerEvents(organization.owner._id);
  }, [organization]);

  return (
    <div className="relative flex flex-grow flex-col w-full text-2xs space-y-3 justify-center items-center text-whites-light px-6">
      {/* Back */}
      <div
        onClick={() => history.goBack()}
        className="absolute cursor-pointer hover:text-whites-light bottom-full left-0 flex space-x-2 justify-center items-center text-whites-light text-sm transform -translate-y-1/2"
      >
        <div className="w-7 h-7 2xl:w-8 2xl:h-8 bg-dark-backgroundDarker rounded-full shadow-md flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <span className="text-whites-dark hover:text-current">
          Back to organization
        </span>
      </div>
      <div className="text-whites-light text-tiny font-bold pl-1 self-start">
        <div className="header text-sm text-whites-light font-bold p-3 -ml-2.5 flex space-x-3 items-center xl:text-base">
          <Link
            to={`/organization/${organization.uniqueid}`}
            className="flex justify-center items-center w-8 h-8 rounded-full flex-shrink-0 relative bg-grays-light shadow-md 2xl:w-10 2xl:h-10"
          >
            <img
              className="inline w-6/7 h-6/7 object-cover rounded-full"
              src={organization.avatar}
              alt="Organization logo"
            />
          </Link>
          <Link to={`/organization/${organization.uniqueid}`}>
            {organization.name} - Events
          </Link>
        </div>
      </div>

      {organizationIsLoading || eventsIsLoading ? (
        <LoadingWithDots
          label="Loading events"
          size="1.25rem"
          color="primary"
        />
      ) : (
        <div className="flex flex-grow flex-col w-full space-y-4 justify-start items-center">
          <div className="flex flex-grow flex-col w-full space-y-3 justify-start items-center text-whites-light">
            {renderEvents()}
          </div>
          {/* Load-more / Pagination */}
          <div className="flex flex-col space-y-1 items-center text-xs text-whites-light">
            {pagination.hasMore && !eventsIsLoading ? (
              <>
                <Button
                  disabled={isLoadingMore}
                  onClick={handleLoadMore}
                  variant="light"
                  icon={
                    isLoadingMore ? null : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )
                  }
                  text={
                    isLoadingMore ? (
                      <LoadingWithDots
                        label="Loading"
                        flow="row"
                        size="0.6rem"
                        color="inherit"
                      />
                    ) : (
                      "Load more"
                    )
                  }
                />
                <span className="text-2xs font-light text-whites-dark tracking-tight">
                  {pagination.remaining} remaining
                </span>
              </>
            ) : (
              !isLoadingMore &&
              !eventsIsLoading &&
              hasLoadedOnce && (
                <span className="text-2xs tracking-wide font-light pt-4 pb-3 text-whites-dark opacity-50 italic">
                  got nothing more ..👀
                </span>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const LoadingOrganization = () => {
  return (
    <div className="w-full h-screen flex flex-col flex-grow text-whites-light items-center justify-center text-2xs">
      <LoadingWithDots size="1.2rem" className="-mt-28" color="primary" />
    </div>
  );
};

const OrganizationPlaceholder = () => {
  return (
    <MobileBaseLayout
      header={<Header searchVariant="dark" />}
      title="Organization profile"
      backLabel="Dashboard"
      backPath="/dashboard"
    >
      <div className="flex flex-col flex-grow text-whites-light items-center">
        <div className="absolute inset-0 w-full h-2/7 bg-dark-backgroundDarker rounded-b-lg">
          <div className="relative w-full h-full z-40">
            {/* Header */}
            <div className="absolute z-10 w-6/7 px-2 top-full -translate-y-11 rounded-md flex items-start justify-center transform left-1/2 -translate-x-1/2">
              {/* prettier-ignore */}
              <div style={{width: '81px', height: '81px'}} className='flex flex-col rounded-full flex-shrink-0 relative bg-blacks-lighter shadow-md'
              >
                <div className='absolute transform flex justify-center items-center top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'>

                </div>
              </div>
              <div className="mt-4">
                <div className="w-60 ml-3 whitespace-nowrap overflow-hidden overflow-ellipsis uppercase font-semibold text-sm"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-64 w-full opacity-0 sticky z-10">.</div>
        <div className="text-xs font-light tracking-wide text-whites-dark"></div>
        <div className="absolute z-40 bg-blacks-light bg-opacity-90 text-xs h-2/4 mt-10 w-11/12 rounded-md shadow-xl flex justify-center">
          <div className="h-3/4 font-light flex flex-col justify-center items-center">
            <div className="text-sm uppercase py-4 font-medium tracking-wide flex justify-center items-center space-x-1">
              <div className="w-1.5 h-3 bg-primary-dark"></div>
              <div>Profile not found.</div>
            </div>
            <Hr className="text-whites-dark opacity-10 w-9/12 my-2" />
          </div>
        </div>
      </div>
    </MobileBaseLayout>
  );
};
