// DiscussionsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import http from '../plugins/http';
import DiscussionComp from '../components/DiscussionComp'; // Make sure the path is correct
import CreateDiscussionModal from '../components/CreateDiscussionModal';

const DiscussionsPage = () => {
  const [discussions, setDiscussions] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { topic } = useParams();

  useEffect(() => {
    fetchDiscussions();
  }, [topic]);

  const fetchDiscussions = async () => {
    const response = await http.get(`forum/${topic}`);
    if (response.success) {
      setDiscussions(response.data);
    } else {
      // Handle error
      console.error(response.message);
    }
  };

  const createNewDiscussion = async () => {
    const newDiscussion = { title, description, topic };
    const response = await http.postWithToken('discussions', newDiscussion);
    if (response.success) {
      fetchDiscussions();
      setIsModalOpen(false); // Refresh the list of discussions
    } else {
      // Handle error
      console.error(response.message);
    }
  };

  return (
    <div className='discussions_page_main__div'>
      <h1>Discussions about {topic.charAt(0).toUpperCase() + topic.slice(1)}</h1>
      {discussions.map((discussion) => (
        <DiscussionComp key={discussion._id} discussion={discussion} topic={topic} />
      ))}
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
