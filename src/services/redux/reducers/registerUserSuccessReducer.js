
import { REGISTER_USER_SUCCESS } from './../actions/types';
export const  registerUserSuccessReducer = ( res = null , action) => {
    if ( action.type === REGISTER_USER_SUCCESS ) {
        return action.payload
    }
    return res
};
