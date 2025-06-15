import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <p className="footer-title">
        All rights reserved &copy; {new Date().getFullYear()} | Job Application
        Tracker
      </p>
    </div>
  );
};

export default Footer;
