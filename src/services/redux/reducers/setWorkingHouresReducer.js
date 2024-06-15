import { SET_WORKING_HOURS  }   from './../actions/types';
export const setWorkingHouresReducer = ( workingHoures = [] , action) => {
    if (action.type === SET_WORKING_HOURS   ) {

         return action.payload;
     }
         return workingHoures;
};
 