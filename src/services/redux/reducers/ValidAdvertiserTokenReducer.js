import { VALID_ADVERTISER_TOKEN } from '../actions/types';

export const  ValidAdvertiserTokenReducer = ( res = null , action) => {
    if ( action.type === VALID_ADVERTISER_TOKEN ) {
        return action.payload
    }
    return res
};
