import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import "./MainStepper.scss";
import { useSelector } from "react-redux";
const MainStepper = () => {
  const {
    localization,
    language,
    goToRegisterationScreen,
    goToVervicationScreen,
  } = useSelector((data) => data);

  if (localization) {
    return (
      <Card className="mb-4">
        <Card.Body className="text-center">
          <Row
            className={`justify-content-between mainstepper ${
              language == "ar" ? "reverse" : ""
            }`}
          >
            <Col xs="12" sm="auto">
              <div
                className={` ${
                  !goToRegisterationScreen && !goToVervicationScreen
                    ? "mainstepper-step mainstepper-step-active"
                    : "mainstepper-step"
                }`}
              >
                <div className="mainstepper-step__bullet">1</div>
                <div className="mainstepper-step__text">
                  {localization.MAIN_STEPPER.REGISTER[`${language}`]}
                </div>
              </div>
            </Col>
            <Col xs="12" sm="auto">
              <div
                className={` ${
                  !goToRegisterationScreen && goToVervicationScreen
                    ? "mainstepper-step mainstepper-step-active"
                    : "mainstepper-step"
                }`}
              >
                <div className="mainstepper-step__bullet">2</div>
                <div className="mainstepper-step__text">
                  {" "}
                  {localization.MAIN_STEPPER.ACTIVIATION_CODE[`${language}`]}
                </div>
              </div>
            </Col>
            <Col xs="12" sm="auto">
              <div
                className={` ${
                  goToRegisterationScreen && !goToVervicationScreen
                    ? "mainstepper-step mainstepper-step-active"
                    : "mainstepper-step"
                }`}
              >
                <div className="mainstepper-step__bullet">3</div>
                <div className="mainstepper-step__text">
                  {
                    localization.MAIN_STEPPER.COMPELETE_INFORMATION[
                      `${language}`
                    ]
                  }
                </div>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }
  return <></>;
};

export default MainStepper;
