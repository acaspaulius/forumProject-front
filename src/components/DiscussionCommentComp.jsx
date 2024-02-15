import React, { useState } from 'react';
import { useStore } from '../store/myStore';
import SendMessageModal from '../components/SendMessageModal';

const DiscussionCommentComp = ({ comment }) => {
  const [showModal, setShowModal] = useState(false);
  const date = new Date(comment.createdAt);
  const { user } = useStore((state) => state);

  return (
    <div className='single_comment_comp__div'>
      <div className='single_comment_header__div'>
        <div className='single_comment_user_info__div'>
          <h3>{comment.user.username}</h3>
          <p className='date'>{date.toLocaleString()}</p>
        </div>
        {user.username !== comment.user.username && (
          <button className='secondary-btn' onClick={() => setShowModal(true)}>
            Message
          </button>
        )}
      </div>
      <div>
        <p>{comment.message}</p>
      </div>
      {showModal && <SendMessageModal selectedUser={comment.user} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default DiscussionCommentComp;
