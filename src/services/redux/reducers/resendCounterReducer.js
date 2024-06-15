import { RESEND_COUNTER  } from './../actions/types';
export const  resendCounterReducer = ( remainingTime = null , action) => {
    if ( action.type === RESEND_COUNTER     ) {
        return action.payload
    } 
        return remainingTime
};
