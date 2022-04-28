import { useContext, useEffect, useMemo, useState } from "react";
import {
  Switch,
  Route,
  useRouteMatch,
  useParams,
  useHistory,
  useLocation,
  Link,
} from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useSortBy, useTable } from "react-table";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";

// Components
import Header from "../../Components/layouts/Header";
import MobileBaseLayout from "../../Components/layouts/MobileBaseLayout";
import TinySquare from "../../Components/layouts/TinySquare";
import Hr from "../../Components/layouts/Hr";
import Button from "../../Components/actions/Button";
import CopyToClipboard from "../../Components/actions/CopyToClipboard";
import SecondaryCard from "../../Components/layouts/SecondaryCard";
import GridList from "../../Components/layouts/GridList";
import CurrencyFormat from "../../Components/layouts/CurrencyFormat";
import InputSlider from "../../Components/forms/InputSlider";
import Datetime from "../../Components/forms/Datetime";
import { default as SwitchInput } from "../../Components/forms/Switch";
import MarkdownInput from "../../Components/forms/MarkdownInput";
import FastInput from "../../Components/forms/FastInput";
import TeamsFieldsArray from "../../Components/forms/TeamsFieldsArray";
import PointsFields from "../../Components/forms/PointsFields";
import RemainingPrizepool from "../../Components/forms/RemainingPrizepool";
import PrizesFields from "../../Components/forms/PrizesFields";
import Select from "../../Components/forms/Select";
import TransitionalLoading from "./TransitionalLoading";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";

// Context
import FormikEventContext from "../../Context/Formik/FormikEventContext";
import EventContext from "../../Context/Event/EventContext";
import AuthContext from "../../Context/Auth/AuthContext";
import ToastContext from "../../Context/Toast/ToastContext";
import IntegrationsContext from "../../Context/Integrations/IntegrationsContext";
import IntegrationsState from "../../Context/Integrations/IntegrationsState";

// Other
import { isEmpty } from "lodash";
import { formatDate, generateNightbotCommand } from "../../lib/utils";
import { useFormikContext } from "formik";
import { datetimeTheme } from "../../lib/muiThemes";
import currencies from "../../lib/currencies.json";
import Markdown from "../../Images/Markdown";
import ConfirmationModal from "../../Components/actions/ConfirmationModal";
import ModalContext from "../../Context/Modal/ModalContext";
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

const EventSettings = () => {
  let history = useHistory();
  let location = useLocation();
  const match = useRouteMatch();
  const { id } = useParams();

  // Context
  const { isAuthorized } = useContext(AuthContext);
  const { setToast } = useContext(ToastContext);
  const {
    setEvent,
    getEventById,
    updateEvent,
    deleteEvent,
    updateEventNotify,
    isLoading,
    shouldUpdate,
    isUpdating,
    event,
  } = useContext(EventContext);

  useEffect(() => {
    if (isEmpty(event)) return;
    if (!event?.isOwner) return history.replace(`/${id}`);
  }, [id, event]);

  useEffect(() => {
    const getEvent = async () => {
      // await isAuthorized();
      await getEventById(id);
    };
    if (isEmpty(event) || shouldUpdate) getEvent();
  }, [id, shouldUpdate]);

  if (isLoading || isUpdating)
    return <TransitionalLoading text={isLoading ? "Loading" : "Updating"} />;

  return (
    <FormikEventContext initial={false} values={event}>
      <Switch>
        <Route path={`${match.url}/basic-info`}>
          <GridLayout
            backPath={match.url}
            backLabel="Settings"
            title="Update basic info"
            header={<Header />}
          >
            <BasicInfoSettings
              setToast={setToast}
              updateEvent={updateEvent}
              setEvent={setEvent}
            />
          </GridLayout>
        </Route>
        <Route path={`${match.url}/teams`}>
          <GridLayout
            backPath={match.url}
            backLabel="Settings"
            title="Update participated teams"
            header={<Header />}
          >
            <TeamsSettings
              setToast={setToast}
              updateEvent={updateEvent}
              setEvent={setEvent}
            />
          </GridLayout>
        </Route>
        <Route path={`${match.url}/points`}>
          <GridLayout
            backPath={match.url}
            backLabel="Settings"
            title="Update points & distribution"
            header={<Header />}
          >
            <PointsSettings
              setToast={setToast}
              updateEvent={updateEvent}
              setEvent={setEvent}
            />
          </GridLayout>
        </Route>
        <Route path={`${match.url}/prize`}>
          <GridLayout
            backPath={match.url}
            backLabel="Settings"
            title="Update prizepool & distribution"
            header={<Header />}
          >
            <PrizeSettings
              setToast={setToast}
              updateEvent={updateEvent}
              setEvent={setEvent}
            />
          </GridLayout>
        </Route>
        <Route path={`${match.url}/discord`}>
          <GridLayout
            backPath={match.url}
            backLabel="Settings"
            title="Discord notifications"
            header={<Header />}
          >
            <IntegrationsState>
              <DiscordSettings
                setToast={setToast}
                updateEvent={updateEvent}
                setEvent={setEvent}
              />
            </IntegrationsState>
          </GridLayout>
        </Route>
        <Route exact path={`${match.url}/`}>
          <AdvancedSettingsPreview
            match={match}
            event={event}
            setToast={setToast}
            updateEventNotify={updateEventNotify}
            setEvent={setEvent}
            deleteEvent={deleteEvent}
          />
        </Route>
      </Switch>
    </FormikEventContext>
  );
};

