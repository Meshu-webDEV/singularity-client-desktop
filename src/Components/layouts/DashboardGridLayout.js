import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import FadeAnimation from "../../Animations/FadeAnimation";
import Copyright from "./Copyright";

const DashboardGridLayout = ({ children, header }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <FadeAnimation fadeIn>
      <div
        className={`dashboard-grid-layout overflow-hidden flex flex-col relative bg-dark-background`}
      >
        <header className="header w-full m-0 sticky z-50 text-whites-light flex items-center justify-center">
          {header}
        </header>
        <div
          className={`dashboard-wrapper relative flex-grow pt-12 pb-6 px-16 3xl:px-40 3.5xl:px-52 4xl:px-60 5xl:px-96`}
        >
          <div className="dashboard-content grid grid-flow-col grid-cols-12 gap-4 min-h-screen flex-grow pb-16 items-start 2xl:gap-8 3xl:gap-10 3.5xl:gap-12">
            {children}
          </div>

          <hr className="self-center w-95 text-whites-light opacity-5 mt-6 mb-2.5" />
        </div>
        <div className="rounded-t-lg">
          <Copyright withLogo color="none" />
        </div>
      </div>
    </FadeAnimation>
  );
};

export default DashboardGridLayout;
