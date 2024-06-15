import React, { Suspense } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearRemindingTimer, goToRegisterationScreen, verifyAdveriserToken } from "./../services/redux/actions/index";

import {
  EDIT_CATEGORIES_LIST,
  SET_ASSIGNED_EMPLOYEES,
  SET_CENTER_TYPE,
  SET_EMPLOYEES_LIST,
  SET_SERVICES,
  SET_WORKING_HOURS,
  STEP_ONE_EMAIL_VALIDATION,
  VALIDATE_CITY,
  VERIFY_USER_SUCCESS,
  GO_VERFICATION_SCREEN,
  GO_REGISTERATION_SCREEN,
  ADVERTISER_TOKEN,
  REGISTER_USER_SUCCESS,
} from "../services/redux/actions/types";
const Home = React.lazy(() => import("./../containers/home"));
const RegistrationForm = React.lazy(() =>
  import("./../containers/registeration")
);
const TermsAndCoditionsModal = React.lazy(() =>
  import(
    "./../components/terms_and_conditions_modal/terms_and_conditions_modal"
  )
);
const AddCode = React.lazy(() => import("./../components/AddCode/AddCode"));

const Routes = () => {
  const {advertiserToken,appToken,registerUserResponse} = useSelector((store) => store);
  const dispatch = useDispatch();
  const history = useHistory();
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();
  useEffect(() => {
    history.listen((location, action) => {
      if (action === "POP" ) {
        if(action === "POP" && advertiserToken){
          return window.location.replace(`${window.location.origin}/?adv=${advertiserToken}`);
        }
		return window.location.replace(`${window.location.origin}`);
      }
    });
  }, [history,advertiserToken]);

 
  useEffect(() => {
        if (query.get('adv') ) {
          dispatch({ type: ADVERTISER_TOKEN, payload: query.get('adv') });
         }
   
       history.replace({
          search: '',
        });
	  // this comment remove the token from url
      }, []);
      useEffect(()=>{
        if(appToken && advertiserToken){
               verifyAdveriserToken(advertiserToken)(dispatch)
    
        }
      },[advertiserToken,appToken])
      useEffect(()=>{
        if(registerUserResponse && registerUserResponse.isSuccess && registerUserResponse.tempUser && advertiserToken){
           goToRegisterationScreen(true)(dispatch)
        }
      },[registerUserResponse])
  return (
    <Suspense
      fallback={
        <div id="loading-bar-spinner" className="spinner">
          <div className="spinner-icon"></div>
        </div>
      }
    >
      <Route>
        <Switch>
          <Home path="/" exact />
          <RegistrationForm path="/registeration" exact />
          <TermsAndCoditionsModal path="/test" exact />
        </Switch>
      </Route>
    </Suspense>
  );
};

export default Routes;
