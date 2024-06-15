import { GET_CENTER_TYPES }   from './../actions/types';
export const getCenterTypesReducer = ( centerTypes = [] , action) => {
    if ( action.type === GET_CENTER_TYPES) {

         return action.payload;
     }
         return centerTypes;
};
 