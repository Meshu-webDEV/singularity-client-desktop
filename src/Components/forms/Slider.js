import React from 'react';
import { default as MuiSlider } from '@material-ui/core/Slider';

const Slider = ({
  size = 'default',
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
  color = 'primary',
  ...props
}) => {
  return (
    <MuiSlider
      marks={marks}
      getAriaValueText={() => `${value}`}
      aria-labelledby='discrete-slider'
      valueLabelDisplay='auto'
      defaultValue={1}
      value={value}
      step={step}
      min={min}
      max={max}
      onChange={(e, value) => {
        setFieldValue(name, value);
      }}
      name={name}
      color={color}
      {...props}
    />
  );
};

export default Slider;
