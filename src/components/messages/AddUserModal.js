import React, {useState} from 'react';
import {Button, Form, Modal} from 'react-bootstrap';
import axios from '../../api';
import { useSelector} from 'react-redux';
import {selectUser} from '../../features/user/userSlice';
import {useHistory} from 'react-router-dom';
import {  toast } from 'react-toastify';

function AddUserModal() {
    const [show, setShow] = useState(false);
    const [userId, setuserId] = useState("");
    const history = useHistory();
    const user = useSelector(selectUser);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleConnect = () => {
        console.log("submitted")
        if(userId){
            axios.post('/messages/connect', {user1: user?.id, user2: userId})
            .then(res => {
                console.log("res", res)
                if(res.data.success){
                    setShow(false);
                    history.push(`/messages/${res.data.doc}`);
                }
                else{
                    toast.error(res.data.message, {
                        position: "top-right",
                        autoClose: false,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                     })  
                }
            }).catch(err => {
                console.log("err" ,err);
                toast.error("User does not exist", {
                    position: "top-right",
                    autoClose: false,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                 })  
            })
        }
        else{
            toast.error("Please enter userID", {
                position: "top-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
             })  
        }
     }
    return (
        <div>
             <button className="btn"  onClick={handleShow}>
             <i className="fa fa-plus-circle " aria-hidden="true"></i>
            </button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Connect with Users to chat</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                        <Form.Label>Enter UserID</Form.Label>
                        <Form.Control value={userId} onChange={e => setuserId(e.target.value)} type="text" placeholder="User ID" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="info" onClick={handleConnect}>
                   Connect
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AddUserModal
