import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useStore } from '../store/myStore';

const socket = io('ws://localhost:2500'); // Adjust to match your server

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
    <div className='modal'>
      <div className='modal-content'>
        <span className='close' onClick={onClose}>
          &times;
        </span>
        <h4>Send Message to {selectedUser.username}</h4>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default SendMessageModal;
