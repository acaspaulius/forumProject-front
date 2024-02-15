import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/myStore';
import CreateTopicModal from '../components/CreateTopicModal';
import http from '../plugins/http';
import TopicComp from '../components/TopicComp';

function ForumPage() {
  const [showModal, setShowModal] = useState(false);
  const { user, setUser } = useStore((state) => state);
  const { topics, setTopics } = useStore((state) => state);

  const handleCreateTopicClick = () => {
    setShowModal(true);
  };

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await http.get('getTopics');
        if (response.success) {
          setTopics(response.data);
        } else {
          console.error('Failed to fetch topics:', response.message);
        }
      } catch (error) {
        console.error('Error fetching topics:', error);
      }
    };

    fetchTopics();
  }, []);

  return (
    <div className='forum_page_main__div'>
      <h1>Topics that we talk about</h1>
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

      {showModal && <CreateTopicModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default ForumPage;
