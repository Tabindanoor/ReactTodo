import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';

function TaskTracker() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Task 1', isComplete: false },
    { id: 2, text: 'Task 2', isComplete: true },
  ]);

  const [text, setText] = useState('');
  const [isEditing, setIsEditing] = useState(null);
  const [editedText, setEditedText] = useState('');

  const addTask = () => {
    if (!text.trim()) return;
    const newTask = { id: tasks.length + 1, text, isComplete: false };
    setTasks([...tasks, newTask]);
    setText('');
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isComplete: !task.isComplete } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEdit = (id, text) => {
    setIsEditing(id);
    setEditedText(text);
  };

  const handleSaveEdit = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: editedText } : task
      )
    );
    setIsEditing(null);
  };

  const handleCancelEdit = () => {
    setIsEditing(null);
    setEditedText('');
  };

  return (
    <div className="container mx-auto p-4 justify-center  App flex center ">
      <div>
      <h1 className="text-3xl font-bold mb-4">Task Tracker</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          isEditing !== null ? handleSaveEdit(isEditing) : addTask();
        }}
        className="mb-4"
      >
        <input
          type="text"
          value={isEditing !== null ? editedText : text}
          onChange={(e) => (isEditing !== null ? setEditedText(e.target.value) : setText(e.target.value))}
          placeholder="Add Task to List "
          className="border-2 border-gray-300 p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
          {isEditing !== null ? 'Save' : 'Add Task'}
        </button>
        {isEditing !== null && (
          <button type="button" onClick={handleCancelEdit} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2">
            Cancel
          </button>
        )}
      </form>
      <ul className="transition-opacity duration-300">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`py-2 ${task.isComplete ? 'line-through' : ''} animate-fade-in-out`}
            onClick={() => toggleTask(task.id)}
          >
            {isEditing === task.id ? (
              <input
                type="text"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                onBlur={() => handleSaveEdit(task.id)}
                autoFocus
                className="border-2 border-gray-300 p-2 mr-2"
              />
            ) : (
              <>
                <span className="flex-1">
                  {task.text}
                </span>
                <button onClick={() => handleEdit(task.id, task.text)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2">
                  Edit
                </button>
                <button onClick={() => deleteTask(task.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}

export default TaskTracker;
