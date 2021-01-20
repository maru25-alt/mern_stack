import React, {useEffect, useState} from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import  ContactInfoModal from './ContactInfoModal';
import AddressModal from './AddressModal';
import axios from '../../api';
import { FormattedMessage} from 'react-intl';

function ContactInfo({telephone, email, website, address, id, isLoggedin}) {
        const [showContacts, setshowContacts] = useState(false);
        const [showAddress, setshowAddress] = useState(false);
        const [edittelephone, settelephone] = useState("");
        const [editwebsite, setwebsite] = useState("");
        const [editemail, setemail] = useState('');
        const [showchange, setshowchange] = useState(false)
        const [loading, setloading] = useState(false);
        const [editaddress, setaddress] = useState("")
        const [country, setcountry] = useState("");
        const [region, setregion] = useState("");
        const [state, setstate] = useState("")
        const [zip, setzip] = useState("");


        useEffect(() => {
            settelephone(telephone);
            setwebsite(website)
            setemail(email)
            setaddress(address?.address)
            setcountry(address?.country)
            setregion(address?.region);
            setzip(address?.zip)
            setstate(address?.state)
        }, [email, website, telephone, address])

        const handleSubmitInfo = (e) => {
             e.preventDefault();
             if(telephone  || website || email){
                axios.put(`/accounts/clinics/update/${id}`, {email: editemail, telephone: edittelephone, website: editwebsite}).then(res => {
                        console.log(res);
                        setshowchange(true);
                        setloading(false)
                        setshowContacts(false)
                    }).catch(err => {
                        console.log(err)
                        alert('something went wrong')
                        setloading(false)
                    })
             }
        }

        const handleSubmitcontact = (e) => {
                e.preventDefault();
                if(editaddress || country || state || zip || region){
                   axios.put(`/accounts/clinics/update/${id}`, {address: 
                        {
                                address: editaddress,
                                zip,
                                country,
                                region,
                                state
                        }}).then(res => {
                           console.log(res);
                           setshowchange(true);
                           setloading(false)
                           setshowAddress(false)
                       }).catch(err => {
                           console.log(err)
                           alert('something went wrong')
                           setloading(false)
                       })
                }
           }
         
    return (
        <>
            <div className="clinic__section">
               <Container as={Row}>
                   <Col className="mb-4" sm={12}  mb={8}>
                        <div className="section__heading">
                            <h5 className="title"><FormattedMessage id="contactInfo"/></h5>
                            {isLoggedin &&
                                <button 
                                data-bs-toggle="tooltip" 
                                data-bs-placement="top"
                                title="Edit" 
                                onClick={() => setshowContacts(true)}
                                className="btn edit-icon"> 
                                <i className="fas fa-edit    "></i>
                               </button>
                            }
                        </div>
                        <div>
                           <Container  as={Row} >
                                    <Col xs={4}><FormattedMessage id="email"/>: </Col>
                                    <Col xs={8} > {showchange ? editemail : <>{email || "null"}</>} </Col>
                            </Container>
                            <Container  as={Row} >
                                    <Col xs={4} ><FormattedMessage id="tel"/>: </Col>
                                    <Col xs={8}> {showchange ? edittelephone : <> {telephone || "null"}</>} </Col>
                            </Container>
                            <Container  as={Row} >
                                    <Col xs={4}><FormattedMessage id="website"/>: </Col>
                                    <Col xs={8} ><a href={showchange ? editwebsite : website}>{showchange ? editwebsite : <>{website || "null"}</>} </a> </Col>
                            </Container>
                        </div>
                   </Col>
                   <Col className="mb-4" sm={12} mb={4}>
                        <div className="section__heading">
                           <h5 className="title"><FormattedMessage id="siteAddr"/></h5>
                              {isLoggedin &&
                                <button data-bs-toggle="tooltip"
                                data-bs-placement="top" 
                                title="Edit" 
                                onClick={() => setshowAddress(true)}
                                className="btn edit-icon"> 
                                <i className="fas fa-edit    "></i>
                              </button>
                              }
                        </div>
                  
                        <div>
                            <Container  as={Row} >
                                    <Col xs={4} ><FormattedMessage id="Address"/>: </Col>
                                    <Col xs={8}  > {showchange ? editaddress : <> {address?.address || "null"}</>}</Col>
                            </Container>
                            <Container  as={Row} >
                                    <Col xs={4}><FormattedMessage id="Country"/>: </Col>
                                    <Col xs={8} > {showchange ? country : <>{address?.country || "null"}</>} </Col>
                            </Container>
                            <Container  as={Row} >
                                    <Col xs={4}><FormattedMessage id="Region"/>: </Col>
                                    <Col xs={8} >{showchange ? state : <>{address?.state || "null"}</>} </Col>
                            </Container>
                            <Container  as={Row} >
                                    <Col xs={4}><FormattedMessage id="Region"/>: </Col>
                                    <Col xs={8} >{showchange ? region : <>{address?.region || "null"}</>} </Col>
                            </Container>
                            <Container  as={Row} >
                                    <Col xs={4}><FormattedMessage id="Zip"/>: </Col>
                                    <Col xs={8} >{showchange ? zip : <>{address?.zip || "null"}</>} </Col>
                            </Container>
                        </div>
                   </Col>
                </Container>  
            </div>
            <AddressModal
             loading={loading}
              show={showAddress} 
              handleClose={() => setshowAddress(false)} 
              address={editaddress}
              state={state}
              country={country}
              region={region} zip={zip} 
              setaddress={setaddress} 
              setstate={setstate} 
              setzip={setzip}
              setcountry={setcountry}
              setregion={setregion} handleSubmitcontact={handleSubmitcontact}/>

            <ContactInfoModal 
             loading={loading}
             email={editemail} 
             handlechangeEmail={e=> setemail(e.target.value)}
             telephone={edittelephone}
             handlechangeTelephone={e=> settelephone(e.target.value)} 
             website={editwebsite} 
             handlechangeWebsite={e=> setwebsite(e.target.value)}
             show={showContacts} 
             handleSubmitInfo={handleSubmitInfo}
             handleClose={() => setshowContacts(false)} />
        </>
    )
}

export default ContactInfo
