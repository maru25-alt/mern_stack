import React, {useState, useEffect} from 'react'
import {Button} from 'react-bootstrap';
import Name from './Name'
import Logo from './Logo'
import axios from '../../api';
import {LoginString} from '../../app/localStorage';
import {  toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { update} from '../../features/user/userSlice'
import {getImgSrc} from '../../utils'
import { FormattedMessage} from 'react-intl';
import {SentMessagesConnection} from '../../api';
import {useHistory} from 'react-router-dom'

function ClinicHeader({logo, name , id, isLoggedin, handlelogout }) {
    const [showname, setShowName] = useState(false);
    const [showlogo, setShowlogo] = useState(false);
    const [file, setFile] = useState("");
    const [fileName, setfileName] = useState("");
    const [changed, setchanged] = useState(false);
    const [changedName, setchangedName] = useState(false);
    const [loading, setloading] = useState(false);
    const [editname, setEditname] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        setFile(logo);
        setEditname(name)
    }, [logo, name])


    const handleMessage = () => {
        SentMessagesConnection(id, history)
    }

    const handleChangeFile = (e) => {
        const selected = e.target.files[0];
         if(selected.size > 2000000  ){
            toast.error("image is too large", {
                position: "top-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
             })  
         }
        else if(selected){
            setfileName(selected)
             const fileReader = new FileReader();
             fileReader.readAsDataURL(selected);
             fileReader.onloadend = () => {
               setFile(fileReader.result)   
             };
         } 
     }


     const handleSubmitFile = (e) => {
        e.preventDefault()
        if(file){
          setloading(true)
          const fileData = new FormData();
          fileData.append("photo", fileName)
          axios.post('/upload', fileData, {}).then( res => {
            const path= res.data.path;
            console.log(path)
            axios.put(`/accounts/clinics/update/${id}`, {logo: path}).then((resp) => {
                if(resp.data?.success){
                   localStorage.setItem(LoginString.PhotoURL, path);
                    dispatch(update({
                        photoUrl: path
                    }))
                   setchanged(true)
                   setShowlogo(false)
                }
                else{
                  toast.error("something when wrong try again later", {
                      position: "top-right",
                      autoClose: false,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                   })  
                }
                setloading(false)
            })
          })
          .catch(err => {
              console.log(err);
              toast.error("something when wrong try again later", {
                position: "top-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
             })  
              setloading(false)
          })
        }
    }

    const handleSubmitName = (e) =>{
        e.preventDefault();
        if(editname){
            setloading(true);
            axios.put(`/accounts/clinics/update/${id}`, {name: editname}).then(res => {
                console.log(res);
                setShowName(false);
                setchangedName(true)
                setloading(false)
                localStorage.setItem(LoginString.NAME, editname);
            }).catch(err => {
                console.log(err)
                alert('something went wrong')
                setloading(false)
            })
        }
    }

    return (
       <>
         <div className="clinic__header">
                 <div>
                     {isLoggedin &&   <strong className="btn" onClick={() => setShowlogo(true)}> <i className="fas fa-edit "></i> </strong>}
                   {
                       changed ?   <img className="avatar" src={changed ? file :  getImgSrc() + '/'+ logo} alt=""/>  : 
                       <>
                          {(logo === '' || logo === undefined)?  <div className="initial">{name?.slice(0, 1).toUpperCase()} </div>
                            :
                           <img className="avatar" src={changed ? file :  getImgSrc() + '/'+ logo} alt=""/> 
                          }  
                       </>
                   }
                 </div>
                 <div className="header__name">  
                     <h5>{changedName? editname : name}
                       {isLoggedin &&
                           <strong onClick={() => setShowName(true)} 
                           className="btn edit-icon"> 
                              <i className="fas fa-edit    "></i> 
                          </strong>
                       }
                    </h5>
                     <p> {id}</p>
                 </div>
                 <div>
                     {isLoggedin ?  
                       <Button onClick={handlelogout } className="outline-btn  mr-3">
                            <FormattedMessage id="logout"/>
                        </Button> 
                        : 
                       <Button className="outline-btn " onClick={handleMessage}>
                             <FormattedMessage id="msg"/>
                      </Button>}
                 </div>
            </div>
              <Name 
                handleChange={e => setEditname(e.target.value)}  
                name={editname} 
                show={showname} 
                handleSubmitName={handleSubmitName}
                handleClose={() => setShowName(false)}/>
              <Logo  
              loading={loading} 
              handleSubmitFile={handleSubmitFile} 
              handleChangeFile={handleChangeFile} 
              img={file} 
              fileName={fileName} 
              show={showlogo} 
              handleClose={() => setShowlogo(false)}/>
       </>
    )
}

export default ClinicHeader
