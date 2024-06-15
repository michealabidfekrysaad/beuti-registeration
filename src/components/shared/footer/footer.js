import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import FormControls from "./../../wizardForm/formControls";
import History from "./../../../routing/history";
import { useSelector } from "react-redux";

// STYLES
import "./footer.scss";
import { Link } from "react-router-dom";
const Footer = () => {
  const { localization, language } = useSelector((data) => data);
  if (localization) {
    return (
      <footer className="footer">
        <Container fluid>
          <Row className="justify-content-between">
            <Col xs={"auto"}>
              <a className="footer__link" href="https://beuti.co/">
                Beuti.co
              </a>
            </Col>
            <Col xs={"auto"}>
              <a
                className="footer__media"
                href="https://twitter.com/beutiksa?s=11"
                target="_blank"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                className="footer__media mx-2"
                href="https://www.instagram.com/beuti.ksa/?igshid=gc9yvzl00cc6"
                target="_blank"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </Col>
            <Col xs={12}>
              <p className="footer__copyrights">
                {localization.COPYRIGHTS[`${language}`]}
                <Link to="/" className="footer__copyrights">
                  {localization.COPYRIGHTS_NAME[`${language}`]}
                </Link>
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
    );
  }
  return <> </>;
};

export default Footer;
