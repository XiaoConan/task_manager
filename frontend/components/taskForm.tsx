import React, { useState } from "react";
import { createTask } from "../services/taskService.tsx";

const taskForm = ({ onTaskCreated }: { onTaskCreated: () => void }) => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskName.trim()) {
      alert("Task name cannot be empty!");
      return;
    }

    await createTask(taskName, description);
    setTaskName("");
    setDescription("");
    onTaskCreated();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-xl p-6 mb-6 space-y-4 border border-gray-100"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Create a New Task
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title<span className="text-red-500">*</span>
        </label>
        <input
          className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Task title"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Optional task description..."
          value={description}
          rows={3}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="text-right">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg shadow transition duration-200"
        >
          Add Task
        </button>
      </div>
    </form>
  );
};

export default taskForm;
