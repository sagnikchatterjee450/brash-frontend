import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar as faStarSolid,
  faStarHalfAlt,
} from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarOutline } from '@fortawesome/free-regular-svg-icons';

const ProgressIcon = ({ goalStatus }) => {
  if (goalStatus === 0.0 || goalStatus === '0.0') {
    return <FontAwesomeIcon icon={faStarOutline} />;
  } else if (goalStatus === 0.5 || goalStatus === '0.5') {
    return <FontAwesomeIcon icon={faStarHalfAlt} />;
  } else if (goalStatus === 1.0 || goalStatus === '1.0') {
    return <FontAwesomeIcon icon={faStarSolid} />;
  }

  return null;
};

export default ProgressIcon;
