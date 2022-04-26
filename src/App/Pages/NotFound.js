import React from "react";
import { Tween } from "react-gsap";
import { useHistory } from "react-router-dom";

// Components
import Button from "../../Components/actions/Button";
import Header from "../../Components/layouts/Header";
import MobileBaseLayout from "../../Components/layouts/MobileBaseLayout";

// Images
import LogoBR from "../../Images/LogoBR";

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
    <MobileBaseLayout header={<Header />} navigation={false}>
      <div className="flex-grow w-full relative flex flex-col space-y-6 items-center justify-start px-4 pt-10 pb-4">
        <div className="relative text-whites-light">
          <Tween to={{ rotation: 360 }} duration={150} repeat={-1} ease="none">
            <div className="opacity-25">
              <LogoBR w="220" h="220" />
            </div>
          </Tween>
          <div className="absolute left-1/2 transform -translate-x-1/2 whitespace-nowrap translate-y-3/4 bottom-1/2 flex items-end space-x-0.5 justify-center">
            <span className="text-4xl font-light">
              <div className="-ml-4 font-medium">Sorry..</div>
              <div className="-ml-2">Page</div> Not found
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-primary-light mb-1.5"></div>
          </div>
          <div className="flex flex-col space-y-2 mt-12">
            <span className="text-2xs">
              You can go back home, or explore ongoing events
            </span>
            <div className="flex space-x-3 justify-center text-xs">
              <Button
                className="text-xs text-whites-light"
                text="Dashboard"
                onClick={handleGoHome}
                icon={
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </>
                }
                outlined={false}
                variant="dark"
              />
              <Button
                className="text-whites-light font-light tracking-tight opacity-90"
                onClick={handleGoEvents}
                textOnly
                text="Events"
                icon={
                  <>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </MobileBaseLayout>
  );
};

export default NotFound;
