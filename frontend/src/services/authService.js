import axios from "axios";

const API = "https://ai-social-media-content-pipeline-81g3.onrender.com/api/auth";

export const registerUser = async (userData) => {

  const response = await axios.post(
    `${API}/register`,
    userData
  );

  return response.data;
};

export const loginUser = async (userData) => {

  const response = await axios.post(
    `${API}/login`,
    userData
  );

  return response.data;
};