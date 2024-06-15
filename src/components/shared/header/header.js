import React, { Component } from "react";
import { connect } from "react-redux";
import {
  changeLanguage,
  getCities,
  getCenterTypes,
} from "./../../../services/redux/actions/index";
import { Container, Row, Col } from "react-bootstrap";
import History from "./../../../routing/history";

// STYLES
import "./header.scss";

// REQUIRE IMAGES
import logo from "./../../../assets/images/logo.png";
import { Link } from "react-router-dom";
class Header extends Component {
  changeLanguage = () => {
    this.props.changeLanguage();
  };

  render() {
    if (this.props.localization) {
      return (
        <header
          className="header"
          style={{ direction: `${this.props.direction}` }}
        >
          <Container fluid>
            <Row>
              <Col
                xs={6}
                className={
                  this.props.language === "ar" ? "text-right" : "text-left"
                }
              >
                <Link to={"/"}>
                  <img className="header__logo" src={logo} alt="beuti" />
                </Link>
              </Col>
              <Col
                xs={6}
                className={
                  this.props.language === "en" ? "text-right" : "text-left"
                }
              >
                {History.location.pathname !== "/registeration" ? (
                  <a
                    className="header__lang"
                    onClick={() => {
                      this.changeLanguage();
                      this.props.getCities();
                      this.props.getCenterTypes();
                    }}
                  >
                    {
                      this.props.localization.CHANGE_LANG[
                        `${this.props.language}`
                      ]
                    }
                  </a>
                ) : null}
              </Col>
            </Row>
          </Container>
        </header>
      );
    } else return null;
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, {
  changeLanguage,
  getCities,
  getCenterTypes,
})(Header);
export { Header };
