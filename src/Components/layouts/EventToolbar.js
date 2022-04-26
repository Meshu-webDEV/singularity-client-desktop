import { useHistory, useRouteMatch } from "react-router-dom";
import { useState, useContext, useEffect } from "react";

// Components
import CopyToClipboard from "../actions/CopyToClipboard";
import SecondaryCard from "./SecondaryCard";
import Switch from "../actions/Switch";
import LoadingWithDots from "./LoadingWithDots";

// Context
import EventContext from "../../Context/Event/EventContext";
import ModalContext from "../../Context/Modal/ModalContext";

// Other
import { capitalize, isEmpty } from "lodash";
import { Form, Formik, useFormikContext } from "formik";
import Button from "../actions/Button";
import { toWords } from "number-to-words/numberToWords";
import ConfirmationModal from "../actions/ConfirmationModal";
import CurrencyFormat from "./CurrencyFormat";
import TinySquare from "./TinySquare";
import InfoPopover from "../actions/InfoPopover";
import FastInput from "../forms/FastInput";
import FormikLobbyCodeContext from "../../Context/Formik/FormikLobbyCodeContext";

const EventToolbar = ({ event }) => {
  let history = useHistory();
  const match = useRouteMatch();

  const { setModal, offModal, setModalComponent, setModalProps } =
    useContext(ModalContext);
  const { startEvent, endEvent, lobbyCodeLoading } = useContext(EventContext);

  // handlers
  const handleEditCode = () => {
    setModalComponent(
      <div>
        <FormikLobbyCodeContext initial>
          <CodeModal uniqueid={event.uniqueid} />
        </FormikLobbyCodeContext>
      </div>
    );
    setModalProps({
      variant: "success",
      title: "Set Lobby-code",
      action: null,
      secondary: null,
    });
    setModal("content");
  };

  const handleStartEvent = () => {
    console.log("?");
    startEvent(event.uniqueid);
  };

  const handleUpdateRound = () => {
    history.push(`${match.url}/round/${event.currentRound}`);
  };

  const handleEndEvent = () => {
    setModalComponent(
      <ConfirmationModal
        description={`Are you sure you want to ${
          event.currentRound === 0 ? "stop" : "end"
        } "${event.name}" event?`}
        confirmVariant="error"
        confirm={() => endEvent(event.uniqueid)}
        cancel={offModal}
      />
    );
    setModalProps({
      title: `${event.currentRound === 0 ? "stop" : "end ongoing"}  event`,
      variant: "error",
      actions: null,
      secondary: null,
    });
    setModal("content");
  };

  useEffect(() => {
    offModal();
  }, []);

  return (
    <div className="w-full h-full px-2">
      <div className="relative w-full h-full text-whites-light flex flex-col space-y-2.5 flex-wrap justify-between">
        {/* Lobby-code */}
        <div className="flex justify-between items-start">
          <div className="flex flex-col space-y-0.5 justify-start items-start text-whites-light">
            <div className="flex flex-col text-2xs space-y-1 items-start px-1">
              <span className="font-medium text-xs">
                Current configs<span className="font-sans">/</span>info
              </span>
              <div className="flex flex-col space-y-1">
                <div className="flex space-x-0.5 items-center text-2xs font-light">
                  <span>Public - </span>
                  <span>
                    {event.isPublic ? (
                      <span className="font-medium text-secondary-light">
                        Yes
                      </span>
                    ) : (
                      <span className="text-whites-dark italic">No</span>
                    )}
                  </span>
                </div>
                <div className="flex space-x-0.5 items-center text-2xs font-light">
                  <span>Notify - </span>
                  <span>
                    {event.notify ? (
                      <span className="font-medium text-secondary-light">
                        Yes
                      </span>
                    ) : (
                      <span className="text-whites-dark italic">No</span>
                    )}
                  </span>
                </div>
                <div className="flex space-x-0.5 text-2xs font-light items-center">
                  <span>Teams - </span>
                  <span className="text-success">{event.teams.length}</span>
                </div>
                <div className="flex space-x-0.5 text-2xs font-light items-center">
                  <span>Prizepool - </span>
                  <span className="text-success">
                    {event.hasPrizepool ? (
                      <CurrencyFormat
                        value={event.prizepool}
                        suffix={` ${event.prizepoolCurrency}`}
                      />
                    ) : (
                      <span className="text-whites-dark italic">No</span>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between text-2xs font-light -mr-2">
            <div className="flex flex-col text-2xs space-y-1 items-start px-1">
              <div className="text-xs text-whits-light flex justify-center items-center">
                <div className="font-medium flex">
                  <div>Lobby-code</div>
                  <InfoPopover
                    info={
                      <p className="w-60 leading-relaxed">
                        Set the current lobby code for this event. Lobby-code is
                        <strong> NOT</strong> visible to others. Only you can
                        choose who can see it. by clicking "Share w
                        <span className="font-sans">/</span>
                        lobby-code" button above the toolbar it will copy the
                        event page link to your clipboard. Anyone with that link
                        can view the current lobby code.{" "}
                        <span className="text-warning font-medium">
                          Do it with caution.
                        </span>
                      </p>
                    }
                    autoClose={false}
                  />
                </div>
              </div>
              <LobbyCode
                event={event}
                lobbyCode={event.lobbyCode}
                handleEditCode={handleEditCode}
              />
            </div>
          </div>
        </div>

        {/* Event status/progression controls */}
        <div className="self-end flex text-xs space-x-3.5 justify-center items-center pt-6">
          <div className="text-2xs text-primary-dark">
            {event.status === 0 && (
              <Button
                onClick={handleEndEvent}
                textOnly
                className="text-primary-light"
                text={event.currentRound === 0 ? "Stop event" : "End event"}
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z"
                      clipRule="evenodd"
                    />
                  </svg>
                }
              />
            )}
          </div>
          {event.status === 1 ? (
            <Button
              className="whitespace-nowrap px-2.5 py-1"
              onClick={handleStartEvent}
              text="Start event!"
              variant="success"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z"
                    clipRule="evenodd"
                  />
                </svg>
              }
            />
          ) : null}
          {event.status === 0 && event.currentRound + 1 < event.rounds ? (
            <Button
              className="text-blacks-dark px-2.5 py-1"
              onClick={handleUpdateRound}
              text={
                <span>
                  Update<span className="font-sans px-0.5">/</span>end round
                  {` `}
                  {toWords(event.currentRound + 1).toUpperCase()}
                </span>
              }
              variant="success"
              icon={
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
              }
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default EventToolbar;

// Children components
const LobbyCode = ({ lobbyCode, handleEditCode, event }) => {
  return (
    <div className="relative">
      <div className=" text-whites-light flex space-x-1 justify-center items-center">
        <span className="px-2 py-1 w-36 bg-dark-backgroundDark flex justify-between space-x-2 items-center rounded-sm">
          <span>
            {lobbyCode ? (
              lobbyCode
            ) : (
              <span className="px-2.5 text-2xs font-light tracking-tighter opacity-40">
                Not set yet..
              </span>
            )}
          </span>
          <div className="cursor-pointer">
            <CopyToClipboard
              text={`${event.name} lobby-code: ${lobbyCode}`}
              acknowledgment="Lobby-code copied!"
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
                  <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
                </svg>
              </span>
            </CopyToClipboard>
          </div>
        </span>
        <span
          onClick={handleEditCode}
          className="p-0.5 rounded-full shadow-sm text-white-light cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </span>
      </div>
    </div>
  );
};

// Other components
const CodeModal = ({ uniqueid }) => {
  //

  const { updateEvent } = useContext(EventContext);
  const { offModal } = useContext(ModalContext);
  const { values, isSubmitting, setSubmitting } = useFormikContext();

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      await updateEvent(uniqueid, "lobby-code", values);
      offModal();
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
    }
  };

  return (
    <div className="h-full w-full py-4 flex justify-center items-center">
      <div className="py-3.5 w-1/2 px-5 items-center flex flex-col space-y-4">
        <FastInput
          size="full"
          bg="bg-grays-light"
          autoFocus
          label="Lobby-code"
          name="lobbyCode"
          type="text"
        />
        <div className="flex space-x-3 text-xs self-end">
          <Button
            onClick={offModal}
            text="Discard"
            textOnly
            className="text-2xs font-light text-whites-dark"
          />
          <Button
            className="px-2.5 py-1"
            disabled={isSubmitting}
            onClick={handleSubmit}
            text={
              isSubmitting ? (
                <span className="text-2xs">
                  <LoadingWithDots
                    label="Submitting.."
                    flow="row"
                    size="0.6rem"
                    color="inherit"
                  />
                </span>
              ) : (
                "Set code"
              )
            }
            variant="success"
            icon={
              isSubmitting ? null : (
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
              )
            }
          />
        </div>
      </div>
    </div>
  );
};
