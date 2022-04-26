// MUI
import { ThemeProvider } from "@material-ui/core/styles";
import { default as MuiSelect } from "@material-ui/core/Select";

// Formik
import { useField } from "formik";
import { selectTheme } from "../../lib/muiThemes";

const icon = ({ fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 20 20"
      fill="white"
    >
      <path
        fillRule="evenodd"
        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
};

const Select = ({
  options = [{ option: "", value: "" }],
  native = true,
  label,
  secondaryLabel,
  symbol,
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <ThemeProvider theme={selectTheme}>
      <div className="flex flex-col space-y-1">
        <div className="w-full flex">
          <label className="pl-1 text-xs" htmlFor={props.id || props.name}>
            {label}
          </label>
          <span className="text-2xs font-light tracking-tight opacity-60 p-1">
            {secondaryLabel}
          </span>
        </div>
        <div className="flex space-x-2 items-center">
          <MuiSelect
            className="focus:ring-offset-transparent border-transparent focus:border-opacity-60 focus:border-dark-backgroundDarker"
            IconComponent={icon}
            native={native}
            {...field}
            {...props}
          >
            {options.map((option, index) => (
              <option key={index} value={option.code}>
                {option.name}
              </option>
            ))}
          </MuiSelect>
          {symbol && <span className="text-xs text-whites-dark">{symbol}</span>}
        </div>
        {meta.touched && meta.error ? (
          <div className="text-2xs pl-1 text-primary-dark">{meta.error}</div>
        ) : null}
      </div>
    </ThemeProvider>
  );
};

export default Select;
