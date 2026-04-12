import { useState, useEffect } from "react";
import API from "../api/axios";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");

  const [filter, setFilter] = useState("all");

  // ✅ Fetch tasks
  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ➕ Add task
  const addTask = async () => {
    if (!title.trim()) return;

    const tempTask = {
      _id: Date.now(),
      title,
      completed: false,
    };

    setTasks([tempTask, ...tasks]);
    setTitle("");

    await API.post("/tasks", { title });
    fetchTasks();
  };

  // 🗑️ Delete
  const deleteTask = async (id) => {
    setTasks(tasks.filter((t) => t._id !== id));
    await API.delete(`/tasks/${id}`);
  };

  // ✏️ Edit
  const startEdit = (task) => {
    setEditingId(task._id);
    setEditedTitle(task.title);
  };

  const updateTask = async (id) => {
    await API.put(`/tasks/${id}`, { title: editedTitle });

    setEditingId(null);
    setEditedTitle("");
    fetchTasks();
  };

  // ☑️ Toggle complete
  const toggleComplete = async (task) => {
    const updated = { ...task, completed: !task.completed };

    setTasks(tasks.map((t) => (t._id === task._id ? updated : t)));

    await API.put(`/tasks/${task._id}`, {
      completed: updated.completed,
    });
  };

  // 🎯 Filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 p-4 sm:p-6">

      {/* HEADER */}
      <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800 mb-6">
        Task Dashboard 
      </h1>

      {/* FILTERS */}
      <div className="flex justify-center gap-2 mb-6 flex-wrap">
        {["all", "active", "completed"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 shadow-sm
              ${
                filter === type
                  ? "bg-indigo-600 text-white scale-105 shadow-md"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
          >
            {type.toUpperCase()}
          </button>
        ))}
      </div>

      {/* ADD TASK */}
      <div className="flex justify-center mb-8">
        <div className="flex w-full max-w-md shadow-lg rounded-xl overflow-hidden bg-white">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 p-3 outline-none"
            placeholder="Enter a new task..."
          />
          <button
            onClick={addTask}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 font-semibold hover:opacity-90 active:scale-95 transition"
          >
            Add
          </button>
        </div>
      </div>

      {/* TASK LIST */}
      <div className="max-w-xl mx-auto space-y-4">

        {filteredTasks.map((task) => (
          <div
            key={task._id}
            className="bg-white/80 backdrop-blur-md border border-gray-100 shadow-md rounded-xl p-4 flex justify-between items-center hover:shadow-xl transition-all duration-200 hover:scale-[1.01]"
          >

            {/* LEFT SIDE */}
            <div className="flex items-center gap-3 flex-1">

              {/* CHECKBOX */}
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task)}
                className="w-5 h-5 accent-indigo-600 cursor-pointer"
              />

              {/* TITLE / EDIT */}
              {editingId === task._id ? (
                <input
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="border rounded-md px-2 py-1 w-full focus:ring-2 focus:ring-indigo-400 outline-none"
                />
              ) : (
                <span
                  className={`text-gray-700 font-medium transition ${
                    task.completed
                      ? "line-through text-gray-400"
                      : ""
                  }`}
                >
                  {task.title}
                </span>
              )}
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-2 ml-3">

              {editingId === task._id ? (
                <button
                  onClick={() => updateTask(task._id)}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm transition active:scale-95"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => startEdit(task)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm transition active:scale-95"
                >
                  Edit
                </button>
              )}

              <button
                onClick={() => deleteTask(task._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition active:scale-95"
              >
                Delete
              </button>

            </div>
          </div>
        ))}

      </div>

      {/* EMPTY STATE */}
      {filteredTasks.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No tasks found 
        </p>
      )}

    </div>
  );
}

export default Dashboard;