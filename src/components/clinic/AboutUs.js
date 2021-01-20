import React, { useEffect, useState } from 'react'
import Bio from './BioModal'
import axios from '../../api';
import { FormattedMessage} from 'react-intl';

function AboutUs({bio, id, isLoggedin}) {
     const [open, setopen] = useState(false);
     const [editbio, setbio] = useState("");
     const [loading, setloading] = useState(false);
     const [changed, setchanged] = useState(false)

     useEffect(() => {
         setbio(bio)
     }, [bio])
    
     const handleSubmit = () => {
         if(editbio){
            setloading(true);
            axios.put(`/accounts/clinics/update/${id}`, {bio: editbio}).then(res => {
                console.log(res);
                setopen(false);
                setchanged(true)
                setloading(false);
                
            }).catch(err => {
                console.log(err)
                setloading(false);
            })
         }
     }

    return (
        <>
              <div className="clinic__section">
                   <div className="section__heading">
                         <h5 className="title"> <FormattedMessage id="aboutus"/></h5>
                         {isLoggedin &&
                            <button 
                            data-bs-toggle="tooltip" 
                            data-bs-placement="top" 
                            title="Edit" 
                            onClick={() => setopen(true)}
                            className="btn edit-icon"> 
                            <i className="fas fa-edit    "></i>
                            </button>
                         }
                   </div>
                  
                 <p>
                   {changed ?  editbio  :  <>{bio || "no data"}</> }  
                </p>
            </div>
             <Bio 
                handleSubmit={handleSubmit}  
                loading={loading}  
                bio={editbio} 
                handleChange={e => setbio(e.target.value)}  
                show={open} 
                handleClose={() => setopen(false)}/>
        </>
    )
}

export default AboutUs
