import React from "react";
import { CircularProgress } from "@material-ui/core";
import { Tween } from "react-gsap";

const LoadingWithDots = ({
  size = "2rem",
  color = "primary",
  label = "Loading",
  flow = "col",
  className = "",
  logo = false,
}) => {
  switch (flow) {
    case "col":
      return (
        <div
          className={`flex flex-col justify-center items-center ${
            logo ? "space-y-4" : "space-y-2"
          } uppercase ${className}`}
        >
          {logo ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={size}
              className="rotate-scale-up"
              viewBox="0 0 800 800"
            >
              <g id="Logo" transform="translate(-16765.047 -1276.012)">
                <circle
                  id="Ellipse_57"
                  data-name="Ellipse 57"
                  cx="400"
                  cy="400"
                  r="400"
                  transform="translate(16765.047 1276.012)"
                  fill="#0b0d13"
                />
                <g id="blades" transform="translate(17018.063 1497.667)">
                  <path
                    id="Path_23"
                    data-name="Path 23"
                    d="M1385.311,612.786a237.7,237.7,0,0,1-35.511,44.849c-82.422,82.671-207.082,96.882-304.27,43.174l175.685-175.623a84.306,84.306,0,0,0-1-159.86l96.876-96.876a242.142,242.142,0,0,1,32.707,27.536A255.19,255.19,0,0,1,1385.311,612.786Z"
                    transform="translate(-1045.53 -268.45)"
                    fill="#21282f"
                  />
                  <path
                    id="Path_22"
                    data-name="Path 22"
                    d="M1176.043,535.62a84.245,84.245,0,0,0,62.736,81.432l-98.371,98.377a250.365,250.365,0,0,1-32.644-27.543c-86.1-86.1-98.06-218.235-35.511-316.793a237.546,237.546,0,0,1,35.511-44.856c82.359-82.671,207.083-96.938,304.27-43.236L1241.645,453.391A84.37,84.37,0,0,0,1176.043,535.62Z"
                    transform="translate(-1111.832 -358.402)"
                    fill="#21282f"
                  />
                </g>
                <circle
                  id="Ellipse_58"
                  data-name="Ellipse 58"
                  cx="42.393"
                  cy="42.393"
                  r="42.393"
                  transform="translate(17122.65 1633.617)"
                  fill="#f10041"
                />
              </g>
            </svg>
          ) : (
            <CircularProgress size={size} color={color} />
          )}
          <span className="opacity-80">
            {label}
            <Tween
              duration={0.8}
              from={{ opacity: 0 }}
              to={{ opacity: 1 }}
              repeat={-1}
              stagger={0.5}
              ease="elastic.out(1,0.75)"
            >
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </Tween>
          </span>
        </div>
      );
    case "row":
      return (
        <div
          className={`flex justify-center items-center space-x-2 uppercase ${className}`}
        >
          <span
            className={`px-0.5 flex justify-center items-center -mr-0.5 ${
              logo && "pb-2"
            }`}
          >
            {logo ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={size}
                className="rotate-scale-up"
                viewBox="0 0 800 800"
              >
                <g id="Logo" transform="translate(-16765.047 -1276.012)">
                  <circle
                    id="Ellipse_57"
                    data-name="Ellipse 57"
                    cx="400"
                    cy="400"
                    r="400"
                    transform="translate(16765.047 1276.012)"
                    fill="#0b0d13"
                  />
                  <g id="blades" transform="translate(17018.063 1497.667)">
                    <path
                      id="Path_23"
                      data-name="Path 23"
                      d="M1385.311,612.786a237.7,237.7,0,0,1-35.511,44.849c-82.422,82.671-207.082,96.882-304.27,43.174l175.685-175.623a84.306,84.306,0,0,0-1-159.86l96.876-96.876a242.142,242.142,0,0,1,32.707,27.536A255.19,255.19,0,0,1,1385.311,612.786Z"
                      transform="translate(-1045.53 -268.45)"
                      fill="#21282f"
                    />
                    <path
                      id="Path_22"
                      data-name="Path 22"
                      d="M1176.043,535.62a84.245,84.245,0,0,0,62.736,81.432l-98.371,98.377a250.365,250.365,0,0,1-32.644-27.543c-86.1-86.1-98.06-218.235-35.511-316.793a237.546,237.546,0,0,1,35.511-44.856c82.359-82.671,207.083-96.938,304.27-43.236L1241.645,453.391A84.37,84.37,0,0,0,1176.043,535.62Z"
                      transform="translate(-1111.832 -358.402)"
                      fill="#21282f"
                    />
                  </g>
                  <circle
                    id="Ellipse_58"
                    data-name="Ellipse 58"
                    cx="42.393"
                    cy="42.393"
                    r="42.393"
                    transform="translate(17122.65 1633.617)"
                    fill="#f10041"
                  />
                </g>
              </svg>
            ) : (
              <CircularProgress size={size} color={color} />
            )}
          </span>
          <span className="opacity-80">
            {label}
            <Tween
              duration={0.8}
              from={{ opacity: 0 }}
              to={{ opacity: 1 }}
              repeat={-1}
              stagger={0.5}
              ease="elastic.out(1,0.75)"
            >
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </Tween>
          </span>
        </div>
      );
    default:
      return (
        <div
          className={`flex flex-col justify-center items-center space-y-2 ${className}`}
        >
          {logo ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={size}
              className="rotate-scale-up"
              viewBox="0 0 800 800"
            >
              <g id="Logo" transform="translate(-16765.047 -1276.012)">
                <circle
                  id="Ellipse_57"
                  data-name="Ellipse 57"
                  cx="400"
                  cy="400"
                  r="400"
                  transform="translate(16765.047 1276.012)"
                  fill="#0b0d13"
                />
                <g id="blades" transform="translate(17018.063 1497.667)">
                  <path
                    id="Path_23"
                    data-name="Path 23"
                    d="M1385.311,612.786a237.7,237.7,0,0,1-35.511,44.849c-82.422,82.671-207.082,96.882-304.27,43.174l175.685-175.623a84.306,84.306,0,0,0-1-159.86l96.876-96.876a242.142,242.142,0,0,1,32.707,27.536A255.19,255.19,0,0,1,1385.311,612.786Z"
                    transform="translate(-1045.53 -268.45)"
                    fill="#21282f"
                  />
                  <path
                    id="Path_22"
                    data-name="Path 22"
                    d="M1176.043,535.62a84.245,84.245,0,0,0,62.736,81.432l-98.371,98.377a250.365,250.365,0,0,1-32.644-27.543c-86.1-86.1-98.06-218.235-35.511-316.793a237.546,237.546,0,0,1,35.511-44.856c82.359-82.671,207.083-96.938,304.27-43.236L1241.645,453.391A84.37,84.37,0,0,0,1176.043,535.62Z"
                    transform="translate(-1111.832 -358.402)"
                    fill="#21282f"
                  />
                </g>
                <circle
                  id="Ellipse_58"
                  data-name="Ellipse 58"
                  cx="42.393"
                  cy="42.393"
                  r="42.393"
                  transform="translate(17122.65 1633.617)"
                  fill="#f10041"
                />
              </g>
            </svg>
          ) : (
            <CircularProgress size={size} color={color} />
          )}
          <span className="opacity-80">
            {label}
            <Tween
              duration={0.8}
              from={{ opacity: 0 }}
              to={{ opacity: 1 }}
              repeat={-1}
              stagger={0.5}
              ease="elastic.out(1,0.75)"
            >
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </Tween>
          </span>
        </div>
      );
      break;
  }
};

export default LoadingWithDots;
