import HTTPClient from "./../../networking/queries";
import { Localization } from "./../../../localization/data";
import History from "./../../../routing/history";
import {
  CHANGE_LANGUAGE,
  LOAD_LOCALIZATION,
  GET_HISTORY,
  GO_VERFICATION_SCREEN,
  GO_REGISTERATION_SCREEN,
  REJESTER_APP_TOKEN,
  REGISTER_USER_FAILURE,
  REGISTER_USER_SUCCESS,
  VERIFY_USER_SUCCESS,
  VERIFY_USER_FAILURE,
  SET_REGISTERD_DATA,
  RESEND_COUNTER,
  RENDER_BLOCK_MSG,
  VALIDATE_EMAIL_UNIQUNESS_SUCCESS,
  VALIDATE_EMAIL_UNIQUNESS_FAILURE,
  SET_CURRENT_STEP,
  STEP_ONE_EMAIL_VALIDATION,
  STEP_ONE_ADDRESS_VALIDATION,
  SET_CENTER_TYPE,
  SET_WORKING_HOURS,
  SET_EMPLOYEES_LIST,
  GET_CENTER_TYPES,
  GET_CATEGORIES,
  SET_SERVICE_EMPLOYEES,
  GET_CITIES,
  VALIDATE_CITY,
  SET_SERVICES,
  SUBMIT_FORM,
  UPLOAD_IMAGE,
  SET_ASSIGNED_EMPLOYEES,
  EDIT_CATEGORIES_LIST,
  DISABLED_STEPS,
  SET_VER_CODE,
  VALIDATE_REFERAL_CODE_FAILURE,
  VALIDATE_REFERAL_CODE_SUCCESS,
  VALIDATE_PROMO_CODE_FAILURE,
  VALIDATE_PROMO_CODE_SUCCESS,
  SET_REFERAL_CODE,
  SET_PROMO_CODE,
  EMPLOYESS_LIST_BACKEND,
  VALID_ADVERTISER_TOKEN,
} from "./types";

import { PayloadCreator } from "./../../../constants/PayloadCreator";
import { useSelector } from "react-redux";

export const changeLanguage = () => async (dispatch) => {
  const action = {
    type: CHANGE_LANGUAGE,
  };
  dispatch(action);
};

export const loadLocalization = () => async (dispatch) => {
  const action = {
    type: LOAD_LOCALIZATION,
    localization: Localization,
  };
  dispatch(action);
};

export const getHistory = () => async (dispatch) => {
  const action = {
    type: GET_HISTORY,
    history: History,
  };
  dispatch(action);
};

export const goToVerificationScreen = (data) => async (dispatch) => {
  const action = {
    type: GO_VERFICATION_SCREEN,
    payload: data,
  };
  dispatch(action);
};


export const goToRegisterationScreen = (data) => async (dispatch) => {
  data && History.push("/registeration");
  const action = {
    type: GO_REGISTERATION_SCREEN,
    payload: data,
  };
  dispatch(action);
};

export const rejesterAppToken = () => async (dispatch) => {
  const response = await HTTPClient.postFun(
    "Authorization/clientAuth",
    {},
    true,
    1
  );
  const action = {
    type: REJESTER_APP_TOKEN,
    payload: response.data.data.token,
  };
  dispatch(getCenterTypes());
  dispatch(getCities());
  dispatch(action);
};

export const registerUser = (data) => async (dispatch) => {
  // SAVE REGISTER DATA IN REDUX STORE
  dispatch(setRegisterdData(data));
  if(data.advertiserToken){
    dispatch({type:'LOADER_PENDING'})
    HTTPClient.postFun(
      "Account/registerationWizard/CreateManualSP",
      {
        centerName: data.centerName.trim(),
        phoneNumber: data.mobileNumber.trim(),
        code: data.advertiserToken,
        registerationToken:data.registerationToken
      },
      true,
      1
    ).then((res) => {
      if (res) {
        const action = {
          type: VERIFY_USER_SUCCESS,
          payload: res.data.data,
        };
        dispatch(action);
        dispatch(registerUserSuccess({...res, advertiserToken:data.advertiserToken}));
        dispatch({type:'LOADER_RESLOVED'})

      }
    });
  }else{
    HTTPClient.postFun(
      "Account/registerationWizard/verifyPhone",
      {
        centerName: data.centerName.trim(),
        phoneNumber: data.mobileNumber.trim(),
        password: data.password,
		CenterNameEn: data.centerNameEn && data.centerNameEn.trim()
      },
      true,
      1
    ).then((res) => {
      if (res) {
        dispatch(setVerCode(res.data.data.code));
        dispatch(registerUserSuccess(res));

      }
    });
  }
};

