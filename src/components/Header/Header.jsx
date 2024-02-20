import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../store/myStore';

import './header.css';

function Header() {
  const navigate = useNavigate();
  const { clearUser } = useStore((state) => state);
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    clearUser();
    navigate('/');
  };

  return (
    <div className='header_div'>
      {token ? (
        <div className='header_links'>
          <Link to='/profile'>PROFILE</Link>
          <Link to='/forum'>FORUM</Link>
          <Link to='/messages'>MESSAGES</Link>
        </div>
      ) : (
        <div className='header_links'>
          <Link to='/'>HOME</Link>
          <Link to='/register'>REGISTER</Link>
          <Link to='/login'>SIGN IN</Link>
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
