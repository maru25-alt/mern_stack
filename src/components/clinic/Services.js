import React, {useState, useEffect} from 'react'
import ServicesModal from './ServicesModal'
import axios from '../../api'
import {getID} from '../../utils'
import {  toast } from 'react-toastify';
import { FormattedMessage} from 'react-intl';

function Services({services, id, isLoggedin}) {
    const [open, setopen] = useState(false);
    const [service, setservice] = useState();
    const [loading, setloading] = useState(false);
    const [changedServices, setchangedServices] = useState([]);
    const [pageServices, setpageServices] = useState([])

   useEffect(() => {
       setpageServices(services)
   }, [services])

    const handleAddService = () => {
         if(service){
             setchangedServices([{service, _id: getID()}, ...changedServices])
             setservice('')
         }
    }

    const deleteService = (i) => {
       setchangedServices(changedServices.filter(serv => serv._id !== i))
    }

    const handleOpenModal = () => {
        setopen(true);
        setchangedServices(pageServices)
    }

    const handleSaveChanges = () => {
        console.log(changedServices)
        axios.put(`/accounts/clinics/update/${id}`, {services: changedServices})
        .then((res) => {
            console.log(res)
           if(res.data.success){
               console.log(res.data.newData.services)
               setpageServices(res.data.newData?.services);
               setopen(false)
           }
           setloading(false);
        })
        .catch(err => {
           setloading(false);
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
        })
    }

    return (
        <>
        <div className="clinic__section">
          <div className="section__heading">
            <h5 className="title"><FormattedMessage id="serv"/></h5>
                {isLoggedin &&
                    <button  
                        onClick={handleOpenModal} 
                        data-bs-toggle="tooltip" 
                        data-bs-placement="top" 
                        title="Edit" 
                        className="btn edit-icon"> 
                        <i className="fa fa-plus" aria-hidden="true"></i> 
                    </button>
                    }
           </div>
                {!pageServices || pageServices.length === 0 ? "no data" : ""}
                <ul className="section__content listing">
                    {pageServices && pageServices.map((serv )=> 
                        <li key={serv._id}>{serv.service}</li>
                    )}
                </ul>
          </div>
           <ServicesModal 
           service={service}
           loading={loading}
           setservice = {setservice}
           handleSubmitService={ handleAddService}
           show={open} 
           handleSaveChanges={handleSaveChanges}
           services={changedServices}
           deleteService={deleteService}
           handleClose={() => setopen(false)}/>
        </>
    )
}

export default Services
