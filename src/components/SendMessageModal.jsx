import React, { useState } from 'react';
import { useStore } from '../store/myStore';
import { socket } from '../plugins';

const SendMessageModal = ({ selectedUser, onClose }) => {
  const [message, setMessage] = useState('');

  const { user } = useStore((state) => state);

  const sendMessage = () => {
    socket.emit('sendMessage', {
      from: user._id,
      to: selectedUser._id,
      message: message,
      createdAt: new Date().toISOString(),
    });
    setMessage('');
  };

  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <h3>Send Message to {selectedUser.username}</h3>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder='Your message...' />
        <div className='modal-buttons-content'>
          <button className='primary-btn' onClick={sendMessage}>
            Send
          </button>
          <button className='secondary-btn' onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendMessageModal;
