import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DiscussionComp = ({ discussion, topic }) => {
  const navigate = useNavigate();
  const [hoverClass, setHoverClass] = useState('');

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const handleClick = () => {
    navigate(`/forum/${topic}/${discussion._id}`);
  };

  const pastelClasses = ['pastel-blue', 'pastel-yellow', 'pastel-green', 'pastel-purple', 'pastel-red', 'pastel-orange'];

  const handleMouseEnter = () => {
    const randomIndex = Math.floor(Math.random() * pastelClasses.length);
    const newClass = pastelClasses[randomIndex];
    setHoverClass(newClass);
  };

  const handleMouseLeave = () => {
    setHoverClass('');
  };

  return (
    <div className={`discussion_comp__div ${hoverClass}`} onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className='discussion_title_bottom_border'>
        <h3>{discussion.title}</h3>
        <p className='date'>{formatDate(discussion.time)}</p>
      </div>
      <p className='description'>{discussion.description.substring(0, 25)}...</p>
      <p className='replies'>Replies: {discussion.replies && discussion.replies.length}</p>
    </div>
  );
};

export default DiscussionComp;
