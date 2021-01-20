import React, { useEffect, useState } from 'react'
import axios,  {fetchClinics} from '../api';
import {Spinner} from 'react-bootstrap';
import Clinic from '../components/home/Clinic'
import '../css/home.css'


function Home() {
    const [clinics, setclinics] = useState([]);
    const [loading, setloading] = useState(false)

    useEffect(() => {
        setloading(true)
        axios.get('/accounts/clinics').then(res => {
              setclinics(res.data) ;
              setloading(false);  
        }).catch(err => {
            console.log(err);
            setloading(false);  
        })
    }, [])

    return (
        <div className="home__page">
            {loading ? <div className="text-center">
                <Spinner animation="grow" size="sm" />
                <Spinner animation="grow" size="sm" />
                <Spinner animation="grow" size="sm" />
            </div> :
            <div className="clinic__container">
              {clinics && clinics.map(clinic =>  
                <Clinic 
                key={clinic._id} 
                _id ={clinic._id} 
                name={clinic.name} 
                bio={clinic.bio} 
                hours={clinic.hours} 
                prices={clinic.prices} 
                telephone={clinic.telephone} 
                logo={clinic.logo}/>)}
            </div>
            }
            
           
        </div>
    )
}

export default Home
