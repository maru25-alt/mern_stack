import React from 'react'
import {Form,  Button, Modal, Col, Row} from 'react-bootstrap'
import { FormattedMessage} from 'react-intl';

function WorkingModel({show, handleClose, openHours, setopenHours, handleHoursSubmit}) {
  
    return (
        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <FormattedMessage id="sethours"/>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Group as={Row} controlId="formHorizontalEmail">
                <Form.Label column sm={2}>
                    <strong> <FormattedMessage  id="hours"/> </strong>
                </Form.Label>
                <Col as={Row} sm={10}>
                    <Col column sm={6}>
                        <Form.Label >
                        <FormattedMessage id="startTime"/>
                        </Form.Label>
                        <Form.Control 
                        value={openHours.start} 
                        onChange={e => setopenHours({...openHours, start: e.target.value})} 
                        type="time" 
                        placeholder="Start Time"
                        name="name" />
                    </Col>
                  <Col column sm={6}>
                        <Form.Label >
                        <FormattedMessage id="endTime"/>
                        </Form.Label>
                    <Form.Control
                        column 
                        sm={6}
                        value={openHours.end} 
                        onChange={e => setopenHours({...openHours, end: e.target.value})} 
                        type="time" 
                        placeholder="Start Time"
                        name="name" />
                  </Col>
                  
                </Col>
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={handleHoursSubmit} className="modal-btn">
               <FormattedMessage  id="save"/>
            </Button>
            <Button variant="danger" onClick={handleClose}>
               <FormattedMessage  id="close"/>
            </Button>
         
        </Modal.Footer>
      </Modal>
    )
}

export default WorkingModel
