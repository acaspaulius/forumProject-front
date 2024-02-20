import React from 'react';
import { useNavigate } from 'react-router-dom';

const DiscussionComp = ({ discussion, topic }) => {
  const navigate = useNavigate();

  const date = new Date(discussion.time);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString().slice(-2);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  const handleClick = () => {
    navigate(`/forum/${topic}/${discussion._id}`);
  };

  return (
    <div className='discussion_comp__div' onClick={handleClick}>
      <div className='discussion_title_bottom_border'>
        <h3>{discussion.title}</h3>
        <p className='date'>{`${day}/${month}/${year} ${hours}:${minutes}`}</p>
      </div>
      <p className='description'>{discussion.description.substring(0, 15)}...</p>
      <p className='replies'>Replies: {discussion.replies && discussion.replies.length}</p>
    </div>
  );
};

export default DiscussionComp;
