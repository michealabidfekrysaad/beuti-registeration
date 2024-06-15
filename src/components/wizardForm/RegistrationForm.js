import React, { Component } from "react";
import { connect } from "react-redux";
import { setCurrentStep } from "./../../services/redux/actions/index";

// WIZARD STEPS
import Step1 from "./step-one/stepOne";
import Step2 from "./step-two/step-two";
import Step3 from "./step-three/step-three";
import Step4 from "./step-four/step-four";
import Step5 from "./step-five/step-five";

// STYLES
import "./../shared/layout/form-container/form-container";
import FormControls from "./formControls";
import StepFour from "./step-four/step-four-new";

class RegistrationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStep: 1,
      email: "",
      username: "",
      password: "",
    };
  }

  _next = () => {
    let currentStep = this.props.currentStep;
    // If the current step is 1 or 2, then add one on "next" button click
    currentStep = currentStep >= 2 ? 3 : currentStep + 1;
    this.setState({
      currentStep: currentStep,
    });
  };

  _prev = () => {
    let currentStep = this.props.currentStep;
    // If the current step is 2 or 3, then subtract one on "previous" button click
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    this.setState({
      currentStep: currentStep,
    });
  };

  // The "next" and "previous" button functions
  get previousButton() {
    let currentStep = this.props.currentStep;
    // If the current step is not 1, then render the "previous" button
    // if (currentStep !== 1) {
    //   return (
    //     <button
    //       className="btn btn-secondary"
    //       type="button" onClick={this._prev}>
    //       Previous
    //   </button>
    //   )
    // }
    // ...else return nothing
    return null;
  }

  get nextButton() {
    const { currentStep } = this.props;
    // If the current step is not 3, then render the "next" button
    if (currentStep < 3) {
      return (
        <button className="" type="button" onClick={this._next}>
          Next
        </button>
      );
    }
    // ...else render nothing
    return null;
  }

  // Use the submitted data to set the state
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  // Trigger an alert on form submission
  handleSubmit = (event) => {
    event.preventDefault();
    // const { email, username, password } = this.state
    // alert(`Your registration detail: \n
    // Email: ${email} \n
    // Username: ${username} \n
    // Password: ${password}`)
  };

  get currentStepHeader() {
    const step = `STEP_${this.props.currentStep}`;
    const {
      language,
      currentStep,
      verifyUserResponse,
      localization: { REGISTER_FORM_WIZARD },
    } = this.props;

    return (
      <React.Fragment>
        <div className={`${language === "ar" ? " text-right" : "text-left"}`}>
          <h1
            className={
              " " + (language === "ar" ? "rtl-dir ar-font" : "ltr-dir")
            }
          >
            {REGISTER_FORM_WIZARD[step].TITLE[language]}
            {currentStep === 1 && verifyUserResponse ? (
              <span className={" " + (language === "ar" ? " mr-2" : "ml-2")}>
                {this.props.verifyUserResponse.tempUser.name}{" "}
              </span>
            ) : null}
          </h1>
          <p>{REGISTER_FORM_WIZARD[step].LABLE[`${language}`]}</p>
        </div>
      </React.Fragment>
    );
  }

  componentDidMount() {
    if (this.props.verifyUserResponse) {
      this.setCurrentStep(1);
    } else {
        // this.setCurrentStep(1);
      this.props.history.push("/");
    }
    // this.setCurrentStep(1);
  }

  //  UPDATE STATE WHEN PROPS CHANGED
  shouldComponentUpdate = (nextProps) =>
    nextProps.currentStep !== this.props.currentStep ||
    nextProps.language !== this.props.language ||
    nextProps.verifyUserResponse !== this.props.verifyUserResponse;

  setCurrentStep = (step) => {
    this.props.setCurrentStep(step);
  };

  testprop = () => {
    this.setCurrentStep(2);
  };

  render() {
    const { language, currentStep } = this.props;
    return (
      <React.Fragment>
        <div className={" " + (language == "ar" ? "text-right" : "text-left")}>
          <div className="form__title">{this.currentStepHeader}</div>
          <form
            className={" " + (language == "ar" ? "text-right" : "text-left")}
            onSubmit={this.handleSubmit}
            autoComplete="off"
          >
            {currentStep === 1 && (
              <Step1 currentStep={currentStep} email={this.state.email} />
            )}
            {currentStep === 2 && (
              <Step2 currentStep={currentStep} username={this.state.username} />
            )}

            {currentStep === 3 && <Step3 currentStep={currentStep} />}
            {/* {currentStep === 4 && <Step4 currentStep={currentStep} />} */}

            {currentStep === 4 && <StepFour currentStep={currentStep} />}

            {currentStep === 5 && <Step5 currentStep={currentStep} />}
          </form>
          <FormControls />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, { setCurrentStep })(RegistrationForm);
