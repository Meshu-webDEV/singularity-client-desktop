import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import FadeAnimation from "../../Animations/FadeAnimation";
import EventsContext from "../../Context/Events/EventsContext";
import Copyright from "./Copyright";
import Hr from "./Hr";
import LoadingWithDots from "./LoadingWithDots";
import ButtonLink from "../actions/ButtonLink";
import { isEmpty } from "lodash";

const GridLayout = ({ children, header }) => {
  //

  const location = useLocation();

  const [loadingLiveEvents, setLoadingLiveEvents] = useState(true);
  const [error, setError] = useState(false);

  const { loadLiveEvents, liveEvents, isLiveLoading } =
    useContext(EventsContext);

  const renderLiveEvents = () => {
    if (isLiveLoading)
      return (
        <LoadingWithDots
          className="text-3xs text-whites-dark pt-10"
          label="loading"
          size="0.75rem"
          color="primary"
          flow="col"
        />
      );

    const _liveEvents = liveEvents.map((e, i) => {
      return (
        <Link
          to={`/${e.uniqueid}`}
          key={i}
          className="w-full rounded-sm bg-dark-backgroundDark bg-opacity-70 flex justify-between text-2xs text-whites-light p-2 hover:shadow-md filter hover:brightness-125 hover:bg-opacity-90"
        >
          {/* Name */}
          <div className="w-3/5 flex-grow-0">
            <div className="whitespace-nowrap overflow-ellipsis overflow-hidden">
              {e.name}
            </div>
          </div>
          {/* Current round */}
          <div className="flex space-x-2 justify-center items-center flex-shrink-0">
            <span>Round:</span>
            <span className="font-sans text-xs">
              {e.currentRound}/{e.rounds}
            </span>
          </div>
        </Link>
      );
    });

    if (isEmpty(liveEvents))
      return (
        <span className="text-3xs text-whites-dark font-l pt-4 italic opacity-90">
          No live events...
        </span>
      );

    return (
      <>
        {_liveEvents}
        {_liveEvents.length === 8 && (
          <ButtonLink
            href="/explore?status=0"
            text="more >"
            variant="dark"
            textOnly
            className="text-whites-dark text-2xs px-2.5 py-1 hover:text-whites-light self-end"
          />
        )}
      </>
    );
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  useEffect(() => {
    if (isEmpty(liveEvents)) return loadLiveEvents();
  }, []);

  return (
    <FadeAnimation fadeIn>
      <div
        className={`page-grid-layout overflow-hidden flex flex-col relative bg-dark-background`}
      >
        <header className="header w-full m-0 sticky z-50 text-whites-light flex items-center justify-center">
          {header}
        </header>
        <div
          className={`page-wrapper relative pt-12 px-16 grid grid-flow-col grid-cols-12 gap-6 min-h-screen flex-grow pb-16 items-start 3xl:px-40 3.5xl:px-52 4xl:px-60 5xl:px-96 2xl:gap-10 3xl:gap-12`}
        >
          <div className="page-content col-start-1 col-span-9 bg-dark-background-50 bg-opacity-80 shadow-sm px-2 pb-10 pt-5 min-h-screen">
            {children}
          </div>
          <div className="live-events col-start-10 col-span-3 bg-dark-background-50 bg-opacity-80 pb-10 shadow-sm px-2 flex flex-col space-y-2 items-center">
            <div className="text-whites-light pt-3">
              <div className="header text-xs text-whites-light -ml-2.5 flex space-x-1.5 items-center">
                <div className="w-2 h-2 rounded-full bg-secondary-light shadow-sm animate-pulse" />
                <span className="uppercase">Live events</span>
              </div>
            </div>
            <Hr className="w-3/5 bg-whites-light text-whites-light bg-opacity-10 opacity-10" />
            {/* Live events list */}
            {renderLiveEvents()}
          </div>
        </div>
        <hr className="self-center w-95 text-whites-light opacity-5 mt-6 mb-8" />
        <div className="rounded-t-lg ">
          <Copyright withLogo color="none" />
        </div>
      </div>
    </FadeAnimation>
  );
};

export default GridLayout;
