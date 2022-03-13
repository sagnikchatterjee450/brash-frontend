import React from 'react';
import HeaderSecondary from './HeaderSecondary';

const PageNotFound = () => {
  return (
    <HeaderSecondary title='Error 404' subtitle={`This page does not exist.`} />
  );
};

export default PageNotFound;
