import React from 'react';
import { Link } from 'react-router-dom';

const FAQPage = () => {
  return (
    <div className='faq_page_main__div'>
      <h1>Frequently Asked Questions</h1>
      <div className='faq_question__div'>
        <h2>How do I create an account?</h2>
        <p>
          To join our community, click on the <Link to='/register'>Sign Up</Link> link at the top of the page and follow the registration process. If
          you already do have an account - <Link to='/login'>Sign In</Link>.
        </p>
      </div>
      <div className='faq_question__div'>
        <h2>Can I change my username?</h2>
        <p>
          For now, usernames are fixed after registration. If you have a compelling reason to change your username, please contact our support team.
        </p>
      </div>
      <div className='faq_question__div'>
        <h2>Can I change my profile picture?</h2>
        <p>Yes! Just paste the new URL in your profile page input below the current profile picture and click the button "Update Photo".</p>
      </div>
      <div className='faq_question__div'>
        <h2>How do I start a new discussion?</h2>
        <p>
          After logging in, navigate to the relevant topic and click on the "Create Discussion" button. Make sure your discussion title is clear and
          concise to get the best engagement from the community.
        </p>
      </div>
      <div className='faq_question__div'>
        <h2>What are the community guidelines?</h2>
        <p>Our community thrives on respect, inclusivity, and helpfulness.</p>
      </div>
      <div className='faq_question__div'>
        <h2>How do I report inappropriate content?</h2>
        <p>
          If you come across content that violates our guidelines, please contact our support team. Our moderation team will review the report as soon
          as possible.
        </p>
      </div>
      <div className='faq_question__div'>
        <h2>How can I deactivate my account?</h2>
        <p>Currently, account deactivation is not available. If you have any trouble, our support team can assist you.</p>
      </div>
    </div>
  );
};

export default FAQPage;
