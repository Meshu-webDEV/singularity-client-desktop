import Fade from '@material-ui/core/Fade';
import React from 'react';

const SlideAnimation = ({ timeout = 250, fadeIn = true, children }) => {
  return (
    <Fade timeout={timeout} in={fadeIn}>
      {children}
    </Fade>
  );
};

export default SlideAnimation;
