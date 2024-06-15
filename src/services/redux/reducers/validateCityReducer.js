
import {  VALIDATE_CITY   }from './../actions/types';
export const validateCityReducer = ( city = null, action) => (
    action.type === VALIDATE_CITY  ? 
    action.payload : city
    );