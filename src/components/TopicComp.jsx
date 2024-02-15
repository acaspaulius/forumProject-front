import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TopicComp = ({ topic }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/forum/${topic.title}`);
  };

  return (
    <div className='topic_comp__div' onClick={handleClick}>
      <div className='title-wrapper'>
        <h3>{topic.title.toUpperCase()}</h3>
      </div>
      <p className='discussions'>Discussions: {topic.discussions.length}</p>
    </div>
  );
};

export default TopicComp;
