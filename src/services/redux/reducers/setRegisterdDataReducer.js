import { SET_REGISTERD_DATA } from './../actions/types';
export const  setRegisterdDataReducer = ( data = null , action) => {
    if ( action.type === SET_REGISTERD_DATA    ) {
        return action.payload
    }
    return data
};
