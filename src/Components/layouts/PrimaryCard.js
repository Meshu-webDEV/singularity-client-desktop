import React from "react";
import TinySquare from "./TinySquare";

const PrimaryCard = ({
  title,
  subtitle,
  variant = "success",
  children,
  nopadding = false,
  primaryAction,
  secondaryAction,
  className,
}) => {
  const determineVariantColors = () => {
    if (variant === "success") return "bg-success";
    if (variant === "error") return "bg-primary-light";
    if (variant === "dark") return "bg-dark-backgroundDarker";
    if (variant === "info") return "bg-info";
    if (variant === "none") return "bg-transparent";
  };

  return (
    <div
      className={`w-full h-auto bg-blacks-lighter rounded-b-2xl rounded-tr-2xl shadow-sm flex flex-col space-y-3 ${
        nopadding ? "py-3.5" : "p-3.5"
      }  ${className}`}
    >
      {title && (
        <div className="flex space-x-1.5 pb-2 items-center pl-2.5">
          <span className="font-semibold text-sm tracking-wide text-whites-light whitespace-nowrap">
            {title}
          </span>
          <TinySquare size="medium" className={determineVariantColors()} />
          <span className="text-2xs font-light tracking-tighter text-whites-light opacity-50">
            {subtitle}
          </span>
        </div>
      )}
      <div className="w-full">{children}</div>
      <div className="flex space-x-4 justify-center items-center self-end text-xs pt-4">
        <span className="opacity-75 text-xs pt-0.5">
          {secondaryAction && secondaryAction}
        </span>
        {primaryAction && primaryAction}
      </div>
    </div>
  );
};

export default PrimaryCard;
