import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import UserPage from './pages/UserPage';
import ForumPage from './pages/ForumPage';
import DiscussionsPage from './pages/DiscussionsPage';
import SingleDiscussionPage from './pages/SingleDiscussionPage';
import MessagesPage from './pages/MessagesPage';
import FAQPage from './pages/FAQPage';
import ContactsPage from './pages/ContactsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import PrivateRoute from './routes/PrivateRoute/PrivateRoute';
import PublicRoute from './routes/PublicRoute/PublicRoute';
import { socket } from './plugins';
import { useEffect } from 'react';
import { useStore } from './store/myStore';

function App() {
  const { user, setUnreadMessages, unreadMessages } = useStore((state) => state);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.to === user._id) {
        setUnreadMessages(unreadMessages + event.value);
      }
    };

    socket.on('receiveUnreadCount', handleMessage);

    return () => {
      socket.off('receiveUnreadCount', handleMessage);
    };
  }, [unreadMessages, user]);

  useEffect(() => {
    socket.emit('requestUnreadMessages', {
      from: user._id,
      socketId: socket.id,
    });
  }, [user]);

  useEffect(() => {
    const handleEvent = (event) => {
      setUnreadMessages(event.content.unread);
    };

    socket.on('receiveUnreadMessages', handleEvent);

    return () => {
      socket.off('receiveUnreadMessages', handleEvent);
    };
  }, [unreadMessages]);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<PublicRoute Component={IndexPage} />} />
        <Route path='/register' element={<PublicRoute Component={RegisterPage} />} />
        <Route path='/login' element={<PublicRoute Component={LoginPage} />} />
        <Route path='/faq' element={<PublicRoute Component={FAQPage} />} />
        <Route path='/contact' element={<PublicRoute Component={ContactsPage} />} />
        <Route path='/privacy' element={<PublicRoute Component={PrivacyPolicyPage} />} />
        <Route path='/terms' element={<PublicRoute Component={TermsOfServicePage} />} />
        <Route path='/profile' element={<PrivateRoute Component={UserPage} />} />
        <Route path='/forum' element={<PrivateRoute Component={ForumPage} />} />
        <Route path='/forum/:topic' element={<PrivateRoute Component={DiscussionsPage} />} />
        <Route path='/forum/:topic/:id' element={<PrivateRoute Component={SingleDiscussionPage} />} />
        <Route path='/messages' element={<PrivateRoute Component={MessagesPage} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
