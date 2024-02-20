import React, { useState } from 'react';
import { http } from '../plugins';
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const register = async (event) => {
    event.preventDefault();

    const username = event.target.elements.username.value;
    const email = event.target.elements.email.value;
    const password1 = event.target.elements.password1.value;
    const password2 = event.target.elements.password2.value;
    const role = event.target.elements.role.value;

    const user = { username, email, password1, password2, role };
    try {
      const response = await http.post('register', user);
      if (response.success) {
        // setError(response.message);
        setSuccess(true);
      } else {
        // setError(response.message);
        setSuccess(false);
      }
    } catch (error) {
      // setError("Error occured during registration.");
      setSuccess(false);
    }
  };

  return (
    <div className='register_page_main__div'>
      <form onSubmit={register} className='registration_form'>
        {/* <div className='background-image' /> */}
        <h2>REGISTRATION</h2>
        <input type='text' name='username' placeholder='Username' required />
        <input type='text' name='email' placeholder='Email Address' required />
        <input type='password' name='password1' placeholder='Password' required />
        <input type='password' name='password2' placeholder='Confirm Password' required />
        <select name='role' defaultValue='Select Role'>
          <option disabled>Select Role</option>
          <option value='admin'>Admin</option>
          <option value='user'>User</option>
        </select>
        {/* {error && <div className="error">{error}</div>} */}
        {!success ? (
          <button type='submit' className='primary-btn'>
            REGISTER
          </button>
        ) : (
          <button onClick={() => navigate('/login')} className='primary-btn'>
            SIGN IN
          </button>
        )}
      </form>
    </div>
  );
}

export default RegisterForm;
