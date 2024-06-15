import React from "react";
import { Control, Form } from "react-redux-form";
import { connect } from "react-redux";
import { minLength, maxLength, isRequired } from "./../../validation/length";
import {
  isStartWith05,
  isLengthValid,
  isNumbersOnly,
} from "./../../validation/mobileNumber";
import {
  EDIT_CATEGORIES_LIST,
  SET_ASSIGNED_EMPLOYEES,
  SET_EMPLOYEES_LIST,
  SET_SERVICES,
  SET_WORKING_HOURS,
  STEP_ONE_EMAIL_VALIDATION,
  VALIDATE_CITY,
  GET_CENTER_TYPES,
  SET_CENTER_TYPE,
} from "../../services/redux/actions/types";
import { isMatched } from "./../../validation/password";
import {
  loadLocalization,
  registerUser,
} from "./../../services/redux/actions/index";
import TermsAndCoditions from "../accept_terms/TermsAndCoditions";
import "./register_form.scss";

class RegisterForm extends React.Component {
  state = {
    centerNameError: null,
    centerNameEnError: null,
    mobileNumberError: null,
    passwordError: null,
    centerName: "",
    centerNameEn: "",
    mobileNumber: "",
    password: "",
    show: false,
    lang: this.props.language,
    registerUserError: this.props.registerUserError,
    termsAccepted:false
  };

  handleRegistrationSubmit = () => {
    const formData = {
	  centerName: this.state.centerName,
      centerNameEn: this.state.centerNameEn,
	  mobileNumber: this.isEnglishNum(this.state.mobileNumber),
      password: this.state.password,
      registerationToken:this.props.registerationToken
    };
    this.props.registerUser({...formData,advertiserToken:this.props.advertiserToken});
  };
  handleAcceptTerms = (e) =>{
    this.setState({
      termsAccepted: e.target.checked,
    });
  }
  isEnglishNum = (value) => {
    return value
      .replace(/[٠١٢٣٤٥٦٧٨٩]/g, function (d) {
        return d.charCodeAt(0) - 1632;
      })
      .replace(/[۰۱۲۳۴۵۶۷۸۹]/g, function (d) {
        return d.charCodeAt(0) - 1776;
      });
  };

  centerNameValidation = (value,englishName) => {
    const minLengthError = minLength(value, 2);
    const maxLengthError = maxLength(value, 50);
	let isRequiredError = ''
	if(!englishName) { isRequiredError = isRequired(value, 1)}
    if (isRequiredError && !englishName) {
      return this.props.localization.VALIDATION.IS_REQUIRED[
        `${this.props.language}`
      ];
    }
    if (minLengthError) {
      return this.props.localization.VALIDATION.CENTER_NAME_MIN_LENGTH[
        `${this.props.language}`
      ];
    }
    if (maxLengthError) {
      return this.props.localization.VALIDATION.CENTER_NAME_MAX_LENGTH[
        `${this.props.language}`
      ];
    }
  };

  mobileNumberValidation = (value) => {
    const startWithError = isStartWith05(this.isEnglishNum(value));
    const lengthError = isLengthValid(this.isEnglishNum(value));
    const isRequiredError = isRequired(this.isEnglishNum(value), 1);
    const isNumbersOnlyError = isNumbersOnly(this.isEnglishNum(value));
    if (isRequiredError) {
      return this.props.localization.VALIDATION.IS_REQUIRED[
        `${this.props.language}`
      ];
    }
    if (!isNumbersOnlyError) {
      return this.props.localization.VALIDATION.MOBILE_NUMBER_NOT_MATCH[
        `${this.props.language}`
      ];
    }
    if (!startWithError) {
      return this.props.localization.VALIDATION.MOBILE_NUMBER_PREFIX[
        `${this.props.language}`
      ];
    }
    if (lengthError) {
      return this.props.localization.VALIDATION.MOBILE_NUMBER_NOT_MATCH[
        `${this.props.language}`
      ];
    }
  };

