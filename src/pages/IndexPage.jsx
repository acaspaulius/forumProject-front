import React from 'react';
import { useNavigate } from 'react-router-dom';

function IndexPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className='index_page_main__div'>
      <div className='index_page_welcome__div'>
        <h1>Welcome to The Stoat Forum!</h1>
        <h2>
          Discover a world of ideas, engage in vibrant discussions, and connect with like-minded individuals. Join our forum today to start your
          journey of sharing, learning, and growing together!
        </h2>
      </div>
      <div className='index_page_auth_btns__div'>
        <button onClick={handleLogin} className='primary-btn'>
          SIGN IN
        </button>
        <button onClick={handleRegister} className='primary-btn'>
          REGISTER
        </button>
      </div>
    </div>
  );
}

export default IndexPage;
