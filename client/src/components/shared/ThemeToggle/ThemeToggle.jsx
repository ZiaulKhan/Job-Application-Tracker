import { useEffect, useState } from "react";
import "./ThemeToggle.css";

import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      <MdOutlineLightMode
        className={`light-icon rounded-full ${
          theme === "light" ? "active-mode-light" : ""
        }`}
      />
      <MdOutlineDarkMode
        className={`dark-icon rounded-full ${
          theme === "dark" ? "active-mode-dark" : ""
        }`}
      />
    </button>
  );
};

export default ThemeToggle;
