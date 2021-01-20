import React, { useEffect, useState } from 'react'
import {Link, NavLink} from 'react-router-dom';
import axios from '../../api';
import {getImgSrc, getIntial, timeStamp, trimString} from '../../utils'
import { useDispatch} from 'react-redux';
import {setMessageView} from '../../features/app/appSlice'
import '../../css/messages.css'

function SidebarChat({currentUser, chat}) {
    const [user, setuser] = useState({});
    const dispatch = useDispatch()
    const img = false;

    useEffect(() => {
        let userId = currentUser === chat?.user1 ? chat?.user2 : chat?.user1;
        axios.get(`/users/${userId}`).then(res => {
            setuser({
                name: res.data.user?.name,
                photoUrl: res.data.user?.photoUrl,
                lastMessage: chat?.messages[0]
            });
        }) 
    }, [chat, currentUser])
   
    console.log(chat)
    return (
             <NavLink onClick={() => dispatch(setMessageView(true))}  activeStyle={{ backgroundColor: '#1d4354', color: "#fff" }} to={`/messages/${chat?._id}`} className="chat">
                    <div className="chat__avatar">
                        {user?.photoUrl ?  
                         <img className="img__avatar" width="60px" src={getImgSrc() + '/'+ user?.photoUrl} alt=""/> :  
                         <div className="initial__avatar">{getIntial(user?.name || "U")}</div>
                         }
                    </div>
                    <div className="content">
                        <div className="content__top">
                            <h6>{trimString( user?.name || "" , 10)}</h6>
                            <div className="time">{timeStamp(user.lastMessage?.timestamp)}</div>
                        </div>
                        <p>
                           {trimString( user.lastMessage?.text || "", 20)}
                        </p>
                    </div>
              </NavLink>
    )
}

export default SidebarChat
