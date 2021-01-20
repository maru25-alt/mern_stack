import React from 'react';
import {getImgSrc} from '../../utils'
import moment from 'moment';


function Profile({date, img, caption,  id, deletePost, isLoggedin}) {
    let src = getImgSrc() + '/'+ img;
    console.log(src)
    return (
        <div  className="post ">
             <img src={src} className="post__img" alt=""/>
             <div className="post__description">
                 <p className="text-muted"> <strong>{moment(date).fromNow()}</strong></p>
                 <p>{caption}</p>
             </div>
                {isLoggedin && 
                    <div className="post__buttons">
                        <button 
                          onClick={() => deletePost(id)} 
                          className="btn"> 
                          <i className="fa fa-trash  fa-2x" aria-hidden="true"></i> 
                        </button>
                    </div>
                }
        </div>
    )
}

export default Profile
