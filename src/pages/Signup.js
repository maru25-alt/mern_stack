import React, {useState} from 'react'
import {Form, Button, InputGroup, Spinner} from 'react-bootstrap';
import { useForm } from "react-hook-form";
import '../css/signin.css'
//import axios from '../app/axios';
import {  toast } from 'react-toastify';
import {clientSignin, clinicSignin} from '../api'
import { useDispatch} from 'react-redux';
import {loggin} from '../features/user/userSlice';
import  {LoginString} from '../localStorage'

function UserSignup({history}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, errors } = useForm();
    const [selectUser, setUser] = useState("")
    const dispatch = useDispatch()

    const handleSignup = () => {
        setLoading(true)
        if(selectUser === 'clinic'){
            clinicSignin({name, password, email}, (res) => {
                const data = res.data;
               
                 if(data?.success){
                    const {token , user} = data;
                    setLoading(false)
                    dispatch(loggin({
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        photoUrl: user.photoUrl,
                        type: selectUser
                    }))
                    localStorage.setItem(LoginString.EMAIL, user.email);
                    localStorage.setItem(LoginString.NAME, user.name);
                    localStorage.setItem(LoginString.PhotoURL, user.photoUrl);
                    localStorage.setItem(LoginString.ID, user._id);
                    localStorage.setItem(LoginString.TOKEN, token);
                    localStorage.setItem(LoginString.TYPE, selectUser);
                    toast.success('successfully logged in', {
                        position: "top-right",
                        autoClose: false,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                    history.push('/')
                 }

                 else{
                    toast.error(data?.error, {
                        position: "top-right",
                        autoClose: false,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                     })  
                   setLoading(false)
                 }
               
            })
        }
        else if(selectUser === 'user'){
            clientSignin({name, password, email, account: 'user'}, (res) => {
                 const data = res.data;
    
                 if(data?.success){
                    const {token , user} = data;
                    setLoading(false)
                    dispatch(loggin({
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        photoUrl: user.photoUrl,
                        type: selectUser
                    }))
                    localStorage.setItem(LoginString.EMAIL, user.email);
                    localStorage.setItem(LoginString.NAME, user.name);
                    localStorage.setItem(LoginString.PhotoURL, user.photoUrl);
                    localStorage.setItem(LoginString.ID, user._id);
                    localStorage.setItem(LoginString.TOKEN, token);
                    localStorage.setItem(LoginString.TYPE, selectUser);
                    toast.success('successfully logged in', {
                        position: "top-right",
                        autoClose: false,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                    history.push('/')
                 }

                 else{
                    toast.error(data?.error, {
                        position: "top-right",
                        autoClose: false,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                     })  
                   setLoading(false)
                 }
            })
        }
        else{
            toast.error("Please select account type", {
                position: "top-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            setLoading(false)  
        }
    }
   
    return (
        <div className="signin">
            <Form className="signin__form"  onSubmit={handleSubmit(handleSignup)}>
               <h4 className="text-center"> <strong> Create your account </strong></h4>
               <div  className="mb-3 text-center">
                    <h6><strong>Select Account Type</strong> </h6>
                    <div className="signin__selectUser">
                       <Form.Check onClick={(e) => setUser(e.target.id)} inline label="Client" type="radio" id="user" name="user" />
                       <Form.Check onClick={(e) => setUser(e.target.id)} inline label="Clinic" type="radio" id="clinic" name="user" />
                    </div>
                 </div>
                 <InputGroup controlid="formBasicEmail" className="mb-3">
                    <InputGroup.Prepend>
                          <InputGroup.Text style={{width: "100px"}} id="basic-addon1">Name</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    name="name" 
                    ref={register({ required: true })} 
                    type="text" 
                    placeholder="Enter name" />
                </InputGroup>
                {errors.name && <span className="text-danger mb-2">This field is required</span>}
                <InputGroup controlid="formBasicEmail" className="mb-3">
                    <InputGroup.Prepend>
                          <InputGroup.Text style={{width: "100px"}} id="basic-addon1">Email</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    name="email" 
                    ref={register({ required: true, pattern: '' })} 
                    type="email" 
                    placeholder="Enter email" />
                </InputGroup>
                {errors.email && <span className="text-danger mb-2">Valid Email is required</span>}
                <InputGroup controlid="formBasicPassword" className="mb-3">
                    <InputGroup.Prepend>
                          <InputGroup.Text  style={{width: "100px"}} id="basic-addon1">Password</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control  
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    name="password" 
                    ref={register({ required: true, minLength: 6 })} 
                    type="password" 
                    placeholder="Password" />
                </InputGroup>
                {errors.password && <span className="text-danger mb-5">Strong Password with at least 6 characters is required</span>}
                  <div className="form-group text-center">
                      <label className="form-check-label" htmlFor="agreement">
                       By signing up you are  agreeing  to our Terms and Conditions
                      </label>
                      <a href="/signin" className="d-block danger-link">Already have an account</a>
                  </div>
                 <Button disabled={loading}  type="submit" className="w-100 primary-btn btn mt-5">
                     {loading &&  <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            />}
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default UserSignup

