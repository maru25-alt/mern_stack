import React, { useState , useEffect} from 'react'
import axios from '../../api';
import moment from 'moment';
import {getIntial} from '../../utils';
import {Spinner} from 'react-bootstrap'
import {getImgSrc} from '../../utils';
import { FormattedMessage} from 'react-intl';

function Testimony({id, message, date, recommend,  sender}) {
    const [user, setuser] = useState(null)

    useEffect(() => {
        axios.get(`/accounts/clinics/user/${sender}`)
        .then(res => {
           if(res.data){
               console.log(res.data)
               setuser({
                   name: res.data.name,
                   photoUrl: res.data.photoUrl || res.data.logo ,
                   account: res.data.account
               })
           }
        })
        .catch(err => {
            console.log(sender)
        })
    }, [sender])

    return (
            <div key={id} className="testimony">
                   <div className="name">
                       {user  ? <>
                        {user?.photoUrl ?  
                          <img className="userPic" src={ getImgSrc() + '/'+ user?.photoUrl} alt=""/> 
                        : <div className="avatar"> {getIntial(user?.name)} </div>}
                       </>  :
                        <div className="py-5">
                          <Spinner animation="grow" size="sm" />
                          <Spinner animation="grow" size="sm" />
                          <Spinner animation="grow" size="sm" />
                        </div>
                       }
                      
                        
                      <div>
                         <h6> <a href={`/${user?.account}/${user?.name}/${sender}`}> <strong>{user?.name}</strong></a> </h6>
                         <div className="text-muted">{moment(date).fromNow()} </div>
                      </div>  
                  </div>
                   <strong className={recommend ?  "recommendent" : "not__recommendent"}> {recommend ? <FormattedMessage id="rec"/> : <FormattedMessage id="notRec"/>}</strong>
                   <p>{message}</p>
            </div>
    )
}

export default Testimony
