import axios from "axios";

export const API_BASE_URL = "http://localhost:4000/api";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

export default axiosInstance;

export const fetchUsers = async () => {
  const { data } = await axiosInstance.get("/accounts/users");
  return data;
};

export const fetchSingleUser = async (userId) => {
  const { user } = await axiosInstance.get(`accounts/users/${userId}`);

  return user;
};

export const fetchClinics = async () => {
  const { clinics } = await axiosInstance.get("/accounts/clinics");
  return clinics;
};

export const fetchSingleClinic = async (clinicId) => {
  const { clinic } = await axiosInstance.get(`/accounts/clinics/${clinicId}`);

  return clinic;
};

export const fetchAds = async () => {
  const { data } = await axiosInstance.get("/ads");

  return data;
};

export const fetchSingleAd = async (adId) => {
  const { clinic } = await axiosInstance.get(`/ads/${adId}`);

  return clinic;
};

export const uploadPhoto = async (data) => {
  const formData = new FormData();
  formData.append("user", data);
  await axiosInstance.post("/photos/upload", formData);
};
