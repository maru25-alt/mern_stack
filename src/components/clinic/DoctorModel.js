import React  from 'react'
import {Form,  Button, Modal, Col , Row} from 'react-bootstrap'
import { useForm } from "react-hook-form";
import { FormattedMessage} from 'react-intl';

function DoctorModel({
  show,
  handleClose,
  name,
  setname,
  speciality,
  setspeciality,
  experience,
  setexperience,
  handleDoctorSubmit,
  handleEditSubmit,
  isEdit
  }) {
  
    const { register, handleSubmit, errors } = useForm();

    return (
        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title> {isEdit ? "Edit Doctor" : "Add a doctor"}</Modal.Title>
        </Modal.Header>
        <form action="" onSubmit={handleSubmit( isEdit ? handleEditSubmit :handleDoctorSubmit)}>
        <Modal.Body>
            <Form.Group as={Row} controlId="formHorizontalPassword">
                  <Form.Label column sm={3}>
                    <FormattedMessage id="specil"/>
                  </Form.Label>
                  <Col sm={9}>
                  <Form.Control 
                      type="text" 
                      placeholder="Speciality" 
                      name="speciality"
                      ref={
                        register({
                          required: true
                        })
                      }
                      value={speciality}
                      onChange={e => setspeciality(e.target.value)}/>
                      {errors.speciality && <span className="text-danger">  <FormattedMessage id="fieldReq"/></span>}
                  </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formHorizontalPassword">
                  <Form.Label column sm={3}>
                    <FormattedMessage id="name"/>
                  </Form.Label>
                  <Col sm={9}>
                  <Form.Control 
                      type="text" 
                      placeholder="Name" 
                      name="name"
                      ref={
                        register({
                          required: true
                        })
                      }
                      value={name}
                      onChange={e => setname(e.target.value)}/>
                        {errors.name && <span className="text-danger"> <FormattedMessage id="fieldReq"/> </span>}
                  </Col>
              </Form.Group>
              <Form.Group as={Row} controlid="formHorizontalPassword">
                  <Form.Label column sm={3}>
                     <FormattedMessage id="yearExp"/>
                  </Form.Label>
                  <Col sm={9}>
                  <Form.Control 
                      type="number" 
                      placeholder="Expirience" 
                      name="experience"
                      value={experience}
                      ref={
                        register({
                          required: true,
                          min: 1
                        })
                      }
                      onChange={e => setexperience(e.target.value)}/>
                       {errors.experience && <span className="text-danger"> <FormattedMessage id="fieldReq"/></span>}
                  </Col>
              </Form.Group>
          </Modal.Body>
          <Modal.Footer>
              <Button type="submit" className="modal-btn"> {isEdit ? <FormattedMessage id="edit"/> :  <FormattedMessage id="add"/>}</Button>
              <Button variant="danger" onClick={handleClose}>
                  <FormattedMessage id="close"/>
              </Button>
          </Modal.Footer>
        </form>
      </Modal>
    )
}

export default DoctorModel
