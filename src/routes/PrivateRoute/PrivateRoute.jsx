import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/myStore';
import http from '../../plugins/http';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function PrivateRoute({ Component }) {
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const { user, setUser } = useStore((store) => store);
  const token = localStorage.getItem('token');

  const autoLoginUser = async () => {
    try {
      const response = await http.postWithToken('autoLogin', { token });

      setUser(response.data);
      setIsLoading(false);
    } catch (error) {
      // Network Error
      console.error(error);
      if ([400, 401, 403, 404, 500].includes(error.code)) {
        localStorage.removeItem('token');
        navigate('/');
      }
    }
  };

  useEffect(() => {
    if (!token) return navigate('/', { replace: true });

    if (!!Object.keys(user).length && !!token) {
      setIsLoading(false);
      return;
    }

    if (!!token && !Object.keys(user).length) autoLoginUser();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Header />
      <Component />
      <Footer />
    </>
  );
}

export default PrivateRoute;
