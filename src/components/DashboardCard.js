import React from 'react';
import { Link } from 'react-router-dom';

const DashboardCard = ({ title, src, subtitle, children }) => {
  return (
    <div className='column is-vcentered'>
      <Link to={src}>
        <div className='dashboard-card notification is-primary is-light px-6 py-6'>
          <p className='title is-3'> {children}</p>
          <h2 className='title is-3 my-4'>{title}</h2>
          <p className='subtitle mt-3'>{subtitle}</p>
        </div>
      </Link>
    </div>
  );
};

export default DashboardCard;
