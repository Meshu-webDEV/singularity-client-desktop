import { useEffect } from "react";
import { useField, useFormikContext } from "formik";

const Input = ({
  size = "full",
  bg = "bg-dark-background",
  rounded = "rounded-lg",
  password = false,
  noLabel = false,
  label,
  secondaryLabel,
  className,
  type = "text",
  innerRef = null,
  ...props
}) => {
  if (noLabel) {
    if (size === "large")
      return (
        <div
          className={`relative flex flex-col text-whites-light space-y-1 ${className}`}
        >
          <input
            className={`${bg} w-48 text-xs focus:ring-transparent ${rounded} focus:ring-offset-transparent-dark border-transparent  focus:border-opacity-60 focus:border-dark-backgroundDarker placeholder-whites-dark placeholder-opacity-20 4xs:w-52 3xl:text-tiny 3xl:w-72`}
            type={type}
            ref={innerRef}
            {...props}
          />
        </div>
      );
    if (size === "medium")
      return (
        <div
          className={`flex flex-col text-whites-light space-y-1 ${className}`}
        >
          <input
            className={`${bg} w-36 text-xs  focus:ring-transparent ${rounded}  focus:ring-offset-transparent-dark border-transparent  focus:border-opacity-60  focus:border-dark-backgroundDarker placeholder-whites-dark placeholder-opacity-20`}
            type={type}
            ref={innerRef}
            {...props}
          />
        </div>
      );
    if (size === "small")
      return (
        <div
          className={`flex flex-col text-whites-light space-y-1 ${className}`}
        >
          <input
            className={`${bg} w-16 text-xs  focus:ring-transparent ${rounded}   focus:ring-offset-transparent-dark border-transparent  focus:border-opacity-60  focus:border-dark-backgroundDarker placeholder-whites-dark placeholder-opacity-20`}
            type={type}
            ref={innerRef}
            {...props}
          />
        </div>
      );

    if (size === "tiny")
      return (
        <div
          className={`items-center flex flex-col text-whites-light space-y-1 ${className}`}
        >
          <input
            className={`${bg} w-14 focus:px-1.5 focus:py-1 focus:w-14 border text-center border-info border-opacity-5 text-xs px-1.5 py-1  focus:ring-transparent rounded-md  focus:ring-offset-transparent-dark  focus:border-opacity-60  focus:border-dark-backgroundDarker placeholder-whites-dark placeholder-opacity-20`}
            type={type}
            ref={innerRef}
            {...props}
          />
        </div>
      );

    return (
      <div className={`flex flex-col text-whites-light space-y-1 ${className}`}>
        <input
          className={`${bg} w-36 text-xs  focus:ring-transparent ${rounded}   focus:ring-offset-transparent-dark border-transparent  focus:border-opacity-60  focus:border-dark-backgroundDarker placeholder-whites-dark placeholder-opacity-20`}
          type={type}
          ref={innerRef}
          {...props}
        />
      </div>
    );
  }

  // With label

  if (size === "full")
    return (
      <div
        className={`w-full flex flex-col flex-grow text-whites-light space-y-1 ${className}`}
      >
        <div className="w-full flex items-center">
          <label
            className="pl-1 text-xs capitalize"
            htmlFor={props.id || props.name}
          >
            {label}
          </label>
          <span className="text-2xs font-light tracking-tight opacity-60 p-1">
            {secondaryLabel}
          </span>
        </div>
        <input
          className={`w-full text-xs  focus:ring-transparent ${rounded}  focus:ring-offset-transparent border-transparent  focus:border-opacity-60  focus:border-dark-backgroundDarker placeholder-whites-dark placeholder-opacity-20 ${bg}`}
          type={type}
          ref={innerRef}
          {...props}
        />
      </div>
    );

  if (size === "large")
    return (
      <div className={`flex flex-col text-whites-light space-y-1 ${className}`}>
        <div className="w-full flex items-center">
          <label
            className="pl-1 text-xs capitalize"
            htmlFor={props.id || props.name}
          >
            {label}
          </label>
          <span className="text-2xs font-light tracking-tight opacity-60 p-1">
            {secondaryLabel}
          </span>
        </div>
        <input
          className={`w-48 4xs:w-52 text-xs focus:ring-transparent ${rounded}   focus:ring-offset-transparent-dark border-transparent  focus:border-opacity-60  focus:border-dark-backgroundDarker placeholder-whites-dark placeholder-opacity-20 ${bg}`}
          type={type}
          ref={innerRef}
          {...props}
        />
      </div>
    );

  if (size === "medium")
    return (
      <div className={`flex flex-col text-whites-light space-y-1 ${className}`}>
        <div className="w-full flex">
          <label
            className="pl-1 text-xs capitalize"
            htmlFor={props.id || props.name}
          >
            {label}
          </label>
          <span className="text-2xs font-light tracking-tight opacity-60 p-1">
            {secondaryLabel}
          </span>
        </div>
        <input
          className={`w-36 text-xs  focus:ring-transparent ${rounded}   focus:ring-offset-transparent-dark border-transparent  focus:border-opacity-60  focus:border-dark-backgroundDarker placeholder-whites-dark placeholder-opacity-20 ${bg}`}
          type={type}
          ref={innerRef}
          {...props}
        />
      </div>
    );

  if (size === "small")
    return (
      <div className={`flex flex-col text-whites-light space-y-1 ${className}`}>
        <div className="w-full flex">
          <label
            className="pl-1 text-xs capitalize"
            htmlFor={props.id || props.name}
          >
            {label}
          </label>
          <span className="text-2xs font-light tracking-tight opacity-60 p-1">
            {secondaryLabel}
          </span>
        </div>
        <input
          className={`w-16 text-xs  focus:ring-transparent ${rounded}   focus:ring-offset-transparent-dark border-transparent  focus:border-opacity-60  focus:border-dark-backgroundDarker placeholder-whites-dark placeholder-opacity-20 ${bg}`}
          type={type}
          ref={innerRef}
          {...props}
        />
      </div>
    );
};

export default Input;