export default EventSettings;

const AdvancedSettingsPreview = ({
  match,
  event,
  updateEventNotify,
  setToast,
  setEvent,
  deleteEvent,
}) => {
  let history = useHistory();

  const { setModal, offModal, setModalComponent, setModalProps } =
    useContext(ModalContext);

  const {
    values,
    setErrors,
    initialValues,
    setValues,
    setFieldValue,
    isSubmitting,
    setSubmitting,
  } = useFormikContext();

  const teams = event.teams.map((team) => team.name);

  // Handlers
  const handleEditBasicInfo = () => history.push(`${match.url}/basic-info`);
  const handleEditTeams = () => history.push(`${match.url}/teams`);
  const handleEditPoints = () => history.push(`${match.url}/points`);
  const handleEditPrize = () => history.push(`${match.url}/prize`);
  const handleEditDiscord = () => history.push(`${match.url}/discord`);

  const handleToggleNotifications = async () => {
    setSubmitting(true);
    try {
      setFieldValue("notify", !values.notify);
      await updateEventNotify(values.uniqueid, {
        notify: !values.notify,
      });
      setEvent({ ...values, notify: !values.notify });
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
      setFieldValue("notify", values.notify);
    }
  };

  const handleEndEvent = () => {
    setModalComponent(
      <ConfirmationModal
        description={`Are you sure you want to delete "${event.name}" event?`}
        confirmVariant="error"
        confirm={handleDeleteEvent}
        cancel={offModal}
      />
    );
    setModalProps({
      title: `delete event`,
      variant: "error",
      actions: null,
      secondary: null,
    });
    setModal("content");
  };

  const handleDeleteEvent = async () => {
    history.replace("/dashboard");
    await deleteEvent(event.uniqueid);
  };

  useEffect(() => {
    setValues(initialValues);
    setErrors({});
  }, []);

  if (isEmpty(event)) return <TransitionalLoading text="Loading" />;

  return (
    <GridLayout header={<Header />}>
      <div className="flex-grow relative h-full w-full flex flex-col text-whites-light space-y-4 px-6">
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
            Back to event page
          </span>
        </div>
        <div className="flex flex-col space-y-8 justify-center items-center">
          {/* Notification */}
          {isEmpty(values.discord_webhooks) ? (
            <DiscordNotificationPlaceholder />
          ) : (
            <div className="w-full flex flex-col text-2xs space-y-1 items-start px-1">
              <div className="text-whites-light flex space-x-1 justify-center items-center">
                <SwitchInput
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  checked={values.notify}
                  onChange={({ currentTarget }) =>
                    handleToggleNotifications(currentTarget)
                  }
                  name="notify"
                  size="small"
                  label="Discord notification"
                  secondaryLabel="Notify channels on event progress"
                />
              </div>
            </div>
          )}
          <div className="w-full flex flex-col space-y-8 justify-center items-center">
            {/* Basic info */}
            <SecondaryCard
              title="basic info"
              primaryAction={
                <Button
                  text="Edit"
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  }
                  onClick={handleEditBasicInfo}
                  variant="info"
                  className="px-2.5 py-1"
                />
              }
            >
              <div className="flex flex-col space-y-2 text-sm">
                <div>
                  <div className="w-full flex flex-col whitespace-nowrap ">
                    <span className="text-2xs opacity-75 leading-snug">
                      Event name
                    </span>
                    <div className="w-full flex items-center space-x-3">
                      <span className="pr-1">{event.name}</span>
                      <Hr className="w-full bg-dark-backgroundDarker opacity-5" />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="w-full flex flex-col whitespace-nowrap ">
                    <span className="text-2xs opacity-75 leading-snug">
                      Event type
                    </span>
                    <div className="w-full flex items-center space-x-3">
                      <span>{event.isPublic ? "Public" : "Private"}</span>
                      <Hr className="w-full bg-dark-backgroundDarker opacity-5" />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="w-full flex flex-col whitespace-nowrap ">
                    <span className="text-2xs opacity-75 leading-snug">
                      Event rounds
                    </span>
                    <div className="w-full flex items-center space-x-3">
                      <span>{event.rounds} rounds</span>
                      <Hr className="w-full bg-dark-backgroundDarker opacity-5" />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="w-full flex flex-col whitespace-nowrap ">
                    <span className="text-2xs opacity-75 leading-snug">
                      Event date & time
                    </span>
                    <div className="w-full flex items-center space-x-3">
                      <span className="font-sans">
                        {formatDate(event.datetime)}
                      </span>
                      <Hr className="w-full bg-dark-backgroundDarker opacity-5" />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="w-full flex flex-col whitespace-nowrap ">
                    <span className="text-2xs opacity-75 leading-snug mb-2">
                      Event description, about & details
                    </span>
                    <div className="w-full flex items-center space-x-3 rounded-lg bg-dark-background p-3">
                      {event.description ? (
                        <ReactMarkdown
                          disallowedElements={["img"]}
                          className="markdown mobile text-sm"
                          remarkPlugins={[remarkGfm]}
                        >
                          {event.description}
                        </ReactMarkdown>
                      ) : (
                        <div className="w-full h-full tracking-wide opacity-60 font-light py-10 px-8 flex justify-center items-center italic text-2xs text-whites-dark">
                          No description..
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </SecondaryCard>
            {/* Teams */}
            <SecondaryCard
              primaryAction={
                <Button
                  text="Edit"
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  }
                  onClick={handleEditTeams}
                  variant="info"
                  className="px-2.5 py-1"
                />
              }
              title="participated teams"
            >
              <div className="flex flex-col space-y-1">
                <GridList items={teams} />
                <div className="text-xs pl-2 max-w-min whitespace-nowrap ">
                  {event.teams.length} <span className="font-sans">/</span> 20
                  teams
                </div>
              </div>
            </SecondaryCard>
            {/* Points */}
            <SecondaryCard
              title="points distribution"
              primaryAction={
                <Button
                  onClick={handleEditPoints}
                  text="Edit"
                  variant="info"
                  className="px-2.5 py-1"
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  }
                />
              }
            >
              <div className="flex items-center space-x-3 mt-2 mb-4">
                <span className="whitespace-nowrap  text-xs font-medium">
                  {event.pointPerKill} Point per kill
                </span>
                <Hr className="flex-grow bg-dark-backgroundDarker opacity-5" />
              </div>
              <GridList
                items={event.pointsDistribution}
                labeledItems
                label="Place"
                isOrdinal
              />
            </SecondaryCard>
            {/* Prizepool */}
            {event.hasPrizepool ? (
              <SecondaryCard
                title="prizepool & distribution"
                primaryAction={
                  <Button
                    text="Edit"
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    }
                    onClick={handleEditPrize}
                    variant="info"
                    className="px-2.5 py-1"
                  />
                }
              >
                <div className="flex items-center space-x-3 mt-2 mb-4">
                  <span className="whitespace-nowrap  text-sm">
                    Total prizepool{" "}
                    <CurrencyFormat
                      value={event.prizepool}
                      suffix={` ${event.prizepoolCurrency}`}
                    />
                  </span>
                  <Hr className="flex-grow bg-dark-backgroundDarker opacity-5" />
                </div>
                <GridList
                  items={event.prizepoolDistribution}
                  labeledItems
                  label="Team"
                  isOrdinal
                />
              </SecondaryCard>
            ) : (
              <SecondaryCard
                title="prizepool & distribution"
                primaryAction={
                  <Button
                    text="Set"
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    }
                    onClick={handleEditPrize}
                    variant="info"
                    className="px-2.5 py-1"
                  />
                }
              >
                <div className="w-full h-full tracking-wide opacity-60 font-light pt-8 flex justify-center items-center italic text-2xs text-whites-dark">
                  No prizepool..
                </div>
              </SecondaryCard>
            )}
          </div>
          {/* Discord */}
          <SecondaryCard
            title="Discord notifications"
            primaryAction={
              <Button
                onClick={handleEditDiscord}
                text="Edit"
                variant="info"
                className="px-2.5 py-1"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                }
              />
            }
          >
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-3 mt-2 mb-2">
                <span className="whitespace-nowrap  text-xs font-medium">
                  {event.discord_webhooks.length} Channels to notify
                </span>
                <Hr className="flex-grow bg-dark-backgroundDarker opacity-5" />
              </div>
              <div className="flex text-xs justify-evenly px-2 font-semibold space-x-2 bg-blacks-dark py-2 shadow-md">
                <div className="w-40">Server</div>
                <div className="text-center">Channel</div>
              </div>
              <div className="flex flex-col space-y-1.5 max-h-80 overflow-y-scroll">
                {event.discord_webhooks.length ? (
                  event.discord_webhooks.map((e, i) => (
                    <div
                      key={i}
                      className={`w-full filter bg-dark-backgroundDark py-1 ${
                        i % 2 === 0 ? "brightness-125" : ""
                      }`}
                    >
                      <div className="flex justify-evenly px-2 text-xs space-x-2">
                        <div className="w-40  whitespace-nowrap">
                          {e.server}
                        </div>
                        <div
                          className=" whitespace-nowrap"
                          style={{ maxWidth: "100px" }}
                        >
                          {e.channel}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-10 w-full flex justify-center items-center text-whites-dark text-2xs italic ">
                    No channels to notify
                  </div>
                )}
              </div>
            </div>
          </SecondaryCard>
          {/* Nightbot */}
          <SecondaryCard
            title="Nightbot command"
            primaryActionOnClick={() => history.push(`${match.url}/prize`)}
            primaryActionText="Edit"
            primaryActionVariant="dark"
            primaryActionIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            }
          >
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-3 mt-2">
                <span className="whitespace-nowrap  text-xs font-medium">
                  Use the command below
                </span>
                <Hr className="flex-grow bg-dark-backgroundDarker opacity-5" />
              </div>
              <div className="flex space-x-2 items-center">
                <div className="p-2 overflow-ellipsis whitespace-nowrap overflow-x-hidden bg-dark-backgroundDark rounded-md shadow-md text-xs italic text-whites-dark">
                  {generateNightbotCommand(event.nightbotUrl)}
                </div>
                <div className="pr-2">
                  <CopyToClipboard
                    text={generateNightbotCommand(event.nightbotUrl)}
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
              </div>
              <div className="flex items-center space-x-3 mt-2">
                <span className="whitespace-nowrap  text-xs font-medium">
                  Preview
                </span>
                <Hr className="flex-grow bg-dark-backgroundDarker opacity-5" />
              </div>
              <div className="flex flex-col space-y-1">
                <div className="text-2xs italic text-whites-dark pl-3">
                  Upcoming
                </div>
                <div className="p-2 bg-dark-backgroundDark rounded-md shadow-md text-xs italic text-whites-light">
                  <span className="font-semibold text-info filter brightness-110">
                    Nightbot:
                  </span>
                  <span className="font-sans font-medium text-whites-dark">
                    ✨ [SINGULARITY TOURNAMENT] | Upcoming.. Event starts in 4
                    hours.. visit{" "}
                    <span className="text-info filter brightness-110 underline">
                      s-url.sh/lGJ750
                    </span>{" "}
                    for more
                  </span>
                </div>
              </div>
              <div className="flex flex-col space-y-1">
                <div className="text-2xs italic text-whites-dark pl-3">
                  Ongoing
                </div>
                <div className="p-2 bg-dark-backgroundDark rounded-md shadow-md text-xs text-whites-light">
                  <span className="font-semibold text-info filter brightness-110">
                    Nightbot:
                  </span>
                  <span className="font-sans font-medium tracking-wide text-whites-dark leading-relaxed">
                    ✨ [SINGULARITY TOURNAMENT] | #1 Team 1: 27 - #2 Team 5: 17
                    - #3 Team 10: 15 - #4 Team 3: 8 - #5 Team 11: 7 - #6 Team 8:
                    7 - #7 Team 4: 6 - #8 Team 17: 4 - #9 Team 7: 4 - #10 Team
                    6: 4 - #11 Team 2: 4 - #12 Team 19: 3 - #13 Team 15: 2 - #14
                    Team 9: 2 - #15 Team 14: 1 - #16 Team 20: 0 - #17 Team 18: 0
                    - #18 Team 16: 0 - #19 Team 13: 0 - #20 Team 12: 0 - (Round
                    2/6 in progress) visit{" "}
                    <span className="text-info filter brightness-110 underline">
                      s-url.sh/lGJ750
                    </span>{" "}
                    for more
                  </span>
                </div>
              </div>
            </div>
          </SecondaryCard>

          {/* Danger zone */}
          <SecondaryCard
            TinySquareBg="bg-primary-light"
            title={
              <span className="text-primary-light uppercase">Danger zone</span>
            }
          >
            <div className="flex flex-col space-y-4">
              <div className="flex space-x-2 items-center pl-2.5">
                <Button
                  variant="error"
                  text="Delete event"
                  className="text-xs"
                  onClick={handleEndEvent}
                />
              </div>
            </div>
          </SecondaryCard>
        </div>
      </div>
    </GridLayout>
  );
};

