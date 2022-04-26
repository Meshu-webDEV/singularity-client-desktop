import React from 'react';
import GitHubIcon from '@material-ui/icons/GitHub';

const Footer = () => {
  return (
    <div className='flex flex-row space-x-2.5 font-light tracking-tight text-xs  text-whites-light opacity-70'>
      <div>contact us</div>
      <div>
        <a
          href='https://github.com/Mesh-webDEV'
          className='text-current'
          target='_blank'
          rel='noreferrer'
        >
          <span className='text-whites-dark'>
            <GitHubIcon
              style={{
                fontSize: 14,
              }}
            />
          </span>
        </a>
      </div>
    </div>
  );
};

export default Footer;
