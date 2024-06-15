import React from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import {
  setCurrentStep,
  validateEmailUniquness,
  submitForm,
  validateEmailUniqunessSuccess,
  validateEmailUniqunessFailure,
} from "./../../services/redux/actions/index";
import HTTPClient from "../../services/networking/queries";

class FormControls extends React.Component {
  constructor(props) {
    super(props);
    this._next = this._next.bind(this);
    this._prev = this._prev.bind(this);
    this.state = {
      days: this.props.workingHoures,
      emps: this.props.employeesList,
      diabledSubmit: false,
    };
  }

  //  UPDATE STATE WHEN PROPS CHANGED
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.language !== this.props.language ||
      nextProps.stepOneEmail !== this.props.stepOneEmail ||
      nextProps.stepOneUserLocation !== this.props.stepOneUserLocation ||
      nextProps.currentStep !== this.props.currentStep ||
      nextProps.centerTypes !== this.props.centerTypes ||
      nextProps.employeesList !== this.props.employeesList ||
      nextProps.city !== this.props.city ||
      nextProps.workingHoures !== this.props.workingHoures ||
      nextProps.servicesList !== this.props.servicesList ||
      nextProps.formSubmitted !== this.props.formSubmitted ||
      nextProps.categoriesList !== this.props.categoriesList ||
      nextProps !== this.props
    );
  }

  _next() {
    let currentStep = this.props.currentStep;
    if (currentStep === 1 && !this.stepOneValidation()) {
      // this.props.validateEmailUniquness(this.props.stepOneEmail.email) // old code
      // this.props.setCurrentStep(currentStep);  // old code
      HTTPClient.fetch(
        `Account/registerationWizard/validateEmailUniquness?email=${this.props.stepOneEmail.email}`,
        true,
        1
      ).then((res) => {
        this.props.validateEmailUniqunessFailure(null);
        this.props.validateEmailUniqunessSuccess(res);
        this.formSubmit();
      });
    } else {
      // If the current step is 1 or 2, then add one on "next" button click // old code
      // currentStep = currentStep >= 2 ?  currentStep + 1 : 1; // old code
      // this.props.setCurrentStep(currentStep); // old code
      this.formSubmit();
    }
  }

  _prev() {
    let currentStep = this.props.currentStep;
    // If the current step is 2 or 3, then subtract one on "previous" button click
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    this.props.setCurrentStep(currentStep);
  }

  stepOneValidation = () => {
    const isEmailValid = this.props.stepOneEmail["isValid"] || false;
    const isLocationValid = this.props.stepOneUserLocation["isValid"] || false;
    const isCityValid = this.props.city !== "";
    return !isEmailValid || !isLocationValid || !isCityValid ? true : false;
  };

  stepFourValidation = () => {
    let workingHoures = [...this.props.workingHoures];
    const found = workingHoures.some((el, i) => el.isActive === true);
    return found;
  };

  stepFourValidateTimeRange = () => {
    let workingHoures = [...this.props.workingHoures];
    const found = workingHoures.some((el, i) => el.error && el.isActive);
    return found;
  };

  // NEXT BUTTON
  get nextButton() {
    let currentStep = this.props.currentStep;
    // If the current step is not 4, then render the "next" button
    if (currentStep <= 4) {
      return (
        <button
          className={
            "btn field__button " +
            (this.props.language === "ar" ? "ar-font text-right" : "text-left")
          }
          type="button"
          disabled={
            (currentStep === 1 && this.stepOneValidation()) ||
            (currentStep === 2 && !this.props.centerTypes.length) ||
            (currentStep === 3 && !this.props.employeesList.length) ||
            (currentStep === 4 &&
              (!this.stepFourValidation() ||
                this.stepFourValidateTimeRange())) ||
            this.state.diabledSubmit === true
          }
          onClick={this._next}
        >
          {this.props.localization.BUTTONS.NEXT[`${this.props.language}`]}
        </button>
      );
    } else return null;
  }

  // PREVIOUS BUTTON
  get previousButton() {
    let currentStep = this.props.currentStep;
    // If the current step is not 1, then render the "previous" button
    if (currentStep !== 1) {
      return (
        <button
          className="btn btn-secondary"
          type="button"
          onClick={this._prev}
          disabled={this.state.diabledSubmit}
        >
          {this.props.localization.BUTTONS.PREVIOUS[`${this.props.language}`]}
        </button>
      );
    }
    return null;
  }

  formSubmit = () => {
    this.setState(
      {
        diabledSubmit: false,
      },
      () => {}
    );
    let days = [...this.props.workingHoures];
    let emps = [...this.props.employeesList];
    let arr = [];
    let arr2 = [];
    days.map((day, i) => {
      let workingHoure = {
        day: day.day,
        from: day.from,
        to: day.to,
        isActive: day.isActive,
      };
      arr.push(workingHoure);
    });

    emps.map((emp, i) => {
      let empObj = {
        // "id": emp.id,
        nameEn: emp.englishName,
        nameAr: emp.arabicName,
        type: emp.type,
      };
      arr2.push(empObj);
    });
    this.setState({
      days: arr,
      emps: arr2,
    });

    const finalData = {
      phoneNumber: this.props.registerdData["mobileNumber"],
      centerName: this.props.registerdData["centerName"],
      email: this.props.stepOneEmail["email"],
      location: {
        lat: this.props.stepOneUserLocation["lat"],
        lng: this.props.stepOneUserLocation["lang"],
      },
      address: this.props.stepOneUserLocation["address"],
      centerTypes: this.props.centerTypes,
      employees: arr2,
      workingHours: arr,
      services: this.props.servicesList,
      cityId: this.props.city.id,
      referralCode: this.props.referralCode || "",
      promoCode: this.props.promoCode || "",
      step: this.props.currentStep,
      registerationToken: this.props.registerationToken,
	  advertiserToken:this.props.advertiserToken,
    };
    if (this.props.id) finalData.id = this.props.id;
    this.props.submitForm(finalData);
  };

  render() {
    if (this.props.localization) {
      return (
        <Container>
          <Row className={this.props.language === "ar" ? "reverse" : ""}>
            <Col xs={12}>
              <div
                className={
                  "text-center " +
                  (this.props.language === "ar" ? "ar-font " : " ")
                }
                dir={`${this.props.language === "ar" ? "ltr" : "rtl"}`}
              >
                {this.props.currentStep === 5 && (
                  <button
                    id="submit-btn"
                    className={
                      "btn field__button " +
                      (this.props.language === "ar"
                        ? "ar-font text-right"
                        : "text-left")
                    }
                    disabled={this.props.servicesList.length === 0}
                    onClick={() => {
                      this.formSubmit();
                    }}
                    // disabled={this.state.diabledSubmit}
                    type="submit"
                  >
                    {this.props.language === "ar" ? "إنهاء" : "Final"}
                  </button>
                )}
                {this.nextButton}
                {/* {this.previousButton} */}
              </div>
            </Col>
          </Row>
        </Container>
      );
    } else return null;
  }
}

const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps, {
  setCurrentStep,
  submitForm,
  validateEmailUniquness,
  validateEmailUniqunessSuccess,
  validateEmailUniqunessFailure,
})(FormControls);
