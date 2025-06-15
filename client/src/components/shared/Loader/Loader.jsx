import React from "react";
import "./Loader.css";

const Loader = ({ size = 40, color = "#4f46e5" }) => {
  return (
    <div className="loader-wrapper">
      <div
        className="spinner"
        style={{
          width: size,
          height: size,
          borderColor: `${color} transparent ${color} transparent`,
        }}
      />
    </div>
  );
};

export default Loader;
