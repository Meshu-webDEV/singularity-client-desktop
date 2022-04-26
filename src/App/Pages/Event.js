import { useContext, useEffect, useMemo, useState } from "react";
import {
  useHistory,
  useParams,
  useRouteMatch,
  useLocation,
  Link,
} from "react-router-dom";

// Components
import MobileBaseLayout from "../../Components/layouts/MobileBaseLayout";
import Header from "../../Components/layouts/Header";
import LiveIndicator from "../../Components/layouts/LiveIndicator";
import EventToolbar from "../../Components/layouts/EventToolbar";
import TinySquare from "../../Components/layouts/TinySquare";
import MarkdownDisplay from "../../Components/layouts/MarkdownDisplay";
import RoundsTable from "../../Components/layouts/RoundsTable";
import CopyToClipboard from "../../Components/actions/CopyToClipboard";
import Button from "../../Components/actions/Button";
import Hr from "../../Components/layouts/Hr";
import StandingsTable from "../../Components/layouts/StandingsTable";

// MUI
import Fade from "@material-ui/core/Fade";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  makeStyles,
  Tab,
  Tabs,
  ThemeProvider,
} from "@material-ui/core";

// Context
import EventContext from "../../Context/Event/EventContext";
import ModalContext from "../../Context/Modal/ModalContext";

// Other
import { formatDate, fromDate } from "../../lib/utils";
import { subTabsTheme, tabsTheme } from "../../lib/muiThemes";
import isEmpty from "lodash/isEmpty";
import { toWords } from "number-to-words/numberToWords";
import TransitionalLoading from "./TransitionalLoading";
import SwipeableViews from "react-swipeable-views";
import { sortBy } from "lodash";
import GridLayout from "../../Components/layouts/GridLayout";

// MUI Styling
const useStylesSummary = makeStyles(() => ({
  root: {
    backgroundColor: "#1E242B",
    padding: "none",
    color: "white",
  },
}));
const useStylesDetails = makeStyles(() => ({
  root: {
    backgroundColor: "#21282f",
    color: "white",
    padding: "16px 8px",
  },
}));

const Event = () => {
  const { id } = useParams();
  const location = useLocation();

  // Context
  const { setModal, offModal, setModalComponent } = useContext(ModalContext);
  const { getEventById, isLoading, event, shouldUpdate } =
    useContext(EventContext);

  const lobbyCode = useMemo(() => {
    return new URLSearchParams(location.search).get("code") || false;
  }, [location.search]);

  useEffect(() => {
    const getEvent = async () => {
      await getEventById(id, lobbyCode);
    };
    if (shouldUpdate) return getEvent();

    if (isEmpty(event)) return getEvent();

    if (id !== event.uniqueid) getEvent();
  }, [id, shouldUpdate]);

  if (isLoading || isEmpty(event) || id !== event.uniqueid)
    return <TransitionalLoading text="Loading" />;

  if (event.isOwner)
    return (
      <GridLayout header={<Header />}>
        <OrganizerView
          event={event}
          setModal={setModal}
          offModal={offModal}
          setModalComponent={setModalComponent}
        />
      </GridLayout>
    );

  return (
    <GridLayout header={<Header />}>
      <UserView
        event={event}
        setModal={setModal}
        offModal={offModal}
        setModalComponent={setModalComponent}
      />
    </GridLayout>
  );
};

export default Event;

// Sub components

