import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import UserPage from './pages/UserPage';
import Footer from './components/Footer';
import Toolbar from './components/Toolbar';
import ForumPage from './pages/ForumPage';
import DiscussionsPage from './pages/DiscussionsPage';
import SingleDiscussionPage from './pages/SingleDiscussionPage';
import MessagesPage from './pages/MessagesPage';

function App() {
  const [error, setError] = useState('');

  const ConditionalToolbar = () => {
    const location = useLocation();
    if (location.pathname === '/' || location.pathname === '/login' || location.pathname === '/register') {
      return null;
    }
    return <Toolbar />;
  };

  return (
    <div className='App'>
      <BrowserRouter>
        <ConditionalToolbar />
        <Routes>
          <Route index element={<IndexPage />} />
          <Route path='/register' element={<RegisterPage error={error} setError={setError} />} />
          <Route path='/login' element={<LoginPage error={error} setError={setError} />} />
          <Route path='/profile' element={<UserPage />} />
          <Route path='/forum' element={<ForumPage />} />
          <Route path='/forum/:topic' element={<DiscussionsPage />} />
          <Route path='/forum/:topic/:id' element={<SingleDiscussionPage />} />
          <Route path='/messages' element={<MessagesPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
