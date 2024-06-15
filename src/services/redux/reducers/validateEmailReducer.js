
import {  STEP_ONE_EMAIL_VALIDATION  }from './../actions/types';
export const validateEmailReducer = ( email = {}, action) => (
    action.type === STEP_ONE_EMAIL_VALIDATION ? 
    action.payload : email
    );