import React, { useState } from 'react';
import http from '../plugins/http';
import { useStore } from '../store/myStore';
import { useNavigate } from 'react-router';
import ActivationModal from './ActivationModal';

function LoginForm({ error, setError }) {
  const { setUser } = useStore((state) => state);
  const [showActivationModal, setShowActivationModal] = useState(false);
  const [usernameForActivation, setUsernameForActivation] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    const username = event.target.elements.username.value;
    const password1 = event.target.elements.password1.value;
    const loginCheckbox = event.target.elements.loginCheckbox.checked;
    const user = { username, password1 };

    try {
      const response = await http.post('login', user);
      if (response.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('autoLogin', loginCheckbox);
        setUser(response.data);
        navigate('/profile');
      } else if (response.message === 'User is not verified. Please enter activation code.') {
        setUsernameForActivation(username);
        setShowActivationModal(true);
      } else {
        setError(response.message || 'Login error. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  const handleActivation = async (code) => {
    try {
      const response = await http.post('verifyActivationCode', {
        username: usernameForActivation,
        activationCode: code,
      });
      if (response.success) {
        console.log('FRONT ACTIVATION RESPONSE', response);
        localStorage.setItem('token', response.data.token);
        setUser({ username: response.data.username });
        setShowActivationModal(false);
        navigate('/profile');
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className='login_page_main__div'>
      <form onSubmit={handleLogin} className='login-form'>
        <div className='background-image' />
        <h2>SIGN IN</h2>
        <input type='text' name='username' placeholder='Username' />
        <input type='password' name='password1' placeholder='Password' />
        <div className='checkbox-container'>
          <input type='checkbox' name='loginCheckbox' className='auto-login' />
          <label htmlFor='auto-login'>Keep me signed in</label>
        </div>
        <div className='error'>{error}</div>
        <button type='submit' className='primary-btn'>
          SIGN IN
        </button>
      </form>
      {showActivationModal && (
        <ActivationModal isOpen={showActivationModal} onClose={() => setShowActivationModal(false)} onActivate={handleActivation} />
      )}
    </div>
  );
}

export default LoginForm;
