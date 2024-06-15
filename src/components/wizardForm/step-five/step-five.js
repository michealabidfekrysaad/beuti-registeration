import React, { Component } from "react";
import { Container, Table, Card, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import {
  setServices,
  setEmployeesList,
  setAssignedEmployees,
  editCategoriesList,
  uploadImage,
} from "./../../../services/redux/actions/index";
import Accordion from "react-bootstrap/Accordion";
import { minLength, maxLength, isRequired } from "./../../../validation/length";
import { isAcceptedPrice, isNegative } from "./../../../validation/price";
import Select from "react-select";
import DoneStep from "./../../wizardForm/done/done";
import UploadImage from "./../../wizardForm/upload-image/UploadImage";
import "./step-five.scss";
class Step5 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      advertiserToken: this.props.advertiserToken,
      phoneNumber: this.props.registerdData.mobileNumber,
      code: this.props.verficationCode,
      parentOpen: false,
      categoriesList: this.props.categoriesList,
      addServices: false,
      serviceNameEng: "",
      serviceNameEngError: "",
      serviceNameAr: "",
      serviceNameArError: "",
      showDurationPicker: false,
      serviceDuration: "",
      servicePrice: "",
      servicePriceError: "",
      addedServies: [],
      centerTypeIndex: null,
      options: this.props.employeeListBackend,
      selectedOptions: [],
      invalidService: false,
      isErrorName: false,
      servicesList: this.props.servicesList,
      submitClicked: false,
      durationError: "",
      minutes: "00",
      hours: "00",
      hoursOptions: [
        { id: 1, label: "00:15", value: 15 },
        { id: 2, label: "00:30", value: 30 },
        { id: 3, label: "00:45", value: 45 },
        { id: 4, label: "1:00", value: 100 },
        { id: 5, label: "1:15", value: 115 },
        { id: 6, label: "1:30", value: 130 },
        { id: 7, label: "1:45", value: 145 },
        { id: 8, label: "2:00", value: 200 },
        { id: 9, label: "2:15", value: 215 },
        { id: 10, label: "2:30", value: 230 },
        { id: 11, label: "2:45", value: 245 },
        { id: 12, label: "3:00", value: 300 },
        { id: 13, label: "3:15", value: 315 },
        { id: 14, label: "3:30", value: 330 },
        { id: 15, label: "3:45", value: 345 },
        { id: 16, label: "4:00", value: 400 },
        { id: 17, label: "4:15", value: 415 },
        { id: 18, label: "4:30", value: 430 },
        { id: 19, label: "4:45", value: 445 },
        { id: 20, label: "5:00", value: 500 },
      ],
    };
  }

  clearAllErrors = () => {
    this.setState({
      invalidService: false,
      serviceNameEngError: "",
      serviceNameArError: "",
      servicePriceError: "",
      isErrorName: false,
      durationError: "",
    });
  };

  componentDidMount() {
    setTimeout(() => {
      let btn = document.getElementById("submit-btn");
      if (btn) {
        btn.addEventListener("click", () => {
          if (!this.state.advertiserToken) {
            this.setState({ submitClicked: true });
          } else {
            this.setState({ submitClicked: false });
          }
        });
      }
    }, 100);
    let categoriesList = [...this.props.categoriesList];
    let centerTypes = [...this.props.centerTypes];
    let serviceList = [...this.props.servicesList];

    const { language } = this.props;
    let options = [...this.props.employeeListBackend];
    let arr = [];
    let individualServ = [];
    categoriesList.map((category, index) => {
      const found = centerTypes.some(
        (selectedId) => selectedId === category.centerTypeID
      );
      if (found) {
        category.categories.map((el, index) => {
          el["addNewService"] = false;
          el["showDurationPicker"] = false;
          el["services"] = [];

          serviceList.map((serv, i) => {
            if (el.id === serv.categoryId) {
              el["services"].push(serv);
            }
          });
        });
        arr.push(category);
      }
    });

    options.map((emp) => {
      language === "ar"
        ? (emp["label"] = emp.nameAR)
        : (emp["label"] = emp.nameEN);
      emp["value"] = emp.id;
    });
    this.setState(
      {
        categoriesList: arr,
        options,
      },
      () => {
        this.props.editCategoriesList(arr);
      }
    );
  }

  componentWillUnmount = () => {
    let btn = document.getElementById("submit-btn");
    if (btn) {
      btn.addEventListener("click", () =>
        this.setState({ submitClicked: true })
      );
    }
  };

  //  UPDATE STATE WHEN PROPS CHANGED
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps !== nextState ||
      nextProps.categoriesList !== this.props.categoriesList ||
      nextProps.centerTypes !== this.props.centerTypes ||
      nextProps.employeesList !== this.props.employeesList ||
      nextProps.servicesList !== this.props.servicesList
    );
  }

  renderAccordion = (center, parentIndex) => {
    return (
      <>
        <div className="tab-pane  mb-5 " id="employees">
          <div className="employee-box">
            <div
              className="employee-box__title"
              style={{ fontWeight: "bolder" }}
            >
              {center.centerTypeName}
            </div>
            <div
              className="employee-box__controllers"
              style={{ boxShadow: "none", padding: "0px", margin: "10px 0px" }}
            >
              {center.categories.map((category, childIndex) => {
                return this.renderSubAccordion(
                  category,
                  parentIndex,
                  childIndex
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  };

  renderSubAccordion = (category, parentIndex, childIndex) => {
    return (
      <>
        <div
          style={{
            marginBottom: "20px",
            borderRadius: "10px",
            boxShadow: "0px 1px 4px rgb(0 0 0 / 25%)",
            padding: "12px 9px",
            margin: "0px 18px 8px 18px",
          }}
        >
          <div
            style={{
              fontSize: "1em",
              width: "100%",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            {category.name}
          </div>
          <div>
            <>
              {category["services"] && !category["addNewService"]
                ? this.renderServicesList(
                    category["services"],
                    parentIndex,
                    childIndex
                  )
                : null}
              {!category["addNewService"]
                ? this.renderAddServiceButton(parentIndex, childIndex)
                : this.renderAddNewServiceFrom(
                    parentIndex,
                    childIndex,
                    category["isHome"]
                  )}
            </>
          </div>
        </div>
      </>
    );
  };

  cencelAddService = (parentIndex, childIndex) => {
    let categoriesList = [...this.props.categoriesList];
    const found = categoriesList[parentIndex].categories.some(
      (el, i) => i === childIndex
    );
    if (found) {
      categoriesList[parentIndex].categories[childIndex][
        "addNewService"
      ] = false;
    }
    this.setState(
      {
        categoriesList: categoriesList,
      },
      () => {
        this.props.editCategoriesList(this.state.categoriesList);
      }
    );
  };

  toggelTime = (parentIndex, childIndex) => {
    let categoriesList = [...this.props.categoriesList];
    categoriesList.map((el, i) => {
      el.categories.map((cat, index) => {
        if (childIndex !== index) {
          cat["showDurationPicker"] = false;
        }
      });
    });
    const found = categoriesList[parentIndex].categories.some(
      (el, i) => i === childIndex
    );
    if (found) {
 	    categoriesList[parentIndex].categories[childIndex][
		"showDurationPicker"
		  ] = !categoriesList[parentIndex].categories[childIndex][
			"showDurationPicker"
		  ];
    }
    this.setState(
      {
        categoriesList: categoriesList,
      },
      () => {
        this.props.editCategoriesList(this.state.categoriesList);
      }
    );
  };

  renderAddNewServiceFrom = (parentIndex, childIndex, isHome) => {
    let categoriesList = [...this.props.categoriesList];
    const { localization, language } = this.props;
    const { selectedOption, options } = this.state;
    let typeAppointement = [];
    options.map((el, i) => {
      if (el.typeID === 2) {
        typeAppointement.push(el);
      }
    });
    return (
      <React.Fragment>
        <div className="newService">
          <Row>
            <Col xs={12} sm={6} md={4} lg={3} className="mb-2">
              <div className="field">
                <input
                  required
                  className={`employee-box__controllers-input  " +
			${this.props.language == "ar" ? "text-right" : "text-left "}  ${
                    this.state.serviceNameEngError
                      ? "employee-box__controllers-input--error"
                      : " "
                  }`}
                  name="serviceNameEng"
                  type="text"
                  placeholder={
                    localization.FORM_INPUTS_PLACEHOLDERS.SERVICE_NAME_EN[
                      language
                    ]
                  }
                  onChange={(e) => {
                    this.setState({
                      serviceNameEng: e.target.value,
                      serviceNameEngError: this.serviceNameValidation(
                        e.target.value
                      ),
                      isErrorName: false,
                      invalidService: false,
                    });
                  }}
                />
                 <div className="error-text">
                  {this.state.serviceNameEngError && (
                    <span className="field__errors">
                      {this.state.serviceNameEngError}
                    </span>
                  )}
                </div>
              </div>
            </Col>
            <Col xs={12} sm={6} md={4} lg={3} className="mb-2">
              <div className="field">
                <input
                  className={`employee-box__controllers-input  " +
									${this.props.language == "ar" ? "text-right" : "text-left "}  ${
                    this.state.serviceNameArError
                      ? "employee-box__controllers-input--error"
                      : " "
                  }`}
                  name="serviceNameArabic"
                  type="text"
                  placeholder={
                    localization.FORM_INPUTS_PLACEHOLDERS.SERVICE_NAME_AR[
                      language
                    ]
                  }
                  onChange={(e) => {
                    this.setState(
                      {
                        serviceNameAr: e.target.value,
                        serviceNameArError: this.serviceNameValidation(
                          e.target.value.trim()
                        ),
                        isErrorName: false,
                        invalidService: false,
                      },
                      () => {}
                    );
                  }}
                />
                <div className="error-text">
                  {this.state.serviceNameArError && (
                    <span className="field__errors">
                      {this.state.serviceNameArError}
                    </span>
                  )}
                </div>
              </div>
            </Col>
            <Col xs={12} sm={6} md={4} lg={3} className="mb-2">
              <div>
                <select
                  id={7}
                  className="form-select w-100 employee-box__controllers-select"
                  onChange={(e) => this.handleHoursSelection(e)}
                  options={this.state.hoursOptions}
                >
                  <option selected disabled>
                    {
                      localization.FORM_INPUTS_PLACEHOLDERS.SERVICE_DURATION[
                        language
                      ]
                    }
                  </option>
                  {this.state.hoursOptions.map((hour) => {
                    return <option value={hour.label}>{hour.label}</option>;
                  })}
                </select>
              </div>
            </Col>
            <Col xs={12} sm={6} md={4} lg={3} className="mb-2">
              <div className="field">
                <input
                  className={`employee-box__controllers-input  " +
									${this.props.language == "ar" ? "text-right" : "text-left "}  ${
                    this.state.servicePriceError
                      ? "employee-box__controllers-input--error"
                      : " "
                  }`}
                  style={{
                    direction: `${this.props.language === "ar" && "rtl"}`,
                    height: "33px",
                  }}
                  name="servicePrice"
                  type="text"
                  required={!this.state.submitClicked}
                  placeholder={
                    localization.FORM_INPUTS_PLACEHOLDERS.SERVICE_PRICE[
                      language
                    ]
                  }
                  onChange={(e) => {
                    if (Number(e.target.value) < 0) {
                      return;
                    }
                    this.setState({
                      servicePrice: this.isEnglishNum(e.target.value),
                      servicePriceError: this.servicePriceValidation(
                        e.target.value.trim()
                      ),
                    });
                  }}
                />
                <div className="error-text">
                  {this.state.servicePriceError && (
                    <span className="field__errors">
                      {this.state.servicePriceError}
                    </span>
                  )}
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <div className="field">
                {isHome ? (
                  <Select
                    id={5}
                    isMulti={true}
                    isSearchable={true}
                    value={selectedOption}
                    onChange={(e) => this.handleChangeEmployees(e)}
                    options={typeAppointement}
                    placeholder={
                      localization.FORM_INPUTS_PLACEHOLDERS.EMPLOYEES_LIST[
                        language
                      ]
                    }
                    className={`custome-input-purple " +
					${this.props.language == "ar" ? "dir-right" : "dir-left "} `}
                  />
                ) : (
                  <Select
                    id={5}
                    isMulti={true}
                    isSearchable={true}
                    value={selectedOption}
                    onChange={(e) => this.handleChangeEmployees(e)}
                    options={options}
                    placeholder={
                      localization.FORM_INPUTS_PLACEHOLDERS.EMPLOYEES_LIST[
                        language
                      ]
                    }
                    className={`custome-input-purple " +
					${this.props.language === "ar" ? "dir-right" : "dir-left "} `}
                  />
                )}
              </div>
            </Col>
          </Row>
          {/* row for employee select */}
          <Row
            style={{
              direction: `${this.props.language === "ar" ? "rtl" : "ltr"}`,
            }}
          >
            <Col xs={12} className="mb-2">
              {this.state.durationError ? (
                <span className="field__errors">
                  {this.state.durationError}
                </span>
              ) : null}
            </Col>
            <Col xs={12} sm={6} md={4} lg={3} className="mb-2">
              {this.state.serviceDuration === "" &&
              this.state.showDurationPicker ? (
                <span className="field__errors">
                  {
                    this.props.localization.VALIDATION.IS_REQUIRED[
                      `${this.props.language}`
                    ]
                  }
                </span>
              ) : null}
            </Col>
          </Row>
          {/* row for price and two btn */}
          <Row className="mr-1 ml-1">
            <Col xs={12} sm={6} md={3} lg={3} className="mb-2">
              {!this.state.submitClicked && (
                <div className="text-center">
                  <button
                    className={
                      "btn field__button " +
                      (this.props.language === "ar"
                        ? "ar-font text-right"
                        : "text-left")
                    }
                    type="button"
                    onClick={() => {
                      this.appendServices(parentIndex, childIndex);
                    }}
                    disabled={
                      this.state.isErrorName ||
                      this.state.servicePriceError ||
                      this.state.durationError
                    }
                  >
                    {localization.BUTTONS.ADD[language]}
                  </button>
                </div>
              )}
            </Col>
            <Col xs={12} sm={6} md={3} lg={3} className="mb-2">
              {!this.state.submitClicked && (
                <div className="text-center">
                  <button
                    className={
                      "btn field__button " +
                      (this.props.language === "ar"
                        ? "ar-font text-right"
                        : "text-left")
                    }
                    type="button"
                    disabled={this.state.submitClicked === true}
                    onClick={() => {
                      this.cencelAddService(parentIndex, childIndex);
                    }}
                  >
                    {localization.BUTTONS.CANCEL[language]}
                  </button>
                </div>
              )}
            </Col>
          </Row>

          <Row className="mb-3 mr-1 ml-1">
            {this.state.invalidService && (
              <Col xs={12}>
                <span className="field__errors">
                  {this.props.language === "ar"
                    ? "كل الحقول مطلوبة"
                    : "All Fields are mandatory"}
                </span>
              </Col>
            )}
          </Row>
          <Row className={"justify-content-md-center"}></Row>
        </div>
      </React.Fragment>
    );
  };

  openAddServiceForm = (parentIndex, childIndex) => {
    this.setState({
      serviceDuration: "",
      servicePrice: "",
      serviceNameEng: "",
      serviceNameAr: "",
    });
    let categoriesList = [...this.props.categoriesList];
    const found = categoriesList.some((el, i) => i === parentIndex);
    if (found) {
      categoriesList[parentIndex].categories[childIndex][
        "addNewService"
      ] = true;
      categoriesList[parentIndex].categories[childIndex][
        "showDurationPicker"
      ] = false;
      categoriesList.map((el, index) => {
        el.categories.map((e, i) => {
          if (i !== childIndex) {
            e["addNewService"] = false;
            e["showDurationPicker"] = false;
          }
        });
      });
    } else {
      categoriesList.map((el, index) => {
        el.categories.map((e, i) => {
          e["addNewService"] = false;
          e["showDurationPicker"] = false;
        });
      });
    }
    this.setState(
      {
        categoriesList: categoriesList,
      },
      () => {
        this.props.editCategoriesList(this.state.categoriesList);
      }
    );
  };

  renderAddServiceButton = (parentIndex, childIndex) => {
    return (
      !this.state.submitClicked && (
        <div className="text-center">
          <a
            className={
              "btn field__button " +
              (this.props.language === "ar"
                ? "ar-font text-right"
                : "text-left")
            }
            style={{ color: "white", cursor: "pointer" }}
            onClick={() => {
              this.clearAllErrors();
              this.openAddServiceForm(parentIndex, childIndex);
            }}
          >
            {this.props.language === "ar" ? "أضف خدمة+" : "+ Add Service"}
          </a>
        </div>
      )
    );
  };

  serviceNameValidation = (value) => {
    const minLengthError = minLength(value, 2);
    const maxLengthError = maxLength(value, 50);
    const isRequiredError = isRequired(value, 1);
    if (isRequiredError) {
      return this.props.localization.VALIDATION.IS_REQUIRED[
        `${this.props.language}`
      ];
    }
    if (minLengthError) {
      return this.props.localization.VALIDATION.SERVICE_NAME_SHORT_length[
        `${this.props.language}`
      ];
    }
    if (maxLengthError) {
      return this.props.localization.VALIDATION.SERVICE_NAME_LONG_length[
        `${this.props.language}`
      ];
    }
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

  servicePriceValidation = (value) => {
    const isRequiredError = isRequired(value, 1);
    const isNumbersOnlyError = isAcceptedPrice(this.isEnglishNum(value));
    const isNegativeNumber = isNegative(this.isEnglishNum(value));
    if (isRequiredError) {
      return this.props.localization.VALIDATION.IS_REQUIRED[
        `${this.props.language}`
      ];
    }
    if (!isNumbersOnlyError) {
      return this.props.localization.VALIDATION.NEGATIVE_NUMBER[
        `${this.props.language}`
      ];
    }
    if (isNegativeNumber) {
      return "negative";
    }
  };

  updateTime = (minutesOrHours) => {
    const { hours, minutes } = this.state;
    let duration = [hours ? hours : "0", minutes];
    this.setState(
      {
        serviceDuration: duration.join(":"),
        durationError:
          hours == 0 && minutes == 0
            ? this.props.localization.VALIDATION.NO_ZERO_TIME[
                `${this.props.language}`
              ]
            : "",
      },
      () => console.log(this.state.serviceDuration)
    );
  };

  appendServices = (parentIndex, childIndex) => {
    let addedServies = this.state.addedServies;
    let assignedEmployees = new Set(this.props.assignedEmployees);

    let categoriesList = [...this.props.categoriesList];
    let categoryServices = [
      ...categoriesList[parentIndex].categories[childIndex]["services"],
    ];
    if (this.state.serviceNameEngError || this.state.serviceNameArError) {
      return this.setState({ isErrorName: true, invalidService: false });
    }

    if (
      this.state.serviceDuration.length === 0 ||
      this.state.servicePrice.length === 0 ||
      this.state.serviceNameAr.length === 0 ||
      this.state.serviceNameEng.length === 0
    ) {
      return this.setState({ invalidService: true });
    }

    if (
      this.state.addedServies.serviceNameAr === "" ||
      this.state.addedServies.serviceNameEng === "" ||
      this.state.addedServies.serviceDuration === "" ||
      this.state.addedServies.servicePrice === ""
    ) {
      return this.setState({ invalidService: true });
    }

    if (addedServies.length !== 0 && this.state.servicePrice.length > 0) {
      this.setState({ invalidService: false, isErrorName: false });
      let ids = [];
      let empNames = [];
      addedServies.map((emp) => {
        ids.push(emp.id);
      });

      addedServies.map((emp) => {
        if (this.props.language === "ar") {
          empNames.push({ name: emp.nameAR });
        } else {
          empNames.push({ name: emp.nameEN });
        }
      });
      // Add employee
      let obj = {
        nameEn: this.state.serviceNameEng,
        nameAr: this.state.serviceNameAr,
        duration: this.state.serviceDuration,
        price: parseFloat(this.state.servicePrice),
        employees: ids,
        employeeNames: empNames,
        categoryId: categoriesList[parentIndex].categories[childIndex].id,
      };
      categoryServices.push(obj);
      categoriesList[parentIndex].categories[childIndex][
		"services"
	   ] = categoryServices;

      this.setState({ addedServies: [], categoriesList }, () => {
        this.resetForm();
        this.cencelAddService(parentIndex, childIndex);
        this.props.setServices(categoriesList);
        this.props.editCategoriesList(this.state.categoriesList);
        obj = {};
      });

      let arr = [...this.props.servicesList];
      arr.push(obj);
      this.setState({ servicesList: arr }, () => {
        this.props.setServices(this.state.servicesList);
      });
    } else {
      this.setState({ invalidService: true });
    }
  };

  deleteService = (parentIndex, childIndex, serviceIndex) => {
    let categoriesList = [...this.props.categoriesList];
    let servicesList = [...this.props.servicesList];
    let deletedIndex = servicesList.indexOf(
      categoriesList[parentIndex].categories[childIndex]["services"][
        serviceIndex
      ]
    );

    const index = categoriesList[+parentIndex].categories[childIndex].services.findIndex(function (obj) {
		return obj.nameAr === categoriesList[+parentIndex].categories[+childIndex]["services"][
			+serviceIndex
		  ].nameAr
	});
	

    categoriesList[parentIndex].categories[childIndex]["services"].splice(
      index,
      1
    );
    this.setState(
      {
        categoriesList,
      },
      () => {
        this.props.editCategoriesList(this.state.categoriesList);
      }
    );
    servicesList.splice(deletedIndex, 1);
    this.setState({ servicesList }, () => {
      this.props.setServices(this.state.servicesList);
    });
  };

  resetForm = () => {
    this.setState({
      serviceNameEng: "",
      servicePrice: "",
      serviceNameAr: "",
      serviceDuration: "",
      miutes: "",
      hours: "",
    });
  };

  renderServicesList = (arr, parentIndex, childIndex) => {
    const { localization, language } = this.props;

    return (
      <>
        <Container>
          <Row>
            <Col sm={12}>
              <div
                style={{
                  boxShadow: "2px 2px 5px #656565 !important",
                  borderRadius: "6px",
                  minHeight: `${arr.length !== 0 ? "48px" : "0px"}`,
                }}
              >
                <div className="employeesTable" style={{ marginTop: "0px" }}>
                  <Table
                    responsive
                    style={{ marginBottom: `${arr.length !== 0 && "0px"}` }}
                  >
                    <tbody>
                      {arr.map((service, index) => {
                        return (
                          <tr
                            key={index}
                            style={{ backgroundColor: "transparent" }}
                          >
                            <td>
                              {language === "ar"
                                ? service.nameAr
                                : service.nameEn}
                            </td>
                            <td>
                              {service.duration.split(":")[0] !== "00" &&
                                service.duration.split(":")[0] +
                                  `${language === "ar" ? "س" : "hr"}`}{" "}
                              {service.duration.split(":")[1] !== "00" &&
                                service.duration.split(":")[1] +
                                  `${language === "ar" ? "د" : "min"}`}
                            </td>
                            <td
                              style={{
                                textAlign: `${
                                  language === "ar" ? "right" : "left"
                                }`,
                              }}
                            >
                              {service.employeeNames.map((emp) => {
                                return emp.name + ", ";
                              })}
                            </td>
                            <td>
                              {service.price}{" "}
                              {language === "ar" ? "ريال" : "SAR"}
                            </td>
                            {!this.state.submitClicked && (
                              <td className="serviceBox">
                                <button
                                  className="deleteService"
                                  onClick={() =>
                                    this.deleteService(
                                      parentIndex,
                                      childIndex,
                                      index
                                    )
                                  }
                                  type="button"
                                  role="button"
                                >
                                  <span className="glyphicon glyphicon-trash"></span>
                                </button>
                              </td>
                            )}
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </>
    );
  };

  handleChangeEmployees = (selectedOption) => {
    if (selectedOption !== null) {
      let addedServies = [];
      addedServies = selectedOption;
      this.setState({ addedServies }, () =>
        console.log(this.state.addedServies)
      );
    } else {
      let addedServies = [];
      this.setState({ addedServies });
    }
  };

  formSumitted = () => {
    if (this.state.advertiserToken) {
      return (
        <UploadImage
          uploadImageSucees={this.props.uploadImageSucees}
          advertiserToken={this.props.advertiserToken}
          phoneNumber={this.props.registerdData.mobileNumber}
		  language ={this.props.language}
		  centerName={this.props.registerdData.centerName}
        ></UploadImage>
      );
    }
    return <DoneStep></DoneStep>;
  };

  handleHoursSelection = (e) => {
    this.setState({ minutes: e.target.value.split(":")[1] });
    this.setState({ hours: e.target.value.split(":")[0] }, () =>
      this.updateTime("hours")
    );
  };

  render() {
    const categoriesList = [...this.props.categoriesList];
    if (categoriesList.length) {
      return (
        <React.Fragment>
          <div
            className="example"
            style={{ maxHeight: "700px", overflowY: "scroll", padding: "5px" }}
          >
            {categoriesList.map((center, index) => {
              return this.renderAccordion(center, index);
            })}
          </div>
          {this.props.formSubmitted !== null ? this.formSumitted() : null}
        </React.Fragment>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps, {
  editCategoriesList,
  setServices,
  setEmployeesList,
  setAssignedEmployees,
  uploadImage,
})(Step5);
