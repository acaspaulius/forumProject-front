import React, { useState } from 'react';
import { http } from '../plugins';
import { useStore } from '../store/myStore';
import { useNavigate } from 'react-router';
import ActivationModal from './ActivationModal';

function LoginForm() {
  const { setUser } = useStore((state) => state);
  const [showActivationModal, setShowActivationModal] = useState(false);
  const [usernameForActivation, setUsernameForActivation] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    setError('');

    event.preventDefault();

    const username = event.target.elements.username.value;
    const password1 = event.target.elements.password1.value;
    const loginCheckbox = event.target.elements.loginCheckbox.checked;
    const user = { username, password1, loginCheckbox };

    try {
      const response = await http.post('login', user);

      if (response.status === 201) {
        // user tries to login first time
        setUsernameForActivation(username);
        setShowActivationModal(true);
      } else {
        localStorage.setItem('token', response.data.token);
        setUser(response.data);
        navigate('/profile');
      }
    } catch (error) {
      // Network Error
      console.error(error);
      setError(error.message);
    }
  };

  const handleActivation = async (code) => {
    try {
      const response = await http.post('verifyActivationCode', {
        username: usernameForActivation,
        activationCode: code,
      });

      localStorage.setItem('token', response.data.token);
      setUser(response.data);
      setShowActivationModal(false);
      navigate('/profile');
    } catch (error) {
      // Network Error
      setError(error.message);
      console.error(error);
    }
  };

  return (
    <div className='login_page_main__div'>
      <form onSubmit={handleLogin} className='login_form'>
        <h2>SIGN IN</h2>
        <input type='text' name='username' placeholder='Username' />
        <input type='password' name='password1' placeholder='Password' />
        <div className='checkbox-container'>
          <input type='checkbox' name='loginCheckbox' className='auto-login' />
          <label htmlFor='auto-login'>Keep me signed in</label>
        </div>
        {error && <div className='error'>{error}</div>}
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
