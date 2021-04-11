import React from "react";

const TextButton = ({ ariaLabel, classType, label, onPress }) => {
  return (
    <button
      className={`btn ${classType}`}
      onClick={onPress}
      aria-label={ariaLabel}
    >
      {label}
    </button>
  );
};

export default TextButton;
