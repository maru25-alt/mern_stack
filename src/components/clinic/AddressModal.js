import React from 'react'
import {Form,  Button, Modal, Col, Row} from 'react-bootstrap'
import { CountryDropdown, RegionDropdown} from 'react-country-region-selector';
import { FormattedMessage} from 'react-intl';


function DoctorModel({show, 
  handleClose, 
  address, 
  country, 
  loading,
  region, 
  state, 
  zip,
  setstate,
  setaddress, 
  setcountry,
  handleSubmitcontact,
setregion, setzip}) {
    

    return (
        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title><FormattedMessage id="editAddr"/></Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group as={Row} controlId="formHorizontalEmail">
                            <Form.Label column sm={3}>
                               <FormattedMessage id="Address"/>
                            </Form.Label>
                            <Col sm={9}>
                            <Form.Control 
                                as="textarea"
                                rows={3}
                                value={address} 
                                onChange={e => setaddress(e.target.value)} 
                                type="name" 
                                placeholder="Type here..."
                                name="name" />
                            </Col>
                       </Form.Group>
                       <Form.Group as={Row}>
                           <Form.Label column sm={3}>
                              <FormattedMessage id="Country"/>/ <FormattedMessage id="Region"/>
                           </Form.Label>
                           <Col sm={9}  as={Row}>
                              <Col sm={6} >
                                <CountryDropdown
                                className="form-control"
                                value={country}
                                onChange={(val) => setcountry(val)} />
                                </Col>
                                <Col>
                                  <RegionDropdown
                                  country={country}
                                  value={region}
                                  className="form-control"
                                  onChange={(val) => setregion(val)} />
                                </Col>
                           </Col>  
                       </Form.Group>
                      <Form.Group as={Row} controlId="formHorizontalEmail">
                            <Form.Label column sm={3}>
                                <FormattedMessage id="City"/>
                            </Form.Label>
                            <Col sm={9}>
                            <Form.Control 
                                value={state} 
                                onChange={e => setstate(e.target.value)} 
                                type="text" 
                                placeholder="State"
                                name="state" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formHorizontalEmail">
                            <Form.Label column sm={3}>
                               <FormattedMessage id="Zip"/>
                            </Form.Label>
                            <Col sm={9}>
                            <Form.Control 
                                value={zip} 
                                onChange={e => setzip(e.target.value)} 
                                type="tel" 
                                placeholder="Zip Code"
                                name="zip" />
                            </Col>
                        </Form.Group>
        </Modal.Body>
        <Modal.Footer>
            <Button 
                disabled={loading} 
                onClick={handleSubmitcontact} 
                className="modal-btn">
                <FormattedMessage id="save"/>
            </Button>
            <Button variant="danger" onClick={handleClose}>
              <FormattedMessage id="close"/>
            </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default DoctorModel
