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

const InfoPopover = ({ info = "Info", autoClose = true }) => {
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
    if (!autoClose) return;
    const timeoutId = setTimeout(() => {
      handleClose();
    }, 10000);

    return () => clearTimeout(timeoutId);
  }, [anchorEl]);

  return (
    <div>
      <Button
        aria-describedby={id}
        className="text-whites-dark antialiased"
        variant="none"
        iconOnly
        icon={
          <InfoIcon
            color="inherit"
            fontSize="inherit"
            className={classes.root}
          />
        }
        onClick={(e) => handleClick(e)}
        padding={false}
      />

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
        <div className="text-2xs py-2 px-3"> {info}</div>
      </Popover>
    </div>
  );
};

export default InfoPopover;
