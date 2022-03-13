import React from 'react';

import ScoreBreakdownCard from './ScoreBreakdownCard';

const ScoreBreakdownGrid = ({ categories }) => {
  return (
    <div className='columns is-multiline'>
      {categories.map(({ categoryId, ...category }, i) => {
        return (
          <div className='column is-half' key={i}>
            <ScoreBreakdownCard key={categoryId} category={category} />
          </div>
        );
      })}
    </div>
  );
};

export default ScoreBreakdownGrid;
