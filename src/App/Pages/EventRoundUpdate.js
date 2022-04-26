import React, { useContext } from "react";

// Components
import MobileBaseLayout from "../../Components/layouts/MobileBaseLayout";
import Header from "../../Components/layouts/Header";

// Context
import EventContext from "../../Context/Event/EventContext";
import { toWords } from "number-to-words/numberToWords";
import RoundsTable from "../../Components/layouts/RoundsTable";
import { Link, Redirect, useHistory, useParams } from "react-router-dom";
import { useEffect } from "react";
import { isEmpty } from "lodash";
import { useFormikContext } from "formik";
import Button from "../../Components/actions/Button";
import { useState } from "react";
import { Slide } from "@material-ui/core";

// Other
import { useInView } from "react-intersection-observer";
import LoadingWithDots from "../../Components/layouts/LoadingWithDots";
import ToastContext from "../../Context/Toast/ToastContext";
import ModalContext from "../../Context/Modal/ModalContext";
import { useMemo } from "react";
import StandingsTable from "../../Components/layouts/StandingsTable";
import GridLayout from "../../Components/layouts/GridLayout";

const EventRoundUpdate = () => {
  //

  // Formik Context
  const { setValues, values, setSubmitting, isSubmitting } = useFormikContext();

  const { round, id } = useParams();
  const history = useHistory();

  const { event, progressEventRounds, progressEventEndRound, setShouldUpdate } =
    useContext(EventContext);
  const { setToast } = useContext(ToastContext);
  const { setModal, offModal, setModalComponent, setModalProps } =
    useContext(ModalContext);

  // Handlers
  const handleUpdateRound = async () => {
    try {
      setSubmitting(true);
      await progressEventRounds(event.uniqueid, round, values.roundPoints);
      setShouldUpdate(true);
      setToast({
        variant: "success",
        message: `Successfully updated round <span class="font-semibold uppercase">${toWords(
          parseInt(round) + 1
        )}</span> scores!`,
      });
      history.replace(`/${event.uniqueid}`);
    } catch (error) {
    } finally {
      setSubmitting(false);
    }
  };

  const handleEndRound = async () => {
    try {
      setSubmitting(true);
      await progressEventEndRound(event.uniqueid, round, values.roundPoints);
      setShouldUpdate(true);
      setToast({
        variant: "success",
        message: `Successfully ended round <span class="font-semibold uppercase">${toWords(
          round + 1
        )}</span>`,
      });
      history.replace(`/${event.uniqueid}`);
    } catch (error) {}
  };

  const handleConfirmStandings = () => {
    offModal();

    const timeoutId = setTimeout(() => {
      setModalComponent(
        <ConfirmStandingsModal
          offModal={offModal}
          setModal={setModal}
          setModalProps={setModalProps}
          event={event}
          standings={[...event.standingsTable]}
          roundPoints={values.roundPoints}
          round={parseInt(round)}
        />
      );
      setModalProps({
        title: `Confirm updated standings before ending round ${toWords(
          parseInt(round) + 1
        ).toUpperCase()}`,
        variant: "success",
        action: (
          <Button
            className="whitespace-nowrap text-blacks-dark px-2.5 py-1 text-2xs"
            onClick={handleEndRound}
            text="End round"
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
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            }
          />
        ),
        secondary: (
          <Button
            className="whitespace-nowrap text-whites-dark text-2xs -mb-0.5"
            onClick={offModal}
            textOnly
            text="Discard"
            variant="light"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            }
          />
        ),
      });
      setModal();
    }, 200);
  };

  const handleConfirmRoundScores = () => {
    setModalComponent(
      <ConfirmEndRoundModal
        offModal={offModal}
        setModal={setModal}
        setModalProps={setModalProps}
        event={event}
        standings={[...event.standingsTable]}
        roundPoints={values.roundPoints}
        round={parseInt(round)}
      />
    );

    setModalProps({
      title: `Confirm round ${toWords(
        parseInt(round) + 1
      )} scores before ending.`,
      variant: "info",
      action: (
        <Button
          className="whitespace-nowrap text-blacks-dark px-2.5 py-1"
          onClick={handleConfirmStandings}
          text="Confirm new standings"
          variant="info"
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
      ),
      secondary: (
        <Button
          className="whitespace-nowrap text-whites-dark text-2xs -mb-0.5"
          onClick={offModal}
          textOnly
          text="Discard"
          variant="light"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          }
        />
      ),
    });
    setModal("content");
  };

  useEffect(() => {
    setValues(
      event.roundsTables
        ? { roundPoints: event.roundsTables[round] }
        : undefined
    );
  }, []);

  useEffect(() => {
    return () => setSubmitting(false);
  }, []);

  if (isEmpty(event)) return <Redirect to={`/${id}`} />;

  return (
    <GridLayout header={<Header />}>
      <div className="event-round-update relative flex flex-col space-y-8 w-full px-10">
        <div className="text-whites-light text-tiny font-bold pl-1">
          <div className="header text-sm text-whites-light font-bold p-3 -ml-2.5 flex space-x-3 items-center">
            <div className="w-4 h-4 rounded-sm bg-primary-light shadow-sm" />
            <span>{event.name} - Update round</span>
          </div>
        </div>

        {/* Back */}
        <div
          onClick={() => history.goBack()}
          className="absolute cursor-pointer bottom-full left-0 flex space-x-2 justify-center items-center text-whites-light text-sm transform -translate-y-1/2"
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

        <RoundsTable data={event.roundsTables[round].table} type="input" />
        {/* Controls  */}
        <div className="text-whites-light flex justify-center items-center text-sm self-end">
          {/* Discard */}
          <Button
            onClick={() => history.goBack()}
            className="text-2xs text-whites-dark mx-2"
            text="Discard"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            }
            textOnly
            variant="light"
          />
          {/* Update scores */}
          <Button
            className="whitespace-nowrap py-1.5 px-2.5 text-whites-dark"
            text={
              isSubmitting ? (
                <LoadingWithDots
                  flow="row"
                  label="Updating"
                  color="inherit"
                  size="0.5rem"
                />
              ) : (
                "Update scores"
              )
            }
            onClick={handleUpdateRound}
            variant="dark"
          />
          {/* End round */}
          <div>
            <Button
              className="mx-2 text-blacks-dark py-1 px-2.5 font-medium whitespace-nowrap"
              text={
                isSubmitting ? (
                  <LoadingWithDots
                    flow="row"
                    label="Updating"
                    color="inherit"
                    size="0.5rem"
                  />
                ) : (
                  "End round"
                )
              }
              onClick={handleConfirmRoundScores}
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
                      d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                    <path
                      fillRule="evenodd"
                      d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : null
              }
              variant="success"
            />
          </div>
        </div>
      </div>
    </GridLayout>
  );
};

