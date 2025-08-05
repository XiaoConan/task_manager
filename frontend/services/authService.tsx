import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL + "user";

//user registration
export const register = async (
  username: string,
  password: string,
): Promise<void> => {
  const response = await axios.post(`${API_BASE_URL}/register`, {
    username,
    password,
  });
  return response.data;
};

//user login
export const login = async (
  username: string,
  password: string,
): Promise<string> => {
  const response = await axios.post(`${API_BASE_URL}/login`, {
    username,
    password,
  });
  return response.data.token;
};
