import { SET_SERVICES} from './../actions/types';
export const  setServicesReducer = ( services = [] , action) => {
    if ( action.type === SET_SERVICES   ) {
        return action.payload
    }
    return services
};
