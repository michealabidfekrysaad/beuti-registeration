
import { VALIDATE_EMAIL_UNIQUNESS_FAILURE } from './../actions/types';
export const  validateEmailUniqunessFailureReducer = ( error = null , action) => {
    if ( action.type === VALIDATE_EMAIL_UNIQUNESS_FAILURE ) {
        return action.payload
    }
    return error
};
