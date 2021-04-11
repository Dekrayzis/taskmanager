import React from "react";
import { TextButton } from "../";

const Task = ({ item, checked }) => {
  const { id, text, completed } = item;
  return (
    <li className="task">
      <input
        type="checkbox"
        id={id}
        checked={completed}
        readOnly
        onClick={() => checked(id)}
      />
      <label htmlFor={id}>
        <span className="custom-checkbox"></span>
        {text}
      </label>
      <TextButton
        classType="delete"
        label="X"
        ariaLabel="Delete this task"
        // onClick={deleteTaskItem}
      />
    </li>
  );
};

export default Task;
