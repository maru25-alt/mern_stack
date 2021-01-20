import React, {useState} from 'react'
import {Form, Button, InputGroup, Spinner} from 'react-bootstrap';
import { useForm } from "react-hook-form";
import '../css/signin.css'
//import axios from '../app/axios';
import {  toast } from 'react-toastify';
import {clientSignup, clinicSignup} from '../api'
import { useDispatch} from 'react-redux';
import {loggin} from '../features/user/userSlice';
import  {LoginString} from '../localStorage'
import { FormattedMessage} from 'react-intl';

function UserSignup({history}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, errors } = useForm();
    const [selectUser, setUser] = useState("");
    const [confirmPassword, setconfirmPassword] = useState('')
    const dispatch = useDispatch()

    const handleSignup = async() => {
        setLoading(true)
        if(selectUser === 'clinic'){
           await clinicSignup({name, password, email, account: selectUser}, (res) => {
                const data = res.data;
                console.log(data, "clinic")
                 if(data?.success){
                    const {token , user} = data;
                    setLoading(false)
                    dispatch(loggin({
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        photoUrl: user.logo,
                        type: selectUser
                    }))
                    localStorage.setItem(LoginString.EMAIL, user.email);
                    localStorage.setItem(LoginString.NAME, user.name);
                    localStorage.setItem(LoginString.PhotoURL, user.logo);
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
                    history.push(`/clinic/${user?.name}/${user?._id}`)
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
            console.log(selectUser, "user")
            await clientSignup({name, password, email, account: selectUser}, (res) => {
                 const data = res.data;
                 console.log(data, "clinic")
                 if(data?.success){
                    const {token , user} = data;
                    setLoading(false)
                    dispatch(loggin({
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        photoUrl: user.photoUrl,
                        account: selectUser
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
                    history.push(`/user/${user?.name}/${user?._id}`)
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
            console.log(selectUser)
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
               <h4 className="text-center"> <strong> <FormattedMessage id="creatAcc"/> </strong></h4>
               <div  className="mb-3 text-center">
                    <h6><strong><FormattedMessage id="selAcc"/></strong> </h6>
                    <div className="signin__selectUser">
                       <Form.Check 
                         onClick={(e) => setUser(e.target.id)} 
                         inline 
                         label={ <FormattedMessage  id="client"/>}
                         type="radio" 
                         id="user" 
                         name="user" />
                       <Form.Check 
                        onClick={(e) => setUser(e.target.id)} 
                        inline 
                        label={<FormattedMessage id="clinic"/> }
                        type="radio" 
                        id="clinic" 
                        name="user" />
                    </div>
                 </div>
                 <InputGroup controlid="formBasicEmail" className="mb-3">
                    <InputGroup.Prepend>
                          <InputGroup.Text style={{width: "150px"}} id="basic-addon1"> <FormattedMessage id="name"/> </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    name="name" 
                    ref={register({ required: true })} 
                    type="text" 
                    placeholder="Enter name" />
                </InputGroup>
                {errors.name && <span className="text-danger mb-2"><FormattedMessage id="fieldReq"/></span>}
                <InputGroup controlid="formBasicEmail" className="mb-3">
                    <InputGroup.Prepend>
                          <InputGroup.Text style={{width: "150px"}} id="basic-addon1"><FormattedMessage id="email"/></InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    name="email" 
                    ref={register({ required: true, pattern: '' })} 
                    type="email" 
                    placeholder="Enter email" />
                </InputGroup>
                {errors.email && <span className="text-danger mb-2"><FormattedMessage id="emailErr"/> </span>}
                <InputGroup controlid="formBasicPassword" className="mb-3">
                    <InputGroup.Prepend>
                          <InputGroup.Text  style={{width: "150px"}} id="basic-addon1"><FormattedMessage id="passowrd"/></InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control  
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    name="password" 
                    ref={register({ required: true, minLength: 6 })} 
                    type="password" 
                    placeholder="Password" />
                </InputGroup>
                {errors.password && <span className="text-danger mb-5"><FormattedMessage id="pssErr"/> </span>}
                <InputGroup controlid="formBasicPassword" className="mb-3">
                    <InputGroup.Prepend>
                          <InputGroup.Text  style={{width: "150px"}} id="basic-addon1"><FormattedMessage id="confPassword"/></InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control  
                    value={confirmPassword} 
                    onChange={e => setconfirmPassword(e.target.value)} 
                    name="confirmpassword" 
                    ref={register({ required: true, minLength: 6 , validate: value => value === password })} 
                    type="password" 
                    placeholder="Confirm Password" />
                </InputGroup>
                {errors.confirmpassword && <span className="text-danger mb-5"><FormattedMessage id="confpassErr"/></span>}
                  <div className="form-group text-center">
                      <label className="form-check-label" htmlFor="agreement">
                          <FormattedMessage id="byAgree"/> 
                      </label>
                      <a href="/signin" className="d-block danger-link"><FormattedMessage id="alrAcc"/></a>
                  </div>
                 <Button disabled={loading}  type="submit" className="w-100 primary-btn btn mt-5">
                     {loading &&  <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            />}
                   
                    <FormattedMessage id="submit"/>
                </Button>
            </Form>
        </div>
    )
}

export default UserSignup

