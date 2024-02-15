import React from 'react';
import RegisterForm from '../components/RegisterForm';

const RegisterPage = ({ error, setError }) => {
  return (
    <div>
      <RegisterForm error={error} setError={setError} />
    </div>
  );
};

export default RegisterPage;
