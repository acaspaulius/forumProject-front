import React from 'react';
import { useNavigate } from 'react-router-dom';

const DiscussionComp = ({ discussion, topic }) => {
  const navigate = useNavigate();

  const date = new Date(discussion.time);

  const handleClick = () => {
    // Use the topic prop to navigate to the correct discussion page
    navigate(`/forum/${topic}/${discussion._id}`);
  };

  return (
    <div className='discussion_comp__div' onClick={handleClick}>
      <div className='title-date-wrapper'>
        <h3>{discussion.title}</h3>
        <p className='date'>{date.toLocaleString()}</p>
      </div>
      <p className='description'>{discussion.description.substring(0, 10)}...</p>
      <p className='replies'>Replies: {discussion.replies && discussion.replies.length}</p>
    </div>
  );
};

export default DiscussionComp;
