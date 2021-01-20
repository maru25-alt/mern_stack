import React from 'react';
import {getIntial, getImgSrc} from '../../utils';
import { FormattedMessage} from 'react-intl';
import {useHistory} from 'react-router-dom';
import {SentMessagesConnection} from '../../api'

function Client({photoUrl, name, _id, email}) {
    const history = useHistory();

    const handleSendMessage = () => {
         SentMessagesConnection(_id, history)
    }
    return (
        <div className="client">
             <div>
                 {photoUrl ? <img src={ getImgSrc() + '/'+ photoUrl} alt={name}></img> :
                 <div className="initial"> {getIntial(name)} </div>}
             </div>
             <h6>{name}</h6>
             <div>{email}</div>
             <div className="client_links">
                 <a className="client__link visit" href={`/user/${name}/${_id}`}><FormattedMessage id="view"/></a>
                 <button onClick={handleSendMessage} className="client__link message btn"><FormattedMessage id="msg"/></button>
             </div>
        </div>
    )
}

export default Client
