import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css"; // Importing App.css for styling

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [editId, setEditId] = useState(null);

  const addOrUpdateTodo = () => {
    if (!task.trim()) return;

    if (editId) {
      setTodos(todos.map(todo => (todo.id === editId ? { ...todo, text: task } : todo)));
      setEditId(null);
    } else {
      setTodos([...todos, { id: uuidv4(), text: task }]);
    }

    setTask("");
  };

  const deleteTodo = (id) => setTodos(todos.filter(todo => todo.id !== id));
  const editTodo = (id) => {
    const editingTodo = todos.find(todo => todo.id === id);
    setTask(editingTodo.text);
    setEditId(id);
  };

  return (
    <div className="container">
      <div className="todo-box">
        <h2>Todo List</h2>
        <div className="input-container">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter a task"
          />
          <button onClick={addOrUpdateTodo}>
            {editId ? "Update" : "Add"}
          </button>
        </div>
        <ul>
          {todos.map(todo => (
            <li key={todo.id} className="todo-item">
              <span>{todo.text}</span>
              <div>
                <button className="edit-btn" onClick={() => editTodo(todo.id)}>Edit</button>
                <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
