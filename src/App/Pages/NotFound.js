import React from "react";
import { Tween } from "react-gsap";
import { useHistory } from "react-router-dom";

// Components
import Button from "../../Components/actions/Button";
import ButtonLink from "../../Components/actions/ButtonLink";
import Header from "../../Components/layouts/Header";
import MobileBaseLayout from "../../Components/layouts/MobileBaseLayout";

// Images
import LogoBR from "../../Images/LogoBR";
import NotFoundArt from "../../Images/NotFoundArt";

const NotFound = () => {
  let history = useHistory();

  // handlers
  const handleGoHome = () => {
    return history.replace("/");
  };
  const handleGoEvents = () => {
    return history.replace("/explore");
  };
  return (
    <MobileBaseLayout header={<Header />}>
      <div className="flex-grow w-full relative flex flex-col space-y-6 items-center justify-start px-4 pb-4">
        <div className="relative text-whites-light">
          <NotFoundArt className="transform scale-90 -mt-16" />
          <div className="flex flex-col space-y-2 -mt-16">
            <div className="flex space-x-6 justify-center text-xs">
              <ButtonLink
                className="text-lg text-whites-light px-2.5 py-1"
                text="Dashboard"
                variant="dark"
                href="/dashboard"
              />
              <ButtonLink
                href="/explore"
                className="text-whites-light text-sm font-light tracking-tight opacity-90"
                textOnly
                text="Explore events"
              />
            </div>
          </div>
        </div>
      </div>
    </MobileBaseLayout>
  );
};

export default NotFound;
