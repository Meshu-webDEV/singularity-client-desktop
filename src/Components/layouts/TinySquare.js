import React from 'react';

/**
 *
 * @param {string} size tiny/medium/large
 * @param {string} className bg-COLOR text-COLOR classes
 * @returns
 */
const TinySquare = ({ size = 'tiny', className }) => {
  if (size === 'supertiny')
    return <div className={`w-0.5 h-2 mr-1 ${className}`}></div>;
  if (size === 'tiny')
    return <div className={`w-0.5 h-2 mr-1 ${className}`}></div>;
  if (size === 'medium')
    return <div className={`w-0.5 h-3.5 mr-1 ${className}`}></div>;
  if (size === 'large')
    return <div className={`w-0.5 h-4 mr-1 ${className}`}></div>;

  return <div className={`w-0.5 h-3.5 mr-1 ${className}`}></div>;
};

export default TinySquare;
