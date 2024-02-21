import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../store/myStore';
import { http } from '../plugins';
import { socket } from '../plugins';
import { useNavigate } from 'react-router-dom';

const MessagesPage = () => {
  const [chatUsers, setChatUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);
  const { user, unreadMessages } = useStore((state) => state);
  const navigate = useNavigate();

  const fetchChatUsers = async () => {
    try {
      const response = await http.getWithToken('chat/users');

      setChatUsers(response.data);
    } catch (error) {
      // Network Error
      console.error(error);
      if ([401, 403, 404].includes(error.code)) {
        localStorage.removeItem('token');
        navigate('/');
      }
    }
  };

  const fetchUserMessages = async () => {
    try {
      const response = await http.getWithToken(`messages/${selectedUser._id}`);

      setMessages(response.data);
    } catch (error) {
      // Network Error
      console.error(error);
      if ([401, 403, 404].includes(error.code)) {
        localStorage.removeItem('token');
        navigate('/');
      }
    }
  };

  useEffect(() => {
    fetchChatUsers();
  }, []);

  useEffect(() => {
    if (selectedUser) fetchUserMessages();
  }, [selectedUser]);

  useEffect(() => {
    const handleMessage = (event) => {
      const { from, to } = event;

      fetchChatUsers();

      if (selectedUser) {
        if ((from === selectedUser._id && to === user._id) || (from === user._id && to === selectedUser._id)) {
          setMessages((prev) => [...prev, event.content]);

          socket.emit('markAsRead', {
            from: selectedUser._id,
            to: user._id,
          });
        }
      }
    };

    socket.on('receiveMessage', handleMessage);

    return () => {
      socket.off('receiveMessage', handleMessage);
    };
  }, [selectedUser, user, chatUsers, unreadMessages]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const messageData = {
        from: user._id,
        to: selectedUser._id,
        message: newMessage,
        createdAt: new Date().toISOString(),
      };

      socket.emit('sendMessage', messageData);

      setNewMessage('');
    }
  };

  const handleUserSelection = (chatUser) => {
    setSelectedUser(chatUser);

    socket.emit('markAsRead', {
      from: chatUser._id,
      to: user._id,
    });

    const manipulatedChatUserIndex = chatUsers.findIndex((value) => value._id === chatUser._id);

    const manipulatedChatUsers = [...chatUsers];

    manipulatedChatUsers[manipulatedChatUserIndex].unreadMessagesCount = 0;

    setChatUsers(manipulatedChatUsers);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className='messages_page_main__div'>
      {chatUsers && (
        <div className='messages_page_users'>
          {chatUsers.map((chatUser) => (
            <div
              className={`messages_page_user__div ${selectedUser && selectedUser._id === chatUser._id ? 'active_chat_user' : ''}`}
              key={chatUser._id}
              onClick={() => handleUserSelection(chatUser)}
            >
              <div className='user_image_container'>
                <img src={chatUser.image} alt={chatUser.username} className='user_image' />
                {chatUser.unreadMessagesCount > 0 && <div className='unread_dot'></div>}
              </div>
              <div>{chatUser.username}</div>
            </div>
          ))}
        </div>
      )}
      <div className='messages_page_chat'>
        <div className='chat_messages messages_background'>
          <div className='chat_messages_background'>
            {messages.length > 0 ? (
              messages.map((message, index) => (
                <div key={index} className={`message ${message.from === user._id ? 'sent' : 'received'}`}>
                  {message.message}
                </div>
              ))
            ) : (
              <div className='no-messages-message'>No messages yet...</div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <div className='chat_input'>
          <input type='text' value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder='Type a message...' />
          <button onClick={sendMessage} disabled={!selectedUser}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
