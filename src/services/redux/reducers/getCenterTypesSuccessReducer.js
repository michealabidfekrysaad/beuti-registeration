import { GET_CENTER_TYPES }   from './../actions/types';
export const getCenterTypesSuccessReducer = ( centerTypes = [] , action) => {
    if ( action.type === GET_CENTER_TYPES ) {
         return action.payload;
     }
         return centerTypes;
};
 