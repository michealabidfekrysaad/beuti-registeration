import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { setEmployeesList } from "./../../../services/redux/actions/index";
import EmployessList from "./EmployessList";
import { minLength, maxLength, isRequired } from "./../../../validation/length";

import "./step-three.scss";

class Step3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employeesList: [],
      arabicName: "",
      englishName: "",
      id: null,
      type: null,
      isError: false,
      isServiceAssigned: false,
      queueChecked: false,
      appointmentChecked: true,
      employeeNameErrorAr: "",
      employeeNameErrorEn: "",
      isErrorName: false,
      maxLengthEmployeeList: false,
    };
  }

  //  UPDATE STATE WHEN PROPS CHANGED
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.language !== this.props.language ||
      nextProps.employeesList !== this.props.language
    );
  }

  resetEmployeeData = () => {
    this.setState({
      arabicName: "",
      englishName: "",
      id: null,
      isError: false,
      isServiceAssigned: false,
    });
  };

  addEmployee = () => {
    let employeesList = [...this.props.employeesList];
    if (employeesList.length <= 99) {
      // EMPTY AR_NAME OR EN_NAME
      if (this.state.employeeNameErrorAr || this.state.employeeNameErrorEn) {
        return this.setState({ isErrorName: true, isError: false });
      }

      if (this.state.arabicName === "" || this.state.englishName === "") {
        return this.setState({ isError: true });
      }

      // ADD FIRST EMPLOYEE (EXECUTE JUST ONCE)
      if (employeesList.length === 0) {
        employeesList.push({
          arabicName: this.state.arabicName,
          englishName: this.state.englishName,
          id: this.generateEmployeeId(employeesList),
          type: this.state.type,
          isServiceAssigned: false,
        });
        this.props.setEmployeesList(employeesList);
        this.resetEmployeeData();
        return;
      }

      // CHEAK THAT EMPLOYEE IS ALREADY EXIST OR NOT
      if (employeesList.length > 0) {
        const found = employeesList.some(
          (el) =>
            el.englishName === this.state.englishName &&
            el.arabicName === this.state.arabicName
        );
        if (!found) {
          employeesList.push({
            arabicName: this.state.arabicName,
            englishName: this.state.englishName,
            id: this.generateEmployeeId(employeesList),
            type: this.state.type,
            isServiceAssigned: false,
          });
          this.props.setEmployeesList(employeesList);
          this.resetEmployeeData();
          return employeesList;
        } else {
          this.setState({
            isError: true,
          });
        }
      }
    } else {
      this.setState({ maxLengthEmployeeList: true });
    }
  };

  componentDidMount = () => {};

  selectType = (type) => {
    if (type === 2) {
      // Apointment
      this.setState({
        queueChecked: false,
        appointmentChecked: true,
        type: type,
      });
    } else {
      // queue
      this.setState({
        queueChecked: true,
        appointmentChecked: false,
        type: type,
      });
    }
  };

  generateEmployeeId = (employeesList) => {
    let ids = [];
    if (employeesList.length) {
      employeesList.map((item, i) => {
        ids.push(item.id);
      });
      return Math.max(...ids) + 1;
    } else {
      return 1;
    }
  };

  employeeNameValidation = (value) => {
    const minLengthError = minLength(value, 2);
    const maxLengthError = maxLength(value, 50);
    const isRequiredError = isRequired(value, 1);
    if (isRequiredError) {
      return this.props.localization.VALIDATION.IS_REQUIRED[
        `${this.props.language}`
      ];
    }
    if (minLengthError) {
      return this.props.localization.VALIDATION.EMPLOYEE_NAME_MIN_LENGTH[
        `${this.props.language}`
      ];
    }
    if (maxLengthError) {
      return this.props.localization.VALIDATION.EMPLOYEE_NAME_MAX_LENGTH[
        `${this.props.language}`
      ];
    }
  };

  render() {
    const { localization } = this.props;
    if (this.props.currentStep !== 3) {
      return null;
    }
    return (
      <React.Fragment>
        <Container>
          <div className="tab-pane  mb-5 " id="employees">
            <div className="employee-box">
              <div className="employee-box__title">
                {
                  this.props.localization.REGISTER_FORM_WIZARD.STEP_3
                    .EMPLOYEES_ADDED[`${this.props.language}`]
                }
              </div>
              <div className="employee-box__list">
                <EmployessList></EmployessList>
              </div>
              <div className="employee-box__controllers">
                <Row className="align-items-center">
                  <Col xs={12} sm={6} md={4} lg={3} className="mb-2">
                    <div className="">
                      <input
                        className={`employee-box__controllers-input  " +
                          ${
                            this.props.language == "ar"
                              ? "text-right"
                              : "text-left "
                          }  ${
                          this.state.employeeNameErrorAr
                            ? "employee-box__controllers-input--error"
                            : " "
                        }`}
                        name="employeeNameB"
                        type="text"
                        placeholder={
                          this.props.localization.FORM_INPUTS_PLACEHOLDERS
                            .EMPLOYEE_NAME_AR[`${this.props.language}`]
                        }
                        required
                        value={this.state.arabicName}
                        onChange={(e) => {
                          this.setState({
                            arabicName: e.target.value,
                            employeeNameErrorAr: this.employeeNameValidation(
                              e.target.value.trim()
                            ),
                            isError: false,
                            isErrorName: false,
                          });
                        }}
                      />
                    </div>
                  </Col>
                  <Col xs={12} sm={6} md={4} lg={3} className="mb-2">
                    <div className=" ">
                      <input
                        className={`employee-box__controllers-input  " +
                          ${
                            this.props.language == "ar"
                              ? "text-right"
                              : "text-left "
                          }  ${
                          this.state.employeeNameErrorEn
                            ? "employee-box__controllers-input--error"
                            : " "
                        }`}
                        name="employeeNameA"
                        type="text"
                        placeholder={
                          this.props.localization.FORM_INPUTS_PLACEHOLDERS
                            .EMPLOYEE_NAME_EN[`${this.props.language}`]
                        }
                        value={this.state.englishName}
                        onChange={(e) => {
                          this.setState({
                            employeeNameErrorEn: this.employeeNameValidation(
                              e.target.value.trim()
                            ),
                            englishName: e.target.value,
                            isError: false,
                            isErrorName: false,
                          });
                        }}
                      />
                    </div>
                  </Col>
                  <Col xs={12} sm={6} md={4} lg={3} className="mb-2">
                    <select
                      className="form-select w-100 employee-box__controllers-select"
                      aria-label="Default select example"
                      onChange={(e) => this.selectType(+e.target.value)}
                    >
                      <option selected disabled>
                        {
                          this.props.localization.FORM_INPUTS_PLACEHOLDERS
                            .EMPLOYEE_TYPE[`${this.props.language}`]
                        }
                      </option>
                      <option value="1">
                        {
                          this.props.localization.FORM_INPUTS_PLACEHOLDERS
                            .EMPLOYEE_QUEUE_TYPE[`${this.props.language}`]
                        }
                      </option>
                      <option value="2">
                        {" "}
                        {
                          this.props.localization.FORM_INPUTS_PLACEHOLDERS
                            .EMPLOYEE_Appointment_TYPE[`${this.props.language}`]
                        }
                      </option>
                    </select>
                  </Col>
                  <Col xs={12} sm={6} md={12} lg={3} className="mb-2">
                    <div className="text-center ">
                      <button
                        className={
                          "btn field__button " +
                          (this.props.language === "ar"
                            ? "ar-font text-right"
                            : "text-left")
                        }
                        onClick={this.addEmployee}
                        type="button"
                        disabled={
                          this.state.isErrorName ||
                          !this.state.type ||
                          !this.state.englishName ||
                          !this.state.arabicName
                        }
                      >
                        {
                          this.props.localization.BUTTONS.ADD[
                            `${this.props.language}`
                          ]
                        }
                      </button>
                    </div>
                  </Col>
                  <Col xs={12}>
                  {this.state.isError ? (
                        <p className="field__errors">
                          {
                            localization.VALIDATION.ADD_EMPLOYEE_ERROR[
                              `${this.props.language}`
                            ]
                          }
                        </p>
                      ) : null}
                      {this.state.maxLengthEmployeeList ? (
                        <p className="field__errors">
                          The maximum number of adding employees should be 100
                        </p>
                      ) : null}
                  </Col>
                </Row>
              </div>
            </div>
            {this.state.employeeNameErrorAr ||
            this.state.employeeNameErrorEn ? (
              <span className="field__errors mt-2">
                {this.state.employeeNameErrorEn ||
                  this.state.employeeNameErrorAr}
              </span>
            ) : null}
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps, { setEmployeesList })(Step3);
