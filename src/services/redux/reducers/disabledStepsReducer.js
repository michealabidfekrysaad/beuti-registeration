import {  DISABLED_STEPS }   from './../actions/types';
export const disabledStepsReducer = ( disabledSteps = false , action) => {
    if ( action.type ===  DISABLED_STEPS ) {
         return action.payload;
     }
         return disabledSteps;
};
 