import { makeStyles } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import LoadingWithDots from "./LoadingWithDots";

// MUI Styling
const useStyles = makeStyles(() => ({
  root: {
    zIndex: "9999",
  },
}));

const LoadingBackdrop = ({
  text = "Loading",
  open = true,
  className,
  size = "1rem",
  color = "primary",
}) => {
  const classes = useStyles();

  return (
    <Backdrop className={`${classes.root} ${className}`} open={open}>
      <LoadingWithDots label={text} size={size} color={color} />
    </Backdrop>
  );
};

export default LoadingBackdrop;
