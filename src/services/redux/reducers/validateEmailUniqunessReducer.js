import {  VALIDATE_EMAIL_UNIQUNESS_SUCCESS  }from './../actions/types';
export const validateEmailUniqunessReducer = ( isValid = false, action) => (
    action.type === VALIDATE_EMAIL_UNIQUNESS_SUCCESS ? 
    action.payload.success : isValid
    );