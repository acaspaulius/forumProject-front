import React, { useState, useEffect } from 'react';
import { useStore } from '../store/myStore';
import http from '../plugins/http';
import socket from '../plugins/socket';

const MessagesPage = () => {
  const [chatUsers, setChatUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { user } = useStore((state) => state);

  useEffect(() => {
    http.getWithToken('api/chat/users').then((response) => setChatUsers(response.data));
  }, []);

  useEffect(() => {
    if (selectedUser) {
      http.getWithToken(`api/messages/${selectedUser._id}`).then((response) => setMessages(response.data));
    }
  }, [selectedUser]);

  useEffect(() => {
    const handleMessage = (event) => {
      if (!selectedUser) return;

      const { from, to } = event;

      if ((from === selectedUser._id && to === user._id) || (from === user._id && to === selectedUser._id)) {
        setMessages((prev) => [...prev, event.content]);
      }
    };

    socket.on('receiveMessage', handleMessage);

    return () => {
      socket.off('receiveMessage', handleMessage);
    };
  }, [selectedUser]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const messageData = {
        from: user._id, // Ensure user._id is defined and valid
        to: selectedUser._id, // Ensure selectedUser._id is defined and valid
        message: newMessage,
        createdAt: new Date().toISOString(),
      };

      socket.emit('sendMessage', messageData);

      setNewMessage('');
    }
  };

  if (!chatUsers.length) return <div>Loading...</div>;

  return (
    <div className='messages_page_main__div'>
      {chatUsers && (
        <aside className='messages_page_users'>
          {chatUsers.map((chatUser) => (
            <div key={chatUser._id} onClick={() => setSelectedUser(chatUser)}>
              <img src={chatUser.image} alt={chatUser.name} /> {/* Ensure `chatUser.image` exists or handle its absence */}
              <div>{chatUser.username}</div> {/* This will display the username */}
            </div>
          ))}
        </aside>
      )}
      <section className='messages_page_chat'>
        <div className='chat_messages'>
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.from === user._id ? 'sent' : 'received'}`}>
              {message.message}
            </div>
          ))}
        </div>
        <div className='chat_input'>
          <input type='text' value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder='Type a message...' />
          <button onClick={sendMessage}>Send</button>
        </div>
      </section>
    </div>
  );
};

export default MessagesPage;
