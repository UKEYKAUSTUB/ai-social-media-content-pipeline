import axios from "axios";

const API = "http://localhost:5000/api/image";

export const generateImage = async (prompt) => {

  const response = await axios.post(
    `${API}/generate`,
    { prompt }
  );

  return response.data;

};