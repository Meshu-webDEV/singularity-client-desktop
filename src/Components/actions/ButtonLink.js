import React from "react";
import { Link } from "react-router-dom";

const ButtonLink = ({
  href = "",
  padding = "default",
  text,
  icon = null,
  variant = "default",
  type = "button",
  outlined = false,
  textOnly = false,
  iconOnly = false,
  className,
  ...props
}) => {
  // Helpers
  const determinePadding = () => {
    if (padding === "default") return "px-3.5 py-1";
    if (padding === "dense") return "px-1 py-0.5";
  };

  const determineSpacing = () => {
    if (padding === "default") return "space-x-2";
    if (padding === "dense") return "space-x-1";
  };

  const determineRounding = () => {
    if (padding === "default") return "rounded-md";
    if (padding === "dense") return "rounded-sm";
  };

  if (textOnly)
    return (
      <Link
        to={href}
        type={type}
        className={`flex justify-center items-center py-1 space-x-1.5 ${className}`}
        {...props}
      >
        <span className="">{text}</span>
        {icon && (
          <span className="flex justify-center items-center transform scale-95">
            {icon}
          </span>
        )}
      </Link>
    );

  if (iconOnly)
    switch (variant) {
      case "success":
        return (
          <Link
            to={href}
            type={type}
            className={`flex justify-center items-center px-1.5 py-0.5 rounded-sm shadow-md filter hover:shadow-lg hover:brightness-125 bg-secondary-light text-whites-light ${className}`}
            {...props}
          >
            <span className="flex justify-center items-center transform scale-95">
              {icon}
            </span>
          </Link>
        );
      case "info":
        return (
          <Link
            to={href}
            type={type}
            className={`flex justify-center items-center px-1.5 py-0.5 rounded-sm shadow-md filter hover:shadow-lg hover:brightness-125 bg-info text-whites-light ${className}`}
            {...props}
          >
            <span className="flex justify-center items-center transform scale-95">
              {icon}
            </span>
          </Link>
        );
      case "error":
        return (
          <Link
            to={href}
            type={type}
            className={`flex justify-center items-center px-1.5 py-0.5 rounded-sm shadow-md filter hover:shadow-lg hover:brightness-125 bg-primary-dark text-whites-light ${className}`}
            {...props}
          >
            <span className="flex justify-center items-center transform scale-95">
              {icon}
            </span>
          </Link>
        );
      case "warning":
        return (
          <Link
            to={href}
            type={type}
            className={`flex justify-center items-center px-1.5 py-0.5 rounded-sm shadow-md filter hover:shadow-lg hover:brightness-125 bg-warning text-whites-light ${className}`}
            {...props}
          >
            <span className="flex justify-center items-center transform scale-95">
              {icon}
            </span>
          </Link>
        );
      case "dark":
        return (
          <Link
            to={href}
            type={type}
            className={`flex justify-center items-center px-1.5 py-0.5 rounded-sm shadow-md filter hover:shadow-lg hover:brightness-125 bg-blacks-dark text-whites-light ${className}`}
            {...props}
          >
            <span className="flex justify-center items-center transform scale-95">
              {icon}
            </span>
          </Link>
        );
      case "light":
        return (
          <Link
            to={href}
            type={type}
            className={`flex justify-center items-center px-1.5 py-0.5 rounded-sm shadow-md filter hover:shadow-lg hover:brightness-125 bg-grays-light text-whites-light ${className}`}
            {...props}
          >
            <span className="flex justify-center items-center transform scale-95">
              {icon}
            </span>
          </Link>
        );
      case "none":
        return (
          <Link
            to={href}
            type={type}
            className={`flex justify-center items-center px-1.5 py-0.5 ${className}`}
            {...props}
          >
            <span className="flex justify-center items-center transform scale-95">
              {icon}
            </span>
          </Link>
        );
    }

  switch (variant) {
    case "success":
      if (outlined)
        return (
          <Link
            to={href}
            type={type}
            className={`flex justify-center items-center ${determinePadding()} ${determineRounding()} shadow-md filter hover:shadow-lg hover:brightness-125 ${determineSpacing()} border-2  border-secondary-light  ${className}`}
            {...props}
          >
            <span className="">{text}</span>
            {icon && (
              <span className="flex justify-center items-center transform scale-95">
                {icon}
              </span>
            )}
          </Link>
        );
      return (
        <Link
          to={href}
          type={type}
          className={`flex justify-center items-center ${determinePadding()} ${determineRounding()} shadow-md filter hover:shadow-lg hover:brightness-125 ${determineSpacing()} bg-secondary-light text-whites-light ${className}`}
          {...props}
        >
          <span className="text-blacks-dark font-medium leading-none">
            {text}
          </span>
          {icon && (
            <span className="flex justify-center items-center transform scale-95 text-blacks-dark">
              {icon}
            </span>
          )}
        </Link>
      );

    case "warning":
      if (outlined)
        return (
          <Link
            to={href}
            type={type}
            className={`flex justify-center items-center ${determinePadding()} ${determineRounding()} shadow-md filter hover:shadow-lg hover:brightness-125 ${determineSpacing()} border-2  border-warning ${className}`}
            {...props}
          >
            <span className="">{text}</span>
            {icon && (
              <span className="flex justify-center items-center transform scale-95">
                {icon}
              </span>
            )}
          </Link>
        );
      return (
        <Link
          to={href}
          type={type}
          className={`flex justify-center items-center ${determinePadding()} ${determineRounding()} shadow-md filter hover:shadow-lg hover:brightness-125 ${determineSpacing()} bg-warning ${className}`}
          {...props}
        >
          <span className="">{text}</span>
          {icon && (
            <span className="flex justify-center items-center transform scale-95">
              {icon}
            </span>
          )}
        </Link>
      );

    case "error":
      if (outlined)
        return (
          <Link
            to={href}
            type={type}
            className={`flex justify-center items-center ${determinePadding()} ${determineRounding()} shadow-md filter hover:shadow-lg hover:brightness-125 ${determineSpacing()} border-2 border-primary-light ${className}`}
            {...props}
          >
            <span className="">{text}</span>
            {icon && (
              <span className="flex justify-center items-center transform scale-95">
                {icon}
              </span>
            )}
          </Link>
        );
      return (
        <Link
          to={href}
          type={type}
          className={`flex justify-center items-center text-whites-light ${determinePadding()} ${determineRounding()} shadow-md filter hover:shadow-lg hover:brightness-125 ${determineSpacing()} bg-primary-light ${className}`}
          {...props}
        >
          <span className="">{text}</span>
          {icon && (
            <span className="flex justify-center items-center transform scale-95">
              {icon}
            </span>
          )}
        </Link>
      );

    case "info":
      if (outlined)
        return (
          <Link
            to={href}
            type={type}
            className={`flex justify-center items-center ${determinePadding()} ${determineRounding()} shadow-md filter hover:shadow-lg hover:brightness-125 ${determineSpacing()} border-2  border-info ${className}`}
            {...props}
          >
            <span className="">{text}</span>
            {icon && (
              <span className="flex justify-center items-center transform scale-95">
                {icon}
              </span>
            )}
          </Link>
        );
      return (
        <Link
          to={href}
          type={type}
          className={`flex justify-center items-center ${determinePadding()} ${determineRounding()} shadow-md filter hover:shadow-lg hover:brightness-125 ${determineSpacing()} bg-info ${className}`}
          {...props}
        >
          <span className="">{text}</span>
          {icon && (
            <span className="flex justify-center items-center transform scale-95">
              {icon}
            </span>
          )}
        </Link>
      );

    case "dark":
      if (outlined)
        return (
          <Link
            to={href}
            type={type}
            className={`flex justify-center items-center ${determinePadding()} ${determineRounding()} shadow-md filter hover:shadow-lg hover:brightness-125 ${determineSpacing()} border-2  border-blacks-dark ${className}`}
            {...props}
          >
            <span className="">{text}</span>
            {icon && (
              <span className="flex justify-center items-center transform scale-95">
                {icon}
              </span>
            )}
          </Link>
        );
      return (
        <Link
          to={href}
          type={type}
          className={`flex justify-center items-center ${determinePadding()} ${determineRounding()} shadow-md filter hover:shadow-lg hover:brightness-125 ${determineSpacing()} bg-blacks-dark ${className}`}
          {...props}
        >
          <span className="">{text}</span>
          {icon && (
            <span className="flex justify-center items-center transform scale-95">
              {icon}
            </span>
          )}
        </Link>
      );

    case "light":
      if (outlined)
        return (
          <Link
            to={href}
            type={type}
            className={`flex justify-center items-center ${determineRounding()} shadow-md filter hover:shadow-lg hover:brightness-125 ${determineSpacing()} border-2  border-grays-light ${className}`}
            {...props}
          >
            <span className="">{text}</span>
            {icon && (
              <span className="flex justify-center items-center transform scale-95">
                {icon}
              </span>
            )}
          </Link>
        );
      return (
        <Link
          to={href}
          type={type}
          className={`flex justify-center items-center ${determineRounding()} shadow-md filter hover:shadow-lg hover:brightness-125 ${determineSpacing()} bg-grays-light ${className}`}
          {...props}
        >
          <span className="">{text}</span>
          {icon && (
            <span className="flex justify-center items-center transform scale-95">
              {icon}
            </span>
          )}
        </Link>
      );

    default:
      break;
  }

  return (
    <Link
      to={href}
      type={type}
      className={`flex justify-center items-center ${determinePadding()} ${determineRounding()} shadow-md filter hover:shadow-lg hover:brightness-125 ${determineSpacing()} bg-secondary-light  ${className}`}
      {...props}
    >
      <span className="font-medium leading-none">{text}</span>
      {icon && (
        <span className="flex justify-center items-center transform scale-95">
          {icon}
        </span>
      )}
    </Link>
  );
};

export default ButtonLink;
