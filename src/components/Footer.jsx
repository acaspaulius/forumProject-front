import { useEffect } from 'react';
import http from '../plugins/http';
import { useStore } from '../store/myStore';
import { useNavigate, Link } from 'react-router-dom';

const Footer = () => {
  const { user, setUser } = useStore((state) => state);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const autoLogin = localStorage.getItem('autoLogin');

  useEffect(() => {
    if (token && !user?.username) {
      http
        .post('autoLogin', { token })
        .then((response) => {
          setUser(response.data);
          navigate('/profile');
        })
        .catch((error) => {});
    }
    if (autoLogin !== 'true') {
      navigate('/');
    }
  }, []);

  return (
    <footer className='footer'>
      <div className='footer-content'>
        <div className='quick-links'>
          <Link to='/faq'>FAQ</Link>
          <Link to='/contact'>Contact Us</Link>
          <Link to='/privacy'>Privacy Policy</Link>
          <Link to='/terms'>Terms of Service</Link>
        </div>
        <div className='copyright'>© 2024 The Stoat Forum. All rights reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;
