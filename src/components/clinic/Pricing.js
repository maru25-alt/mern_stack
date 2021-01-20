import React, {useState} from 'react'
import PriceModal from './PricingModal'
import WorkingModal from './WorkingHoursModal'
import axios from '../../api'
import { FormattedMessage} from 'react-intl';

function Pricing({prices, hours, id, isLoggedin}) {
    const [open, setopen] = useState(false)
    const [show, setshow] = useState(false);
    const [changedPrice, setchanged] = useState(false)
    const [changeHours, setchangeHours] = useState(false)
    const [loading, setloading] = useState(false)
    const [priceRange, setpriceRange] = useState({
        min: "",
        max: ""
     })
    const [openHours, setopenHours] = useState({
        start: "",
        end: "",
    })

    const handlePriceSubmit = () => {
        if(priceRange.max || priceRange.min){
            setloading(true);
            axios.put(`/accounts/clinics/update/${id}`, {prices: priceRange})
            .then(res => {
                console.log(res);
                if(res.data.success){
                    setopen(false);
                    setchanged(true)
                }
                else{
                    console.log(res.data)
                }
                setloading(false); 
            }).catch(err => {
                console.log(err)
                setloading(false);
            })
        }

    }
    const handleHoursSubmit = () => {
        if(openHours.start || openHours.end){
            setloading(true);
            axios.put(`/accounts/clinics/update/${id}`, {hours: openHours}).then(res => {
                console.log(res);
                if(res.data.success){
                    setshow(false);
                    setchangeHours(true)
                }
                setloading(false);
            }).catch(err => {
                console.log(err)
                setloading(false);
            })
        }
        
    }

    return (
        <>
              <div className="clinic__section">
                <div className="row mb-5 ml-3">
                     <div  className="section__heading col-xs-12 col-sm-4  col-md-2 ">
                         <h6  className="title "> <FormattedMessage id="Pricing"/></h6>
                          {isLoggedin &&
                            <button  
                            onClick={() => setopen(true)} 
                            data-bs-toggle="tooltip" 
                            data-bs-placement="top" 
                            title="Edit" 
                            className="btn edit-icon"> 
                                <i className="fas fa-edit  "></i> 
                            </button>
                          }
                     </div>
                      {changedPrice ? 
                        <div className="col ">  
                            <strong><FormattedMessage id="min"/></strong> ${priceRange.min} 
                            <strong> &nbsp;&nbsp;- &nbsp;&nbsp;</strong>   
                            <strong><FormattedMessage id="max"/></strong> ${priceRange.max}
                        </div> 
                       :
                        <>
                          {!prices ?  <div className="col">null</div> : 
                            <div className="col">  
                                <strong><FormattedMessage id="min"/></strong> ${prices.min} 
                                <strong>&nbsp;&nbsp; - &nbsp;&nbsp;</strong>   
                                <strong><FormattedMessage id="max"/></strong> ${prices.max}
                            </div> 
                       } 
                        </>
                         }
                        
                </div>
                <div className="row mb-2 ml-3">
                       <div  className="section__heading col-xs-12 col-sm-4  col-md-2">
                         <h6 className="title"><FormattedMessage id="hours"/></h6>
                         {isLoggedin &&
                            <button  
                            onClick={() => setshow(true)} 
                            data-bs-toggle="tooltip" 
                            data-bs-placement="top" 
                            title="Edit" 
                            className="btn edit-icon"> 
                            <i className="fas fa-edit">
                            </i></button>
                        }
                        
                     </div>
                     {changeHours ? 
                         <div className="col ml-3"> 
                            <strong><FormattedMessage id="open"/></strong> {openHours?.start }  <strong>&nbsp;&nbsp;- &nbsp;&nbsp; </strong>  
                             <strong><FormattedMessage id="close"/></strong> {openHours?.end} 
                         </div>
                       : <>
                         { !hours ? <div className="col ">null</div> :  
                        <div className="col "> 
                          <strong><FormattedMessage id="open"/></strong> {hours.start }  <strong> &nbsp;&nbsp;- &nbsp;&nbsp;&nbsp;</strong>  
                          <strong><FormattedMessage id="close"/></strong> {hours.end} 
                        </div>}
                       </>}
                     
                 </div>
            </div>
            <PriceModal  
            priceRange={priceRange} 
            setpriceRange={setpriceRange} 
            handlePriceSubmit={handlePriceSubmit}
            show={open} 
            loading={loading}
            handleClose={() => setopen(false)}/>

            <WorkingModal 
            openHours={openHours} 
            loading={loading}
            setopenHours={setopenHours} 
            handleHoursSubmit={handleHoursSubmit}
            show={show} 
            handleClose={() => setshow(false)}/>
        </>
    )
}

export default Pricing
