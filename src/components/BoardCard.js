import React from 'react';

const BoardCard = ({ goalName, goalCategory, goalId }) => {
  const handleOnDragStart = (e) => {
    const target = e.target;
    e.dataTransfer.setData('card_id', target.id);
  };

  const handleOnDragOver = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className='box board-card'
      id={goalId}
      onDragStart={handleOnDragStart}
      onDragOver={handleOnDragOver}
      draggable='true'
    >
      <p className='tag is-primary is-medium is-light mb-2 '>{goalCategory}</p>
      <div>
        <strong>{goalName}</strong>
      </div>
    </div>
  );
};

export default BoardCard;
