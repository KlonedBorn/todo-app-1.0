import React, { useState } from "react";
import "./App.css";

const Priority = Object.freeze({
  HIGH: { text: "High", value: 1 },
  MEDIUM: { text: "Medium", value: 2 },
  LOW: { text: "Low", value: 3 },
  NONE: { text: "None", value: 4 },
});

function App() {
  const [tasks, setTasks] = useState([]);
  const [formTaskTitle, setFormTaskTitle] = useState("");
  const [formTaskDescription, setFormTaskDescription] = useState("");
  const [formTaskPriority, setFormTaskPriority] = useState(Priority.NONE.value);
  const [addDescription, setAddDescription] = useState(false);
  const [filterPriority, setFilterPriority] = useState("all");

  const handlePriorityChange = (event) => {
    setFormTaskPriority(parseInt(event.target.value));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "task-title") {
      setFormTaskTitle(value);
    } else if (name === "task-description") {
      setFormTaskDescription(value);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newTask = {
      title: formTaskTitle,
      description: formTaskDescription,
      priority:
        Priority[
          Object.keys(Priority).find(
            (key) => Priority[key].value === formTaskPriority
          )
        ],
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setFormTaskTitle("");
    setFormTaskDescription("");
    setFormTaskPriority(Priority.NONE.value);
    setAddDescription(false);
  };

  const toggleDescription = () => {
    setAddDescription(!addDescription);
  };

  const handleFilterChange = (event) => {
    setFilterPriority(event.target.value);
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, taskIndex) =>
      taskIndex === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const filteredTasks =
    filterPriority === "all"
      ? tasks
      : tasks.filter(
          (task) =>
            task.priority && task.priority.value === parseInt(filterPriority)
        );

  return (
    <div className="container">
      <form className="task-form" onSubmit={handleFormSubmit}>
        <div className="task-form__input">
          <input
            type="text"
            className="task-form__input-text"
            id="task-title"
            name="task-title"
            placeholder="Enter task here"
            value={formTaskTitle}
            onChange={handleInputChange}
          />
          <select
            name="task-priority"
            className="task-form__priority"
            value={formTaskPriority}
            onChange={handlePriorityChange}
          >
            {Object.values(Priority).map((priority) => (
              <option key={priority.value} value={priority.value}>
                {priority.text}
              </option>
            ))}
          </select>
          <button type="submit" className="task-form__create-btn">
            Create
          </button>
        </div>
        <div className="task-form__description-box">
          <a
            href="#"
            className="task-form__add-description-link"
            onClick={toggleDescription}
          >
            {addDescription ? "Hide task description" : "Add task description"}
          </a>
          {addDescription && (
            <textarea
              name="task-description"
              className="task-form__input-textarea"
              id="task-description"
              placeholder="Add task description here"
              value={formTaskDescription}
              onChange={handleInputChange}
            ></textarea>
          )}
        </div>
      </form>
      <div className="task-list">
        <h2>Tasks</h2>
        <div className="task-list__header">
          <div className="task-list__filter">
            <h3>Filter by Priority:</h3>
            <select
              name="task-filter-priority"
              className="task-list__priority-filter"
              value={filterPriority}
              onChange={handleFilterChange}
            >
              <option value="all">All</option>
              {Object.values(Priority).map((priority) => (
                <option key={priority.value} value={priority.value}>
                  {priority.text}
                </option>
              ))}
            </select>
          </div>
        </div>
        <ul className="task-list__items">
          {filteredTasks.map((task, index) => (
            <li key={index} className="task-list__item">
              <input
                type="checkbox"
                className="task-list__checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(index)}
              />
              <span
                className={`task-list__title ${
                  task.completed ? "task-list__title--completed" : ""
                }`}
              >
                {task.title}
              </span>
              <p className="task-list__description">{task.description}</p>
              <p className="task-list__priority">
                Priority: {task.priority ? task.priority.text : "None"}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
