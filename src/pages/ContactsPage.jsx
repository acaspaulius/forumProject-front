import React from 'react';

const ContactsPage = () => {
  return (
    <div className='contacts_page_main__div'>
      <h1>Contact Us</h1>
      <p>If you have any questions, feedback, or need assistance, please don't hesitate to reach out to us through the following channels:</p>

      <div className='contact_method__div'>
        <h2>Email</h2>
        <p>For verification issues, account support, and other inquiries, send us an email:</p>
        <a href='mailto:vrfctncntrl@gmail.com'>vrfctncntrl@gmail.com</a>
      </div>

      <div className='contact_method__div'>
        <h2>Phone</h2>
        <p>You can also reach us by phone during our business hours (9am - 5pm UTC):</p>
        <p>
          <strong>+1 234 567 890</strong>
        </p>
      </div>

      <div className='contact_method__div'>
        <h2>Mail</h2>
        <p>For formal inquiries or if you prefer traditional mail, please send letters to:</p>
        <address>
          The Stoat Forum
          <br />
          548 Market St. #16093
          <br />
          San Francisco, California 94104
        </address>
      </div>
    </div>
  );
};

export default ContactsPage;
