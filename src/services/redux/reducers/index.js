

import { combineReducers }                  from 'redux';
import {  directionReducer}                 from './directionReducer';
import { languageReducer }                  from './languageReducer';
import { localizationReducer }              from './localizationReducer';
import { getHistory }                       from './historyReducer';
import { registrationForm }                 from './registrationForm';
import { verficationForm }                  from './verficationForm';
import { VervicationReducer }               from './goToVerficationReducer';
import { RegesterationReducer }             from './goToRegisterationReducer';
import { defaultLanguageReducer }           from './defaultLanguageReducer';
import { rejesterAppTokenReducer }          from './rejesterAppTokenReducer';
import { registerUserSuccessReducer }       from './registerUserSuccessReducer';
import { registerUserFailureReducer }       from './registerUserFailureReducer';
import { verifyUserSuccessReducer }         from './verifyUserSuccessReducer';
import { verifyUserFailureReducer }         from './verifyUserFailureReducer';
import { setRegisterdDataReducer }          from './setRegisterdDataReducer';
import { resendCounterReducer }             from './resendCounterReducer';
import { blockMsgReducer }                  from './blockMsgreducer';
import { validateEmailUniqunessReducer }    from './validateEmailUniqunessReducer';
import { setCurrentStepReducer }            from './setCurrentStepReducer';
import { validateEmailReducer }             from './validateEmailReducer';
import { validateUserLocationReducer }      from './validateUserLocationReducer';
import { validateEmailUniqunessFailureReducer }         from './validateEmailUniqunessFailureReducer';
import { selectCenterTypesReducer }         from './selectCenterTypes';
import { setWorkingHouresReducer }          from './setWorkingHouresReducer';
import { setEmployeesListReducer }          from './setEmployeesListReducer'
import { getCenterTypesSuccessReducer }     from './getCenterTypesSuccessReducer';
import { setSelectedEmployeesReducer}       from './setSelectedEmployeesReducer';
import { getCitiesReducer }                 from './getCitiesReducer';
import { validateCityReducer }              from './validateCityReducer';
import { setServicesReducer }               from './setServicesReducer';
import { submitFormSuccessReducer }         from './submitFormSuccessReducer';
import { uploadImageSuceesReducer }         from './UploadImageSucessReducer';
import { setAssignedEmployeesReducer }      from './setAssignedEmployeesReducer';
import { editCategoriesListReducer }        from './editCategoriesListReducer';
import { disabledStepsReducer }             from './disabledStepsReducer';
import { getcategoriesReducer }             from './getcategoriesReducer';
import { setVerCodeReducer }                from './setVerCodeReducer';
import { employeeListBackendReducer }       from './employeeListBackend';
import { AdvertiserTokenReducer }           from './AdvertiserTokenReducer';
import { registerationTokenReducer }        from './RegisterationTokenReducer';
import { ValidAdvertiserTokenReducer }      from './ValidAdvertiserTokenReducer';


import { 
    validatePromoCodeFailureReducer, 
    validateReferalCodeFailureReducer,
    setPromocodeReducer,
    setReferralCodeReducer,
} from './codesVerificationReducer'
import { LoaderReducer } from './LoaderReducer';

export default combineReducers({
    defaultLanguage: defaultLanguageReducer,
    language: languageReducer ,
    direction: directionReducer,
    localization  : localizationReducer,
    history: getHistory,
    currentStep: setCurrentStepReducer,
    registrationForm: registrationForm,
    verficationForm: verficationForm,
    goToVervicationScreen: VervicationReducer,
    goToRegisterationScreen: RegesterationReducer,
    appToken: rejesterAppTokenReducer,
    registerUserResponse: registerUserSuccessReducer,
    registerUserError: registerUserFailureReducer,
    verifyUserResponse: verifyUserSuccessReducer,
    verifyUserError: verifyUserFailureReducer,
    registerdData: setRegisterdDataReducer,
    referralCode: setReferralCodeReducer,
    promoCode: setPromocodeReducer,
    resendRemainingTime: resendCounterReducer,
    blockMsg: blockMsgReducer,
    assignedEmployees : setAssignedEmployeesReducer ,
    isEmailUniqe:  validateEmailUniqunessReducer ,
    stepOneEmail: validateEmailReducer,
    stepOneUserLocation: validateUserLocationReducer,
    EmailUniqunessError: validateEmailUniqunessFailureReducer ,
    centerTypes: selectCenterTypesReducer,
    workingHoures: setWorkingHouresReducer,
    employeesList: setEmployeesListReducer ,
    employeeListBackend:employeeListBackendReducer,
    centerTypesList:  getCenterTypesSuccessReducer,
    categoriesList: editCategoriesListReducer,
    originalCategoriesList: getcategoriesReducer,
    servicesEmployees : setSelectedEmployeesReducer,
    cities: getCitiesReducer,
    city: validateCityReducer,
    servicesList: setServicesReducer,
    formSubmitted: submitFormSuccessReducer,
	uploadImageSucees: uploadImageSuceesReducer,
    disabledSteps: disabledStepsReducer ,
    verficationCode : setVerCodeReducer,
    promoFailure: validatePromoCodeFailureReducer,
    referalFailure: validateReferalCodeFailureReducer,
    advertiserToken:AdvertiserTokenReducer,
    registerationToken:registerationTokenReducer,
    ValidAdvertiserToken:ValidAdvertiserTokenReducer,
    loader:LoaderReducer
})
  