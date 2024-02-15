import React, { useEffect, useState, useRef } from 'react';
import http from '../plugins/http';
import { useStore } from '../store/myStore';

const UserPage = () => {
  const imgUrl = useRef();
  const [createdDiscussions, setCreatedDiscussions] = useState([]);
  const [createdComments, setCreatedComments] = useState([]);
  const { user, setUser } = useStore((state) => state);

  const userDiscussions = async () => {
    const response = await http.getWithToken(`userDiscussions`);
    if (response.success) {
      setCreatedDiscussions(response.data);
    } else {
      console.error(response.message);
    }
  };

  const userComments = async () => {
    const response = await http.getWithToken(`userComments`);
    if (response.success) {
      setCreatedComments(response.data);
    } else {
      console.log(response.message);
    }
  };

  useEffect(() => {
    userDiscussions();
    userComments();
  }, [setUser]); // setUser is a dependency here, assuming it might change and should trigger a re-fetch

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
        <img src={user.image} alt='User profile picture' />
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
            <div className='user_discussions_single__div' key={discussion._id}>
              {discussion.title}
            </div>
          ))}
        </div>
        <h4>Replies made in discussions:</h4>
        <div className='user_comments__div'>
          {createdComments.map((item, index) => (
            <div className='user_comments_single__div' key={index}>
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
