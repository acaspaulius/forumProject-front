import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { http } from '../plugins';
import DiscussionComp from '../components/DiscussionComp'; // Make sure the path is correct
import CreateDiscussionModal from '../components/CreateDiscussionModal';

const DiscussionsPage = () => {
  const [discussions, setDiscussions] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { topic } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDiscussions();
  }, [topic]);

  const fetchDiscussions = async () => {
    try {
      const response = await http.get(`forum/${topic}`);
      setDiscussions(response.data.sort((a, b) => new Date(b.time) - new Date(a.time)));
    } catch (error) {
      // Network Error
      console.error(error);
      if ([401, 403, 404].includes(error.code)) {
        localStorage.removeItem('token');
        navigate('/');
      }
    }
  };

  const createNewDiscussion = async () => {
    const newDiscussion = { title, description, topic };

    try {
      await http.postWithToken('discussions', newDiscussion);
      fetchDiscussions();
      setIsModalOpen(false);
    } catch (error) {
      // Network Error
      console.error(error);
    }
  };

  return (
    <div className='discussions_page_main__div'>
      <h1>Discussions about {topic.charAt(0).toUpperCase() + topic.slice(1)}</h1>
      {discussions.length > 0 ? (
        discussions.map((discussion) => <DiscussionComp key={discussion._id} discussion={discussion} topic={topic} />)
      ) : (
        <div className='discussion_comp__div no-discussions-message'>No discussions yet...</div>
      )}
      <div className='discussions_button__div'>
        <button className='primary-btn' onClick={() => setIsModalOpen(true)}>
          Create New Discussion
        </button>
      </div>
      <CreateDiscussionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={createNewDiscussion}
        title={title}
        description={description}
        setTitle={setTitle}
        setDescription={setDescription}
      />
    </div>
  );
};

export default DiscussionsPage;
