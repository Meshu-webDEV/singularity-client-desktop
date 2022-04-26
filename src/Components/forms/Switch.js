import { useEffect } from "react";

// Formik
import { useField, useFormikContext } from "formik";

// MUI
import { default as MuiSwitch } from "@material-ui/core/Switch";
import LoadingWithDots from "../layouts/LoadingWithDots";

const Switch = ({
  label,
  secondaryLabel,
  className,
  color = "primary",
  loading = false,
  ...props
}) => {
  const [field, meta] = useField(props);
  const { values } = useFormikContext();

  return (
    <div className={`flex flex-col text-whites-light space-y-0.5 ${className}`}>
      <div className="w-full flex items-center">
        <label
          className="pl-1 text-xs whitespace-nowrap"
          htmlFor={props.id || props.name}
        >
          {label}
        </label>
        <span className="text-2xs font-light tracking-tight opacity-60 p-1">
          {secondaryLabel}
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <MuiSwitch name="public" color={color} {...field} {...props} />
        {loading ? (
          <div className="text-2xs font-light italic tracking-wide">
            <LoadingWithDots
              label="Loading"
              flow="row"
              size="0.5rem"
              color="inherit"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Switch;
