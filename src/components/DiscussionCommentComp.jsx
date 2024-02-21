import React, { useState } from 'react';
import { useStore } from '../store/myStore';
import SendMessageModal from './SendMessageModal';
import ConfirmationModal from './ConfirmationModal'; // Make sure to import the ConfirmationModal

const DiscussionCommentComp = ({ comment, onDelete }) => {
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const { user } = useStore((state) => state);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  return (
    <div className='single_comment_comp__div'>
      <div className='single_comment_header__div'>
        <div className='single_comment_user_info__div'>
          <h3>{comment.user.username}</h3>
          <p className='date'>{formatDate(comment.createdAt)}</p>
        </div>
        {user.username === comment.user.username ? (
          <button className='secondary-btn' onClick={() => setShowConfirmModal(true)}>
            X
          </button>
        ) : (
          <button className='secondary-btn' onClick={() => setShowMessageModal(true)}>
            Message
          </button>
        )}
      </div>
      <div>
        {comment.message && <p className='preformatted-text'>{comment.message}</p>}

        {comment.imageUrl && <img className='comment_image' src={comment.imageUrl} alt='Comment' />}

        {comment.youtubeVideoId && (
          <iframe
            className='youtube_video'
            width='560'
            height='315'
            src={`https://www.youtube.com/embed/${comment.youtubeVideoId}`}
            frameborder='0'
            allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
            allowfullscreen
          ></iframe>
        )}
      </div>
      {showMessageModal && (
        <SendMessageModal setShowMessageModal={setShowMessageModal} selectedUser={comment.user} onClose={() => setShowMessageModal(false)} />
      )}
      {showConfirmModal && (
        <ConfirmationModal
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          onConfirm={() => {
            onDelete(comment._id);
            setShowConfirmModal(false);
          }}
          message='Are you sure you want to delete this comment?'
        />
      )}
    </div>
  );
};

export default DiscussionCommentComp;