const BasicInfoSettings = ({ updateEvent, setEvent, setToast }) => {
  let history = useHistory();

  const { values, setFieldValue, handleChange, isValid } = useFormikContext();

  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const handleClickUpdate = async () => {
    if (!isValid)
      return setToast({
        variant: "error",
        message:
          "Unable to update, invalid values. Check the fields for any corresponding error",
      });

    try {
      await updateEvent(values.uniqueid, "basic-info", {
        name: values.name,
        datetime: values.datetime,
        rounds: values.rounds,
        isPublic: values.isPublic,
        description: values.description,
      });
      setEvent(values);
    } catch (error) {
    } finally {
      history.goBack();
    }
  };

  const handlePickerClicked = () => {
    setIsPickerOpen((prev) => !prev);
  };

  return (
    <SecondaryCard
      title="Edit basic info"
      primaryAction={
        <Button
          onClick={handleClickUpdate}
          text="Update"
          variant="success"
          className="py-1 px-2.5"
        />
      }
      secondaryAction={
        <Button
          text="Discard"
          onClick={() => history.goBack()}
          textOnly
          className="text-xs text-whites-dark"
        />
      }
    >
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
          Back to settings
        </span>
      </div>
      <div className="w-full flex flex-col space-y-4">
        <FastInput size="large" label="Event name" name="name" />
        <MarkdownInput
          name="description"
          label="Description, about & details"
          secondaryLabel={
            <span className="flex space-x-1 justify-center items-center text-whites-light">
              <span>supports Markdown</span>{" "}
              <Markdown className="pt-0.5 w-4 h-3" />
            </span>
          }
        />
        <ThemeProvider theme={datetimeTheme}>
          <Datetime
            label="Date and time"
            value={values.datetime}
            setFieldValue={setFieldValue}
            open={isPickerOpen}
            onOpen={handlePickerClicked}
            onClose={handlePickerClicked}
            color="secondary"
            name="datetime"
          />
        </ThemeProvider>

        <InputSlider
          marks={[
            { value: 1 },
            { value: 4 },
            { value: 6 },
            { value: 8 },
            { value: 12 },
            { value: 16 },
          ]}
          max={16}
          step={null}
          color="secondary"
          type="number"
          label="Rounds"
          name="rounds"
          placeholder="1"
          value={values.rounds}
          setFieldValue={setFieldValue}
        />

        <SwitchInput
          label="Public event"
          secondaryLabel={
            values.isPublic ? (
              <>
                Event progress/info visible to{" "}
                <span className="font-semibold">everyone</span>
              </>
            ) : (
              <>
                Event progress/info visible only
                <span className="font-semibold"> by a link</span>
              </>
            )
          }
          checked={values.isPublic}
          onChange={handleChange}
          name="isPublic"
          color="secondary"
          size="small"
        />
      </div>
    </SecondaryCard>
  );
};

