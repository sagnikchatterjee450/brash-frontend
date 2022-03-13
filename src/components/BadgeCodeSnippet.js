import React from 'react';

const BadgeCodeSnippet = ({ codeSnippet }) => {
  const handleFocus = (e) => {
    e.target.select();
  };

  return (
    <div className='field'>
      <div className='control'>
        <textarea
          readOnly
          className='textarea is-primary'
          value={codeSnippet}
          onFocus={(e) => handleFocus(e)}
        />
      </div>
    </div>
  );
};

export default BadgeCodeSnippet;
