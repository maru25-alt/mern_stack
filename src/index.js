import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from 'react-redux';
import store from './app/store';
import { loggin, logout } from './features/user/userSlice';
import {setLoading} from './features/app/appSlice'
import {LoginString} from './localStorage'

store.dispatch(setLoading(true))
if(localStorage.getItem(LoginString.TOKEN)){
  store.dispatch(loggin({
    id: localStorage.getItem(LoginString.ID),
    photoUrl: localStorage.getItem(LoginString.PhotoURL),
    email: localStorage.getItem(LoginString.EMAIL),
    name: localStorage.getItem(LoginString.NAME),
    account: localStorage.getItem(LoginString.TYPE)
  }))
 }
 else{
  store.dispatch(logout())
 }
 store.dispatch(setLoading(false)) 

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
