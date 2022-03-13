import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faUtensils } from '@fortawesome/free-solid-svg-icons';

const RestaurantInfoLabel = ({ title, type, className }) => {
  return (
    <div className={className}>
      <FontAwesomeIcon
        icon={type === 'location' ? faMapMarkerAlt : faUtensils}
        className='mr-3'
      />
      {title}
    </div>
  );
};

export default RestaurantInfoLabel;
