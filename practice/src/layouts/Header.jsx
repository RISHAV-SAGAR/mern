import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import "../css/Header.css";

function Header() {
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { currentUser, isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/home");
  };

  return (
    <nav className="navbar">
      <Link to="/home" className="logoLink">
        <h2 className="logo">EduMart</h2>
      </Link>

      <div className="navLinks">
        <Link to="/home" className="navItem">Home</Link>
        <Link to="/books" className="navItem">Books & PDFs</Link>
        <Link to="/courses" className="navItem">Courses</Link>
        <Link to="/games" className="navItem">Games</Link>
        <Link to="/software" className="navItem">Software</Link>
      </div>

      <div className="navActions">
        <Link to="/cart" className="cartLink">
          🛒 Cart
          <span className="cartBadge">{cartCount}</span>
        </Link>

        {isLoggedIn ? (
          <>
            <span className="welcomeText">Hi, {currentUser?.name}</span>
            <button type="button" className="logoutBtn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="authBtn">Login</Link>
            <Link to="/signup" className="authBtnPrimary">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Header;
