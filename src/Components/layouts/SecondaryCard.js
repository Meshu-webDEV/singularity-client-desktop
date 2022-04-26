import React from "react";
import Button from "../actions/Button";
import TinySquare from "./TinySquare";

const SecondaryCard = ({
  title,
  subtitle,
  children,
  nopadding = false,
  primaryAction,
  secondaryAction,
  className,
  TinySquareBg = "bg-dark-backgroundDarker",
}) => {
  return (
    <div
      className={`relative w-full h-auto bg-blacks-lighter rounded-sm shadow-sm flex flex-col space-y-5 ${
        nopadding ? "py-3.5" : "pt-3.5 pb-5 px-5"
      }  ${className}`}
    >
      {title && (
        <div className="flex space-x-1.5 pb-2 items-center pl-2.5">
          <span className="font-medium text-sm opacity-100 tracking-normal text-whites-light">
            {title}
          </span>
          <TinySquare size="medium" className={TinySquareBg} />
          <span className="text-2xs font-light tracking-wide text-whites-light opacity-70">
            {subtitle}
          </span>
        </div>
      )}
      <div>{children}</div>
      <div className="flex space-x-4 justify-center items-center self-end text-xs pt-5">
        <span className="opacity-90 text-xs pt-0.5">
          {secondaryAction && secondaryAction}
        </span>
        {primaryAction && primaryAction}
      </div>
    </div>
  );
};

export default SecondaryCard;
