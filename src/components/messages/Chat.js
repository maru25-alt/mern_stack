import React, {useState, useEffect, useRef} from 'react'
import Message from './Message'
import axios from '../../api';
import { useSelector} from 'react-redux';
import {selectUser} from '../../features/user/userSlice';
import ChatHeader from './ChatHeader';
import { FormattedMessage} from 'react-intl';
import {selectMessageView} from '../../features/app/appSlice';
import {Spinner} from 'react-bootstrap';

function Chat({id}) {
    const [messages, setmessages] = useState([]);
    const [user2, setuser2] = useState("");
    const user = useSelector(selectUser);
    const [text, settext] = useState("")
    const messagesEndRef = useRef(null)
    const view = useSelector(selectMessageView)
    const [loading, setloading] = useState(false)

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }
 useEffect(scrollToBottom, []);
    
    useEffect(() => {
            console.log("getting chats")
            setloading(true)
            axios.get(`/messages/chat/${id}`)
            .then(doc => {
                if(doc.data.success === false){
                   console.log("ERROR")
                }
                else{
                    console.log(doc, "doc")
                    console.log(user?.id , "user")
                    setmessages(doc.data.messages);
                    if(doc.data?.user1 === user?.id){
                        setuser2(doc.data?.user2)
                    }
                    else{
                        setuser2(doc.data?.user1)
                    }
                }
                setloading(false) 
            })
            .catch(() => {
                setloading(false) ; 
            })
    }, [id, user])
    
    const handleSendMessages = (e) => {
        e.preventDefault();
        if(text){
            axios.post(`/messages/addmessage/${id}` , 
            {messages: [{sender: user?.id, text: text}, ...messages]}).then(res => {
                setmessages(res.data.newData?.messages);
                settext("")
            })
        }
    }
   
    return (
        <div className={view ? "chat__container" : "chat__container smallDeviceView"}>
           <ChatHeader id={user2}/>
          <div className="chat__messages">
              {loading ?
               <div className="d-flex justify-content-center">
                   <Spinner animation="grow" size="sm" />
                   <Spinner animation="grow" size="sm" />
                   <Spinner animation="grow" size="sm" />
               </div> 
               :
               <>
                {messages && messages.map(message =>  
                    <Message 
                    key={message?._id}
                    message={message} 
                    currentUser={user?.id}/>)
                    .reverse()} 
                      <div ref={messagesEndRef} />
                </>
                }
               
          </div>
              <form onSubmit={handleSendMessages} action="" className="chat__sendForm">
                  <input value={text} onChange={e => settext(e.target.value)} autoFocus={true} placeholder="Type here..." type="text" name="" id=""/>
                  <button type="submit" className="btn">
                      <FormattedMessage id="send"/>
                      <i className="fas fa-paper-plane"></i>
                      </button>
              </form>
        </div>
       
    )
}

export default Chat
