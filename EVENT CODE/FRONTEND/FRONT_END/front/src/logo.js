// Logo.js
import React from 'react';
import idLogo from './id_logo.png'; // Import the logo image here

function Logo() {
  return (
    <div className="logo-container">
      <img src={idLogo} alt="Institute Logo" className="logo" />
    </div>
  );
}

export default Logo;