import React from 'react';

const LiveIndicator = ({ className, indicatorColor, pulseOnly = false }) => {
  if (pulseOnly)
    return (
      <div
        className={`flex space-x-1 justify-center items-center ${className}`}
      >
        <div
          className={`w-1.5 h-1.5 rounded-full ${
            indicatorColor ? indicatorColor : 'bg-primary-light'
          } animate-pulse`}
        />
      </div>
    );

  return (
    <div className={`flex space-x-1 justify-center items-center ${className}`}>
      <div
        className={`w-1.5 h-1.5 rounded-full ${
          indicatorColor ? indicatorColor : 'bg-primary-light'
        } animate-pulse`}
      />{' '}
      <span>Live!</span>
    </div>
  );
};

export default LiveIndicator;
