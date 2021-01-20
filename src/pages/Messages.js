import React from 'react'
import {Route, Switch} from "react-router-dom";
import Sidebar from '../components/messages/Sidebar';
import '../css/messages.css';
import ChatView from '../components/messages/ChatView';

function Messages() {
    return (
        <div className="messages__container">
            <Sidebar/>
            <Switch>
                 <Route path="/messages/:id" 
                 component={ChatView}/>
            </Switch>
        </div>
    )
}

export default Messages
