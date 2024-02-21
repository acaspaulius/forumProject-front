import React, { useState, useEffect } from 'react';
import { useStore } from '../store/myStore';
import CreateTopicModal from '../components/CreateTopicModal';
import { http } from '../plugins';
import TopicComp from '../components/TopicComp';
import { useNavigate } from 'react-router-dom';

function ForumPage() {
  const [showModal, setShowModal] = useState(false);
  const { user } = useStore((state) => state);
  const { topics, setTopics } = useStore((state) => state);
  const navigate = useNavigate();

  const handleCreateTopicClick = () => {
    setShowModal(true);
  };

  const fetchTopics = async () => {
    try {
      const response = await http.get('getTopics');

      const sortedTopics = response.data.sort((a, b) => a.title.localeCompare(b.title));

      setTopics(sortedTopics);
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
    fetchTopics();
  }, []);

  return (
    <div className='forum_page_main__div'>
      <h1>Topics that we talk about:</h1>
      {topics && (
        <div className='topics_main__div'>
          {topics.map((topic) => (
            <TopicComp key={topic._id} topic={topic} />
          ))}
        </div>
      )}
      <div className='forum_button__div'>
        {user.role === 'admin' && (
          <button className='primary-btn' onClick={handleCreateTopicClick}>
            Create Topic
          </button>
        )}
      </div>
      {showModal && <CreateTopicModal fetchTopics={fetchTopics} onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default ForumPage;
