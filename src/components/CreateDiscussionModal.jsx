import React from 'react';

const CreateDiscussionModal = ({ isOpen, onClose, onSave, title, description, setTitle, setDescription }) => {
  if (!isOpen) return null;

  return (
    <div className='modal'>
      <div className='modal-content'>
        <span className='close' onClick={onClose}>
          &times;
        </span>
        <h2>Create New Discussion</h2>
        <input type='text' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} />
        <button onClick={onSave}>Save Discussion</button>
      </div>
    </div>
  );
};

export default CreateDiscussionModal;
