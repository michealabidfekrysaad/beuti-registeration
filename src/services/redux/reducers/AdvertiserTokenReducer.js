import { ADVERTISER_TOKEN } from '../actions/types';

export const  AdvertiserTokenReducer = ( res = null , action) => {
    if ( action.type === ADVERTISER_TOKEN ) {
        return action.payload
    }
    return res
};
