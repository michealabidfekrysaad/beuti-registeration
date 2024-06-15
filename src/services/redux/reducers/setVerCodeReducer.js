import { SET_VER_CODE } from '../actions/types';
export const  setVerCodeReducer = ( code = null , action) => {
    if ( action.type === SET_VER_CODE   ) {
        return action.payload
    }
    return code
};
