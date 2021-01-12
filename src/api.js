import axios from "axios";

//export const API_BASE_URL = "http://kapstone-five.vercel.app/api";
export const API_BASE_URL = "http://localhost:4000/api";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

export default axiosInstance;

export const fetchClinics = async () => {
  const { data } = await axiosInstance.get("/clinics");
  return data;
};

// SignUp clinic
export const clinicSignup = async (data, callback) => {
  await axiosInstance.post("/accounts/clinics/signup", data)
  .then(res => callback(res))
  .catch(err => {
      console.log(err)
      callback(err)
  })
}


//signup client
export const clientSignup = async (data, callback) => {
  await axiosInstance.post("/user/signup", data)
  .then(res => callback(res))
  .catch(err => {
    console.log(err)
    callback(err)
 });
};

//signin client
export const clientSignin = async (data, callback) => {
  await axiosInstance.post("/user/signin", data)
  .then(res => callback(res))
  .catch(err => {
    console.log(err)
    callback(err)
  });
};


//signin clinic
export const clinicSignin = async (data, callback) => {
  await axiosInstance.post("/accounts/clinics/signin", data)
  .then(res => callback(res))
  .catch(err => {
    console.log(err)
    callback(err)
});
};