import React from 'react'
import {Form, Button} from 'react-bootstrap'
import { useForm } from "react-hook-form";
import { FormattedMessage} from 'react-intl';


function LeaveCommentForm({comment, setcomment, setrecomment,  handleSubmitComment}) {
    const { register, handleSubmit, errors } = useForm();

    return (
        <form className="comment__form" onSubmit={handleSubmit( handleSubmitComment)}> 
             <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Control 
                value={comment} 
                onChange={e => setcomment(e.target.value)} 
                ref={register({ required: true })} 
                as="textarea" 
                rows={5} 
                name="comment" 
                placeholder="Type here..." />
                {errors.comment && <span className="text-danger mb-5">
                    <FormattedMessage id="fieldReq"/>
                    </span>}
             </Form.Group>
             <Form.Group>
             <Form.Label><FormattedMessage id="doRec"/> ?</Form.Label>
             <div>
                <Form.Check onClick={() => setrecomment(true)} inline name="recomment" label="Yes" type="radio" id="recomment" />
                <Form.Check onClick={() => setrecomment(false)}  inline name="recomment" label="No" type="radio" id="not_recomment" />
             </div>
            </Form.Group>
            <Form.Group>
                 <Button type="submit">
                    <FormattedMessage id="subCom"/>
                </Button>
            </Form.Group>
        </form>
    )
}

export default LeaveCommentForm
