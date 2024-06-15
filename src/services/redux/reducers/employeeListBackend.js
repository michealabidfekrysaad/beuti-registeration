import { EMPLOYESS_LIST_BACKEND } from "../actions/types";

export const employeeListBackendReducer = ( employeelistbackend = [] , action) => {
    if ( action.type === EMPLOYESS_LIST_BACKEND) {
         return action.payload;
     }
         return employeelistbackend;
};
 