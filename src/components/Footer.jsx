import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };
  return (
    <footer className='footer-container'>
      <div className='footer_content__div'>
        <div className='footer_quick_links__div'>
          <Link to='/faq' className={isActive('/faq') ? 'active' : ''}>
            FAQ
          </Link>
          <Link to='/contact' className={isActive('/contact') ? 'active' : ''}>
            Contact Us
          </Link>
          <Link to='/privacy' className={isActive('/privacy') ? 'active' : ''}>
            Privacy Policy
          </Link>
          <Link to='/terms' className={isActive('/terms') ? 'active' : ''}>
            Terms of Service
          </Link>
        </div>
        <div className='copyright'>{`© ${new Date().getFullYear()} The Stoat Forum. All rights reserved.`}</div>
      </div>
    </footer>
  );
};

export default Footer;