const OrganizerView = ({ event }) => {
  //
  const history = useHistory();
  const match = useRouteMatch();

  // MUI classes
  const classes = useStylesSummary();
  const classesDetails = useStylesDetails();

  // State
  const [accordionsState, setAccordionsState] = useState([true, true]);

  const [tab, setTab] = useState(0);

  // Handlers
  const handleSwitchTab = (e, tab) => {
    setTab(tab);
  };

  const handleAccordionState = ({ currentTarget: { attributes } }) => {
    setAccordionsState((state) => {
      return state.map((state, index) => {
        if (index === parseInt(attributes["index"].value)) return !state;
        return state;
      });
    });
  };

  // Helpers
  const isLive = (status) => parseInt(status) === 0;
  const isCurrentRound = (round) => parseInt(round) === event.currentRound;
  const isPassedRound = (round) => parseInt(round) < event.currentRound;
  const a11yProps = (index) => {
    return {
      key: index,
      id: `scrollable-force-tab-${index}`,
      "aria-controls": `scrollable-force-tabpanel-${index}`,
    };
  };

  return (
    <div className="event-organizer w-full h-full flex flex-col relative space-y-8 px-6 text-whites-light">
      <div className="text-whites-light text-tiny font-bold pl-1">
        <div className="header text-sm text-whites-light font-bold p-3 -ml-2.5 flex space-x-3 items-center xl:text-base">
          <div className="w-4 h-4 rounded-sm bg-primary-light shadow-sm" />
          <span>{event.name}</span>
        </div>
      </div>

      {/* Back */}
      <div
        onClick={() => history.goBack()}
        className="absolute cursor-pointer hover:text-whites-light bottom-full left-0 flex space-x-2 justify-center items-center text-whites-light text-sm transform -translate-y-1/2"
      >
        <div className="w-7 h-7 bg-dark-backgroundDarker rounded-full shadow-md flex justify-center items-center">
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
          Back to events
        </span>
      </div>

      <div className="h-1/1.1 w-full flex flex-col space-y-4 shadow-lg border-blacks-dark">
        {/* Pre-Toolbar */}
        <div className="flex items-center justify-between -my-1">
          {/* Datetime / status */}
          <div className="flex text-whites-light justify-start text-2xs opacity-90 font-sans">
            {event.status === 0 && (
              <div className="flex items-center space-x-4">
                <LiveIndicator
                  className="text-success"
                  indicatorColor={"bg-success"}
                />
                <span className="text-2xs text-whites-light">
                  Current round{" "}
                  <span className="font-semibold">
                    {event.currentRound + 1}
                  </span>
                </span>
              </div>
            )}
            {event.status === 1 &&
              `${formatDate(event.datetime)} - ${fromDate(event.datetime)}`}
            {event.status === 2 &&
              `${formatDate(event.datetime)} - completed ${fromDate(
                event.datetime
              )}`}
          </div>
          {/* Share */}
          <div className="flex flex-col items-end space-y-1 text-whites-dark font-light">
            <div className="cursor-pointer hover:text-whites-light">
              <CopyToClipboard
                text={`${window.location.origin}/${event.uniqueid}`}
                acknowledgment="Event link copied!"
              >
                <div className="flex p space-x-0.5 items-center text-2xs">
                  <span className="opacity-80 shadow-md w-max flex-grow-0 flex space-x-1 justify-center items-center">
                    <span>Share</span>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-2.5 w-2.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                      </svg>
                    </span>
                  </span>
                </div>
              </CopyToClipboard>
            </div>
            <div className="cursor-pointer hover:text-whites-light">
              <CopyToClipboard
                text={`${window.location.origin}/${event.uniqueid}?code=${event.lobbyCode}`}
                acknowledgment="Event link with lobby-code copied!"
              >
                <div className="flex p space-x-2 items-center text-2xs">
                  <span className="opacity-80 shadow-md w-max flex-grow-0 flex space-x-1 justify-center items-center">
                    <span>
                      Share w<span className="font-sans">/</span>lobby-code
                    </span>

                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-2.5 w-2.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                      </svg>
                    </span>
                  </span>
                </div>
              </CopyToClipboard>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <Accordion
          TransitionProps={{ unmountOnExit: true }}
          key={0}
          expanded={accordionsState[0]}
        >
          <AccordionSummary
            index={0}
            className={classes.root}
            onClick={handleAccordionState}
            expandIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="#fff"
              >
                <path
                  fillRule="evenodd"
                  d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
            }
            aria-controls="initial-info-content"
            id="initial-info-header"
          >
            <div className="text-sm flex flex-nowrap flex-grow-0 justify-between px-2 w-full">
              <div className="self-start text-sm">
                <div className="h-full flex justify-center items-center text-whites-light opacity-90">
                  <TinySquare
                    size="medium"
                    className="bg-dark-backgroundDark"
                  />
                  <span>toolbar</span>
                </div>
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails className={classesDetails.root}>
            <EventToolbar event={event} />
          </AccordionDetails>
        </Accordion>

        {/* Description */}
        <Accordion
          TransitionProps={{ unmountOnExit: true, timeout: 300 }}
          key={1}
          expanded={accordionsState[1]}
        >
          <AccordionSummary
            index={1}
            className={classes.root}
            onClick={handleAccordionState}
            expandIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="#fff"
              >
                <path
                  fillRule="evenodd"
                  d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
            }
            aria-controls="initial-info-content"
            id="initial-info-header"
          >
            <div className="text-sm flex flex-nowrap flex-grow-0 justify-between px-2 w-full">
              <div className="self-start text-xs">
                <div className="h-full flex justify-center items-center text-whites-light opacity-90">
                  <TinySquare size="tiny" className="bg-dark-backgroundDark" />
                  <span className="pb-0.5">
                    Description<span className="font-sans"> / </span>
                    about<span className="font-sans"> / </span>format
                  </span>
                </div>
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails className={classesDetails.root}>
            {event.description ? (
              <div className="px-2">
                <MarkdownDisplay value={event.description} />
              </div>
            ) : (
              <div className="py-8 px-4 w-full flex justify-center items-center text-2xs text-whites-dark opacity-60 font-light italic">
                No description..
              </div>
            )}
          </AccordionDetails>
        </Accordion>

        {/* Settings button */}
        <div className="flex-grow-0 flex flex-col space-y-0.5 self-end pb-3.5">
          <div className="self-end text-xs text-whites-light">
            <Button
              className="font-medium tracking-wide"
              onClick={() => history.push(`${match.url}/settings`)}
              text={
                <>
                  Edit <span className="font-sans">/</span> Settings
                </>
              }
              variant="light"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  />
                </svg>
              }
            />
          </div>
          <span className="text-2xs tracking-tight text-whites-dark opacity-90">
            .. & Manage Discord/Nightbot
          </span>
        </div>

        {/* Tabs & Tables */}
        <div className="flex-grow flex flex-col items-center space-y-4 min-h-full text-whites-light">
          <ThemeProvider theme={tabsTheme}>
            <Tabs
              color="inherit"
              value={tab}
              onChange={handleSwitchTab}
              aria-label="tabs"
            >
              <Tab label="Standings" {...a11yProps(0)} />
              <Tab label="Rounds" {...a11yProps(1)} />
            </Tabs>
          </ThemeProvider>

          <Hr className="w-4/5 text-blacks-dark opacity-50" />

          <Fade in={tab === 0}>
            <TabPanel key={0} value={tab} index={0}>
              <StandingsTable
                data={sortBy(event.standingsTable, [(s) => s.points]).reverse()}
              />
            </TabPanel>
          </Fade>
          <Fade in={tab === 1}>
            <TabPanel key={1} value={tab} index={1}>
              {event.roundsTables.length === 0 ? (
                <div className="w-full flex-grow h-110 flex font-light justify-center items-start py-16 text-2xs italic text-whites-dark opacity-75">
                  Rounds will show up on event start..
                </div>
              ) : (
                <Rounds
                  event={event}
                  isLive={isLive}
                  isCurrentRound={isCurrentRound}
                  isPassedRound={isPassedRound}
                />
              )}
            </TabPanel>
          </Fade>
        </div>
      </div>
    </div>
  );
};

