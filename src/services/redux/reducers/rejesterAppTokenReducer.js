
import { REJESTER_APP_TOKEN } from './../actions/types';

export const rejesterAppTokenReducer = ( state = '', action) => {
    if ( action.type === REJESTER_APP_TOKEN ) {
        return action.payload;
    }
    return state;
}
