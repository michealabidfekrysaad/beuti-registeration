import React from 'react';
import { Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import './ValidAdvertiserToken.scss';

const InvalidAdveriserCodeModal = () => {
    const {
        localization,
        language,
      } = useSelector((data) => data);
    return (
    <Modal show={true} className="ar verifyAdveriser" >
        <Modal.Header >
          <Modal.Title>{localization.VERIFY_ADVERISER_TOKEN_MODAL.HEAD[`${language}`]}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{localization.VERIFY_ADVERISER_TOKEN_MODAL.BODY[`${language}`]}</Modal.Body>
        <Modal.Footer><a href={window.location.origin} >{localization.VERIFY_ADVERISER_TOKEN_MODAL.LINK[`${language}`]}</a></Modal.Footer>
    </Modal>
 );
}
 
export default InvalidAdveriserCodeModal;