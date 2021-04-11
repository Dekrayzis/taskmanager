import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { List, ListItem, TodoList } from "../components";

const TaskWindow = () => {
  const [inputText, setInputText] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState();

  const saveLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(categories));
  };

  const getLocalTodos = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify(categories));
    } else {
      setCategories(JSON.parse(localStorage.getItem("todos")));
    }
  };

  const submitCategoryHandler = (e) => {
    e.preventDefault();
    setCategories([
      ...categories,
      {
        id: uuidv4(), // Obtain unique ID
        name: inputText,
        tasks: [],
        color: Math.floor(Math.random() * 16777215).toString(16),
      },
    ]);
    setInputText("");
    saveLocalTodos();
  };

  const deleteCategoryItem = (id) => {
    if (category.id === id) {
      setCategory();
    }
    setCategories(categories.filter((el) => el.id !== id));
  };

  const completeTaskItem = () => {
    setCategories(
      categories.map((category) => {
        return category.id === categories.id ? { ...category } : category;
      })
    );
  };

  const displayTasks = (category) => {
    getLocalTodos();
    const selectedCategory = categories.filter(
      (el) => el.name === category.name
    );

    setCategory(selectedCategory.shift());
  };

  const inputTextHandler = (e) => {
    setInputText(e.target.value);
  };

  // Run once
  React.useEffect(() => {
    // eslint-disable-next-line
    getLocalTodos();
  }, []);

  // Update when changes made to category
  React.useEffect(() => {
    if (category) {
      document.querySelector(
        "body"
      ).style.backgroundColor = `#${category.color}`;
    }
  }, [category]);

  React.useEffect(() => {
    // eslint-disable-next-line
    saveLocalTodos();
  }, [categories, saveLocalTodos]);

  return (
    <>
      <h1 className="title">Just another task manager</h1>
      <main className="app-wrapper">
        <div className="all-tasks">
          <h2 className="task-list-title">My lists</h2>
          <List>
            {categories.map((category) => (
              <ListItem
                item={category}
                key={category.id}
                updateCheckBox={completeTaskItem}
                onItemPress={() => displayTasks(category)}
                onDelete={(e) => deleteCategoryItem(e)}
              />
            ))}
          </List>

          <form>
            <input
              type="text"
              className="new list"
              placeholder="New list name"
              onChange={(e) => inputTextHandler(e)}
              value={inputText}
              aria-label="new list name"
            />
            <button
              className="btn create"
              aria-label="create new list"
              type="submit"
              onClick={(e) => submitCategoryHandler(e)}
            >
              +
            </button>
          </form>
        </div>
        {category ? <TodoList category={category} /> : null}
      </main>
    </>
  );
};

export default TaskWindow;
