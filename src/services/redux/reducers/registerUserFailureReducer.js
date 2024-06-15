
import { REGISTER_USER_FAILURE } from './../actions/types';
export const registerUserFailureReducer = ( error = null , action) => {
        if ( action.type === REGISTER_USER_FAILURE ) {  
        return action.payload
    }
    return error
};

