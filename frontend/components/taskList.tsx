import React from "react";
import TaskItem from "./taskItem";
import type { Task } from "../services/taskService.tsx";

const taskList = ({
  tasks,
  onTasksUpdated,
}: {
  tasks: Task[];
  onTasksUpdated: () => void;
}) => {
  return (
    <div className="mt-6 space-y-4">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskItem key={task._id} task={task} onUpdated={onTasksUpdated} />
        ))
      ) : (
        <div className="text-center text-gray-500 italic mt-10">
          No tasks available. Add a new task to get started!
        </div>
      )}
    </div>
  );
};

export default taskList;
