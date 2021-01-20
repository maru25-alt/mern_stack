import React, {useEffect , useState} from 'react'
import axios from '../../api';
import {getIntial, getImgSrc} from '../../utils'
import { FormattedMessage} from 'react-intl';
import { useDispatch} from 'react-redux';
import {setMessageView} from '../../features/app/appSlice';
import {Spinner} from 'react-bootstrap'

function ChatHeader({id}) {
    const [user, setuser] = useState(null)
    const dispatch = useDispatch()
    const [loading, setloading] = useState(false)
    

    useEffect(() => {
        setloading(true)
         axios.get(`/users/${id}`).then(doc => {
             console.log(doc)
             setuser({
                 name: doc.data.user?.name,
                 account: doc.data.user?.account,
                 photoUrl: doc.data.user?.photoUrl || doc.data.user?.logo
             })
             setloading(false)
         })
         .catch(() => {
            setloading(false) ;
           
        })
    }, [id])

    return (
        <div className="chat__header">
         <button className="btn chatView" onClick={() => dispatch(setMessageView(false))}> 
            <i className="fas fa-chevron-left fa-2x"></i>
         </button>
         {loading ? <div className="d-flex justify-content-end">
                <Spinner animation="grow" size="sm" />
                <Spinner animation="grow" size="sm" />
                <Spinner animation="grow" size="sm" />
         </div> 
         : <>
             <div className="">
            { user?.photoUrl ? 
            <img className="img__avatar" src={getImgSrc() + '/'+  user?.photoUrl} alt="" /> : 
            <div className="initial__avatar"> {getIntial(user?.name || "U")}</div>
            } 
            </div>
            <div className="username">
                <h6>{user?.name}</h6>
                <p>Last seen...</p>
            </div>
            </>}
         <div>
             <a className="btn" href={`/${user?.account}/${user?.name}/${id}`}> 
                <i className="fas fa-sign-out-alt"></i>
                <FormattedMessage id="visitProfile"/>
                
            </a>
             
         </div>
    </div>
    )
}

export default ChatHeader
