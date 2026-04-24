import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Task() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!title.trim()) return;
    await API.post("/tasks", { title });
    setTitle("");
    fetchTasks();
  };

  const completeTask = async (task) => {
    await API.put(`/tasks/${task.id}`, {
      status: task.status === "completed" ? "pending" : "completed",
    });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const startEdit = (task) => {
    setEditId(task.id);
    setEditText(task.title);
  };

const saveEdit = async (id) => {
  if (!editText.trim()) return;

  await API.put(`/tasks/${id}`, { title: editText });
  setEditId(null);
  fetchTasks();
};

  const cancelEdit = () => {
    setEditId(null);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          My Tasks 📋
        </h1>

        {/* Add Task */}
        <div className="flex gap-2 mb-6">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter new task..."
            className="flex-1 px-4 py-2 border rounded-lg"
          />
          <button
            onClick={addTask}
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg"
          >
            Add
          </button>
        </div>

        {/* Tasks */}
        <div className="space-y-4">
          {tasks.map((t) => (
            <div
              key={t.id}
              className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
            >
              <div className="flex-1">

                {editId === t.id ? (
                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="border px-2 py-1 rounded w-full"
                  />
                ) : (
                  <div className="text-start ">
                    <h3 className="font-medium  text-gray-800">
                      {t.title}
                    </h3>

                    <span
                      className={`text-xs px-2 py-1 rounded-md ${
                        t.status === "completed"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {t.status}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex gap-2 ml-4">

                {editId === t.id ? (
                  <>
                    <button
                      onClick={() => saveEdit(t.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="bg-gray-400 text-white px-3 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => completeTask(t)}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      ✔
                    </button>

                    <button
                      onClick={() => startEdit(t)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      ✏
                    </button>

                    <button
                      onClick={() => deleteTask(t.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      ✖
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}