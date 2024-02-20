import React from 'react';

const CreateDiscussionModal = ({ isOpen, onClose, onSave, title, description, setTitle, setDescription }) => {
  if (!isOpen) return null;

  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <div className='modal-discussion-content'>
          <h2>Create New Discussion</h2>
          <input type='text' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className='modal-buttons-content'>
          <button className='primary-btn' onClick={onSave}>
            Save
          </button>
          <button className='secondary-btn ' onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateDiscussionModal;
