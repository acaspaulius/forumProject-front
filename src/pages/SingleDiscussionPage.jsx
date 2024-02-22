import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { http } from '../plugins';
import DiscussionCommentComp from '../components/DiscussionCommentComp';
import SendMessageModal from '../components/SendMessageModal';
import { useStore } from '../store/myStore';
import youtubeIcon from '../assets/youtube-icon.png';
import addImageIcon from '../assets/image-icon.png';

const SingleDiscussionPage = () => {
  const [discussion, setDiscussion] = useState(null);
  const [comments, setComments] = useState([]);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showYoutubeInput, setShowYoutubeInput] = useState(false);
  const [showImageInput, setShowImageInput] = useState(false);

  const text = useRef();
  const youtubeLink = useRef();
  const imageUrl = useRef();

  const { id, topic } = useParams();
  const { user } = useStore((state) => state);
  const navigate = useNavigate();

  const fetchDiscussion = async () => {
    try {
      const response = await http.get(`forum/${topic}/${id}`);
      setDiscussion(response.data);
      setComments(response.data.replies);
    } catch (error) {
      // Network Error
      console.error(error);
      if ([401, 403, 404].includes(error.code)) {
        localStorage.removeItem('token');
        navigate('/');
      }
    }
  };

  useEffect(() => {
    fetchDiscussion();
  }, []);

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

    try {
      await http.postWithToken(`forum/${topic}/${id}/comments`, payload);

      fetchDiscussion();

      if (text.current) text.current.value = '';
      if (youtubeLink.current) youtubeLink.current.value = '';
      if (imageUrl.current) imageUrl.current.value = '';
    } catch (error) {
      // Network Error
      console.error(error);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await http.postWithToken(`forum/${topic}/${id}/comments/${commentId}`);

      setComments(comments.filter((comment) => comment._id !== commentId));

      fetchDiscussion();
    } catch (error) {
      // Network Error
      console.error(error);
    }
  };

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
    <div className='single_discussion_main__div'>
      <div className='wrapper'>
        {discussion && (
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
              <div className='title-date-container'>
                <div className='title-container'>
                  <h2>{discussion.title}</h2>
                </div>
                <p className='date'>{formatDate(discussion.time)}</p>
              </div>
              <p className='description preformatted-text'>{discussion.description}</p>
            </div>
          </div>
        )}
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
          <textarea ref={text} placeholder='Your reply...' rows='1' cols='20'></textarea>
          <div className='optional_url__div'>
            {showYoutubeInput && <input className='optional_url__input' type='text' ref={youtubeLink} placeholder='YouTube Link (optional)' />}
            {showImageInput && <input className='optional_url__input' type='text' ref={imageUrl} placeholder='Image URL (optional)' />}
            <img src={youtubeIcon} alt='Add YouTube' className='optional_url__img' onClick={() => setShowYoutubeInput(!showYoutubeInput)} />
            <img src={addImageIcon} alt='Add Image' className='optional_url__img' onClick={() => setShowImageInput(!showImageInput)} />
          </div>
          <div className='single_discussion_reply_button__div'>
            <button className='primary-btn' onClick={submitComment}>
              Reply
            </button>
          </div>
        </div>
      </div>
      {showMessageModal && (
        <SendMessageModal setShowMessageModal={setShowMessageModal} selectedUser={discussion.user} onClose={() => setShowMessageModal(false)} />
      )}
    </div>
  );
};

export default SingleDiscussionPage;
