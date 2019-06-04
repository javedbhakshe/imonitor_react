import React, { useState, useEffect } from 'react';
import {Modal, ModalHeader, ModalBody,ModalFooter} from 'reactstrap';

const CustomModal = props => {
   
    const [show, setShow] = useState(false);  

    useEffect(() => {
        let showVal = props.show ? props.show : false;
        setShow(showVal);
    }, [props.show]);    

    const onModalClose = () => {
        setShow(false);
    }

    const handleSubmit = () => {
        props.formSubmit();
    }

    return(
        <Modal isOpen={show} onClosed = {onModalClose} className="modal-lg">
                <ModalHeader >{props.title}</ModalHeader>
                <ModalBody>                      
                <form onSubmit={handleSubmit}>
                   {props.content}                  
                </form>                    
                </ModalBody>
                <ModalFooter  className="text-center card-footer">
                    <button type="submit" className="mr-3 btn btn-primary btn-sm"><i className="fa fa-plus"></i> Add </button>
                    <button type="button" className="btn btn-danger btn-sm" onClick={onModalClose} ><i className="fa fa-close "></i> Close</button>
                </ModalFooter>
        </Modal>
    );
}

export default CustomModal;