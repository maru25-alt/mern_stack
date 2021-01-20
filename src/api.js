import axios from "axios";
import {LoginString} from './app/localStorage'

//export const API_BASE_URL = "http://kapstone-five.vercel.app/api";
export const API_BASE_URL = "http://localhost:5000/api";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

//fetch all clinics
export const fetchClinics = async () => {
  const { data } = await axiosInstance.get("/accounts/clinics");
  return data;
};

//fetch  clients
export const fetchClients = async () => {
  const {data } = await axios.get('/users')
  return data
}

// SignUp clinic
export const clinicSignup = async (data, callback) => {
  await axiosInstance.post("/accounts/clinics/signup", data)
  .then(res => callback(res))
  .catch(err => {
      console.log(err)
      alert('something when wrong , try again later')
      callback({error: "something when wrong , try again later"})
  })
}


//signup client
export const clientSignup = async (data, callback) => {
  await axiosInstance.post("/users/signup", data)
  .then(res => callback(res))
  .catch(err => {
    console.log(err)
    callback({error: "something when wrong , try again later"})
 });
};

//signin client
export const clientSignin = async (data, callback) => {
  await axiosInstance.post("/users/signin", data)
  .then(res => callback(res))
  .catch(err => {
    console.log(err)
    callback({error: "something when wrong , try again later"})
  });
};


//signin clinic
export const clinicSignin = async (data, callback) => {
  await axiosInstance.post("/accounts/clinics/signin", data)
  .then(res => callback(res))
  .catch(err => {
    console.log(err)
    callback({error: "something when wrong , try again later"})
   });
 };



 export const  SentMessagesConnection = async(id, history) => {
  const user1 = localStorage.getItem(LoginString.ID)
  if(user1){
    axiosInstance.post('/messages/connect', {user1: user1, user2: id})
    .then(res => {
        console.log(res)
        if(res.data.success){
            history.push(`/messages/${res.data.doc}`);
        }
    })
  }
  else{
    history.push("/signin");
  }
 
     
 }

export default axiosInstance;