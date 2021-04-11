import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Task, TextButton } from "../";

const TodoList = ({ category }) => {
  const { name, tasks } = category;
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState(tasks);

  const getTasks = () => {
    const currentList = JSON.parse(localStorage.getItem("todos"));
    const objIndex = currentList.findIndex((obj) => obj.name === name);
    setTodos(currentList[objIndex].tasks);
  };

  const updateTasks = () => {
    const currentList = JSON.parse(localStorage.getItem("todos"));
    let objIndex = currentList.findIndex((obj) => obj.name === name);

    currentList[objIndex].tasks = todos;
    localStorage.setItem("todos", JSON.stringify(currentList));
  };

  React.useEffect(() => {
    // eslint-disable-next-line
    getTasks();
  }, [name]);

  React.useEffect(() => {
    // eslint-disable-next-line
    updateTasks();
  }, [todos, updateTasks]);

  const inputTextHandler = (e) => {
    setInputText(e.target.value);
  };

  const submitTodoHandler = (e) => {
    e.preventDefault();

    if (inputText !== "") {
      setTodos([
        ...todos,
        { text: inputText, completed: false, id: uuidv4(), category: name }, // Obtain unique ID
      ]);
      setInputText("");
      updateTasks();
    }
  };

  const deleteTaskItem = () => {
    setTodos(todos.filter((el) => el.id !== todos.id));
  };

  const deleteAllTasks = () => {
    setTodos([]);
  };

  const clearCompleted = () => {
    setTodos(todos.filter((el) => el.completed === false));
  };

  const completeTaskItem = (id) => {
    setTodos(
      todos.map((item) => {
        return item.id === id ? { ...item, completed: !item.completed } : item;
      })
    );
  };

  const get_amountRemaining = (id) => {
    const remaining = todos.filter((el) => el.completed === false);
    return remaining.length;
  };

  return (
    <div className="todo-list">
      <div className="todo-header">
        <h2 className="list-title">{name}</h2>
        <span className="task-count">
          {get_amountRemaining()} tasks remaining
        </span>
      </div>
      <div className="todo-body">
        <ul className="tasks">
          {todos.map((todo) => (
            <Task
              item={todo}
              key={todo.id}
              checked={(e) => completeTaskItem(e)}
              deleteTask={(e) => deleteTaskItem(e)}
            />
          ))}
        </ul>

        <div className="new-task-creator">
          <form>
            <div style={{ display: "block" }}>
              <input
                id="taskInput"
                type="text"
                className="new task"
                placeholder="New task name"
                aria-label="New task name"
                onChange={(e) => inputTextHandler(e)}
                value={inputText}
              />
            </div>

            <TextButton
              id="createNewTask"
              classType="create"
              label="+"
              ariaLabel="Create new task"
              onPress={(e) => submitTodoHandler(e)}
            />
          </form>
        </div>

        <div className="delete-stuff">
          <TextButton
            classType="delete"
            label="Clear completed tasks"
            ariaLabel="Clear completed tasks"
            onPress={clearCompleted}
          />
          <TextButton
            classType="delete"
            label="Delete list"
            ariaLabel="Delete list"
            onPress={deleteAllTasks}
          />
        </div>
      </div>
    </div>
  );
};

export default TodoList;
