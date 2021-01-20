import React, {useState, useEffect} from 'react'
import { Col,  Card} from 'react-bootstrap';
import axios from '../../api'
import DoctorModal from './DoctorModel';
import {  toast } from 'react-toastify';
import { FormattedMessage} from 'react-intl';


function Doctors({doctors, id, isLoggedin}) {
    const [open, setopen] = useState(false);
    const [speciality, setspeciality] = useState('')
    const [experience, setexperience] = useState(0)
    const [name, setname] = useState("");
    const [newDoctors, setnewDoctors] = useState([]);
    const [loading, setloading] = useState(false);
    const [isEdit, setisEdit] = useState(false);
    const [editID, seteditID] = useState("")

    useEffect(() => {
        setnewDoctors(doctors)  
    }, [doctors])


    const handleDelete = (i) => {
        console.log('clicked', i)
         let submitDoctors = newDoctors.filter(doc => doc._id !== i);
         axios.put(`/accounts/clinics/update/${id}`, {doctors: submitDoctors})
         .then((res) => {
            setloading(false);
            if(res.data.success){
                console.log(res.data.newData)
                setnewDoctors(res.data.newData?.doctors);
            }
         })
         .catch(err => {
            setloading(false);
            console.log(err)
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

    const handleOpenEdit = (doc) => {
      setspeciality(doc.speciality);
      setexperience(doc.experience);
      setname(doc.name);
      setopen(true)
      setisEdit(true);
      seteditID(doc._id)
    }

    const handleEditSubmit = () => {
         if(speciality && name && experience){
             let filteredDoctors = newDoctors.filter(doc => doc._id !== editID )
            let submitDoctors = [{speciality, name, experience}, ...filteredDoctors];
            axios.put(`/accounts/clinics/update/${id}`, {doctors: submitDoctors})
             .then((res) => {
                setloading(false);
                if(res.data.success){
                    console.log(res.data.newData?.doctors)
                    setname('');
                    setexperience('');
                    setspeciality('');
                    setnewDoctors(res.data.newData?.doctors);
                    setopen(false)
                }
             })
             .catch(err => {
                 console.log(err)
                setloading(false);
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
    }

    const handleSubmit = () => {
        if(speciality && name && experience){
           let submitDoctors = [{speciality, name, experience}, ...newDoctors]
           axios.put(`/accounts/clinics/update/${id}`, {doctors: submitDoctors})
             .then((res) => {
                setloading(false);
                if(res.data.success){
                    console.log(res.data.newData?.doctors)
                    setname('');
                    setexperience('');
                    setspeciality('');
                    setnewDoctors(res.data.newData?.doctors);
                    setopen(false)
                }
             })
             .catch(err => {
                setloading(false);
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
    }

    return (
        <>
            <div className="clinic__section">
                <div className="section__heading">
                    <h5 className="title"><FormattedMessage id="doc"/></h5>
                     {isLoggedin &&
                        <button 
                        data-bs-toggle="tooltip" 
                        data-bs-placement="top" 
                        title="Edit" 
                        onClick={() => setopen(true)}
                        className="btn edit-icon"> 
                        <i className="fa fa-plus" aria-hidden="true"></i>
                        </button>
                        }
                </div>
                <div className="section__content">
                    <div className="row doctor__container">
                        {!newDoctors || newDoctors.length === 0 ? "no data" : ""}
                        {newDoctors && newDoctors.map((doc) => 
                         <Col key={doc?._id}  xs={12} sm={6} md={4}>
                            <Card className="doctor" >
                              <Card.Body>
                                <Card.Title className="title">
                                    <span >{doc?.speciality} </span> <hr/>
                                    <span className="text-muted">
                                        <FormattedMessage id="docSpeciality"/></span>
                                </Card.Title>
                                <Card.Title className="title">
                                    <span> {doc?.name}</span> <hr/>
                                    <span  className="text-muted">
                                        <FormattedMessage id="docName"/>
                                    </span>
                                </Card.Title>
                                <Card.Title className="title">
                                    <span> {doc?.experience} <FormattedMessage id="year"/></span>  <hr/>
                                    <span className="text-muted"><FormattedMessage id="yearExp"/></span>
                                </Card.Title>
                                <div className="control__buttons">
                                    {isLoggedin &&<> <button onClick={() => handleOpenEdit(doc)} className="btn"> <i className="fas fa-edit"></i> </button>
                                    <button onClick={() => handleDelete(doc._id)} className="btn"> <i className="fa fa-trash" aria-hidden="true"></i> </button> </>}
                                </div>
                              </Card.Body>
                            </Card>
                        </Col>
                        )}
                    </div>
                </div>
            </div>

            <DoctorModal
             name ={ name}
             setname={setname}
             experience={experience}
             setexperience={setexperience}
             speciality={speciality}
             setspeciality={setspeciality}
             show={open}
             isEdit={isEdit}
             loading= {loading}
             handleEditSubmit={handleEditSubmit}
             handleDoctorSubmit={handleSubmit}
             handleClose={() => setopen(false)}/>
        </>
    )
}

export default Doctors
