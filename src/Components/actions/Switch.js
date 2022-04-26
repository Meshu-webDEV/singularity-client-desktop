import React from "react";

// MUI
import { default as MuiSwitch } from "@material-ui/core/Switch";
import { useState } from "react";

const Switch = ({
  handleSwitched,
  disabled = false,
  onLabel = "",
  offLabel = "",
  disabledLabel = "",
}) => {
  const [on, setOn] = useState(false);

  const handleSwitchedOn = () => {
    handleSwitched(!on);
    setOn((state) => !state);
  };

  return (
    <>
      <MuiSwitch
        onChange={handleSwitchedOn}
        size="small"
        checked={on}
        disabled={disabled}
      />
      <span className="text-2xs opacity-80 text-whites-light font-light tracking-wide">
        {disabled ? (
          <span className="font-extralight opacity-50 italic tracking-wider">
            {disabledLabel}
          </span>
        ) : on ? (
          onLabel
        ) : (
          offLabel
        )}
      </span>
    </>
  );
};

export default Switch;
