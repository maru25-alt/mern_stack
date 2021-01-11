import React, {useState} from 'react'
import {Nav, Navbar, Form,  Button} from 'react-bootstrap'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import {  faSearch } from '@fortawesome/free-solid-svg-icons'
//import { useSelector, useDispatch } from 'react-redux';
//import {selectUser, logout} from '../features/user/userSlice';
import {useHistory} from 'react-router-dom'
import './navigation.css'

function Navigation() {
    const [open, setopen] = useState(false)
    const user = null
   // const dispatch = useDispatch();
    const history = useHistory();
    
    const handleLogout = () => {
        localStorage.clear();
      //  dispatch(logout());
        history.push('/signin')
        
    }

    console.log(user)
    return (
        <Navbar className="app__navbar"  variant="dark" expand="lg">
             <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            <Form inline className="navbar__form"  >
                    {/* <FontAwesomeIcon icon={faSearch} /> */}
                    <i class="fa fa-search" aria-hidden="true"></i>
                    <input autoFocus type="text" placeholder="Search" className="mr-sm-2" />
            </Form>
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                <Nav className="justify-content-end">
                  <Nav.Link className="nav-link" href="/">Find Clinics</Nav.Link>
                  {user ? 
                     <div className="menu">
                         <div onClick={() =>  setopen(!open)}  className="nav-avatar">
                             {(user?.photoUrl === '' || user?.photoUrl.type === undefined) ? <strong className="initial">{user?.name.slice(0, 1)}</strong> : 
                            <img  className="nav-avatar" src={user?.photoUrl} alt={user?.name}/>
                           }
                         </div>
                    
                     {open  &&  
                       <ul className="menuContainer">
                           <li> <Nav.Link href={ user.type === 'clinic' ?  `/clinic/${user?.name}/${user?._id}` : `/user/${user?.name}/${user?._id}`}> View Profile</Nav.Link> </li>
                           <li> <Button onClick={handleLogout} variant="danger">Logout</Button> </li>
                       </ul>}
                       
                 </div> : <>
                 <Nav.Link className="nav-link" href="/signin">Signin</Nav.Link>
                  <Nav.Link className="nav-btn btn primary-btn" href="/signup">Signup</Nav.Link>
                 </>}
                 
                </Nav> 
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Navigation
