import { EDIT_CATEGORIES_LIST }   from './../actions/types';
export const editCategoriesListReducer = ( categories = [] , action) => {
    if ( action.type === EDIT_CATEGORIES_LIST ) {
         return action.payload;
     }
         return  categories;
};
 