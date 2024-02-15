import React from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage = ({ error, setError }) => {
  return (
    <div>
      <LoginForm error={error} setError={setError} />
    </div>
  );
};

export default LoginPage;