  passwordNumberValidation = (value) => {
    const isRequiredError = isRequired(this.isEnglishNum(value), 1);
    const isMatchedError = isMatched(this.isEnglishNum(value));
    if (isRequiredError) {
      return this.props.localization.VALIDATION.IS_REQUIRED[
        `${this.props.language}`
      ];
    }
    if (!isMatchedError) {
      return this.props.localization.VALIDATION.PASSWORD_MATCH[
        `${this.props.language}`
      ];
    }
  };

  showHidePw = () => {
    this.setState({
      show: !this.state.show,
    });
  };
  componentDidMount() {
    this.props.onReload();
  }

  componentDidUpdate = () => {
    // CHANGE ERROR MSG IF LANGUAGE IS CHANGED
    if (this.state.lang != this.props.language) {
      this.setState({
        lang: this.props.language,
      });
      if (this.state.centerNameError) {
        this.setState({
          centerNameError: this.centerNameValidation(this.state.centerName),
        });
      }      
	  if (this.state.centerNameEnError) {
        this.setState({
          centerNameEnError: this.centerNameValidation(this.state.centerName,'englishName'),
        });
      }
      if (this.state.mobileNumberError) {
        this.setState({
          mobileNumberError: this.mobileNumberValidation(
            this.state.mobileNumber.trim()
          ),
        });
      }
      if (this.state.passwordError) {
        // debugger;
        this.setState({
          passwordError: this.passwordNumberValidation(this.state.password),
        });
      }
    }
  };