const UserView = ({ event }) => {
  let history = useHistory();
  const match = useRouteMatch();

  // MUI classes
  const classes = useStylesSummary();
  const classesDetails = useStylesDetails();

  // State
  const [accordionsState, setAccordionsState] = useState([true]);

  const [tab, setTab] = useState(0);

  // Handlers
  const handleSwitchTab = (e, tab) => {
    setTab(tab);
  };

  const handleAccordionState = ({ currentTarget: { attributes } }) => {
    setAccordionsState((state) => {
      return state.map((state, index) => {
        if (index === parseInt(attributes["index"].value)) return !state;
        return state;
      });
    });
  };

  // Helpers
  const isLive = (status) => parseInt(status) === 0;
  const isCurrentRound = (round) => parseInt(round) === event.currentRound;
  const isPassedRound = (round) => parseInt(round) < event.currentRound;
  const a11yProps = (index) => {
    return {
      key: index,
      id: `scrollable-force-tab-${index}`,
      "aria-controls": `scrollable-force-tabpanel-${index}`,
    };
  };

  return (
    <div className="event-viewer w-full h-full flex flex-col  relative space-y-8 px-6 text-whites-light">
      <div className="text-whites-light text-tiny font-bold pl-1">
        <div className="header w-full text-sm text-whites-light font-bold flex justify-between items-center xl:text-base">
          <div className="flex space-x-3 items-center p-3 -ml-2.5">
            <div className="w-4 h-4 rounded-sm bg-primary-light shadow-sm" />
            <span>{event.name}</span>
          </div>
          {event.lobbyCode && (
            <div className="flex justify-center items-center space-x-2">
              <div className="text-sm font-normal flex space-x-2 justify-center items-center py-1 px-2 bg-dark-backgroundDarker rounded-md">
                <span className="flex space-x-1 justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-thirdPlace opacity-90"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-light">Lobby code:</span>
                </span>
                <span>{event.lobbyCode}</span>
              </div>
              <CopyToClipboard
                text={event.lobbyCode}
                acknowledgment="Lobby-code copied!"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
                  <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
                </svg>
              </CopyToClipboard>
            </div>
          )}
        </div>
      </div>
      <div className="h-1/1.1 w-full flex flex-col space-y-4 shadow-lg border-blacks-dark">
        {/* Pre-Toolbar */}
        <div className="flex items-center justify-between -my-1">
          {/* Datetime / status */}
          <div className="flex text-whites-light justify-start text-2xs opacity-90 font-sans">
            {event.status === 0 && (
              <div className="flex items-center space-x-4">
                <LiveIndicator
                  className="text-success"
                  indicatorColor={"bg-success"}
                />
                <span className="text-2xs text-whites-light">
                  Current round{" "}
                  <span className="font-semibold">
                    {event.currentRound + 1}
                  </span>
                </span>
              </div>
            )}
            {event.status === 1 &&
              `${formatDate(event.datetime)} - ${fromDate(event.datetime)}`}
            {event.status === 2 &&
              `${formatDate(event.datetime)} - completed ${fromDate(
                event.datetime
              )}`}
          </div>
          {/* Share */}
          <div className="flex flex-col items-end space-y-1 text-whites-dark font-light cursor-pointer hover:text-whites-light">
            <CopyToClipboard
              text={`${window.location.origin}/${event.uniqueid}`}
              acknowledgment="Event link copied!"
            >
              <div className="flex p space-x-0.5 items-center text-2xs">
                <span className="opacity-80 shadow-md w-max flex-grow-0 flex space-x-1 justify-center items-center">
                  <span>Share</span>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-2.5 w-2.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                    </svg>
                  </span>
                </span>
              </div>
            </CopyToClipboard>
          </div>
        </div>

        {/* Description */}
        <Accordion
          TransitionProps={{ unmountOnExit: true, timeout: 300 }}
          key={0}
          expanded={accordionsState[0]}
        >
          <AccordionSummary
            index={0}
            className={classes.root}
            onClick={handleAccordionState}
            expandIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="#fff"
              >
                <path
                  fillRule="evenodd"
                  d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
            }
            aria-controls="initial-info-content"
            id="initial-info-header"
          >
            <div className="text-sm flex flex-nowrap flex-grow-0 justify-between px-2 w-full">
              <div className="self-start text-xs">
                <div className="h-full flex justify-center items-center text-whites-light opacity-90">
                  <TinySquare size="tiny" className="bg-dark-backgroundDark" />
                  <span className="pb-0.5">
                    Description<span className="font-sans"> / </span>
                    about<span className="font-sans"> / </span>format
                  </span>
                </div>
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails className={classesDetails.root}>
            {event.description ? (
              <MarkdownDisplay value={event.description} />
            ) : (
              <div className="py-8 px-4 w-full flex justify-center items-center text-2xs text-whites-dark opacity-60 font-light italic">
                No description..
              </div>
            )}
          </AccordionDetails>
        </Accordion>

        {/* Tabs & Tables */}
        <div className="flex-grow flex flex-col items-center space-y-4 min-h-full text-whites-light">
          <ThemeProvider theme={tabsTheme}>
            <Tabs
              color="inherit"
              value={tab}
              onChange={handleSwitchTab}
              aria-label="tabs"
            >
              <Tab label="Standings" {...a11yProps(0)} />
              <Tab label="Rounds" {...a11yProps(1)} />
            </Tabs>
          </ThemeProvider>

          <Hr className="w-4/5 text-blacks-dark opacity-50" />

          <Fade in={tab === 0}>
            <TabPanel key={0} value={tab} index={0}>
              <StandingsTable
                data={sortBy(event.standingsTable, [(s) => s.points]).reverse()}
              />
            </TabPanel>
          </Fade>
          <Fade in={tab === 1}>
            <TabPanel key={1} value={tab} index={1}>
              {event.roundsTables.length === 0 ? (
                <div className="w-full flex-grow h-110 flex font-light justify-center items-start py-16  text-2xs italic text-whites-dark opacity-75">
                  Rounds will show up when the event starts..
                </div>
              ) : (
                <Rounds
                  event={event}
                  isLive={isLive}
                  isCurrentRound={isCurrentRound}
                  isPassedRound={isPassedRound}
                />
              )}
            </TabPanel>
          </Fade>
        </div>
      </div>
    </div>
  );
};

