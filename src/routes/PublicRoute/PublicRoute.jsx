import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function PublicRoute({ Component }) {
  const location = useLocation();

  const token = localStorage.getItem('token');

  if (token && !['/faq', '/contact', '/privacy', '/terms'].includes(location.pathname)) {
    return <Navigate to='/profile' />;
  }

  return (
    <>
      <Header />
      <Component />
      <Footer />
    </>
  );
}

export default PublicRoute;
