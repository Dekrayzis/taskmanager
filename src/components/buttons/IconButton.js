import React from "react";

const IconButton = ({ label = "label not set" }) => {
  const onClicked = () => {};
  return (
    <button className="btn create" onClick={() => onClicked()}>
      {label}
    </button>
  );
};

export default IconButton;