const TeamsSettings = ({ updateEvent, setEvent, setToast }) => {
  let history = useHistory();

  const { values, isValid } = useFormikContext();

  const handleClickUpdate = async () => {
    if (!isValid)
      return setToast({
        variant: "error",
        message:
          "Unable to update, invalid values. Check the fields for any corresponding errors",
      });

    try {
      await updateEvent(values.uniqueid, "teams", {
        teams: values.teams,
        shouldCreateTeams: values.shouldCreateTeams,
      });
      setEvent(values);
    } catch (error) {
    } finally {
      history.goBack();
    }
  };

  return (
    <SecondaryCard
      title="Edit participated teams"
      primaryAction={
        <Button
          onClick={handleClickUpdate}
          text="Update"
          variant="success"
          className="py-1 px-2.5"
        />
      }
      secondaryAction={
        <Button
          text="Discard"
          onClick={() => history.goBack()}
          textOnly
          className="text-xs text-whites-dark"
        />
      }
    >
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
          Back to settings
        </span>
      </div>
      <div className="text-whites-light px-2 flex flex-col space-y-4 ">
        <TeamsFieldsArray />
      </div>
    </SecondaryCard>
  );
};

const PointsSettings = ({ updateEvent, setEvent, setToast }) => {
  let history = useHistory();

  const { values, isValid } = useFormikContext();

  const handleClickUpdate = async () => {
    if (!isValid)
      return setToast({
        variant: "error",
        message:
          "Unable to update, invalid values. Check the fields for any corresponding errors",
      });
    try {
      await updateEvent(values.uniqueid, "points", {
        pointPerKill: values.pointPerKill,
        pointsDistribution: values.pointsDistribution,
      });
      setEvent(values);
    } catch (error) {
    } finally {
      history.goBack();
    }
  };

  return (
    <SecondaryCard
      title="Edit points & distribution"
      primaryAction={
        <Button
          onClick={handleClickUpdate}
          text="Update"
          variant="success"
          className="py-1 px-2.5"
        />
      }
      secondaryAction={
        <Button
          text="Discard"
          onClick={() => history.goBack()}
          textOnly
          className="text-xs text-whites-dark"
        />
      }
    >
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
          Back to settings
        </span>
      </div>
      <div className="flex flex-col space-y-4 text-whites-light">
        <FastInput
          label="Points per kill"
          type="number"
          name="pointPerKill"
          min={0}
          size="small"
        />
        <div className="flex flex-col space-y-1">
          <label htmlFor="points distribution" className="pl-1 text-sm">
            Points distribution
          </label>
          <PointsFields />
        </div>
      </div>
    </SecondaryCard>
  );
};

