import React, {useState} from 'react'
import {Form, Button, InputGroup, Spinner} from 'react-bootstrap';
import { useForm } from "react-hook-form";
//import axios from '../app/axios';
//import {  toast } from 'react-toastify';
//import { useDispatch} from 'react-redux';
//import {loggin}  from '../features/user/userSlice';
//import  {LoginString} from '../app/localStorage'
import '../css/signin.css'

function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectUser, setUser] = useState("")
    const { register, handleSubmit, errors } = useForm();
    //const dispatch = useDispatch();

    const handleSignin = () => {
        setLoading(true)
        if(!selectUser){
            alert('Please select account type')
        }
        console.log('vvhvgh')
    }
    // const handleSignin = () => {
    //     if(selectUser === ""){
    //         toast.error("Please select user", {
    //             position: "top-right",
    //             autoClose: false,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //         })  
    //         return 0
    //     }
    //     setLoading(true);
    //     let url = selectUser  === 'clinic' ? "/clinics/signin" : "/users/signin"
    //     axios.post(url, {email, password}).then(res => {
    //         let resData = res.data;
    //         console.log('LOGIN')
    //          if(resData.error){
    //             toast.error(resData.error, {
    //                 position: "top-right",
    //                 autoClose: false,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //             })  
    //             setLoading(false)
    //          }
    //          else if(resData.user){
    //             const {token, user} = resData
    //             setLoading(false)
    //             toast.success('successfully logged in', {
    //                 position: "top-right",
    //                 autoClose: false,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //             })
    //             localStorage.setItem(LoginString.EMAIL, user.email);
    //             localStorage.setItem(LoginString.NAME, user.name);
    //             localStorage.setItem(LoginString.PhotoURL, user.photoUrl);
    //             localStorage.setItem(LoginString.ID, user._id);
    //             localStorage.setItem(LoginString.TOKEN, user.token);
    //             localStorage.setItem(LoginString.USERTYPE, selectUser);
    //             dispatch(loggin({
    //                  ...user
    //             }))
    //             selectUser  === 'clinic' ? history.push(`/clinic/${user.name}/${user._id}`) :  history.push(`/user/${user.name}/${user._id}`)
    //          }
    //          else{
    //              console.log("mmmmmm")
    //          }
    //     }).catch(() => {
    //         setLoading(false)
    //         toast.error('sorry something went wrong , try again later', {
    //             position: "top-right",
    //             autoClose: false,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //         })  
    //     })

    // }



    return (
        <div className="signin">
            <Form className="signin__form"  onSubmit={handleSubmit(handleSignin)}>
               <h4 className="text-center"><strong> Signin to your account </strong></h4>
                <div  className="mb-3 text-center">
                    <h6><strong>Select Account Type</strong> </h6>
                    <div className="signin__selectUser">
                       <Form.Check onClick={(e) => setUser(e.target.id)} inline label="Client" type="radio" id="client" name="user" />
                       <Form.Check onClick={(e) => setUser(e.target.id)} inline label="Clinic" type="radio" id="clinic" name="user" />
                    </div>
                 </div>
                <InputGroup controlid="formBasicEmail" className="mb-3">
                    <InputGroup.Prepend>
                          <InputGroup.Text style={{width: "100px"}} id="basic-addon1">Email</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    name="email" 
                    ref={register({ required: true })} 
                    type="text" 
                    placeholder="Enter email" />
                </InputGroup>
                {errors.email && <span className="text-danger mb-2">This field is required</span>}
                <InputGroup controlid="formBasicPassword" className="mb-3">
                    <InputGroup.Prepend>
                          <InputGroup.Text  style={{width: "100px"}} id="basic-addon1">Password</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control  
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    name="password" 
                    ref={register({ required: true })} 
                    type="password" 
                    placeholder="Password" />
                </InputGroup>
                {errors.email && <span className="text-danger mb-5">This field is required</span>}
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

export default Signin
