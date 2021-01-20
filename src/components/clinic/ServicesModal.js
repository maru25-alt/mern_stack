import React from 'react'
import {Form,  Button, Modal, Col , Row, Spinner} from 'react-bootstrap'
import { FormattedMessage} from 'react-intl';

function DoctorModel({
  show, 
  handleClose, 
  service, 
  setservice, 
  handleSubmitService, 
  services,
  handleSaveChanges,
  deleteService,
  loading}) {

    return (
        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title> <FormattedMessage id="editserv" /></Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group as={Row} controlId="formHorizontalEmail">
              <Col  sm={{ span: 9, offset: 3 }}>
              <Form.Label >
                  <strong> <FormattedMessage id="addser"/></strong>  
              </Form.Label>
              <Form.Control 
                  as="textarea"
                  rows={3}
                  value={service} 
                  onChange={e => setservice(e.target.value)} 
                  type="name" 
                  placeholder="Type here..."
                  name="name" />
                  <Button onClick={handleSubmitService}  className="btn btn-success mt-4">
                    <FormattedMessage id="add"/>
                  </Button>
              </Col>
          </Form.Group>
          <hr/>
          <div>
           
          </div>
          <div>
             {services && services.map(serv =>  
              <div 
                key={serv._id} 
                className="ml-5 mb-2 service__badge"
                variant="success"><p> {serv.service}  </p>
                <button onClick={() => deleteService(serv._id)} className="btn   btn-sm"><strong>X</strong></button>
              </div>)}
          </div>
        </Modal.Body>
        <Modal.Footer>
              <Button disabled={loading} onClick={handleSaveChanges} className=" modal-btn mr-2">
                {loading && <Spinner
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
