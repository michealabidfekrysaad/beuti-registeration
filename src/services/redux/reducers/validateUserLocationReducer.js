
import {  STEP_ONE_ADDRESS_VALIDATION  }from './../actions/types';
export const validateUserLocationReducer = ( userLocation = { 
    lat: 24.7136,
    lang: 46.6753
}, action) => (
    action.type === STEP_ONE_ADDRESS_VALIDATION ? 
    action.payload : userLocation
    );