import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TopicComp = ({ topic }) => {
  const navigate = useNavigate();
  const [hoverClass, setHoverClass] = useState('');

  const pastelClasses = ['pastel-blue', 'pastel-yellow', 'pastel-green', 'pastel-purple', 'pastel-red', 'pastel-orange'];

  const handleMouseEnter = () => {
    const randomIndex = Math.floor(Math.random() * pastelClasses.length);
    setHoverClass(pastelClasses[randomIndex]);
  };

  const handleMouseLeave = () => {
    setHoverClass('');
  };

  const handleClick = () => {
    navigate(`/forum/${topic.title}`);
  };

  return (
    <div className={`topic_comp__div ${hoverClass}`} onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className='topic_title_bottom_border'>
        <h3>{topic.title.toUpperCase()}</h3>
      </div>
      <p className='discussions'>Discussions: {topic.discussions.length}</p>
    </div>
  );
};

export default TopicComp;
