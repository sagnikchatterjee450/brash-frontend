import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShareSquare,
  faEye,
  faTasks,
} from '@fortawesome/free-solid-svg-icons';

import DashboardCard from './DashboardCard'

const Dashboard = ({userId}) => {
  return (
    <div className='columns is-vcentered'>
      <DashboardCard
        title='Update Progress'
        subtitle='Update your progress and generate a new report.'
        src='/report/edit'
      >
        <FontAwesomeIcon icon={faTasks} />
      </DashboardCard>
      <DashboardCard
        title='Review and Share'
        subtitle='Review your latest report and share them online.'
        src='/report/results'
      >
        <FontAwesomeIcon icon={faShareSquare} />
      </DashboardCard>
      <DashboardCard
        title='View Official Report'
        subtitle='View the official report that your customers are seeing.'
        src={`/${userId}/report`}
      >
        <FontAwesomeIcon icon={faEye} />
      </DashboardCard>
    </div>
  );
};

export default Dashboard;
