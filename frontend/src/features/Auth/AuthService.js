import axios from "axios";

const API_URL = "/api/v1/";

// register a user
const register = async (userData) => {
  const response = await axios.post(API_URL + "user/register", userData);

  return response.data;
};

// login a user
const login = async (userData) => {
  const response = await axios.post(API_URL + "auth/login", userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// logout user
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
