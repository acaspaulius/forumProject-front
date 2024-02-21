import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '../store/myStore';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { unreadMessages, clearUser } = useStore((state) => state);
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    clearUser();
    navigate('/');
  };

  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  return (
    <div className='header_div'>
      {token ? (
        <div className='header_links'>
          <Link to='/profile' className={isActive('/profile') ? 'active' : ''}>
            PROFILE
          </Link>
          <Link to='/forum' className={isActive('/forum') ? 'active' : ''}>
            FORUM
          </Link>
          <div>
            <Link to='/messages' className={isActive('/messages') ? 'active' : ''}>
              MESSAGES
              {unreadMessages > 0 && <span className='unread_messages'>{`(${unreadMessages})`}</span>}
            </Link>
          </div>
        </div>
      ) : (
        <div className='header_links'>
          <Link to='/'>HOME</Link>
          <Link to='/register' className={isActive('/register') ? 'active' : ''}>
            REGISTER
          </Link>
          <Link to='/login' className={isActive('/login') ? 'active' : ''}>
            SIGN IN
          </Link>
        </div>
      )}
      {token && (
        <button onClick={handleLogout} className='primary-btn logout-btn'>
          LOGOUT
        </button>
      )}
    </div>
  );
}

export default Header;