export const registerUserSuccess = (res) => (dispatch) => {
  if (res) {
    const action = {
      type: REGISTER_USER_SUCCESS,
      payload: res.data.data,
    };
    if (res.data.data["remainingBlockTime"] <= 120) {
      dispatch(resendCounter(res.data.data["remainingBlockTime"]));
    } else {
      // dispatch(renderBlockedMsg(res.data.data['message']))
    }

    if(res.advertiserToken){
     return dispatch(action);

    }
    dispatch(goToVerificationScreen(true));
    dispatch(action);
  }
};

export const renderBlockedMsg = (msg) => (dispatch) => {
  const action = {
    type: RENDER_BLOCK_MSG,
    payload: msg,
  };
  dispatch(action);
};

export const registerUserFailure = (errormsg) => (dispatch) => {
  const action = {
    type: REGISTER_USER_FAILURE,
    payload: errormsg,
  };
  dispatch(action);
  setTimeout(() => {
    dispatch({ type: REGISTER_USER_FAILURE, payload: null });
  }, 4000);
};
let resendCounterInterval;
export const clearRemindingTimer = (dispatch) => {
  clearInterval(resendCounterInterval);
  if(dispatch){
    dispatch({ type: RESEND_COUNTER, payload: null });

  }
};
export const resendCounter = (remainingTime) => (dispatch) => {
  resendCounterInterval = setInterval(() => {
    if (remainingTime === 0) {
      const action = {
        type: RESEND_COUNTER,
        payload: remainingTime,
      };
      dispatch(action);
      clearInterval(resendCounterInterval);
    } else {
      remainingTime = remainingTime - 1;
      const action = {
        type: RESEND_COUNTER,
        payload: remainingTime,
      };
      dispatch(action);
    }
  }, 1000);
};

export const verifyAdveriserToken = (data) => (dispatch) => {
  HTTPClient.fetch(
    `Operator/Get?code=${data}`,
    true,
    2
  ).then((res) => {
    if(res){
      const action = {
        type:VALID_ADVERTISER_TOKEN,
        payload : res.data.data.isEnabled
      }
    dispatch(action);
  }

  });
};

export const verifyUser = (data) => (dispatch) => {
  HTTPClient.postFun(
    "Account/registerationWizard/confirmPhone",
    {
      phoneNumber: data.phoneNumber.trim(),
      code: data.code.trim(),
      registerationToken:data.registerationToken
    },
    true,
    1
  ).then((res) => {
    dispatch(verifyUserSuccess(res));
    clearRemindingTimer(dispatch);
  });
};

export const verifyUserSuccess = (res) => (dispatch) => {
  if (res) {
    const action = {
      type: VERIFY_USER_SUCCESS,
      payload: res.data.data,
    };
    dispatch(action);
    dispatch(goToVerificationScreen(false));
    dispatch(goToRegisterationScreen(true));
  }
};

export const verifyUserFailure = (error) => async (dispatch) => {
  let payload = "";
  error ? (payload = error.error) : (payload = null);
  const action = {
    type: VERIFY_USER_FAILURE,
    payload: payload,
  };
  dispatch(action);
};

export const setRegisterdData = (data) => (dispatch) => {
  const action = {
    type: SET_REGISTERD_DATA,
    payload: data,
  };
  dispatch(action);
};

export const validateEmailUniquness = (email) => async (dispatch) => {
  HTTPClient.fetch(
    `Account/registerationWizard/validateEmailUniquness?email=${email}`,
    true,
    1
  )
    .then((res) => {
      dispatch(validateEmailUniqunessSuccess(res));
      dispatch(setCurrentStep(2));
      dispatch(validateEmailUniqunessFailure(null));
      return res;
    })
    .catch((err) => err);
};
// fn to upload image for advertiser
export const uploadImage = (uploadPayload) => async (dispatch) => {
	  HTTPClient.postFun(
		"ServiceProvider/uploadSPImage",
		uploadPayload,
		true,
		2
	  ).then((res) => {
		if (res) {
			dispatch(UploadImageSucess(res));}
	  }).catch((err)=>{
		dispatch(UploadImageSucess(err))
	  });
  };
  export const UploadImageSucess = (res) => (dispatch) => {
	if (res) {
	  const action = {
		type: UPLOAD_IMAGE,
		payload: res,
	  };
	  dispatch(action);
	}
  };

