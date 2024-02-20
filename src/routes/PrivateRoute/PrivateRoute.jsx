import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/myStore';
import http from '../../plugins/http';
import { Header, Footer } from '../../components';

function PrivateRoute({ Component }) {
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const { user, setUser } = useStore((store) => store);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return navigate('/', { replace: true });

    if (!!Object.keys(user).length && !!token) {
      setIsLoading(false);
      return;
    }

    if (!!token && !Object.keys(user).length) {
      http.postWithToken('autoLogin', { token }).then((response) => {
        if (response.success) {
          setUser(response.data);
          setIsLoading(false);
        } else {
          console.log('123');
          localStorage.removeItem('token');
          navigate('/');
        }
      });
    }
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
