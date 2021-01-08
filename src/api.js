import axios from "axios";

export const API_BASE_URL = "http://kapstone-five.vercel.app/api";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

export default axiosInstance;

export const accountSignUp = async (data) => {
  const formData = new formData();
  formData.append("account", data);
  await axiosInstance.post("/clinics", formData);
};
