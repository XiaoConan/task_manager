import { useState } from "react";
import type { Task } from "../services/taskService.tsx";
import { deleteTask, updateTask } from "../services/taskService.tsx";

const taskItem = ({
  task,
  onUpdated,
}: {
  task: Task;
  onUpdated: () => void;
}) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [status, setStatus] = useState(task.status);

  const handleDelete = async () => {
    await deleteTask(task._id);
    onUpdated();
  };

  const handleUpdate = async () => {
    await updateTask(task._id, { title, description, status });
    setEditing(false);
    onUpdated();
  };

  return (
    <div className="bg-white border border-gray-200 shadow rounded-xl p-4 space-y-3">
      {editing ? (
        <>
          <input
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <select
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={status}
            onChange={(e) => setStatus(e.target.value as Task["status"])}
          >
            <option>To Do</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>
          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={handleUpdate}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            >
              Save
            </button>
            <button
              onClick={() => setEditing(false)}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {task.title}
              </h2>
              <p className="text-sm text-gray-600">{task.description}</p>
              <p className="text-sm font-medium mt-1">
                Status: <span className="text-blue-700">{task.status}</span>
              </p>
            </div>
            <span className="text-xs text-gray-400">
              {new Date(task.createdAt).toLocaleString()}
            </span>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => setEditing(true)}
              className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default taskItem;
