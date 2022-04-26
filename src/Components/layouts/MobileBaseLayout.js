import React from "react";
import { useEffect } from "react";
import { Tween, Timeline } from "react-gsap";
import NavigateBack from "../actions/NavigateBack";
import FadeAnimation from "./../../Animations/FadeAnimation";
import Copyright from "./Copyright";
import Hr from "./Hr";
import TinySquare from "./TinySquare";

const MobileBaseLayout = ({
  navigation = true,
  backPath = "",
  backLabel = "",
  children,
  header,
  title = "",
  nopadding = false,
  isHome = false,
  isExplore = false,
  isEvent = false,
  isOwner = false,
  isDashboardSubView = false,
  line = true,
  view = "",
}) => {
  const determineLayoutHeight = () => {
    if (isHome) return "home-height";
    if (isEvent && isOwner) return "organizer-event-height";
    if (isEvent) return "event-height";
    if (isDashboardSubView) {
      if (view === "new-event") return "new-event-height";
    }
    return "min-h-screen";
  };

  return (
    <FadeAnimation fadeIn>
      <div
        className={`MobileBaseLayout overflow-hidden ${determineLayoutHeight()} flex flex-col relative bg-dark-background`}
      >
        <header className="header w-full m-0 sticky z-50 text-whites-light flex items-center justify-center">
          {header}
        </header>
        <div
          className={`content-wrapper flex-grow flex flex-col pt-12 ${
            !nopadding && "px-16 pb-6 3xl:px-52"
          }`}
        >
          <div
            className={`content flex flex-col flex-grow items-center  ${
              !nopadding && "pb-16"
            }`}
          >
            {children}
          </div>
        </div>
        <div className="rounded-t-lg bg-dark-backgroundDark">
          <Copyright withLogo color="none" />
        </div>
      </div>
    </FadeAnimation>
  );
};

export default MobileBaseLayout;
