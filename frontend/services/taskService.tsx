import axios from "axios";

const API_BASE_URL = "http://localhost:5000/tasks";

// Helper function to get the authorization header
const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export type Task = {
  _id: string;
  title: string;
  description?: string;
  status: "To Do" | "In Progress" | "Done";
  createdAt: Date;
};

// Post a new task
export const createTask = async (
  title: string,
  description?: string,
): Promise<Task> => {
  const response = await axios.post(
    API_BASE_URL,
    { title, description },
    authHeader(),
  );
  return response.data;
};

// Get all tasks
export const getTasks = async (
  order: "asc" | "desc",
  status: "All" | "To Do" | "In Progress" | "Done",
): Promise<Task[]> => {
  const response = await axios.get(API_BASE_URL, {
    params: {
      order,
      status,
    },
    ...authHeader(),
  });
  return response.data;
};

// Update a task
export const updateTask = async (
  id: string,
  data: Partial<Task>,
): Promise<Task> => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, data, authHeader());
  return response.data;
};

// Delete a task
export const deleteTask = async (id: string): Promise<void> => {
  const response = await axios.delete(`${API_BASE_URL}/${id}`, authHeader());
  return response.data;
};
