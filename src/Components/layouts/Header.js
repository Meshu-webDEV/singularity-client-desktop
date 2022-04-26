import React, { useCallback, useContext, useEffect, useRef } from "react";
import { useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";

// Context
import AuthContext from "../../Context/Auth/AuthContext";
import SidemenuContext from "../../Context/Sidemenu/SidemenuContext";

// Components
import Button from "../actions/Button";

// Images
import Menu from "../../Images/Menu";
import Input from "../forms/Input";
import { useMemo } from "react";
import { normalize } from "../../lib/utils";
import { indexOf } from "lodash";
import ButtonLink from "../actions/ButtonLink";
import LoadingWithDots from "./LoadingWithDots";

import { useKey } from "react-use";
import keyboardJS from "keyboardjs";

const Header = ({ isTransitional, searchVariant = "light" }) => {
  //

  const searchInputRef = useRef(null);
  const history = useHistory();
  const { pathname } = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchError, setSearchError] = useState("");
  const { setSidemenu } = useContext(SidemenuContext);
  const { authState } = useContext(AuthContext);

  // Handlers
  const handleOnChangeSearch = (value) => {
    if (searchError) setSearchError("");
    setSearchQuery(value);
  };
  const handleSubmitSearch = () => {
    if (!searchQuery) return setSearchError("Cannot be empty!");

    history.push(`/explore?q=${searchQuery}`);
  };

  // helpers
  const isLightVariant = () => searchVariant === "light";

  useEffect(() => {
    keyboardJS.bind("ctrl + /", (e) => {
      e.path[2].querySelector("#exploreSearch").focus();
    });
  }, [searchInputRef]);

  if (isTransitional)
    return (
      <nav className="nav w-full bg-dark-background shadow-sm py-6 flex items-center justify-between px-16 3xl:px-52">
        {/* Search bar */}
        {/* Logo & Links */}
        <div className="flex space-x-8 justify-center items-center">
          <Link to="/" className="transform scale-100 3xl:scale-110">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="153.184"
              height="24.714"
              viewBox="0 0 153.184 24.714"
            >
              <g
                id="singularity-logo"
                transform="translate(-749.717 -1021.107)"
              >
                <g id="Group_2011" data-name="Group 2011">
                  <g id="Component_1_3" data-name="Component 1 3">
                    <circle
                      id="Ellipse_57"
                      data-name="Ellipse 57"
                      cx="12.357"
                      cy="12.357"
                      r="12.357"
                      transform="translate(749.717 1021.108)"
                      fill="#0b0d13"
                    />
                    <path
                      id="Path_22"
                      data-name="Path 22"
                      d="M759.517,1033.431a2.6,2.6,0,0,0,1.938,2.516l-3.039,3.039a7.885,7.885,0,0,1-2.109-10.638,7.25,7.25,0,0,1,1.1-1.386,7.886,7.886,0,0,1,9.4-1.336l-5.264,5.264A2.6,2.6,0,0,0,759.517,1033.431Z"
                      fill="#21282f"
                    />
                    <g id="Group_1477" data-name="Group 1477">
                      <path
                        id="Path_23"
                        data-name="Path 23"
                        d="M768.03,1038.594a7.4,7.4,0,0,1-1.1,1.386,7.887,7.887,0,0,1-9.4,1.334l5.427-5.426a2.6,2.6,0,0,0-.031-4.939l2.993-2.993a7.455,7.455,0,0,1,1.01.851A7.883,7.883,0,0,1,768.03,1038.594Z"
                        fill="#21282f"
                      />
                    </g>
                    <circle
                      id="Ellipse_58"
                      data-name="Ellipse 58"
                      cx="1.31"
                      cy="1.31"
                      r="1.31"
                      transform="translate(760.764 1032.155)"
                      fill="#f10041"
                    />
                  </g>
                </g>
                <g id="SINGULARITY">
                  <g id="Group_2013" data-name="Group 2013">
                    <path
                      id="Path_575"
                      data-name="Path 575"
                      d="M791.24,1039.784a3.887,3.887,0,0,1-1.665-1.3,3.412,3.412,0,0,1-.63-2h2.7a1.746,1.746,0,0,0,.549,1.224,1.945,1.945,0,0,0,1.359.45,2.091,2.091,0,0,0,1.386-.423,1.376,1.376,0,0,0,.5-1.107,1.279,1.279,0,0,0-.342-.918,2.4,2.4,0,0,0-.855-.567,14.152,14.152,0,0,0-1.413-.459,15.133,15.133,0,0,1-1.989-.711,3.469,3.469,0,0,1-1.314-1.063,3.021,3.021,0,0,1-.549-1.9,3.4,3.4,0,0,1,.558-1.944,3.549,3.549,0,0,1,1.566-1.269,5.7,5.7,0,0,1,2.3-.441,5,5,0,0,1,3.159.945,3.5,3.5,0,0,1,1.341,2.637h-2.772a1.444,1.444,0,0,0-.549-1.072,2.074,2.074,0,0,0-1.359-.422,1.75,1.75,0,0,0-1.179.378,1.365,1.365,0,0,0-.441,1.1,1.135,1.135,0,0,0,.333.837,2.529,2.529,0,0,0,.828.54q.495.207,1.395.477a14.8,14.8,0,0,1,2,.719,3.608,3.608,0,0,1,1.332,1.08,3,3,0,0,1,.558,1.891,3.555,3.555,0,0,1-.522,1.872,3.692,3.692,0,0,1-1.53,1.377,5.218,5.218,0,0,1-2.394.513A5.969,5.969,0,0,1,791.24,1039.784Z"
                      fill="#f20a48"
                    />
                    <path
                      id="Path_576"
                      data-name="Path 576"
                      d="M802.751,1027.543v12.565h-2.52v-12.565Z"
                      fill="#f20a48"
                    />
                    <path
                      id="Path_577"
                      data-name="Path 577"
                      d="M815.98,1040.108h-2.52l-5.705-8.622v8.622h-2.52v-12.582h2.52l5.705,8.639v-8.639h2.52Z"
                      fill="#f20a48"
                    />
                    <path
                      id="Path_578"
                      data-name="Path 578"
                      d="M827.213,1031.324a2.947,2.947,0,0,0-1.189-1.206,3.609,3.609,0,0,0-1.763-.414,3.873,3.873,0,0,0-1.98.5,3.489,3.489,0,0,0-1.35,1.441,5.085,5.085,0,0,0,.008,4.356,3.512,3.512,0,0,0,1.378,1.44,4.058,4.058,0,0,0,2.052.5,3.559,3.559,0,0,0,2.358-.765,3.651,3.651,0,0,0,1.206-2.133h-4.32v-1.927h6.8v2.2a5.881,5.881,0,0,1-1.081,2.429,6.066,6.066,0,0,1-2.132,1.791,6.263,6.263,0,0,1-2.925.676,6.62,6.62,0,0,1-3.285-.819,5.968,5.968,0,0,1-2.3-2.277,7,7,0,0,1,0-6.633,5.957,5.957,0,0,1,2.3-2.286,7.018,7.018,0,0,1,6.957.215,5.291,5.291,0,0,1,2.16,2.908Z"
                      fill="#f20a48"
                    />
                    <path
                      id="Path_579"
                      data-name="Path 579"
                      d="M834.772,1027.543v7.777a2.666,2.666,0,0,0,.666,1.953,2.958,2.958,0,0,0,3.762,0,2.666,2.666,0,0,0,.666-1.953v-7.777H842.4v7.759a5.009,5.009,0,0,1-.693,2.709,4.4,4.4,0,0,1-1.854,1.665,5.886,5.886,0,0,1-2.583.558,5.721,5.721,0,0,1-2.546-.558,4.251,4.251,0,0,1-1.81-1.665,5.166,5.166,0,0,1-.666-2.709v-7.759Z"
                      fill="#f20a48"
                    />
                    <path
                      id="Path_580"
                      data-name="Path 580"
                      d="M847.354,1038.11h4.14v2h-6.66v-12.565h2.52Z"
                      fill="#f20a48"
                    />
                    <path
                      id="Path_581"
                      data-name="Path 581"
                      d="M860.8,1037.714h-5l-.828,2.394h-2.646l4.518-12.582h2.934l4.518,12.582h-2.664Zm-.684-2.016-1.818-5.256-1.818,5.256Z"
                      fill="#f20a48"
                    />
                    <path
                      id="Path_582"
                      data-name="Path 582"
                      d="M872.464,1040.108l-2.772-4.9H868.5v4.9h-2.52v-12.565H870.7a5.506,5.506,0,0,1,2.484.514,3.584,3.584,0,0,1,1.539,1.386,3.783,3.783,0,0,1,.513,1.953,3.741,3.741,0,0,1-.72,2.241,3.7,3.7,0,0,1-2.142,1.377l3.006,5.094Zm-3.96-6.786h2.106a2.106,2.106,0,0,0,1.53-.495,1.842,1.842,0,0,0,.5-1.377,1.756,1.756,0,0,0-.5-1.341,2.157,2.157,0,0,0-1.53-.477H868.5Z"
                      fill="#f20a48"
                    />
                    <path
                      id="Path_583"
                      data-name="Path 583"
                      d="M880.042,1027.543v12.565h-2.52v-12.565Z"
                      fill="#f20a48"
                    />
                    <path
                      id="Path_584"
                      data-name="Path 584"
                      d="M891.076,1027.543v2.035h-3.348v10.53h-2.52v-10.53H881.86v-2.035Z"
                      fill="#f20a48"
                    />
                    <path
                      id="Path_585"
                      data-name="Path 585"
                      d="M902.9,1027.543l-4.248,8.191v4.374h-2.52v-4.374l-4.265-8.191h2.843l2.7,5.743,2.681-5.743Z"
                      fill="#f20a48"
                    />
                  </g>
                </g>
              </g>
            </svg>
          </Link>
          <ul className="flex space-x-12 text-xs justify-self-start 3xl:text-sm">
            <Link
              to="/explore"
              className="flex justify-center items-center uppercase text-whites-dark hover:text-whites-light"
            >
              Events
            </Link>
            <Link
              to="/templates"
              className="flex justify-center items-center uppercase text-whites-dark hover:text-whites-light"
            >
              Templates
            </Link>
            <Link
              to="/templates"
              className="flex justify-center items-center uppercase text-whites-dark hover:text-whites-light"
            >
              Contact
            </Link>
          </ul>
        </div>

        {/* Search & join us */}
        <div className="flex space-x-5 items-center">
          <div className="relative">
            <div className="flex flex-col space-y-1">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmitSearch();
                }}
              >
                <Input
                  type="text"
                  placeholder="Search events.."
                  noLabel
                  size="large"
                  rounded="rounded-sm"
                  value={searchQuery}
                  onChange={(e) => handleOnChangeSearch(e.target.value)}
                  bg={
                    isLightVariant()
                      ? "bg-blacks-lighter"
                      : "bg-blacks-light bg-opacity-70"
                  }
                />
                {searchError ? (
                  <div className="absolute top-full text-3xs pl-1 text-primary-dark">
                    {searchError}
                  </div>
                ) : null}
              </form>
            </div>

            <button
              type="submit"
              onClick={handleSubmitSearch}
              className={`absolute transform right-1 top-1/2 -translate-y-1/2 rounded-sm ${
                isLightVariant()
                  ? "bg-dark-background"
                  : "bg-dark-backgroundDarker"
              } max-w-max h-6/7 p-1.5 flex justify-center items-center`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 opacity-80 "
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <ButtonLink
            to="/dashboard"
            variant="error"
            disabled
            text={
              <LoadingWithDots
                label="checking"
                flow="row"
                size="0.75rem"
                color="inherit"
              />
            }
            className="text-tiny max-h-6"
          />
        </div>
      </nav>
    );

  return (
    <nav className="nav w-full bg-dark-background shadow-sm py-6 flex items-center justify-between px-16 3xl:px-52">
      {/* Search bar */}
      {/* Logo & Links */}
      <div className="flex space-x-8 justify-center items-center">
        <Link to="/" className="transform scale-100 3xl:scale-110">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="153.184"
            height="24.714"
            viewBox="0 0 153.184 24.714"
          >
            <g id="singularity-logo" transform="translate(-749.717 -1021.107)">
              <g id="Group_2011" data-name="Group 2011">
                <g id="Component_1_3" data-name="Component 1 3">
                  <circle
                    id="Ellipse_57"
                    data-name="Ellipse 57"
                    cx="12.357"
                    cy="12.357"
                    r="12.357"
                    transform="translate(749.717 1021.108)"
                    fill="#0b0d13"
                  />
                  <path
                    id="Path_22"
                    data-name="Path 22"
                    d="M759.517,1033.431a2.6,2.6,0,0,0,1.938,2.516l-3.039,3.039a7.885,7.885,0,0,1-2.109-10.638,7.25,7.25,0,0,1,1.1-1.386,7.886,7.886,0,0,1,9.4-1.336l-5.264,5.264A2.6,2.6,0,0,0,759.517,1033.431Z"
                    fill="#21282f"
                  />
                  <g id="Group_1477" data-name="Group 1477">
                    <path
                      id="Path_23"
                      data-name="Path 23"
                      d="M768.03,1038.594a7.4,7.4,0,0,1-1.1,1.386,7.887,7.887,0,0,1-9.4,1.334l5.427-5.426a2.6,2.6,0,0,0-.031-4.939l2.993-2.993a7.455,7.455,0,0,1,1.01.851A7.883,7.883,0,0,1,768.03,1038.594Z"
                      fill="#21282f"
                    />
                  </g>
                  <circle
                    id="Ellipse_58"
                    data-name="Ellipse 58"
                    cx="1.31"
                    cy="1.31"
                    r="1.31"
                    transform="translate(760.764 1032.155)"
                    fill="#f10041"
                  />
                </g>
              </g>
              <g id="SINGULARITY">
                <g id="Group_2013" data-name="Group 2013">
                  <path
                    id="Path_575"
                    data-name="Path 575"
                    d="M791.24,1039.784a3.887,3.887,0,0,1-1.665-1.3,3.412,3.412,0,0,1-.63-2h2.7a1.746,1.746,0,0,0,.549,1.224,1.945,1.945,0,0,0,1.359.45,2.091,2.091,0,0,0,1.386-.423,1.376,1.376,0,0,0,.5-1.107,1.279,1.279,0,0,0-.342-.918,2.4,2.4,0,0,0-.855-.567,14.152,14.152,0,0,0-1.413-.459,15.133,15.133,0,0,1-1.989-.711,3.469,3.469,0,0,1-1.314-1.063,3.021,3.021,0,0,1-.549-1.9,3.4,3.4,0,0,1,.558-1.944,3.549,3.549,0,0,1,1.566-1.269,5.7,5.7,0,0,1,2.3-.441,5,5,0,0,1,3.159.945,3.5,3.5,0,0,1,1.341,2.637h-2.772a1.444,1.444,0,0,0-.549-1.072,2.074,2.074,0,0,0-1.359-.422,1.75,1.75,0,0,0-1.179.378,1.365,1.365,0,0,0-.441,1.1,1.135,1.135,0,0,0,.333.837,2.529,2.529,0,0,0,.828.54q.495.207,1.395.477a14.8,14.8,0,0,1,2,.719,3.608,3.608,0,0,1,1.332,1.08,3,3,0,0,1,.558,1.891,3.555,3.555,0,0,1-.522,1.872,3.692,3.692,0,0,1-1.53,1.377,5.218,5.218,0,0,1-2.394.513A5.969,5.969,0,0,1,791.24,1039.784Z"
                    fill="#f20a48"
                  />
                  <path
                    id="Path_576"
                    data-name="Path 576"
                    d="M802.751,1027.543v12.565h-2.52v-12.565Z"
                    fill="#f20a48"
                  />
                  <path
                    id="Path_577"
                    data-name="Path 577"
                    d="M815.98,1040.108h-2.52l-5.705-8.622v8.622h-2.52v-12.582h2.52l5.705,8.639v-8.639h2.52Z"
                    fill="#f20a48"
                  />
                  <path
                    id="Path_578"
                    data-name="Path 578"
                    d="M827.213,1031.324a2.947,2.947,0,0,0-1.189-1.206,3.609,3.609,0,0,0-1.763-.414,3.873,3.873,0,0,0-1.98.5,3.489,3.489,0,0,0-1.35,1.441,5.085,5.085,0,0,0,.008,4.356,3.512,3.512,0,0,0,1.378,1.44,4.058,4.058,0,0,0,2.052.5,3.559,3.559,0,0,0,2.358-.765,3.651,3.651,0,0,0,1.206-2.133h-4.32v-1.927h6.8v2.2a5.881,5.881,0,0,1-1.081,2.429,6.066,6.066,0,0,1-2.132,1.791,6.263,6.263,0,0,1-2.925.676,6.62,6.62,0,0,1-3.285-.819,5.968,5.968,0,0,1-2.3-2.277,7,7,0,0,1,0-6.633,5.957,5.957,0,0,1,2.3-2.286,7.018,7.018,0,0,1,6.957.215,5.291,5.291,0,0,1,2.16,2.908Z"
                    fill="#f20a48"
                  />
                  <path
                    id="Path_579"
                    data-name="Path 579"
                    d="M834.772,1027.543v7.777a2.666,2.666,0,0,0,.666,1.953,2.958,2.958,0,0,0,3.762,0,2.666,2.666,0,0,0,.666-1.953v-7.777H842.4v7.759a5.009,5.009,0,0,1-.693,2.709,4.4,4.4,0,0,1-1.854,1.665,5.886,5.886,0,0,1-2.583.558,5.721,5.721,0,0,1-2.546-.558,4.251,4.251,0,0,1-1.81-1.665,5.166,5.166,0,0,1-.666-2.709v-7.759Z"
                    fill="#f20a48"
                  />
                  <path
                    id="Path_580"
                    data-name="Path 580"
                    d="M847.354,1038.11h4.14v2h-6.66v-12.565h2.52Z"
                    fill="#f20a48"
                  />
                  <path
                    id="Path_581"
                    data-name="Path 581"
                    d="M860.8,1037.714h-5l-.828,2.394h-2.646l4.518-12.582h2.934l4.518,12.582h-2.664Zm-.684-2.016-1.818-5.256-1.818,5.256Z"
                    fill="#f20a48"
                  />
                  <path
                    id="Path_582"
                    data-name="Path 582"
                    d="M872.464,1040.108l-2.772-4.9H868.5v4.9h-2.52v-12.565H870.7a5.506,5.506,0,0,1,2.484.514,3.584,3.584,0,0,1,1.539,1.386,3.783,3.783,0,0,1,.513,1.953,3.741,3.741,0,0,1-.72,2.241,3.7,3.7,0,0,1-2.142,1.377l3.006,5.094Zm-3.96-6.786h2.106a2.106,2.106,0,0,0,1.53-.495,1.842,1.842,0,0,0,.5-1.377,1.756,1.756,0,0,0-.5-1.341,2.157,2.157,0,0,0-1.53-.477H868.5Z"
                    fill="#f20a48"
                  />
                  <path
                    id="Path_583"
                    data-name="Path 583"
                    d="M880.042,1027.543v12.565h-2.52v-12.565Z"
                    fill="#f20a48"
                  />
                  <path
                    id="Path_584"
                    data-name="Path 584"
                    d="M891.076,1027.543v2.035h-3.348v10.53h-2.52v-10.53H881.86v-2.035Z"
                    fill="#f20a48"
                  />
                  <path
                    id="Path_585"
                    data-name="Path 585"
                    d="M902.9,1027.543l-4.248,8.191v4.374h-2.52v-4.374l-4.265-8.191h2.843l2.7,5.743,2.681-5.743Z"
                    fill="#f20a48"
                  />
                </g>
              </g>
            </g>
          </svg>
        </Link>
        <ul className="flex space-x-12 text-xs justify-self-start 3xl:text-sm">
          <Link
            to="/explore"
            className="flex justify-center items-center uppercase text-whites-dark hover:text-whites-light"
          >
            Events
          </Link>
          <Link
            to="/templates"
            className="flex justify-center items-center uppercase text-whites-dark hover:text-whites-light"
          >
            Templates
          </Link>
        </ul>
      </div>

      {/* Search & join us */}
      <div className="flex space-x-5 items-center">
        <div className="relative">
          <div className="flex flex-col space-y-1">
            <form
              className="flex space-x-2 justify-center items-center"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmitSearch();
              }}
            >
              <Input
                id="exploreSearch"
                type="text"
                placeholder="Search events.."
                noLabel
                size="large"
                rounded="rounded-sm"
                innerRef={searchInputRef}
                value={searchQuery}
                onChange={(e) => handleOnChangeSearch(e.target.value)}
                bg={
                  isLightVariant()
                    ? "bg-blacks-lighter"
                    : "bg-blacks-light bg-opacity-70"
                }
              />
              {searchError ? (
                <div className="absolute top-full text-3xs pl-1 text-primary-dark">
                  {searchError}
                </div>
              ) : null}
            </form>
          </div>
          <div className="absolute transform right-1 top-1/2 -translate-y-1/2 flex space-x-1 justify-center items-center">
            <div
              className={`text-whites-dark text-2xs italic rounded-md bg-dark-backgroundDarker bg-opacity-30 shadow-sm max-w-max h-6/7 px-2 py-2 flex justify-center items-center`}
            >
              {/* <span className="font-sans -mt-1 px-0.5 leading-none">(</span> */}
              <span className="leading-none -mt-1 pt-0.5 font-medium">
                Ctrl +
              </span>
              <span className="font-sans -mt-1 px-1 leading-none font-medium">
                /
              </span>
              {/* <span className="font-sans -mt-1 px-0.5 leading-none">)</span> */}
            </div>
          </div>
        </div>
        <ButtonLink
          to="/dashboard"
          variant="error"
          text={authState ? "DASHBOARD" : "JOIN US!"}
          className="text-tiny max-h-6"
        />
      </div>
    </nav>
  );
};

export default Header;
