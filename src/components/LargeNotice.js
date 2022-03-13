import React from 'react';
import { Link } from 'react-router-dom';

const LargeNotice = ({ title, subtitle, buttonTitle, buttonSrc }) => {
  return (
    <div className='notification px-6 py-6 my-5'>
      <div className='columns is-centered is-vcentered'>
        <div className='column is-half has-text-centered'>
          <h2 className='title is-1 mb-6'>{title}</h2>
          <p className='subtitle is-3 mb-6'>{subtitle}</p>
          <Link to={buttonSrc} className='button is-primary is-large'>
            {buttonTitle}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LargeNotice;
