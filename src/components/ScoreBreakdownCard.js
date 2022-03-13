import React from 'react';

import ProgressIcon from './ProgressIcon';

const ScoreBreakdownCard = ({ category }) => {
  const { categoryName, categoryScore, goals } = category;

  return (
    <article className='score-breakdown-card message is-medium is-primary'>
      <div className='message-header'>
        <p>{categoryName}</p>
        <p>{categoryScore}% Completed</p>
      </div>
      <div className='message-body'>
        <ul>
          {goals.map(({ goalStatus, goalName }, i) => {
            return (
              <li key={i}>
                <div className='columns'>
                  <div className='column'>
                    <ProgressIcon goalStatus={goalStatus} />
                  </div>
                  <div className='column is-11'>{goalName}</div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </article>
  );
};

export default ScoreBreakdownCard;
