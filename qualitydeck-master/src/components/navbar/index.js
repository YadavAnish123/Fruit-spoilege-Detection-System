import React from "react";
import "./index.css";

// External Imports
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav id="navbar" className="navbar">
        <div id="container" className="navbar-container">
          <Link to="/home" style={{ textDecoration: "none" }}>
            <h2 className="logo">🚀 Qualitydeck</h2>
          </Link>
          <div className="navbar-items">
            <ul>
              <Link to="/home" className="li">
                Home
              </Link>
              <Link to="/dashboard" className="li">
                Dashboard
              </Link>
              <Link to="/users" className="li">
                Users
              </Link>
              <Link to="/mail-history" className="li">
                Mail History
              </Link>
              <Link to="/auth" className="li">
                Login/Logout
              </Link>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
