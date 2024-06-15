
import {  SUBMIT_FORM   }from './../actions/types';
export const submitFormSuccessReducer = ( res = null, action) => (
    action.type === SUBMIT_FORM  ? 
    action.payload : res
    );