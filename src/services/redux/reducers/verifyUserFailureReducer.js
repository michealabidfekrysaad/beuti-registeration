
import { VERIFY_USER_FAILURE } from './../actions/types';
export const  verifyUserFailureReducer = ( error = null , action) => {
    if ( action.type === VERIFY_USER_FAILURE   ) {
        return action.payload
    }
    return error
};
