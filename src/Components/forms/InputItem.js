import { useField, FastField } from "formik";
import React from "react";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

const InputItem = ({
  editable = true,
  removable = false,
  handleRemove,
  initialValueForRemove = "",
  initialFieldNameForRemove = "",
  label,
  secondaryLabel,
  className,
  type = "text",
  index,
  ...props
}) => {
  const [field, meta] = useField(props);
  const handleOnClickRemove = () => {
    handleRemove(
      `${initialFieldNameForRemove}[${index}]`,
      initialValueForRemove
    );
  };

  if (editable && !removable)
    return (
      <div
        className={`flex flex-col text-whites-light space-y-1 ${className}`}
        key={field.name}
      >
        <div className="w-full flex">
          <label className="pl-1 text-xs" htmlFor={props.id || props.name}>
            {label}
          </label>
          <span className="text-2xs font-light tracking-tight opacity-60 p-1">
            {secondaryLabel}
          </span>
        </div>
        <FastField
          className="w-full text-xs  focus:ring-transparent  bg-dark-background rounded-lg   focus:ring-offset-transparent-dark border-transparent  focus:border-opacity-60  focus:border-dark-backgroundDarker placeholder-whites-dark placeholder-opacity-10"
          type={type}
          {...field}
          {...props}
        />
        {meta.touched && meta.error ? (
          <div className="text-2xs pl-1 text-primary-dark">{meta.error}</div>
        ) : null}
      </div>
    );

  if (removable && !editable)
    return (
      <div
        className={`flex flex-col text-whites-light space-y-1 ${className}`}
        key={field.name}
      >
        <div className="w-full flex">
          <label className="pl-1 text-xs" htmlFor={props.id || props.name}>
            {label}
          </label>
          <span className="text-2xs font-light tracking-tight opacity-60 p-1">
            {secondaryLabel}
          </span>
        </div>
        <div
          className="w-full px-3 py-2 flex items-center justify-center text-xs  focus:ring-transparent  bg-dark-backgroundDark rounded-md shadow-xl  focus:ring-offset-transparent-dark border-transparent  focus:border-opacity-60  focus:border-dark-backgroundDarker placeholder-whites-dark placeholder-opacity-10"
          {...field}
          {...props}
        >
          <span className="w-14 overflow-x-scroll">{field.value}</span>
          <span onClick={handleOnClickRemove} className="text-primary-dark">
            <RemoveCircleIcon fontSize="small" color="inherit" />
          </span>
        </div>
      </div>
    );
};

export default InputItem;
