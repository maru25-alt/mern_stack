import React from 'react';
import defaultLogo from '../../img/logo.png'
import {trimString, getIntial, getImgSrc} from '../../utils';
import { FormattedMessage} from 'react-intl';
import {SentMessagesConnection} from '../../api';
import {useHistory} from 'react-router-dom'

function Clinic({_id, name, bio, hours, prices, telephone, logo}) {
    const history = useHistory()

    const  handleSentMessage = () => {
         SentMessagesConnection(_id , history)
    }
    return (
        <div className="clinic">
            <div className="text-center">
                {logo ?   <img src={ getImgSrc() + '/'+ logo || defaultLogo} alt=""/>
                 : 
                   <div className="initial">{getIntial(name)} </div> 
                } 
            </div>
            <h6><strong>{name}</strong></h6>
            <div className="text-left details__descriptions container">
                 <div className="row">
                   <strong className="col-5"> <FormattedMessage id="price"/>: </strong>  
                    <div className="col-7">{prices ? <> $ {prices?.min} - ${prices?.max}</> : "-"}</div> 
                </div>
                 <div className="row">
                    <strong  className="col-5" > <FormattedMessage id="hours"/>: </strong>
                     <div className="col-7">{hours?.start || "-"} - {hours?.end || "-"}</div>
                 </div>
                 <div className="row"> 
                    <strong className="col-5"> <FormattedMessage   id="tel"/>:</strong>
                    <div className="col-7 tel"> {telephone || "null"}</div>
                </div>
                 <p className="mt-3">{trimString(bio, 50)}</p>
            </div>
            <div className="clinic_links">
                <a className="clinic__link visit" href={`/clinic/${name}/${_id}`}>
                   <FormattedMessage id="visit"/> 
                </a>
                <button className="clinic__link message btn" onClick={handleSentMessage}>
                     <FormattedMessage id="msg"/>
                </button>
            </div>
        </div>
    )
}

export default Clinic
