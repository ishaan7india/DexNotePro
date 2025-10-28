import React from "react";
import logo from "@/assets/short-logo.png";
import "./LoadingScreen.css";

const LoadingScreen = () => {
  return (
    <div className="loading-container fade">
      <div className="spinner">
        <img src={logo} alt="DexNote" className="loading-logo" />
      </div>
      <p className="loading-text">Loading your DexNote experience...</p>
    </div>
  );
};

export default LoadingScreen;
