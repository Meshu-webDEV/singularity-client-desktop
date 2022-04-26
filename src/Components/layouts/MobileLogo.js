import React from 'react';

const MobileLogo = ({
  size = 'medium',
  darkColor = 'text-primary-light',
  color = 'primary',
}) => {
  if (color === 'none')
    return (
      <div
        className={`relative flex space-x-1 justify-center items-center tracking-widest uppercase text-whites-dark`}
      >
        <span>singularity</span>
        <span>
          <svg
            id='Group_1583'
            xmlns='http://www.w3.org/2000/svg'
            width='23'
            height='23'
            viewBox='0 0 28.402 28.402'
          >
            <circle
              id='Ellipse_57'
              cx='14.201'
              cy='14.201'
              r='14.201'
              fill='#0b0d13'
            />
            <g id='Group_1478' transform='translate(6.18 4.063)'>
              <path
                id='Path_22'
                d='M1037.927,261.3a2.99,2.99,0,0,0,2.227,2.89l-3.491,3.492a8.9,8.9,0,0,1-1.159-.978,9.054,9.054,0,0,1-1.26-11.244,8.43,8.43,0,0,1,1.26-1.592,9.062,9.062,0,0,1,10.8-1.535l-6.047,6.047A2.994,2.994,0,0,0,1037.927,261.3Z'
                transform='translate(-1032.844 -251.206)'
                fill='#21282f'
              />
              <g id='Group_1477' transform='translate(2.805 3.813)'>
                <path
                  id='Path_23'
                  d='M1057.59,280.671a8.428,8.428,0,0,1-1.26,1.592,9.061,9.061,0,0,1-10.8,1.532l6.235-6.233a2.992,2.992,0,0,0-.035-5.674l3.438-3.438a8.592,8.592,0,0,1,1.161.977A9.057,9.057,0,0,1,1057.59,280.671Z'
                  transform='translate(-1045.53 -268.45)'
                  fill='#21282f'
                />
              </g>
            </g>
            <circle
              id='Ellipse_58'
              cx='1.505'
              cy='1.505'
              r='1.505'
              transform='translate(12.696 12.696)'
              fill='#f10041'
            />
          </svg>
        </span>
      </div>
    );

  if (size === 'tiny')
    return (
      <div
        className={`relative flex space-x-1 justify-center items-center tracking-wide uppercase font-light ${
          color === 'primary' ? 'text-primary-light' : 'text-secondary-light'
        }`}
      >
        <span>singularity</span>
        <span>
          <svg
            id='Group_1583'
            xmlns='http://www.w3.org/2000/svg'
            width='23'
            height='23'
            viewBox='0 0 28.402 28.402'
          >
            <circle
              id='Ellipse_57'
              cx='14.201'
              cy='14.201'
              r='14.201'
              fill='#0b0d13'
            />
            <g id='Group_1478' transform='translate(6.18 4.063)'>
              <path
                id='Path_22'
                d='M1037.927,261.3a2.99,2.99,0,0,0,2.227,2.89l-3.491,3.492a8.9,8.9,0,0,1-1.159-.978,9.054,9.054,0,0,1-1.26-11.244,8.43,8.43,0,0,1,1.26-1.592,9.062,9.062,0,0,1,10.8-1.535l-6.047,6.047A2.994,2.994,0,0,0,1037.927,261.3Z'
                transform='translate(-1032.844 -251.206)'
                fill='#21282f'
              />
              <g id='Group_1477' transform='translate(2.805 3.813)'>
                <path
                  id='Path_23'
                  d='M1057.59,280.671a8.428,8.428,0,0,1-1.26,1.592,9.061,9.061,0,0,1-10.8,1.532l6.235-6.233a2.992,2.992,0,0,0-.035-5.674l3.438-3.438a8.592,8.592,0,0,1,1.161.977A9.057,9.057,0,0,1,1057.59,280.671Z'
                  transform='translate(-1045.53 -268.45)'
                  fill='#21282f'
                />
              </g>
            </g>
            <circle
              id='Ellipse_58'
              cx='1.505'
              cy='1.505'
              r='1.505'
              transform='translate(12.696 12.696)'
              fill={`${color === 'primary' ? '#f10041' : '#01EB47'}`}
            />
          </svg>
        </span>
      </div>
    );

  if (size === 'medium')
    return (
      <div className={`relative  ${darkColor} flex flex-col items-center`}>
        <div className='uppercase tracking-wider text-5xl font-normal text-primary-light'>
          singularity
        </div>
        <span className='text-whites-light self-start xs:self-center ml-2 xs:w-8/12 tracking-wider text-sm flex flex-col'>
          <span>
            Your <span className='font-bold uppercase'>all-in-one</span>{' '}
            platform
          </span>
          <span>
            for organizing Events, tournaments {'&'} scrims for
            <span className='font-bold uppercase'> Apex Legends</span>
          </span>
        </span>
      </div>
    );
};

export default MobileLogo;
