import { SET_SERVICE_EMPLOYEES } from './../actions/types';
export const  setSelectedEmployeesReducer = ( data = null , action) => {
    if ( action.type === SET_SERVICE_EMPLOYEES    ) {
        return action.payload
    }
    return data
};
