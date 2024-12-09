// src/Contact.js
import React from 'react';
import './Contact.css'; // Create a separate CSS file for styling

function Contact() {
  return (
    <div className="contact-container">
      <h1 className="contact-title">Contact CopperShore</h1>
      <p>If you’d like to get in touch or learn more about CopperShore, you can find us here:</p>

      <div className="contact-details">
        <p>
          <strong>Email here:</strong> <a href="mailto:coppershorre@gmail.com">coppershorre@gmail.com</a>
        </p>
        <p>
          <strong>More of CopperShore:</strong>{' '}
          <a href="https://www.youtube.com/@Coppershore" target="_blank" rel="noopener noreferrer">
            Visit our YouTube channel
          </a>
        </p>
      </div>
    </div>
  );
}

export default Contact;
