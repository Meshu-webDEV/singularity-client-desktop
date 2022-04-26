import React, { useEffect } from "react";

// Router
import { Link, useHistory } from "react-router-dom";
import { useContext } from "react";

// Components
import MobileBaseLayout from "../../Components/layouts/MobileBaseLayout";
import LoadingWithDots from "../../Components/layouts/LoadingWithDots";
import Button from "../../Components/actions/Button";
import Hr from "../../Components/layouts/Hr";

// Context
import NewEventContext from "../../Context/New-event/NewEventContext";
import NavigateBack from "../../Components/actions/NavigateBack";

// Images
import ErrorArt from "../../Images/ErrorArt";
import SuccessArt from "../../Images/SuccessArt";
import Header from "../../Components/layouts/Header";
import { Fade, Slide } from "@material-ui/core";

const NewEventStatus = () => {
  const { createdEventId, isSubmitting, successfulSubmit } =
    useContext(NewEventContext);

  const renderStatus = () => {
    switch (isSubmitting) {
      case true:
        return (
          <div className="flex-grow h-full flex flex-col justify-center items-center text-2xs text-whites-light">
            <LoadingWithDots
              color="primary"
              size="2.5rem"
              label="Creating your event"
            />
          </div>
        );
      case false:
        if (successfulSubmit)
          return (
            <Success
              createdEventId={createdEventId}
              successfulSubmit={successfulSubmit}
              isSubmitting={isSubmitting}
            />
          );
        if (!successfulSubmit)
          return (
            <Error
              successfulSubmit={successfulSubmit}
              isSubmitting={isSubmitting}
            />
          );
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return renderStatus();
};

export default NewEventStatus;

// Sub components

const Success = ({ createdEventId, isSubmitting, successfulSubmit }) => {
  let history = useHistory();

  const handleGoToEvent = () => {
    return history.replace(`/${createdEventId}`);
  };

  return (
    <Fade timeout={300} in={!isSubmitting && successfulSubmit}>
      <div className="flex-grow px-6 pt-18 w-full flex flex-col justify-start items-center">
        <span className="text-whites-light text-lg mb-5 flex justify-center items-center space-x-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span className="pl-1 border-l-2 leading-4 tracking-tight font-light border-success">
            Event created successfully!
          </span>
        </span>
        <span className="">
          <div>
            <SuccessArt />
          </div>
        </span>

        <div className="pt-8 flex flex-col space-y-2">
          <span className="flex space-x-1 items-center text-xs font-medium text-whites-light">
            <span className="whitespace-nowrap">What's next?</span>
            <span className="pl-2 w-full">
              <Hr className="bg-whites-dark text-whites-dark opacity-25 w-full" />
            </span>
          </span>
          <div className="flex items-end space-x-5">
            <div className="relative">
              <Button
                className="text-whites-light text-xs font-medium px-2.5 py-1"
                onClick={handleGoToEvent}
                text="Event page"
                variant="success"
                icon={
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </>
                }
              />
              <div className="absolute font-light top-full py-0.5 text-2xs text-whites-light whitespace-nowrap opacity-60">
                Edit, manage & share
              </div>
            </div>

            <Link
              className="text-whites-light opacity-80 font-light text-xs flex space-x-1 justify-center items-center"
              to={"/dashboard"}
            >
              <span>Dashboard</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </Fade>
  );
};
const Error = ({ isSubmitting, successfulSubmit }) => {
  let history = useHistory();

  // handlers
  const handleGoHome = () => {
    return history.replace("/");
  };
  const handleGoEvents = () => {
    return history.replace("/explore");
  };

  return (
    <Fade timeout={300} in={!isSubmitting && !successfulSubmit}>
      <div className="flex-grow pb-10 h-full w-full flex flex-col justify-center items-center space-y-3">
        <span className="text-whites-light text-lg mb-5 flex justify-center items-center space-x-1">
          <span className="opacity-80">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </span>

          <span className="pl-1 border-l-2 leading-4 tracking-tight font-light border-primary-light">
            Error occurred
          </span>
        </span>
        <ErrorArt />
        <div className="text-2xs text-whites-dark flex flex-col justify-center items-center">
          <span>Error occurred while creating your event.. </span>
          <span>we deeply apologize for that.</span>
          <span>Please contact us, or try again later.</span>
        </div>
        <div className="pt-10 flex flex-col items-center space-y-3">
          <Hr className="w-9/12 text-whites-light opacity-20" />
          <div className="flex flex-col space-y-2 text-whites-dark">
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
    </Fade>
  );
};
