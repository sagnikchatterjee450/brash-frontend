import React from 'react';
import ProgressIcon from '../components/ProgressIcon';

const BoardColumn = ({ title, children, updateGoalStatus, id }) => {
  const handleOnDrop = (e) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData('card_id');

    const card = document.getElementById(cardId);
    card.style.display = 'block';

    e.target.appendChild(card);
    updateGoalStatus(cardId, id);
  };

  const handleOnDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className='column'>
        <h3 className='title is-4'>
          <ProgressIcon goalStatus={parseFloat(id)} />
          <span className='ml-3'>{title}</span>
        </h3>
        <div
          className='notification board-column'
          id={id}
          onDrop={handleOnDrop}
          onDragOver={handleOnDragOver}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default BoardColumn;
