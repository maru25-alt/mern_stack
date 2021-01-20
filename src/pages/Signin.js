import React, {useState} from 'react'
import {Form, Button, InputGroup, Spinner} from 'react-bootstrap';
import { useForm } from "react-hook-form";
import {clientSignin, clinicSignin} from '../api'
import {  toast } from 'react-toastify';
import { useDispatch} from 'react-redux';
import {loggin}  from '../features/user/userSlice';
import  {LoginString} from '../localStorage'
import '../css/signin.css';
import { FormattedMessage} from 'react-intl';

function Signin({history}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectUser, setUser] = useState("")
    const { register, handleSubmit, errors } = useForm();
    const dispatch = useDispatch();

    const handleSignin = async() => {
    
        setLoading(true)
        if(selectUser === 'clinic'){
            await clinicSignin({password, email, account: selectUser}, (res) => {
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
                        account: user.account
                    }))
                    localStorage.setItem(LoginString.EMAIL, user.email);
                    localStorage.setItem(LoginString.NAME, user.name);
                    localStorage.setItem(LoginString.PhotoURL, user.logo);
                    localStorage.setItem(LoginString.ID, user._id);
                    localStorage.setItem(LoginString.TOKEN, token);
                    localStorage.setItem(LoginString.TYPE, user.account);
                    toast.success('successfully logged in', {
                        position: "top-right",
                        autoClose: false,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                    history.push(`/clinic/${user?.name}/${user?._id}`);
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
            await clientSignin({password, email, account: selectUser}, (res) => {
                 const data = res.data;
                 console.log(data)
                 if(data?.success){
                    const {token , user} = data;
                    console.log(user)
                    setLoading(false)
                    dispatch(loggin({
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        photoUrl: user.photoUrl,
                        account: user.account
                    }))
                    localStorage.setItem(LoginString.EMAIL, user.email);
                    localStorage.setItem(LoginString.NAME, user.name);
                    localStorage.setItem(LoginString.PhotoURL, user.photoUrl);
                    localStorage.setItem(LoginString.ID, user._id);
                    localStorage.setItem(LoginString.TOKEN, token);
                    localStorage.setItem(LoginString.TYPE, user.account);
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
            <Form className="signin__form"  onSubmit={handleSubmit(handleSignin)}>
               <h4 className="text-center"><strong> <FormattedMessage id="signinStmt"/> </strong></h4>
                <div  className="mb-3 text-center">
                    <h6><strong><FormattedMessage id="selAcc"/></strong> </h6>
                    <div className="signin__selectUser">
                       <Form.Check onClick={(e) => setUser(e.target.id)} inline label="Client" type="radio" id="user" name="user" />
                       <Form.Check onClick={(e) => setUser(e.target.id)} inline label="Clinic" type="radio" id="clinic" name="user" />
                    </div>
                 </div>
                <InputGroup controlid="formBasicEmail" className="mb-3">
                    <InputGroup.Prepend>
                          <InputGroup.Text style={{width: "100px"}} id="basic-addon1">
                          <FormattedMessage id="email"/> 
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    name="email" 
                    ref={register({ required: true })} 
                    type="text" 
                    placeholder="Enter email" />
                </InputGroup>
                {errors.email && <span className="text-danger mb-2"><FormattedMessage id="fieldReq"/></span>}
                <InputGroup controlid="formBasicPassword" className="mb-3">
                    <InputGroup.Prepend>
                          <InputGroup.Text  style={{width: "100px"}} id="basic-addon1"> 
                              <FormattedMessage id="passowrd"/>
                         </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control  
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    name="password" 
                    ref={register({ required: true })} 
                    type="password" 
                    placeholder="Password" />
                </InputGroup>
                {errors.email && <span className="text-danger mb-5"> <FormattedMessage id="fieldReq"/></span>}
                <a className="text-danger text-center" href="/signup"> <FormattedMessage id="alrAccStatement"/> </a>
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

export default Signin
