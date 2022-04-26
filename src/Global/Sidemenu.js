import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";

// MUI
import Drawer from "@material-ui/core/Drawer";

// Context
import SidemenuContext from "../Context/Sidemenu/SidemenuContext";
import MobileLogo from "../Components/layouts/MobileLogo";
import Footer from "../Components/layouts/Footer";
import AuthContext from "../Context/Auth/AuthContext";
import Hr from "../Components/layouts/Hr";

export default function Sidemenu({ isSignedIn }) {
  //

  const history = useHistory();

  const { show, offSidemenu } = useContext(SidemenuContext);
  const { signout, authState } = useContext(AuthContext);

  const handleSignout = () => {
    signout();
    offSidemenu();
  };
  const handleSignin = () => {
    history.push("/join");
    offSidemenu();
  };
  const handleLogoClicked = () => {
    history.push("/");
    offSidemenu();
  };

  return (
    <div className="w-full">
      <Drawer open={show} onClose={() => offSidemenu()}>
        <div className="relative w-full h-full flex flex-col text-whites-light items-center flex-grow justify-between px-2">
          <div
            className="absolute top-6 text-whites-light  bg-dark-background shadow-xl rounded-full p-0.5"
            onClick={() => offSidemenu()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 pr-0.5"
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
          <div className="pt-20 w-full space-y-8 px-1.5 h-full flex flex-col justify-center ">
            <div onClick={handleLogoClicked}>
              <MobileLogo size="tiny" />
            </div>

            <div className="Sidemenu-list text-xs text-whites-light h-full items-center flex flex-col">
              <div className="flex flex-col">
                {/* Main navigators */}
                <div className="flex flex-col space-y-2 mb-8">
                  <Link
                    to="/dashboard/new-event"
                    className="border-l-2 border-whites-dark border-opacity-60 bg-dark-backgroundDarker shadow-md rounded-sm px-3 py-1"
                    onClick={() => offSidemenu()}
                  >
                    <div className="flex space-x-2 font-light justify-between items-center whitespace-nowrap">
                      <span>New Event</span>
                      <span>
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
                      </span>
                    </div>
                  </Link>
                  <Link
                    to="/explore"
                    className="border-l-2 border-whites-dark border-opacity-60 bg-dark-backgroundDarker shadow-md rounded-sm px-3 py-1"
                    onClick={() => offSidemenu()}
                  >
                    <div className="flex space-x-2 font-light justify-between items-center whitespace-nowrap">
                      <span>Explore Events</span>
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
                    </div>
                  </Link>
                  <Link
                    to="/templates"
                    className="border-l-2 border-whites-dark border-opacity-60 bg-dark-backgroundDarker shadow-md rounded-sm px-3 py-1"
                    onClick={() => offSidemenu()}
                  >
                    <div className="flex space-x-2 font-light justify-between items-center whitespace-nowrap">
                      <span>Explore Templates</span>
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                          <path
                            fillRule="evenodd"
                            d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </div>
                  </Link>
                </div>

                <Hr className="w-full self-start my-2 text-dark-backgroundDarker opacity-70" />
                {/* Sub navigators */}
                <div className="flex flex-col items-start space-y-3">
                  <Link
                    to="/dashboard"
                    className="w-full"
                    onClick={() => offSidemenu()}
                  >
                    <div className="flex space-x-1.5 font-light justify-start items-center p-0.5">
                      <span className="opacity-80">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                      <span>Profile</span>
                    </div>
                  </Link>

                  <div className="sidemenu-sub-list w-full flex flex-col space-y-0.5">
                    <Link to="/dashboard" onClick={() => offSidemenu()}>
                      <div className="flex space-x-1.5 font-light justify-start items-start p-0.5 ">
                        <span className="opacity-80">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                          </svg>
                        </span>
                        <span>Dashboard</span>
                      </div>
                    </Link>
                    {/* Sub-dashboard navigators */}
                    <div className="w-full text-2xs self-center flex flex-col pl-7 opacity-80 items-start space-y-0.5">
                      <Link
                        to="/dashboard/my-events"
                        onClick={() => offSidemenu()}
                      >
                        <div className="flex space-x-2 font-light justify-start items-start">
                          <span>My events</span>
                        </div>
                      </Link>
                      <Link
                        to="/dashboard/my-organization"
                        onClick={() => offSidemenu()}
                      >
                        <div className="flex space-x-2 font-light justify-start items-start">
                          <span>My organization</span>
                        </div>
                      </Link>
                      <Link
                        to="/dashboard/my-templates"
                        onClick={() => offSidemenu()}
                      >
                        <div className="flex space-x-2 font-light justify-start items-start">
                          <span>My templates</span>
                        </div>
                      </Link>
                      <Link
                        to="/dashboard/my-integrations"
                        onClick={() => offSidemenu()}
                      >
                        <div className="flex space-x-2 font-light justify-start items-start">
                          <span>My integrations</span>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-8 pb-6">
            {authState ? (
              <div onClick={handleSignout}>
                <div className="flex space-x-2 text-xs justify-center items-center -ml-3">
                  <span className="text-primary-dark opacity-90 transform rotate-180">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span>Sign-out</span>
                </div>
              </div>
            ) : (
              <div onClick={handleSignin}>
                <div className="flex space-x-2 text-xs justify-center items-center">
                  <span>Sign-in</span>
                  <span className="text-secondary-light opacity-90">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            )}

            <Footer />
          </div>
        </div>
      </Drawer>
    </div>
  );
}
