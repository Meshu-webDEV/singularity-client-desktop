import React, { useEffect } from "react";
import Button from "./Button";
import Popover from "@material-ui/core/Popover";
import InfoIcon from "@material-ui/icons/Info";
import { makeStyles } from "@material-ui/core";

// MUI useStyles
const useStyles = makeStyles(() => ({
  root: {
    padding: "none",
  },
}));

const PopoverWrapper = ({ info = "Info", children }) => {
  //

  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleClose();
    }, 10000);

    return () => clearTimeout(timeoutId);
  }, [anchorEl]);

  return (
    <>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div className="text-2xs py-2 px-3">{info}</div>
      </Popover>
      <div
        onClick={(e) => handleClick(e)}
        className="max-w-min whitespace-nowrap"
      >
        {children}
      </div>
    </>
  );
};

export default PopoverWrapper;