// children components

const Rounds = ({ event, isLive, isCurrentRound, isPassedRound }) => {
  //

  const [roundOnView, setRoundOnView] = useState(event.currentRound);
  const [rounds, setRounds] = useState(() => {
    return event.roundsTables.map((round, index) => (
      <RoundsTable data={round.table} key={index} />
    ));
  });

  const handleChangeView = (event, newValue) => {
    setRoundOnView(newValue);
  };

  function a11yProps(index) {
    return {
      key: index,
      id: `scrollable-force-tab-${index}`,
      "aria-controls": `scrollable-force-tabpanel-${index}`,
    };
  }

  return (
    <ThemeProvider theme={subTabsTheme}>
      <div className="w-full flex flex-col space-y-1 text-whites-light">
        <Tabs
          color="inherit"
          value={roundOnView}
          onChange={handleChangeView}
          variant="scrollable"
          scrollButtons="on"
          ScrollButtonComponent={({ direction, onClick }) => {
            return direction === "right" ? (
              <svg
                onClick={onClick}
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 opacity-50 mx-1 flex flex-shrink-0 self-center justify-center items-center"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                onClick={onClick}
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 opacity-50 mx-1 flex-shrink-0 flex self-center justify-center items-center"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            );
          }}
          indicatorColor="secondary"
          textColor="primary"
        >
          {rounds.map((_, i) => (
            <Tab
              label={
                <span className="flex justify-center items-center">
                  <span className="px-2">{toWords(i + 1)} </span>
                  <span>
                    {isCurrentRound(i) && isLive(event.status) ? (
                      <LiveIndicator pulseOnly />
                    ) : null}
                  </span>
                </span>
              }
              {...a11yProps(i)}
            />
          ))}
        </Tabs>

        <div className="rounds-panels w-full">
          <SwipeableViews index={roundOnView} onChangeIndex={setRoundOnView}>
            {rounds.map((round, i) => (
              <RoundsPanel key={i} value={roundOnView} index={i}>
                {round}
              </RoundsPanel>
            ))}
          </SwipeableViews>
        </div>
      </div>
    </ThemeProvider>
  );
};

const RoundsPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <Fade in={value === index} timeout={100}>
      <div
        role="rounds-tabpanel"
        hidden={value !== index}
        id={`rounds-tabpanel-${index}`}
        aria-labelledby={`rounds-tab-${index}`}
        {...other}
      >
        {value === index && <div>{children}</div>}
      </div>
    </Fade>
  );
};
const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      className=" w-full"
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
};
