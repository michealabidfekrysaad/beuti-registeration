import React, { Component } from "react";
import { Control, Form } from "react-redux-form";
import { connect } from "react-redux";
import { isNumbersOnly } from "./../../validation/mobileNumber";
import { minLength, maxLength, isRequired } from "./../../validation/length";
import {
  verifyUser,
  registerUser,
  verifyUserFailure,
} from "./../../services/redux/actions/index";

// STYLES
import "./mobileVerfication.scss";

// REQUIRE IMAGES

class MobileVerfication extends Component {
  state = {
    timer: this.props.resendRemainingTime,
    verficationCode: "",
    verficationCodeError: "",
    lang: this.props.language,
    verifyUserError: this.props.verifyUserError,
    isResendEnabled: false,
    times: 0,
    showError: false,
  };

  componentDidMount = () => {
    // alert(`Verification code: ${this.props.verficationCode}`)
    if (this.props.resendRemainingTime !== 0) {
      this.setState({
        isResendEnabled: false,
      });
    }
  };

  shouldComponentUpdate(nextProps) {
    return (
      nextProps.resendRemainingTime !== this.props.resendRemainingTime ||
      nextProps !== this.props
    );
  }
  resendCounter = () => {
    const resendCounterInterval = setInterval(() => {
      if (this.props.resendRemainingTime === 1) {
        clearInterval(resendCounterInterval);
      }
      this.setState({
        timer: this.props.resendRemainingTime - 1,
      });
    }, 1000);
  };

  resendCode = async () => {
    this.setState(
      (prevState) => ({
        // prevState?
        times: prevState.times + 1,
      }),
      () => {
        if (this.state.times > 1) {
          return;
        }
      }
    );

    await this.props.registerUser(this.props.registerdData);
    this.resendCounter();
  };

  isEnglishNum = (value) => {
    return value
      .replace(/[٠١٢٣٤٥٦٧٨٩]/g, function (d) {
        return d.charCodeAt(0) - 1632;
      })
      .replace(/[۰۱۲۳۴۵۶۷۸۹]/g, function (d) {
        return d.charCodeAt(0) - 1776;
      });
  };

  validateCode = (value) => {
    const minLengthError = minLength(value, 4);
    const maxLengthError = maxLength(value, 4);
    const isRequiredError = isRequired(value, 1);
    const isNumbersOnlyError = isNumbersOnly(this.isEnglishNum(value));
    if (isRequiredError) {
      return this.props.localization.VALIDATION.IS_REQUIRED[
        `${this.props.language}`
      ];
    }
    if (!isNumbersOnlyError) {
      return this.props.localization.VALIDATION.INCORRECT_VERIFICATION_CODE[
        `${this.props.language}`
      ];
    }
    if (minLengthError) {
      return this.props.localization.VALIDATION.VERIFICATION_CODE_LENGTH[
        `${this.props.language}`
      ];
    }
    if (maxLengthError) {
      return this.props.localization.VALIDATION.VERIFICATION_CODE_LENGTH[
        `${this.props.language}`
      ];
    }
  };
  handleVerificationSubmit = () => {
    const formData = {
      code: this.state.verficationCode.trim(),
      phoneNumber: this.isEnglishNum(
        this.props.registerdData.mobileNumber.trim()
      ),
      registerationToken:this.props.registerationToken
    };
    this.props.verifyUser(formData);
  };

  // UPDATE STATE WHENE PROPS IS CHANGED
  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      verifyUserError: nextProps.verifyUserError,
      isResendEnabled: nextProps.resendRemainingTime === 0,
    };
  }

  componentDidUpdate = (nextProps) => {
    // CHANGE ERROR MSG IF LANGUAGE IS CHANGED
    if (this.state.lang != this.props.language) {
      this.setState({
        lang: this.props.language,
      });
      if (this.state.verficationCodeError) {
        this.setState({
          verficationCodeError: this.validateCode(
            this.state.verficationCode.trim()
          ),
        });
      }
      //  if (nextProps.resendRemainingTime === 1) {
      //     console.log(nextProps.resendRemainingTime)
      //    this.setState({
      //     isResendEnabled: true
      //    } , () => {
      //      console.log('isResendEnabled' , this.state.isResendEnabled)
      //    })
      //  }

      // listne on change
    }
  };

  render() {
    if (this.props.localization) {
      return (
        <React.Fragment>
          <Form
            model="verficationForm"
            onSubmit={(registrationForm) => this.handleVerificationSubmit()}
            autoComplete="off"
            noValidate
          >
            <div className="field mb-5">
              <label className="field__label">
                {
                  this.props.localization.FORM_INPUTS_PLACEHOLDERS
                    .VERIFICATION_CODE[`${this.props.language}`]
                }
              </label>
              <Control.text
                model=".mobileNumber"
                required
                validateOn="blur"
                className="field__input"
                onChange={(e) => {
                  this.props.verifyUserFailure(null);
                  this.setState({
                    verficationCode: e.target.value,
                    verficationCodeError: this.validateCode(
                      e.target.value.trim()
                    ),
                  });
                }}
              />
              {this.state.verficationCodeError ? (
                <span className="field__errors">
                  {this.state.verficationCodeError}
                </span>
              ) : null}
              {this.state.verifyUserError &&
              !this.state.verficationCodeError ? (
                <span className="field__errors">
                  {this.state.verifyUserError["message"]}
                </span>
              ) : null}
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="btn field__button"
                // style={
                //   this.state.verficationCodeError ||
                //   this.state.verficationCode.length < 1
                //     ? { backgroundColor: "gray", border: "1px solid gray" }
                //     : {}
                // }
                disabled={this.state.verficationCodeError !== undefined}
              >
                {
                  this.props.localization.BUTTONS.SUBMIT[
                    `${this.props.language}`
                  ]
                }
              </button>
              {this.state.isResendEnabled}
              <button
                type="button"
                className={
                  "btn field__button " +
                  (this.props.language === "ar"
                    ? "field__button--resend-right"
                    : "field__button--resend-left")
                }
                style={
                  this.props.resendRemainingTime !== 0 ||
                  this.props.blockMsg ||
                  !this.state.isResendEnabled
                    ? { backgroundColor: "gray", border: "1px solid gray" }
                    : {}
                }
                disabled={
                  this.props.resendRemainingTime !== 0 ||
                  this.props.blockMsg ||
                  !this.state.isResendEnabled
                }
                onClick={() => this.resendCode()}
              >
                {
                  this.props.localization.BUTTONS.RESEND[
                    `${this.props.language}`
                  ]
                }
                {this.props.resendRemainingTime !== 0 &&
                this.props.resendRemainingTime ? (
                  <span
                    className={
                      this.props.language === "ar"
                        ? "field__button--resend-right"
                        : "field__button--resend-left"
                    }
                  >
                    ({this.props.resendRemainingTime})
                  </span>
                ) : null}
              </button>
            </div>

            {this.props.blockMsg ? (
              <div className="field__errors">{this.props.blockMsg}</div>
            ) : null}
            {this.state.times > 1 ? (
              <div className="field__errors">
                {
                  this.props.localization.VALIDATION.REACH_VERIFICATION_LIMIT[
                    `${this.props.language}`
                  ]
                }
              </div>
            ) : null}
          </Form>
        </React.Fragment>
      );
    } else return null;
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, {
  verifyUser,
  registerUser,
  verifyUserFailure,
})(MobileVerfication);
export { MobileVerfication };
