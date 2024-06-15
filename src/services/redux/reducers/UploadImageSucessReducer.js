
import {  UPLOAD_IMAGE   }from './../actions/types';
export const uploadImageSuceesReducer = ( res = null, action) => (
    action.type === UPLOAD_IMAGE  ? 
    action.payload : res
    );