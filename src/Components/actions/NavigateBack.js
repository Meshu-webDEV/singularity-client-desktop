import React from "react";
import { useHistory } from "react-router-dom";

const NavigateBack = ({ path = "", label = "", disabled = false }) => {
  let history = useHistory();

  // handlers
  const handleGoBack = () => {
    if (cantGoBack()) return;

    if (!path) history.goBack();
    if (path) history.replace(path);
  };

  // helpers
  const cantGoBack = () => window.history.length < 2;

  return (
    <div
      onClick={disabled ? () => null : handleGoBack}
      className={`py-1 self-start ml-2.5 mb-4 mt-1.5 w-max ${
        cantGoBack() && "opacity-40"
      }`}
    >
      <div className="flex text-whites-light space-x-2 items-center justify-center">
        <span className="w-5 h-5 flex justify-center items-center bg-dark-backgroundDarker rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </span>
        <span className="text-xs tracking-tight">{label ? label : "Back"}</span>
      </div>
    </div>
  );
};

export default NavigateBack;
