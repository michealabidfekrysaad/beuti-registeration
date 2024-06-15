import { REGISTERATION_TOKEN } from '../actions/types';

export const  registerationTokenReducer = ( res = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) , action) => {
    if ( action.type === REGISTERATION_TOKEN ) {
        return action.payload
    }
    return res
};
