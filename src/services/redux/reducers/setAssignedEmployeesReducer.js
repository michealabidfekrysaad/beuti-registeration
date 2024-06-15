import { SET_ASSIGNED_EMPLOYEES }   from './../actions/types';
export const setAssignedEmployeesReducer = (  data = [] , action) => {
    if (action.type === SET_ASSIGNED_EMPLOYEES ) {
         return action.payload;
     }
         return [];
};