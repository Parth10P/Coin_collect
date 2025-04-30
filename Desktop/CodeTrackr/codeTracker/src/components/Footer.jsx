import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p style={{fontSize:'15px'}}>© 2025 CodeTracker. All rights reserved.</p>

      <p lassName="foot-style" style={{fontSize:'12px'}}>
        Made with ❤️ by <a href="https://github.com/parth10p" target="_blank" rel="noopener noreferrer">Patel Parthkumar</a>
      </p>
    </footer>
  );
};

export default Footer;