import React, { useState } from "react";

const CustomButton = ({ className, bgColor, onClick, children }) => {
  const [isPressed, setIsPressed] = useState(false);

  const buttonClass = `${className} ${
    isPressed
      ? bgColor === "primary"
        ? "bg-primary-700"
        : "bg-secondary-700"
      : bgColor === "primary"
      ? "bg-primary-600"
      : "bg-secondary-600"
  } focus:outline-none`;

  const handlePress = () => setIsPressed(true);

  const handleRelease = () => setIsPressed(false);

  return (
    <button
      className={buttonClass}
      onMouseDown={handlePress}
      onMouseUp={handleRelease}
      onMouseLeave={handleRelease}
      onTouchStart={handlePress}
      onTouchEnd={handleRelease}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default CustomButton;
