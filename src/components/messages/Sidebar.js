import React, {useState, useEffect} from 'react';
import SidebarChat from './SidebarChat';
import AddUser from './AddUserModal';
import axios from '../../api';
import { useSelector} from 'react-redux';
import {selectUser} from '../../features/user/userSlice';
import {selectMessageView} from '../../features/app/appSlice'
import {Spinner} from 'react-bootstrap'


function Sidebar() {
    const [chats, setchats] = useState([]);
    const user = useSelector(selectUser);
    const view = useSelector(selectMessageView)
    const [loading, setloading] = useState(false)

    useEffect(() => {
        setloading(true)
        axios.get(`/messages/chats/${user?.id}`)
        .then(res => {
             console.log(res.data)
             setchats(res?.data)
             setloading(false)
        })
        .catch(() => {
            setloading(false)
        })
    }, [user])

    return (
        <div  className={ view  ? `sidebar smallDeviceView` : "sidebar "}>
             <div className="sidebar__header">
                  <AddUser/>
            </div>
            <form action="" className="sidebar__search">
                <i class="fa fa-search" aria-hidden="true"></i>
                <input type="text" name="" id="" placeholder="search"/>
            </form>
            <div className="sidebar__chats">
                {loading ?  <div className="container d-flex justify-content-center">
                     <Spinner animation="grow" size="sm" />
                     <Spinner animation="grow" size="sm" />
                     <Spinner animation="grow" size="sm" />
                </div> : 
                <>
                 {chats && chats.map(res => {
                     return   <SidebarChat  key={res._id} currentUser={user?.id} chat={res}/>
                 })}
                </>}
            </div>
        </div>
    )
}

export default Sidebar
