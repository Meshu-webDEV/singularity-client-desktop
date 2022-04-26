import { useEffect, useState, createRef } from "react";

import { default as Copy } from "react-copy-to-clipboard";
import Popover from "@material-ui/core/Popover";
import { useRef } from "react";

/**
 *
 * @param {string} text String to copy
 * @param {string} acknowledgment String to acknowledge a success copy, empty defaults to "Copied"
 * @param {object} anchorOrigin { vertical: VALUE, horizontal: VALUE} - top, bottom, left, right and bottom
 * @param {object} transformOrigin { vertical: VALUE, horizontal: VALUE} - top, bottom, left, right and bottom
 * @returns
 */
const CopyToClipboard = ({
  text,
  acknowledgment = "Copied!",
  children,
  anchorOrigin = {
    vertical: "top",
    horizontal: "center",
  },
  transformOrigin = {
    vertical: "bottom",
    horizontal: "left",
  },
  className,
}) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const ref = useRef();
  // handlers
  const handleCopyClick = () => {
    setOpen(true);
    setAnchorEl(anchorEl);
  };

  useEffect(() => {
    if (!open) return;

    const timeoutId = setTimeout(() => {
      setOpen(false);
    }, 1800);

    return () => clearTimeout(timeoutId);
  });

  useEffect(() => setAnchorEl(ref.current), []);

  return (
    <div
      onClick={handleCopyClick}
      ref={ref}
      className={`${className} cursor-pointer`}
    >
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => setOpen(false)}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
      >
        <div className="text-2xs p-2">{acknowledgment}</div>
      </Popover>
      <Copy text={text}>{children}</Copy>
    </div>
  );
};

export default CopyToClipboard;
