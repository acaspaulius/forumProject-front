import React, { useRef } from 'react';
import http from '../plugins/http';
import { useStore } from '../store/myStore';

function CreateTopicModal({ onClose }) {
  const titleRef = useRef(null);
  const { topics, setTopics } = useStore((state) => state);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = titleRef.current.value;
    try {
      const data = await http.postWithToken('topics', { title });
      if (data.success) {
        setTopics([...topics, data.data]);

        onClose();
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error creating topic:', error);
    }
  };

  return (
    <div className='modal'>
      <div className='modal-content'>
        <h2>Create New Topic</h2>
        <form onSubmit={handleSubmit}>
          <input type='text' ref={titleRef} placeholder='Topic Title' required />
          <button type='submit'>Create</button>
          <button onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default CreateTopicModal;
