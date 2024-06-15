import React, { useState,useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import FormContainer from "./../components/shared/layout/form-container/form-container";
import { connect, useSelector } from "react-redux";
import { videosSrcs } from "./../constants/constants";

import Video from "./../components/shared/video/video";
import FAQ from "./../components/FAQ/FAQ";
import InvalidAdveriserCodeModal from './../components/InvalidAdveriserCodeModal/InvalidAdveriserCodeModal';

const Home = (props) => {
  const [invalidAdveriserToken,setInvalidAdveriserToken] =useState(false);
  const {advertiserToken,ValidAdvertiserToken} = useSelector((store) => store);

  useEffect(()=>{
    if(advertiserToken&& !ValidAdvertiserToken && ValidAdvertiserToken !== null ){
      setInvalidAdveriserToken(true)
    }
  },[advertiserToken,ValidAdvertiserToken])
  return (
    <React.Fragment>
      <Row className={props.language === "ar" ? "reverse" : ""}>
        <Col xs={{ span: 12, order: 1 }} md={{ span: 12 }}>
          <FormContainer></FormContainer>
        </Col>
      </Row>
  {invalidAdveriserToken && 
       <InvalidAdveriserCodeModal/>}

      {/* <FAQ></FAQ> */}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps, {})(Home);
