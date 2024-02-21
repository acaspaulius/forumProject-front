import React, { useEffect, useState, useRef } from 'react';
import { http } from '../plugins';
import { useStore } from '../store/myStore';
import { useNavigate } from 'react-router-dom';

const UserPage = () => {
  const imgUrl = useRef();
  const [createdDiscussions, setCreatedDiscussions] = useState([]);
  const [createdComments, setCreatedComments] = useState([]);
  const [error, setError] = useState('');
  const { user, setUser } = useStore((state) => state);
  const navigate = useNavigate();

  const userDiscussions = async () => {
    try {
      const response = await http.getWithToken(`userDiscussions`);

      const sortedCreatedDiscussions = response.data.sort((a, b) => b.time.localeCompare(a.time));

      setCreatedDiscussions(sortedCreatedDiscussions);
    } catch (error) {
      // Network Error
      console.error(error);
      if ([401, 403, 404].includes(error.code)) {
        localStorage.removeItem('token');
        navigate('/');
      }
    }
  };

  const userComments = async () => {
    try {
      const response = await http.getWithToken(`userComments`);

      const sortedCreatedComments = response.data.sort((a, b) => b.time.localeCompare(a.time));

      setCreatedComments(sortedCreatedComments);
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
    userDiscussions();
    userComments();
  }, []);

  const updateImg = async () => {
    const data = {
      newImg: imgUrl.current.value,
    };

    try {
      const response = await http.postWithToken('changeImage', data);

      setUser(response.data);
      imgUrl.current.value = '';
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  return (
    <div className='user_page_main__div'>
      <div className='user_page_sidebar__div'>
        <img src={user.image} alt='user-profile' />
        <input className='user_page_image_input' type='text' ref={imgUrl} placeholder='Image URL...' />
        <button className='primary-btn' onClick={updateImg}>
          Update Photo
        </button>
        {error && <div className='error'>{error}</div>}
      </div>
      <div className='user_page_info__div'>
        <h2>{user.username}</h2>
        <h4>Discussions created in forum:</h4>
        <div className='user_discussions__div'>
          {createdDiscussions.length > 0 ? (
            createdDiscussions.map((discussion) => (
              <div
                className='user_discussions_single__div'
                key={discussion._id}
                onClick={() => navigate(`/forum/${discussion.topic}/${discussion._id}`)}
              >
                {discussion.title}
              </div>
            ))
          ) : (
            <div className='user_discussions_single__div no-discussions-message'>No discussions created yet...</div>
          )}
        </div>
        <h4>Replies made in discussions:</h4>
        <div className='user_comments__div'>
          {createdComments.length > 0 ? (
            createdComments.map((item, index) => (
              <div className='user_comments_single__div' key={index} onClick={() => navigate(`/forum/${item.topic.title}/${item.discussionId}`)}>
                <strong>Discussion:</strong> {item.discussionTitle} <br />
                <strong>Comment:</strong> {item.comment.length > 69 ? item.comment.substring(0, 69) + '...' : item.comment}
              </div>
            ))
          ) : (
            <div className='user_comments_single__div no-comments-message'>No comments created yet...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
