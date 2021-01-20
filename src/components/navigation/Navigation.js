import React, {useState} from 'react'
import {Nav, Navbar, Form,  Button, Spinner} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux';
import {selectUser, logout} from '../../features/user/userSlice';
import {setLocale} from '../../features/app/appSlice';
import {selectLoading} from '../../features/app/appSlice'
import {useHistory} from 'react-router-dom'
import '../../css/navigation.css'
import {getIntial, getImgSrc} from '../../utils';
import { FormattedMessage} from 'react-intl';
import {NavLink} from 'react-router-dom'

function Navigation() {
    const [open, setopen] = useState(false)
    const user = useSelector(selectUser)
    const loading = useSelector(selectLoading)
    const dispatch = useDispatch();
    const history = useHistory();
    
    const handleLogout = () => {
        localStorage.clear();
        dispatch(logout());
        history.push('/signin')
    }

    const handleChangeLang = () => {
        dispatch(setLocale({
            locale: "en"
        }))
    }

    const handleChangeKR = () => {
        dispatch(setLocale({
            locale: "kr"
        }))
    }
    console.log( user?.photoUrl)

    return (
        <Navbar className="app__navbar"  variant="dark" expand="lg">
             <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
            <Form inline className="navbar__form"  >
                    <i className="fa fa-search" aria-hidden="true"></i>
                    <input autoFocus type="text" placeholder="Search" className="mr-sm-2" />
            </Form>
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                <Nav className="justify-content-end">
                  <NavLink activeStyle={{ color: ' #10b301' }} className="nav-link" to="/"><FormattedMessage id="findClinic"/> </NavLink>
                  <NavLink activeStyle={{ color: ' #10b301' }} className="nav-link" to="/users"><FormattedMessage id="findClients"/></NavLink>
                  {loading ? <div> 
                    <Spinner animation="grow" size="sm" />
                    <Spinner animation="grow" size="sm" />
                    <Spinner animation="grow" size="sm" />
                  </div> : <>
                  {user ? 
                     <>
                        <NavLink activeStyle={{ color: ' #10b301' }} className="nav-link" to="/messages/default">
                          <FormattedMessage id="msgs"/>
                        </NavLink>
                     <div className="menu">
                         <div onClick={() =>  setopen(!open)}  className="nav__user">
                             {( user?.photoUrl)  ? 
                              <img  className="nav__avatar" src={ getImgSrc() + '/'+ user?.photoUrl} alt={user?.name}/>: 
                               <div className="nav__initial">{ getIntial(user?.name)}</div> 
                             
                           }
                         </div>
                        {open  &&  
                        <ul className="menuContainer">
                            <li> 
                                <Nav.Link href={ user.account === 'clinic' ?  `/clinic/${user?.name}/${user?.id}` : `/user/${user?.name}/${user?.id}`}>
                                   <FormattedMessage id="viewProfile"/>
                                 </Nav.Link>
                             </li>
                            <li> 
                                <Button onClick={handleLogout} variant="danger">
                                   <FormattedMessage id="logout"/>
                                </Button> 
                            </li>
                        </ul>}
                       
                       </div> 
                       </>: <>
                       <NavLink activeStyle={{ color: ' #10b301' }} className="nav-link" to="/signin">
                           <FormattedMessage id="signin"/>
                        </NavLink>
                       <Nav.Link className="nav-btn btn primary-btn" href="/signup">
                           <FormattedMessage id="signup"/>
                        </Nav.Link>
                      </>}
                      <div className="row ml-2 translation__container">
                          <button onClick={handleChangeLang} className="btn">
                              <FormattedMessage id="eng"/>
                            </button>
                          <button className="btn btn-sm line">|</button> 
                          <button onClick={handleChangeKR} className="btn">
                              <FormattedMessage id="kr"/> 
                            </button>
                      </div>
                  </>}
                  
                 
                </Nav> 
            </Navbar.Collapse>
        </Navbar>
    )
}

export default (Navigation)
