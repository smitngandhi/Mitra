import React from "react";
import googleIcon from "../assets/google.svg";

const GoogleButton = ({ text = "Login with Google" }) => {
  return (
    <button className="w-full flex items-center justify-center border py-2 rounded-lg bg-white shadow">
      <img src={googleIcon} className="h-6 mr-2" alt="Google" />
      <span className="text-gray-800">{text}</span>
    </button>
  );
};

export default GoogleButton;
