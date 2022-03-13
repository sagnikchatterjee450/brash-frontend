import React from 'react';

const LoadingSpinner = () => {
  return (
      <div className='loading-spinner columns is-centered is-vcentered'>
        <div className='column is-half has-text-centered'>
          <div className='button is-loading'></div>
        </div>
      </div>
  );
};

export default LoadingSpinner;
