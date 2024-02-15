import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useStore } from '../store/myStore';
import http from '../plugins/http';

const socket = io('ws://localhost:2500');

const MessagesPage = () => {
  const [chatUsers, setChatUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { user } = useStore((state) => state);

  useEffect(() => {
    // Adjusted to correctly manage the socket connection
    const socket = io('http://localhost:2500', { withCredentials: true });

    http.getWithToken(`api/chat/users/${user._id}`).then((response) => {
      console.log(response.data); // `response.data` contains the actual data
      setChatUsers(response.data || []);
    });

    if (selectedUser) {
      http.getWithToken(`api/messages/${user._id}/${selectedUser._id}`).then((response) => {
        setMessages(response.data || []);
      });
    }

    socket.on('receiveMessage', (message) => {
      if ((message.from === selectedUser._id && message.to === user._id) || (message.from === user._id && message.to === selectedUser._id)) {
        setMessages((prev) => [...prev, message]);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [selectedUser, user._id]);

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
