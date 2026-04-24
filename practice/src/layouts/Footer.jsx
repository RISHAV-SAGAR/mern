import React from "react";
import "../css/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} EduMart — All rights reserved.</p>
    </footer>
  );
}

export default Footer;
