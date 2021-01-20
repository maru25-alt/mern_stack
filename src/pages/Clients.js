import React, { useEffect, useState } from 'react';
import '../css/clients.css'
import axios from '../api'
import {Spinner} from 'react-bootstrap';
import Client from '../components/client/Client'

function Clients() {
    const [clients, setclients] = useState([]);
    const [loading, setloading] = useState(false);

   useEffect(() => {
      setloading(true)
      axios.get('/users').then(res => {
         setclients(res.data);
         setloading(false)
      }).catch((err) => {
          console.log(err);
          setloading(false)
      })
   }, [])


    return (
        <div className="clients__page">
            {loading ? <div className="text-center">
                <Spinner animation="grow" size="sm" />
                <Spinner animation="grow" size="sm" />
                <Spinner animation="grow" size="sm" />
            </div> : 
            <div className="clients__container">
                {clients && clients.map(res => 
                <Client  
                key={res._id}
                photoUrl={res.photoUrl} 
                name={res.name} 
                _id={res._id} 
                email={res.email}/>)}
            </div>}

        </div>
    )
}

export default Clients
