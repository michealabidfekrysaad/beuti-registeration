
import { RENDER_BLOCK_MSG } from './../actions/types';
export const  blockMsgReducer = ( error = null , action) => {
    if ( action.type === RENDER_BLOCK_MSG  ) {
        return action.payload
    }
    return error
};
