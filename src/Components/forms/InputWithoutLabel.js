import React, { useEffect } from "react";
import { useField, useFormikContext } from "formik";

const InputWithoutLabel = ({
  size = "default",
  className,
  type = "text",
  handleChange,
  contextFieldName,
  ...props
}) => {
  const [field, meta] = useField(props);
  const { values } = useFormikContext();

  useEffect(() => {
    if (typeof handleChange === "undefined") return;
    handleChange(values, contextFieldName);
  }, [values]);

  if (size === "default")
    return (
      <>
        <input
          className="w-full text-xs  focus:ring-transparent  bg-dark-background rounded-lg   focus:ring-offset-transparent-dark border-transparent  focus:border-opacity-60  focus:border-dark-backgroundDarker placeholder-whites-dark placeholder-opacity-10"
          type={type}
          {...field}
          {...props}
        />
      </>
    );

  if (size === "small")
    return (
      <>
        <input
          className="w-20 h-9 text-xs  focus:ring-transparent  bg-dark-background rounded-lg   focus:ring-offset-transparent border-transparent  focus:border-opacity-60  focus:border-dark-backgroundDarker placeholder-whites-dark placeholder-opacity-10"
          type={type}
          {...field}
          {...props}
        />
      </>
    );

  if (size === "tiny")
    return (
      <>
        <input
          className="w-min h-9 text-xs  focus:ring-transparent  bg-dark-background rounded-lg   focus:ring-offset-traarent-dark border-transparent  focus:border-opacity-60  focus:border-dark-backgroundDarker placeholder-whites-dark placeholder-opacity-10"
          type={type}
          {...field}
          {...props}
        />
      </>
    );
};

export default InputWithoutLabel;
