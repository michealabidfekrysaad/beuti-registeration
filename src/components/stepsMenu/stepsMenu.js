import React from "react";
import { connect } from "react-redux";
import { Col,Row } from "react-bootstrap";
import { setCurrentStep } from "./../../services/redux/actions/index";
import "./stepsMenu.scss";
import Video from "./../shared/video/video";
import { videosSrcs, videoTitles } from "./../../constants/constants";

class StepsMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [
        { name: "GENERAL_INFO", icon: "icon-info", id: 1 },
        { name: "CENTER_TYPE", icon: "icon-list", id: 2 },
        { name: "EMPLOYEES", icon: "icon-users", id: 3 },
        { name: "WORKING_HOURS", icon: "icon-clock", id: 4 },
        { name: "SERVICES", icon: "icon-cog", id: 5 },
      ],
      currentWidth: window.innerWidth,
      isMobile: window.innerWidth < 768,
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.throttledHandleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.throttledHandleWindowResize);
  }

  throttledHandleWindowResize = () => {
    if (window.innerWidth < 768) {
      this.setState({
        isMobile: true,
      });
    } else {
      this.setState({
        isMobile: false,
      });
    }
  };

  goTo = (step) => {
    if (!this.props.disabledSteps) {
      this.props.setCurrentStep(step);
    }
  };

  renderMenuItems = () => {
    const {
      localization,
      language,
      currentStep,
      localization: { REGISTER_FORM_WIZARD },
    } = this.props;
    const { tabs } = this.state;
    if (localization) {
      return (
        <>
          <div
            className={
              "sideBar  stepsMenu hidden-xs nav-wrapper " 
            }
          >
            <ul className="nav">
              {tabs.map((item, index) => {
                return (
                  <li
                    className={
                      currentStep >= index + 1
                        ? " active nav-item "
                        : " nav-item "
                    }
                    key={index}
                    onClick={() => this.goTo(item.id)}
                    style={{
                      pointerEvents: "none",
                      cursor: "none",
                    }}
                  >
                    <a
                      className={
                        language === "ar"
                          ? " ar-font nav-item__step "
                          : " nav-item__step "
                      }
                    >
                      <span
                        className={
                          "iconContainer v-center " +
                          (language === "ar" ? "margin-l ar-font " : "margin-r")
                        }
                      >
                        <span className={item.icon}></span>
                      </span>
                      <span>
                        {
                          REGISTER_FORM_WIZARD.MENU[item.name][
                            `${this.props.language}`
                          ]
                        }
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          {/* <div
            className={
              "sideBar form stepsMenu hidden-xs"
            //   (language === "ar" ? "rtl-dir ar-font" : "ltr-dir")
            }
          >
            <div className="form__title" style={{textAlign: "center"}}>
                <p>{videoTitles[this.props.language][currentStep]}</p>
            </div>
            <Video video={videosSrcs[this.props.language][currentStep]}></Video>
          </div> */}
        </>
      );
    }
  };

  renderMobileMenu = () => {
    const {
      localization: { REGISTER_FORM_WIZARD },
      language,
      currentStep,
    } = this.props;
    const { tabs } = this.state;
    if (language) {
      return (
        <React.Fragment>
          <section
            className={
              "mobNav v-center" + (language == "ar" ? " rtl-dir" : " ltr-dir")
            }
          >
            {/* <div className="container"> */}
              <Row>

              <Col xs={12}>
                <table>
                  <tbody>
                    <tr>
                      <td
                        className={
                          this.props.language === "ar"
                            ? " text-right "
                            : "text-left"
                        }
                      >
                        <span
                          id="tabTitle"
                          className={
                            this.props.language === "ar"
                              ? " ar-font "
                              : "margin-r"
                          }
                        >
                          <span
                            className={
                              "iconContainer v-center " +
                              (this.props.language === "ar" ? " ml-2 mr-2" : "mr-2 ml-2")
                            }
                          >
                            <span className="icon-info"></span>
                            
                          </span>
                          {language === "ar" ? (
                          <>
                            5/<span id="tabIndex mx-2">{currentStep} </span>
                          </>
                        ) : (
                          <>
                            <span id="tabIndex mx-2">{currentStep}</span>/5
                          </>
                        )}
                          {
                            REGISTER_FORM_WIZARD.MENU[
                              tabs[currentStep - 1].name
                            ][language]
                          }
                        </span>
                      </td>
                      <td>
                     

                        {/* <span id="tabNextTitle">
                          <a className="tabNav next">
                            {
                              REGISTER_FORM_WIZARD.MENU[
                                tabs[currentStep - 1].name
                              ][language]
                            }
                          </a> */}
                          {/* <a href="#8" role="button" className="tabNav finish">إنهاء</a> */}
                        {/* </span> */}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Col>
              </Row>

            {/* </div> */}
          </section>
        </React.Fragment>
      );
    }
  };

  render() {
    const { localization } = this.props;
    const { isMobile } = this.state;
    if (localization) {
      return (
        <React.Fragment>
          {isMobile ? this.renderMobileMenu() : this.renderMenuItems()}
        </React.Fragment>
      );
    } else {
      return null;
    }
  }
}
const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps, { setCurrentStep })(StepsMenu);
