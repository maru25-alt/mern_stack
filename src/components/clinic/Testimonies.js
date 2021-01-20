import React, {useState, useEffect} from 'react'
import Testimony from './Testimony';
import LeaveCommentForm from './LeaveCommentForm'
import {  toast } from 'react-toastify';
import axios from '../../api'
import { useSelector } from 'react-redux';
import {selectUser} from '../../features/user/userSlice';
import { FormattedMessage} from 'react-intl';

function Testimonies({comments, id}){
    const [comment, setcomment] = useState("");
    const [recomment, setrecomment] = useState("");
    const [pageComments, setpageComments] = useState([]);
    const user = useSelector(selectUser)

    useEffect(() => {
       setpageComments(comments)
    }, [comments]);
 
    const handleSubmitComment = () => {
        console.log(recomment)
        if(recomment !== ""){ 
             axios.put(`/accounts/clinics/update/${id}`, 
             {comments: [{recomment, sender: user?.id, message: comment }, ...pageComments]})
             .then(res => {
                 if(res.data.success){
                     setcomment('');
                     setrecomment(null);
                    setpageComments(res.data.newData.comments)
                 }
                
             })
             .catch(err => {
                 console.log(err)
             })
        }
        else{
            toast.error("Do you recomment this clinic", {
                position: "top-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        } 
    }

    return (
        <div className="clinic__section">
        <div  className="section__heading">
            <h5 className="title"><FormattedMessage id="test"/> ({pageComments.length})</h5>
        </div>
        <div className="addComment__section my-5">
               <h6><FormattedMessage id="leavComm"/></h6>
               {user ? 
               <LeaveCommentForm 
               comment={comment}  
               setcomment={setcomment}
               setrecomment={setrecomment}
               handleSubmitComment ={ handleSubmitComment}/>
               : 
               <a href='/signin' 
               className="btn btn-sm btn-info"> 
                 <FormattedMessage id="signinFirst"/> </a>
               }
        </div>

        {!pageComments || pageComments.length === 0 ? "no comments yet" : ""}
        <div  className="section__content testimonies">
            {pageComments && pageComments.map(com => 
            <Testimony 
               key={com._id}
               id={com._id}
               sender={com.sender}
               date={com.date}
               recommend={com?.recomment }
               message={com?.message} />
             )}
        </div>
    </div>

    )
}

export default Testimonies
