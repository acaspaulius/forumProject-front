import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { http } from '../plugins';
import DiscussionCommentComp from '../components/DiscussionCommentComp';
import SendMessageModal from '../components/SendMessageModal';
import { useStore } from '../store/myStore';
import youtubeIcon from '../components/images/youtube-icon.png';
import addImageIcon from '../components/images/image-icon.png';

const SingleDiscussionPage = () => {
  const [discussion, setDiscussion] = useState(null);
  const [comments, setComments] = useState([]);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showYoutubeInput, setShowYoutubeInput] = useState(false);
  const [showImageInput, setShowImageInput] = useState(false);
  const text = useRef();
  const youtubeLink = useRef();
  const imageUrl = useRef();
  const navigate = useNavigate();
  const { id, topic } = useParams();
  const { user } = useStore((state) => state);

  const fetchDiscussion = async () => {
    const response = await http.get(`forum/${topic}/${id}`);
    if (response.success) {
      setDiscussion(response.data);
      setComments(response.data.replies);
    } else {
      console.error(response.message);
      if (response.status === 401) {
        navigate('/');
      }
    }
  };

  useEffect(() => {
    fetchDiscussion();
  }, [topic, id]);

  const extractYouTubeVideoID = (url) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/gi;
    const match = regex.exec(url);
    return match ? match[1] : null;
  };

  const submitComment = async () => {
    const payload = {};

    if (text.current && text.current.value) {
      payload.text = text.current.value;
    }

    if (youtubeLink.current && youtubeLink.current.value) {
      const videoID = extractYouTubeVideoID(youtubeLink.current.value);
      if (videoID) {
        payload.youtubeVideoId = videoID;
      } else {
        alert('Invalid YouTube URL. Please check and try again.');
        return;
      }
    }

    if (imageUrl.current && imageUrl.current.value) {
      payload.imageUrl = imageUrl.current.value;
    }

    if (Object.keys(payload).length === 0) {
      console.error('Please provide at least one form of input.');
      return;
    }

    const response = await http.postWithToken(`forum/${topic}/${id}/comments`, payload);
    if (response.success) {
      fetchDiscussion();
      if (text.current) text.current.value = '';
      if (youtubeLink.current) youtubeLink.current.value = '';
      if (imageUrl.current) imageUrl.current.value = '';
    } else {
      console.error('Failed to post comment:', response.message);
    }
  };

  const deleteComment = async (commentId) => {
    const response = await http.postWithToken(`forum/${topic}/${id}/comments/${commentId}`);
    if (response.success) {
      setComments(comments.filter((comment) => comment._id !== commentId));
      fetchDiscussion();
    } else {
      console.error('Failed to delete comment:', response.message);
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
            <div className='user_info__div'>
              <img src={discussion.user.image} alt='user-profile' />
              <h4>{discussion.user.username}</h4>
            </div>
            {user && user._id !== discussion.user._id && (
              <button className='secondary-btn' onClick={() => setShowMessageModal(true)}>
                Message
              </button>
            )}
          </div>
          <div>
            <h2>{discussion.title}</h2>
            <p className='description'>{discussion.description}</p>
          </div>
        </div>
      </div>

      <div className='wrapper'>
        <div className='single_discussion_comments__div'>
          {comments.length > 0 ? (
            comments.map((comment) => <DiscussionCommentComp key={comment._id} comment={comment} onDelete={deleteComment} />)
          ) : (
            <div className='single_comment_comp__div no-comments-message'>No replies yet...</div>
          )}
        </div>
      </div>

      <div className='wrapper'>
        <div className='single_discussion_reply__div'>
          <input type='text' ref={text} placeholder='Your reply...' />
          <div className='optional_url__div'>
            {showYoutubeInput && <input className='optional_url__input' type='text' ref={youtubeLink} placeholder='YouTube Link (optional)' />}

            <img src={youtubeIcon} alt='Add YouTube' className='optional_url__img' onClick={() => setShowYoutubeInput(!showYoutubeInput)} />
            {showImageInput && <input className='optional_url__input' type='text' ref={imageUrl} placeholder='Image URL (optional)' />}
            <img src={addImageIcon} alt='Add Image' className='optional_url__img' onClick={() => setShowImageInput(!showImageInput)} />
          </div>
          <div className='single_discussion_reply_button__div'>
            <button className='primary-btn' onClick={submitComment}>
              Reply
            </button>
          </div>
        </div>
      </div>
      {showMessageModal && <SendMessageModal selectedUser={discussion.user} onClose={() => setShowMessageModal(false)} />}
    </div>
  );
};

export default SingleDiscussionPage;
