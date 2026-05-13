import axios from "axios";

const API = "https://ai-social-media-content-pipeline-81g3.onrender.com";

export const generateImage = async (prompt) => {

  const response = await axios.post(
    `${API}/generate`,
    { prompt }
  );

  return response.data;

};