export const validateEmailUniqunessSuccess = (res) => (dispatch) => {
  if (res) {
    const action = {
      type: VALIDATE_EMAIL_UNIQUNESS_SUCCESS,
      payload: res.data,
    };
    dispatch(action);
  }
};

export const validateEmailUniqunessFailure = (error) => async (dispatch) => {
  let payload = "";
  error ? (payload = error.error) : (payload = null);
  const action = {
    type: VALIDATE_EMAIL_UNIQUNESS_FAILURE,
    payload: payload,
  };
  dispatch(action);
  setTimeout(() => {
    dispatch({ type: VALIDATE_EMAIL_UNIQUNESS_FAILURE, payload: null });
  }, 4000);
};

export const setCurrentStep = (step) => (dispatch) => {
  if (step) {
    const action = {
      type: SET_CURRENT_STEP,
      payload: step,
    };
    dispatch(action);
  }
};

export const validateEmail = (email) => (dispatch) => {
  const action = {
    type: STEP_ONE_EMAIL_VALIDATION,
    payload: {
      email: email.value,
      isValid: email.isValid,
    },
  };
  dispatch(action);
};

export const validateUserLocation = (userLocation) => (dispatch) => {
  const action = {
    type: STEP_ONE_ADDRESS_VALIDATION,
    payload: {
      address: userLocation.address,
      lat: userLocation.lat,
      lang: userLocation.lang,
      isValid: userLocation.isValid,
    },
  };
  dispatch(action);
};

export const selectCenterTypes = (centerTypes) => (dispatch) => {
  const action = {
    type: SET_CENTER_TYPE,
    payload: centerTypes,
  };
  dispatch(action);
};

export const setWorkingHoures = (workingHoures) => (dispatch) => {
  const action = {
    type: SET_WORKING_HOURS,
    payload: workingHoures,
  };
  dispatch(action);
};

export const setEmployeesList = (employeesList) => (dispatch) => {
  const action = {
    type: SET_EMPLOYEES_LIST,
    payload: employeesList,
  };
  dispatch(action);
};

export const getCenterTypes = () => async (dispatch) => {
  HTTPClient.fetch(
    "CenterType/registrationWizard/getGeneralCenterTypes",
    true,
    2
  ).then((res) => {
    dispatch(getCenterTypesSuccess(res));
  });
};

export const getCenterTypesSuccess = (res) => (dispatch) => {
  if (res) {
    const action = {
      type: GET_CENTER_TYPES,
      payload: res.data.data.list,
    };
    dispatch(action);
  }
};

export const getcategories = (data) => async (dispatch) => {
  // data from store (centerTypes)
  HTTPClient.postFun(
    "CenterType/registrationWizard/GetCenterTypeCategories",
    data,
    true,
    2
  ).then((res) => {
    dispatch(editCategoriesList(res.data.data.list));
    dispatch(getcategoriesSuccess(res));
  });
};

export const getcategoriesSuccess = (res) => (dispatch) => {
  if (res) {
    const action = {
      type: GET_CATEGORIES,
      payload: res.data.data.list,
    };
    dispatch(action);
  }
};

export const setSelectedEmployees = (data) => (dispatch) => {
  const action = {
    type: SET_SERVICE_EMPLOYEES,
    payload: data,
  };
  dispatch(action);
};

export const getCities = () => async (dispatch) => {
  HTTPClient.fetch("City", true, 2).then((res) => {
    dispatch(getCitiesSuccess(res));
  });
};

export const getCitiesSuccess = (res) => (dispatch) => {
  if (res) {
    const action = {
      type: GET_CITIES,
      payload: res.data.data,
    };
    dispatch(action);
  }
};

