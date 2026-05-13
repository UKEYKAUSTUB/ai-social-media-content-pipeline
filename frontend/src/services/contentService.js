import axios from "axios";

const API = "https://ai-social-media-content-pipeline-81g3.onrender.com/api/content";

const getToken = () => {
  return localStorage.getItem("token");
};

// GENERATE CONTENT
export const generateContent = async (contentData) => {

  const response = await axios.post(
    `${API}/generate`,
    contentData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

  return response.data;
};

// GET HISTORY
export const getContentHistory = async () => {

  const response = await axios.get(
    `${API}/history`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

  return response.data;
};

// DELETE CONTENT
export const deleteContent = async (id) => {

  const response = await axios.delete(
    `${API}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

  return response.data;
};