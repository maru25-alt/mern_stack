import React from 'react'
import {Form,  Button, Modal, Spinner} from 'react-bootstrap'

function Logo({show, handleClose,file, handleChangeFile,handleSubmitFile, loading}) {
     
    return (
        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile Picture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <Form.Group>
              {/* <Form.File 
              onChange={handleChangeFile} 
              id="file" 
              name="file" /> */}
              <input  
              type="file" 
              name="file"
              id="file" 
              className="inputfile"
              onChange={handleChangeFile}
              accept="image/*" />
           </Form.Group>
            {file && <img className="avatar" src={file} alt="file"></img>}
        </Modal.Body>
        <Modal.Footer>
          <Button disabled={loading} onClick={handleSubmitFile} className="primary-btn" >
            {loading &&  <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />}
             Upload
          </Button>
          <Button variant="danger" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
}

export default Logo
