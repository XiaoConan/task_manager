import React, { useEffect, useState } from "react";
import { getTasks } from "../services/taskService.tsx";
import type { Task } from "../services/taskService.tsx";
import TaskForm from "../components/taskForm";
import TaskList from "../components/taskList";

const task_page = ({ onLogout }: { onLogout: () => void }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterStatus, setFilterStatus] = useState<
    "To Do" | "In Progress" | "Done" | "All"
  >("All");

  const fetchTasks = async () => {
    try {
      const data = await getTasks(sortOrder, filterStatus);
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [sortOrder, filterStatus]);

  return (
    <div className="max-w-3xl mx-auto p-6 relative">
      <button
        onClick={onLogout}
        className="absolute top-6 right-6 bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded shadow"
      >
        Logout
      </button>

      <h1 className="text-4xl font-bold text-center mb-8">Task Manager</h1>

      <TaskForm onTaskCreated={fetchTasks} />

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mt-6 mb-4">
        <div className="flex items-center gap-2">
          <label className="font-medium">Filter:</label>
          <select
            value={filterStatus}
            onChange={(e) =>
              setFilterStatus(e.target.value as Task["status"] | "All")
            }
            className="border px-3 py-2 rounded-md shadow-sm"
          >
            <option value="All">All</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="font-medium">Sort:</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
            className="border px-3 py-2 rounded-md shadow-sm"
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>
      </div>

      <TaskList tasks={tasks} onTasksUpdated={fetchTasks} />
    </div>
  );
};

export default task_page;
