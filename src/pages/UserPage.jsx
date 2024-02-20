import React, { useEffect, useState, useRef } from 'react';
import { http } from '../plugins';
import { useStore } from '../store/myStore';
import { useNavigate } from 'react-router-dom';

const UserPage = () => {
  const imgUrl = useRef();
  const [createdDiscussions, setCreatedDiscussions] = useState([]);
  const [createdComments, setCreatedComments] = useState([]);
  const { user, setUser } = useStore((state) => state);
  const navigate = useNavigate();

  const userDiscussions = async () => {
    const response = await http.getWithToken(`userDiscussions`);
    if (response.success) {
      console.log(response);
      const sortedCreatedDiscussions = response.data.sort((a, b) => b.time.localeCompare(a.time));
      setCreatedDiscussions(sortedCreatedDiscussions);
    } else {
      console.error(response.message);
    }
  };

  const userComments = async () => {
    const response = await http.getWithToken(`userComments`);
    if (response.success) {
      const sortedCreatedComments = response.data.sort((a, b) => b.time.localeCompare(a.time));
      setCreatedComments(sortedCreatedComments);
    } else {
      // console.log(response.message);
    }
  };

  useEffect(() => {
    userDiscussions();
    userComments();
  }, [setUser]);

  function updateImg() {
    const data = {
      newImg: imgUrl.current.value,
    };
    http
      .postWithToken('changeImage', data)
      .then((resData) => {
        if (resData.success) {
          setUser(resData.data);
          imgUrl.current.value = '';
        }
      })
      .catch((error) => {
        console.error('Error updating image:', error);
      });
  }

  return (
    <div className='user_page_main__div'>
      <div className='user_page_sidebar__div'>
        <img src={user.image} alt='user-profile' />
        <input className='user_page_image_input' type='text' ref={imgUrl} placeholder='Image URL...' />
        <button className='primary-btn' onClick={updateImg}>
          Update Photo
        </button>
      </div>
      <div className='user_page_info__div'>
        <h2>{user.username}</h2>
        <h4>Discussions created in forum:</h4>
        <div className='user_discussions__div'>
          {createdDiscussions.map((discussion) => (
            <div
              className='user_discussions_single__div'
              key={discussion._id}
              onClick={() => navigate(`/forum/${discussion.topic}/${discussion._id}`)}
            >
              {discussion.title}
            </div>
          ))}
        </div>
        <h4>Replies made in discussions:</h4>
        <div className='user_comments__div'>
          {createdComments.map((item, index) => (
            <div className='user_comments_single__div' key={index} onClick={() => navigate(`/forum/${item.topic.title}/${item.discussionId}`)}>
              <strong>Discussion:</strong> {item.discussionTitle} <br />
              <strong>Comment:</strong> {item.comment}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
