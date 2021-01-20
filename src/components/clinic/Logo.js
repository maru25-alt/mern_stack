import React from 'react'
import {Form,  Button, Modal, Spinner} from 'react-bootstrap'
import {getImgSrc} from '../../utils';
import { FormattedMessage} from 'react-intl';

function Logo({
   show,
   handleClose,
   img, 
   fileName,
   handleChangeFile,
   handleSubmitFile, 
   loading}) {

    console.log(fileName)
    return (
        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <FormattedMessage id="clinicLogo"/>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <Form.Group>
              <Form.File 
              onChange={handleChangeFile} 
              id="file" 
              name="file"
              accept="image/x-png,image/gif,image/jpeg"
               />
           </Form.Group>
            {img && <img className="avatar" src={ fileName  ? img : getImgSrc() + '/'  + img } alt="file"></img>}
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
             <FormattedMessage id="upload"/>
          </Button>
          <Button variant="danger" onClick={handleClose}><FormattedMessage id="close"/></Button>
        </Modal.Footer>
      </Modal>
    )
}

export default Logo
