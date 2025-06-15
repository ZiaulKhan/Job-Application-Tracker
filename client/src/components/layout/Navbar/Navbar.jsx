import React from "react";
import "./Navbar.css";
import ThemeToggle from "../../shared/ThemeToggle/ThemeToggle";
import { SiPivotaltracker } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { FaAngleDown } from "react-icons/fa6";
import { BiLogOutCircle } from "react-icons/bi";
import { useToast } from "../../../context/ToastContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { user, token, dispatch } = useAuth();

  const handleLogout = () => {
    try {
      dispatch({ type: "LOGOUT" });
      navigate("/login");
      showToast("Logged out");
    } catch (err) {
      showToast("Error logging out", "error");
    }
  };

  return (
    <div className="navbar">
      <p className="navbar-title">
        <SiPivotaltracker className="navbar-icon" />
        Job Application Tracker
      </p>
      <div className="navbar-right">
        {token && (
          <div className="navbar-user">
            <p className="navbar-user-name">
              <FaAngleDown className="navbar-user-icon" />
              Hello, {user?.name?.split(" ")[0] || "User"}
            </p>
            <div className="navbar-user-dropdown">
              <p className="navbar-user-dropdown-item" onClick={handleLogout}>
                <BiLogOutCircle /> Logout
              </p>
            </div>
          </div>
        )}
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;
