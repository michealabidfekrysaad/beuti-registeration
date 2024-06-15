import React from "react";
import { Card } from "react-bootstrap";
import "./DontHaveAccount.scss";
import { useSelector } from "react-redux";
const DontHaveAccount = () => {
  const { localization, language } = useSelector((data) => data);
  if (localization) {
    return (
      <Card className=" mt-3 noaccount">
        <Card.Header className="noaccount-header">
          {localization.DONTHAVE_ACCOUNT.TITLE[`${language}`]}
        </Card.Header>
        <Card.Body className="noaccount-text">
          {localization.DONTHAVE_ACCOUNT.FIRST[`${language}`]}
          <a href="#">{localization.DONTHAVE_ACCOUNT.LINK[`${language}`]}</a>
          {localization.DONTHAVE_ACCOUNT.LAST[`${language}`]}
        </Card.Body>
      </Card>
    );
  }
  return <> </>;
};

export default DontHaveAccount;