  // UPDATE STATE WHENE PROPS IS CHANGED
  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      registerUserError: nextProps.registerUserError,
    };
  }
  render() {
    if (this.props.localization) {
      return (
        <React.Fragment>
          <Form
            model="registrationForm"
            onSubmit={(registrationForm) => this.handleRegistrationSubmit()}
            autoComplete="off"
            noValidate
          >
            <div className="field mb-3">
              <label className="field__label">
                {
                  this.props.localization.FORM_INPUTS_PLACEHOLDERS.CENTER_NAME[
                    `${this.props.language}`
                  ]
                }
              </label>
              <Control
                type="text"
                model=".centerName"
                required
                validateOn="blur"
                className="field__input"
                value={this.state.centerName}
                onChange={(e) => {
                  this.setState({
                    centerName: e.target.value,
                    centerNameError: this.centerNameValidation(e.target.value),
                  });
                }}
              />
              {this.state.centerNameError ? (
                <span className="field__errors">
                  {this.state.centerNameError}
                </span>
              ) : null}
            </div>
			{/* centerName by english optional */}
			{!this.props.advertiserToken && 
			<div className="field mb-3">
              <label className="field__label">
                {
                  this.props.localization.FORM_INPUTS_PLACEHOLDERS.CENTER_NAME_EN[
                    `${this.props.language}`
                  ]
                }
              </label>
              <Control
                type="text"
                model=".centerNameEn"
                required
                validateOn="blur"
                className="field__input"
                value={this.state.centerNameEn}
                onChange={(e) => {
                  this.setState({
                    centerNameEn: e.target.value,
                    centerNameEnError: this.centerNameValidation(e.target.value,'englishName'),
                  });
                }}
              />
              {this.state.centerNameEnError && this.state.centerNameEn ? (
                <span className="field__errors">
                  {this.state.centerNameEnError}
                </span>
              ) : null}
            </div>
				}
            <div className="field mb-3">
              <label className="field__label">
                {
                  this.props.localization.FORM_INPUTS_PLACEHOLDERS.PHONE_NUMBER[
                    `${this.props.language}`
                  ]
                }
              </label>
              <Control
                type="text"
                model=".mobile"
                required
                validateOn="blur"
                className="field__input"
                value={this.state.mobileNumber}
                onChange={(e) => {
                  if(this.props.advertiserToken){
                    this.setState({
                      mobileNumber: e.target.value,
                     
                    });
                  }
                  this.setState({
                    mobileNumber: e.target.value,
                    mobileNumberError: this.mobileNumberValidation(
                      e.target.value.trim()
                    ),
                  });
                }}
              />
              {this.state.mobileNumberError && !this.props.advertiserToken ? (
                <span className="field__errors">
                  {this.state.mobileNumberError}
                </span>
              ) : null}
              {this.state.registerUserError ? (
                <div className="field__errors">
                  {this.state.registerUserError}
                </div>
              ) : null}
            </div>
            {!this.props.advertiserToken && 
              <div className="field mb-3">
              <label className="field__label">
                {
                  this.props.localization.FORM_INPUTS_PLACEHOLDERS.PASSWORD[
                    `${this.props.language}`
                  ]
                }
              </label>
              {!this.state.show ? (
                <React.Fragment>
                  <Control
                    type="password"
                    model=".password"
                    required
                    validateOn="blur"
                    className="field__input field__input--password"
                    value={this.state.password}
                    onChange={(e) => {
                      this.setState({
                        password: e.target.value,
                      });
                    }}
                    onChange={(e) => {
                      this.setState({
                        password: e.target.value,
                        passwordError: this.passwordNumberValidation(
                          e.target.value
                        ),
                      });
                    }}
                  />
                  {this.state.password ? (
                    <span
                      className={
                        this.props.language === "ar"
                          ? "field__pwIcon-left"
                          : "field__pwIcon-right"
                      }
                      onClick={this.showHidePw}
                    >
                      <i className="far fa-eye-slash"></i>
                    </span>
                  ) : null}
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Control
                    type="text"
                    model=".password"
                    required
                    validateOn="blur"
                    className="field__input field__input--password"
                    value={this.state.password}
                    onChange={(e) => {
                      this.setState({
                        password: e.target.value,
                        passwordError: this.passwordNumberValidation(
                          e.target.value
                        ),
                      });
                    }}
                  />
                  {this.state.password ? (
                    <span
                      className={
                        this.props.language === "ar"
                          ? "field__pwIcon-left"
                          : "field__pwIcon-right"
                      }
                      onClick={this.showHidePw}
                    >
                      <i className="far fa-eye"></i>
                    </span>
                  ) : null}
                </React.Fragment>
              )}

              {this.state.passwordError ? (
                <span className="field__errors">
                  {this.state.passwordError}
                </span>
              ) : null}
            </div>        
            }
          
            <TermsAndCoditions handleAcceptTerms={this.handleAcceptTerms} acceptTerms={this.state.termsAccepted}></TermsAndCoditions>
            <div className="mt-4 my-2 text-center">
              <button
                className="btn field__button"
                type="submit"
                disabled={
                  this.props.loader || 
                  this.state.centerNameError !== undefined ||
                  (!this.props.advertiserToken && this.state.mobileNumberError !== undefined) ||
                  (this.props.advertiserToken && this.state.mobileNumber.length <= 0)||
                  (!this.props.advertiserToken && this.state.passwordError !== undefined) || !this.state.termsAccepted
                }
              >
                {
                  this.props.localization.BUTTONS.REGISTER[
                    `${this.props.language}`
                  ]
                }
              </button>
              <div className="mt-2">
                {
                  this.props.localization.HAVE_ACCOUNT.TITLE[
                    `${this.props.language}`
                  ]
                }
                <a href="https://admin-panel.beuti.co/login">
                  {
                    this.props.localization.HAVE_ACCOUNT.LINK[
                      `${this.props.language}`
                    ]
                  }
                </a>
              </div>
            </div>
          </Form>
        </React.Fragment>
      );
    } else return null;
  }
}

const mapStateToProps = (state) => {
  return state;
};

function mapDispatchToProps(dispatch) {
  return {
    loadLocalization: () => dispatch(loadLocalization()),
    registerUser: (data) => dispatch(registerUser(data)),
    onReload: () => {
      dispatch({ type: STEP_ONE_EMAIL_VALIDATION, payload: {} });
      dispatch({ type: VALIDATE_CITY, payload: null });
      dispatch({ type: SET_CENTER_TYPE, payload: [] });
      dispatch({ type: EDIT_CATEGORIES_LIST, payload: [] });
      dispatch({ type: SET_SERVICES, payload: [] });
      dispatch({ type: SET_EMPLOYEES_LIST, payload: [] });
      dispatch({ type: SET_WORKING_HOURS, payload: [] });
      dispatch({ type: SET_ASSIGNED_EMPLOYEES, payload: [] });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
export { RegisterForm };
