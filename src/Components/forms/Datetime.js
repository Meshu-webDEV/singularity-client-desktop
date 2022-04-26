import { useEffect, useState } from "react";

// Formik
import { useField, useFormikContext } from "formik";

// MUI
import { DatePicker, DateTimePicker } from "@material-ui/pickers";
import { isPast } from "../../lib/utils";

const Datetime = ({
  size = "default",
  icon = true,
  format = "DD/MM/YYYY hh:mm A",
  withTime = true,
  disablePast = false,
  open,
  onOpen,
  onClose,
  label,
  className,
  value,
  setFieldValue,
  name,
  handleErrors,
  ...props
}) => {
  const [field, meta] = useField({ name, props });
  const {
    isValid,
    errors,
    isValidating,
    values,
    setFieldError,
    setFieldTouched,
  } = useFormikContext();

  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const handlePickerClicked = () => {
    setIsPickerOpen((prev) => !prev);
  };

  useEffect(() => {
    if (typeof handleErrors === "undefined") return;

    if (isPast(values.datetime)) {
      setFieldError("datetime", "Date & time cannot be in the past");
    }
  }, [values, errors, isValidating]);

  useEffect(() => {
    setFieldTouched(field.name);
  }, []);

  if (size === "default")
    return (
      <div
        className={`w-full flex flex-col text-whites-light space-y-0.5 ${className}`}
      >
        {label && (
          <div className="w-full flex">
            <label className="pl-1 text-xs" htmlFor={props.id || props.name}>
              {label}
            </label>
          </div>
        )}
        <div
          className={`text-whites-light pt-0.5 ${
            icon && "pr-4"
          } opacity-90 -space-x-2 max-w-max font-light tracking-wide flex justify-center items-center  focus:ring-transparent  bg-dark-background rounded-lg  focus:ring-offset-transparent-dark border-transparent  focus:border-opacity-60  focus:border-dark-backgroundDarker placeholder-whites-dark placeholder-opacity-10`}
        >
          {withTime ? (
            <DateTimePicker
              format={format}
              value={value}
              onChange={(value) => {
                setFieldValue(name, value.$d);
              }}
              open={open}
              onOpen={onOpen}
              onClose={onClose}
              color="secondary"
              name={name}
              disablePast={disablePast}
              {...props}
            />
          ) : (
            <DatePicker
              format={format}
              value={value}
              onChange={(value) => {
                setFieldValue(name, value.$d);
              }}
              open={open}
              onOpen={onOpen}
              onClose={onClose}
              color="secondary"
              name={name}
              disablePast={disablePast}
              {...props}
            />
          )}
          {icon && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 pb-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          )}
        </div>
        {meta.touched && meta.error ? (
          <div className="text-2xs pl-1 text-primary-dark">{meta.error}</div>
        ) : null}
      </div>
    );
};

export default Datetime;
