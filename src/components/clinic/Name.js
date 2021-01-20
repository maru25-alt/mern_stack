import React, {useState} from 'react'
import {Form, Col, Row, Button, Modal} from 'react-bootstrap'

function Name({show, handleClose, handleChange, name, handleSubmitName}) {

    return (
               <Modal
                  show={show}
                  onHide={handleClose}
                  backdrop="static"
                  keyboard={false}>
                      <Modal.Header closeButton>
                          <Modal.Title>Edit Clinic Name</Modal.Title>
                       </Modal.Header>
                        <Modal.Body>
                                <Form.Group as={Row} 
                                    controlid="formHorizontalEmail">
                                <Form.Label column sm={3}>
                                    Clinic Name
                                </Form.Label>
                                <Col sm={9}>
                                <Form.Control
                                    as="textarea" rows={3} 
                                    value={name} 
                                    onChange={handleChange} 
                                    type="name" 
                                    placeholder="Name"
                                    name="name" />
                                </Col>
                                </Form.Group>
                             </Modal.Body>
                            <Modal.Footer>
                                    <Button 
                                     onClick={handleSubmitName} type="submit">Save Changes</Button>
                                    <Button onClick={handleClose} variant="danger" >Cancel</Button>     
                            </Modal.Footer>
                </Modal>
    )
}

export default Name
