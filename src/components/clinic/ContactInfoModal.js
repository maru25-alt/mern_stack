import React from 'react'
import {Form,  Button, Modal, Row, Col, Spinner} from 'react-bootstrap'
import { FormattedMessage} from 'react-intl';


function DoctorModel({
    handleSubmitInfo,
    show, 
    handleClose,
    telephone, 
    email, 
    loading,
    website, 
    handlechangeEmail, 
    handlechangeWebsite, 
    handlechangeTelephone}) {
    
    return (
        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title> <FormattedMessage id="editCont"/></Modal.Title>
        </Modal.Header>
        <Modal.Body>
                        <Form.Group as={Row} controlId="formHorizontalEmail">
                          <Form.Label column sm={3}>
                               <FormattedMessage id="email"/>
                            </Form.Label>
                            <Col sm={9}>
                            <Form.Control 
                                value={email} 
                                onChange={handlechangeEmail} 
                                type="email" 
                                placeholder="Email"
                                name="email" />
                            </Col>
                        </Form.Group>

                       <Form.Group as={Row} controlId="formHorizontalEmail">
                            <Form.Label column sm={3}>
                               <FormattedMessage id="tel"/>
                            </Form.Label>
                            <Col sm={9}>
                              <Form.Control 
                                value={telephone} 
                                onChange={handlechangeTelephone} 
                                type="tel" 
                                placeholder="Telephone"
                                name="telephone" />
                            </Col>
                      </Form.Group>

                      <Form.Group as={Row} controlId="formHorizontalPassword">
                            <Form.Label column sm={3}>
                               <FormattedMessage id="website"/> 
                            </Form.Label>
                            <Col sm={9}>
                            <Form.Control 
                                type="text" 
                                placeholder="Website" 
                                name="website"
                                value={website}
                                onChange={handlechangeWebsite}/>
                            </Col>
                      </Form.Group>
        </Modal.Body>
        <Modal.Footer>
             <Button disabled={loading} onClick={handleSubmitInfo} className="modal-btn">
               {loading &&   
               <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />}
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
