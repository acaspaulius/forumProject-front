import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import http from '../plugins/http';
import DiscussionCommentComp from '../components/DiscussionCommentComp';

const SingleDiscussionPage = () => {
  const [discussion, setDiscussion] = useState(null);
  const [comments, setComments] = useState([]);
  const text = useRef();
  const { id, topic } = useParams(); // This will get the discussion ID from the URL

  const fetchDiscussion = async () => {
    const response = await http.get(`forum/${topic}/${id}`);
    if (response.success) {
      setDiscussion(response.data);
      setComments(response.data.replies);
    } else {
      console.error(response.message);
    }
  };

  useEffect(() => {
    fetchDiscussion();
  }, [topic, id]);

  const submitComment = async () => {
    const response = await http.postWithToken(`forum/${topic}/${id}/comments`, { text: text.current.value });
    if (response.success) {
      fetchDiscussion();
      text.current.value = '';
    } else {
      console.error('Failed to post comment:', response.message);
    }
  };

  if (!discussion) {
    return <div>Loading...</div>;
  }

  return (
    <div className='single_discussion_main__div'>
      <div className='wrapper'>
        <div className='single_discussion_info__div'>
          <div className='discussion_user_info__div'>
            <img src={discussion.user.image} alt='User profile picture' />
            <h4>{discussion.user.username}</h4>
          </div>
          <div>
            <h2>{discussion.title}</h2>
            <p className='description'>{discussion.description}</p>
          </div>
        </div>
      </div>

      <div className='wrapper'>
        <div className='single_discussion_comments__div'>
          {comments.map((comment) => (
            <DiscussionCommentComp key={comment._id} comment={comment} />
          ))}
        </div>
      </div>

      <div className='wrapper'>
        <div className='single_discussion_reply__div'>
          <input type='text' ref={text} placeholder='Your reply...' />
          <button className='primary-btn' onClick={submitComment}>
            Reply
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleDiscussionPage;
