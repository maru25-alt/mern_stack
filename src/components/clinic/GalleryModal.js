import React from 'react'
import {Form,  Button, Modal, Spinner, Row, Col} from 'react-bootstrap'
import { FormattedMessage} from 'react-intl';


function Image({
   show,
   handleClose,
   img, 
   caption,
   setcaption,
   handleChangeFile,
   handleSubmitFile, 
   loading}) {

    return (
        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        size="lg"
        keyboard={false}
       >
        <Modal.Header closeButton>
           <Modal.Title>
               <FormattedMessage id="addGallery"/>
           </Modal.Title>
        </Modal.Header>
      
        <Modal.Body>
           <Form.Group as={Row}>
              <Form.Label column sm={3}>
                   <FormattedMessage id="upload"/> 
              </Form.Label>
              <Col sm={9}>
                 <input  
                    type="file" 
                    name="file"
                    id="file" 
                    className="inputfile"
                    onChange={handleChangeFile}
                    accept="image/*" />
                  <br/>
                  {img && <img className="mt-3" width="200" src={img} alt="file"></img>}
              </Col>  
           </Form.Group>
            <Form.Group as={Row}>
                 <Form.Label column sm={3}>
                     <FormattedMessage id="caption"/>
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control 
                      type="text" 
                      as="textarea"
                      row="5"
                      placeholder="Type here..." 
                      name="caption"
                      value= {caption}
                      onChange={e => setcaption(e.target.value)}/>
                  </Col>
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button  disabled={loading} onClick={handleSubmitFile} className="primary-btn" >
            {loading &&  <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />}
            
             <FormattedMessage id="upload"/>
          </Button>
          <Button variant="danger" onClick={handleClose}>
            <FormattedMessage id="close"/>
          </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default Image
