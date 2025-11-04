import React from 'react';
import { assests } from '../assets/assests';

const Logo = () => {
  return (
    <img
      src={assests.logo}
      alt="logo"
      height={48}
      width={48}
      style={{ borderRadius: "50px" }}
    />
  );
};

export default Logo;
