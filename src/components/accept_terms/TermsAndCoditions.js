import React from "react";
import { connect } from "react-redux";
import TermsAndCoditionsModal from './../terms_and_conditions_modal/terms_and_conditions_modal'
import { Modal, Button } from "react-bootstrap";


// STYLES
import './TermsAndCoditions.scss';

// REQUIRE IMAGES
function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title 
        // todo: change second font in language !== Arabic
         className={(props.language === 'ar' ? 'ar-font ' : 'ar-font')}
         id="contained-modal-title-vcenter">
        الشروط والأحكام
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TermsAndCoditionsModal></TermsAndCoditionsModal>
      </Modal.Body>
      <Modal.Footer>
        
        <Button 
        // todo: change second font in language !== Arabic
        className={'button' + (props.language === 'ar' ? 'ar-font ' : 'ar-font')}
        onClick={props.onHide}> اوافق</Button>
      </Modal.Footer>
    </Modal>
  );
}


const TermsAndCoditions = (props) => { 
  const [modalShow, setModalShow] = React.useState(false);
  if (props.localization) {
    return (
        <React.Fragment>
            <div className="acceptTerms checkbox">
            <label className="checkboxLabel">
                <input
                  type="checkbox"
                  name="workingHourSaturday"
                  checked={true}
                  checked={props.acceptTerms}
                  onChange={(e) => props.handleAcceptTerms(e)}
                />
                <span
                  className={
                    "checkmark " + (props.language === "ar" ? "right-0" : "left-0")
                  }
                ></span>
              </label>
              <span className="acceptTerms-text">
              {props.localization.REGISTER_PAGE.ACCEPT_TERMS_AND_CONDITIONS[`${props.language}`]}
                <a className="acceptTerms__link" onClick={() =>   setModalShow(true)}>
          
                {props.localization.REGISTER_PAGE.TERMS_AND_CONDEITIONS[`${props.language}`]}
              </a></span>
            </div>
        <MyVerticallyCenteredModal
          show={modalShow}
          language={props.language}
          onHide={() => setModalShow(false)}
        >
        </MyVerticallyCenteredModal>
        </React.Fragment>
  ) }else return null;

}





const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps,{ })(TermsAndCoditions);
export {TermsAndCoditions};
