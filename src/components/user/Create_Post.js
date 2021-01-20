import React from 'react'
import {Form,  Button, Modal, Spinner, Row , Col} from 'react-bootstrap';

function NewPost({
  show, 
  handleClose, 
  handleCreateNewPost,  
  loading , 
  handleChangePostImage, 
  postFile,  
  setpostCaption,
  postCaption}) { 

    return (
        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        size="lg"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <Form.Group>
           <input  
              type="file" 
              name="file"
              id="file" 
              className="inputfile"
              onChange={handleChangePostImage}
              accept="image/*" />
           </Form.Group>
            {postFile && <img  width="400px" src={postFile} alt="file"></img>}
            <Form.Group as={Row} controlId="formHorizontalEmail">
                    <Form.Label column sm={3}>
                        Caption
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control 
                        as="textarea"
                        rows={5}
                        value={postCaption} 
                        onChange={e => setpostCaption(e.target.value)} 
                        type="name" 
                        placeholder="Type here..."
                        name="name" />
                    </Col>
           </Form.Group>

        </Modal.Body>
        <Modal.Footer>
          <Button disabled={loading} onClick={() => handleCreateNewPost()} className="primary-btn" >
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

export default NewPost
