import React, { Component } from "react";
import { Router } from "react-router";
import { connect } from "react-redux";

import {
  rejesterAppToken,
  loadLocalization,
  getHistory,
  changeLanguage,
  getCenterTypes,
  getCities,
} from "./../services/redux/actions/index";
import history from "./../routing/history";
import Routes from "./../routing/route";

// STYLE COMPONENTS
import "bootstrap/dist/css/bootstrap.min.css";
import "./../App/App.scss";

// COMPONENTS
import Header from "./../components/shared/header/header";
import Footer from "./../components/shared/footer/footer";
import MainStepper from "../components/shared/mainStepper/MainStepper";

// SERVICES
class App extends Component {
  componentDidMount = () => {
    this.props.changeLanguage();
    this.props.loadLocalization();
    this.props.getHistory();
    this.props.rejesterAppToken();
  };

  render() {
	  console.log(process.env.REACT_APP_ENV_NAME)
    return (
      <Router history={history}>
        <Header></Header>

        <div
          className={
            "route-wrapper beuti-container " +
            (this.props.language == "ar" ? "ar-font" : "")
          }
        >
          <MainStepper />
          {<Routes />}
        </div>
        <Footer></Footer>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, {
  rejesterAppToken,
  loadLocalization,
  getCities,
  getHistory,
  changeLanguage,
  getCenterTypes,
})(App);
export { App };