export const submitForm = (data) => async (dispatch) => {
  dispatch(disabledSteps(true));
  const Payload = new PayloadCreator({
    phoneNumber: data.phoneNumber,
    centerName: data.centerName,
    email: data.email,
    location: {
      lat: data.location.lat,
      lng: data.location.lng,
    },
    cityID: data.cityId,
    address: data.address,
    promoCode: data.promoCode,
    referralCode: data.referralCode,
    centerTypes: data.centerTypes,
    employees: data.employees,
    workingHours: data.workingHours,
    services: data.services,
    step: data.step,
    registerationToken:data.registerationToken
  });
  if (data.step === 1) {
    HTTPClient.postFun(
      "ServiceProvider/AddServiceProvider",
      Payload.createStep1(),
      true,
      2
    ).then((res) => {
      if (res) dispatch(setCurrentStep(data.step + 1));
    });
  }
  if (data.step === 2) {
    HTTPClient.postFun(
      "ServiceProvider/AddServiceProvider",
      Payload.createStep2(),
      true,
      2
    ).then((res) => {
      if (res) dispatch(setCurrentStep(data.step + 1));
    });
  }
  if (data.step === 3) {
    HTTPClient.postFun(
      "ServiceProvider/AddServiceProvider",
      Payload.createStep3(),
      true,
      2
    ).then((res) => {
      if (res) {
        const action = {
          type: EMPLOYESS_LIST_BACKEND,
          payload: res.data.data.list,
        };
        dispatch(action);
        dispatch(setCurrentStep(data.step + 1));
      }
    });
  }
  if (data.step === 4) {
    HTTPClient.postFun(
      "ServiceProvider/AddServiceProvider",
      Payload.createStep4(),
      true,
      2
    ).then((res) => {
      if (res) dispatch(setCurrentStep(data.step + 1));
    });
  }
  if (data.step === 5 && data.services.length > 0) {
    HTTPClient.postFun(
      "ServiceProvider/AddServiceProvider",
      Payload.createStep5(),
      true,
      2
    ).then((res) => dispatch(submitFormSuccess(res)));
  } else if (data.step === 5) {
    dispatch(submitFormSuccess(true));
  }
};
export const submitFormSuccess = (res) => (dispatch) => {
  if (res) {
    const action = {
      type: SUBMIT_FORM,
      payload: res,
    };
    dispatch(action);
  }
};

export const validateCity = (city) => (dispatch) => {
  const action = {
    type: VALIDATE_CITY,
    payload: city,
  };
  dispatch(action);
};

export const setServices = (services) => (dispatch) => {
  const action = {
    type: SET_SERVICES,
    payload: services,
  };
  dispatch(action);
};

export const setAssignedEmployees = (data) => (dispatch) => {
  const action = {
    type: SET_ASSIGNED_EMPLOYEES,
    payload: data,
  };
  dispatch(action);
};

export const editCategoriesList = (data) => (dispatch) => {
  const action = {
    type: EDIT_CATEGORIES_LIST,
    payload: data,
  };
  dispatch(action);
};

export const disabledSteps = (data) => (dispatch) => {
  const action = {
    type: DISABLED_STEPS,
    payload: data,
  };
  dispatch(action);
};

export const setVerCode = (code) => (dispatch) => {
  const action = {
    type: SET_VER_CODE,
    payload: code,
  };
  dispatch(action);
};

// export const validateReferalCode = (referralCode) => async (dispatch) => {
//   HTTPClient.fetch(
//     `ReferralCode/Validate?referralCode=${referralCode}`,
//     true,
//     2
//   )
//     .then((res) => {
//       dispatch(validateReferalCodeSuccess(referralCode));
//       dispatch(validatePromoCodeSuccess(""));
//       dispatch(validateReferalCodeFailure(""));
//     })
//     .catch((err) => {
//       dispatch(validateReferalCodeFailure(err.response.data.error.message));
//       dispatch(validateReferalCodeSuccess(""));
//     });
// };

export const validateReferalCodeSuccess = (payload) => (dispatch) => {
  if (payload || payload === "") {
    const action = {
      type: SET_REFERAL_CODE,
      payload: payload,
    };
    dispatch(action);
  }
};

export const validateReferalCodeFailure = (error) => async (dispatch) => {
  const action = {
    type: VALIDATE_REFERAL_CODE_FAILURE,
    payload: error,
  };
  dispatch(action);
};

// export const validatePromoCode = (promoCode) => async (dispatch) => {
//   HTTPClient.fetch(`SPPromoCode/Validate?promoCode=${promoCode}`, true, 2)
//     .then((res) => {
//       dispatch(validatePromoCodeSuccess(promoCode));
//       dispatch(validateReferalCodeSuccess(""));
//       dispatch(validatePromoCodeFailure(""));
//     })
//     .catch((err) => {
//       if (err && err.response) {
//         dispatch(validatePromoCodeFailure(err.response.data.error.message));
//         dispatch(validatePromoCodeSuccess(""));
//       }
//     });
// };

export const validatePromoCodeSuccess = (res) => (dispatch) => {
  if (res || res === "") {
    const action = {
      type: SET_PROMO_CODE,
      payload: res,
    };
    dispatch(action);
  }
};

export const validatePromoCodeFailure = (error) => async (dispatch) => {
  const action = {
    type: VALIDATE_PROMO_CODE_FAILURE,
    payload: error,
  };
  dispatch(action);
};
