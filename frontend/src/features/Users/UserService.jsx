import axios from "axios";

const URL = "http://localhost:8000/api/v1/user/";
const getAllUsers = async () => {
  const { data } = await axios.get(URL + "/participants/all");

  return data;
};

// get user
const getUser = async () => {
  const token = JSON.parse(localStorage.getItem("user")).user.token;
  const config = {
    headers: {
      token: "Bearer " + token,
    },
  };
  const { data } = await axios.get(URL + "signed/me", config);

  return data;
};

const updateUser = async (userData) => {
  const token = JSON.parse(localStorage.getItem("user")).user.token;
  const config = {
    headers: {
      token: "Bearer " + token,
    },
  };
  const { data } = await axios.put(URL + "update", userData, config);
  return data;
};

const followUser = async (userId) => {
  const token = JSON.parse(localStorage.getItem("user")).user.token;

  const config = {
    headers: {
      token: "Bearer " + token,
    },
  };

  const { data } = await axios.put(URL + "follow/" + userId, "", config);

  return data;
};

const unfollowUser = async (userId) => {
  const token = JSON.parse(localStorage.getItem("user")).user.token;
  const config = {
    headers: {
      token: "Bearer " + token,
    },
  };

  const { data } = await axios.put(URL + "unfollow/" + userId, "", config);
  return data;
};
const getUserById = async (userId) => {
  const { data } = await axios.get(URL + userId);
  return data;
};

const UserData = {
  getAllUsers,
  getUser,
  getUserById,
  followUser,
  unfollowUser,
  updateUser,
};

export default UserData;
