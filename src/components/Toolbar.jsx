import React from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useStore } from '../store/myStore';

function Toolbar() {
  const { user, setUser } = useStore((state) => state);
  const navigate = useNavigate();

  function logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('autoLogin');
    setUser(null);
    navigate('/');
  }

  return (
    <div className='toolbar__div'>
      <div className='toolbar_links_div'>
        <Link to='/profile'>MY PROFILE</Link>
        <Link to='/forum'>FORUM</Link>
        <Link to='/messages'>MESSAGES</Link>
      </div>
      <button onClick={logOut} className='primary-btn logout'>
        LOGOUT
      </button>
    </div>
  );
}

export default Toolbar;
