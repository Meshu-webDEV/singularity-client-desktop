import { useEffect, useState } from "react";
import { FastField, useField, useFormikContext } from "formik";

const FastInput = ({
  size = "full",
  bg = "bg-dark-background",
  password = false,
  noLabel = false,
  label,
  secondaryLabel,
  className,
  type = "text",
  ...props
}) => {
  const [field, meta] = useField(props);

  if (noLabel) {
    if (size === "auto")
      return (
        <div
          className={`relative no-label-auto flex flex-col text-whites-light space-y-1 ${className}`}
        >
          <FastField
            className={`${bg} w-full max-w-2xs text-xs focus:ring-transparent rounded-md focus:ring-offset-transparent-dark border-transparent focus:border-opacity-60 focus:border-dark-backgroundDarker placeholder-whites-dark placeholder-opacity-20`}
            type={type}
            {...field}
            {...props}
          />
          {meta.touched && meta.error ? (
            <div className="text-2xs pl-1 text-primary-dark">{meta.error}</div>
          ) : null}
        </div>
      );
    if (size === "large")
      return (
        <div
          className={`relative flex flex-col text-whites-light space-y-1 ${className}`}
        >
          <FastField
            className={`${bg} w-52 text-xs  focus:ring-transparent rounded-md   focus:ring-offset-transparent-dark border-transparent focus:border-opacity-60  focus:border-dark-backgroundDarker placeholder-whites-dark placeholder-opacity-20 xl:w-60`}
            type={type}
            {...field}
            {...props}
          />
          {meta.touched && meta.error ? (
            <div className="text-2xs pl-1 text-primary-dark">{meta.error}</div>
          ) : null}
        </div>
      );
    if (size === "medium")
      return (
        <div
          className={`flex flex-col text-whites-light space-y-1 ${className}`}
        >
          <FastField
            className={`${bg} w-36 text-xs  focus:ring-transparent rounded-md   focus:ring-offset-transparent-dark border-transparent  focus:border-opacity-60  focus:border-dark-backgroundDarker placeholder-whites-dark placeholder-opacity-20`}
            type={type}
            {...field}
            {...props}
          />
          {meta.touched && meta.error ? (
            <div className="text-2xs pl-1 text-primary-dark">{meta.error}</div>
          ) : null}
        </div>
      );
    if (size === "small")
      return (
        <div
          className={`flex flex-col text-whites-light space-y-1 ${className}`}
        >
          <FastField
            className={`${bg} w-16 text-xs  focus:ring-transparent rounded-md   focus:ring-offset-transparent-dark border-transparent  focus:border-opacity-60  focus:border-dark-backgroundDarker placeholder-whites-dark placeholder-opacity-20`}
            type={type}
            {...field}
            {...props}
          />
          {meta.touched && meta.error ? (
            <div className="text-2xs pl-1 text-primary-dark">{meta.error}</div>
          ) : null}
        </div>
      );

    if (size === "tiny")
      return (
        <div
          className={`items-center flex flex-col text-whites-light space-y-1 ${className}`}
        >
          <FastField
            className={`${bg} w-14 focus:px-1.5 focus:py-1 focus:w-14 border text-center border-info border-opacity-5 text-xs px-1.5 py-1  focus:ring-transparent rounded-md  focus:ring-offset-transparent-dark  focus:border-opacity-60  focus:border-dark-backgroundDarker placeholder-whites-dark placeholder-opacity-20`}
            type={type}
            {...field}
            {...props}
          />
          {meta.touched && meta.error ? (
            <div className="text-2xs pl-1 text-primary-dark">{meta.error}</div>
          ) : null}
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
        <FastField
          className={`w-full text-xs  focus:ring-transparent rounded-md  focus:ring-offset-transparent border-transparent  focus:border-opacity-60  focus:border-dark-backgroundDarker placeholder-whites-dark placeholder-opacity-20 ${bg}`}
          type={type}
          {...field}
          {...props}
        />
        {meta.touched && meta.error ? (
          <div className="text-2xs pl-1 text-primary-dark">{meta.error}</div>
        ) : null}
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
        <FastField
          className={`w-56 text-xs focus:ring-transparent rounded-md focus:ring-offset-transparent-dark border-transparent  focus:border-opacity-60 focus:border-dark-backgroundDarker placeholder-whites-dark placeholder-opacity-20 xl:w-60 ${bg}`}
          type={type}
          {...field}
          {...props}
        />
        {meta.touched && meta.error ? (
          <div className="text-2xs pl-1 text-primary-dark">{meta.error}</div>
        ) : null}
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
        <FastField
          className={`w-36 text-xs  focus:ring-transparent rounded-md   focus:ring-offset-transparent-dark border-transparent  focus:border-opacity-60  focus:border-dark-backgroundDarker placeholder-whites-dark placeholder-opacity-20 ${bg}`}
          type={type}
          {...field}
          {...props}
        />
        {meta.touched && meta.error ? (
          <div className="text-2xs pl-1 text-primary-dark">{meta.error}</div>
        ) : null}
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
        <FastField
          className={`w-16 text-xs  focus:ring-transparent rounded-md   focus:ring-offset-transparent-dark border-transparent  focus:border-opacity-60  focus:border-dark-backgroundDarker placeholder-whites-dark placeholder-opacity-20 ${bg}`}
          type={type}
          {...field}
          {...props}
        />
        {meta.touched && meta.error ? (
          <div className="text-2xs pl-1 text-primary-dark">{meta.error}</div>
        ) : null}
      </div>
    );
};

export default FastInput;
