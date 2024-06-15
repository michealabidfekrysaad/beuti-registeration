import { SET_EMPLOYEES_LIST  }   from './../actions/types';
export const setEmployeesListReducer = ( employeesList = [] , action) => {
    if (action.type === SET_EMPLOYEES_LIST   ) {

         return action.payload;
     }
         return employeesList;
};
 