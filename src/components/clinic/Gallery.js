import React, {useEffect, useState} from 'react'
import {  toast } from 'react-toastify';
import GalleryModal from './GalleryModal';
import axios from '../../api';
import { FormattedMessage} from 'react-intl';
import {getImgSrc} from '../../utils'

function Gallery({gallery, id, isLoggedin}) {
    const [open, setopen] = useState(false);
    const [file, setfile] = useState("");
    const [img, setimg] = useState("");
    const [caption, setcaption] = useState("")
    const [loading, setloading] = useState(false);
    const [newGallery, setnewGallery] = useState([])

    useEffect(() => {
       setnewGallery(gallery);
    }, [gallery])
    
    const handleSubmitFile = (e) => {
        e.preventDefault()
        if(file){
           setloading(true)
           const fileData = new FormData();
           fileData.append("photo", file)
           axios.post(`/upload`, fileData , { })
           .then((res) => {
              const path= res.data.path; 
              axios.put(`/accounts/clinics/update/${id}`, 
            {gallery : [{img: path, caption}, ...newGallery]} )
            .then( docs => {
                if(docs){
                    console.log(res)
                    setnewGallery(docs.data.newData?.gallery)
                     setfile(''); 
                     setimg('');
                     setcaption('');
                     setopen(false);
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

             })

            setloading(false)
        }).catch(err => {
            console.log(err);
            toast.error("file is too large", {
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
      else{
        toast.error("Fill in all fields", {
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

    const handleChangeFile = (e) => {
        const selected = e.target.files[0];
         if(selected?.size > 2000000 ){
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
             setfile(selected)
             const fileReader = new FileReader();
             fileReader.readAsDataURL(selected);
             fileReader.onloadend = () => {
               setimg(fileReader.result)   
             };
         } 
         else{
             console.log('no file selected')
         }
    }

    const handleDeleteGallery = (i) => {
        let filtedData = newGallery.filter(gal => gal._id !== i)
        axios.put(`/accounts/clinics/update/${id}`, 
        {gallery : filtedData})
        .then((res) => {
            setnewGallery(res.data.newData?.gallery)
        })
    }

    return (
        <>
            <div className="clinic__section">
                <div  className="section__heading">
                    <h5 className="title">
                        <FormattedMessage id="clinicGallery"/>
                    </h5>
                     {isLoggedin &&
                        <button  onClick={() => setopen(true)} 
                        data-bs-toggle="tooltip" 
                        data-bs-placement="top" 
                        title="Edit" 
                        className="btn edit-icon"> 
                         <i className="fa fa-plus" aria-hidden="true"></i>
                        </button>
                        }
                </div>
                {!newGallery || newGallery.length === 0 ? "no data" : ""}
                <div className="section__content gallery row">
                    {newGallery && newGallery.map((gal) => 
                          <div index={gal?._id} className="gallery_container col-xs-12 col-sm-6 col-md-3">
                              <div className="img__container">
                                 <img  src={getImgSrc() + '/'+ gal?.img} alt="index"/>
                                 {isLoggedin && 
                                   <div className="action__btns">
                                   <button className="btn" onClick={() => handleDeleteGallery(gal._id)}>
                                       <i class="fa fa-trash" aria-hidden="true"></i>
                                   </button>
                                    </div>
                                 }
                              </div>
                             <p className="text-center">{gal?.caption}</p>
                         </div>
                      )}
                </div>
            </div>
    
            <GalleryModal 
            show={open} 
            handleClose={() => setopen(false)} 
            img={img}
            caption={caption}
            setcaption={setcaption}
            handleSubmitFile={handleSubmitFile}
            handleChangeFile={handleChangeFile}
            loading={loading}/>
        </>
    )
}

export default Gallery