export default EventRoundUpdate;

const ConfirmEndRoundModal = ({ roundPoints }) => {
  //

  return (
    <div className="h-full text-whites-light flex flex-col space-y-2 py-2.5">
      <div className="text-xs">Updated current round scores:</div>
      <div>
        <RoundsTable data={roundPoints.table} key="confirmationRounds" />
      </div>
    </div>
  );
};

const ConfirmStandingsModal = ({ event, roundPoints, round, standings }) => {
  //

  // Constants:
  const eventStandings = useMemo(
    () =>
      standings.map((s) => {
        return { ...s };
      }),
    []
  );

  const pointPerKill = useMemo(() => event.pointPerKill, []);
  const pointsDistribution = useMemo(() => event.pointsDistribution, []);

  // ****
  // TODO: roundStandings are not updated as per the input before hitting "end round"
  //       only works when updating rounds to db first then ending
  // ****

  // Calculate scores for round X
  const roundStandings = useMemo(() => {
    return roundPoints.table.map((team) => {
      // calculate kills
      const kills = team.kills * pointPerKill;
      // set points for placement based on set distribution
      const placement =
        pointsDistribution[team.placement < 1 ? 19 : team.placement - 1];
      // Set total points
      const points = kills + placement;
      return { name: team.name, uniqueid: team.uniqueid, points: points };
    });
  }, []);
  const newStandings = useMemo(() => {
    return roundStandings.map((standing) => {
      const team = eventStandings.find(
        (eventStanding) => standing.uniqueid === eventStanding.uniqueid
      );
      team.points = team.points + standing.points;
      return team;
    });
  }, []);

  return (
    <div className="h-full text-whites-light flex flex-col space-y-2 py-2.5">
      <div className="text-xs">
        <span className="font-medium underline">Standings</span> will update to:
      </div>
      <div>
        <StandingsTable data={newStandings} key="confirmationStandings" />
      </div>
    </div>
  );
};
