import React, { Component } from "react";
import { connect } from "react-redux";
import RegisterForm from "./../../../register_form/register_form";
import MobileVerfication from "./../../../mobieVerification/mobileVerfication";
import { validateUserLocation } from "./../../../../services/redux/actions/index";
// STYLES
import "./form_container.scss";
import { Card } from "react-bootstrap";
import DontHaveAccount from "./../../DontHaveAccount/DontHaveAccount";

class FormContainer extends Component {
  componentDidMount = () => {};

  shouldComponentUpdate = (nextProps) => {

    return (
      nextProps != this.props ||
      nextProps.goToVervicationScreen !== this.props.goToVervicationScreen
    );
  };

  render() {
    const { localization, language, direction, goToVervicationScreen } =
      this.props;
    if (localization) {
      return (
        <>
          <Card
            className={language == "ar" ? "text-right" : "text-left"}
            style={{ direction: `${direction}` }}
          >
            <Card.Header>
              <div className="form__title">
                {goToVervicationScreen ? (
                  <>
                    <h1 className="h1-registar">
                      {
                        localization.REGISTER_PAGE.COMPELETE_REGISTRATION[
                          `${language}`
                        ]
                      }
                    </h1>
                  </>
                ) : (
                  <>
                    <h1 className="h1-registar">
                      {" "}
                      {
                        localization.REGISTER_PAGE.REGISTER_WITH_US[
                          `${language}`
                        ]
                      }
                    </h1>
                  </>
                )}
              </div>
            </Card.Header>
            <Card.Body>
              <div className="form__title">
                {goToVervicationScreen ? (
                  <>
                    <MobileVerfication></MobileVerfication>
                  </>
                ) : (
                  <>
                    <RegisterForm></RegisterForm>
                  </>
                )}
              </div>
            </Card.Body>
          </Card>
        </>
      );
    } else return null;
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, { validateUserLocation })(
  FormContainer
);
export { FormContainer };
