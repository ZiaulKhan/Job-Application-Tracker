import React, { useState, useEffect } from "react";
import "./Navbar.css";
import ThemeToggle from "../../shared/ThemeToggle/ThemeToggle";
import { SiPivotaltracker } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { FaBars } from "react-icons/fa6";
import { BiLogOutCircle } from "react-icons/bi";
import { useToast } from "../../../context/ToastContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { token, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const handleLogout = () => {
    logout();
    navigate("/login");
    showToast("Logged out");
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="navbar">
      <p className="navbar-title">
        <SiPivotaltracker className="navbar-icon" />
        Job Application Tracker
      </p>

      <div className="navbar-right">
        {isMobile && (
          <FaBars
            className="hamburger"
            onClick={() => setShowDropdown((prev) => !prev)}
          />
        )}

        {!isMobile && (
          <>
            {token && (
              <p className="navbar-logout" onClick={handleLogout}>
                <BiLogOutCircle /> Logout
              </p>
            )}
            <ThemeToggle />
          </>
        )}
      </div>

      {isMobile && showDropdown && (
        <>
          <div
            className="navbar-backdrop"
            onClick={() => setShowDropdown(false)}
          />
          <div className="navbar-mobile-dropdown">
            {token && (
              <p className="navbar-logout" onClick={handleLogout}>
                <BiLogOutCircle /> Logout
              </p>
            )}
            <ThemeToggle />
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
