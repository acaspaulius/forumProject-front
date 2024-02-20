import { Link } from 'react-router-dom';

import './footer.css';

const Footer = () => {
  return (
    <footer className='footer-container'>
      <div className='footer_content__div'>
        <div className='footer_quick_links__div'>
          <Link to='/faq'>FAQ</Link>
          <Link to='/contact'>Contact Us</Link>
          <Link to='/privacy'>Privacy Policy</Link>
          <Link to='/terms'>Terms of Service</Link>
        </div>
        <div className='copyright'>{`© ${new Date().getFullYear()} The Stoat Forum. All rights reserved.`}</div>
      </div>
    </footer>
  );
};

export default Footer;
