import React from 'react';

const Menu = ({ className, handleOnClick }) => {
  if (!handleOnClick)
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className={className}
        viewBox='0 0 19.191 10.204'
      >
        <line
          id='Line_33'
          x2='19.191'
          transform='translate(0 1)'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
        />
        <line
          id='Line_34'
          x2='13'
          transform='translate(0 5.993)'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
        />
        <path
          id='Path_36'
          d='M19.191,0'
          transform='translate(0 10.204)'
          fill='#fff'
          stroke='currentColor'
          strokeWidth='2'
        />
      </svg>
    );

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      viewBox='0 0 19.191 10.204'
      onClick={() => handleOnClick()}
    >
      <line
        id='Line_33'
        x2='19.191'
        transform='translate(0 1)'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
      />
      <line
        id='Line_34'
        x2='13'
        transform='translate(0 5.993)'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
      />
      <path
        id='Path_36'
        d='M19.191,0'
        transform='translate(0 10.204)'
        fill='#fff'
        stroke='currentColor'
        strokeWidth='2'
      />
    </svg>
  );
};

export default Menu;