const PrizeSettings = ({ updateEvent, setEvent, setToast }) => {
  let history = useHistory();

  const _currencies = currencies.map((currency) => {
    return {
      name: currency.name,
      code: currency.code,
      symbol: currency.symbol,
    };
  });

  const { isValid, values, setFieldValue } = useFormikContext();

  const [optionCard, setOptionCard] = useState(() => !values.hasPrizepool);
  const [symbol, setSymbol] = useState("$");

  // handlers
  const handleSelectCurrency = ({ target: { value } }) => {
    setSymbol(_currencies.find((currency) => currency.code === value).symbol);
    setFieldValue("prizepoolCurrency", value.toString());
  };

  const handleClickUpdate = async () => {
    if (!isValid)
      return setToast({
        variant: "error",
        message:
          "Unable to update, invalid values. Check the fields for any corresponding errors",
      });
    try {
      await updateEvent(values.uniqueid, "prize", {
        prizepool: values.prizepool,
        prizepoolDistribution: values.prizepoolDistribution,
        prizepoolCurrency: values.prizepoolCurrency,
        remainingPrizepool: values.remainingPrizepool,
        hasPrizepool: true,
      });

      setEvent({ ...values, hasPrizepool: true });
    } catch (error) {
    } finally {
      history.goBack();
    }
  };

  return (
    <SecondaryCard
      title="Edit prizepool & distribution"
      primaryAction={
        <Button
          onClick={handleClickUpdate}
          text="Update"
          variant="success"
          className="py-1 px-2.5"
        />
      }
      secondaryAction={
        <Button
          text="Discard"
          onClick={() => history.goBack()}
          textOnly
          className="text-xs text-whites-dark"
        />
      }
    >
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
          Back to settings
        </span>
      </div>
      <div className="flex flex-col space-y-4 text-whites-light">
        <FastInput
          label="Total prizepool"
          type="number"
          name="prizepool"
          size="large"
        />

        <Select
          symbol={symbol}
          name="prizepoolCurrency"
          className="pl-2 w-56 text-2xs"
          label="Currency"
          secondaryLabel="For UI/Visual representation only"
          native={true}
          options={_currencies}
          onChange={handleSelectCurrency}
        />

        <div className="relative flex space-x-2 items-center">
          <RemainingPrizepool
            label="Remaining"
            prizepool={values.prizepool}
            distribute={values.prizepoolDistribution}
          />
        </div>
        <div className="flex flex-col space-y-1 pb-6">
          <label htmlFor="points distribution" className="pl-1 text-sm">
            Prizepool distribution
          </label>
          <PrizesFields />
        </div>
      </div>
    </SecondaryCard>
  );
};

