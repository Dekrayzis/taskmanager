import React from "react";
import { TextButton } from "../";

const ListItem = ({ item, onItemPress, onDelete }) => {
  return (
    <li className="list-item">
      <span onClick={onItemPress}>{item.name}</span>

      <TextButton
        classType="delete"
        label="X"
        ariaLabel="Delete this task"
        onPress={() => onDelete(item.id)}
      />
    </li>
  );
};

export default ListItem;
