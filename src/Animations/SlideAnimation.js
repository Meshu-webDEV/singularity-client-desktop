import Slide from '@material-ui/core/Slide';

const SlideAnimation = ({
  direction = 'down',
  timeout = 250,
  slideIn = true,
  children,
}) => {
  return (
    <Slide direction={direction} timeout={timeout} in={slideIn}>
      {children}
    </Slide>
  );
};

export default SlideAnimation;
