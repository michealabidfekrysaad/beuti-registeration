import { GET_CATEGORIES }   from './../actions/types';
export const getcategoriesReducer = ( categories = [] , action) => {
    if ( action.type === GET_CATEGORIES ) {
         return action.payload;
     }
         return  categories;
};
 