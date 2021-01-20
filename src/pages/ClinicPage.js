import React, { useEffect, useState } from 'react';
import Header from '../components/clinic/ClinicHeader';
import AboutUs from '../components/clinic/AboutUs';
import ContactInfo from '../components/clinic/ContactInfo';
import Pricing from '../components/clinic/Pricing'
import Testimonies from '../components/clinic/Testimonies';
import Gallery from '../components/clinic/Gallery';
import Services from '../components/clinic/Services';
import Doctors from '../components/clinic/Doctors';
import axios from '../api';
import {Spinner} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux';
import {selectUser, logout} from '../features/user/userSlice';
import '../css/clinicPage.css';

function ClinicPage({match, history}) {
    const id = match.params.id;
    const [clinicData, setclinicData] = useState({});
    const [myGallery, setgallery] = useState([]);
    const [myServices, setservices] = useState([]);
    const [myDoctors, setdoctors] = useState([]);
    const [myComments, setcomments] = useState([]);
    const [loadingPage, setloadingPage] = useState(true);
    const user = useSelector(selectUser);
    const [isLoggedin, setisLoggedin] = useState(false);
    const dispatch = useDispatch()

    //const isLoggedin = id === user?.id ? true : false
  useEffect(() => {
        setisLoggedin( id === user?.id ? true : false)
  }, [user, id])

  const handlelogout = () => {
    localStorage.clear();
    dispatch(logout());
    history.push('/signin')
  }

    useEffect(() => {
        setloadingPage(true)
        axios.get(`/accounts/clinics/${id}`).then((res) => {
            let {data} = res;
            console.log(data)
            if(data.success){
             const {comments, doctors, services, gallery, ...children} = data.clinic;
               setclinicData(children)
              console.log(services)
                setcomments(comments);
                setdoctors(doctors);
                setservices([...services]);
                setgallery(gallery)
               console.log(data.clinic)
            }
            else{
               setclinicData(false)
            }
            setloadingPage(false)
        }).catch(err => {
            console.log(err)
            setclinicData(false);
            setloadingPage(false)
        })
    }, [id])

    return (
        <div className="clinic__page">
            { loadingPage ? 
            <div className="d-flex justify-content-center py-5"> 
               <Spinner animation="grow" size="sm" />
               <Spinner animation="grow" size="sm" />
               <Spinner animation="grow" size="sm" />
               <Spinner animation="grow" size="sm" />
            </div> :
            <>{!clinicData ?    
            <div className="profile__notfound">
                   <h6 >Sorry!! This Clinc does not exists</h6>
             </div>  : 
              <> 
                <Header 
                    logo={clinicData?.logo} 
                    name={clinicData?.name} 
                    handlelogout ={handlelogout }
                    id={id} isLoggedin={isLoggedin}/>
                <AboutUs 
                   bio={clinicData?.bio}
                   isLoggedin={isLoggedin}
                   id={id}/>
                <ContactInfo 
                   telephone={clinicData?.telephone} 
                   email={clinicData?.email} 
                   website={clinicData?.website}
                   address={clinicData?.address}
                   id={id}
                   isLoggedin={isLoggedin}/>
                <Pricing  
                    prices={clinicData?.prices} 
                    hours={clinicData?.hours}
                    id={id}
                    isLoggedin={isLoggedin}/>
                <Services 
                services={myServices} id={id}
                isLoggedin={isLoggedin}/>
                <Doctors 
                doctors={myDoctors} id={id}
                isLoggedin={isLoggedin}/>
                <Gallery gallery={myGallery} id={id} isLoggedin={isLoggedin}/> 
                <Testimonies comments={myComments} id={id}/>  
              </>
            }
            </>
            }
        </div>
    )
}

export default ClinicPage
