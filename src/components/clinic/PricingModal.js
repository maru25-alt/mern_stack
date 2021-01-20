import React from 'react'
import {Form,  Button, Modal, Col, Row} from 'react-bootstrap'
import { FormattedMessage} from 'react-intl';
function PricingModel({show, handleClose, priceRange,setpriceRange, handlePriceSubmit}) {
 
    return (
        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title><FormattedMessage id="editPric"/></Modal.Title>
        </Modal.Header>
        <Modal.Body>
              <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column sm={3}>
                      <strong><FormattedMessage id="Pricing"/>  </strong>
                  </Form.Label>
                  <Col as={Row} sm={9}>
                      <Col column sm={6}>
                          <Form.Label >
                            <FormattedMessage id="min"/>
                          </Form.Label>
                          <Form.Control 
                          value={priceRange.min} 
                          onChange={e => setpriceRange({...priceRange, min: e.target.value})} 
                          type="text" 
                          placeholder="Minimum Price "
                          name="min" />
                      </Col>
                    <Col column sm={6}>
                          <Form.Label >
                          <FormattedMessage id="max"/>
                          </Form.Label>
                      <Form.Control
                          column 
                          sm={6}
                          value={priceRange.max} 
                          onChange={e => setpriceRange({...priceRange, max: e.target.value})} 
                          type="text" 
                          placeholder="Maximum price"
                          name="max" />
                    </Col>
                  </Col>
              </Form.Group>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={handlePriceSubmit} className="modal-btn"><FormattedMessage id="save"/></Button>
            <Button variant="danger" onClick={handleClose}>
            <FormattedMessage id="close"/>
            </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default PricingModel
