import { SET_CURRENT_STEP }   from './../actions/types';
export const setCurrentStepReducer = ( step = 1 , action) => {
    if (action.type === SET_CURRENT_STEP ) {

         return action.payload;
     }
         return step;
};
 