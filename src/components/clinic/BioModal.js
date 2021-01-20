import React from 'react'
import {Form, Col, Row, Button, Modal, Spinner} from 'react-bootstrap'

function BioModal({show, handleClose , handleSubmit , bio, handleChange, loading}) {

    return ( 
        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <Form.Group as={Row} controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>
                        About Us
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control 
                        as="textarea"
                        rows={3}
                        value={bio} 
                        onChange={handleChange} 
                        type="name" 
                        placeholder="Type here..."
                        name="name" />
                    </Col>
           </Form.Group>
        </Modal.Body>
        <Modal.Footer>
        <Button disabled={loading} onClick={handleSubmit} className="modal-btn">
          {loading && <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />}
          Save Changes
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default BioModal
