// MUI
import { Slider } from "@material-ui/core";
import { useField } from "formik";
import InputWithoutLabel from "./InputWithoutLabel";

const InputSlider = ({
  step = 1,
  min = 1,
  max = 10,
  marks,
  label,
  secondaryLabel,
  className,
  value,
  setFieldValue,
  name,
  color = "primary",
  ...props
}) => {
  const [field, meta] = useField(name);
  const returnValidValue = (value) => (value === "" ? 0 : value);
  return (
    <div className="w-full flex flex-col text-whites-light space-y-0.5">
      <div className="w-full flex">
        <label className="pl-1 text-xs" htmlFor={props.id || props.name}>
          {label}
        </label>
        <span className="text-2xs font-light tracking-tight opacity-60 p-1">
          {secondaryLabel}
        </span>
      </div>
      <div className="flex space-x-5 items-center px-4">
        <Slider
          marks={marks}
          getAriaValueText={() => `${value}`}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          defaultValue={1}
          value={returnValidValue(value)}
          step={step}
          min={min}
          max={max}
          onChange={(e, value) => {
            setFieldValue(name, value);
          }}
          name={name}
          color={color}
          {...props}
          type="none"
        />
        <InputWithoutLabel
          size="tiny"
          name={name}
          type="number"
          min={min}
          max={max}
        />
      </div>
      {meta.touched && meta.error ? (
        <div className="text-2xs pl-1 text-primary-dark">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default InputSlider;
