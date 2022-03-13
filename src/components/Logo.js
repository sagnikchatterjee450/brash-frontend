import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSeedling } from '@fortawesome/free-solid-svg-icons';

const Logo = ({ className, children }) => {
  return (
    <div className={className}>
      <FontAwesomeIcon icon={faSeedling} className='logo-icon mr-4' />
      EcoEateries {children}
    </div>
  );
};

export default Logo;
