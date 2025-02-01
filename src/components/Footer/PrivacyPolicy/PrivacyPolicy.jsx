import React from 'react';
import './PrivacyPolicy.css';
import { FaShieldAlt, FaInfoCircle } from 'react-icons/fa';
import privacyPolicy from'../PrivacyPolicy/PrivacyPolicy';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-container">
      <div className="privacy-header">
        <img src={privacyPolicy} alt="Privacy Policy" className="privacy-image" />
        <h1>Privacy Policy</h1>
        <div className="privacy-meta">
          <div className="company-info">
            <span className="company-label">KAIRAA TECHSERVE Pvt Ltd</span>
          </div>
        </div>
      </div>

      <div className="privacy-content">
        <div className="privacy-notice">
          <FaShieldAlt />
          <p>The licensed owner of the brand pinknow.in and the website pinknow.in ("The Site") is KAIRAA TECHSERVE Pvt Ltd ("KTSPL"). KTSPL values your privacy. This Privacy Policy gives concise information about how KTSPL collects and uses your data on the Site.</p>
        </div>

        <div className="privacy-section">
          <h2>What information is being collected about you?</h2>
          <p>KTSPL may gather the following personally identifying information about you as part of the Site's registration process: Name, including first and last name, email address, mobile phone number and contact details, postal code, demographic profile (such as your age, gender, occupation, education, address, and so on), and information about the pages on the site you visit/access, links you click on the site, the number of times you access the page, and any other browsing information.</p>
        </div>

        <div className="privacy-section">
          <h2>How do we gather information?</h2>
          <p>KTSPL will only gather personally identifiable information about you as part of a voluntary registration process, an online survey, or a combination of the two. There may be links to other websites on the Site. KTSPL is not liable for the privacy practices of third-party websites that it does not own, manage, or control. The Site and third-party suppliers, such as Google, utilize first-party cookies (such as the Google Analytics cookie) and third-party cookies (such as the DoubleClick cookie) in conjunction to inform, optimize, and deliver ads based on previous visits to the Site.</p>
        </div>

        <div className="privacy-section">
          <h2>What is the information used for?</h2>
          <p>KTSPL will use your personal information to provide you with personalized features on the Site as well as promotional offers through the Site and other channels. KTSPL will also share this information with its business affiliates and partners so that they can contact you if necessary to offer the services you have requested. KTSPL shall utilize this information to retain transaction history in accordance with applicable law or policy.</p>
        </div>

        <div className="privacy-section">
          <h2>Who will have access to your information?</h2>
          <p>KTSPL will never use your financial information for anything other than completing a transaction with you. KTSPL will not rent, sell, or share your personally identifiable information, and will not disclose any of your personally identifiable information to third parties.</p>
        </div>

        <div className="privacy-section">
          <h2>How do we safeguard your data?</h2>
          <p>KTSPL has in place appropriate and reasonable security measures and procedures to protect against the loss, misuse, unauthorized access, damage, and alteration of information under its control, in compliance with relevant laws.</p>
        </div>

        <div className="privacy-section">
          <h2>How can you correct information inaccuracies?</h2>
          <p>The Site allows you to correct or update any information you have provided online. If you lose your access information, please contact support@picknow.in.</p>
        </div>

        <div className="privacy-section">
          <h2>Policy revisions</h2>
          <p>KTSPL reserves the right, at any time, to change or update this policy. Such changes will take effect as soon as they are posted on the Site.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 