const DiscordSettings = ({ updateEvent, setEvent, setToast }) => {
  let history = useHistory();

  // MUI classes
  const classes = useStylesSummary();
  const classesDetails = useStylesDetails();

  const { isValid, values, setFieldValue, touched, errors, setFieldTouched } =
    useFormikContext();
  const { getDiscordChannels, isLoading, discordWebhooks } =
    useContext(IntegrationsContext);

  // === Select and toggle stuff

  // Not added channels - account channels
  const [selectedAccountChs, setSelectedAccountChs] = useState([]);

  const handleToggleAccountChs = (channel) => {
    if (isEmpty(selectedAccountChs)) {
      return setSelectedAccountChs((prev) => {
        return [...prev, { ...channel }];
      });
    }

    const isSelected = selectedAccountChs.some((selectedAccountCh) => {
      return selectedAccountCh._id === channel._id;
    });

    if (!isSelected) {
      return setSelectedAccountChs((prev) => {
        return [...prev, { ...channel }];
      });
    }

    setSelectedAccountChs((prev) => {
      const newSelectedAccountChs = prev.filter(
        (_chs) => _chs._id != channel._id
      );
      return newSelectedAccountChs;
    });
  };

  // Added channels - event channels
  const [selectedEventChs, setSelectedEventChs] = useState([]);

  const handleToggleEventChs = (channel) => {
    if (isEmpty(selectedEventChs)) {
      return setSelectedEventChs((prev) => {
        return [...prev, { ...channel }];
      });
    }

    const isSelected = selectedEventChs.some((selectedEventCh) => {
      return selectedEventCh._id === channel._id;
    });

    if (!isSelected) {
      return setSelectedEventChs((prev) => {
        return [...prev, { ...channel }];
      });
    }

    setSelectedEventChs((prev) => {
      const newSelectedEventChs = prev.filter(
        (_chs) => _chs._id != channel._id
      );
      return newSelectedEventChs;
    });
  };

  const [expanded, setExpanded] = useState(false);

  const handleClickUpdateAdd = async () => {
    if (!selectedAccountChs.length)
      return setToast({
        variant: "error",
        message:
          "Cannot proceed to add channels, invalid values of 0 channels.",
      });

    try {
      await updateEvent(values.uniqueid, "discord-webhooks", {
        action: "add",
        data: {
          webhooks: selectedAccountChs.map((w) => w._id),
        },
      });
    } catch (error) {
    } finally {
      history.goBack();
    }
  };

  const handleClickUpdateRemove = async () => {
    if (!selectedEventChs.length)
      return setToast({
        variant: "error",
        message:
          "Cannot proceed to remove channels, invalid values of 0 channels.",
      });

    try {
      await updateEvent(values.uniqueid, "discord-webhooks", {
        action: "remove",
        data: {
          webhooks: selectedEventChs.map((w) => w._id),
        },
      });
    } catch (error) {
    } finally {
      history.goBack();
    }
  };

  // useEffect(() => {
  //   getDiscordChannels();
  // }, []);

  useEffect(() => {
    setFieldTouched("discordWebhooks", true);
  }, []);

  return (
    <div className="flex flex-col space-y-3 w-full">
      <SecondaryCard
        title="Add channels to notify"
        subtitle="20 channels max"
        primaryAction={
          !values.owner.owner_webhooks.length ? (
            <Button
              disabled
              text="Link channels to account first"
              variant="dark"
              className="py-1 px-2.5 opacity-40"
            />
          ) : (
            <Button
              onClick={handleClickUpdateAdd}
              text={`Add ${
                selectedAccountChs.length ? selectedAccountChs.length : ""
              } channels`}
              variant="success"
              className="py-1 px-2.5"
            />
          )
        }
        secondaryAction={
          <Button
            text="Discard"
            onClick={() => history.goBack()}
            textOnly
            className="text-xs text-whites-dark"
          />
        }
      >
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
            Back to settings
          </span>
        </div>
        <div className="flex flex-col space-y-4 text-whites-dark">
          {!values.owner.owner_webhooks.length ? (
            <div className="text-2xs flex font-light italic text-whites-dark py-10 text-center w-full">
              <span className="inline-block">
                <span className="opacity-70">
                  Your account has no channels to add, you can link new channels{" "}
                </span>
                <Link
                  className="font-semibold text-secondary-light not-italic"
                  to="/dashboard/my-integrations"
                >
                  Here
                </Link>
              </span>
            </div>
          ) : (
            <UnhookedChannelsTable
              hooks={values.owner.owner_webhooks}
              handleToggleHookChannel={handleToggleAccountChs}
            />
          )}
        </div>
      </SecondaryCard>
      <div className="flex justify-center items-center py-2.5">
        <Hr className="text-whites-dark w-full flex-shrink opacity-30" />
        <span className="min-w-min flex-grow text-xs font-light text-whites-dark opacity-80 whitespace-nowrap px-2.5">
          Below are channels that are already added{" "}
          <span className="inline-block text-center align-middle">
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
          </span>
        </span>
        <Hr className="text-whites-dark w-full flex-shrink opacity-30" />
      </div>
      <Accordion TransitionProps={{ unmountOnExit: true }} expanded={expanded}>
        <AccordionSummary
          className={classes.root}
          onClick={() => setExpanded((p) => !p)}
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
            <div className="self-start text-xs flex-grow">
              <div className="h-full flex space-x-1.5 items-center text-whites-light">
                <span className="flex justify-center items-center space-x-2.5 whitespace-nowrap">
                  <span className="text-xs opacity-80 tracking-normal font-medium">
                    Event added channels
                  </span>
                  <TinySquare
                    size="medium"
                    className="bg-dark-backgroundDarker"
                  />
                </span>
                <div className="text-2xs font-light tracking-tighter text-whites-light opacity-50">
                  tap to expand
                </div>
              </div>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails className={classesDetails.root}>
          <div className="w-full flex-grow flex flex-col space-y-4">
            <div className="max-h-80 w-full overflow-y-scroll">
              {!values.discord_webhooks.length ? (
                <div className="text-2xs font-light italic text-whites-dark opacity-70 py-10 text-center w-full">
                  No channels added yet..
                </div>
              ) : (
                <HookedChannelsTable
                  hooks={values.discord_webhooks}
                  handleToggleUnhookChannel={handleToggleEventChs}
                />
              )}
            </div>
            <Hr className="w-4/5 text-whites-dark self-center opacity-10" />
            <div className="pt-4 whitespace-nowrap text-xs self-end">
              <Button
                onClick={handleClickUpdateRemove}
                text={`Remove ${
                  selectedEventChs.length ? selectedEventChs.length : ""
                } channels`}
                variant="error"
              />
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

const DiscordNotificationPlaceholder = () => {
  let history = useHistory();
  let match = useRouteMatch();

  return (
    <div className="w-full relative whitespace-nowrap">
      <div className="absolute text-xs z-10 shadow-lg bg-dark-backgroundDark bg-opacity-60 text-whites-light transform left-1/2 -translate-x-1/2 top-3/4 -translate-y-3/4 px-2 py-2">
        <span className="opacity-80">
          No channels hooked to this event, you can add from{" "}
          <span
            onClick={() => history.push(`${match.url}/discord`)}
            className="font-semibold text-success tracking-wide px-0.5 cursor-pointer"
          >
            here
          </span>
        </span>
      </div>
      <div
        className={`flex flex-col text-2xs space-y-1 items-start px-1 opacity-30 pointer-events-none cursor-not-allowed`}
      >
        <span className="text-xs text-whits-light flex justify-center items-center">
          <span>Discord progression notification</span>
        </span>
        <div
          className={`text-whites-light flex space-x-1 justify-center items-center`}
        >
          <SwitchInput name="notify" size="small" />
        </div>
      </div>
    </div>
  );
};

const UnhookedChannelsTable = ({ hooks, handleToggleHookChannel }) => {
  //

  // Table stuff
  const columns = useMemo(() => {
    return [
      {
        Header: "#",
        accessor: "id", // accessor is the "key" in the data
        id: "index",
      },
      {
        Header: "Server",
        accessor: "server", // accessor is the "key" in the data
      },
      {
        Header: "Channel",
        accessor: "channel", // accessor is the "key" in the data
      },
      {
        Header: "Add",
        accessor: "_id",
        id: "add",
      },
    ];
  }, []);
  const data = useMemo(() => {
    return hooks.map((hook, index) => {
      return { ...hook, id: index + 1 };
    });
  }, [hooks]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy
    );

  return (
    <table
      {...getTableProps}
      className="text-whites-light w-full text-center align-middle"
    >
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr className="w-full" {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => {
              if (column.id === "server")
                return (
                  <th
                    className="text-left text-2xs font-semibold py-2 border-b border-dark-backgroundDarker"
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
                  </th>
                );
              if (column.id === "channel")
                return (
                  <th
                    className="text-left text-2xs font-semibold py-2 border-b border-dark-backgroundDarker"
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
                  </th>
                );
              return (
                <th
                  className="text-center text-2xs font-semibold py-2 border-b border-dark-backgroundDarker"
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render("Header")}
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, index) => {
          prepareRow(row);
          return (
            <tr
              className={`${index % 2 ? "" : "bg-grays-light"} text-2xs`}
              {...row.getRowProps()}
            >
              {row.cells.map((cell) => {
                if (cell.column.id === "index")
                  return (
                    <td
                      className="text-center w-12 text-2xs relative"
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                if (cell.column.id === "add")
                  return (
                    <td
                      className="w-10 text-center relative"
                      {...cell.getCellProps()}
                    >
                      <Checkbox
                        onClick={(e) =>
                          handleToggleHookChannel(cell.row.original)
                        }
                        checkedIcon={
                          <span className="text-secondary-light">
                            <CheckBoxIcon color="inherit" fontSize="small" />
                          </span>
                        }
                        icon={
                          <span className="text-secondary-light">
                            <CheckBoxOutlineBlankIcon
                              color="inherit"
                              fontSize="small"
                            />
                          </span>
                        }
                      />
                    </td>
                  );
                return (
                  <td className="text-left" {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const HookedChannelsTable = ({ hooks, handleToggleUnhookChannel }) => {
  //

  // Table stuff
  const columns = useMemo(() => {
    return [
      {
        Header: "#",
        accessor: "id", // accessor is the "key" in the data
        id: "index",
      },
      {
        Header: "Server",
        accessor: "server", // accessor is the "key" in the data
      },
      {
        Header: "Channel",
        accessor: "channel", // accessor is the "key" in the data
      },
      {
        Header: "Remove",
        accessor: "_id",
        id: "remove",
      },
    ];
  }, []);
  const data = useMemo(() => {
    return hooks.map((hook, index) => {
      return { ...hook, id: index + 1 };
    });
  }, [hooks]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy
    );

  return (
    <table
      {...getTableProps}
      className="text-whites-light w-full text-center align-middle"
    >
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr className="w-full" {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => {
              if (column.id === "server")
                return (
                  <th
                    className="text-left text-2xs font-semibold py-2 border-b border-dark-backgroundDarker"
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
                  </th>
                );
              if (column.id === "channel")
                return (
                  <th
                    className="text-left text-2xs font-semibold py-2 border-b border-dark-backgroundDarker"
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
                  </th>
                );
              if (column.id === "remove")
                return (
                  <th
                    className="text-center text-2xs font-semibold py-2 border-b border-dark-backgroundDarker pr-3"
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
                  </th>
                );
              return (
                <th
                  className="text-center text-2xs font-semibold py-2 border-b border-dark-backgroundDarker"
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render("Header")}
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, index) => {
          prepareRow(row);
          return (
            <tr
              className={`${index % 2 ? "" : "bg-grays-light"} text-2xs`}
              {...row.getRowProps()}
            >
              {row.cells.map((cell) => {
                if (cell.column.id === "index")
                  return (
                    <td
                      className="text-center w-12 text-2xs relative"
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                if (cell.column.id === "remove")
                  return (
                    <td
                      className="w-10 text-center relative pr-3"
                      {...cell.getCellProps()}
                    >
                      <Checkbox
                        onClick={(e) =>
                          handleToggleUnhookChannel(cell.row.original)
                        }
                        checkedIcon={
                          <span className="text-primary-light">
                            <CheckBoxIcon color="inherit" fontSize="small" />
                          </span>
                        }
                        icon={
                          <span className="text-primary-light">
                            <CheckBoxOutlineBlankIcon
                              color="inherit"
                              fontSize="small"
                            />
                          </span>
                        }
                      />
                    </td>
                  );
                return (
                  <td className="text-left" {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
