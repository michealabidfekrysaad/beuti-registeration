import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { connect } from "react-redux";
import RegistrationForm from "./../components/wizardForm/RegistrationForm";
import StepsMenu from "./../components/stepsMenu/stepsMenu";
import "./../components/shared/layout/form-container/form-container";
const Registeration = (props) => {
  return (
    <React.Fragment>
      <Row
        className={
          props.language === "ar"
            ? "reverse position-relative "
            : " position-relative "
        }
      >
        <div className="hidden-xs registeration-steps">
          <StepsMenu></StepsMenu>
        </div>
        <Col xs={12}>
          <Card className="form">
            <Card.Body>
              <RegistrationForm></RegistrationForm>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps, {})(Registeration);
