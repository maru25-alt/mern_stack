import axios from "axios";

export const API_BASE_URL = "http://kapstone-five.vercel.app/api";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

export default axiosInstance;

export const fetchClinics = async () => {
  const { data } = await axiosInstance.get("/clinics");
  return data;
};

export const clinicSignUp = async (data) => {
  const clinicData = new FormData();
  clinicData.append("clinic", data);
  await axiosInstance.post("/clinics", clinicData);
};

export const clientSignUp = async (data) => {
  const clientData = new FormData();
  clientData.append("client", data);
  await axiosInstance.post("/users", clientData);
};
