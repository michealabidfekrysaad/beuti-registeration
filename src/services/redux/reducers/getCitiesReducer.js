import {  GET_CITIES }   from './../actions/types';
export const getCitiesReducer = (  cities = [] , action) => {
    if ( action.type === GET_CITIES) {
         return action.payload;
     }
         return cities;
};
 