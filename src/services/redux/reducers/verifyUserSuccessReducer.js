
import { VERIFY_USER_SUCCESS } from './../actions/types';
export const  verifyUserSuccessReducer = ( res = null , action) => {
    if ( action.type === VERIFY_USER_SUCCESS  ) {
        return action.payload
    }
    return res
};
